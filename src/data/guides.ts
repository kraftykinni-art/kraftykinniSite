// Digital guides sold through Gumroad. One entry per product.
//
// TO GO LIVE: create the product on Gumroad, copy its link
// (looks like https://yourname.gumroad.com/l/block-printing-at-home)
// and paste it into gumroadUrl below. While gumroadUrl is empty the
// page shows a disabled "Coming soon" button instead of a dead link.
//
// Image files live on the CDN under /guides/block-printing/ (see CDN_BASE).

export const CDN_BASE = 'https://cdn.kraftykinni.in/guides/block-printing';

export const BLOCK_PRINTING_GUIDE = {
  slug: 'block-printing-guide',
  title: 'Block Printing at Home',
  subtitle: 'Your first print, step by step',
  gumroadUrl: 'https://kraftykinni.gumroad.com/l/block-printing-at-home',
  price: '5.99', // number only, used in the Product schema
  currency: 'USD',
  priceLabel: '$5.99', // what visitors see on the button
  pages: 29,
  lessons: 7,
  projects: 2,
  images: {
    cover: `${CDN_BASE}/cover-page.webp`,
    og: `${CDN_BASE}/block-printing-guide-og.webp`,
    previews: [
      { src: `${CDN_BASE}/preview-what-you-need.webp`, alt: 'Guide page: Lesson 1, what you need' },
      { src: `${CDN_BASE}/preview-repeat-patterns.webp`, alt: 'Guide page: Lesson 5, repeat patterns' },
      { src: `${CDN_BASE}/preview-dry-set-wash.webp`, alt: 'Guide page: Lesson 7, dry, set and wash' },
      { src: `${CDN_BASE}/preview-make-your-own-stamp.webp`, alt: 'Guide page: make your own stamp' },
    ],
  },
} as const;

export function isGuideLive(url: string): boolean {
  return url.startsWith('https://');
}
