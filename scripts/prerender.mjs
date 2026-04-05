/**
 * prerender.mjs
 *
 * 1. Copies dist/index.html into every route folder so GitHub Pages (a static host)
 *    returns a real 200 + HTML response for each URL — instead of a 404 that gets
 *    patched by JS in 404.html. Googlebot does not execute that JS trick, so without
 *    this script every page except / is invisible to search engines.
 *
 * 2. Regenerates public/sitemap.xml with today's date as lastmod so Google always
 *    sees a fresh timestamp when it crawls after a deploy.
 *
 * Run automatically as part of `npm run build` via the postbuild hook.
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir   = path.resolve(__dirname, '..', 'dist');
const publicDir = path.resolve(__dirname, '..', 'public');
const template  = path.join(distDir, 'index.html');

if (!fs.existsSync(template)) {
  console.error('❌  dist/index.html not found — run `npm run build` first.');
  process.exit(1);
}

// ─── 1. Pre-render routes ────────────────────────────────────────────────────

const html = fs.readFileSync(template, 'utf-8');

// Every route that appears in the sitemap (excluding /).
// Add new routes here whenever you add a page.
const routes = [
  '/corporate-art-workshops',
  '/school-workshops',
  '/about',
  '/workshops/lippan-art',
  '/workshops/mandala-art',
  '/workshops/tie-and-dye',
  '/workshops/boho-canvas',
  '/workshops/bottle-lamp-art',
  '/workshops/clay-art',
  '/workshops/glass-painting',
  '/workshops/texture-art',
  '/workshops/block-printing',
  '/workshops/tote-bag-painting',
  '/workshops/trinket-tray',
  '/workshops/mdf-fridge-magnet',
  '/workshops/canvas-pouch',
  '/workshops-in-delhi',
  '/workshops-in-gurgaon',
  '/workshops-in-noida',
];

let created = 0;

for (const route of routes) {
  const dir      = path.join(distDir, route);
  const filePath = path.join(dir, 'index.html');

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`✅  ${route}/index.html`);
  created++;
}

console.log(`\n🎉  Pre-rendered ${created} routes. GitHub Pages will now serve real HTML to Googlebot.`);

// ─── 2. Regenerate sitemap.xml with today's date ─────────────────────────────

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const sitemapEntries = [
  { loc: '/',                              priority: '1.0', changefreq: 'monthly' },
  { loc: '/corporate-art-workshops',       priority: '0.9', changefreq: 'monthly' },
  { loc: '/school-workshops',              priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops/lippan-art',          priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops/mandala-art',         priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops/tie-and-dye',         priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops/boho-canvas',         priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/bottle-lamp-art',     priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/clay-art',            priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/glass-painting',      priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/texture-art',         priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/block-printing',      priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/tote-bag-painting',   priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/trinket-tray',        priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/mdf-fridge-magnet',   priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/canvas-pouch',        priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops-in-delhi',            priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops-in-gurgaon',          priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops-in-noida',            priority: '0.8', changefreq: 'monthly' },
  { loc: '/about',                         priority: '0.6', changefreq: 'yearly'  },
];

const base = 'https://kraftykinni.in';

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(({ loc, priority, changefreq }) => `  <url>
    <loc>${base}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

// Write to both public/ (source of truth) and dist/ (served by GitHub Pages)
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.join(distDir,   'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`\n🗺️   Sitemap regenerated with lastmod: ${today}`);
