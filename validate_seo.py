"""
validate_seo.py  —  Kraftykinni SEO / AEO / GEO Validator  (v2)
────────────────────────────────────────────────────────────────
Three lenses in one script:

  SEO  — Classic search-engine signals
         title · meta description · canonical · H1 · robots
         Open Graph · Twitter Card · data-rh hydration marker

  AEO  — Answer Engine Optimisation  (featured snippets, AI Overviews)
         FAQPage / HowTo / Article / BreadcrumbList JSON-LD
         Q&A content patterns in noscript prose

  GEO  — Generative Engine Optimisation  (AI citations & brand clarity)
         LocalBusiness / Organization / Person schema
         AggregateRating · Review schema
         E-E-A-T signals · author / credential mentions
         Brand-name consistency · sameAs social profiles

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

# ── Config ────────────────────────────────────────────────────────────────────

BASE_URL = "https://kraftykinni.in"

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
    "/blog/fathers-day-gift-ideas-art-workshop-delhi-ncr-2026/",
]

# SEO length thresholds
TITLE_MIN = 30
TITLE_MAX = 60          # Google truncates beyond ~60; Bing beyond ~65
DESC_MIN  = 120
DESC_MAX  = 155         # Bing flags outside 70–155 range

REQUEST_DELAY   = 1.2
REQUEST_TIMEOUT = 15

# GEO — keywords that signal E-E-A-T (experience / expertise / authority / trust)
EEAT_KEYWORDS = [
    "fevicryl certified", "certified artist", "shramita govil",
    "1,500+ participants", "50+ workshops", "fevicryl", "kraftykinni",
]

# ── ANSI colours ──────────────────────────────────────────────────────────────

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


# ── Network helpers ───────────────────────────────────────────────────────────

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


# ── Core validation ───────────────────────────────────────────────────────────

def validate_html(url: str, html: str) -> list[dict]:
    soup  = BeautifulSoup(html, "html.parser")
    head  = soup.head or BeautifulSoup("", "html.parser")
    body  = soup.body or BeautifulSoup("", "html.parser")
    full_text = soup.get_text(" ", strip=True).lower()
    issues = []

    def issue(level, code, msg, lens="SEO"):
        issues.append({"level": level, "code": code, "message": msg, "lens": lens})

    # ══════════════════════════════════════════════════════════════════
    # SEO CHECKS
    # ══════════════════════════════════════════════════════════════════

    # ── 1. <title> ────────────────────────────────────────────────────
    titles = head.find_all("title")
    if not titles:
        issue("error", "TITLE_MISSING", "No <title> tag found")
    elif len(titles) > 1:
        issue("error", "TITLE_DUPLICATE",
              f"{len(titles)} <title> tags found — expected exactly 1")
    else:
        t = titles[0].get_text(strip=True)
        if not titles[0].has_attr("data-rh"):
            issue("warning", "TITLE_NO_DRH",
                  '<title> missing data-rh="true" — react-helmet-async '
                  "may add a second title on hydration")
        if not t:
            issue("error", "TITLE_EMPTY", "<title> is empty")
        elif len(t) > TITLE_MAX:
            issue("warning", "TITLE_TOO_LONG",
                  f"<title> is {len(t)} chars (recommended ≤ {TITLE_MAX}): "
                  f"{t[:65]}…")
        elif len(t) < TITLE_MIN:
            issue("warning", "TITLE_TOO_SHORT",
                  f"<title> is only {len(t)} chars (recommended ≥ {TITLE_MIN}): {t}")
        else:
            issue("ok", "TITLE_OK", f"<title> ({len(t)} chars): {t}")

    # ── 2. <meta name="title"> (non-standard — BingMaster flags it) ───
    meta_titles = head.find_all("meta", attrs={"name": "title"})
    if meta_titles:
        issue("error", "META_TITLE_PRESENT",
              f'<meta name="title"> found ({len(meta_titles)} instance(s)) — '
              "BingMaster treats this as a second title; remove it")
    else:
        issue("ok", "META_TITLE_ABSENT", '<meta name="title"> correctly absent')

    # ── 3. <meta name="description"> ─────────────────────────────────
    descs = head.find_all("meta", attrs={"name": "description"})
    if not descs:
        issue("error", "DESC_MISSING", 'No <meta name="description"> found')
    elif len(descs) > 1:
        issue("error", "DESC_DUPLICATE",
              f'{len(descs)} <meta name="description"> tags — expected 1 '
              f'(Bing flags duplicates)')
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
                  f"(Bing max ≈ {DESC_MAX}): {d[:80]}…")
        elif len(d) < DESC_MIN:
            issue("warning", "DESC_TOO_SHORT",
                  f"Meta description is only {len(d)} chars "
                  f"(recommended ≥ {DESC_MIN}): {d}")
        else:
            issue("ok", "DESC_OK",
                  f"Meta description ({len(d)} chars): "
                  f"{d[:80]}…" if len(d) > 80 else f"Meta description ({len(d)} chars): {d}")

    # ── 4. <link rel="canonical"> ─────────────────────────────────────
    canonicals = head.find_all("link", attrs={"rel": "canonical"})
    if not canonicals:
        issue("error", "CANONICAL_MISSING", 'No <link rel="canonical"> found')
    elif len(canonicals) > 1:
        issue("error", "CANONICAL_DUPLICATE",
              f'{len(canonicals)} canonical tags found — expected exactly 1')
    else:
        href = canonicals[0].get("href", "")
        if not canonicals[0].has_attr("data-rh"):
            issue("warning", "CANONICAL_NO_DRH",
                  '<link rel="canonical"> missing data-rh="true"')
        parsed_href = urlparse(href)
        parsed_url  = urlparse(url)
        if parsed_href.path.rstrip("/") != parsed_url.path.rstrip("/"):
            issue("error", "CANONICAL_MISMATCH",
                  f"Canonical ({href}) ≠ page URL ({url})")
        elif not href.startswith("https://"):
            issue("warning", "CANONICAL_NOT_HTTPS",
                  f"Canonical is not HTTPS: {href}")
        else:
            issue("ok", "CANONICAL_OK", f"Canonical: {href}")

    # ── 5. H1 presence and uniqueness ────────────────────────────────
    # Check both the live DOM and noscript (for non-JS crawlers)
    h1_live     = body.find_all("h1")
    noscripts   = body.find_all("noscript")
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
              f"{len(all_h1)} <h1> tags found — consolidate to a single primary H1")
    else:
        h1_text = (h1_live[0] if h1_live else h1_noscript[0]).get_text(" ", strip=True)
        issue("ok", "H1_OK", f"<h1>: {h1_text[:80]}")

    # ── 6. Robots meta ────────────────────────────────────────────────
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

    # ── 7. Open Graph ─────────────────────────────────────────────────
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

    # ── 8. Twitter Card ───────────────────────────────────────────────
    tw_card = head.find("meta", attrs={"name": "twitter:card"})
    if not tw_card:
        issue("warning", "TWITTER_CARD_MISSING", 'No <meta name="twitter:card">')
    else:
        issue("ok", "TWITTER_CARD_OK",
              f"twitter:card = {tw_card.get('content','')}")

    # ── 9. data-rh hydration markers ─────────────────────────────────
    drh_tags = head.find_all(attrs={"data-rh": True})
    if len(drh_tags) < 3:
        issue("warning", "DRH_LOW",
              f"Only {len(drh_tags)} data-rh=\"true\" tags — "
              "react-helmet-async may duplicate meta on hydration")
    else:
        issue("ok", "DRH_PRESENT",
              f"{len(drh_tags)} tags carry data-rh=\"true\" "
              "(react-helmet-async will correctly swap them)")

    # ══════════════════════════════════════════════════════════════════
    # AEO CHECKS  (Answer Engine Optimisation)
    # ══════════════════════════════════════════════════════════════════

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
        # Not an error — many pages won't have FAQ schema
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
    if "/blog/" in url and not has_article:
        issue("warning", "ARTICLE_SCHEMA_MISSING",
              "Blog page has no Article/BlogPosting JSON-LD — "
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

    # ══════════════════════════════════════════════════════════════════
    # GEO CHECKS  (Generative Engine Optimisation)
    # ══════════════════════════════════════════════════════════════════

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
              "No LocalBusiness/Organization JSON-LD — "
              "critical for AI citation of local service providers", lens="GEO")

    # AggregateRating
    has_rating = any("aggregateRating" in d for d in schemas)
    if has_rating:
        ar = next(d["aggregateRating"] for d in schemas if "aggregateRating" in d)
        issue("ok", "AGGREGATE_RATING_OK",
              f"AggregateRating: {ar.get('ratingValue','?')}★ "
              f"({ar.get('reviewCount','?')} reviews)", lens="GEO")
    else:
        issue("warning", "AGGREGATE_RATING_MISSING",
              "No AggregateRating in schema — hurts trust signals in AI summaries",
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
                  'Brand name "Kraftykinni" absent from <title> — '
                  "AI models use titles to attribute content", lens="GEO")

    # E-E-A-T keyword signals (in full page text incl. noscript)
    found_eeat = [kw for kw in EEAT_KEYWORDS if kw.lower() in full_text]
    if len(found_eeat) >= 3:
        issue("ok", "EEAT_SIGNALS_OK",
              f"E-E-A-T signals found: {', '.join(found_eeat)}", lens="GEO")
    elif found_eeat:
        issue("warning", "EEAT_SIGNALS_LOW",
              f"Only {len(found_eeat)} E-E-A-T signal(s) detected "
              f"({', '.join(found_eeat)}) — add credentials, experience stats, "
              f"and certifications to page content", lens="GEO")
    else:
        issue("warning", "EEAT_SIGNALS_MISSING",
              "No E-E-A-T signals detected — add author credentials, "
              "workshop count, and certification to page text", lens="GEO")

    # Pricing info (GEO: AI models surface price info prominently)
    price_pattern = re.compile(r"₹\s*\d{3}", re.UNICODE)
    price_in_text = bool(price_pattern.search(full_text))
    price_in_schema = any(d.get("priceRange") for d in schemas)
    if price_in_text or price_in_schema:
        issue("ok", "PRICE_SIGNAL_OK",
              "Price information found in page content/schema", lens="GEO")
    else:
        issue("warning", "PRICE_SIGNAL_MISSING",
              "No price information detected — AI engines highlight pricing for "
              "service pages", lens="GEO")

    return issues


# ── Reporting ─────────────────────────────────────────────────────────────────

LEVEL_ICON = {
    "error":   c(RED,    "✗ ERROR  "),
    "warning": c(YELLOW, "⚠ WARNING"),
    "ok":      c(GREEN,  "✓ OK     "),
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
            print(f"  {c(LENS_COLOR[lens], f'[{lens}]')} {c(GREEN, f'✓ {pass_count} checks passed')}")

    all_errors   = [i for i in issues if i["level"] == "error"]
    all_warnings = [i for i in issues if i["level"] == "warning"]
    return len(all_errors), len(all_warnings)


# ── Main ──────────────────────────────────────────────────────────────────────

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
    print(c(BOLD, "═" * 70))
    print(c(BOLD, "  Kraftykinni SEO / AEO / GEO Validator  (v2)"))
    print(c(BOLD, f"  {c(BLUE,'SEO')} = search signals  "
                  f"{c(MAGENTA,'AEO')} = answer engines  "
                  f"{c(CYAN,'GEO')} = generative AI"))
    print(c(BOLD, "═" * 70))
    print()

    for url in urls:
        total_pages += 1
        route = urlparse(url).path or "/"

        print(c(BOLD + CYAN, f"▶ {url}"))

        if dist_dir:
            status, html = load_local_html(dist_dir, route)
        else:
            status, html = fetch_html(url)
            time.sleep(REQUEST_DELAY)

        if status == 404:
            print(f"    {c(RED, '✗ ERROR  ')}  [HTTP_404] Page returned 404\n")
            total_errors += 1
            continue
        if status == -1 or not html:
            print(f"    {c(RED, '✗ ERROR  ')}  [FETCH_ERR] {html}\n")
            total_errors += 1
            continue
        if status != 200:
            print(f"    {c(YELLOW, '⚠ WARNING')}  [HTTP_{status}] Unexpected status {status}")
            total_warnings += 1

        page_issues = validate_html(url, html)
        e, w = print_issues(page_issues, verbose=args.verbose)
        total_errors   += e
        total_warnings += w
        print()

    # Summary
    print(c(BOLD, "═" * 70))
    print(c(BOLD, f"  Summary: {total_pages} page(s) checked"))
    if total_errors == 0 and total_warnings == 0:
        print(c(GREEN, "  ✓ All checks passed — no errors, no warnings"))
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
