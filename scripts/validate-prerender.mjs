import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(scriptDir, '..', 'dist');
const expectedRouteCount = 51;
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
if (routeFiles.length !== expectedRouteCount) {
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

if (process.exitCode) process.exit();
console.log(`Prerender validation passed: ${routeFiles.length} routes contain visible HTML content.`);
