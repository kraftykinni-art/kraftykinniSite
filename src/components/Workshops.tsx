import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, CheckCircle2 } from 'lucide-react';

// Import images from assets
import bohoArt from '../assets/Boho Art.jpeg';
import bottleArt from '../assets/Bottle art.jpg';
import lippanArt from '../assets/Lippan Art.jpeg';
import tieAndDye from '../assets/Tie And Dye.jpg';
import trinketDish from '../assets/Trinket Dish.jpeg';
import mandalaColouring from '../assets/Mandalacolouring.jpg';
import blockPrinting from '../assets/Block Printing.jpg';
import clayArtMdf from '../assets/Clay Art MDF.jpg';
import mdfFridgeMagnet from '../assets/Mdf fridge Magnet.jpg';
import glassPainting from '../assets/Glass Painting.jpg';
import textureTissueArt from '../assets/Texture Tissue Art.jpg';
import toteBag from '../assets/Tote Bag.jpg';
import canvasPouch from '../assets/Canvas Pouch.jpg';

type Category = 'All' | 'Signature' | 'Heritage' | 'Everyday';

interface Workshop {
  id: string;
  title: string;
  category: Category;
  image: string;
  duration: string;
  benefits: string[];
}

const workshopsData: Workshop[] = [
  {
    id: 'boho-canvas',
    title: 'Boho Canvas Art',
    category: 'Signature',
    image: bohoArt,
    duration: '1.5 - 2 Hours',
    benefits: [
      'Abstract earthy-tone composition builds design confidence',
      'Deeply relaxing — no drawing skills needed',
      'Gallery-ready wall décor in warm boho aesthetics',
    ],
  },
  {
    id: 'bottle-lamp',
    title: 'Bottle Lamp Art',
    category: 'Signature',
    image: bottleArt,
    duration: '1.5 - 2 Hours',
    benefits: [
      'Transforms recycled bottles into glowing fairy-light lamps',
      'Develops colour blending & freehand painting skills',
      'Magical illuminated keepsake for home décor',
    ],
  },
  {
    id: 'lippan-art',
    title: 'Lippan Art',
    category: 'Signature',
    image: lippanArt,
    duration: '2 - 2.5 Hours',
    benefits: [
      'Traditional Kutch mirror work — Indian folk heritage',
      'Therapeutic shaping and placing mirrors on patterns',
      'Stunning decorative piece with reflective accents',
    ],
  },
  {
    id: 'tie-dye',
    title: 'Tie & Dye',
    category: 'Signature',
    image: tieAndDye,
    duration: '1.5 - 2 Hours',
    benefits: [
      'High-energy, vibrant — creates buzz and excitement',
      'Every piece is unique — celebrates individuality',
      'Wearable outcome extends event memory into daily life',
    ],
  },
  {
    id: 'trinket-tray',
    title: 'Trinket Tray Painting',
    category: 'Signature',
    image: trinketDish,
    duration: '1.5 - 2 Hours',
    benefits: [
      'Transforms plain trays into vibrant, functional décor',
      'Encourages playful creativity with bold colours',
      'Practical takeaway that adds character to any desk',
    ],
  },
  {
    id: 'mandala-art',
    title: 'Mandala Art',
    category: 'Heritage',
    image: mandalaColouring,
    duration: '1.5 - 2 Hours',
    benefits: [
      'Reduces stress through repetitive, meditative patterns',
      'Boosts focus — ideal as a mental reset activity',
      'No art experience needed; beautiful takeaway',
    ],
  },
  {
    id: 'block-printing',
    title: 'Block Printing',
    category: 'Heritage',
    image: blockPrinting,
    duration: '1.5 - 2 Hours',
    benefits: [
      'Traditional Indian craft — connects with cultural heritage',
      'Rhythmic stamping is deeply relaxing and stress-relieving',
      'Functional fabric outcome for everyday use',
    ],
  },
  {
    id: 'clay-art',
    title: 'Clay Art',
    category: 'Everyday',
    image: clayArtMdf,
    duration: '1.5 - 2 Hours',
    benefits: [
      'Tactile experience relieving anxiety & improving motor skills',
      'Encourages 3D thinking and creative problem-solving',
      'Take home a functional, handmade keepsake',
    ],
  },
  {
    id: 'mdf-magnet',
    title: 'MDF Fridge Magnet',
    category: 'Everyday',
    image: mdfFridgeMagnet,
    duration: '1.5 - 2 Hours',
    benefits: [
      'Quick, gratifying — ideal for short engagement sessions',
      'Boosts self-expression on a compact canvas',
      'Portable keepsake; daily reminder of the experience',
    ],
  },
  {
    id: 'glass-painting',
    title: 'Glass Painting',
    category: 'Everyday',
    image: glassPainting,
    duration: '1.5 - 2 Hours',
    benefits: [
      'Develops patience and precision — calming & therapeutic',
      'Beautiful translucent results to display at home',
      'Unique art medium most people have never tried',
    ],
  },
  {
    id: 'texture-art',
    title: 'Texture Art',
    category: 'Everyday',
    image: textureTissueArt,
    duration: '1.5 - 2 Hours',
    benefits: [
      'Layered, tactile mixed-media engages sensory awareness',
      'Abstract results mean there\'s no "wrong" outcome',
      'Gallery-worthy wall art to take home proudly',
    ],
  },
  {
    id: 'tote-bag',
    title: 'Tote Bag Painting',
    category: 'Everyday',
    image: toteBag,
    duration: '1.5 - 2 Hours',
    benefits: [
      'Eco-friendly reusable bag replacing single-use plastic',
      'Large canvas allows bold personal expression',
      'Walking conversation starter — visible takeaway',
    ],
  },
  {
    id: 'canvas-pouch',
    title: 'Canvas Pouch Painting',
    category: 'Everyday',
    image: canvasPouch,
    duration: '1.5 - 2 Hours',
    benefits: [
      'Compact, daily-use pouch keeping creativity alive',
      'Encourages precision and design thinking',
      'Perfect for all age groups and skill levels',
    ],
  },
];

const categories: Category[] = ['All', 'Signature', 'Heritage', 'Everyday'];

export default function Workshops() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

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
                className="group cursor-pointer bg-brand-offwhite rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedWorkshop(workshop)}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                  <button className="text-brand-pink font-medium text-sm group-hover:underline underline-offset-4">
                    View Details &rarr;
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Workshop Modal */}
      <AnimatePresence>
        {selectedWorkshop && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWorkshop(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedWorkshop(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white backdrop-blur-md rounded-full text-brand-slate transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="w-full md:w-1/2 h-64 md:h-full relative">
                <img
                  src={selectedWorkshop.image}
                  alt={selectedWorkshop.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
                <div className="mb-2 text-sm font-medium text-brand-pink uppercase tracking-wider">
                  {selectedWorkshop.category}
                </div>
                <h3 className="font-serif text-3xl font-bold text-brand-slate mb-4">
                  {selectedWorkshop.title}
                </h3>
                
                <div className="flex items-center text-brand-slate/70 mb-8 bg-brand-offwhite w-fit px-4 py-2 rounded-full">
                  <Clock size={18} className="mr-2" />
                  <span>{selectedWorkshop.duration}</span>
                </div>
                
                <div className="mb-8 flex-grow">
                  <h4 className="font-bold text-brand-slate mb-4 text-lg">What you'll experience:</h4>
                  <ul className="space-y-3">
                    {selectedWorkshop.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-brand-slate/80">
                        <CheckCircle2 size={20} className="text-brand-pink mr-3 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a
                  href="#contact"
                  onClick={() => setSelectedWorkshop(null)}
                  className="block w-full text-center bg-brand-slate text-white py-4 rounded-xl font-medium hover:bg-brand-pink transition-colors duration-300"
                >
                  Request a Quote
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
