import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Kraftykinni</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="min-h-screen bg-brand-offwhite flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="font-serif text-8xl font-bold text-brand-pink mb-4">404</p>
          <h1 className="font-serif text-3xl font-bold text-brand-slate mb-4">Page not found</h1>
          <p className="text-gray-600 font-light mb-8">
            The page you're looking for doesn't exist. Let's get you back to the workshops.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
