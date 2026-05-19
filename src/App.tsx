import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';

// Lazy-loaded routes to reduce initial JS bundle
const CorporateWorkshopsPage = lazy(() => import('./pages/CorporateWorkshopsPage'));
const WorkshopDetailPage = lazy(() => import('./pages/WorkshopDetailPage'));
const SchoolWorkshopsPage = lazy(() => import('./pages/SchoolWorkshopsPage'));
const LocationPage = lazy(() => import('./pages/LocationPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivateWorkshopsPage = lazy(() => import('./pages/PrivateWorkshopsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const EmployeeEngagementGurgaonPage = lazy(() => import('./pages/EmployeeEngagementGurgaonPage'));

export default function App() {
  const location = useLocation();

  // Fire GA4 page_view on every SPA route change.
  // send_page_view:false in index.html prevents the duplicate initial hit.
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-brand-offwhite font-sans text-brand-charcoal selection:bg-brand-pink/20 selection:text-brand-pink">
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/corporate-art-workshops" element={<CorporateWorkshopsPage />} />
          <Route path="/school-art-workshops" element={<SchoolWorkshopsPage />} />
          <Route path="/private-art-workshops" element={<PrivateWorkshopsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/workshops/:id" element={<WorkshopDetailPage />} />
          <Route path="/workshops-in-delhi" element={<LocationPage />} />
          <Route path="/workshops-in-gurgaon" element={<LocationPage />} />
          <Route path="/workshops-in-noida" element={<LocationPage />} />
          <Route path="/employee-engagement-activities-gurgaon" element={<EmployeeEngagementGurgaonPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
      <WhatsAppButton />
    </div>
  );
}