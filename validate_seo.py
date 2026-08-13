"""
validate_seo.py  â€”  Kraftykinni SEO / AEO / GEO Validator  (v2)
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
Three lenses in one script:

  SEO  â€” Classic search-engine signals
         title Â· meta description Â· canonical Â· H1 Â· robots
         Open Graph Â· Twitter Card Â· data-rh hydration marker

  AEO  â€” Answer Engine Optimisation  (featured snippets, AI Overviews)
         FAQPage / HowTo / Article / BreadcrumbList JSON-LD
         Q&A content patterns in noscript prose

  GEO  â€” Generative Engine Optimisation  (AI citations & brand clarity)
         LocalBusiness / Organization / Person schema
         AggregateRating Â· Review schema
         E-E-A-T signals Â· author / credential mentions
         Brand-name consistency Â· sameAs social profiles

Run:
    pip install requests beautifulsoup4
    python validate_seo.py                  # all pages, summary output
    python validate_seo.py --verbose        # show passing checks too
    python validate_seo.py --url https://kraftykinni.in/about/
    python validate_seo.py --local dist/    # offline validation of built files

Exit code:  0 = clean,  1 = errors found
"""

import argparse
import json
import os
import re
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

# â”€â”€ Config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

BASE_URL = "https://kraftykinni.in"

ROUTES = [
    "/",
    "/corporate-art-workshops",
    "/school-art-workshops",
    "/private-art-workshops",
    "/about",
    "/blog",
    "/blog/lippan-art-complete-beginners-guide-kutch-mirror-work",
    "/blog/best-corporate-team-building-activities-gurgaon-2026",
    "/blog/annual-day-activity-ideas-schools-delhi-ncr",
    "/blog/art-workshop-ideas-birthday-party-delhi-ncr",
    "/blog/bottle-lamp-art-workshop-school-delhi-ncr",
    "/blog/mothers-day-art-workshop-gift-delhi-ncr",
    "/blog/clay-trinket-painting-workshop-cars24-gurgaon",
    "/blog/summer-art-workshop-for-schools-delhi-ncr",
    "/blog/fathers-day-gift-ideas-art-workshop-delhi-ncr-2026",
    "/blog/world-environment-day-upcycled-bottle-art-workshop-delhi-ncr",
    "/blog/independence-day-bottle-art-workshop-delhi-ncr",
    "/blog/raksha-bandhan-mdf-fridge-magnet-workshop-delhi-ncr",
    "/blog/friendship-day-photo-magnet-workshop-delhi-ncr",
    "/blog/dot-mandala-art-corporate-workshop-noida",
    "/blog/janmashtami-krishna-art-workshop-delhi-ncr",
]

# SEO length thresholds
TITLE_MIN = 30
TITLE_MAX = 65          # ideal ≤60 but Google/Bing tolerate up to ~65 before truncation
DESC_MIN  = 120
DESC_MAX  = 155         # Bing flags outside 70â€“155 range

REQUEST_DELAY   = 1.2
REQUEST_TIMEOUT = 15

# GEO â€” keywords that signal E-E-A-T (experience / expertise / authority / trust)
EEAT_KEYWORDS = [
    "fevicryl certified", "certified artist", "shramita govil",
    "1,500+ participants", "50+ workshops", "fevicryl", "kraftykinni",
]

# â”€â”€ ANSI colours â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

RESET  = "\033[0m"
BOLD   = "\033[1m"
RED    = "\033[91m"
GREEN  = "\033[92m"
YELLOW = "\033[93m"
CYAN   = "\033[96m"
BLUE   = "\033[94m"
MAGENTA= "\033[95m"
GREY   = "\033[90m"


def c(color, text):
    return f"{color}{text}{RESET}"


# â”€â”€ Network helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

def fetch_html(url: str) -> tuple[int, str]:
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
            " BingPreview/1.0b"
        )
    }
    try:
        r = requests.get(url, headers=headers, timeout=REQUEST_TIMEOUT,
                         allow_redirects=True)
        return r.status_code, r.text
    except Exception as exc:
        return -1, str(exc)


def load_local_html(dist_dir: Path, route: str) -> tuple[int, str]:
    rel = route.lstrip("/")
    candidates = [
        dist_dir / rel / "index.html",
        dist_dir / "index.html",
    ]
    for p in candidates:
        if p.exists():
            return 200, p.read_text(encoding="utf-8")
    return 404, ""


# â”€â”€ Core validation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

def validate_html(url: str, html: str) -> list[dict]:
    soup  = BeautifulSoup(html, "html.parser")
    head  = soup.head or BeautifulSoup("", "html.parser")
    body  = soup.body or BeautifulSoup("", "html.parser")
    full_text = soup.get_text(" ", strip=True).lower()
    issues = []

    def issue(level, code, msg, lens="SEO"):
        issues.append({"level": level, "code": code, "message": msg, "lens": lens})

    # â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    # SEO CHECKS
    # â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

    # â”€â”€ 1. <title> â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    titles = head.find_all("title")
    if not titles:
        issue("error", "TITLE_MISSING", "No <title> tag found")
    elif len(titles) > 1:
        issue("error", "TITLE_DUPLICATE",
              f"{len(titles)} <title> tags found — Bing Webmaster URL Inspection "
              f"reports this as 'More than one title tag' ({len(titles)} instances); "
              "expected exactly 1")
    else:
        t = titles[0].get_text(strip=True)
        if not titles[0].has_attr("data-rh"):
            issue("warning", "TITLE_NO_DRH",
                  '<title> missing data-rh="true" â€” react-helmet-async '
                  "may add a second title on hydration")
        if not t:
            issue("error", "TITLE_EMPTY", "<title> is empty")
        elif len(t) > TITLE_MAX:
            issue("warning", "TITLE_TOO_LONG",
                  f"<title> is {len(t)} chars (recommended â‰¤ {TITLE_MAX}): "
                  f"{t[:65]}â€¦")
        elif len(t) < TITLE_MIN:
            issue("warning", "TITLE_TOO_SHORT",
                  f"<title> is only {len(t)} chars (recommended â‰¥ {TITLE_MIN}): {t}")
        else:
            issue("ok", "TITLE_OK", f"<title> ({len(t)} chars): {t}")

    # â”€â”€ 2. <meta name="title"> (non-standard â€” BingMaster flags it) â”€â”€â”€
    meta_titles = head.find_all("meta", attrs={"name": "title"})
    if meta_titles:
        issue("error", "META_TITLE_PRESENT",
              f'<meta name="title"> found ({len(meta_titles)} instance(s)) â€” '
              "BingMaster treats this as a second title; remove it")
    else:
        issue("ok", "META_TITLE_ABSENT", '<meta name="title"> correctly absent')

    # â”€â”€ 3. <meta name="description"> â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    descs = head.find_all("meta", attrs={"name": "description"})
    if not descs:
        issue("error", "DESC_MISSING", 'No <meta name="description"> found')
    elif len(descs) > 1:
        issue("error", "DESC_DUPLICATE",
              f'{len(descs)} <meta name="description"> tags — Bing Webmaster URL '
              f"Inspection reports this as 'More than one Meta Description tag' "
              f"({len(descs)} instances); expected exactly 1")
    else:
        d = descs[0].get("content", "")
        if not descs[0].has_attr("data-rh"):
            issue("warning", "DESC_NO_DRH",
                  '<meta name="description"> missing data-rh="true"')
        if not d:
            issue("error", "DESC_EMPTY", "Meta description is empty")
        elif len(d) > DESC_MAX:
            issue("warning", "DESC_TOO_LONG",
                  f"Meta description is {len(d)} chars "
                  f"(Bing max â‰ˆ {DESC_MAX}): {d[:80]}â€¦")
        elif len(d) < DESC_MIN:
            issue("warning", "DESC_TOO_SHORT",
                  f"Meta description is only {len(d)} chars "
                  f"(recommended â‰¥ {DESC_MIN}): {d}")
        else:
            issue("ok", "DESC_OK",
                  f"Meta description ({len(d)} chars): "
                  f"{d[:80]}â€¦" if len(d) > 80 else f"Meta description ({len(d)} chars): {d}")

    # â”€â”€ 4. <link rel="canonical"> â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    canonicals = head.find_all("link", attrs={"rel": "canonical"})
    if not canonicals:
        issue("error", "CANONICAL_MISSING", 'No <link rel="canonical"> found')
    elif len(canonicals) > 1:
        issue("error", "CANONICAL_DUPLICATE",
              f'{len(canonicals)} canonical tags found — Bing Webmaster URL Inspection '
              f"reports this as 'More than one canonical tag' ({len(canonicals)} instances); "
              "expected exactly 1")
    else:
        href = canonicals[0].get("href", "")
        if not canonicals[0].has_attr("data-rh"):
            issue("warning", "CANONICAL_NO_DRH",
                  '<link rel="canonical"> missing data-rh="true"')
        parsed_href = urlparse(href)
        parsed_url  = urlparse(url)
        if parsed_href.path.rstrip("/") != parsed_url.path.rstrip("/"):
            issue("error", "CANONICAL_MISMATCH",
                  f"Canonical ({href}) â‰  page URL ({url})")
        elif not href.startswith("https://"):
            issue("warning", "CANONICAL_NOT_HTTPS",
                  f"Canonical is not HTTPS: {href}")
        else:
            issue("ok", "CANONICAL_OK", f"Canonical: {href}")

    # â”€â”€ 5. H1 presence and uniqueness â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    # Check both the live DOM and noscript (for non-JS crawlers).
    # Exclude <h1> tags that are already inside <noscript> from h1_live to
    # avoid double-counting: BS4's find_all descends into noscript, so without
    # this filter every noscript H1 appears in both lists.
    noscripts   = body.find_all("noscript")
    h1_live     = [h for h in body.find_all("h1") if not h.find_parent("noscript")]
    h1_noscript = []
    for ns in noscripts:
        h1_noscript.extend(ns.find_all("h1"))

    all_h1 = h1_live + h1_noscript
    if not all_h1:
        issue("error", "H1_MISSING",
              "No <h1> tag found (check both live DOM and noscript blocks)")
    elif len(all_h1) > 2:
        # Allow up to 2: one in noscript pre-render block + one in React render
        issue("warning", "H1_MULTIPLE",
              f"{len(all_h1)} <h1> tags found â€” consolidate to a single primary H1")
    else:
        h1_text = (h1_live[0] if h1_live else h1_noscript[0]).get_text(" ", strip=True)
        issue("ok", "H1_OK", f"<h1>: {h1_text[:80]}")

    # â”€â”€ 6. Robots meta â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    robots = head.find("meta", attrs={"name": "robots"})
    if not robots:
        issue("warning", "ROBOTS_MISSING", 'No <meta name="robots"> found')
    else:
        content = robots.get("content", "").lower()
        if "noindex" in content:
            issue("error", "ROBOTS_NOINDEX",
                  f'Page is set to noindex: content="{content}"')
        else:
            issue("ok", "ROBOTS_OK", f'robots: {content}')

    # â”€â”€ 7. Open Graph â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    og_required = ["og:type", "og:url", "og:title", "og:description", "og:image"]
    for prop in og_required:
        tag = head.find("meta", attrs={"property": prop})
        if not tag:
            issue("warning", f"OG_{prop.upper().replace(':','_')}_MISSING",
                  f'Missing <meta property="{prop}">')
        else:
            val = tag.get("content", "")
            if not val:
                issue("warning", f"OG_{prop.upper().replace(':','_')}_EMPTY",
                      f'<meta property="{prop}"> is empty')
            else:
                issue("ok", f"OG_{prop.upper().replace(':','_')}_OK",
                      f"{prop} = {val[:70]}")

    # â”€â”€ 8. Twitter Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    tw_card = head.find("meta", attrs={"name": "twitter:card"})
    if not tw_card:
        issue("warning", "TWITTER_CARD_MISSING", 'No <meta name="twitter:card">')
    else:
        issue("ok", "TWITTER_CARD_OK",
              f"twitter:card = {tw_card.get('content','')}")

    # ── 9. data-rh hydration markers ─────────────────────────────────────
    drh_tags = head.find_all(attrs={"data-rh": True})
    if len(drh_tags) < 3:
        issue("warning", "DRH_LOW",
              f"Only {len(drh_tags)} data-rh=\"true\" tags — "
              "prerender may not have injected all page-specific meta "
              "(title, description, canonical)")
    else:
        issue("ok", "DRH_PRESENT",
              f"{len(drh_tags)} data-rh tags present (prerendered meta visible to non-JS crawlers)")

    # ── 10. Bing duplicate-tag protection ── data-rh cleanup script ────────
    # react-helmet-async in pure-client mode (HelmetProvider without SSR context)
    # does NOT adopt prerendered data-rh tags; it appends its own alongside them.
    # Bing URL Inspection (which executes JS) then sees both sets and reports:
    #   "More than one title tag"
    #   "More than one Meta Description tag"
    #   "More than one canonical tag"
    # Fix: inject an inline <script> in <head> that removes [data-rh] elements
    # synchronously before the deferred React module scripts execute.
    _cleanup_inline = [
        s for s in head.find_all("script")
        if not s.get("src") and s.get("type") != "application/ld+json"
        and "[data-rh]" in (s.string or "")
    ]
    if drh_tags and not _cleanup_inline:
        issue("error", "BING_DRH_NO_CLEANUP",
              f"{len(drh_tags)} data-rh tag(s) present but no inline cleanup script "
              "found — Bing URL Inspection will report duplicate title / description / "
              "canonical after React mounts. "
              "Fix: add to <head> before React scripts: "
              "<script>document.querySelectorAll('[data-rh]').forEach(e=>e.remove())</script>")
    elif _cleanup_inline:
        issue("ok", "BING_DRH_CLEANUP_OK",
              f"data-rh cleanup script present — JS crawlers (Bing, Googlebot) will "
              "see exactly one title / description / canonical after React mounts")
    else:
        issue("ok", "BING_DRH_NA",
              "No data-rh tags in static HTML — cleanup script not needed")

    # â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    # AEO CHECKS  (Answer Engine Optimisation)
    # â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

    ld_scripts = head.find_all("script", attrs={"type": "application/ld+json"})
    ld_scripts += body.find_all("script", attrs={"type": "application/ld+json"})

    schemas = []
    schema_types = set()
    for s in ld_scripts:
        try:
            data = json.loads(s.string or "{}")
            schemas.append(data)
            t = data.get("@type", "")
            if isinstance(t, list):
                schema_types.update(t)
            elif t:
                schema_types.add(t)
        except (json.JSONDecodeError, TypeError):
            issue("warning", "SCHEMA_JSON_INVALID",
                  "A JSON-LD <script> block contains invalid JSON", lens="AEO")

    if not schemas:
        issue("warning", "SCHEMA_MISSING",
              "No JSON-LD structured data found", lens="AEO")
    else:
        issue("ok", "SCHEMA_PRESENT",
              f"{len(schemas)} JSON-LD block(s) found; types: "
              f"{', '.join(sorted(schema_types)) or 'unknown'}", lens="AEO")

    # FAQPage
    has_faq = any(
        d.get("@type") == "FAQPage" or
        (isinstance(d.get("@type"), list) and "FAQPage" in d["@type"])
        for d in schemas
    )
    # Also detect FAQ embedded via mainEntity
    has_faq_embedded = any(
        "mainEntity" in d and isinstance(d.get("mainEntity"), list) and
        any(q.get("@type") == "Question" for q in d["mainEntity"])
        for d in schemas
    )
    if has_faq or has_faq_embedded:
        # Count questions
        q_count = sum(
            len([q for q in d.get("mainEntity", []) if q.get("@type") == "Question"])
            for d in schemas
        )
        issue("ok", "FAQ_SCHEMA_OK",
              f"FAQPage schema found ({q_count} Question(s))", lens="AEO")
    else:
        # Not an error â€” many pages won't have FAQ schema
        # Check if page prose has Q&A patterns
        h2s = [t.get_text(strip=True) for t in body.find_all("h2")]
        h3s = [t.get_text(strip=True) for t in body.find_all("h3")]
        qa_headings = [h for h in h2s + h3s
                       if re.search(r"(what|how|why|when|can|do |is |are |which)",
                                    h, re.I)]
        if qa_headings:
            issue("ok", "FAQ_PROSE_OK",
                  f"No FAQPage schema, but {len(qa_headings)} Q&A-style headings "
                  f"found (consider adding FAQPage JSON-LD for AEO lift)", lens="AEO")
        else:
            issue("ok", "FAQ_ABSENT",
                  "No FAQ schema and no Q&A headings detected on this page", lens="AEO")

    # HowTo
    has_howto = any(d.get("@type") == "HowTo" for d in schemas)
    if has_howto:
        step_count = sum(len(d.get("step", [])) for d in schemas
                         if d.get("@type") == "HowTo")
        issue("ok", "HOWTO_SCHEMA_OK",
              f"HowTo schema found ({step_count} step(s))", lens="AEO")
    else:
        issue("ok", "HOWTO_ABSENT", "No HowTo schema (not required for this page)", lens="AEO")

    # Article / BlogPosting
    has_article = any(d.get("@type") in {"Article", "BlogPosting", "NewsArticle"}
                      for d in schemas)
    # Only warn for blog *post* pages (slug present after /blog/),
    # not the /blog/ listing page which is a CollectionPage.
    _path_segs = [p for p in urlparse(url).path.split('/') if p]
    _is_blog_post = len(_path_segs) >= 2 and _path_segs[0] == 'blog'
    if _is_blog_post and not has_article:
        issue("warning", "ARTICLE_SCHEMA_MISSING",
              "Blog post has no Article/BlogPosting JSON-LD — "
              "add it for Google News & AI citation eligibility", lens="AEO")
    elif has_article:
        issue("ok", "ARTICLE_SCHEMA_OK", "Article/BlogPosting schema present", lens="AEO")

    # BreadcrumbList
    has_breadcrumb = any(d.get("@type") == "BreadcrumbList" for d in schemas)
    if has_breadcrumb:
        issue("ok", "BREADCRUMB_OK", "BreadcrumbList schema present", lens="AEO")
    else:
        issue("ok", "BREADCRUMB_ABSENT",
              "No BreadcrumbList schema (add for richer search snippets)", lens="AEO")

    # â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    # GEO CHECKS  (Generative Engine Optimisation)
    # â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

    # LocalBusiness / Organization schema
    has_local_biz = any(
        d.get("@type") in {"LocalBusiness", "Organization", "ProfessionalService"}
        for d in schemas
    )
    if has_local_biz:
        lb = next(d for d in schemas
                  if d.get("@type") in {"LocalBusiness","Organization","ProfessionalService"})
        # Check key fields
        for field in ("name", "url", "telephone", "address", "description"):
            if not lb.get(field):
                issue("warning", f"LOCALBIZ_{field.upper()}_MISSING",
                      f'LocalBusiness schema missing "{field}" field', lens="GEO")
        if lb.get("sameAs"):
            issue("ok", "SAMEAS_OK",
                  f"sameAs: {len(lb['sameAs'])} social/map profile(s)", lens="GEO")
        else:
            issue("warning", "SAMEAS_MISSING",
                  "LocalBusiness schema has no sameAs social links", lens="GEO")
        issue("ok", "LOCALBIZ_OK",
              f"LocalBusiness/Organization schema: name={lb.get('name','')}", lens="GEO")
    else:
        issue("warning", "LOCALBIZ_MISSING",
              "No LocalBusiness/Organization JSON-LD â€” "
              "critical for AI citation of local service providers", lens="GEO")

    # AggregateRating
    has_rating = any("aggregateRating" in d for d in schemas)
    if has_rating:
        ar = next(d["aggregateRating"] for d in schemas if "aggregateRating" in d)
        issue("ok", "AGGREGATE_RATING_OK",
              f"AggregateRating: {ar.get('ratingValue','?')}â˜… "
              f"({ar.get('reviewCount','?')} reviews)", lens="GEO")
    else:
        issue("warning", "AGGREGATE_RATING_MISSING",
              "No AggregateRating in schema â€” hurts trust signals in AI summaries",
              lens="GEO")

    # Review items
    all_reviews = []
    for d in schemas:
        all_reviews.extend(d.get("review", []))
    if all_reviews:
        bodies = sum(1 for r in all_reviews if r.get("reviewBody"))
        issue("ok", "REVIEWS_OK",
              f"{len(all_reviews)} Review(s) in schema, "
              f"{bodies} with reviewBody text", lens="GEO")
    else:
        issue("ok", "REVIEWS_ABSENT",
              "No Review objects in schema (helpful but not required)", lens="GEO")

    # Brand name in title
    if titles:
        t_text = titles[0].get_text(strip=True).lower()
        if "kraftykinni" in t_text:
            issue("ok", "BRAND_IN_TITLE",
                  'Brand name "Kraftykinni" present in <title>', lens="GEO")
        else:
            issue("warning", "BRAND_NOT_IN_TITLE",
                  'Brand name "Kraftykinni" absent from <title> â€” '
                  "AI models use titles to attribute content", lens="GEO")

    # E-E-A-T keyword signals (in full page text incl. noscript)
    found_eeat = [kw for kw in EEAT_KEYWORDS if kw.lower() in full_text]
    if len(found_eeat) >= 3:
        issue("ok", "EEAT_SIGNALS_OK",
              f"E-E-A-T signals found: {', '.join(found_eeat)}", lens="GEO")
    elif found_eeat:
        issue("warning", "EEAT_SIGNALS_LOW",
              f"Only {len(found_eeat)} E-E-A-T signal(s) detected "
              f"({', '.join(found_eeat)}) â€” add credentials, experience stats, "
              f"and certifications to page content", lens="GEO")
    else:
        issue("warning", "EEAT_SIGNALS_MISSING",
              "No E-E-A-T signals detected â€” add author credentials, "
              "workshop count, and certification to page text", lens="GEO")

    # Pricing info (GEO: AI models surface price info prominently)
    price_pattern = re.compile(r"â‚¹\s*\d{3}", re.UNICODE)
    price_in_text = bool(price_pattern.search(full_text))
    price_in_schema = any(d.get("priceRange") for d in schemas)
    if price_in_text or price_in_schema:
        issue("ok", "PRICE_SIGNAL_OK",
              "Price information found in page content/schema", lens="GEO")
    else:
        issue("warning", "PRICE_SIGNAL_MISSING",
              "No price information detected â€” AI engines highlight pricing for "
              "service pages", lens="GEO")

    return issues


# â”€â”€ Reporting â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

LEVEL_ICON = {
    "error":   c(RED,    "âœ— ERROR  "),
    "warning": c(YELLOW, "âš  WARNING"),
    "ok":      c(GREEN,  "âœ“ OK     "),
}
LENS_COLOR = {"SEO": BLUE, "AEO": MAGENTA, "GEO": CYAN}


def print_issues(issues: list[dict], verbose: bool = False) -> tuple[int, int]:
    # Group by lens for organized output
    for lens in ("SEO", "AEO", "GEO"):
        lens_issues = [i for i in issues if i.get("lens", "SEO") == lens]
        errors   = [i for i in lens_issues if i["level"] == "error"]
        warnings = [i for i in lens_issues if i["level"] == "warning"]
        oks      = [i for i in lens_issues if i["level"] == "ok"]

        header = c(LENS_COLOR[lens], f"  [{lens}]")

        non_ok = errors + warnings
        if non_ok:
            print(header)
            for i in non_ok:
                print(f"    {LEVEL_ICON[i['level']]}  [{i['code']}] {i['message']}")
            if verbose:
                for i in oks:
                    print(f"    {LEVEL_ICON['ok']}  [{i['code']}] {i['message']}")
            elif oks:
                print(c(GREY, f"             ({len(oks)} {lens} checks passed)"))
        elif verbose:
            print(header)
            for i in oks:
                print(f"    {LEVEL_ICON['ok']}  [{i['code']}] {i['message']}")
        else:
            pass_count = len(oks)
            print(f"  {c(LENS_COLOR[lens], f'[{lens}]')} {c(GREEN, f'âœ“ {pass_count} checks passed')}")

    all_errors   = [i for i in issues if i["level"] == "error"]
    all_warnings = [i for i in issues if i["level"] == "warning"]
    return len(all_errors), len(all_warnings)


# â”€â”€ Main â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

def main():
    parser = argparse.ArgumentParser(
        description="Validate SEO/AEO/GEO signals for Kraftykinni pre-rendered pages"
    )
    parser.add_argument("--url",     help="Test a single URL only")
    parser.add_argument("--local",   help="Path to local dist/ folder (offline)")
    parser.add_argument("--verbose", action="store_true",
                        help="Show all passing checks, not just failures")
    args = parser.parse_args()

    urls     = [f"{BASE_URL}{r}" for r in ROUTES] if not args.url else [args.url]
    dist_dir = Path(args.local) if args.local else None

    total_errors = total_warnings = total_pages = 0

    print()
    print(c(BOLD, "â•" * 70))
    print(c(BOLD, "  Kraftykinni SEO / AEO / GEO Validator  (v2)"))
    print(c(BOLD, f"  {c(BLUE,'SEO')} = search signals  "
                  f"{c(MAGENTA,'AEO')} = answer engines  "
                  f"{c(CYAN,'GEO')} = generative AI"))
    print(c(BOLD, "â•" * 70))
    print()

    for url in urls:
        total_pages += 1
        route = urlparse(url).path or "/"

        print(c(BOLD + CYAN, f"â–¶ {url}"))

        if dist_dir:
            status, html = load_local_html(dist_dir, route)
        else:
            status, html = fetch_html(url)
            time.sleep(REQUEST_DELAY)

        if status == 404:
            print(f"    {c(RED, 'âœ— ERROR  ')}  [HTTP_404] Page returned 404\n")
            total_errors += 1
            continue
        if status == -1 or not html:
            print(f"    {c(RED, 'âœ— ERROR  ')}  [FETCH_ERR] {html}\n")
            total_errors += 1
            continue
        if status != 200:
            print(f"    {c(YELLOW, 'âš  WARNING')}  [HTTP_{status}] Unexpected status {status}")
            total_warnings += 1

        page_issues = validate_html(url, html)
        e, w = print_issues(page_issues, verbose=args.verbose)
        total_errors   += e
        total_warnings += w
        print()

    # Summary
    print(c(BOLD, "â•" * 70))
    print(c(BOLD, f"  Summary: {total_pages} page(s) checked"))
    if total_errors == 0 and total_warnings == 0:
        print(c(GREEN, "  âœ“ All checks passed â€” no errors, no warnings"))
    else:
        if total_errors:
            print(c(RED,    f"  âœ— {total_errors} error(s) found"))
        if total_warnings:
            print(c(YELLOW, f"  âš  {total_warnings} warning(s) found"))
    print(c(BOLD, "â•" * 70))
    print()

    sys.exit(1 if total_errors else 0)


if __name__ == "__main__":
    main()
