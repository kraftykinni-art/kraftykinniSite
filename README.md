# Kraftykinni — Art & DIY Workshop Website

Live site: **[kraftykinni.in](https://kraftykinni.in)**

A fully responsive React + Vite site for Kraftykinni, a creative art and DIY workshop business serving corporate teams, schools, and private events across Delhi NCR.

---

## Tech stack

- **React 19** + **TypeScript** + **React Router v7**
- **Vite 6** — build tool, with `postbuild` pre-rendering for GitHub Pages SEO
- **Tailwind CSS v4** — utility-first styling
- **Motion** — page animations
- **react-helmet-async** — per-page SEO meta tags and structured data
- **Web3Forms** — contact form submissions (no backend needed)
- **GitHub Pages** — static hosting via GitHub Actions

---

## Project structure

```
src/
├── assets/          # Workshop images (WebP) and logo
├── components/      # Shared UI: Navbar, Hero, About, Workshops, PricingFAQ,
│                    #   Testimonials, ContactFooter, WhatsAppButton
├── data/
│   └── workshops.ts # Single source of truth for all 13 workshop definitions
│                    #   including SEO meta, keywords, intro copy per workshop
├── hooks/
│   └── useBookNow.ts
└── pages/
    ├── HomePage.tsx
    ├── CorporateWorkshopsPage.tsx
    ├── SchoolWorkshopsPage.tsx
    ├── WorkshopDetailPage.tsx   # Dynamic — renders from workshops.ts data
    ├── LocationPage.tsx         # Delhi / Gurgaon / Noida pages
    ├── AboutPage.tsx
    └── NotFoundPage.tsx

public/
├── sitemap.xml      # Auto-regenerated with today's date on every build
├── robots.txt
├── logo.jpeg        # Stable URL for OG/Twitter image tags
└── 404.html         # GitHub Pages SPA fallback (noindex)

scripts/
└── prerender.mjs    # Postbuild: copies index.html into every route folder
                     # so GitHub Pages serves 200 OK to Googlebot on all 20 URLs
```

---

## Routes (20 pages)

| URL | Page |
|-----|------|
| `/` | Homepage |
| `/corporate-art-workshops` | Corporate workshops landing |
| `/school-workshops` | School & college workshops |
| `/about` | About Shramita Govil |
| `/workshops/lippan-art` | Lippan Art |
| `/workshops/mandala-art` | Mandala Art |
| `/workshops/tie-and-dye` | Tie & Dye |
| `/workshops/boho-canvas` | Boho Canvas Art |
| `/workshops/bottle-lamp-art` | Bottle Lamp Art |
| `/workshops/clay-art` | Clay Art |
| `/workshops/glass-painting` | Glass Painting |
| `/workshops/texture-art` | Texture Art |
| `/workshops/block-printing` | Block Printing |
| `/workshops/tote-bag-painting` | Tote Bag Painting |
| `/workshops/trinket-tray` | Trinket Tray Painting |
| `/workshops/mdf-fridge-magnet` | MDF Fridge Magnet |
| `/workshops/canvas-pouch` | Canvas Pouch Painting |
| `/workshops-in-delhi` | Delhi location page |
| `/workshops-in-gurgaon` | Gurgaon location page |
| `/workshops-in-noida` | Noida location page |

---

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in values
cp .env.example .env
# Set VITE_WEB3FORMS_KEY to your Web3Forms access key

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

---

## Build & deploy

```bash
npm run build
# Runs: vite build → scripts/prerender.mjs (postbuild)
# Output: dist/ with pre-rendered index.html for all 20 routes + fresh sitemap.xml
```

Push to `main` — GitHub Actions (`.github/workflows/deploy.yml`) runs the build and deploys to GitHub Pages automatically.

**Required GitHub secret:**
- `VITE_WEB3FORMS_KEY` — your Web3Forms access key (Settings → Secrets → Actions)

---

## Adding a new workshop

1. Add a new entry to `src/data/workshops.ts` with all required fields
2. Add the route to `scripts/prerender.mjs` routes array
3. Add the URL to `scripts/prerender.mjs` sitemapEntries array
4. Add a link in `src/components/ContactFooter.tsx` Workshops column
5. Run `npm run build` and push

---

## SEO features

- Per-page title, meta description, canonical, OG, and Twitter Card tags via react-helmet-async
- JSON-LD: LocalBusiness + AggregateRating + Review (homepage), Service + BreadcrumbList + FAQPage (all major pages)
- Pre-rendered static HTML for all 20 routes — Googlebot sees real content, not a JS shell
- Sitemap auto-regenerated with today's lastmod on every build
- All images converted to WebP, lazy-loaded except LCP hero images (fetchPriority=high)
