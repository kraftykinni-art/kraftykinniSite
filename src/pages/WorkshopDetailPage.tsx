import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Clock, CheckCircle2, ArrowLeft, Users, MapPin, Package, Award } from 'lucide-react';
import { workshopsData } from '../data/workshops';
import ContactFooter from '../components/ContactFooter';

export default function WorkshopDetailPage() {
  const { id } = useParams<{ id: string }>();
  const workshop = workshopsData.find((w) => w.id === id);
  if (!workshop) return <Navigate to="/404" replace />;

  // Related workshops — same category, exclude current, max 4
  const related = workshopsData
    .filter((w) => w.id !== workshop.id && w.category === workshop.category)
    .slice(0, 4);
  // If not enough same-category, fill with others
  const relatedFinal = related.length >= 2
    ? related
    : workshopsData.filter((w) => w.id !== workshop.id).slice(0, 4);

  const canonical = `https://kraftykinni.in/workshops/${workshop.id}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: workshop.pageHeadline,
    description: workshop.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Kraftykinni',
      url: 'https://kraftykinni.in',
      telephone: '+919599622210',
    },
    areaServed: [
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'City', name: 'Gurgaon' },
      { '@type': 'City', name: 'Noida' },
    ],
    serviceType: `${workshop.title} Workshop`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '600',
      highPrice: '800',
      priceCurrency: 'INR',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kraftykinni.in/' },
      { '@type': 'ListItem', position: 2, name: 'Workshops', item: 'https://kraftykinni.in/#workshops' },
      { '@type': 'ListItem', position: 3, name: workshop.title, item: canonical },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{workshop.pageHeadline} | Kraftykinni</title>
        <meta name="description" content={workshop.metaDescription} />
        <meta name="keywords" content={workshop.keywords.join(', ')} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${workshop.pageHeadline} | Kraftykinni`} />
        <meta property="og:description" content={workshop.metaDescription} />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <main className="pt-24 bg-brand-offwhite">

        {/* ── Breadcrumb ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <nav className="flex items-center gap-2 text-sm text-gray-400 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-pink transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#workshops" className="hover:text-brand-pink transition-colors">Workshops</Link>
            <span>/</span>
            <span className="text-brand-charcoal font-medium">{workshop.title}</span>
          </nav>
        </div>

        {/* ── Hero ── */}
        <section className="py-12 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sticky top-28"
              >
                <img
                  src={workshop.image}
                  alt={`${workshop.title} workshop in Delhi NCR — conducted by Kraftykinni`}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="flex flex-col"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-brand-pink mb-4 block">
                  {workshop.category} · Kraftykinni Workshop
                </span>

                <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate leading-tight mb-4">
                  {workshop.pageHeadline}
                </h1>

                {/* Quick facts row */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-brand-charcoal shadow-sm">
                    <Clock size={14} className="text-brand-pink" /> {workshop.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-brand-charcoal shadow-sm">
                    <Users size={14} className="text-brand-pink" /> 20 – 200+ participants
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-brand-charcoal shadow-sm">
                    <MapPin size={14} className="text-brand-pink" /> Delhi NCR + Online
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-brand-charcoal shadow-sm">
                    <Package size={14} className="text-brand-pink" /> All materials included
                  </span>
                </div>

                {/* Intro paragraph — unique, keyword-rich per workshop */}
                <p className="text-gray-600 font-light leading-relaxed text-lg mb-8">
                  {workshop.intro}
                </p>

                {/* What you make */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">What you make & take home</p>
                  <p className="font-medium text-brand-charcoal">{workshop.whatYouMake}</p>
                </div>

                {/* Benefits */}
                <h2 className="font-serif text-2xl font-bold text-brand-slate mb-4">What you'll experience</h2>
                <ul className="space-y-4 mb-10">
                  {workshop.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 font-light leading-relaxed">
                      <CheckCircle2 size={20} className="text-brand-pink shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Who benefits */}
                <div className="flex items-start gap-3 p-5 bg-brand-pink/5 rounded-2xl border border-brand-pink/10 mb-10">
                  <Award size={20} className="text-brand-pink shrink-0 mt-0.5" />
                  <p className="text-sm text-brand-charcoal font-light leading-relaxed">
                    <span className="font-medium">Best suited for: </span>{workshop.whoBenefits}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      // Navigate to home then scroll — handled by Navbar logic
                      window.location.href = '/#contact';
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    Book This Workshop
                  </a>
                  <Link
                    to="/corporate-art-workshops"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-charcoal border border-gray-200 px-8 py-4 rounded-full text-base font-medium transition-all"
                  >
                    <ArrowLeft size={16} /> Corporate Workshops
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Pricing snapshot ── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-brand-slate text-center mb-10">
              Workshop <span className="text-brand-pink italic">Pricing</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { tier: 'Intimate', pax: '20 – 50 participants', price: '₹800', featured: false },
                { tier: 'Standard', pax: '50 – 100 participants', price: '₹700', featured: true },
                { tier: 'Large', pax: '100+ participants', price: '₹600', featured: false },
              ].map((t) => (
                <div
                  key={t.tier}
                  className={`rounded-3xl p-8 flex flex-col items-center text-center border ${
                    t.featured
                      ? 'bg-brand-slate border-brand-pink shadow-xl scale-105'
                      : 'bg-brand-offwhite border-gray-100 shadow-sm'
                  }`}
                >
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${t.featured ? 'text-gray-400' : 'text-gray-400'}`}>{t.tier}</p>
                  <p className={`text-sm mb-4 ${t.featured ? 'text-gray-400' : 'text-gray-500'}`}>{t.pax}</p>
                  <p className={`font-serif text-4xl font-bold mb-1 ${t.featured ? 'text-white' : 'text-brand-charcoal'}`}>{t.price}</p>
                  <p className={`text-xs mb-6 ${t.featured ? 'text-gray-400' : 'text-gray-400'}`}>per person · all materials included</p>
                  <a
                    href="/#contact"
                    className={`w-full py-3 rounded-xl text-sm font-medium transition-all ${
                      t.featured
                        ? 'bg-brand-pink hover:bg-brand-pink-light text-white'
                        : 'bg-white hover:bg-gray-50 text-brand-charcoal border border-gray-200'
                    }`}
                  >
                    Book Now
                  </a>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-400 mt-6 italic">* Final pricing based on customisation. 7 days advance booking required.</p>
          </div>
        </section>

        {/* ── E-E-A-T section — Shramita's credibility ── */}
        <section className="py-16 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-10 md:p-14 border border-gray-100 shadow-sm max-w-4xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-pink mb-4">Your facilitator</p>
              <h2 className="font-serif text-3xl font-bold text-brand-slate mb-4">
                Led by <span className="text-brand-pink italic">Shramita Govil</span>
              </h2>
              <p className="text-gray-600 font-light leading-relaxed text-lg mb-6">
                Shramita is a Fevicryl-certified art professional and the founder of Kraftykinni. With 50+ workshops conducted across corporate teams, schools, universities, and private events in Delhi NCR, every session she leads is designed to be inclusive, stress-free, and genuinely memorable. Participants with no prior art experience consistently create outcomes they are proud of.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-brand-offwhite rounded-full text-sm font-medium text-brand-charcoal border border-gray-200">Fevicryl Certified Artist</span>
                <span className="px-4 py-2 bg-brand-offwhite rounded-full text-sm font-medium text-brand-charcoal border border-gray-200">50+ Workshops</span>
                <span className="px-4 py-2 bg-brand-offwhite rounded-full text-sm font-medium text-brand-charcoal border border-gray-200">1500+ Participants</span>
                <span className="px-4 py-2 bg-brand-offwhite rounded-full text-sm font-medium text-brand-charcoal border border-gray-200">Delhi NCR</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related workshops — internal linking ── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-brand-slate mb-8 text-center">
              You Might Also <span className="text-brand-pink italic">Enjoy</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedFinal.map((w) => (
                <Link
                  key={w.id}
                  to={`/workshops/${w.id}`}
                  className="group block bg-brand-offwhite rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={w.image}
                      alt={`${w.title} workshop Delhi NCR`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-serif font-bold text-brand-slate text-sm mb-1">{w.title}</p>
                    <p className="text-xs text-brand-pink font-medium group-hover:underline underline-offset-2">View →</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/corporate-art-workshops"
                className="inline-flex items-center gap-2 text-brand-pink font-medium hover:underline underline-offset-4 text-sm"
              >
                View all 13 workshops →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <ContactFooter />
    </>
  );
}
