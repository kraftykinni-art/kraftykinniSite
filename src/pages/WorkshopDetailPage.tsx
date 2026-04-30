import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Clock, CheckCircle2, ArrowLeft, Users, MapPin, Package, Award, ChevronDown } from 'lucide-react';
import { workshopsData } from '../data/workshops';
import ContactFooter from '../components/ContactFooter';
import { useBookNow } from '../hooks/useBookNow';

export default function WorkshopDetailPage() {
  const { id } = useParams<{ id: string }>();
  const bookNow = useBookNow();
  const workshop = workshopsData.find((w) => w.id === id);
  if (!workshop) return <Navigate to="/404" replace />;

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const related = workshopsData.filter((w) => w.id !== workshop.id && w.category === workshop.category).slice(0, 4);
  const relatedFinal = related.length >= 2 ? related : workshopsData.filter((w) => w.id !== workshop.id).slice(0, 4);
  // Use stable public/workshops/ path — avoids broken OG images from Vite's content-hash changes
  const ogImage = `https://kraftykinni.in/workshops/${workshop.id}.webp`;

  const canonical = `https://kraftykinni.in/workshops/${workshop.id}/`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: workshop.pageHeadline,
    description: workshop.metaDescription,
    provider: { '@type': 'LocalBusiness', name: 'Kraftykinni', url: 'https://kraftykinni.in', telephone: '+919599622210' },
    areaServed: [{ '@type': 'City', name: 'Delhi' }, { '@type': 'City', name: 'Gurgaon' }, { '@type': 'City', name: 'Noida' }],
    serviceType: `${workshop.title} Workshop`,
    offers: { '@type': 'AggregateOffer', lowPrice: '600', highPrice: '800', priceCurrency: 'INR' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kraftykinni.in/' },
      { '@type': 'ListItem', position: 2, name: 'Workshops', item: 'https://kraftykinni.in/corporate-art-workshops/' },
      { '@type': 'ListItem', position: 3, name: workshop.title, item: canonical },
    ],
  };

  const faqSchema = workshop.faq && workshop.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: workshop.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  } : null;

  const howToSchema = workshop.howToSteps && workshop.howToSteps.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to do ${workshop.title} — Step-by-Step Workshop Guide`,
    description: `A step-by-step guide to the ${workshop.title} workshop experience at Kraftykinni in Delhi NCR.`,
    totalTime: `PT${workshop.duration.replace(/\s*–.*/,'').trim()}H`,
    supply: [
      { '@type': 'HowToSupply', name: 'All materials provided by Kraftykinni (included in price)' },
    ],
    tool: [
      { '@type': 'HowToTool', name: 'Workshop guidance by Shramita Govil, Fevicryl Certified Artist' },
    ],
    step: workshop.howToSteps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  } : null;

  return (
    <>
      <Helmet>
        <title>{workshop.pageHeadline} | Kraftykinni</title>
        <meta name="description" content={workshop.metaDescription} />
        <meta name="keywords" content={workshop.keywords.join(', ')} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kraftykinni" />
        <meta property="og:title" content={`${workshop.pageHeadline} | Kraftykinni`} />
        <meta property="og:description" content={workshop.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${workshop.pageHeadline} | Kraftykinni`} />
        <meta name="twitter:description" content={workshop.metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
        {howToSchema && <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>}
      </Helmet>

      <main className="pt-24 bg-brand-offwhite">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <nav className="flex items-center gap-2 text-sm text-gray-400 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-pink transition-colors">Home</Link>
            <span>/</span>
            <Link to="/corporate-art-workshops" className="hover:text-brand-pink transition-colors">Workshops</Link>
            <span>/</span>
            <span className="text-brand-charcoal font-medium">{workshop.title}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-12 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
                className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:sticky lg:top-28">
                <img src={workshop.image} alt={`${workshop.title} workshop in Delhi NCR — conducted by Kraftykinni`} className="w-full h-full object-cover" fetchPriority="high" loading="eager" decoding="async" />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-pink mb-4 block">
                  {workshop.category} · Kraftykinni Workshop
                </span>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate leading-tight mb-4">
                  {workshop.pageHeadline}
                </h1>

                {/* Quick facts */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    { icon: <Clock size={14} />, text: workshop.duration },
                    { icon: <Users size={14} />, text: '20 – 200+ participants' },
                    { icon: <MapPin size={14} />, text: 'Delhi NCR + Online' },
                    { icon: <Package size={14} />, text: 'All materials included' },
                  ].map((f) => (
                    <span key={f.text} className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-brand-charcoal shadow-sm">
                      <span className="text-brand-pink">{f.icon}</span>{f.text}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 font-light leading-relaxed text-lg mb-8">{workshop.intro}</p>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">What you make & take home</p>
                  <p className="font-medium text-brand-charcoal">{workshop.whatYouMake}</p>
                </div>

                <h2 className="font-serif text-2xl font-bold text-brand-slate mb-4">What you'll experience</h2>
                <ul className="space-y-4 mb-10">
                  {workshop.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 font-light leading-relaxed">
                      <CheckCircle2 size={20} className="text-brand-pink shrink-0 mt-0.5" />{b}
                    </li>
                  ))}
                </ul>

                <div className="flex items-start gap-3 p-5 bg-brand-pink/5 rounded-2xl border border-brand-pink/10 mb-10">
                  <Award size={20} className="text-brand-pink shrink-0 mt-0.5" />
                  <p className="text-sm text-brand-charcoal font-light leading-relaxed">
                    <span className="font-medium">Best suited for: </span>{workshop.whoBenefits}
                  </p>
                </div>

                {/* CTAs — useBookNow handles navigation reliably */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={bookNow}
                    className="inline-flex items-center justify-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    Book This Workshop
                  </button>
                  <Link to="/corporate-art-workshops"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-charcoal border border-gray-200 px-8 py-4 rounded-full text-base font-medium transition-all">
                    <ArrowLeft size={16} /> Corporate Workshops
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing snapshot */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-brand-slate text-center mb-10">
              Workshop <span className="text-brand-pink italic">Pricing</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { tier: 'Intimate', pax: '20 – 50 participants', price: '₹800', featured: false },
                { tier: 'Standard', pax: '50 – 100 participants', price: '₹700', featured: true },
                { tier: 'Large',    pax: '100+ participants',      price: '₹600', featured: false },
              ].map((t) => (
                <div key={t.tier} className={`rounded-3xl p-8 flex flex-col items-center text-center border ${t.featured ? 'bg-brand-slate border-brand-pink shadow-xl scale-105' : 'bg-brand-offwhite border-gray-100 shadow-sm'}`}>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{t.tier}</p>
                  <p className={`text-sm mb-4 ${t.featured ? 'text-gray-400' : 'text-gray-500'}`}>{t.pax}</p>
                  <p className={`font-serif text-4xl font-bold mb-1 ${t.featured ? 'text-white' : 'text-brand-charcoal'}`}>{t.price}</p>
                  <p className="text-xs text-gray-400 mb-6">per person · all materials included</p>
                  <button onClick={bookNow}
                    className={`w-full py-3 rounded-xl text-sm font-medium transition-all ${t.featured ? 'bg-brand-pink hover:bg-brand-pink-light text-white' : 'bg-white hover:bg-gray-50 text-brand-charcoal border border-gray-200'}`}>
                    Book Now
                  </button>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-400 mt-6 italic">* Final pricing based on customisation. 7 days advance booking required.</p>
          </div>
        </section>

        {/* E-E-A-T — Shramita */}
        <section className="py-16 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-10 md:p-14 border border-gray-100 shadow-sm max-w-4xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-pink mb-4">Your facilitator</p>
              <h2 className="font-serif text-3xl font-bold text-brand-slate mb-4">
                Led by <span className="text-brand-pink italic">Shramita Govil</span>
              </h2>
              <p className="text-gray-600 font-light leading-relaxed text-lg mb-6">
                Shramita is a Fevicryl-certified art professional and the founder of Kraftykinni. With 50+ workshops conducted across corporate teams, schools, universities, and private events in Delhi NCR, every session she leads is designed to be inclusive, stress-free, and genuinely memorable.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Fevicryl Certified Artist', '50+ Workshops', '1500+ Participants', 'Delhi NCR'].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-brand-offwhite rounded-full text-sm font-medium text-brand-charcoal border border-gray-200">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section — only shown for workshops that have faq data */}
        {workshop.faq && workshop.faq.length > 0 && (
          <section className="py-16 bg-brand-offwhite">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-3xl font-bold text-brand-slate text-center mb-10">
                Frequently Asked <span className="text-brand-pink italic">Questions</span>
              </h2>
              <div className="space-y-3">
                {workshop.faq.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={openFaq === i}
                    >
                      <span className="font-medium text-brand-slate leading-snug">{item.q}</span>
                      <ChevronDown
                        size={20}
                        className={`text-brand-pink shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-5 text-gray-600 font-light leading-relaxed text-sm border-t border-gray-50 pt-4">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related workshops */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-brand-slate mb-8 text-center">
              You Might Also <span className="text-brand-pink italic">Enjoy</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedFinal.map((w) => (
                <Link key={w.id} to={`/workshops/${w.id}`}
                  className="group block bg-brand-offwhite rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={w.image} alt={`${w.title} workshop Delhi NCR`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  </div>
                  <div className="p-4">
                    <p className="font-serif font-bold text-brand-slate text-sm mb-1">{w.title}</p>
                    <p className="text-xs text-brand-pink font-medium group-hover:underline underline-offset-2">View →</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/corporate-art-workshops" className="inline-flex items-center gap-2 text-brand-pink font-medium hover:underline underline-offset-4 text-sm">
                View all 13 workshop activities →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <ContactFooter />
    </>
  );
}
