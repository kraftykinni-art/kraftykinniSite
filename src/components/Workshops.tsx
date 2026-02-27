import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, CheckCircle2 } from 'lucide-react';

type Workshop = {
  id: string;
  title: string;
  category: 'Signature' | 'Heritage' | 'Everyday';
  image: string;
  duration: string;
  benefits: string[];
};

const workshopsData: Workshop[] = [
  {
    id: 'boho-canvas',
    title: 'Boho Canvas Art',
    category: 'Signature',
    image: '/assets/Boho canvas art.jpg',
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
    image: '/assets/Bottle lamp art.jpg',
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
    image: '/assets/Lippan art.jpg',
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
    image: '/assets/Tie & Dye.jpg',
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
    image: '/assets/Trinket tray painting.jpg',
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
    image: '/assets/Mandala art.jpg',
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
    image: '/assets/Block printing.jpg',
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
    image: '/assets/Clay art.jpg',
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
    image: '/assets/MDF Fridge magnet.jpg',
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
    image: '/assets/Glass painting.jpg',
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
    image: '/assets/Texture art.jpg',
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
    image: '/assets/Tote bag painting.jpg',
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
    image: '/assets/Canvas pouch painting.jpg',
    duration: '1.5 - 2 Hours',
    benefits: [
      'Compact, daily-use pouch keeping creativity alive',
      'Encourages precision and design thinking',
      'Perfect for all age groups and skill levels',
    ],
  },
];

export default function Workshops() {
  const [activeTab, setActiveTab] = useState<'Signature' | 'Heritage' | 'Everyday'>('Signature');
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  const filteredWorkshops = workshopsData.filter((w) => w.category === activeTab);

  const handleRequestQuote = (workshopTitle: string) => {
    setSelectedWorkshop(null);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // In a real app, you might use context or state management to pre-fill the form
      // For this static version, we'll rely on the user selecting it in the form
    }
  };

  return (
    <section id="workshops" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">
            The Workshop <span className="text-brand-pink italic">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-brand-pink mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 font-light max-w-2xl mx-auto">
            Explore our curated collection of hands-on creative experiences. Each workshop is designed to inspire, relax, and result in a beautiful masterpiece.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-brand-offwhite p-1 rounded-full border border-gray-200">
            {['Signature', 'Heritage', 'Everyday'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'Signature' | 'Heritage' | 'Everyday')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-brand-pink text-white shadow-md'
                    : 'text-gray-500 hover:text-brand-charcoal'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Workshop Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorkshops.map((workshop) => (
              <motion.div
                key={workshop.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedWorkshop(workshop)}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-medium flex items-center gap-2">
                      Explore Details <span className="text-brand-pink">→</span>
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-brand-slate mb-2">
                    {workshop.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <Clock size={16} className="text-brand-pink" />
                    {workshop.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedWorkshop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-slate/80 backdrop-blur-sm"
            onClick={() => setSelectedWorkshop(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedWorkshop(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full text-brand-charcoal transition-colors backdrop-blur-md"
              >
                <X size={24} />
              </button>

              <div className="md:w-1/2 aspect-square md:aspect-auto relative">
                <img
                  src={selectedWorkshop.image}
                  alt={selectedWorkshop.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-brand-offwhite">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold uppercase tracking-widest mb-6 w-fit">
                  {selectedWorkshop.category}
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-brand-slate mb-4">
                  {selectedWorkshop.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium mb-8 bg-white px-4 py-2 rounded-lg border border-gray-100 w-fit">
                  <Clock size={18} className="text-brand-pink" />
                  Duration: {selectedWorkshop.duration}
                </div>

                <div className="mb-10">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                    Key Benefits
                  </h4>
                  <ul className="space-y-4">
                    {selectedWorkshop.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600 font-light">
                        <CheckCircle2 size={20} className="text-brand-pink shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleRequestQuote(selectedWorkshop.title)}
                  className="w-full bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-xl text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1 mt-auto"
                >
                  Request Quote for this Workshop
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
