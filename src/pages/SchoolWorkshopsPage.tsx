import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { workshopsData } from '../data/workshops';
import ContactFooter from '../components/ContactFooter';

export default function SchoolWorkshopsPage() {
  const title = 'Art Workshops for Schools & Colleges in Delhi NCR | Kraftykinni';
  const description = 'Kraftykinni conducts hands-on art and craft workshops for schools and colleges in Delhi NCR. Fun, curriculum-friendly activities for students of all ages. All materials included. Book with Fevicryl-certified artist Shramita Govil.';
  const canonical = 'https://kraftykinni.in/school-workshops';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
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
                  For Schools & Colleges
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-slate leading-tight mb-6">
                Art Workshops for <br />
                <span className="text-brand-pink italic">Schools & Colleges</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 font-light leading-relaxed">
                Fun, guided art sessions for students of all ages across Delhi NCR. Suitable for annual days, art weeks, inter-school events, and everyday enrichment. All materials provided.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  Enquire Now <ArrowRight size={18} />
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

        {/* Activities grid */}
        <section className="py-24 bg-white">
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
                    className="group block bg-brand-offwhite rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={workshop.image}
                        alt={`${workshop.title} for school students Delhi NCR`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
          </div>
        </section>

      </main>
      <ContactFooter />
    </>
  );
}
