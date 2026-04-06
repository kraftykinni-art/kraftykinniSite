/**
 * prerender.mjs
 *
 * 1. For every route, writes dist/{route}/index.html with UNIQUE:
 *    - <title>
 *    - <meta name="description">
 *    - <link rel="canonical">
 *    - og:title, og:description, og:url
 *    - twitter:title, twitter:description
 *    injected into the static HTML so Googlebot sees real per-page
 *    metadata without executing JavaScript.
 *
 * 2. Regenerates public/sitemap.xml with today's date as lastmod.
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

const baseHtml = fs.readFileSync(template, 'utf-8');

// ─── Route metadata ───────────────────────────────────────────────────────────

const routes = [
  {
    path: '/corporate-art-workshops',
    title: 'Corporate Art Workshops Delhi NCR | Team Building | Kraftykinni',
    description: 'Book corporate art & DIY workshops in Delhi NCR. Tie & Dye, Lippan Art, Mandala & more for 20–200+ participants. Fevicryl-certified artist. All materials included. ₹600–₹800/person.',
  },
  {
    path: '/school-workshops',
    title: 'School Art Workshops Delhi NCR | Student Craft Sessions | Kraftykinni',
    description: 'Fun, guided art workshops for schools and colleges in Delhi NCR. 13 activities including Clay Art, Block Printing & Tote Bag Painting. All materials included. Led by Fevicryl-certified artist.',
  },
  {
    path: '/about',
    title: 'About Kraftykinni | Shramita Govil — Fevicryl Certified Artist Delhi NCR',
    description: 'Kraftykinni is led by Shramita Govil, a Fevicryl-certified artist with 50+ workshops and 1,500+ participants across Delhi NCR. Learn about our story, mission, and approach.',
  },
  {
    path: '/workshops/lippan-art',
    title: 'Lippan Art Workshop in Delhi NCR | Kraftykinni',
    description: 'Lippan Art workshop in Delhi NCR by Kraftykinni. Experience traditional Kutch mirror work in a guided group session. Corporate team building, schools & private events. All materials included. ₹600–₹800/person.',
  },
  {
    path: '/workshops/mandala-art',
    title: 'Mandala Art Workshop in Delhi NCR | Kraftykinni',
    description: 'Mandala Art workshop in Delhi NCR by Kraftykinni. Meditative, stress-relieving mandala painting sessions for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
  },
  {
    path: '/workshops/tie-and-dye',
    title: 'Tie & Dye Workshop in Delhi NCR | Kraftykinni',
    description: 'Tie & Dye workshop in Delhi NCR by Kraftykinni. High-energy fabric dyeing sessions for corporate teams, schools & private events. Wearable takeaway. All materials included. ₹600–₹800/person.',
  },
  {
    path: '/workshops/boho-canvas',
    title: 'Boho Canvas Art Workshop in Delhi NCR | Kraftykinni',
    description: 'Boho Canvas Art workshop in Delhi NCR by Kraftykinni. Guided abstract canvas painting sessions for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
  },
  {
    path: '/workshops/bottle-lamp-art',
    title: 'Bottle Lamp Art Workshop in Delhi NCR | Kraftykinni',
    description: 'Bottle Lamp Art workshop in Delhi NCR by Kraftykinni. Creative upcycling workshop — transform glass bottles into glowing lamps. Corporate & school sessions. All materials included.',
  },
  {
    path: '/workshops/clay-art',
    title: 'Clay Art Workshop in Delhi NCR | Kraftykinni',
    description: 'Clay Art workshop in Delhi NCR by Kraftykinni. Hands-on clay sculpting sessions for corporate teams, schools & private events. All materials included. ₹600–₹800/person.',
  },
  {
    path: '/workshops/glass-painting',
    title: 'Glass Painting Workshop in Delhi NCR | Kraftykinni',
    description: 'Glass Painting workshop in Delhi NCR by Kraftykinni. Learn glass painting techniques in a guided group session. Corporate, school & private events. All materials included.',
  },
  {
    path: '/workshops/texture-art',
    title: 'Texture Art Workshop in Delhi NCR | Kraftykinni',
    description: 'Texture Art workshop in Delhi NCR by Kraftykinni. Mixed-media layered canvas art sessions for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
  },
  {
    path: '/workshops/block-printing',
    title: 'Block Printing Workshop in Delhi NCR | Kraftykinni',
    description: 'Block Printing workshop in Delhi NCR by Kraftykinni. Learn traditional Indian block printing on fabric. Corporate & school sessions. All materials included. ₹600–₹800/person.',
  },
  {
    path: '/workshops/tote-bag-painting',
    title: 'Tote Bag Painting Workshop in Delhi NCR | Kraftykinni',
    description: 'Tote Bag Painting workshop in Delhi NCR by Kraftykinni. Eco-friendly fabric painting sessions for corporate teams, schools & events. Custom branding available. All materials included.',
  },
  {
    path: '/workshops/trinket-tray',
    title: 'Trinket Tray Painting Workshop in Delhi NCR | Kraftykinni',
    description: 'Trinket Tray Painting workshop in Delhi NCR by Kraftykinni. Paint your own decorative jewellery or desk tray. Corporate & school sessions. All materials included.',
  },
  {
    path: '/workshops/mdf-fridge-magnet',
    title: 'MDF Fridge Magnet Painting Workshop in Delhi NCR | Kraftykinni',
    description: 'MDF Fridge Magnet painting workshop in Delhi NCR by Kraftykinni. Fun, quick craft activity for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
  },
  {
    path: '/workshops/canvas-pouch',
    title: 'Canvas Pouch Painting Workshop in Delhi NCR | Kraftykinni',
    description: 'Canvas Pouch Painting workshop in Delhi NCR by Kraftykinni. Personalise your own canvas pouch with fabric paints. Corporate, school & private event sessions. All materials included.',
  },
  {
    path: '/workshops-in-delhi',
    title: 'Art Workshops in Delhi | Corporate & School Sessions | Kraftykinni',
    description: 'Kraftykinni conducts art and DIY workshops across Delhi — corporate team building, school sessions, and private events. 13 activities, all materials included. Led by Fevicryl-certified artist Shramita Govil. ₹600–₹800/person.',
  },
  {
    path: '/workshops-in-gurgaon',
    title: 'Art Workshops in Gurgaon | Corporate Team Building | Kraftykinni',
    description: 'Kraftykinni conducts corporate art workshops and team-building sessions in Gurgaon. Office visits, off-site events, school sessions. 13 activities, all materials included. ₹600–₹800/person.',
  },
  {
    path: '/workshops-in-noida',
    title: 'Art Workshops in Noida | Corporate & School Sessions | Kraftykinni',
    description: 'Kraftykinni conducts art and DIY workshops in Noida and Greater Noida — corporate team building, school sessions, and private events. All materials included. ₹600–₹800/person.',
  },
];

// ─── HTML injection helper ────────────────────────────────────────────────────

function injectMeta(html, { path: routePath, title, description }) {
  const canonical = `https://kraftykinni.in${routePath}`;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${description}">`);
  html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${description}">`);

  return html;
}

// ─── 1. Pre-render routes with unique meta ────────────────────────────────────

let created = 0;

for (const route of routes) {
  const dir      = path.join(distDir, route.path);
  const filePath = path.join(dir, 'index.html');
  const html     = injectMeta(baseHtml, route);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`✅  ${route.path}`);
  created++;
}

console.log(`\n🎉  Pre-rendered ${created} routes with unique titles & meta descriptions.`);
console.log('    Googlebot will now see correct SEO metadata on every page.\n');

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
