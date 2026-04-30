import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, ArrowRight, Users, IndianRupee, Clock, Star } from 'lucide-react';
import { workshopsData } from '../data/workshops';
import ContactFooter from '../components/ContactFooter';
import { useBookNow } from '../hooks/useBookNow';

const whyArtForEngagement = [
  {
    title: 'Creates conversation across hierarchies',
    desc: 'When 40 people are painting together, no one is thinking about org charts. Senior managers and interns end up at the same table, comparing colours, helping each other — genuine peer interaction without a structured icebreaker.',
  },
  {
    title: 'Every participant gets a physical takeaway',
    desc: 'A finished artwork they made themselves. It sits on a desk, goes home, gets photographed. The memory of the event travels with them. No other team activity produces this.',
  },
  {
    title: 'Zero logistics burden on your HR team',
    desc: 'Kraftykinni arrives with every art supply, sets up before the session, and cleans up after. You provide tables, chairs, and your team. That\'s it.',
  },
  {
    title: 'Works for every group size in Gurgaon',
    desc: 'From a 20-person leadership team offsite to a 200-person annual day across Cyber City — pricing and format scale accordingly. One facilitator per 40 participants ensures quality.',
  },
  {
    title: 'No experience needed — truly inclusive',
    desc: 'Step-by-step facilitation by a Fevicryl Certified Artist means everyone succeeds regardless of their art background. The least artistic person in the room usually surprises themselves.',
  },
  {
    title: 'Supports wellbeing alongside engagement',
    desc: 'Art is measurably stress-reducing. For teams in high-pressure Gurgaon corporate environments, a guided creative session does double duty: engagement event and genuine mental reset.',
  },
];

const activities = [
  { id: 'lippan-art',      label: 'Lippan Art',    note: 'Most requested for corporate groups' },
  { id: 'mandala-art',     label: 'Mandala Art',   note: 'Best for mindfulness & wellness days' },
  { id: 'tie-and-dye',     label: 'Tie & Dye',     note: 'High energy, great for large groups' },
  { id: 'boho-canvas',     label: 'Boho Canvas',   note: 'Popular at off-site retreats' },
  { id: 'tote-bag-painting', label: 'Tote Bag Painting', note: 'Doubles as a branded takeaway' },
  { id: 'clay-art',        label: 'Clay Art',       note: 'Ideal for wellness & decompression' },
];

const useCases = [
  {
    heading: 'Quarterly Team-Building Events',
    body: 'The most common booking format. HR teams across DLF Cyber City, Udyog Vihar, and MG Road run these quarterly to maintain team cohesion between performance cycles. A 90-minute guided art session fills an afternoon slot without requiring an external venue.',
  },
  {
    heading: 'Employee Appreciation Days',
    body: 'When you want to signal investment in your people rather than just entertainment, a creative session works well. Employees frequently describe it as "the first company event I actually enjoyed." The artwork they take home is a daily reminder of the gesture.',
  },
  {
    heading: 'Annual Day Activities',
    body: 'For large annual days at hotels or banquet halls in Gurgaon, art workshops are an effective structured activity before or after the formal programme. Groups of 100 to 200+ are accommodated with additional facilitators at no extra logistics cost.',
  },
  {
    heading: 'Onboarding & New Hire Orientation',
    body: 'Art workshops as part of onboarding have become popular in Gurgaon\'s tech companies. A creative session on day one signals company culture and breaks the ice across cohorts far more effectively than a team quiz.',
  },
  {
    heading: 'Women\'s Day & Diversity Events',
    body: 'Inclusive, non-competitive, and genuinely enjoyable for mixed groups. Lippan Art and Mandala sessions are particularly popular for Women\'s Day celebrations and diversity & inclusion event calendars.',
  },
];

const faqs = [
  {
    q: 'What makes art workshops a good employee engagement activity compared to other options?',
    a: 'Art workshops sit in a category most team activities don\'t reach: collaborative and creative without being competitive. There\'s no scoring, no elimination, and no performance pressure. The shared creative process produces genuine conversation, and every participant walks out with a physical takeaway — a rare outcome from a corporate event. In Gurgaon\'s high-pressure corporate environment, the stress-reducing effect of creative work is an added benefit HR managers frequently mention.',
  },
  {
    q: 'Can you handle our team of 100+ at our Gurgaon office?',
    a: 'Yes. Our standard format handles 20 to 200+ participants. For groups above 60, we bring additional facilitators to ensure quality of experience. Pricing drops to ₹600 per person at 100+ scale. The setup requires standard office tables and chairs — we bring all art supplies.',
  },
  {
    q: 'Which activity works best for a Gurgaon corporate team of 50 people?',
    a: 'Lippan Art, Mandala Art, and Boho Canvas are our top three for 40–60 person corporate groups. Tie & Dye works well if you want a higher-energy, tactile activity. We recommend based on your group\'s profile and event tone — reach out and we\'ll suggest the best fit.',
  },
  {
    q: 'Do you come to our office in DLF Cyber City / Udyog Vihar?',
    a: 'Yes — we travel to your office or event venue across Gurgaon, including DLF Cyber City, Udyog Vihar, DLF Cyber Park, MG Road, Golf Course Road, Sohna Road, and all Sectors. You do not need to book an external venue. We only need tables, chairs, and your team.',
  },
  {
    q: 'What is the per-person cost for a corporate employee engagement workshop in Gurgaon?',
    a: 'Pricing scales with group size: ₹800/person for groups of 20–50, ₹700/person for 50–100, and ₹600/person for 100+. All art materials are included. A 50% deposit confirms the date; minimum 7 days notice required.',
  },
  {
    q: 'Can you incorporate our company branding or event theme?',
    a: 'Yes. Tote Bag Painting and Canvas Pouch are particularly popular as branded gifting workshops — we can incorporate brand colours and design elements. Most activities can be adapted to an event theme or colour palette. Mention this when you enquire and we\'ll confirm feasibility.',
  },
];

export default function EmployeeEngagementGurgaonPage() {
  const bookNow = useBookNow();

  const title = 'Employee Engagement Activities Gurgaon | Art Workshops | Kraftykinni';
  const description = 'Guided art workshops for employee engagement in Gurgaon. Teams of 20–200+, all materials supplied. Lippan Art, Mandala, Tie & Dye at your Cyber City or Udyog Vihar office. ₹600/person.';
  const canonical = 'https://kraftykinni.in/employee-engagement-activities-gurgaon';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Employee Engagement Art Workshops — Gurgaon',
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Kraftykinni',
      url: 'https://kraftykinni.in',
      telephone: '+919599622210',
      email: 'kraftykinni@gmail.com',
    },
    areaServed: { '@type': 'City', name: 'Gurgaon' },
    serviceType: 'Employee Engagement Art Workshop',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '600',
      highPrice: '800',
      priceCurrency: 'INR',
      offerCount: '3',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kraftykinni.in/' },
      { '@type': 'ListItem', position: 2, name: 'Corporate Art Workshops', item: 'https://kraftykinni.in/corporate-art-workshops' },
      { '@type': 'ListItem', position: 3, name: 'Employee Engagement Activities Gurgaon', item: canonical },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="employee engagement activities Gurgaon, team building Gurgaon, employee engagement workshop Gurgaon, art workshop team building Gurgaon, corporate engagement activities Gurugram, team outing Gurgaon" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://kraftykinni.in/og-corporate.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Kraftykinni" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://kraftykinni.in/og-corporate.jpg" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main className="pt-24 bg-brand-offwhite">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <nav className="flex items-center gap-2 text-sm text-gray-400 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-pink transition-colors">Home</Link>
            <span>/</span>
            <Link to="/corporate-art-workshops" className="hover:text-brand-pink transition-colors">Corporate Workshops</Link>
            <span>/</span>
            <span className="text-brand-charcoal font-medium">Employee Engagement — Gurgaon</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-16 bg-brand-offwhite relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8">
                <Sparkles size={16} className="text-brand-pink" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">Gurgaon · Corporate Workshops</span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-slate leading-tight mb-6">
                Employee Engagement<br />
                <span className="text-brand-pink italic">Activities in Gurgaon</span>
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-4">
                Gurgaon's corporate sector books Kraftykinni for one reason: art workshops produce outcomes other team activities don't. Genuine conversation, cross-hierarchy interaction, and a physical takeaway every employee keeps.
              </p>
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-10">
                Guided sessions for teams of 20 to 200+ across DLF Cyber City, Udyog Vihar, MG Road, and Golf Course Road. All materials included. Starting at ₹600 per person.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={bookNow}
                  className="inline-flex items-center justify-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  Book an Engagement Session <ArrowRight size={18} />
                </button>
                <Link
                  to="/corporate-art-workshops"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-charcoal border border-gray-200 px-8 py-4 rounded-full text-base font-medium transition-all"
                >
                  See Full Corporate Page
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="py-10 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <Users size={20} className="text-brand-pink" />, num: '20–200+', label: 'participants per session' },
                { icon: <IndianRupee size={20} className="text-brand-pink" />, num: '₹600', label: 'per person at scale' },
                { icon: <Clock size={20} className="text-brand-pink" />, num: '90 min', label: 'typical session length' },
                { icon: <Star size={20} className="text-brand-pink" />, num: '50+', label: 'corporate events done' },
              ].map((s) => (
                <div key={s.label} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">{s.icon}</div>
                  <div>
                    <p className="font-serif text-2xl font-bold text-brand-slate leading-none">{s.num}</p>
                    <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-pink">When Teams Book Us</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-slate mt-2">
                Employee Engagement <span className="text-brand-pink italic">Use Cases in Gurgaon</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((uc, i) => (
                <motion.div
                  key={uc.heading}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7"
                >
                  <h3 className="font-serif text-lg font-bold text-brand-slate mb-3">{uc.heading}</h3>
                  <p className="text-brand-charcoal font-light leading-relaxed text-sm">{uc.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial — Amity / Gurgaon corporate */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <blockquote className="relative">
              <span className="absolute -top-4 left-0 text-7xl text-brand-pink/15 font-serif leading-none select-none">&ldquo;</span>
              <p className="font-serif text-xl md:text-2xl text-brand-slate font-medium leading-snug mb-5 relative z-10">
                "Kraftykinni brought such a creative, refreshing energy to our corporate event. The team loved every moment and the art they created was stunning. Highly recommended!"
              </p>
              <footer className="text-sm text-gray-400">
                <strong className="text-brand-charcoal font-semibold">Gurjeet</strong>
                <span className="mx-2">·</span>
                Corporate Team Event, Gurgaon
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Why art works */}
        <section className="py-20 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-pink">Why It Works</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-slate mt-2">
                Why Gurgaon Teams Choose <span className="text-brand-pink italic">Art Workshops</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyArtForEngagement.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                >
                  <CheckCircle2 size={20} className="text-brand-pink flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-brand-slate mb-2 text-sm">{item.title}</h3>
                    <p className="text-brand-charcoal font-light leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-pink">What We Run</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-slate mt-2">
                Top Workshop Activities <span className="text-brand-pink italic">for Gurgaon Teams</span>
              </h2>
              <p className="text-brand-slate/70 mt-3 max-w-xl mx-auto">Six of our 13 signature activities work especially well for corporate employee engagement. All materials included.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((act, i) => {
                const workshop = workshopsData.find((w) => w.id === act.id);
                if (!workshop) return null;
                return (
                  <motion.div
                    key={act.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <Link to={`/workshops/${act.id}`} className="group block bg-brand-offwhite rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={workshop.image}
                          alt={`${act.label} employee engagement workshop Gurgaon`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="p-5">
                        <div className="text-xs font-bold uppercase tracking-widest text-brand-pink mb-1">{act.note}</div>
                        <h3 className="font-serif text-lg font-bold text-brand-slate mb-2">{act.label}</h3>
                        <span className="text-brand-pink font-medium text-sm group-hover:underline underline-offset-4">View Details →</span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/corporate-art-workshops"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-brand-charcoal hover:text-brand-pink hover:border-brand-pink/30 px-6 py-3 rounded-full text-sm font-medium transition-all"
              >
                View all 13 activities <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-brand-offwhite">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-brand-slate mb-10 text-center">
              Frequently Asked <span className="text-brand-pink italic">Questions</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                    <span className="font-semibold text-brand-slate text-sm pr-4 leading-snug">{faq.q}</span>
                    <span className="text-brand-pink flex-shrink-0 transition-transform duration-200 group-open:rotate-45">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-brand-charcoal/80 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-brand-slate mb-4">
              Ready to Plan Your <span className="text-brand-pink italic">Team Session?</span>
            </h2>
            <p className="text-gray-600 font-light mb-8 leading-relaxed">
              Share your group size, preferred date, and Gurgaon location. We'll confirm availability and suggest the best activity for your team within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={bookNow}
                className="inline-flex items-center justify-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1"
              >
                Get in Touch <ArrowRight size={18} />
              </button>
              <Link
                to="/workshops-in-gurgaon"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-brand-charcoal hover:text-brand-pink px-8 py-4 rounded-full text-base font-medium transition-all"
              >
                Art Workshops in Gurgaon →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <ContactFooter />
    </>
  );
}
