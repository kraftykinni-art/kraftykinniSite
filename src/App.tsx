import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';

import HomePage from './pages/HomePage';
import CorporateWorkshopsPage from './pages/CorporateWorkshopsPage';
import WorkshopDetailPage from './pages/WorkshopDetailPage';
import SchoolWorkshopsPage from './pages/SchoolWorkshopsPage';
import LocationPage from './pages/LocationPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-offwhite font-sans text-brand-charcoal selection:bg-brand-pink/20 selection:text-brand-pink">
      <Navbar />
      <Routes>
        {/* Homepage — all existing sections intact */}
        <Route path="/" element={<HomePage />} />

        {/* Audience pages */}
        <Route path="/corporate-art-workshops" element={<CorporateWorkshopsPage />} />
        <Route path="/school-workshops" element={<SchoolWorkshopsPage />} />

        {/* Individual workshop pages — one template, 13 URLs */}
        <Route path="/workshops/:id" element={<WorkshopDetailPage />} />

        {/* Location pages — one template, 3 URLs */}
        <Route path="/workshops-in-delhi" element={<LocationPage />} />
        <Route path="/workshops-in-gurgaon" element={<LocationPage />} />
        <Route path="/workshops-in-noida" element={<LocationPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <WhatsAppButton />
    </div>
  );
}
