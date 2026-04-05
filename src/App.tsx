import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import CorporateWorkshopsPage from './pages/CorporateWorkshopsPage';
import WorkshopDetailPage from './pages/WorkshopDetailPage';
import SchoolWorkshopsPage from './pages/SchoolWorkshopsPage';
import LocationPage from './pages/LocationPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-offwhite font-sans text-brand-charcoal selection:bg-brand-pink/20 selection:text-brand-pink">
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Audience pages */}
        <Route path="/corporate-art-workshops" element={<CorporateWorkshopsPage />} />
        <Route path="/school-workshops" element={<SchoolWorkshopsPage />} />

        {/* About */}
        <Route path="/about" element={<AboutPage />} />

        {/* Individual workshop pages */}
        <Route path="/workshops/:id" element={<WorkshopDetailPage />} />

        {/* Location pages — explicit paths prevent /:location wildcard swallowing named routes */}
        <Route path="/workshops-in-delhi"   element={<LocationPage />} />
        <Route path="/workshops-in-gurgaon" element={<LocationPage />} />
        <Route path="/workshops-in-noida"   element={<LocationPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <WhatsAppButton />
    </div>
  );
}
