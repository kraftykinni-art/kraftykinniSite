"""
validate_seo.py
───────────────
Validates that every pre-rendered Kraftykinni blog/page URL has:
  ✅  Exactly ONE <title> tag
  ✅  Exactly ONE <meta name="description">
  ✅  Exactly ONE <link rel="canonical">
  ✅  ZERO <meta name="title"> (non-standard, BingMaster false-positive)
  ✅  All three tags carry  data-rh="true"  (react-helmet-async v3 marker)
  ✅  Meta description ≤ 155 chars
  ✅  Title ≤ 70 chars
  ✅  Canonical URL matches the page URL exactly

Run:
    pip install requests beautifulsoup4
    python validate_seo.py

Add --url <URL> to test a single page.
Add --local <path/to/dist> to validate locally built dist/ folder instead.
"""

import argparse
import os
import sys
import textwrap
import time
from pathlib import Path
from urllib.parse import urlparse

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    sys.exit("Install dependencies first:\n  pip install requests beautifulsoup4")

# ── Config ────────────────────────────────────────────────────────────────────

BASE_URL = "https://kraftykinni.in"

# All pre-rendered routes (mirrors the routes array in prerender.mjs)
ROUTES = [
    "/",
    "/corporate-art-workshops/",
    "/school-art-workshops/",
    "/private-art-workshops/",
    "/about/",
    "/blog/",
    "/blog/lippan-art-complete-beginners-guide-kutch-mirror-work/",
    "/blog/best-corporate-team-building-activities-gurgaon-2026/",
    "/blog/annual-day-activity-ideas-schools-delhi-ncr/",
    "/blog/art-workshop-ideas-birthday-party-delhi-ncr/",
    "/blog/bottle-lamp-art-workshop-school-delhi-ncr/",
    "/blog/mothers-day-art-workshop-gift-delhi-ncr/",
    "/blog/clay-trinket-painting-workshop-cars24-gurgaon/",
    "/blog/summer-art-workshop-for-schools-delhi-ncr/",
    "/blog/fathers-day-gift-ideas-art-workshop-delhi-ncr-2026/",   # ← the new one
]

MAX_DESCRIPTION_LEN = 155
MAX_TITLE_LEN       = 70
REQUEST_DELAY       = 1.2   # seconds between requests (be polite)
REQUEST_TIMEOUT     = 15

# ── ANSI colours (disabled on Windows without VT support) ─────────────────────

RESET  = "\033[0m"
BOLD   = "\033[1m"
RED    = "\033[91m"
GREEN  = "\033[92m"
YELLOW = "\033[93m"
CYAN   = "\033[96m"
GREY   = "\033[90m"


def c(color, text):
    return f"{color}{text}{RESET}"


# ── Helpers ───────────────────────────────────────────────────────────────────

def fetch_html(url: str) -> tuple[int, str]:
    """Return (status_code, html_text). On network error returns (-1, '')."""
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
            " BingPreview/1.0b"          # mimic BingMaster smartphone UA
        )
    }
    try:
        r = requests.get(url, headers=headers, timeout=REQUEST_TIMEOUT)
        return r.status_code, r.text
    except Exception as exc:
        return -1, str(exc)


def load_local_html(dist_dir: Path, route: str) -> tuple[int, str]:
    """Read index.html from a local dist/ folder for the given route."""
    # /blog/foo/ → dist/blog/foo/index.html
    rel = route.lstrip("/")
    candidates = [
        dist_dir / rel / "index.html",
        dist_dir / "index.html",          # fallback SPA root
    ]
    for p in candidates:
        if p.exists():
            return 200, p.read_text(encoding="utf-8")
    return 404, ""


def validate_html(url: str, html: str) -> list[dict]:
    """
    Parse html and return a list of issue dicts:
      { level: 'error'|'warning'|'ok', code: str, message: str }
    """
    soup  = BeautifulSoup(html, "html.parser")
    head  = soup.head or BeautifulSoup("", "html.parser")
    issues = []

    def issue(level, code, msg):
        issues.append({"level": level, "code": code, "message": msg})

    # ── 1. <title> ────────────────────────────────────────────────────────────
    titles = head.find_all("title")
    if len(titles) == 0:
        issue("error", "TITLE_MISSING", "No <title> tag found")
    elif len(titles) > 1:
        issue("error", "TITLE_DUPLICATE",
              f"{len(titles)} <title> tags found — expected exactly 1")
    else:
        title_text = titles[0].get_text(strip=True)
        if not titles[0].has_attr("data-rh"):
            issue("warning", "TITLE_NO_DRH",
                  "<title> is missing data-rh=\"true\" — "
                  "react-helmet-async won't clean it up on hydration")
        if len(title_text) > MAX_TITLE_LEN:
            issue("warning", "TITLE_TOO_LONG",
                  f"<title> is {len(title_text)} chars (recommended ≤ {MAX_TITLE_LEN}): "
                  f"{title_text[:60]}…")
        elif len(title_text) == 0:
            issue("error", "TITLE_EMPTY", "<title> is empty")
        else:
            issue("ok", "TITLE_OK",
                  f"<title> ({len(title_text)} chars): {title_text[:70]}")

    # ── 2. <meta name="title"> (non-standard, BingMaster counts as 2nd title) ─
    meta_titles = head.find_all("meta", attrs={"name": "title"})
    if meta_titles:
        issue("error", "META_TITLE_PRESENT",
              f"<meta name=\"title\"> found ({len(meta_titles)} instance(s)) — "
              "BingMaster counts this as a second title tag; remove it")
    else:
        issue("ok", "META_TITLE_ABSENT",
              "<meta name=\"title\"> correctly absent")

    # ── 3. <meta name="description"> ──────────────────────────────────────────
    descs = head.find_all("meta", attrs={"name": "description"})
    if len(descs) == 0:
        issue("error", "DESC_MISSING", "No <meta name=\"description\"> found")
    elif len(descs) > 1:
        issue("error", "DESC_DUPLICATE",
              f"{len(descs)} <meta name=\"description\"> tags found — expected 1")
    else:
        desc_text = descs[0].get("content", "")
        if not descs[0].has_attr("data-rh"):
            issue("warning", "DESC_NO_DRH",
                  "<meta name=\"description\"> missing data-rh=\"true\"")
        if len(desc_text) > MAX_DESCRIPTION_LEN:
            issue("error", "DESC_TOO_LONG",
                  f"Meta description is {len(desc_text)} chars "
                  f"(max {MAX_DESCRIPTION_LEN}): {desc_text[:80]}…")
        elif len(desc_text) < 50:
            issue("warning", "DESC_TOO_SHORT",
                  f"Meta description is only {len(desc_text)} chars "
                  f"(recommended ≥ 50): {desc_text}")
        else:
            issue("ok", "DESC_OK",
                  f"Meta description ({len(desc_text)} chars): {desc_text[:80]}…"
                  if len(desc_text) > 80 else
                  f"Meta description ({len(desc_text)} chars): {desc_text}")

    # ── 4. <link rel="canonical"> ─────────────────────────────────────────────
    canonicals = head.find_all("link", attrs={"rel": "canonical"})
    if len(canonicals) == 0:
        issue("error", "CANONICAL_MISSING", "No <link rel=\"canonical\"> found")
    elif len(canonicals) > 1:
        issue("error", "CANONICAL_DUPLICATE",
              f"{len(canonicals)} <link rel=\"canonical\"> tags — expected 1")
    else:
        href = canonicals[0].get("href", "")
        if not canonicals[0].has_attr("data-rh"):
            issue("warning", "CANONICAL_NO_DRH",
                  "<link rel=\"canonical\"> missing data-rh=\"true\"")
        parsed_href = urlparse(href)
        parsed_url  = urlparse(url)
        if parsed_href.path.rstrip("/") != parsed_url.path.rstrip("/"):
            issue("warning", "CANONICAL_MISMATCH",
                  f"Canonical href ({href}) doesn't match page URL ({url})")
        else:
            issue("ok", "CANONICAL_OK", f"Canonical: {href}")

    # ── 5. data-rh summary ────────────────────────────────────────────────────
    drh_tags = head.find_all(attrs={"data-rh": True})
    core_types = {"title", "meta[name=description]", "link[rel=canonical]"}
    if len(drh_tags) >= 3:
        issue("ok", "DRH_PRESENT",
              f"{len(drh_tags)} tags carry data-rh=\"true\" "
              "(react-helmet-async will correctly swap them on hydration)")

    return issues


# ── Reporting ─────────────────────────────────────────────────────────────────

LEVEL_ICON = {"error": c(RED, "✗ ERROR  "), "warning": c(YELLOW, "⚠ WARNING"), "ok": c(GREEN, "✓ OK     ")}


def print_issues(issues: list[dict], verbose: bool = False):
    errors   = [i for i in issues if i["level"] == "error"]
    warnings = [i for i in issues if i["level"] == "warning"]
    oks      = [i for i in issues if i["level"] == "ok"]

    for i in errors + warnings:
        print(f"    {LEVEL_ICON[i['level']]}  [{i['code']}] {i['message']}")
    if verbose:
        for i in oks:
            print(f"    {LEVEL_ICON['ok']}  [{i['code']}] {i['message']}")
    elif oks:
        print(f"    {c(GREY, f'({len(oks)} checks passed — use --verbose to show)')}")

    return len(errors), len(warnings)


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Validate SEO meta tags for Kraftykinni pre-rendered pages"
    )
    parser.add_argument("--url",     help="Test a single URL only")
    parser.add_argument("--local",   help="Path to local dist/ folder (offline validation)")
    parser.add_argument("--verbose", action="store_true", help="Show passing checks too")
    args = parser.parse_args()

    urls = [f"{BASE_URL}{r}" for r in ROUTES] if not args.url else [args.url]
    dist_dir = Path(args.local) if args.local else None

    total_errors = total_warnings = total_pages = 0

    print()
    print(c(BOLD, "═" * 70))
    print(c(BOLD, "  Kraftykinni SEO Tag Validator"))
    print(c(BOLD, "  Checks: title · meta description · canonical · data-rh marker"))
    print(c(BOLD, "═" * 70))
    print()

    for url in urls:
        total_pages += 1
        route = urlparse(url).path or "/"

        print(c(CYAN, f"▶ {url}"))

        # Fetch
        if dist_dir:
            status, html = load_local_html(dist_dir, route)
        else:
            status, html = fetch_html(url)
            time.sleep(REQUEST_DELAY)

        if status == 404:
            print(f"    {c(RED, '✗ ERROR  ')}  [HTTP_404] Page returned 404 — not indexed\n")
            total_errors += 1
            continue
        if status == -1 or not html:
            print(f"    {c(RED, '✗ ERROR  ')}  [FETCH_ERR] Could not fetch page: {html}\n")
            total_errors += 1
            continue
        if status != 200:
            print(f"    {c(YELLOW, '⚠ WARNING')}  [HTTP_{status}] Unexpected status {status}\n")
            total_warnings += 1

        issues = validate_html(url, html)
        e, w   = print_issues(issues, verbose=args.verbose)
        total_errors   += e
        total_warnings += w
        print()

    # Summary
    print(c(BOLD, "═" * 70))
    print(c(BOLD, f"  Summary: {total_pages} pages checked"))

    if total_errors == 0 and total_warnings == 0:
        print(c(GREEN, f"  ✓ All checks passed — no errors, no warnings"))
    else:
        if total_errors:
            print(c(RED,    f"  ✗ {total_errors} error(s) found"))
        if total_warnings:
            print(c(YELLOW, f"  ⚠ {total_warnings} warning(s) found"))

    print(c(BOLD, "═" * 70))
    print()

    sys.exit(1 if total_errors else 0)


if __name__ == "__main__":
    main()
