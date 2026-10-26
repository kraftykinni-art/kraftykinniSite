// Block 2 — Google reviews shown on the site (free, no API, no billing).
//
// HOW TO UPDATE (about 5 minutes, every few weeks):
//  1. Open your Google listing (search "Kraftykinni" on Google, or use READ_ALL_REVIEWS_URL below).
//  2. Fill `summary` with the rating and total review count shown there, and set `asOf`
//     to today's date (YYYY-MM-DD). While `summary` is null, no rating or count is shown.
//  3. Replace the entries in `reviews` with up to 5 real reviews, copied exactly
//     (author name, stars, text, date). Newest first. Delete any you don't want to show.
//  4. Upload this file to GitHub. The site rebuilds and shows the new data.
//
// Only copy reviews that are really on your Google listing. If `reviews` is empty
// the reviews section is hidden on every page.

export const GOOGLE_PLACE_ID = 'ChIJNenUSfvpDDkRArBiU1ut1b4';

// Opens Google's "write a review" box for the listing. Used by the /review page.
export const GOOGLE_WRITE_REVIEW_URL =
  `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

// Opens the listing's full review list on Google.
export const GOOGLE_READ_REVIEWS_URL =
  `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`;

export interface GoogleReview {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string; // YYYY-MM-DD
}

export interface GoogleReviewSummary {
  rating: number; // e.g. 5 or 4.9
  count: number;  // total reviews on Google
  asOf: string;   // YYYY-MM-DD, the day you checked Google
}

// TODO(owner): fill in from your Google listing. Left empty on purpose so no
// unverified number is shown.
export const googleReviewSummary: GoogleReviewSummary | null = {
  rating: 4.9,
  count: 29,
  asOf: '2026-10-26',
};

// Seeded from reviews already listed in the site's earlier markup. Check them
// against your Google listing and replace or remove as needed.
export const googleReviews: GoogleReview[] = [
  {
    author: 'Daily Uplift',
    rating: 5,
    text: 'Such a cool and engaging workshop! The energy was great, and it kept me interested from start to finish. Would definitely join again.',
    date: '2026-04-26',
  },
  {
    author: 'Saiyam Jain',
    rating: 5,
    text: "What an amazing time! I haven't had that much fun in years, it really brought out my inner child. Thank you Mam for this workshop.",
    date: '2026-04-24',
  },
  {
    author: 'Rishabh Garg',
    rating: 5,
    text: "My child had a lovely experience at the magnet art workshop. Shramita is a lovely and humble host and children were really enjoying. Her skill set is worth appreciating. Thank you Ma'am for doing such lively work for kids.",
    date: '2026-04-17',
  },
];
