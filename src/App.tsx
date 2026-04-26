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
import PrivateWorkshopsPage from './pages/PrivateWorkshopsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-offwhite font-sans text-brand-charcoal selection:bg-brand-pink/20 selection:text-brand-pink">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/corporate-art-workshops" element={<CorporateWorkshopsPage />} />
        <Route path="/school-workshops" element={<SchoolWorkshopsPage />} />
        <Route path="/private-art-workshops" element={<PrivateWorkshopsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/workshops/:id" element={<WorkshopDetailPage />} />
        <Route path="/workshops-in-delhi" element={<LocationPage />} />
        <Route path="/workshops-in-gurgaon" element={<LocationPage />} />
        <Route path="/workshops-in-noida" element={<LocationPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <WhatsAppButton />
    </div>
  );
}