#!/usr/bin/env python3
"""
validate_cdn_images.py (v2 — headless-browser edition)

Your site is a React SPA: the prerendered HTML only contains <meta> tags,
JSON-LD, and a <noscript> fallback — the actual <img> elements (hero banners,
workshop cards, blog thumbnails) are added to the page by React AFTER
JavaScript runs. A plain requests.get() never sees them.

This version uses Playwright to load each page in a real headless browser,
wait for it to finish rendering, and THEN inspect the DOM — so it sees
exactly what a real visitor's browser sees.

Setup (one-time):
    pip install playwright requests beautifulsoup4
    playwright install chromium

Usage:
    python validate_cdn_images.py
    python validate_cdn_images.py --base-url https://kraftykinni.in \
                                   --cdn-domain cdn.kraftykinni.in \
                                   --report report.csv

Exit code: 0 if everything passes, 1 if any issue is found.
"""

import argparse
import csv
import json
import re
import sys
import xml.etree.ElementTree as ET
from urllib.parse import urljoin, urlparse

import requests
from playwright.sync_api import sync_playwright

IMAGE_EXT_RE = re.compile(r"\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$", re.IGNORECASE)

# Paths that are legitimately local (favicon, etc.) — not a migration miss.
ALLOWED_LOCAL_PATHS = {
    "/favicon.png",
}


def get_sitemap_urls(base_url):
    sitemap_url = urljoin(base_url, "/sitemap.xml")
    resp = requests.get(sitemap_url, timeout=15, headers={"User-Agent": "cdn-validator/2.0"})
    resp.raise_for_status()
    root = ET.fromstring(resp.content)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [loc.text.strip() for loc in root.findall(".//sm:loc", ns) if loc.text]
    if not urls:
        urls = [loc.text.strip() for loc in root.findall(".//loc") if loc.text]
    return urls or [base_url]


def extract_images_from_rendered_page(page, page_url):
    """Return set of (image_url, source) tuples from the fully rendered DOM."""
    found = set()

    # All <img> elements after render, including lazy-loaded ones
    img_data = page.eval_on_selector_all(
        "img",
        "els => els.map(e => ({src: e.currentSrc || e.src, srcset: e.srcset}))"
    )
    for item in img_data:
        if item["src"]:
            found.add((urljoin(page_url, item["src"]), "img[src]"))
        if item["srcset"]:
            for part in item["srcset"].split(","):
                candidate = part.strip().split(" ")[0]
                if candidate:
                    found.add((urljoin(page_url, candidate), "img[srcset]"))

    # <source> inside <picture>
    source_data = page.eval_on_selector_all(
        "picture source", "els => els.map(e => e.srcset)"
    )
    for srcset in source_data:
        if srcset:
            for part in srcset.split(","):
                candidate = part.strip().split(" ")[0]
                if candidate:
                    found.add((urljoin(page_url, candidate), "picture>source"))

    # Elements with a CSS background-image (computed style, catches Tailwind/JS-set styles too)
    bg_data = page.eval_on_selector_all(
        "*",
        """els => els.map(e => getComputedStyle(e).backgroundImage)
                   .filter(v => v && v !== 'none')"""
    )
    bg_re = re.compile(r'url\(["\']?(.*?)["\']?\)')
    for val in bg_data:
        for m in bg_re.finditer(val):
            candidate = m.group(1)
            if candidate and not candidate.startswith("data:"):
                found.add((urljoin(page_url, candidate), "computed background-image"))

    # meta og:image / twitter:image (present in raw HTML too, but grab from DOM for consistency)
    meta_data = page.eval_on_selector_all(
        "meta[property='og:image'], meta[property='twitter:image'], meta[name='twitter:image']",
        "els => els.map(e => e.content)"
    )
    for content in meta_data:
        if content:
            found.add((urljoin(page_url, content), "meta[og:image/twitter:image]"))

    # JSON-LD
    jsonld_scripts = page.eval_on_selector_all(
        "script[type='application/ld+json']", "els => els.map(e => e.textContent)"
    )
    for raw in jsonld_scripts:
        try:
            data = json.loads(raw)
        except (ValueError, TypeError):
            continue

        def walk(node):
            if isinstance(node, dict):
                for key, val in node.items():
                    if key in ("image", "logo"):
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

    return found


def classify(image_url, source, cdn_domain, base_domain):
    parsed = urlparse(image_url)

    if image_url.startswith("data:") or image_url.startswith("blob:"):
        return None
    if not IMAGE_EXT_RE.search(parsed.path):
        return None

    issues = []
    is_local_or_main_domain = parsed.netloc in ("", base_domain)

    if is_local_or_main_domain and parsed.path not in ALLOWED_LOCAL_PATHS:
        issues.append("NOT_ON_CDN — still served from main domain / relative path")
    elif parsed.netloc != cdn_domain and parsed.netloc not in ("", base_domain):
        issues.append(f"UNEXPECTED_DOMAIN — served from {parsed.netloc}, expected {cdn_domain}")

    return issues


def check_loads(image_url, session, cache):
    if image_url not in cache:
        try:
            resp = session.get(image_url, timeout=10, headers={"User-Agent": "cdn-validator/2.0"})
            cache[image_url] = resp.status_code
        except requests.RequestException as e:
            cache[image_url] = f"ERROR: {e}"
    return cache[image_url]


def main():
    parser = argparse.ArgumentParser(description="Validate CDN image migration (renders JS like a real browser).")
    parser.add_argument("--base-url", default="https://kraftykinni.in")
    parser.add_argument("--cdn-domain", default="cdn.kraftykinni.in")
    parser.add_argument("--report", default="cdn_image_report.csv")
    args = parser.parse_args()

    base_domain = urlparse(args.base_url).netloc
    session = requests.Session()
    url_status_cache = {}

    print(f"Fetching sitemap from {args.base_url} ...")
    page_urls = get_sitemap_urls(args.base_url)
    print(f"Found {len(page_urls)} pages to check.\n")

    all_problems = []
    total_unique_images = set()

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        for page_url in page_urls:
            try:
                page.goto(page_url, wait_until="networkidle", timeout=30000)
            except Exception as e:
                print(f"❌ {page_url}  (page failed to load: {e})")
                all_problems.append({"page": page_url, "url": page_url, "source": "page", "issues": f"PAGE_LOAD_FAILED — {e}"})
                continue

            images = extract_images_from_rendered_page(page, page_url)
            page_problems = []

            for image_url, source in images:
                total_unique_images.add(image_url)
                issues = classify(image_url, source, args.cdn_domain, base_domain)
                if issues is None:
                    continue

                status = check_loads(image_url, session, url_status_cache)
                if status != 200:
                    issues.append(f"BROKEN — HTTP status: {status}")

                if issues:
                    page_problems.append({
                        "page": page_url, "url": image_url, "source": source,
                        "issues": "; ".join(issues)
                    })

            status_icon = "❌" if page_problems else "✅"
            print(f"{status_icon} {page_url}  ({len(page_problems)} issue(s), {len(images)} image(s) found)")
            all_problems.extend(page_problems)

        browser.close()

    broken_count = sum(1 for v in url_status_cache.values() if v != 200)

    print("\n" + "=" * 70)
    print(f"Pages checked:        {len(page_urls)}")
    print(f"Unique images found:  {len(total_unique_images)}")
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
