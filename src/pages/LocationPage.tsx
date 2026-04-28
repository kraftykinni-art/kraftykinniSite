import { Helmet } from 'react-helmet-async';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { workshopsData } from '../data/workshops';
import ContactFooter from '../components/ContactFooter';
import { useBookNow } from '../hooks/useBookNow';

const locationData = {
  delhi: {
    slug: 'workshops-in-delhi',
    city: 'Delhi',
    headline: 'Art Workshops in Delhi',
    heroPink: 'Book a Session Today',
    metaTitle: 'Art Workshops in Delhi | Corporate & School Sessions | Kraftykinni',
    metaDescription: 'Kraftykinni conducts art and DIY workshops across Delhi — corporate team building, school sessions, and private events. 13 activities, all materials included. Led by Fevicryl-certified artist Shramita Govil. ₹600–₹800/person.',
    keywords: 'art workshop in Delhi, DIY workshop Delhi, creative workshop Delhi, corporate art workshop Delhi, craft class Delhi, team building art Delhi',
    intro: 'Delhi is home to a thriving creative community, and Kraftykinni is proud to be one of its most active workshop facilitators. We conduct art and DIY workshops across Delhi — at corporate offices in Connaught Place and Nehru Place, schools and colleges across North and South Delhi, and private venues for birthdays, kitty parties, and special events. Whether you are an HR manager looking for a memorable team-building activity or a school teacher booking a craft day, we come to your space with all the supplies and the facilitation.',
    areas: ['Connaught Place', 'South Delhi', 'Dwarka', 'Rohini', 'Lajpat Nagar', 'Saket', 'Vasant Kunj', 'Nehru Place'],
    localSchema: { addressLocality: 'New Delhi', addressRegion: 'Delhi', postalCode: '110001' },
  },
  gurgaon: {
    slug: 'workshops-in-gurgaon',
    city: 'Gurgaon',
    headline: 'Art Workshops in Gurgaon',
    heroPink: 'For Corporate Teams & Events',
    metaTitle: 'Art Workshops in Gurgaon | Corporate Team Building | Kraftykinni',
    metaDescription: 'Kraftykinni conducts corporate art workshops and team-building sessions in Gurgaon. Office visits, off-site events, school sessions. 13 activities, all materials included. ₹600–₹800/person.',
    keywords: 'art workshop Gurgaon, corporate art workshop Gurgaon, team building workshop Gurgaon, creative workshop Gurugram, DIY workshop Gurugram',
    intro: "Gurgaon's corporate ecosystem is exactly where Kraftykinni thrives. We regularly conduct corporate art workshops for teams in Gurgaon's major business hubs — from DLF Cyber City to Udyog Vihar and MG Road. Companies in Gurgaon choose Kraftykinni for quarterly team-building events, employee appreciation days, onboarding workshops, and annual day activities. We bring all art supplies directly to your Gurgaon office or preferred venue — no logistics burden on your HR team.",
    areas: ['DLF Cyber City', 'Udyog Vihar', 'MG Road', 'Sohna Road', 'Golf Course Road', 'Sector 29', 'Sector 56', 'Manesar'],
    localSchema: { addressLocality: 'Gurgaon', addressRegion: 'Haryana', postalCode: '122001' },
  },
  noida: {
    slug: 'workshops-in-noida',
    city: 'Noida',
    headline: 'Art Workshops in Noida',
    heroPink: 'Corporate & School Sessions',
    metaTitle: 'Art Workshops in Noida | Corporate & School Sessions | Kraftykinni',
    metaDescription: 'Kraftykinni conducts art and DIY workshops in Noida and Greater Noida — corporate team building, school sessions, and private events. All materials included. ₹600–₹800/person.',
    keywords: 'art workshop Noida, corporate art workshop Noida, team building workshop Noida, craft workshop Noida, DIY workshop Greater Noida',
    intro: 'Noida has rapidly grown into one of the most active corporate and educational hubs in the NCR, and Kraftykinni serves both. We conduct corporate art workshops for companies across Sector 62, Sector 16, and Film City Road, as well as school and college workshops for institutions in Noida and Greater Noida. Our workshops at Amity University are among our most frequently repeated — a testament to how well our sessions work for student groups.',
    areas: ['Sector 62', 'Sector 16', 'Film City Road', 'Sector 18', 'Expressway', 'Greater Noida', 'Knowledge Park', 'Sector 125'],
    localSchema: { addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', postalCode: '201301' },
  },
};

const slugToKey: Record<string, keyof typeof locationData> = {
  'workshops-in-delhi':   'delhi',
  'workshops-in-gurgaon': 'gurgaon',
  'workshops-in-noida':   'noida',
};

export default function LocationPage() {
  const { pathname } = useLocation();
  const bookNow = useBookNow();
  // Strip leading slash to get the slug, e.g. "/workshops-in-delhi" → "workshops-in-delhi"
  const locationSlug = pathname.replace(/^\//, '').replace(/\/$/, '');
  const key = slugToKey[locationSlug];
  if (!key) return <Navigate to="/404" replace />;

  const loc = locationData[key];
  const canonical = `https://kraftykinni.in/${loc.slug}`;

  return (
    <>
      <Helmet>
        <title>{loc.metaTitle}</title>
        <meta name="description" content={loc.metaDescription} />
        <meta name="keywords" content={loc.keywords} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={loc.metaTitle} />
        <meta property="og:description" content={loc.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://kraftykinni.in/og-corporate.jpg" />
        <meta property="og:site_name" content="Kraftykinni" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://kraftykinni.in/og-corporate.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'LocalBusiness',
          name: 'Kraftykinni', description: loc.metaDescription,
          url: 'https://kraftykinni.in', telephone: '+919599622210', email: 'kraftykinni@gmail.com',
          address: { '@type': 'PostalAddress', ...loc.localSchema, addressCountry: 'IN' },
          areaServed: { '@type': 'City', name: loc.city },
          priceRange: '₹600 - ₹800 per person',
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kraftykinni.in/' },
            { '@type': 'ListItem', position: 2, name: `Art Workshops in ${loc.city}`, item: canonical },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: `Do you conduct art workshops in ${loc.city}?`, acceptedAnswer: { '@type': 'Answer', text: `Yes — Kraftykinni conducts art and DIY workshops across ${loc.city}, travelling to your office, school, or event venue with all materials included.` } },
            { '@type': 'Question', name: `What art workshops are available in ${loc.city}?`, acceptedAnswer: { '@type': 'Answer', text: `All 13 Kraftykinni signature activities are available in ${loc.city}: Lippan Art, Mandala Art, Tie & Dye, Boho Canvas Art, Block Printing, Clay Art, Glass Painting, Texture Art, Tote Bag Painting, Bottle Lamp Art, MDF Fridge Magnet, Trinket Tray Painting, and Canvas Pouch Painting.` } },
            { '@type': 'Question', name: `What is the cost of an art workshop in ${loc.city}?`, acceptedAnswer: { '@type': 'Answer', text: `Pricing starts at ₹600 per person for groups of 100+, ₹700 per person for 50–100 participants, and ₹800 per person for groups of 20–50. All art materials are included.` } },
            { '@type': 'Question', name: `How far in advance should I book a workshop in ${loc.city}?`, acceptedAnswer: { '@type': 'Answer', text: `A minimum of 7 days advance notice is required to confirm a booking. A 50% deposit secures the date.` } },
          ],
        })}</script>
      </Helmet>

      <main className="pt-24 bg-brand-offwhite">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <nav className="flex items-center gap-2 text-sm text-gray-400" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-pink transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-charcoal font-medium">Art Workshops in {loc.city}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-16 bg-brand-offwhite relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8">
                <MapPin size={16} className="text-brand-pink" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Kraftykinni · {loc.city}</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-slate leading-tight mb-6">
                {loc.headline} — <br /><span className="text-brand-pink italic">{loc.heroPink}</span>
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-10">{loc.intro}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={bookNow}
                  className="inline-flex items-center justify-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1">
                  Book a Workshop in {loc.city} <ArrowRight size={18} />
                </button>
                <Link to="/corporate-art-workshops"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-charcoal border border-gray-200 px-8 py-4 rounded-full text-base font-medium transition-all">
                  Corporate Workshops
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Areas */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-brand-slate mb-4">
              Areas We Cover in <span className="text-brand-pink italic">{loc.city}</span>
            </h2>
            <p className="text-gray-600 font-light mb-8">We travel to your office, school, or event venue. If your area isn't listed, reach out — we cover all of {loc.city}.</p>
            <div className="flex flex-wrap gap-3">
              {loc.areas.map((area) => (
                <span key={area} className="px-5 py-2.5 bg-brand-offwhite text-brand-charcoal rounded-full border border-gray-200 text-sm font-medium">
                  <MapPin size={13} className="inline text-brand-pink mr-1.5" />{area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-24 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-brand-slate mb-4">
                Activities Available in <span className="text-brand-pink italic">{loc.city}</span>
              </h2>
              <p className="text-brand-slate/70 max-w-2xl mx-auto">All 13 signature workshop activities are available in {loc.city}. Click any activity to learn more.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshopsData.map((w, i) => (
                <motion.div key={w.id} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: i * 0.04 }}>
                  <Link to={`/workshops/${w.id}`} className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={w.image} alt={`${w.title} workshop in ${loc.city}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-brand-slate mb-2">{w.title}</h3>
                      <p className="text-sm text-brand-slate/60 mb-3">{w.duration}</p>
                      <span className="text-brand-pink font-medium text-sm group-hover:underline underline-offset-4">View Details →</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-offwhite border border-gray-200 mb-6">
                  <Sparkles size={16} className="text-brand-pink" />
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Why choose us</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-slate mb-6">
                  The Most <span className="text-brand-pink italic">Trusted Art Workshop</span> in {loc.city}
                </h2>
                <p className="text-gray-600 font-light leading-relaxed mb-6">
                  Kraftykinni has conducted workshops for corporate teams, schools, and private groups across {loc.city}. Clients choose us because the experience is effortless — we arrive prepared, facilitate with energy and care, and leave no mess behind.
                </p>
                <p className="text-gray-600 font-light leading-relaxed mb-8">
                  Our facilitator Shramita Govil is a Fevicryl-certified artist with 50+ workshops and 1,500+ participants across Delhi NCR.
                </p>
                <button onClick={bookNow}
                  className="inline-flex items-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1">
                  Book in {loc.city} <ArrowRight size={18} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '50+', label: 'Workshops in Delhi NCR' },
                  { num: '1500+', label: 'Happy participants' },
                  { num: '13', label: 'Signature activities' },
                  { num: '₹600', label: 'Starting per person' },
                ].map((s) => (
                  <div key={s.label} className="p-8 bg-brand-offwhite rounded-2xl border border-gray-100 shadow-sm text-center">
                    <p className="font-serif text-3xl font-bold text-brand-slate mb-1">{s.num}</p>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cross-location links */}
        <section className="py-12 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-widest">Also available in</p>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.values(locationData).filter((l) => l.city !== loc.city).map((l) => (
                <Link key={l.slug} to={`/${l.slug}`}
                  className="px-6 py-3 bg-white hover:bg-brand-pink/5 text-brand-charcoal hover:text-brand-pink border border-gray-200 rounded-full text-sm font-medium transition-all">
                  Art Workshops in {l.city} →
                </Link>
              ))}
              <Link to="/corporate-art-workshops"
                className="px-6 py-3 bg-white hover:bg-brand-pink/5 text-brand-charcoal hover:text-brand-pink border border-gray-200 rounded-full text-sm font-medium transition-all">
                Corporate Workshops →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <ContactFooter />
    </>
  );
}
