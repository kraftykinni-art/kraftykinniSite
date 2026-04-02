import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { workshopsData } from '../data/workshops';
import PricingFAQ from '../components/PricingFAQ';
import ContactFooter from '../components/ContactFooter';

const benefits = [
  { title: 'No experience needed', desc: 'Step-by-step guidance means every participant succeeds — first-timers included.' },
  { title: 'Zero logistics for you', desc: 'We bring all art materials, set up, and clean up. You just need tables and chairs.' },
  { title: 'Fevicryl certified artist', desc: 'Led by Shramita Govil, certified by India\'s leading art brand.' },
  { title: 'Everyone takes artwork home', desc: 'A tangible memory that lasts long after the event ends.' },
  { title: 'At your office or venue', desc: 'We come to Delhi, Gurgaon, or Noida. Online sessions available pan-India.' },
  { title: 'Fully customisable', desc: 'Activity, duration, theme — tailored to your team and event tone.' },
];

const logistics = [
  { label: 'Group Size', value: '20 to 200+ participants' },
  { label: 'Location', value: 'Delhi, Gurgaon, Noida (in-person) · Pan-India (online)' },
  { label: 'Materials', value: 'All art supplies provided by Kraftykinni' },
  { label: 'Venue needs', value: 'Tables & chairs — we handle everything else' },
  { label: 'Duration', value: '1.5 to 2.5 hours per session' },
  { label: 'Booking notice', value: 'Minimum 7 days in advance' },
];

export default function CorporateWorkshopsPage() {
  const title = 'Corporate Art Workshops in Delhi NCR | Team Building | Kraftykinni';
  const description = 'Kraftykinni offers hands-on corporate art workshops for teams of 20–200+ in Delhi, Gurgaon & Noida. 13 activities, ₹600–₹800/person. All materials included. Led by Fevicryl-certified artist Shramita Govil.';
  const canonical = 'https://kraftykinni.in/corporate-art-workshops';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Corporate Art Workshops Delhi NCR",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Kraftykinni",
            "url": "https://kraftykinni.in",
            "telephone": "+919599622210",
          },
          "description": description,
          "areaServed": ["Delhi", "Gurgaon", "Noida", "Delhi NCR"],
          "serviceType": "Corporate Team Building Workshop",
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "600",
            "highPrice": "800",
            "priceCurrency": "INR",
          },
        })}</script>
      </Helmet>

      <main className="pt-24 bg-brand-offwhite">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-pink transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-charcoal font-medium">Corporate Art Workshops</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-16 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8">
                <Sparkles size={16} className="text-brand-pink" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">
                  Fevicryl Certified Artist
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-slate leading-tight mb-6">
                Corporate Art Workshops <br />
                <span className="text-brand-pink italic">Delhi NCR</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 font-light leading-relaxed">
                Hands-on creative sessions for corporate teams of 20 to 200+. Every participant creates something real and takes it home. No art experience needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  Get a Quote <ArrowRight size={18} />
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-charcoal border border-gray-200 px-8 py-4 rounded-full text-base font-medium transition-all"
                >
                  View All Workshops
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-brand-slate py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: '13', label: 'Signature activities' },
                { num: '200+', label: 'Participants per session' },
                { num: '₹600', label: 'Starting per person' },
                { num: '1500+', label: 'Happy participants' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-3xl font-bold text-white mb-1">{s.num}</p>
                  <p className="text-sm text-gray-400 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">
                Why Teams <span className="text-brand-pink italic">Choose Us</span>
              </h2>
              <div className="w-24 h-1 bg-brand-pink mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex gap-4 p-6 bg-brand-offwhite rounded-2xl border border-gray-100"
                >
                  <CheckCircle2 size={22} className="text-brand-pink shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif font-bold text-brand-slate mb-1">{b.title}</h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Workshops grid — links to individual pages */}
        <section className="py-24 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">
                13 Signature <span className="text-brand-pink italic">Activities</span>
              </h2>
              <p className="text-lg text-brand-slate/70 max-w-2xl mx-auto">
                All materials included in every session. Choose one activity or let us suggest the best fit for your team.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshopsData.map((workshop, i) => (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Link
                    to={`/workshops/${workshop.id}`}
                    className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={workshop.image}
                        alt={`${workshop.title} workshop Delhi NCR`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-brand-slate mb-2">{workshop.title}</h3>
                      <p className="text-sm text-brand-slate/60 mb-3">{workshop.duration}</p>
                      <span className="text-brand-pink font-medium text-sm group-hover:underline underline-offset-4">
                        View Details →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Logistics */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-brand-slate mb-4">
                Workshop <span className="text-brand-pink italic">Logistics</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {logistics.map((item) => (
                <div key={item.label} className="p-6 bg-brand-offwhite rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{item.label}</p>
                  <p className="font-medium text-brand-charcoal">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing — reuse existing component, no duplication */}
        <PricingFAQ />

      </main>
      <ContactFooter />
    </>
  );
}
