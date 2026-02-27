import { motion } from 'motion/react';
import { Users, Palette, Award, CheckCircle } from 'lucide-react';
import profileImg from '../assets/profile.jpeg';

export default function About() {
  const stats = [
    { icon: <Palette size={24} />, value: '50+', label: 'Workshops' },
    { icon: <Users size={24} />, value: '1500+', label: 'Happy Participants' },
    { icon: <CheckCircle size={24} />, value: '13', label: 'Activities' },
    { icon: <Award size={24} />, value: 'Certified', label: 'Fevicryl Artist' },
  ];

  return (
    <section id="about" className="py-24 bg-white">
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
                alt="Shramita Govil"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            {/* Decorative element */}
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-6">
              Meet the Artist Behind <span className="text-brand-pink italic">Kraftykinni</span>
            </h2>
            
            <h3 className="text-lg font-medium text-brand-charcoal mb-6 uppercase tracking-wider">
              Shramita Govil
            </h3>

            <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
              <p>
                A Fevicryl-certified art professional with a passion for making creativity accessible to everyone. Kraftykinni specialises in curating hands-on art and DIY workshops for corporates, schools, universities, and private events — primarily across Delhi NCR with online sessions available pan-India.
              </p>
              <p>
                With 50+ workshops conducted across diverse audiences, each session is designed to be stress-free, inclusive, and result in a beautiful takeaway that participants truly cherish.
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
    </section>
  );
}
