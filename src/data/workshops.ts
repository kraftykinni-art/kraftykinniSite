// Single source of truth for all workshop data.
// Used by: Workshops.tsx (grid), WorkshopDetailPage.tsx (individual pages)
// This prevents duplicate content — data lives in one place only.

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

export type Category = 'All' | 'Signature' | 'Heritage' | 'Everyday';

export interface Workshop {
  id: string;
  title: string;
  category: Exclude<Category, 'All'>;
  image: string;
  duration: string;
  benefits: string[];
}

export const workshopsData: Workshop[] = [
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
    id: 'bottle-lamp-art',
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
    id: 'tie-and-dye',
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
    id: 'mdf-fridge-magnet',
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
      "Abstract results mean there's no \"wrong\" outcome",
      'Gallery-worthy wall art to take home proudly',
    ],
  },
  {
    id: 'tote-bag-painting',
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
