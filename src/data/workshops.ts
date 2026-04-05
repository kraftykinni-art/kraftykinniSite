import bohoArt from '../assets/Boho Art.webp';
import bottleArt from '../assets/Bottle art.webp';
import lippanArt from '../assets/Lippan Art.webp';
import tieAndDye from '../assets/Tie And Dye.webp';
import trinketDish from '../assets/Trinket Dish.webp';
import mandalaColouring from '../assets/Mandalacolouring.webp';
import blockPrinting from '../assets/Block Printing.webp';
import clayArtMdf from '../assets/Clay Art MDF.webp';
import mdfFridgeMagnet from '../assets/Mdf fridge Magnet.webp';
import glassPainting from '../assets/Glass Painting.webp';
import textureTissueArt from '../assets/Texture Tissue Art.webp';
import toteBag from '../assets/Tote Bag.webp';
import canvasPouch from '../assets/Canvas Pouch.webp';

export type Category = 'All' | 'Signature' | 'Heritage' | 'Everyday';

export interface Workshop {
  id: string;
  title: string;
  category: Exclude<Category, 'All'>;
  image: string;
  duration: string;
  benefits: string[];
  // SEO fields — unique per workshop page
  metaDescription: string;
  pageHeadline: string;
  intro: string;
  whatYouMake: string;
  whoBenefits: string;
  keywords: string[];
}

export const workshopsData: Workshop[] = [
  {
    id: 'lippan-art',
    title: 'Lippan Art',
    category: 'Signature',
    image: lippanArt,
    duration: '2 – 2.5 Hours',
    benefits: [
      'Traditional Kutch mirror work — connects participants to Indian folk heritage',
      'Therapeutic shaping and placing mirrors on clay patterns — deeply calming',
      'Stunning decorative wall piece with reflective accents to take home',
    ],
    metaDescription: 'Lippan Art workshop in Delhi NCR by Kraftykinni. Experience traditional Kutch mirror work in a guided group session. Corporate team building, schools & private events. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Lippan Art Workshop in Delhi NCR',
    intro: 'Lippan Art is a centuries-old folk craft from the Kutch region of Gujarat where artisans use clay and mirror work to create intricate wall decorations. In our Lippan Art workshop, participants experience this meditative craft firsthand — shaping clay patterns, embedding mirrors, and creating a piece of genuine Indian heritage they can take home. It is one of our most requested activities for corporate teams and school groups alike.',
    whatYouMake: 'A finished Lippan Art wall piece with clay patterning and embedded mirrors — a unique, display-ready piece of folk art.',
    whoBenefits: 'Perfect for corporate team-building events, school art days, college fests, and private parties. No prior art experience needed.',
    keywords: ['lippan art workshop Delhi', 'lippan art class Delhi NCR', 'kutch mirror work workshop', 'lippan art corporate activity', 'folk art workshop Delhi NCR'],
  },
  {
    id: 'mandala-art',
    title: 'Mandala Art',
    category: 'Heritage',
    image: mandalaColouring,
    duration: '1.5 – 2 Hours',
    benefits: [
      'Reduces stress through repetitive, meditative patterns',
      'Boosts focus — ideal as a mental reset activity for corporate teams',
      'No art experience needed; every participant creates a beautiful takeaway',
    ],
    metaDescription: 'Mandala Art workshop in Delhi NCR by Kraftykinni. Meditative, stress-relieving mandala painting sessions for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Mandala Art Workshop in Delhi NCR',
    intro: 'Mandala art is one of the most universally loved art forms — symmetrical, meditative, and endlessly satisfying to create. Our Mandala Art workshops guide participants through building their own mandala from the centre outward, using dotting tools, colours, and repetitive patterns that calm the mind and engage full attention. Popular as a corporate wellness activity and equally loved by school students.',
    whatYouMake: 'A colourful, symmetric mandala artwork on canvas or paper — a beautiful piece to display or gift.',
    whoBenefits: 'Ideal for corporate wellness sessions, mental health awareness events, school art days, and team-building retreats.',
    keywords: ['mandala art workshop Delhi', 'mandala painting class Delhi NCR', 'mandala art corporate workshop', 'stress relief art workshop Delhi', 'mandala workshop team building'],
  },
  {
    id: 'tie-and-dye',
    title: 'Tie & Dye',
    category: 'Signature',
    image: tieAndDye,
    duration: '1.5 – 2 Hours',
    benefits: [
      'High-energy, vibrant activity — creates excitement and positive buzz',
      'Every piece is completely unique — celebrates individuality',
      'Wearable outcome extends the event memory into daily life',
    ],
    metaDescription: 'Tie & Dye workshop in Delhi NCR by Kraftykinni. High-energy fabric dyeing sessions for corporate teams, schools & private events. Wearable takeaway. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Tie & Dye Workshop in Delhi NCR',
    intro: 'Tie & Dye is the workshop that fills a room with laughter, colour, and energy. Participants fold, twist, and bind fabric before applying vibrant dyes — and every single piece turns out uniquely different, making it a perfect metaphor for teamwork and individuality. Because the outcome is a wearable item — a t-shirt, dupatta, or tote — participants carry the memory of the event into their daily lives long after the workshop ends.',
    whatYouMake: 'A one-of-a-kind tie-dye fabric item — t-shirt, tote bag, or dupatta — to wear and keep.',
    whoBenefits: 'Best for high-energy corporate events, college fests, team outings, and large group gatherings of 50 to 200+ people.',
    keywords: ['tie dye workshop Delhi', 'tie and dye class Delhi NCR', 'tie dye corporate workshop', 'fabric dyeing workshop Delhi', 'team building tie dye activity'],
  },
  {
    id: 'boho-canvas',
    title: 'Boho Canvas Art',
    category: 'Signature',
    image: bohoArt,
    duration: '1.5 – 2 Hours',
    benefits: [
      'Abstract earthy-tone composition builds design confidence',
      'Deeply relaxing — no drawing skills needed',
      'Gallery-ready wall décor in warm boho aesthetics to take home',
    ],
    metaDescription: 'Boho Canvas Art workshop in Delhi NCR by Kraftykinni. Guided abstract canvas painting sessions for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Boho Canvas Art Workshop in Delhi NCR',
    intro: 'Boho Canvas Art combines warm earthy tones, abstract composition, and layered textures into a painting style that looks impressive but requires no drawing skills. Participants learn to blend colours, layer shapes, and create the bohemian aesthetic that has become one of the most popular contemporary art styles for home décor. Each canvas is unique to the person who painted it — and every participant walks away with a gallery-ready piece.',
    whatYouMake: 'A finished boho-style canvas painting in earthy, warm tones — ready to hang at home or gift.',
    whoBenefits: 'Popular choice for corporate team events, art days at schools and colleges, and private birthday or kitty parties.',
    keywords: ['canvas painting workshop Delhi', 'boho art workshop Delhi NCR', 'abstract painting class Delhi', 'canvas painting corporate activity', 'boho canvas workshop team building'],
  },
  {
    id: 'bottle-lamp-art',
    title: 'Bottle Lamp Art',
    category: 'Signature',
    image: bottleArt,
    duration: '1.5 – 2 Hours',
    benefits: [
      'Transforms recycled bottles into glowing fairy-light lamps',
      'Develops colour blending and freehand painting skills',
      'A magical illuminated keepsake for home décor',
    ],
    metaDescription: 'Bottle Lamp Art workshop in Delhi NCR by Kraftykinni. Creative upcycling workshop — transform glass bottles into glowing lamps. Corporate & school sessions. All materials included.',
    pageHeadline: 'Bottle Lamp Art Workshop in Delhi NCR',
    intro: 'Bottle Lamp Art is one of our most magical workshops — participants paint and decorate glass bottles, which are then fitted with fairy lights to create glowing home décor pieces. It blends sustainability (upcycling glass bottles), creativity, and a deeply satisfying result. When the lights come on at the end of the session, the room transforms. It is one of the most photographed and shared activities from any event.',
    whatYouMake: 'A hand-painted glass bottle lamp with fairy lights — a glowing, functional piece of home décor.',
    whoBenefits: 'Great for corporate gifting events, school craft days, private parties, and eco-themed corporate events.',
    keywords: ['bottle lamp art workshop Delhi', 'glass bottle art class', 'upcycling craft workshop Delhi NCR', 'creative workshop Delhi', 'bottle painting workshop'],
  },
  {
    id: 'block-printing',
    title: 'Block Printing',
    category: 'Heritage',
    image: blockPrinting,
    duration: '1.5 – 2 Hours',
    benefits: [
      'Traditional Indian craft — connects participants with cultural heritage',
      'Rhythmic stamping is deeply relaxing and stress-relieving',
      'Functional fabric outcome suitable for everyday use',
    ],
    metaDescription: 'Block Printing workshop in Delhi NCR by Kraftykinni. Learn traditional Indian block printing on fabric. Corporate & school sessions. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Block Printing Workshop in Delhi NCR',
    intro: 'Block Printing is one of India\'s most treasured textile traditions, originating in Rajasthan and Gujarat. Participants learn to apply natural pigments using carved wooden blocks to create repeat patterns on fabric — a rhythmic, meditative process that produces strikingly beautiful results. Our Block Printing workshops are popular both as a cultural heritage activity and as a stress-relief exercise for corporate teams.',
    whatYouMake: 'A block-printed fabric item — tote bag, dupatta, or fabric panel — in traditional or contemporary patterns.',
    whoBenefits: 'Excellent for corporate cultural events, school heritage days, college fests, and curated team-building sessions.',
    keywords: ['block printing workshop Delhi', 'traditional block printing class NCR', 'fabric printing workshop Delhi', 'block print corporate workshop', 'Indian craft workshop Delhi'],
  },
  {
    id: 'clay-art',
    title: 'Clay Art',
    category: 'Everyday',
    image: clayArtMdf,
    duration: '1.5 – 2 Hours',
    benefits: [
      'Tactile experience that relieves anxiety and improves fine motor skills',
      'Encourages 3D thinking and creative problem-solving',
      'Take home a functional, handmade keepsake',
    ],
    metaDescription: 'Clay Art workshop in Delhi NCR by Kraftykinni. Hands-on clay sculpting sessions for corporate teams, schools & private events. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Clay Art Workshop in Delhi NCR',
    intro: 'Working with clay is one of the most grounding, stress-relieving creative experiences available. Our Clay Art workshops guide participants through sculpting small 3D objects — decorative bowls, figures, jewellery holders, or fridge magnets — using air-dry clay. The tactile nature of the material engages the nervous system and produces a state of calm focus that participants often describe as genuinely therapeutic.',
    whatYouMake: 'A handcrafted clay sculpture or functional object — air-dried and ready to take home.',
    whoBenefits: 'Ideal for corporate wellness days, school art sessions, stress management workshops, and mindfulness events.',
    keywords: ['clay art workshop Delhi', 'clay sculpting class Delhi NCR', 'pottery workshop Delhi', 'clay art corporate workshop', 'craft workshop Delhi NCR'],
  },
  {
    id: 'glass-painting',
    title: 'Glass Painting',
    category: 'Everyday',
    image: glassPainting,
    duration: '1.5 – 2 Hours',
    benefits: [
      'Develops patience and precision — calming and therapeutic',
      'Beautiful translucent results to display at home',
      'Unique art medium most participants have never tried before',
    ],
    metaDescription: 'Glass Painting workshop in Delhi NCR by Kraftykinni. Learn glass painting techniques in a guided group session. Corporate, school & private events. All materials included.',
    pageHeadline: 'Glass Painting Workshop in Delhi NCR',
    intro: 'Glass Painting produces some of the most visually spectacular results of any workshop activity — translucent colours that glow when light passes through them. Participants paint directly onto glass surfaces using special glass paints, creating geometric or floral patterns that look stunning on display. It is a medium that most people have never tried, which makes the experience feel novel and memorable.',
    whatYouMake: 'A hand-painted glass piece — a frame, bottle, or panel — with translucent painted designs.',
    whoBenefits: 'Popular at corporate events, school art days, and private parties where participants want a unique, display-worthy outcome.',
    keywords: ['glass painting workshop Delhi', 'glass art class Delhi NCR', 'glass painting corporate workshop', 'stained glass workshop Delhi', 'creative glass workshop NCR'],
  },
  {
    id: 'texture-art',
    title: 'Texture Art',
    category: 'Everyday',
    image: textureTissueArt,
    duration: '1.5 – 2 Hours',
    benefits: [
      'Layered, tactile mixed-media work engages full sensory awareness',
      'Abstract results mean there is no wrong outcome — freeing for beginners',
      'Gallery-worthy wall art that participants take home proudly',
    ],
    metaDescription: 'Texture Art workshop in Delhi NCR by Kraftykinni. Mixed-media layered canvas art sessions for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Texture Art Workshop in Delhi NCR',
    intro: 'Texture Art uses layered materials — tissue paper, acrylic paste, fabric scraps, and paint — to build deeply tactile canvases with real physical dimension. Because the process is abstract and exploratory, there is no "wrong" way to do it, making it ideal for participants who feel intimidated by art. The results consistently surprise people — what begins as a messy layering process resolves into rich, gallery-quality wall art.',
    whatYouMake: 'A layered, textured mixed-media canvas — unique, abstract, and display-ready.',
    whoBenefits: 'Perfect for corporate creative thinking workshops, school art days, and private events where participants want something visually striking.',
    keywords: ['texture art workshop Delhi', 'mixed media workshop Delhi NCR', 'textured canvas class', 'abstract art workshop Delhi', 'creative workshop corporate Delhi'],
  },
  {
    id: 'tote-bag-painting',
    title: 'Tote Bag Painting',
    category: 'Everyday',
    image: toteBag,
    duration: '1.5 – 2 Hours',
    benefits: [
      'Eco-friendly reusable bag as a sustainable corporate gifting option',
      'Large canvas surface allows bold personal expression',
      'A walking conversation starter — visible, daily-use takeaway',
    ],
    metaDescription: 'Tote Bag Painting workshop in Delhi NCR by Kraftykinni. Eco-friendly fabric painting sessions for corporate teams, schools & events. Custom branding available. All materials included.',
    pageHeadline: 'Tote Bag Painting Workshop in Delhi NCR',
    intro: 'Tote Bag Painting is one of our most sustainable and practically useful workshops. Each participant paints their own cotton tote bag using fabric paints and stencils, creating a personalised, eco-friendly bag they will actually use. For corporates, we can incorporate brand elements or event themes — making it an excellent branded gifting workshop. The outcome is both a creative achievement and a daily reminder of the experience.',
    whatYouMake: 'A hand-painted cotton tote bag with personalised or themed designs — durable, usable, eco-friendly.',
    whoBenefits: 'Excellent for corporate gifting events, sustainability-themed workshops, school events, and private parties.',
    keywords: ['tote bag painting workshop Delhi', 'fabric painting workshop Delhi NCR', 'eco craft workshop Delhi', 'tote bag art class', 'sustainable corporate workshop Delhi'],
  },
  {
    id: 'trinket-tray',
    title: 'Trinket Tray Painting',
    category: 'Signature',
    image: trinketDish,
    duration: '1.5 – 2 Hours',
    benefits: [
      'Transforms plain trays into vibrant, functional desk décor',
      'Encourages playful creativity with bold colours and patterns',
      'Practical takeaway that adds personality to any workspace',
    ],
    metaDescription: 'Trinket Tray Painting workshop in Delhi NCR by Kraftykinni. Paint your own decorative jewellery or desk tray. Corporate & school sessions. All materials included.',
    pageHeadline: 'Trinket Tray Painting Workshop in Delhi NCR',
    intro: 'Trinket Tray Painting gives participants a plain MDF or ceramic tray and the freedom to transform it into something beautiful. Using acrylic paints, brushes, and simple decorative techniques, each tray becomes a unique piece of functional desk art. It is a quick, satisfying activity that produces immediate results — ideal for shorter event slots or as an add-on activity alongside a main workshop.',
    whatYouMake: 'A hand-painted trinket or jewellery tray — colourful, functional, and personalised.',
    whoBenefits: 'Great for corporate events, school workshops, office parties, and bridal events as a fun, functional craft.',
    keywords: ['trinket tray painting workshop Delhi', 'decorative tray painting class', 'craft workshop Delhi NCR', 'desk decor art workshop', 'jewellery tray painting Delhi'],
  },
  {
    id: 'mdf-fridge-magnet',
    title: 'MDF Fridge Magnet',
    category: 'Everyday',
    image: mdfFridgeMagnet,
    duration: '1.5 – 2 Hours',
    benefits: [
      'Quick, gratifying activity — ideal for shorter engagement sessions',
      'Boosts self-expression on a compact canvas',
      'Portable keepsake that stays visible every day on the fridge',
    ],
    metaDescription: 'MDF Fridge Magnet painting workshop in Delhi NCR by Kraftykinni. Fun, quick craft activity for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    pageHeadline: 'MDF Fridge Magnet Painting Workshop in Delhi NCR',
    intro: 'The MDF Fridge Magnet workshop is proof that great art does not need a large canvas. Participants paint and personalise small MDF shapes — animals, letters, frames, or abstract forms — which become fridge magnets they take home. The activity is quick, cheerful, and produces a result that participants see every single day when they open their fridge. It is one of our most popular activities for corporate employee engagement events.',
    whatYouMake: 'A set of hand-painted MDF fridge magnets — personalised, colourful, and daily-use.',
    whoBenefits: 'Perfect for quick corporate engagement sessions, school craft days, large events with tight schedules, and children\'s parties.',
    keywords: ['MDF fridge magnet workshop Delhi', 'magnet painting class Delhi NCR', 'quick craft workshop Delhi', 'fun corporate art activity Delhi', 'fridge magnet painting workshop'],
  },
  {
    id: 'canvas-pouch',
    title: 'Canvas Pouch Painting',
    category: 'Everyday',
    image: canvasPouch,
    duration: '1.5 – 2 Hours',
    benefits: [
      'Compact, daily-use pouch keeps creativity alive in everyday life',
      'Encourages precision, design thinking, and attention to detail',
      'Suitable for all age groups and skill levels',
    ],
    metaDescription: 'Canvas Pouch Painting workshop in Delhi NCR by Kraftykinni. Personalise your own canvas pouch with fabric paints. Corporate, school & private event sessions. All materials included.',
    pageHeadline: 'Canvas Pouch Painting Workshop in Delhi NCR',
    intro: 'Canvas Pouch Painting lets participants personalise a compact fabric pouch using fabric paints, fine brushes, and stencils. The smaller canvas encourages precision and detailed work — participants focus deeply on their design and leave with a pouch they actually use for makeup, stationery, or accessories. It is a quieter, more focused activity that works well as a complement to higher-energy workshops at the same event.',
    whatYouMake: 'A hand-painted canvas pouch — personalised with the participant\'s own design and ready for daily use.',
    whoBenefits: 'Ideal for corporate gifting events, school sessions, college workshops, and intimate private parties.',
    keywords: ['canvas pouch painting workshop Delhi', 'pouch painting class Delhi NCR', 'fabric craft workshop Delhi', 'personalised pouch workshop', 'canvas bag art class Delhi'],
  },
];
