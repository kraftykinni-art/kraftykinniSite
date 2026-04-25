import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles, CheckCircle2, ArrowRight, Clock,
  Users, IndianRupee, Heart, Gift, Star, Cake,
} from 'lucide-react';
import { workshopsData } from '../data/workshops';
import ContactFooter from '../components/ContactFooter';
import { useBookNow } from '../hooks/useBookNow';

// ── Private event types ───────────────────────────────────────────────────────

const eventTypes = [
  {
    icon: <Cake size={26} className="text-brand-pink" />,
    label: 'Birthday Parties',
    desc: 'Make it a birthday your friends talk about all year. A hands-on art session beats a dinner or a bar — everyone creates something personal and leaves with a keepsake.',
    popular: 'Boho Canvas · Glass Painting · Lippan Art',
  },
  {
    icon: <Heart size={26} className="text-brand-pink" />,
    label: 'Kitty Parties',
    desc: 'Add something different to your next kitty. Art workshops are relaxed, social, and genuinely fun — no competition, just creativity and good conversation.',
    popular: 'Mandala Art · Trinket Tray · Canvas Pouch',
  },
  {
    icon: <Star size={26} className="text-brand-pink" />,
    label: 'Bachelorette Parties',
    desc: 'A bachelorette that the bride will actually remember. Personalised, photogenic, and creative — each guest paints something unique as a keepsake of the day.',
    popular: 'Boho Canvas · Tote Bag Painting · Glass Painting',
  },
  {
    icon: <Gift size={26} className="text-brand-pink" />,
    label: 'Baby Showers',
    desc: 'Guests create a one-of-a-kind gift for the parents-to-be. Art workshops add warmth and meaning to a baby shower — well beyond the usual games.',
    popular: 'Clay Art · Canvas Pouch · Lippan Art',
  },
];

// ── Why Kraftykinni for private events ───────────────────────────────────────

const whyUs = [
  {
    title: 'No experience needed — ever',
    desc: 'Every session is fully guided, step by step, by a Fevicryl-certified facilitator. If you can hold a brush, you can make something beautiful.',
  },
  {
    title: 'We bring everything',
    desc: 'Every art supply, every tool — set up before guests arrive and packed away after. You organise the space; we handle everything else.',
  },
  {
    title: 'Everyone takes artwork home',
    desc: 'A physical keepsake that lasts. Guests leave with something they made themselves — far more meaningful than a goodie bag.',
  },
  {
    title: 'Flexible group sizes',
    desc: 'Intimate gatherings of 10 or large celebrations of 80+. Pricing stays consistent at ₹600–₹800 per person regardless of group size.',
  },
  {
    title: 'Fully customisable to your theme',
    desc: 'Colour palettes, event themes, personalised touches — we align the activity to your occasion and make it feel intentional.',
  },
  {
    title: 'At your venue or ours',
    desc: 'We come to your home, a banquet hall, a café, or any space you have booked. All we need is tables, chairs, and your guests.',
  },
];

// ── Popular activities for private events ─────────────────────────────────────

const privateActivityIds = [
  'boho-canvas', 'lippan-art', 'glass-painting',
  'mandala-art', 'tote-bag-painting', 'canvas-pouch',
];

// ── Logistics ─────────────────────────────────────────────────────────────────

const logistics = [
  { label: 'Group size',       value: '10 to 80+ participants' },
  { label: 'Location',         value: 'Your home · Venue · Café · Delhi NCR' },
  { label: 'Materials',        value: 'All art supplies provided by Kraftykinni' },
  { label: 'Your venue needs', value: 'Tables and chairs — we handle the rest' },
  { label: 'Duration',         value: '1.5 to 2.5 hours depending on activity' },
  { label: 'Booking notice',   value: 'Minimum 5 days · 50% deposit to confirm' },
  { label: 'Pricing',          value: '₹600–₹800 per person, all inclusive' },
  { label: 'Online sessions',  value: 'Kit shipped pan-India · Live facilitation' },
];

// ── FAQs ──────────────────────────────────────────────────────────────────────

const privateFaqs = [
  {
    q: 'Which art workshop is best for a birthday party in Delhi?',
    a: 'Boho Canvas Art and Glass Painting are our most popular birthday party choices. Both produce beautiful, display-ready artwork that guests keep as a memory. Lippan Art works brilliantly for groups who want something more tactile and meditative. We always recommend based on your group size, age range, and how hands-on you want the experience to be.',
  },
  {
    q: 'Can you conduct an art workshop at my home or a private venue?',
    a: 'Absolutely — we come to you. Whether it is your living room, a farmhouse, a hotel banquet hall, or a rented café space, we bring all supplies and set up before guests arrive. We only need tables, chairs, and adequate lighting.',
  },
  {
    q: 'What is the minimum group size for a private art workshop?',
    a: 'We accept bookings from groups of 10 upward for private events. Pricing stays at ₹600–₹800 per person regardless of group size. For very small groups (under 10), reach out to discuss options.',
  },
  {
    q: 'How far in advance should I book for a kitty party or bachelorette?',
    a: 'We recommend booking at least 5–7 days in advance. For weekend dates — especially Saturdays — we suggest booking 2 weeks ahead as slots fill quickly. A 50% deposit confirms your date.',
  },
  {
    q: 'Can the artwork be customised to match our event theme?',
    a: 'Yes. For bachelorettes and baby showers especially, we can work colour palettes and personalised elements into the activity. Tote Bag Painting and Canvas Pouch are particularly easy to theme. Mention your theme when you reach out and we will suggest the best fit.',
  },
  {
    q: 'Do guests need any prior art experience?',
    a: 'None at all — and that is a feature, not a footnote. Every session is designed so someone who has never held a paintbrush walks away with something genuinely beautiful. The step-by-step facilitation handles everything.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function PrivateWorkshopsPage() {
  const bookNow = useBookNow();

  const title       = 'Art Workshops for Private Events in Delhi NCR | Kraftykinni';
  const description = 'Art workshops for birthday parties, kitty parties, bachelorettes & baby showers in Delhi NCR. ₹600/person, all materials included. Led by a Fevicryl-certified artist. Book Kraftykinni.';
  const canonical   = 'https://kraftykinni.in/private-art-workshops';

  const privateActivities = workshopsData.filter((w) =>
    privateActivityIds.includes(w.id),
  );

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="art workshop birthday party Delhi, kitty party activities Delhi NCR, bachelorette party ideas Delhi, baby shower activities Gurgaon, private art workshop Delhi, art party Delhi NCR, creative party ideas Delhi"
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title"       content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url"         content={canonical} />
        <meta property="og:image"       content="https://kraftykinni.in/logo.jpeg" />
        <meta property="og:site_name"   content="Kraftykinni" />
        <meta property="og:locale"      content="en_IN" />
        <meta name="twitter:card"       content="summary" />
        <meta name="twitter:image"      content="https://kraftykinni.in/logo.jpeg" />

        {/* Service schema */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Private Art Workshops Delhi NCR',
          description,
          provider: {
            '@type': 'LocalBusiness',
            name: 'Kraftykinni',
            url: 'https://kraftykinni.in',
            telephone: '+919599622210',
            email: 'kraftykinni@gmail.com',
          },
          areaServed: [
            { '@type': 'City', name: 'Delhi' },
            { '@type': 'City', name: 'Gurgaon' },
            { '@type': 'City', name: 'Noida' },
          ],
          serviceType: 'Private Event Art Workshop',
          offers: {
            '@type': 'AggregateOffer',
            lowPrice: '600',
            highPrice: '800',
            priceCurrency: 'INR',
          },
        })}</script>

        {/* BreadcrumbList schema */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home',                    item: 'https://kraftykinni.in/' },
            { '@type': 'ListItem', position: 2, name: 'Private Art Workshops',   item: canonical },
          ],
        })}</script>

        {/* FAQPage schema */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: privateFaqs.map(({ q, a }) => ({
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
            <span className="text-brand-charcoal font-medium">Private Art Workshops</span>
          </nav>
        </div>

        {/* ── Hero ── */}
        <section className="py-16 bg-brand-offwhite relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[35%] h-[80%] rounded-full bg-brand-pink/5 blur-3xl -z-10" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[60%] rounded-full bg-orange-100/40 blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8">
                  <Sparkles size={16} className="text-brand-pink" />
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">
                    Fevicryl Certified Artist · Delhi NCR
                  </span>
                </div>

                <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-slate leading-tight mb-6">
                  Art Workshops for <br />
                  <span className="text-brand-pink italic">Private Celebrations</span>
                </h1>

                <p className="text-lg text-gray-600 font-light leading-relaxed mb-4">
                  Birthdays, kitty parties, bachelorettes, and baby showers across Delhi, Gurgaon and Noida.
                  Every guest creates something real — and takes it home.
                </p>
                <p className="text-base text-gray-500 font-light leading-relaxed mb-10">
                  Led by <strong className="font-medium text-brand-charcoal">Shramita Govil</strong>,
                  Fevicryl-certified artist with 50+ workshops and 1,500+ happy participants.
                  All materials included. Starting at ₹600 per person.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={bookNow}
                    className="inline-flex items-center justify-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    Book Your Event <ArrowRight size={18} />
                  </button>
                  <a
                    href="#event-types"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('event-types')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-charcoal border border-gray-200 px-8 py-4 rounded-full text-base font-medium transition-all"
                  >
                    See Event Types
                  </a>
                </div>
              </motion.div>

              {/* Stats grid */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { icon: <Users size={22} />,       num: '1,500+', label: 'Happy participants' },
                  { icon: <Heart size={22} />,        num: '50+',    label: 'Events conducted' },
                  { icon: <IndianRupee size={22} />,  num: '₹600',   label: 'Starting per person' },
                  { icon: <Gift size={22} />,         num: '13',     label: 'Activities to choose from' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center"
                  >
                    <div className="w-12 h-12 bg-brand-offwhite rounded-full flex items-center justify-center text-brand-pink shadow-sm mb-3">
                      {s.icon}
                    </div>
                    <p className="font-serif text-3xl font-bold text-brand-slate mb-1">{s.num}</p>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Event types ── */}
        <section id="event-types" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">
                Every Occasion, <span className="text-brand-pink italic">Beautifully Done</span>
              </h2>
              <div className="w-24 h-1 bg-brand-pink mx-auto rounded-full mb-6" />
              <p className="text-lg text-brand-slate/70 max-w-2xl mx-auto">
                We tailor every session to the occasion — from the activity chosen to the colours and theme.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {eventTypes.map((evt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-8 bg-brand-offwhite rounded-3xl border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-5">
                    {evt.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-slate mb-3">{evt.label}</h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-5">{evt.desc}</p>
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-pink shrink-0 mt-0.5">
                      Popular:
                    </span>
                    <span className="text-sm text-brand-charcoal">{evt.popular}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Kraftykinni ── */}
        <section className="py-24 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">
                Why Guests <span className="text-brand-pink italic">Love It</span>
              </h2>
              <div className="w-24 h-1 bg-brand-pink mx-auto rounded-full mb-6" />
              <p className="text-lg text-brand-slate/70 max-w-2xl mx-auto">
                Art workshops work for private events because the experience is personal, the result is tangible, and no one feels left out.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyUs.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100"
                >
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

        {/* ── Activities ── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">
                Most Loved <span className="text-brand-pink italic">Activities</span>
              </h2>
              <div className="w-24 h-1 bg-brand-pink mx-auto rounded-full mb-6" />
              <p className="text-lg text-brand-slate/70 max-w-2xl mx-auto">
                Our top picks for private events. Browse all 13 workshops on the homepage and we will help you choose the right one.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {privateActivities.map((w, i) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <Link
                    to={`/workshops/${w.id}`}
                    className="group block bg-brand-offwhite rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={w.image}
                        alt={`${w.title} workshop Delhi NCR`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-brand-slate">
                        {w.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-brand-slate mb-2">{w.title}</h3>
                      <div className="flex items-center text-sm text-brand-slate/60 mb-4">
                        <Clock size={14} className="mr-1.5" />{w.duration}
                      </div>
                      <span className="text-brand-pink font-medium text-sm group-hover:underline underline-offset-4">
                        View Details →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/#workshops"
                className="inline-flex items-center gap-2 bg-brand-offwhite hover:bg-brand-pink/10 text-brand-charcoal hover:text-brand-pink border border-gray-200 px-8 py-4 rounded-full text-sm font-medium transition-all"
              >
                Browse All 13 Activities →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Logistics ── */}
        <section className="py-24 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-brand-slate mb-4">
                Workshop <span className="text-brand-pink italic">Details</span>
              </h2>
              <p className="text-brand-slate/70 max-w-xl mx-auto">
                Everything you need to know before booking. No hidden charges, no surprises.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {logistics.map((item) => (
                <div
                  key={item.label}
                  className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{item.label}</p>
                  <p className="font-medium text-brand-charcoal text-sm leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-brand-slate mb-4">
                Common <span className="text-brand-pink italic">Questions</span>
              </h2>
              <div className="w-24 h-1 bg-brand-pink mx-auto rounded-full" />
            </div>

            <div className="space-y-4">
              {privateFaqs.map((faq, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group bg-brand-offwhite border border-gray-100 rounded-2xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-serif font-bold text-brand-slate pr-4">{faq.q}</span>
                    <span className="text-brand-pink text-xl shrink-0 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-light leading-relaxed">{faq.a}</p>
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-20 bg-brand-pink">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Plan Your <span className="italic">Art Party?</span>
            </h2>
            <p className="text-white/80 text-lg font-light mb-10 max-w-xl mx-auto">
              Tell us your date, group size, and occasion — we will suggest the right activity and confirm within 24 hours.
            </p>
            <button
              onClick={bookNow}
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-pink hover:bg-brand-offwhite px-10 py-5 rounded-full text-base font-semibold transition-all hover:shadow-xl hover:-translate-y-1"
            >
              Get in Touch <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* ── Internal location links ── */}
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
                <Link
                  key={loc.city}
                  to={loc.href}
                  className="px-6 py-3 bg-brand-offwhite hover:bg-brand-pink/10 text-brand-charcoal hover:text-brand-pink border border-gray-200 rounded-full text-sm font-medium transition-all"
                >
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
