import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ArrowRight, Clock, Users, IndianRupee, Award } from 'lucide-react';
import { workshopsData } from '../data/workshops';
import PricingFAQ from '../components/PricingFAQ';
import ContactFooter from '../components/ContactFooter';
import { useBookNow } from '../hooks/useBookNow';

const whyUs = [
  { title: 'No experience needed', desc: 'Step-by-step guidance from a Fevicryl-certified facilitator means every participant — from first-timer to secret artist — walks away proud of what they made.' },
  { title: 'Zero logistics on your end', desc: 'We bring every art supply, set up before the session, and clean up after. You only need to provide tables, chairs, and your team.' },
  { title: 'Every participant takes artwork home', desc: 'A physical takeaway that lasts long after the event — more memorable than a dinner or a quiz.' },
  { title: 'Flexible group sizes', desc: 'From intimate offsites of 20 to large annual days of 200+. Pricing scales accordingly with no compromise on quality.' },
  { title: 'Fully customisable to your theme', desc: 'Colour palettes, corporate branding, event themes — we align the activity to your occasion.' },
  { title: 'Online sessions pan-India', desc: 'Distributed teams are not a barrier. We ship materials and facilitate live online sessions across India.' },
];

const logistics = [
  { label: 'Group size',      value: '20 to 200+ participants' },
  { label: 'Location',        value: 'Delhi · Gurgaon · Noida · Online pan-India' },
  { label: 'Materials',       value: 'All art supplies provided by Kraftykinni' },
  { label: 'Your venue needs', value: 'Tables and chairs — we handle everything else' },
  { label: 'Duration',        value: '1.5 to 2.5 hours depending on activity' },
  { label: 'Booking notice',  value: 'Minimum 7 days · 50% deposit to confirm' },
  { label: 'Payment',         value: 'UPI · Bank transfer · Cash accepted' },
  { label: 'Online sessions', value: 'Kit shipped pan-India · Live facilitation' },
];

const corporateFaqs = [
  { q: 'What makes art workshops better than other corporate team-building activities?', a: 'Unlike games or quizzes, art workshops produce a physical outcome every participant keeps. The shared creative process builds camaraderie without competition. Participants frequently describe the experience as genuinely therapeutic — a rare outcome from a corporate event.' },
  { q: 'Can you handle 100+ participants in a single session?', a: 'Yes — our large-group format is designed for 100 to 200+ participants. Pricing drops to ₹600 per person at this scale and we bring additional facilitators if required.' },
  { q: 'Which activity works best for corporate team building?', a: 'Lippan Art, Mandala Art, and Boho Canvas are our most requested for corporate groups. Tie & Dye works brilliantly for outdoor or high-energy events. We always recommend based on your group size, event tone, and duration available.' },
  { q: 'Can you incorporate our company branding or colours?', a: 'Absolutely. Tote Bag Painting and Canvas Pouch are particularly popular as branded gifting workshops. We can work with your brand palette and theme across most activities.' },
  { q: 'Do you conduct workshops on weekends or at off-site venues?', a: 'Yes — we conduct workshops any day of the week including weekends, at your office, a rented venue, hotel banquet hall, or outdoor space. We only need tables and chairs.' },
];

export default function CorporateWorkshopsPage() {
  const bookNow = useBookNow();

  const title = 'Corporate Art Workshops Delhi NCR — ₹600/person · All Materials | Kraftykinni';
  const description = 'Kraftykinni offers hands-on corporate art workshops for teams of 20–200+ across Delhi, Gurgaon & Noida. 13 activities from ₹600/person. All materials included. Led by Fevicryl-certified artist Shramita Govil. Book today.';
  const canonical = 'https://kraftykinni.in/corporate-art-workshops';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="corporate art workshop Delhi NCR, team building art activity Delhi, employee engagement art workshop, corporate creative workshop Gurgaon, art team building Noida, art workshop for companies Delhi" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://kraftykinni.in/og-corporate.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Corporate art workshop in progress — teams painting together at Kraftykinni" />
        <meta property="og:site_name" content="Kraftykinni" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://kraftykinni.in/og-corporate.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Service',
          name: 'Corporate Art Workshops Delhi NCR', description,
          provider: { '@type': 'LocalBusiness', name: 'Kraftykinni', url: 'https://kraftykinni.in', telephone: '+919599622210', email: 'kraftykinni@gmail.com' },
          areaServed: [{ '@type': 'City', name: 'Delhi' }, { '@type': 'City', name: 'Gurgaon' }, { '@type': 'City', name: 'Noida' }],
          serviceType: 'Corporate Team Building Art Workshop',
          offers: { '@type': 'AggregateOffer', lowPrice: '600', highPrice: '800', priceCurrency: 'INR', offerCount: '3' },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kraftykinni.in/' },
            { '@type': 'ListItem', position: 2, name: 'Corporate Art Workshops', item: canonical },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: corporateFaqs.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        })}</script>
      </Helmet>

      <main className="pt-24 bg-brand-offwhite">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <nav className="flex items-center gap-2 text-sm text-gray-400" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-pink transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-charcoal font-medium">Corporate Art Workshops</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-16 bg-brand-offwhite relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[35%] h-[80%] rounded-full bg-brand-pink/5 blur-3xl -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8">
                  <Sparkles size={16} className="text-brand-pink" />
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Fevicryl Certified Artist · Delhi NCR</span>
                </div>
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-slate leading-tight mb-6">
                  Corporate Art Workshops <br /><span className="text-brand-pink italic">Your Team Will Remember</span>
                </h1>
                <p className="text-lg text-gray-600 font-light leading-relaxed mb-4">
                  Hands-on, guided creative sessions for corporate teams of 20 to 200+ across Delhi, Gurgaon and Noida. Every participant creates something real — and takes it home.
                </p>
                <p className="text-base text-gray-500 font-light leading-relaxed mb-10">
                  Led by <strong className="font-medium text-brand-charcoal">Shramita Govil</strong>, Fevicryl-certified artist with 50+ workshops and 1,500+ happy participants. All 13 activities available. All materials included.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Fixed: was scrolling to wrong element — now uses useBookNow */}
                  <button onClick={bookNow}
                    className="inline-flex items-center justify-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1">
                    Get a Free Quote <ArrowRight size={18} />
                  </button>
                  <a href="#activities" onClick={(e) => { e.preventDefault(); document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-charcoal border border-gray-200 px-8 py-4 rounded-full text-base font-medium transition-all">
                    Browse Activities
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Users size={22} />, num: '1500+', label: 'Participants trained' },
                  { icon: <Award size={22} />, num: '50+', label: 'Workshops conducted' },
                  { icon: <IndianRupee size={22} />, num: '₹600', label: 'Starting per person' },
                  { icon: <Clock size={22} />, num: '13', label: 'Signature activities' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                    <div className="w-12 h-12 bg-brand-offwhite rounded-full flex items-center justify-center text-brand-pink shadow-sm mb-3">{s.icon}</div>
                    <p className="font-serif text-3xl font-bold text-brand-slate mb-1">{s.num}</p>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">Why Teams <span className="text-brand-pink italic">Choose Kraftykinni</span></h2>
              <div className="w-24 h-1 bg-brand-pink mx-auto rounded-full mb-6" />
              <p className="text-lg text-brand-slate/70 max-w-2xl mx-auto">We have conducted 50+ corporate workshops across Delhi NCR. Here is what makes the difference.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyUs.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex gap-4 p-6 bg-brand-offwhite rounded-2xl border border-gray-100">
                  <CheckCircle2 size={22} className="text-brand-pink shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif font-bold text-brand-slate mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities */}
        <section id="activities" className="py-24 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">13 Signature <span className="text-brand-pink italic">Workshop Activities</span></h2>
              <div className="w-24 h-1 bg-brand-pink mx-auto rounded-full mb-6" />
              <p className="text-lg text-brand-slate/70 max-w-2xl mx-auto">Each activity is self-contained, fully facilitated, and results in a takeaway. Click any activity to learn more.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshopsData.map((w, i) => (
                <motion.div key={w.id} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.04 }}>
                  <Link to={`/workshops/${w.id}`} className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={w.image} alt={`${w.title} corporate workshop Delhi NCR`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-brand-slate">{w.category}</div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-brand-slate mb-2">{w.title}</h3>
                      <div className="flex items-center text-sm text-brand-slate/60 mb-4"><Clock size={14} className="mr-1.5" />{w.duration}</div>
                      <span className="text-brand-pink font-medium text-sm group-hover:underline underline-offset-4">View Details →</span>
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
              <h2 className="font-serif text-4xl font-bold text-brand-slate mb-4">Workshop <span className="text-brand-pink italic">Logistics</span></h2>
              <p className="text-brand-slate/70 max-w-xl mx-auto">Everything you need to know before booking. No hidden charges, no surprises.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {logistics.map((item) => (
                <div key={item.label} className="p-6 bg-brand-offwhite rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{item.label}</p>
                  <p className="font-medium text-brand-charcoal text-sm leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing + corporate FAQs */}
        <PricingFAQ extraFaqs={corporateFaqs} />

        {/* Location internal links */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-brand-slate mb-8">
              We Conduct Workshops Across <span className="text-brand-pink italic">Delhi NCR</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { city: 'Delhi',   href: '/workshops-in-delhi' },
                { city: 'Gurgaon', href: '/workshops-in-gurgaon' },
                { city: 'Noida',   href: '/workshops-in-noida' },
              ].map((loc) => (
                <Link key={loc.city} to={loc.href}
                  className="px-6 py-3 bg-brand-offwhite hover:bg-brand-pink/10 text-brand-charcoal hover:text-brand-pink border border-gray-200 rounded-full text-sm font-medium transition-all">
                  Art Workshops in {loc.city} →
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <ContactFooter />
    </>
  );
}
