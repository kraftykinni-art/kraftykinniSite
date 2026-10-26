import { Star } from 'lucide-react';
import {
  GOOGLE_READ_REVIEWS_URL,
  GOOGLE_WRITE_REVIEW_URL,
  googleReviewSummary,
  googleReviews,
} from '../data/googleReviews';
import { trackReviewClick } from '../utils/analytics';

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= Math.round(value) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
        />
      ))}
    </span>
  );
}

// Block 2 — Google reviews block. Data lives in src/data/googleReviews.ts.
// `location` names the placement for GA4 (review_link_click), e.g. "home_reviews".
// Renders nothing when there are no reviews.
export default function GoogleReviews({ location }: { location: string }) {
  const reviews = googleReviews.slice(0, 5);
  if (reviews.length === 0) return null;
  const summary = googleReviewSummary;

  return (
    <section id="reviews" className="py-16 bg-white" aria-labelledby={`${location}-heading`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id={`${location}-heading`} className="font-serif text-3xl font-bold text-brand-slate mb-3">
            What Clients Say <span className="text-brand-pink italic">on Google</span>
          </h2>
          {summary && (
            <p className="inline-flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600">
              <Stars value={summary.rating} />
              <span className="font-medium text-brand-charcoal">{summary.rating.toFixed(1)}</span>
              <span>· {summary.count} Google reviews · as of {formatDate(summary.asOf)}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <figure key={`${r.author}-${r.date}`} className="flex flex-col rounded-2xl border border-gray-100 bg-brand-offwhite p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <Stars value={r.rating} />
                <span className="text-xs text-gray-400">{formatDate(r.date)}</span>
              </div>
              <blockquote className="mb-4 text-sm font-light leading-relaxed text-brand-charcoal">“{r.text}”</blockquote>
              <figcaption className="mt-auto text-sm font-semibold text-brand-slate">
                {r.author} <span className="font-normal text-gray-400">· Google review</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={GOOGLE_READ_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackReviewClick('read_all', location)}
            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-brand-charcoal transition-all hover:bg-gray-50"
          >
            Read all reviews on Google
          </a>
          <a
            href={GOOGLE_WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackReviewClick('write', location)}
            className="inline-flex items-center justify-center rounded-full bg-brand-pink px-6 py-3 text-sm font-medium text-white transition-all hover:bg-brand-pink-light hover:shadow-lg"
          >
            Write a review
          </a>
        </div>
      </div>
    </section>
  );
}
