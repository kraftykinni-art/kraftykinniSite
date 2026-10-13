// Flags visually identical images within each blog post (catches re-encoded copies under different filenames).
import fs from 'fs';
import sharp from 'sharp';

const src = fs.readFileSync('src/data/blogPosts.ts', 'utf8');
const posts = src.split(/\n {4}slug: '/).slice(1).map((c) => ({
  slug: c.match(/^([^']+)'/)[1],
  images: [...new Set([...c.matchAll(/image:\s*["'](https:[^"']+)["']/g)].map((m) => m[1]))],
}));

const cache = new Map();
async function dhash(url) {
  if (!cache.has(url)) {
    cache.set(url, (async () => {
      const res = await fetch(url);
      if (!res.ok) return null;
      const px = await sharp(Buffer.from(await res.arrayBuffer())).grayscale().resize(9, 8, { fit: 'fill' }).raw().toBuffer();
      let bits = '';
      for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) bits += px[y * 9 + x] > px[y * 9 + x + 1] ? '1' : '0';
      return bits;
    })());
  }
  return cache.get(url);
}
const distance = (a, b) => [...a].filter((c, i) => c !== b[i]).length;

let found = 0;
for (const { slug, images } of posts) {
  const hashes = await Promise.all(images.map(dhash));
  images.forEach((u, i) => { if (!hashes[i]) console.log(`MISSING  ${slug}: ${u}`); });
  for (let i = 0; i < images.length; i++) {
    for (let j = i + 1; j < images.length; j++) {
      if (hashes[i] && hashes[j] && distance(hashes[i], hashes[j]) <= 6) {
        found++;
        console.log(`DUPLICATE  ${slug}\n  ${images[i]}\n  ${images[j]}`);
      }
    }
  }
}
console.log(found ? `\n${found} duplicate pair(s) found.` : `\nNo visually duplicate images within any of ${posts.length} posts.`);
process.exitCode = found ? 1 : 0;
