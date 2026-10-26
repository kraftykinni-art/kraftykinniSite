import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(scriptDir, '..', 'dist');
// Written by scripts/prerender.mjs: how many routes it generated this build
// (scheduled, not-yet-published blog posts are excluded).
const manifestPath = path.join(distDir, 'prerender-manifest.json');
const expectedRouteCount = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')).routeCount
  : null;
const representativeRoutes = [
  ['index.html', 'Kraftykinni Art Workshops in Delhi NCR'],
  ['about.html', 'About Kraftykinni'],
  ['corporate-art-workshops.html', 'Corporate Art Workshops'],
  ['workshops/lippan-art.html', 'Lippan Art Workshop'],
  ['workshops-in-delhi.html', 'Art Workshops in Delhi'],
  ['blog.html', 'Kraftykinni Blog'],
  ['privacy-policy.html', 'Privacy Policy'],
];

function fail(message) {
  console.error(`Prerender validation failed: ${message}`);
  process.exitCode = 1;
}

if (!fs.existsSync(distDir)) {
  fail(`missing ${distDir}`);
  process.exit(1);
}

const htmlFiles = [];
function collectHtmlFiles(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectHtmlFiles(entryPath);
    else if (entry.name.endsWith('.html')) htmlFiles.push(entryPath);
  }
}
collectHtmlFiles(distDir);

const routeFiles = htmlFiles.filter((filePath) => path.basename(filePath) !== '404.html');
if (expectedRouteCount === null) {
  fail('prerender-manifest.json is missing, so the route count cannot be checked');
} else if (routeFiles.length !== expectedRouteCount) {
  fail(`expected ${expectedRouteCount} prerendered routes, found ${routeFiles.length}`);
}

for (const filePath of routeFiles) {
  const html = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(distDir, filePath).replaceAll(path.sep, '/');
  const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/body>/);
  const rootHtml = rootMatch?.[1] ?? '';
  const visibleText = rootHtml.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ');
  const wordCount = visibleText.trim().split(/\s+/).filter(Boolean).length;

  if (!rootMatch) fail(`${relativePath} has no complete root HTML region`);
  if (!/<h1\b[^>]*>[\s\S]*?\S[\s\S]*?<\/h1>/i.test(rootHtml)) fail(`${relativePath} has no non-empty h1 in root HTML`);
  if (!rootHtml.includes('<main>') || !rootHtml.includes('<nav')) fail(`${relativePath} is missing semantic content landmarks`);
  if (wordCount < 100) fail(`${relativePath} has only ${wordCount} visible root words`);
}

for (const [relativePath, expectedText] of representativeRoutes) {
  const filePath = path.join(distDir, relativePath);
  if (!fs.existsSync(filePath)) {
    fail(`representative route ${relativePath} is missing`);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes(expectedText)) fail(`${relativePath} does not contain route-specific text: ${expectedText}`);
}

// ─── Internal links must not end in "/" (home page excepted) ─────────────────
// Canonical URLs on this site have no trailing slash. A link such as
// /corporate-art-workshops/ forces a redirect/duplicate URL, so every <a href>
// in dist that points back at kraftykinni.in must be slash-free. "/" itself and
// "/#section" (both the home page) are allowed.
const SITE_ORIGIN = 'https://kraftykinni.in';
const slashOffenders = [];
for (const filePath of htmlFiles) {
  const html = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(distDir, filePath).replaceAll(path.sep, '/');
  for (const match of html.matchAll(/<a\b[^>]*?\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    const href = (match[1] ?? match[2] ?? '').trim();
    let internalPath = null;
    if (href.startsWith('/') && !href.startsWith('//')) internalPath = href;
    else if (href.startsWith(SITE_ORIGIN)) internalPath = href.slice(SITE_ORIGIN.length) || '/';
    if (internalPath === null) continue;
    internalPath = internalPath.split('#')[0].split('?')[0];
    if (internalPath.length > 1 && internalPath.endsWith('/')) {
      slashOffenders.push(`${relativePath}: ${href}`);
    }
  }
}
if (slashOffenders.length) {
  fail(`${slashOffenders.length} internal link(s) end in "/" (use the slash-free URL):\n  - ${[...new Set(slashOffenders)].join('\n  - ')}`);
} else {
  console.log(`Internal link check passed: no trailing-slash links in ${htmlFiles.length} HTML files.`);
}

if (process.exitCode) process.exit();
console.log(`Prerender validation passed: ${routeFiles.length} routes contain visible HTML content.`);
