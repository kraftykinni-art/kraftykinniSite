import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

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
