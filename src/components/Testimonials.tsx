import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const CDN = 'https://cdn.kraftykinni.in';

export default function Testimonials() {
  const clients = [
    { name: 'Amity University', logo: `${CDN}/amity-university-logo-kraftykinni.webp` },
    { name: 'Max Estate', logo: `${CDN}/max-estate-logo-kraftykinni.webp` },
    { name: 'Cambridge School', logo: `${CDN}/cambridge-school-logo-kraftykinni.webp` },
    { name: 'Jaypee Public School', logo: `${CDN}/jaypee-public-school-logo-kraftykinni.webp` },
    { name: 'Cars24', logo: `${CDN}/cars24-logo-kraftykinni.webp` },
    { name: 'DoubleTree by Hilton', logo: `${CDN}/doubletree-hilton-logo-kraftykinni.webp` },
    { name: 'Bhutani Alphathum', logo: `${CDN}/bhutani-alphathum-logo-kraftykinni.webp` },
    { name: 'Tiny Town', logo: `${CDN}/tiny-town-logo-kraftykinni.webp` },
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
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-10">
            Trusted By
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 max-w-3xl mx-auto justify-items-center">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex items-center justify-center w-full h-28 sm:h-32 bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 hover:shadow-md transition-shadow"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} — Kraftykinni client`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
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
