/**
 * Image optimization script for mobile performance.
 * Generates smaller variants of hero/workshop images for responsive serving.
 * 
 * Usage: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.resolve(__dirname, '../src/assets');

// Images that need mobile-optimized variants
// mobileWidth trimmed to 320px (2x for a 160px CSS display size on mobile,
// per the "sizes" attribute in Hero.tsx) — 400px was ~2.5x oversized.
// quality dropped slightly since these render small; not visually noticeable at 160px wide.
const heroImages = [
  { name: 'boho-art.webp', mobileWidth: 320, desktopWidth: 600 },
  { name: 'bottle-art.webp', mobileWidth: 320, desktopWidth: 600 },
  { name: 'lippan-art.webp', mobileWidth: 320, desktopWidth: 600 },
  { name: 'tie-and-dye.webp', mobileWidth: 320, desktopWidth: 600 },
];

const workshopImages = [
  { name: 'boho-art.webp', width: 600 },
  { name: 'bottle-art.webp', width: 600 },
  { name: 'lippan-art.webp', width: 600 },
  { name: 'tie-and-dye.webp', width: 600 },
  { name: 'trinket-dish.webp', width: 600 },
  { name: 'mandala-art.webp', width: 600 },
  { name: 'block-printing.webp', width: 600 },
  { name: 'clay-art-mdf.webp', width: 600 },
  { name: 'mdf-fridge-magnet.webp', width: 600 },
  { name: 'glass-painting.webp', width: 600 },
  { name: 'texture-tissue-art.webp', width: 600 },
  { name: 'tote-bag.webp', width: 600 },
  { name: 'canvas-pouch.webp', width: 600 },
];

const logoConfig = { name: 'Logo.webp', width: 140, height: 140 };

async function optimizeImage(inputPath, outputPath, options) {
  const { width, height, quality = 75 } = options;
  let pipeline = sharp(inputPath).webp({ quality });
  if (width && height) {
    pipeline = pipeline.resize(width, height, { fit: 'cover' });
  } else if (width) {
    pipeline = pipeline.resize(width, null, { withoutEnlargement: true });
  }
  await pipeline.toFile(outputPath);
  console.log(`  ✓ ${path.basename(outputPath)}`);
}

async function run() {
  console.log('Optimizing images for mobile performance...\n');

  // Generate mobile variants for hero images
  console.log('Hero images (mobile):');
  for (const img of heroImages) {
    const input = path.join(ASSETS_DIR, img.name);
    const baseName = img.name.replace('.webp', '');
    const mobileOutput = path.join(ASSETS_DIR, `${baseName}-mobile.webp`);
    await optimizeImage(input, mobileOutput, { width: img.mobileWidth, quality: 65 });
  }

  // Optimize workshop card images (single optimized version)
  console.log('\nWorkshop card images:');
  for (const img of workshopImages) {
    const input = path.join(ASSETS_DIR, img.name);
    const baseName = img.name.replace('.webp', '');
    const output = path.join(ASSETS_DIR, `${baseName}-opt.webp`);
    await optimizeImage(input, output, { width: img.width, quality: 75 });
  }

  // Optimize logo
  console.log('\nLogo:');
  const logoInput = path.join(ASSETS_DIR, logoConfig.name);
  const logoOutput = path.join(ASSETS_DIR, 'Logo-small.webp');
  await optimizeImage(logoInput, logoOutput, {
    width: logoConfig.width,
    height: logoConfig.height,
    quality: 80,
  });

  console.log('\n✅ Done! Optimized images created in src/assets/');
}

run().catch(console.error);
