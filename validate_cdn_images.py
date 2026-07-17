#!/usr/bin/env python3
"""
validate_cdn_images.py

Crawls kraftykinni.in via its sitemap, finds every image reference on every
page (img tags, srcset, og:image / twitter:image meta tags, JSON-LD image
fields, and CSS background-image), and checks:

  1. That the image is served from the CDN domain (cdn.kraftykinni.in),
     not the main domain or a relative/local path.
  2. That the image URL actually loads (HTTP 200), so nothing is a broken
     link on the CDN itself.

Usage:
    pip install requests beautifulsoup4 --break-system-packages
    python validate_cdn_images.py

    # Optional flags:
    python validate_cdn_images.py --base-url https://kraftykinni.in \
                                   --cdn-domain cdn.kraftykinni.in \
                                   --workers 10 \
                                   --report report.csv

Exit code: 0 if everything passes, 1 if any issue is found (useful in CI).
"""

import argparse
import csv
import re
import sys
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

IMAGE_EXT_RE = re.compile(r"\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$", re.IGNORECASE)
CSS_BG_RE = re.compile(r"url\((['\"]?)(.*?)\1\)")

# Paths that are legitimately local (favicon, site meta files) — not treated
# as "missed migration" even though they're not image <img> tags in the
# normal sense. Add to this list if you intentionally keep something local.
ALLOWED_LOCAL_PATHS = {
    "/favicon.png",
}


def fetch(url, session, timeout=15):
    try:
        resp = session.get(url, timeout=timeout, headers={"User-Agent": "cdn-validator/1.0"})
        return resp
    except requests.RequestException as e:
        return e


def get_sitemap_urls(base_url, session):
    sitemap_url = urljoin(base_url, "/sitemap.xml")
    resp = fetch(sitemap_url, session)
    if isinstance(resp, Exception) or resp.status_code != 200:
        print(f"⚠️  Could not fetch sitemap at {sitemap_url}, falling back to base URL only.")
        return [base_url]

    try:
        root = ET.fromstring(resp.content)
    except ET.ParseError:
        print("⚠️  Could not parse sitemap.xml, falling back to base URL only.")
        return [base_url]

    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [loc.text.strip() for loc in root.findall(".//sm:loc", ns) if loc.text]
    if not urls:
        # namespace-less fallback
        urls = [loc.text.strip() for loc in root.findall(".//loc") if loc.text]
    return urls or [base_url]


def extract_image_urls(html, page_url):
    """Return a set of (image_url, source_description) tuples found on the page."""
    soup = BeautifulSoup(html, "html.parser")
    found = set()

    # <img src="..."> and srcset
    for img in soup.find_all("img"):
        src = img.get("src")
        if src:
            found.add((urljoin(page_url, src), "img[src]"))
        srcset = img.get("srcset")
        if srcset:
            for part in srcset.split(","):
                candidate = part.strip().split(" ")[0]
                if candidate:
                    found.add((urljoin(page_url, candidate), "img[srcset]"))

    # <source srcset="..."> inside <picture>
    for source in soup.find_all("source"):
        srcset = source.get("srcset")
        if srcset:
            for part in srcset.split(","):
                candidate = part.strip().split(" ")[0]
                if candidate:
                    found.add((urljoin(page_url, candidate), "source[srcset]"))

    # meta og:image / twitter:image
    for meta in soup.find_all("meta"):
        prop = meta.get("property") or meta.get("name")
        if prop in ("og:image", "twitter:image", "og:image:secure_url"):
            content = meta.get("content")
            if content:
                found.add((urljoin(page_url, content), f"meta[{prop}]"))

    # JSON-LD structured data — look for "image" / "logo" / "url" fields
    # that look like image files
    import json
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string or "{}")
        except (ValueError, TypeError):
            continue

        def walk(node):
            if isinstance(node, dict):
                for key, val in node.items():
                    if key in ("image", "logo") :
                        if isinstance(val, str):
                            found.add((urljoin(page_url, val), f"jsonld[{key}]"))
                        elif isinstance(val, dict) and "url" in val:
                            found.add((urljoin(page_url, val["url"]), f"jsonld[{key}.url]"))
                        elif isinstance(val, list):
                            for v in val:
                                if isinstance(v, str):
                                    found.add((urljoin(page_url, v), f"jsonld[{key}]"))
                    else:
                        walk(val)
            elif isinstance(node, list):
                for item in node:
                    walk(item)

        walk(data)

    # inline style="background-image: url(...)"
    for el in soup.find_all(style=True):
        for m in CSS_BG_RE.finditer(el["style"]):
            candidate = m.group(2)
            if candidate and not candidate.startswith("data:"):
                found.add((urljoin(page_url, candidate), "style[background-image]"))

    return found


def classify_and_check(image_url, source, cdn_domain, base_domain, session, url_status_cache):
    parsed = urlparse(image_url)

    if image_url.startswith("data:"):
        return None  # inline data URIs are fine, not a migration concern

    if not IMAGE_EXT_RE.search(parsed.path):
        return None  # not an image file (e.g. a page link picked up by mistake)

    issues = []

    is_on_cdn = parsed.netloc == cdn_domain
    is_local_or_main_domain = (parsed.netloc in ("", base_domain))

    if is_local_or_main_domain and parsed.path not in ALLOWED_LOCAL_PATHS:
        issues.append("NOT_ON_CDN — still served from main domain / relative path")
    elif not is_on_cdn and parsed.netloc not in ("", base_domain):
        issues.append(f"UNEXPECTED_DOMAIN — served from {parsed.netloc}, expected {cdn_domain}")

    # Check the URL actually loads (cache results since many pages share images)
    if image_url not in url_status_cache:
        resp = fetch(image_url, session, timeout=10)
        if isinstance(resp, Exception):
            url_status_cache[image_url] = f"ERROR: {resp}"
        else:
            url_status_cache[image_url] = resp.status_code
    status = url_status_cache[image_url]

    if status != 200:
        issues.append(f"BROKEN — HTTP status: {status}")

    if issues:
        return {"url": image_url, "source": source, "issues": "; ".join(issues)}
    return None


def main():
    parser = argparse.ArgumentParser(description="Validate CDN image migration across the site.")
    parser.add_argument("--base-url", default="https://kraftykinni.in")
    parser.add_argument("--cdn-domain", default="cdn.kraftykinni.in")
    parser.add_argument("--workers", type=int, default=8)
    parser.add_argument("--report", default="cdn_image_report.csv")
    args = parser.parse_args()

    base_domain = urlparse(args.base_url).netloc
    session = requests.Session()

    print(f"Fetching sitemap from {args.base_url} ...")
    page_urls = get_sitemap_urls(args.base_url, session)
    print(f"Found {len(page_urls)} pages to check.\n")

    all_problems = []
    url_status_cache = {}

    def process_page(page_url):
        resp = fetch(page_url, session)
        if isinstance(resp, Exception) or resp.status_code != 200:
            return page_url, [{"url": page_url, "source": "page", "issues": f"PAGE_UNREACHABLE — {resp}"}]

        images = extract_image_urls(resp.text, page_url)
        page_problems = []
        for image_url, source in images:
            problem = classify_and_check(image_url, source, args.cdn_domain, base_domain, session, url_status_cache)
            if problem:
                problem["page"] = page_url
                page_problems.append(problem)
        return page_url, page_problems

    total_images_seen = set()
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {executor.submit(process_page, url): url for url in page_urls}
        for future in as_completed(futures):
            page_url, problems = future.result()
            status = "❌" if problems else "✅"
            print(f"{status} {page_url}  ({len(problems)} issue(s))")
            all_problems.extend(problems)

    total_images_checked = len(url_status_cache)
    broken_count = sum(1 for v in url_status_cache.values() if v != 200)

    print("\n" + "=" * 70)
    print(f"Pages checked:        {len(page_urls)}")
    print(f"Unique images found:  {total_images_checked}")
    print(f"Broken image URLs:    {broken_count}")
    print(f"Total issues found:   {len(all_problems)}")
    print("=" * 70)

    if all_problems:
        with open(args.report, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=["page", "url", "source", "issues"])
            writer.writeheader()
            writer.writerows(all_problems)
        print(f"\n⚠️  Issues found — details written to {args.report}\n")
        for p in all_problems[:30]:
            print(f"  Page:   {p['page']}")
            print(f"  Image:  {p['url']}")
            print(f"  Found:  {p['source']}")
            print(f"  Issue:  {p['issues']}\n")
        if len(all_problems) > 30:
            print(f"  ... and {len(all_problems) - 30} more, see {args.report}")
        sys.exit(1)
    else:
        print("\n✅ All images are served from the CDN and loading correctly. Nothing missed.")
        sys.exit(0)


if __name__ == "__main__":
    main()
