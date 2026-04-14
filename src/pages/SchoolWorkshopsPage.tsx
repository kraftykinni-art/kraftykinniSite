import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, Users, Clock, Package } from 'lucide-react';
import { workshopsData } from '../data/workshops';
import PricingFAQ from '../components/PricingFAQ';
import ContactFooter from '../components/ContactFooter';

const schoolFaqs = [
  {
    q: 'What age groups are your school workshops suitable for?',
    a: 'Our workshops are designed for students from Grade 3 onwards through college level. Activities are adapted to the age group — simpler crafts for younger students, more detailed art forms for older groups. Lippan Art, Mandala Art, and Boho Canvas work particularly well for secondary and college students, while Clay Art, MDF Fridge Magnet, and Tote Bag Painting are popular with primary groups.',
  },
  {
    q: 'Can you come to our school for the workshop?',
    a: 'Yes — we travel to your school anywhere in Delhi NCR including Delhi, Gurgaon, and Noida. We bring all materials and set up before the session. You only need to provide tables, chairs, and the space. There is no logistics burden on the school or teacher.',
  },
  {
    q: 'How many students can participate in one session?',
    a: 'We handle groups from 20 students up to full school assemblies of 200+. For very large groups we bring additional facilitators to ensure every student gets proper guidance and completes their piece.',
  },
  {
    q: 'Do students need any prior art experience?',
    a: 'No experience needed. Every workshop is step-by-step guided from start to finish. All students, regardless of their art ability, create a finished piece to take home. Our facilitation approach is inclusive by design.',
  },
  {
    q: 'What occasions are school workshops suitable for?',
    a: 'Kraftykinni sessions are ideal for Annual Day activities, Art Week celebrations, inter-school events, student orientation days, Teacher\'s Day programmes, farewell events, and everyday creative enrichment classes. We can theme the session to match your event.',
  },
  {
    q: 'Is the workshop curriculum-aligned?',
    a: 'While our workshops are primarily experiential rather than curriculum-based, many activities connect to subjects like Indian cultural heritage (Block Printing, Lippan Art), sustainability (Tote Bag Painting, Bottle Lamp Art), and design thinking (Texture Art, Boho Canvas). We are happy to discuss alignment with your programme needs.',
  },
];

const whySchools = [
  {
    title: 'All materials included',
    desc: 'Paints, canvases, brushes, aprons, and all activity-specific supplies are brought by Kraftykinni. The school provides only tables, chairs, and the room.',
  },
  {
    title: 'No experience needed',
    desc: 'Step-by-step guided sessions mean students of all art ability levels participate equally and confidently. No student is left behind or embarrassed.',
  },
  {
    title: 'Every student takes artwork home',
    desc: 'Each participant leaves with a completed, display-worthy piece — not a rough draft. This builds confidence and creates a lasting memory of the event.',
  },
  {
    title: 'Fevicryl-certified facilitation',
    desc: "Shramita Govil holds India's most recognised art certification, giving schools the assurance of professional, high-quality facilitation.",
  },
  {
    title: 'Flexible group sizes',
    desc: 'From a single class of 30 students to a full school event with 200+ participants. We scale facilitation to match the group size.',
  },
  {
    title: 'We travel to your venue',
    desc: 'Kraftykinni comes to your school anywhere in Delhi NCR. We set up before you arrive and clean up after — no burden on school staff.',
  },
];

const gradeGroups = [
  {
    group: 'Primary (Grade 3–5)',
    activities: 'MDF Fridge Magnet, Clay Art, Tote Bag Painting, Canvas Pouch',
    desc: 'Simple, tactile activities that develop fine motor skills and creative confidence. Results are immediate and satisfying for younger students.',
  },
  {
    group: 'Middle School (Grade 6–8)',
    activities: 'Block Printing, Tie & Dye, Trinket Tray Painting, Texture Art',
    desc: 'More detailed craft activities that introduce Indian heritage techniques and fabric art. Group-friendly and visually striking outcomes.',
  },
  {
    group: 'Senior School (Grade 9–12)',
    activities: 'Lippan Art, Mandala Art, Boho Canvas Art, Glass Painting',
    desc: 'Sophisticated art forms with rich cultural context. Popular as stress-relief activities before exams or as enrichment for art students.',
  },
  {
    group: 'College & University',
    activities: 'All 13 activities available — full corporate range',
    desc: 'College groups enjoy the full Kraftykinni repertoire. Lippan Art and Boho Canvas are particularly popular for fest events and orientation days.',
  },
];

export default function SchoolWorkshopsPage() {
  const title = 'Art Workshops for Schools & Colleges in Delhi NCR | Kraftykinni';
  const description =
    'Kraftykinni conducts hands-on art and craft workshops for schools and colleges in Delhi NCR. Fun, curriculum-friendly activities for students of all ages. All materials included. Book with Fevicryl-certified artist Shramita Govil.';
  const canonical = 'https://kraftykinni.in/school-workshops';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="art workshop for schools Delhi NCR, craft workshop schools Delhi, school art activity Delhi, art day school workshop, art and craft for students Delhi NCR, school team activity Delhi" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://kraftykinni.in/logo.jpeg" />
        <meta property="og:site_name" content="Kraftykinni" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="https://kraftykinni.in/logo.jpeg" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Service',
          name: 'Art Workshops for Schools & Colleges Delhi NCR',
          description,
          provider: { '@type': 'LocalBusiness', name: 'Kraftykinni', url: 'https://kraftykinni.in', telephone: '+919599622210', email: 'kraftykinni@gmail.com' },
          areaServed: [{ '@type': 'City', name: 'Delhi' }, { '@type': 'City', name: 'Gurgaon' }, { '@type': 'City', name: 'Noida' }],
          serviceType: 'School Art Workshop',
          audience: { '@type': 'Audience', audienceType: 'Students, Schools, Colleges' },
          offers: { '@type': 'AggregateOffer', lowPrice: '600', highPrice: '800', priceCurrency: 'INR', offerCount: '3' },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kraftykinni.in/' },
            { '@type': 'ListItem', position: 2, name: 'School Workshops', item: canonical },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: schoolFaqs.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        })}</script>
      </Helmet>

      <main className="pt-24 bg-brand-offwhite">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-pink transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-charcoal font-medium">School Workshops</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-16">
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
                  For Schools & Colleges · Delhi NCR
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-slate leading-tight mb-6">
                Art Workshops for <br />
                <span className="text-brand-pink italic">Schools & Colleges</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6 font-light leading-relaxed">
                Fun, guided art sessions for students of all ages across Delhi NCR. Suitable for annual days, art weeks, inter-school events, and everyday enrichment. All materials provided, all skill levels welcome.
              </p>
              <p className="text-base text-gray-500 font-light leading-relaxed mb-10">
                Led by <strong className="font-medium text-brand-charcoal">Shramita Govil</strong>, Fevicryl-certified artist with 50+ workshops and 1,500+ happy participants. We travel to your school — no logistics on your side.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { icon: <Users size={14} />, text: '20–200+ students' },
                  { icon: <Clock size={14} />, text: '1.5–2.5 hours' },
                  { icon: <Package size={14} />, text: 'All materials included' },
                ].map((f) => (
                  <span key={f.text} className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-brand-charcoal shadow-sm">
                    <span className="text-brand-pink">{f.icon}</span>{f.text}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  Enquire for Your School <ArrowRight size={18} />
                </a>
                <Link
                  to="/corporate-art-workshops"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-charcoal border border-gray-200 px-8 py-4 rounded-full text-base font-medium transition-all"
                >
                  Corporate Workshops
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why schools choose us */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">
                Why Schools <span className="text-brand-pink italic">Choose Kraftykinni</span>
              </h2>
              <div className="w-24 h-1 bg-brand-pink mx-auto rounded-full mb-6" />
              <p className="text-lg text-brand-slate/70 max-w-2xl mx-auto">
                We have conducted school workshops across Delhi NCR for primary, secondary, and college-level students. Here is what makes the difference.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whySchools.map((item, i) => (
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
                    <h3 className="font-serif font-bold text-brand-slate mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities grid */}
        <section className="py-24 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-brand-slate mb-4">
                Popular Activities for <span className="text-brand-pink italic">Students</span>
              </h2>
              <p className="text-lg text-brand-slate/70 max-w-2xl mx-auto">
                Every activity is guided step-by-step. Students don't need prior art experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshopsData.slice(0, 6).map((workshop, i) => (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    to={`/workshops/${workshop.id}`}
                    className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={workshop.image}
                        alt={`${workshop.title} for school students Delhi NCR`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-brand-slate mb-1">{workshop.title}</h3>
                      <p className="text-sm text-brand-slate/60 mb-3">{workshop.duration}</p>
                      <span className="text-brand-pink font-medium text-sm group-hover:underline underline-offset-4">
                        View Details →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/corporate-art-workshops"
                className="inline-flex items-center gap-2 text-brand-pink font-medium hover:underline underline-offset-4 text-sm"
              >
                View all 13 workshop activities →
              </Link>
            </div>
          </div>
        </section>

        {/* By grade group */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-brand-slate mb-4">
                Activities by <span className="text-brand-pink italic">Grade Group</span>
              </h2>
              <p className="text-lg text-brand-slate/70 max-w-2xl mx-auto">
                We recommend different activities based on student age and group dynamics. Here is a quick guide.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {gradeGroups.map((g, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-8 bg-brand-offwhite rounded-2xl border border-gray-100"
                >
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold uppercase tracking-widest mb-4">
                    {g.group}
                  </div>
                  <p className="font-medium text-brand-charcoal mb-2 text-sm">{g.activities}</p>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">{g.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ section — visible content matching schema */}
        <PricingFAQ extraFaqs={schoolFaqs} />

      </main>
      <ContactFooter />
    </>
  );
}
