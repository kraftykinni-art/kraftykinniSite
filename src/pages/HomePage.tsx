import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Workshops from '../components/Workshops';
import PricingFAQ from '../components/PricingFAQ';
import ContactFooter from '../components/ContactFooter';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Kraftykinni | Creative Art & DIY Workshops in Delhi NCR</title>
        <meta name="description" content="Premium art & DIY workshops for corporate teams, schools & events in Delhi NCR. Book Tie & Dye, Lippan & Boho Art with Fevicryl artist Shramita Govil." />
        <link rel="canonical" href="https://kraftykinni.in/" />
      </Helmet>

      <main>
        <Hero />
        <About />
        <Testimonials />
        <Workshops />
        <PricingFAQ />
      </main>
      <ContactFooter />
    </>
  );
}
