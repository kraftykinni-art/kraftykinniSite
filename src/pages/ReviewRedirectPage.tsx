import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { GOOGLE_WRITE_REVIEW_URL } from '../data/googleReviews';
import { trackReviewClick } from '../utils/analytics';

// Block 2 — kraftykinni.in/review: short link for WhatsApp messages and the QR
// code. Sends visitors straight to Google's "write a review" box.
// noindex, and deliberately not listed in the sitemap.
export default function ReviewRedirectPage() {
  useEffect(() => {
    trackReviewClick('write', 'review_page');
    // Short pause so the GA4 event can be sent before the page changes.
    const t = window.setTimeout(() => window.location.replace(GOOGLE_WRITE_REVIEW_URL), 400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <Helmet>
        <title>Write a Google Review | Kraftykinni</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="flex min-h-screen items-center justify-center bg-brand-offwhite px-4 py-24">
        <div className="max-w-md text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold text-brand-slate">Taking you to Google…</h1>
          <p className="mb-6 font-light text-gray-600">
            If nothing happens, use the button below to write your review.
          </p>
          <a
            href={GOOGLE_WRITE_REVIEW_URL}
            className="inline-flex items-center justify-center rounded-full bg-brand-pink px-8 py-4 text-base font-medium text-white hover:bg-brand-pink-light"
          >
            Write a Google review
          </a>
        </div>
      </main>
    </>
  );
}
