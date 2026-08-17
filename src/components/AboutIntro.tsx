import { motion } from 'motion/react';
import { Users, Palette, Award, CheckCircle } from 'lucide-react';
const profileImg = 'https://cdn.kraftykinni.in/assets/profile.webp';

// Shared by HomePage (as a short homepage teaser) and About.tsx (as the
// opening block of the full /about page) — kept as one component so the
// two pages never drift out of sync or duplicate the same copy.
export default function AboutIntro() {
  const stats = [
    { icon: <Palette size={24} />, value: '50+', label: 'Workshops' },
    { icon: <Users size={24} />, value: '1500+', label: 'Happy Participants' },
    { icon: <CheckCircle size={24} />, value: '13', label: 'Activities' },
    { icon: <Award size={24} />, value: 'Certified', label: 'Fevicryl Artist' },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative bg-gray-100">
              <img
                src={profileImg}
                alt="Shramita Govil — Fevicryl Certified Artist and founder of Kraftykinni, Delhi NCR"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-pink/10 rounded-full blur-2xl -z-10"></div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">
              Meet the Artist Behind <span className="text-brand-pink italic">Kraftykinni</span>
            </h2>

            <h3 className="text-lg font-medium text-brand-charcoal mb-6 uppercase tracking-wider">
              Shramita Govil — Fevicryl Certified Artist
            </h3>

            <div className="space-y-5 text-gray-600 font-light leading-relaxed text-lg">
              <p>
                Shramita Govil is a Fevicryl-certified art professional and the founder of Kraftykinni — a Delhi NCR-based creative workshop studio specialising in hands-on art and DIY sessions for corporate teams, schools, universities, and private events.
              </p>
              <p>
                With over 50 workshops conducted and more than 1,500 participants trained, Shramita has developed a facilitation style that is inclusive, energetic, and deeply results-oriented. Every session she leads is designed around one core outcome: that every participant — regardless of their art background or confidence — walks away with something they are genuinely proud of.
              </p>
              <p>
                Her Fevicryl certification is India's most recognised credential in art education and gives participants the assurance that they are learning from a trained, qualified professional who understands both technique and pedagogy.
              </p>
              <p>
                Kraftykinni operates primarily across Delhi, Gurgaon, and Noida, with online sessions available for teams across India. All 13 signature activities are available for corporate bookings, school programmes, college events, and private occasions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-8 bg-brand-offwhite rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-pink shadow-sm mb-4">
                {stat.icon}
              </div>
              <h4 className="font-serif text-3xl font-bold text-brand-slate mb-2">
                {stat.value}
              </h4>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest text-center">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
