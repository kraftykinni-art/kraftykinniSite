#!/usr/bin/env python3
"""
validate_links.py

Scan a static site (for example, the built dist/ output) for broken internal links.
It reports:
  - dead internal URLs
  - likely 404 routes
  - links that point to missing HTML pages or folders

Usage:
  python validate_links.py --root dist
  python validate_links.py --root public
  python validate_links.py --root dist --base-url https://kraftykinni.in
  python validate_links.py --root dist --check-live --base-url https://kraftykinni.in
"""

from __future__ import annotations

import argparse
import os
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, urlunparse, unquote

try:
    import requests
except ImportError:  # pragma: no cover
    requests = None

IGNORE_PREFIXES = (
    "mailto:",
    "tel:",
    "javascript:",
    "data:",
    "#",
)


class LinkCollector(HTMLParser):
    """Collect href/src values from HTML tags."""

    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs) -> None:
        attr_map = dict(attrs)
        for key in ("href", "src", "action"):
            value = attr_map.get(key)
            if value:
                self.links.append(value)


def is_external(url: str) -> bool:
    parsed = urlparse(url)
    return bool(parsed.scheme and parsed.scheme in {"http", "https"}) or url.startswith("//")


def is_ignored(url: str) -> bool:
    stripped = url.strip()
    if not stripped:
        return True
    if stripped.startswith(IGNORE_PREFIXES):
        return True
    return False


def extless_candidates(path: Path) -> list[Path]:
    """Return likely file targets for a URL path: file.html, file/index.html, directory index."""
    if not path.name:
        return [path / "index.html"]

    candidates: list[Path] = []
    candidates.append(path)

    if path.suffix == "":
        candidates.extend([
            path.with_suffix(".html"),
            path / "index.html",
            path.with_suffix(".htm"),
        ])
    else:
        candidates.extend([
            path.with_suffix(".html"),
            path.parent / (path.name + "/index.html") if path.name.lower().endswith(".html") else path,
        ])

    # Deduplicate while keeping order.
    unique: list[Path] = []
    seen: set[Path] = set()
    for candidate in candidates:
        resolved = candidate.resolve(strict=False)
        if resolved not in seen:
            unique.append(resolved)
            seen.add(resolved)
    return unique


def page_route_lookup(site_root: Path, href: str, current_file: Path | None = None) -> list[Path]:
    """Convert an href to filesystem candidates relative to the site root."""
    if is_external(href) or is_ignored(href):
        return []

    clean_href = href.split("#", 1)[0].split("?", 1)[0].strip()
    if not clean_href or clean_href == "/":
        return [site_root / "index.html"]

    parsed = urlparse(clean_href)
    raw_path = unquote(parsed.path)
    if not raw_path:
        return []

    if raw_path.startswith("/"):
        rel = raw_path.lstrip("/")
        if rel.endswith("/"):
            rel = rel.rstrip("/")
        base = site_root
    else:
        if current_file is None:
            base = site_root
        else:
            base = current_file.parent
        rel = raw_path

    # Compute a path under the root if possible.
    try:
        target = (base / rel).resolve(strict=False)
    except Exception:
        target = (site_root / rel).resolve(strict=False)

    # If the target is outside the site root, use rooted resolution against site_root.
    try:
        target.relative_to(site_root.resolve())
    except ValueError:
        target = (site_root / rel).resolve(strict=False)

    return extless_candidates(target)


def html_files(site_root: Path) -> list[Path]:
    if not site_root.exists():
        raise FileNotFoundError(f"Site root not found: {site_root}")

    return sorted(
        p.resolve() for p in site_root.rglob("*.html") if p.is_file()
    )


def collect_links(html_path: Path) -> list[str]:
    text = html_path.read_text(encoding="utf-8", errors="replace")
    parser = LinkCollector()
    parser.feed(text)
    return parser.links


def live_check(url: str) -> tuple[int, str]:
    if requests is None:
        return (-1, "requests is not installed")

    try:
        response = requests.get(url, timeout=15, allow_redirects=True)
        return response.status_code, response.url
    except Exception as exc:  # pragma: no cover
        return (-1, str(exc))


def main() -> int:
    parser = argparse.ArgumentParser(description="Find dead links and likely 404s in a static website.")
    parser.add_argument("--root", type=Path, default=Path("dist"), help="Site root directory to scan (default: dist)")
    parser.add_argument("--base-url", default="", help="Optional site base URL for live HTTP checks (example: https://kraftykinni.in)")
    parser.add_argument("--check-live", action="store_true", help="Also fetch live URLs for broken links using the base URL")
    parser.add_argument("--verbose", action="store_true", help="Print all checked links")
    args = parser.parse_args()

    site_root = args.root.resolve()

    try:
        pages = html_files(site_root)
    except FileNotFoundError as exc:
        print(f"ERROR: {exc}")
        return 2

    broken: list[str] = []
    checked_total = 0
    missing_total = 0

    for page in pages:
        page_links = collect_links(page)
        for href in page_links:
            if is_ignored(href):
                continue
            if is_external(href):
                continue

            checked_total += 1
            candidates = page_route_lookup(site_root, href, page)
            exists = any(candidate.exists() for candidate in candidates)

            if args.verbose:
                relative = page.relative_to(site_root)
                print(f"{relative} -> {href}  => {len(candidates)} candidate(s): {', '.join(str(c.relative_to(site_root)) for c in candidates[:3])}")

            if not exists:
                missing_total += 1
                broken.append(f"{page.relative_to(site_root)} -> {href}  [missing]")

    if broken:
        print(f"Dead links found: {missing_total}")
        for item in broken:
            print("  -", item)
    else:
        print(f"No dead internal links found across {len(pages)} HTML files.")

    if args.check_live and args.base_url:
        print("\nLive HTTP verification:")
        live_missing = 0
        for item in broken:
            _, target = item.split(" -> ", 1)
            target = target.replace("  [missing]", "").strip()
            if target.startswith("/"):
                url = args.base_url.rstrip("/") + target
            else:
                url = args.base_url.rstrip("/") + "/" + target

            status, final_url = live_check(url)
            print(f"  {url} -> HTTP {status} ({final_url})")
            if status == 404:
                live_missing += 1

        if live_missing:
            print(f"Found {live_missing} live 404 responses.")

    # Extra: report likely 404 page routes if a route is not found but there is a 404.html in root.
    if (site_root / "404.html").exists():
        print(f"\n404 fallback page present: {site_root / '404.html'}")

    return 1 if broken else 0


if __name__ == "__main__":
    sys.exit(main())
