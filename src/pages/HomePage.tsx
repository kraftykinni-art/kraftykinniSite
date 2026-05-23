import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';

// Lazy-load below-fold components to reduce initial JS bundle
const About = lazy(() => import('../components/About'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Workshops = lazy(() => import('../components/Workshops'));
const PricingFAQ = lazy(() => import('../components/PricingFAQ'));
const ContactFooter = lazy(() => import('../components/ContactFooter'));

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Art Workshops Delhi NCR | ₹600/person | 1,500+ | Kraftykinni</title>
        <meta name="description" content="Premium art & DIY workshops for corporate teams, schools & events in Delhi, Gurgaon & Noida. Book Tie & Dye, Lippan & Boho Art with Fevicryl artist Shramita Govil." />
        <link rel="canonical" href="https://kraftykinni.in/" />
      </Helmet>

      <main>
        <Hero />
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <About />
          <Testimonials />
          <Workshops />
          <PricingFAQ />
        </Suspense>
      </main>
      <Suspense fallback={<div className="min-h-[100px]" />}>
        <ContactFooter />
      </Suspense>
    </>
  );
}
