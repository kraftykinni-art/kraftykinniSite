import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

// Real Google Business Profile URL — same one already cited on
// testimonial blockquotes in scripts/prerender.mjs.
const GOOGLE_PROFILE_URL =
  'https://www.google.com/maps/place/KraftyKinni/@28.5032749,77.3817466,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce9fb49d4e935:0xbed5ad5b5362b002!8m2!3d28.5032702!4d77.3843215!16s%2Fg%2F11svwnn70v';

export default function Testimonials() {
  const clients = [
    'Amity University',
    'Jaypee Public School',
    'ABC Tower',
    'Model National Public School',
  ];

  const testimonials = [
    {
      quote: "The workshop was an absolute hit with our students! Shramita's energy and creativity made it a memorable experience. Everyone walked away with something beautiful they made themselves.",
      author: 'Aparajita',
      role: 'Amity University',
    },
    {
      quote: "Our students were completely engaged throughout the session. Shramita made it so easy and fun — even the shy kids opened up. We'd love to have Kraftykinni back again!",
      author: 'Shivani',
      role: 'Model National Public School',
    },
    {
      quote: "Kraftykinni brought such a creative, refreshing energy to our corporate event. The team loved every moment and the art they created was stunning. Highly recommended!",
      author: 'Gurjeet',
      role: 'ABC Tower',
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trusted By */}
        <div className="mb-24 text-center">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">
            Trusted By
          </h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="px-6 py-3 bg-white rounded-full shadow-sm border border-gray-100 text-sm font-medium text-brand-charcoal"
              >
                {client}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Google Rating Summary */}
        <motion.a
          href={GOOGLE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-16 py-6 px-8 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-xl mx-auto hover:shadow-md transition-shadow"
          aria-label="4.9 out of 5 stars on Google, based on 18 reviews — open our Google Business Profile"
        >
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={22} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-baseline gap-1.5 justify-center sm:justify-start">
              <span className="font-serif text-2xl font-bold text-brand-slate">4.9</span>
              <span className="text-sm text-gray-500">out of 5</span>
            </div>
            <span className="text-sm text-brand-pink font-medium underline decoration-brand-pink/30 group-hover:decoration-brand-pink transition-colors">
              Based on 18 Google Reviews
            </span>
          </div>
        </motion.a>

        {/* Testimonials */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">
            What Our <span className="text-brand-pink italic">Clients Say</span>
          </h2>
          <div className="w-24 h-1 bg-brand-pink mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 relative group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute top-8 right-8 text-brand-pink/20 group-hover:text-brand-pink/40 transition-colors">
                <Quote size={48} />
              </div>
              <p className="text-gray-600 font-light leading-relaxed mb-8 relative z-10 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-brand-slate">
                  {testimonial.author}
                </span>
                <span className="text-sm font-medium text-brand-pink">
                  {testimonial.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
