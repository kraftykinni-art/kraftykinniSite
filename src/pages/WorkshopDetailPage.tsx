import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Clock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { workshopsData } from '../data/workshops';
import ContactFooter from '../components/ContactFooter';

export default function WorkshopDetailPage() {
  const { id } = useParams<{ id: string }>();
  const workshop = workshopsData.find((w) => w.id === id);

  // If the URL doesn't match any workshop, show 404
  if (!workshop) return <Navigate to="/404" replace />;

  const title = `${workshop.title} in Delhi NCR | Kraftykinni`;
  const description = `Join Kraftykinni's ${workshop.title} workshop in Delhi NCR. ${workshop.benefits[0]}. Duration: ${workshop.duration}. All materials included. Led by Fevicryl-certified artist Shramita Govil.`;
  const canonical = `https://kraftykinni.in/workshops/${workshop.id}`;

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
          "name": `${workshop.title} Workshop`,
          "provider": { "@type": "LocalBusiness", "name": "Kraftykinni" },
          "description": description,
          "areaServed": "Delhi NCR",
          "serviceType": "Art Workshop",
        })}</script>
      </Helmet>

      <main className="pt-24 bg-brand-offwhite min-h-screen">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-pink transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#workshops" className="hover:text-brand-pink transition-colors">Workshops</Link>
            <span>/</span>
            <span className="text-brand-charcoal font-medium">{workshop.title}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]"
              >
                <img
                  src={workshop.image}
                  alt={`${workshop.title} workshop in Delhi NCR`}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="flex flex-col"
              >
                <span className="text-sm font-bold uppercase tracking-widest text-brand-pink mb-4">
                  {workshop.category}
                </span>

                <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-6">
                  {workshop.title} <span className="text-brand-pink italic">Workshop</span>
                </h1>

                <div className="inline-flex items-center gap-2 text-brand-charcoal bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-full text-sm w-fit mb-8">
                  <Clock size={16} className="text-brand-pink" />
                  {workshop.duration}
                </div>

                <h2 className="font-serif text-xl font-bold text-brand-slate mb-4">
                  What you'll experience
                </h2>
                <ul className="space-y-4 mb-10">
                  {workshop.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 font-light leading-relaxed">
                      <CheckCircle2 size={20} className="text-brand-pink shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    Book This Workshop
                  </a>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-charcoal border border-gray-200 px-8 py-4 rounded-full text-base font-medium transition-all"
                  >
                    <ArrowLeft size={16} />
                    All Workshops
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-brand-slate mb-10 text-center">
              Workshop <span className="text-brand-pink italic">Details</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Duration', value: workshop.duration },
                { label: 'Group Size', value: '20 – 200+' },
                { label: 'Location', value: 'Delhi NCR + Online' },
                { label: 'Materials', value: 'All included' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center p-6 bg-brand-offwhite rounded-2xl border border-gray-100 shadow-sm text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{item.label}</p>
                  <p className="font-serif text-lg font-bold text-brand-slate">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other workshops — avoids dead end, internal linking */}
        <section className="py-16 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-brand-slate mb-8 text-center">
              Explore Other <span className="text-brand-pink italic">Workshops</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {workshopsData
                .filter((w) => w.id !== workshop.id)
                .slice(0, 4)
                .map((w) => (
                  <Link
                    key={w.id}
                    to={`/workshops/${w.id}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={w.image}
                        alt={`${w.title} workshop Delhi NCR`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-serif font-bold text-brand-slate text-sm">{w.title}</p>
                    </div>
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
