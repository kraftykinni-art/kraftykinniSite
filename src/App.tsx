import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Workshops from './components/Workshops';
import PricingFAQ from './components/PricingFAQ';
import ContactFooter from './components/ContactFooter';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-offwhite font-sans text-brand-charcoal selection:bg-brand-pink/20 selection:text-brand-pink">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Testimonials />
        <Workshops />
        <PricingFAQ />
      </main>
      <ContactFooter />
      <WhatsAppButton />
    </div>
  );
}
