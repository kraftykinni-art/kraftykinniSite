"""
validate_redirects.py — Redirect / 404 chain validator
────────────────────────────────────────────────────────────────────────
Checks every URL in a sitemap.xml (or a URL list you pass in) for:

  1. Any HTTP redirect (3xx) — the exact thing Google Search Console's
     "Page indexing" report flags as "Page with redirect".
  2. Redirect chains/loops (A -> B -> C, or A -> B -> A).
  3. Real 404 / 5xx responses.
  4. A trailing-slash mismatch — requests both the URL as listed AND its
     trailing-slash / non-trailing-slash counterpart, so you catch the
     "/about redirects to /about/" pattern before Google does.
  5. Whether the page's own <link rel="canonical"> matches the URL that
     was actually served (catches canonical/redirect contradictions).

Usage
─────
    pip install requests beautifulsoup4

    python validate_redirects.py
        # uses https://kraftykinni.in/sitemap.xml by default

    python validate_redirects.py --sitemap https://example.com/sitemap.xml
    python validate_redirects.py --url https://kraftykinni.in/about
    python validate_redirects.py --urls-file my_urls.txt
    python validate_redirects.py --verbose      # show passing checks too

Exit code: 0 = clean, 1 = at least one issue found.
────────────────────────────────────────────────────────────────────────
"""

import argparse
import sys
import time
import xml.etree.ElementTree as ET
from urllib.parse import urljoin, urlparse, urlunparse

try:
    import requests
except ImportError:
    sys.exit("Install dependencies first:\n  pip install requests beautifulsoup4")

try:
    from bs4 import BeautifulSoup
    HAVE_BS4 = True
except ImportError:
    HAVE_BS4 = False

DEFAULT_SITEMAP = "https://kraftykinni.in/sitemap.xml"
REQUEST_TIMEOUT = 15
REQUEST_DELAY = 0.6           # be polite to your own server
USER_AGENT = "Mozilla/5.0 (compatible; RedirectValidator/1.0; +https://kraftykinni.in)"
MAX_HOPS = 10                 # anything beyond this is almost certainly a loop

session = requests.Session()
session.headers.update({"User-Agent": USER_AGENT})


# ── Helpers ──────────────────────────────────────────────────────────────

def load_sitemap_urls(sitemap_url_or_path):
    """Read a sitemap.xml from a URL or local file path and return <loc> values."""
    if sitemap_url_or_path.startswith("http://") or sitemap_url_or_path.startswith("https://"):
        resp = session.get(sitemap_url_or_path, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        xml_bytes = resp.content
    else:
        with open(sitemap_url_or_path, "rb") as f:
            xml_bytes = f.read()

    root = ET.fromstring(xml_bytes)
    # Namespace-agnostic: strip any {namespace} prefix from tag names
    urls = []
    for url_el in root.iter():
        if url_el.tag.endswith("}url") or url_el.tag == "url":
            for child in url_el:
                if child.tag.endswith("}loc") or child.tag == "loc":
                    if child.text:
                        urls.append(child.text.strip())
    return urls


def toggle_trailing_slash(url):
    """Return the trailing-slash-toggled counterpart of a URL."""
    parsed = urlparse(url)
    path = parsed.path
    if path == "" or path == "/":
        return None  # homepage has no meaningful counterpart
    if path.endswith("/"):
        new_path = path.rstrip("/")
    else:
        new_path = path + "/"
    return urlunparse(parsed._replace(path=new_path))


def trace_redirects(url, max_hops=MAX_HOPS):
    """
    Manually follow redirects one hop at a time (instead of letting requests
    auto-follow) so we can report the full chain and detect loops.
    Returns: (hops: list[(url, status_code)], final_status, error)
    """
    hops = []
    seen = set()
    current = url

    for _ in range(max_hops):
        if current in seen:
            return hops, None, f"redirect loop detected (revisits {current})"
        seen.add(current)
        try:
            resp = session.get(current, timeout=REQUEST_TIMEOUT, allow_redirects=False)
        except requests.RequestException as e:
            return hops, None, f"request failed: {e}"

        hops.append((current, resp.status_code))

        if resp.is_redirect or resp.status_code in (301, 302, 303, 307, 308):
            location = resp.headers.get("Location")
            if not location:
                return hops, resp.status_code, "redirect status with no Location header"
            current = urljoin(current, location)
            continue

        return hops, resp.status_code, None

    return hops, None, f"exceeded {max_hops} redirect hops (likely a loop)"


def get_canonical(url):
    """Fetch a URL and extract its <link rel="canonical"> href, if present."""
    try:
        resp = session.get(url, timeout=REQUEST_TIMEOUT)
    except requests.RequestException:
        return None
    if resp.status_code != 200:
        return None
    if HAVE_BS4:
        soup = BeautifulSoup(resp.text, "html.parser")
        tag = soup.find("link", rel="canonical")
        return tag.get("href") if tag else None
    # Fallback: crude regex if bs4 isn't installed
    import re
    m = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)["\']', resp.text)
    return m.group(1) if m else None


# ── Core check ───────────────────────────────────────────────────────────

def check_url(url, verbose=False):
    """
    Runs the full check for one URL. Returns a list of issue strings
    (empty list = clean).
    """
    issues = []
    hops, final_status, error = trace_redirects(url)

    if error:
        issues.append(f"ERROR: {error}")
        return issues

    if len(hops) > 1:
        chain = " -> ".join(f"{u} [{s}]" for u, s in hops)
        issues.append(f"REDIRECT ({len(hops) - 1} hop(s)): {chain}")
    elif verbose:
        print(f"  ok, no redirect ({hops[0][1]})")

    if final_status is None:
        issues.append("ERROR: never reached a final response")
    elif final_status == 404:
        issues.append(f"404 NOT FOUND (after {len(hops)} hop(s))" if len(hops) > 1
                       else "404 NOT FOUND")
    elif final_status >= 500:
        issues.append(f"SERVER ERROR {final_status}")
    elif final_status not in (200, 304):
        issues.append(f"UNEXPECTED STATUS {final_status}")

    # Trailing-slash counterpart check — this is the exact pattern that was
    # causing GSC's "Page with redirect" report for Kraftykinni: the listed
    # URL is clean, but its slash-toggled counterpart isn't (or vice versa).
    counterpart = toggle_trailing_slash(url)
    if counterpart:
        c_hops, c_status, c_error = trace_redirects(counterpart)
        if c_error:
            issues.append(f"trailing-slash counterpart {counterpart} -> ERROR: {c_error}")
        elif len(c_hops) > 1:
            chain = " -> ".join(f"{u} [{s}]" for u, s in c_hops)
            issues.append(f"trailing-slash counterpart also redirects: {chain}")
        elif c_status == 404:
            # Not necessarily a bug (many hosts 404 the "other" variant on
            # purpose) but worth flagging so you know which convention won.
            if verbose:
                print(f"  (note: {counterpart} -> 404, expected if you only support one slash style)")

    # Canonical cross-check — only meaningful if we ended on a 200
    if final_status == 200:
        canonical = get_canonical(hops[-1][0])
        if canonical and canonical.rstrip("/") != hops[-1][0].rstrip("/"):
            issues.append(f"CANONICAL MISMATCH: page serves at {hops[-1][0]} "
                           f"but canonical tag says {canonical}")

    return issues


# ── Main ─────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Validate a site for redirect / 404 issues.")
    parser.add_argument("--sitemap", default=DEFAULT_SITEMAP,
                         help=f"Sitemap URL or local path (default: {DEFAULT_SITEMAP})")
    parser.add_argument("--url", action="append", default=[],
                         help="Check a single URL (repeatable).")
    parser.add_argument("--urls-file", help="Path to a text file, one URL per line.")
    parser.add_argument("--verbose", action="store_true", help="Show passing checks too.")
    args = parser.parse_args()

    urls = list(args.url)
    if args.urls_file:
        with open(args.urls_file, encoding="utf-8") as f:
            urls += [line.strip() for line in f if line.strip()]

    if not urls:
        print(f"Loading URLs from sitemap: {args.sitemap}")
        try:
            urls = load_sitemap_urls(args.sitemap)
        except Exception as e:
            sys.exit(f"Could not load sitemap: {e}")

    if not urls:
        sys.exit("No URLs found to check.")

    print(f"Checking {len(urls)} URL(s)...\n")

    total_issues = 0
    results = []

    for i, url in enumerate(urls, 1):
        print(f"[{i}/{len(urls)}] {url}")
        issues = check_url(url, verbose=args.verbose)
        if issues:
            total_issues += len(issues)
            for issue in issues:
                print(f"   ✗ {issue}")
        else:
            print("   ✓ clean (200, no redirect, canonical matches)")
        results.append((url, issues))
        time.sleep(REQUEST_DELAY)

    print("\n" + "─" * 70)
    broken = [(u, i) for u, i in results if i]
    if not broken:
        print(f"✅  All {len(urls)} URLs are clean — no redirects, 404s, or canonical mismatches.")
        sys.exit(0)

    print(f"❌  {len(broken)}/{len(urls)} URL(s) have issues:\n")
    for url, issues in broken:
        print(f"  {url}")
        for issue in issues:
            print(f"    - {issue}")
    sys.exit(1)


if __name__ == "__main__":
    main()
