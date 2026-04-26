import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function ThankYouPage() {
  // GA4 conversion event — fires once when the page loads
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_submit', {
        event_category: 'lead',
        event_label: 'contact_form',
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Thank You — Kraftykinni</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-brand-offwhite flex items-center justify-center px-4 py-24">
        <div className="max-w-lg w-full text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={40} className="text-green-600" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl font-bold text-brand-slate mb-4">
            Thank you for <span className="text-brand-pink italic">reaching out!</span>
          </h1>

          <p className="text-gray-600 text-lg font-light leading-relaxed mb-8">
            We've received your enquiry and will get back to you within 24 hours with a
            customised proposal.
          </p>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10 text-left space-y-3">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">What happens next</p>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
              <p className="text-sm text-gray-600">Shramita will review your event details and workshop preferences.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
              <p className="text-sm text-gray-600">You'll receive a tailored proposal with activity options and pricing within 24 hours.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
              <p className="text-sm text-gray-600">We'll confirm the date, venue, and all materials — then you just show up and create.</p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1"
          >
            Back to Kraftykinni <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    </>
  );
}
