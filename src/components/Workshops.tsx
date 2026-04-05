import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Clock } from 'lucide-react';
import { workshopsData, type Category } from '../data/workshops';

const categories: Category[] = ['All', 'Signature', 'Heritage', 'Everyday'];

export default function Workshops() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredWorkshops = workshopsData.filter(
    (workshop) => activeCategory === 'All' || workshop.category === activeCategory
  );

  return (
    <section id="workshops" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-6">
            Our Workshops
          </h2>
          <p className="text-lg text-brand-slate/70">
            Discover our curated selection of creative experiences. From traditional heritage crafts to modern everyday art, there's something for everyone.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-brand-pink text-white shadow-md'
                  : 'bg-brand-offwhite text-brand-slate hover:bg-brand-pink/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Workshop Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorkshops.map((workshop) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={workshop.id}
              >
                {/* Each card is now a real link — good for SEO and navigation */}
                <Link
                  to={`/workshops/${workshop.id}`}
                  className="group block bg-brand-offwhite rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={workshop.image}
                      alt={`${workshop.title} workshop in Delhi NCR`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-brand-slate">
                      {workshop.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-brand-slate mb-2">
                      {workshop.title}
                    </h3>
                    <div className="flex items-center text-sm text-brand-slate/60 mb-4">
                      <Clock size={16} className="mr-2" />
                      {workshop.duration}
                    </div>
                    <span className="text-brand-pink font-medium text-sm group-hover:underline underline-offset-4">
                      View Details →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
