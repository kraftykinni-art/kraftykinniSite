import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

import bohoArt from '../assets/Boho Art.webp';
import bottleArt from '../assets/Bottle art.webp';
import lippanArt from '../assets/Lippan Art.webp';
import tieAndDye from '../assets/Tie And Dye.webp';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-brand-offwhite">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-pink/5 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-100/50 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-start"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8"
            >
              <Sparkles size={16} className="text-brand-pink" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">
                Fevicryl Certified Artist
              </span>
            </motion.div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-brand-slate leading-tight mb-6">
              Art & DIY Workshops <br />
              <span className="text-brand-pink italic">in Delhi NCR</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-light">
              Hands-on creative sessions for corporate teams, schools, colleges & private events.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#workshops"
                className="inline-flex items-center justify-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1"
              >
                Explore Workshops
                <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-charcoal border border-gray-200 px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-md"
              >
                Request a Quote
              </a>
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative h-[500px] lg:h-[600px] w-full"
          >
            <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4">
              <div className="flex flex-col gap-4">
                <div className="h-2/3 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
                  <img
                    src={bohoArt}
                    alt="Boho Canvas Art workshop in Delhi NCR"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="h-1/3 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
                  <img
                    src={bottleArt}
                    alt="Bottle Lamp Art workshop in Delhi NCR"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-12">
                <div className="h-1/3 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
                  <img
                    src={lippanArt}
                    alt="Lippan Art workshop in Delhi NCR"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="h-2/3 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
                  <img
                    src={tieAndDye}
                    alt="Tie and Dye workshop in Delhi NCR"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
