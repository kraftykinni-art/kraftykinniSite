const CDN = 'https://cdn.kraftykinni.in/assets';
const bohoArt = `${CDN}/boho-art-opt.webp`;
const bottleArt = `${CDN}/bottle-art-opt.webp`;
const lippanArt = `${CDN}/lippan-art-opt.webp`;
const tieAndDye = `${CDN}/tie-and-dye-opt.webp`;
const trinketDish = `${CDN}/trinket-dish-opt.webp`;
const mandalaColouring = `${CDN}/mandala-art-opt.webp`;
const blockPrinting = `${CDN}/block-printing-opt.webp`;
const clayArtMdf = `${CDN}/clay-art-mdf-opt.webp`;
const mdfFridgeMagnet = `${CDN}/mdf-fridge-magnet-opt.webp`;
const glassPainting = `${CDN}/glass-painting-opt.webp`;
const textureTissueArt = `${CDN}/texture-tissue-art-opt.webp`;
const toteBag = `${CDN}/tote-bag-opt.webp`;
const canvasPouch = `${CDN}/canvas-pouch-opt.webp`;
const wallRopeArt = `${CDN}/wall-rope-art-opt.webp`;
const pressedFlowerArt = `${CDN}/pressed-flower-art-opt.webp`;
const rockPainting = `${CDN}/rock-painting-opt.webp`;
const umbrellaPainting = `${CDN}/umbrella-painting-opt.webp`;
const capPainting = `${CDN}/cap-painting-opt.webp`;
const pearlStringArt = `${CDN}/pearl-string-art-opt.webp`;
const clayMirrorArtImg = `${CDN}/clay-mirror-art-opt.webp`;
const mirrorPaintingImg = `${CDN}/mirror-painting-opt.webp`;

export type Category = 'All' | 'Signature' | 'Heritage' | 'Everyday';

export interface WorkshopFaqItem {
  q: string;
  a: string;
}

export interface WorkshopHowToStep {
  name: string;
  text: string;
}

// Optional real-world reference backing a claim made in the workshop's intro
// (e.g. the craft's documented history, or the certified materials used).
export interface WorkshopCitation {
  text: string;
  url: string;
}

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
  faq?: WorkshopFaqItem[];
  howToSteps?: WorkshopHowToStep[];
  citation?: WorkshopCitation;
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
    citation: { text: 'Materials for the session include Fevicryl craft clay and acrylic colours — the certified product line Shramita Govil trained on.', url: 'https://www.pidilite.com/consumer-brands/fevicryl' },
    whatYouMake: 'A finished Lippan Art wall piece with clay patterning and embedded mirrors — a unique, display-ready piece of folk art.',
    whoBenefits: 'Perfect for corporate team-building events, school art days, college fests, and private parties. No prior art experience needed.',
    keywords: ['lippan art workshop Delhi', 'lippan art class Delhi NCR', 'kutch mirror work workshop', 'lippan art corporate activity', 'folk art workshop Delhi NCR'],
    faq: [
      {
        q: 'What is Lippan Art?',
        a: 'Lippan Art is a centuries-old folk craft from the Kutch region of Gujarat. Artisans traditionally use a mixture of clay and camel dung to create raised geometric patterns on walls, then embed small mirrors into the designs. In our workshop, participants use craft clay and mirrors to recreate this technique on a board — no prior experience needed.',
      },
      {
        q: 'Is Lippan Art suitable for corporate team building?',
        a: 'Yes — it is one of our most requested corporate activities. The workshop is collaborative, cultural, and meditative, making it ideal for team bonding days, annual events, and employee engagement sessions. Groups of 20 to 200+ participants can be accommodated across Delhi, Gurgaon, and Noida.',
      },
      {
        q: 'Do I need any art experience to participate?',
        a: 'No experience is required at all. Shramita guides participants through every step — from shaping the clay patterns to placing and pressing the mirrors. The process is forgiving and satisfying even for complete beginners, which is why it works equally well for school students and senior corporate professionals.',
      },
      {
        q: 'What materials are used in the Lippan Art workshop?',
        a: 'Kraftykinni provides all materials: craft clay, small decorative mirrors, a wooden or MDF board, adhesive, and acrylic colours for background detailing. Everything is included in the per-person price — participants do not need to bring anything.',
      },
      {
        q: 'How long does a Lippan Art workshop take?',
        a: 'A Lippan Art session runs for 2 to 2.5 hours. This includes a brief introduction to the history and origins of the craft, a step-by-step guided demonstration, hands-on creation time, and a short finishing period for the final piece.',
      },
      {
        q: 'What does each participant take home?',
        a: 'Every participant completes and takes home a finished Lippan Art wall piece — a unique decorative panel with clay patterning and embedded mirrors. It is display-ready and often becomes a conversation piece at home or in an office.',
      },
    ],
    howToSteps: [
      {
        name: 'Gather your materials',
        text: 'Kraftykinni provides all materials: craft clay, small decorative mirrors, an MDF board, acrylic colours, and adhesive. No prior preparation is needed — everything is laid out at your workstation.',
      },
      {
        name: 'Sketch your pattern',
        text: 'With guidance from Shramita, lightly sketch a geometric or floral design onto the board. Traditional Lippan Art uses bold symmetrical patterns — she will show you several options to choose from.',
      },
      {
        name: 'Shape and apply the clay',
        text: 'Roll small coils and balls of craft clay and press them along the sketched outlines to build raised patterns. This meditative process produces clean, dimensional results even for complete beginners.',
      },
      {
        name: 'Embed the mirrors',
        text: 'Press small decorative mirrors into the wet clay at regular intervals. The mirrors are the defining feature of Lippan Art — they catch light and give the piece its distinctive Kutch folk character.',
      },
      {
        name: 'Paint the background',
        text: 'Once the clay is set, apply acrylic colours to the background and clay areas. Shramita guides you through colour combinations that complement the mirror inlay.',
      },
      {
        name: 'Take your artwork home',
        text: 'Your finished Lippan Art wall piece is display-ready. Allow it to fully dry (30–60 minutes after the session) before hanging or gifting.',
      },
    ],
  },
  {
    id: 'wall-rope-art',
    title: 'Wall Rope Art',
    category: 'Signature',
    image: wallRopeArt,
    duration: '2 – 2.5 Hours',
    benefits: [
      'Coiled rope technique creates stunning circular wall art with a natural, handcrafted feel',
      'Painting on rope is deeply satisfying — meditative and tactile at the same time',
      'A striking bohemian wall piece with botanicals and sunrise motifs to take home',
    ],
    metaDescription: 'Wall Rope Art workshop in Delhi NCR by Kraftykinni. Create a hand-coiled rope wall hanging painted with earthy botanicals and boho designs. Corporate, school & private events. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Wall Rope Art Workshop in Delhi NCR',
    intro: 'Wall Rope Art is one of our most visually striking workshops — participants coil natural cotton rope into circular forms and paint them with earthy botanical motifs, sunrise scenes, and boho-inspired designs that become show-stopping wall décor. The combination of tactile rope-work and freehand painting makes it uniquely satisfying: part sculpture, part canvas. Every piece is different, and every participant walks away genuinely surprised by what they have created.',
    citation: { text: 'The rope-coiling technique is related to macramé, a centuries-old knotting craft traditionally used for wall hangings, plant holders, and home décor.', url: 'https://en.wikipedia.org/wiki/Macram%C3%A9' },
    whatYouMake: 'A hand-coiled rope wall hanging painted with earthy botanical and boho motifs — unique, display-ready home décor.',
    whoBenefits: 'Ideal for corporate team-building events, school art days, private parties, and bachelorette events where a distinctive, Instagram-worthy takeaway is desired.',
    keywords: ['wall rope art workshop Delhi', 'rope art class Delhi NCR', 'rope wall hanging workshop', 'boho rope art workshop', 'rope craft workshop Delhi NCR'],
    faq: [
      {
        q: 'What is Wall Rope Art?',
        a: 'Wall Rope Art is a craft technique where natural cotton rope is coiled and glued into a circular form, then painted with earthy colours, botanical motifs, and boho-inspired designs. The finished piece is a unique wall hanging that combines the texture of natural rope with hand-painted artwork — a perfect blend of craft and painting.',
      },
      {
        q: 'Is Wall Rope Art suitable for a corporate team-building event?',
        a: 'Yes — it is an excellent corporate activity. The coiling and painting process requires focus and patience, making it a genuinely meditative experience. Because every piece turns out differently, it also sparks great conversation and a healthy spirit of creativity across the group. Kraftykinni can accommodate groups of 20 to 200+ across Delhi, Gurgaon, and Noida.',
      },
      {
        q: 'Do I need any art experience to participate?',
        a: 'No experience is required. Shramita guides participants through the coiling technique and the painting process step by step. The rope provides a natural, forgiving surface to paint on — even participants who consider themselves non-artists consistently produce beautiful results.',
      },
      {
        q: 'What materials are used in the Wall Rope Art workshop?',
        a: 'Kraftykinni provides all materials: natural cotton rope, a base board, strong adhesive, acrylic paints in a curated earthy palette, fine and flat brushes, and a jute hanging cord. Everything is included in the per-person price — participants do not need to bring anything.',
      },
      {
        q: 'How long does a Wall Rope Art workshop take?',
        a: 'A Wall Rope Art session runs for 2 to 2.5 hours. This includes a demonstration of the coiling technique, guided painting of botanical and boho motifs, a drying period, and the fitting of the jute hanging cord so the piece is ready to display immediately.',
      },
      {
        q: 'What does each participant take home?',
        a: 'Every participant completes and takes home a finished circular rope wall hanging painted with their own design. The piece is lightweight, display-ready, and makes a beautiful addition to a living room, bedroom, or workspace.',
      },
    ],
    howToSteps: [
      {
        name: 'Gather your materials',
        text: 'Kraftykinni provides everything: natural cotton rope, a base board, strong adhesive, acrylic paints, brushes, and a jute hanging cord. All materials are laid out at your workstation — no preparation needed from participants.',
      },
      {
        name: 'Coil and glue the rope',
        text: 'Starting from the centre of the board, coil the cotton rope in a tight spiral, applying adhesive as you go. Shramita demonstrates the correct tension and spacing to build a clean, even circular form. This meditative process takes 20–25 minutes.',
      },
      {
        name: 'Let the base set',
        text: 'Allow the coiled rope base to dry and bond to the board for a few minutes while Shramita introduces the painting motifs — sunrise arcs, botanical leaf sprays, circular colour blocks — and guides participants in choosing their design.',
      },
      {
        name: 'Paint the background colours',
        text: 'Using flat brushes and the earthy palette provided, apply broad colour blocks across sections of the rope — cream, terracotta, teal, ochre, and deep green. The rope texture absorbs paint beautifully and produces a rich, layered surface.',
      },
      {
        name: 'Add botanical and boho details',
        text: 'With fine brushes, paint the defining details — leaf sprays, sunrise arcs, or abstract circular motifs. Shramita walks you through each motif step by step, adjusting guidance based on your chosen design.',
      },
      {
        name: 'Attach the hanger and take home',
        text: 'Once dry, Shramita helps you attach a jute bow and hanging cord to the top. Your finished Wall Rope Art piece is immediately display-ready — hang it directly on a nail or hook.',
      },
    ],
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
    citation: { text: "The mandala's radial, symmetrical design has long been used across Hindu and Buddhist traditions as a focus for meditation.", url: 'https://en.wikipedia.org/wiki/Mandala' },
    whatYouMake: 'A colourful, symmetric mandala artwork on canvas or paper — a beautiful piece to display or gift.',
    whoBenefits: 'Ideal for corporate wellness sessions, mental health awareness events, school art days, and team-building retreats.',
    keywords: ['mandala art workshop Delhi', 'mandala painting class Delhi NCR', 'mandala art corporate workshop', 'stress relief art workshop Delhi', 'mandala workshop team building'],
    faq: [
      {
        q: 'What is Mandala Art?',
        a: 'Mandala Art is the practice of creating symmetrical, circular geometric patterns — radiating outward from a central point using repeating shapes, dots, and colours. The word mandala comes from Sanskrit, meaning "circle." In our workshop, participants build their own mandala from the centre outward using dotting tools and brushes, guided step by step by Shramita.',
      },
      {
        q: 'Is Mandala Art suitable for a corporate wellness session?',
        a: 'Yes — it is one of our most requested corporate wellness activities. The repetitive, structured pattern-making quiets mental chatter and produces a measurable state of calm focus. Many HR teams book it specifically as a stress-relief activity during high-pressure periods like quarter-end or annual appraisal season.',
      },
      {
        q: 'Do I need any art experience to participate?',
        a: 'No experience is required. Shramita provides step-by-step guidance from the very first dot. The structured, symmetrical nature of mandala art means every participant produces a beautiful finished piece regardless of their artistic background.',
      },
      {
        q: 'How long is the Mandala Art workshop?',
        a: 'Sessions run for 1.5 to 2 hours, including a brief introduction to the art form, a guided demonstration, and hands-on creation time. The pace is relaxed — participants work at their own speed and finish at their own point of satisfaction.',
      },
      {
        q: 'What do participants take home?',
        a: 'Every participant completes and takes home a colourful, symmetric mandala on canvas or paper. It is display-ready and makes a beautiful piece for a home desk or wall.',
      },
      {
        q: 'Can Mandala Art be booked for a group in Delhi NCR?',
        a: 'Yes — Kraftykinni accommodates groups of 20 to 200+ participants across Delhi, Gurgaon, and Noida. We conduct sessions at your venue and bring all materials. Online Mandala Art sessions with shipped kits are also available pan-India.',
      },
    ],
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
    citation: { text: 'Resist-dyeing traditions span centuries across multiple cultures — from Indian bandhani to Japanese shibori.', url: 'https://en.wikipedia.org/wiki/Tie-dye' },
    whatYouMake: 'A one-of-a-kind tie-dye fabric item — t-shirt, tote bag, or dupatta — to wear and keep.',
    whoBenefits: 'Best for high-energy corporate events, college fests, team outings, and large group gatherings of 50 to 200+ people.',
    keywords: ['tie dye workshop Delhi', 'tie and dye class Delhi NCR', 'tie dye corporate workshop', 'fabric dyeing workshop Delhi', 'team building tie dye activity'],
    faq: [
      {
        q: 'What is a Tie & Dye workshop?',
        a: 'Tie & Dye is a fabric art technique where cloth is folded, twisted, or tied with rubber bands before being submerged in vibrant dye. The bound areas resist the dye, creating unique patterns when revealed. No two pieces ever turn out exactly the same — which is part of what makes it such a joyful, surprising experience.',
      },
      {
        q: 'Is Tie & Dye a good activity for a large corporate event?',
        a: 'It is one of the best high-energy activities for large groups. The workshop is hands-on, collaborative, and produces immediate, visible results that fill a room with energy and excitement. Kraftykinni can handle groups of 50 to 200+ participants simultaneously across Delhi, Gurgaon, and Noida.',
      },
      {
        q: 'Do participants need any prior experience?',
        a: 'No experience is needed at all. Shramita walks everyone through the folding, tying, and dyeing steps from the beginning. The process is intentionally forgiving — even "mistakes" in folding create beautiful patterns.',
      },
      {
        q: 'What does each participant take home?',
        a: 'Each participant completes and takes home a one-of-a-kind tie-dye fabric item — typically a cotton t-shirt, tote bag, or dupatta. Because it is wearable and usable, it becomes a daily reminder of the event long after the day is over.',
      },
      {
        q: 'How long does a Tie & Dye session take?',
        a: 'The session runs for 1.5 to 2 hours from introduction to finished item. This includes guidance on folding techniques, the dyeing process, and time for the dye to set before the reveal — which is always the most exciting moment.',
      },
      {
        q: 'Are all materials provided?',
        a: 'Yes — Kraftykinni provides everything: fabric items, fabric dyes, rubber bands, gloves, and protective covering for work surfaces. Participants just need to be ready to have fun. We recommend wearing clothes that can handle a splash of colour.',
      },
    ],
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
    citation: { text: 'Materials for the session include Fevicryl acrylic colours, the certified product line Shramita Govil trained on.', url: 'https://www.pidilite.com/consumer-brands/fevicryl' },
    whatYouMake: 'A finished boho-style canvas painting in earthy, warm tones — ready to hang at home or gift.',
    whoBenefits: 'Popular choice for corporate team events, art days at schools and colleges, and private birthday or kitty parties.',
    keywords: ['canvas painting workshop Delhi', 'boho art workshop Delhi NCR', 'abstract painting class Delhi', 'canvas painting corporate activity', 'boho canvas workshop team building'],
    faq: [
      {
        q: 'What is Boho Canvas Art?',
        a: 'Boho Canvas Art is an abstract painting style using warm earthy tones — terracotta, ochre, cream, sage — layered with loose shapes, dried botanicals, and simple texture techniques. It looks sophisticated but requires no drawing skills, making it ideal for complete beginners who want a beautiful finished result.',
      },
      {
        q: 'Do I need painting experience to join?',
        a: 'No experience is needed. The boho style is intentionally free-form and forgiving — there are no strict rules about placement or precision. Shramita guides participants through colour choices and layering, and every canvas turns out uniquely beautiful.',
      },
      {
        q: 'What materials are used in the workshop?',
        a: 'Kraftykinni provides all materials: a stretched canvas, acrylic paints in a curated earthy palette, brushes of various sizes, palette knives, and optional texture elements like dried flowers or twine. Everything is included in the per-person price.',
      },
      {
        q: 'How long does a Boho Canvas Art workshop take?',
        a: 'Sessions run for 1.5 to 2 hours, covering a brief introduction to the style, a guided demonstration of layering and blending techniques, and hands-on creation time where participants paint their own canvas from start to finish.',
      },
      {
        q: 'What does each participant take home?',
        a: 'A finished boho-style canvas painting in warm, earthy tones — unique to each participant. It is ready to hang at home, gift to someone, or display in an office. Many participants are genuinely surprised by how professional their canvas looks.',
      },
      {
        q: 'Can Boho Canvas Art be booked for a corporate or private group?',
        a: 'Yes — it is a popular choice for both corporate team events and private parties such as birthdays and kitty parties. Kraftykinni accommodates groups of 20 to 200+ at your venue across Delhi, Gurgaon, and Noida.',
      },
    ],
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
    citation: { text: 'Turning a used bottle into a lamp is a small-scale example of upcycling — transforming a waste item into something of higher value rather than discarding it.', url: 'https://en.wikipedia.org/wiki/Upcycling' },
    whatYouMake: 'A hand-painted glass bottle lamp with fairy lights — a glowing, functional piece of home décor.',
    whoBenefits: 'Great for corporate gifting events, school craft days, private parties, and eco-themed corporate events.',
    keywords: ['bottle lamp art workshop Delhi', 'glass bottle art class', 'upcycling craft workshop Delhi NCR', 'creative workshop Delhi', 'bottle painting workshop'],
    faq: [
      {
        q: 'What is the Bottle Lamp Art workshop?',
        a: 'In the Bottle Lamp Art workshop, participants paint and decorate glass bottles using acrylic paints and mixed media, which are then fitted with fairy lights to create glowing home décor lamps. It combines creativity, sustainability (upcycling glass), and a dramatic reveal moment when the lights come on at the end.',
      },
      {
        q: 'Is Bottle Lamp Art good for a corporate gifting event?',
        a: 'It is one of our most popular choices for corporate gifting workshops. Every participant creates a unique, functional piece they can use at home — a lamp that reminds them of the event every time they switch it on. It also works beautifully as a branded activity for eco-themed corporate events.',
      },
      {
        q: 'Do I need any art experience?',
        a: 'No experience is required. Shramita guides participants through painting techniques suited to glass — from colour selection and brushwork to adding decorative elements. The results are consistently magical regardless of skill level.',
      },
      {
        q: 'What materials are provided?',
        a: 'Kraftykinni provides everything: the glass bottles, acrylic glass paints, brushes, decorative elements (glitter, twine, dried flowers), and fairy lights for the final lamp assembly. All materials are included in the per-person price.',
      },
      {
        q: 'How long does the session take?',
        a: 'The workshop runs for 1.5 to 2 hours, including the introduction, painting, decoration, and the final fairy-light fitting. The reveal — when participants switch their lamps on for the first time — is always the highlight of the session.',
      },
      {
        q: 'Can this workshop be booked for a school or private party?',
        a: 'Yes — Bottle Lamp Art works equally well for school craft days, birthday parties, bachelorette events, and kitty parties. It is especially popular at private events where the glowing lamps make for stunning photographs. Kraftykinni conducts sessions across Delhi, Gurgaon, and Noida.',
      },
    ],
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
    citation: { text: 'Block printing is part of the wider craft of woodblock printing, documented as one of the oldest textile and print techniques, used across Asia and Europe.', url: 'https://en.wikipedia.org/wiki/Woodblock_printing' },
    whatYouMake: 'A block-printed fabric item — tote bag, dupatta, or fabric panel — in traditional or contemporary patterns.',
    whoBenefits: 'Excellent for corporate cultural events, school heritage days, college fests, and curated team-building sessions.',
    keywords: ['block printing workshop Delhi', 'traditional block printing class NCR', 'fabric printing workshop Delhi', 'block print corporate workshop', 'Indian craft workshop Delhi'],
    faq: [
      {
        q: 'What is Block Printing?',
        a: 'Block Printing is one of India\'s oldest textile traditions, originating in Rajasthan and Gujarat. Artisans carve patterns into wooden blocks, apply natural pigments, and stamp repeat designs onto fabric. In our workshop, participants learn this rhythmic technique hands-on, creating their own patterned fabric piece using carved wooden blocks and fabric colours.',
      },
      {
        q: 'Is Block Printing good for a corporate cultural event?',
        a: 'It is an excellent choice for corporate cultural heritage activities, especially for companies celebrating India\'s craft traditions or running diversity and inclusion events. The rhythmic stamping process is meditative and stress-relieving, making it equally popular as a corporate wellness activity.',
      },
      {
        q: 'Do participants need any prior experience?',
        a: 'No experience is needed. The technique is straightforward: apply ink to the block, press firmly, lift cleanly. Shramita demonstrates the process and guides participants through spacing, pattern repetition, and colour combinations. Beginners consistently produce beautiful results.',
      },
      {
        q: 'What does each participant take home?',
        a: 'A block-printed fabric item — typically a tote bag, dupatta, or fabric panel — featuring the patterns they stamped during the session. The piece is functional, washable, and wearable.',
      },
      {
        q: 'How long is the Block Printing workshop?',
        a: 'Sessions run for 1.5 to 2 hours, covering a brief history of Indian block printing, a demonstration of the technique, and hands-on stamping time where participants create and complete their fabric piece.',
      },
      {
        q: 'Can this be booked for a group in Delhi NCR?',
        a: 'Yes — Kraftykinni conducts Block Printing workshops for groups of 20 to 200+ across Delhi, Gurgaon, and Noida. We bring all materials including carved wooden blocks, fabric colours, printing pads, and fabric items to your venue.',
      },
    ],
    howToSteps: [
      {
        name: 'Gather your materials',
        text: 'Kraftykinni provides everything: carved wooden blocks, fabric colours, printing pads, and a fabric item (tote bag, dupatta, or panel). All materials are set up at your workstation before the session begins.',
      },
      {
        name: 'Select your block and colour',
        text: 'Choose from a range of traditional carved patterns — geometric, floral, and paisley designs. Shramita will help you select a colour palette that works with the fabric and your chosen pattern.',
      },
      {
        name: 'Load the block with colour',
        text: 'Press the carved wooden block firmly and evenly onto the ink pad to load it with fabric colour. The key is an even, consistent coat — Shramita demonstrates the correct pressure and angle.',
      },
      {
        name: 'Stamp the fabric',
        text: 'Press the inked block firmly onto the fabric, hold for a moment, and lift cleanly in one motion. Repeat to build a pattern across the fabric surface. The rhythmic stamping is deeply relaxing and produces strikingly consistent results.',
      },
      {
        name: 'Build your repeat pattern',
        text: 'Continue stamping in a grid or freeform arrangement, spacing blocks consistently. You can combine multiple blocks and colours to add complexity. Shramita guides you through pattern spacing and transitions.',
      },
      {
        name: 'Heat-set and take home',
        text: 'Once the design is complete, the fabric colour is heat-set to make it washable and durable. Your finished block-printed fabric piece is ready to use, wear, or display.',
      },
    ],
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
    citation: { text: 'Hand-building and shaping clay is one of humanity\'s oldest crafts — pottery dates back thousands of years and is still valued today for the same tactile, repetitive shaping process.', url: 'https://en.wikipedia.org/wiki/Pottery' },
    whatYouMake: 'A handcrafted clay sculpture or functional object — air-dried and ready to take home.',
    whoBenefits: 'Ideal for corporate wellness days, school art sessions, stress management workshops, and mindfulness events.',
    keywords: ['clay art workshop Delhi', 'clay sculpting class Delhi NCR', 'pottery workshop Delhi', 'clay art corporate workshop', 'craft workshop Delhi NCR'],
    faq: [
      {
        q: 'What happens in a Clay Art workshop?',
        a: 'In the Clay Art workshop, participants use air-dry clay to sculpt small 3D objects — decorative bowls, figurines, jewellery holders, or fridge magnets. Shramita guides everyone through basic hand-building techniques including pinching, coiling, and surface texturing. No wheel or kiln is needed — the clay air-dries naturally at room temperature.',
      },
      {
        q: 'Is Clay Art suitable for a corporate wellness event?',
        a: 'Clay is one of the most tactilely grounding materials available — working with it engages the nervous system and reliably produces a state of calm focus. Many occupational therapists recommend clay work for stress relief, and corporate teams consistently report it as one of the most genuinely relaxing activities they\'ve experienced at a work event.',
      },
      {
        q: 'Do participants need any sculpting experience?',
        a: 'No experience at all. Shramita starts from the basics and guides everyone through each forming technique. The air-dry clay is forgiving — if something collapses or goes wrong, it can simply be reformed and tried again.',
      },
      {
        q: 'What does each participant take home?',
        a: 'A handcrafted clay sculpture or functional object — air-dried and finished during the session. Items are typically ready to handle by the end of the workshop, and fully dry and displayable within 24 hours.',
      },
      {
        q: 'How long does the Clay Art workshop last?',
        a: 'Sessions run for 1.5 to 2 hours, covering an introduction to the clay and techniques, a guided demonstration, and hands-on sculpting time. The pace is gentle and unhurried — participants work at their own speed.',
      },
      {
        q: 'Can Clay Art be booked for a large group?',
        a: 'Yes — Kraftykinni conducts Clay Art sessions for groups of 20 to 200+ across Delhi, Gurgaon, and Noida. All materials are provided and included in the per-person price. We also offer online Clay Art sessions with shipped clay kits for pan-India teams.',
      },
    ],
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
    citation: { text: 'The technique draws on reverse glass painting, a centuries-old art form practised from Europe to India, prized for its glowing, translucent colour effect.', url: 'https://en.wikipedia.org/wiki/Reverse_glass_painting' },
    whatYouMake: 'A hand-painted glass piece — a frame, bottle, or panel — with translucent painted designs.',
    whoBenefits: 'Popular at corporate events, school art days, and private parties where participants want a unique, display-worthy outcome.',
    keywords: ['glass painting workshop Delhi', 'glass art class Delhi NCR', 'glass painting corporate workshop', 'stained glass workshop Delhi', 'creative glass workshop NCR'],
    faq: [
      {
        q: 'What is Glass Painting?',
        a: 'Glass Painting is the art of applying translucent, specialised paints directly onto glass surfaces to create designs that glow beautifully when light passes through them. In our workshop, participants paint geometric, floral, or freehand patterns onto glass frames or panels using outliner pens and glass colours — the result resembles stained glass.',
      },
      {
        q: 'Is Glass Painting a good corporate event activity?',
        a: 'Yes — Glass Painting is a calm, focused activity that works well for smaller corporate teams, creative departments, or events where the mood is more relaxed and contemplative. It develops patience and precision, and the striking translucent results make a memorable keepsake.',
      },
      {
        q: 'Do I need any art experience?',
        a: 'No prior experience is needed. Shramita demonstrates how to use the outliner pen to create borders, and how to fill sections with glass paint without air bubbles. The technique is learned quickly, and the results are consistently impressive even for complete beginners.',
      },
      {
        q: 'What does each participant take home?',
        a: 'A hand-painted glass piece — a frame, decorative panel, or small bottle — with translucent painted designs. When displayed on a windowsill or with a light behind it, the colours glow vividly.',
      },
      {
        q: 'How long is the Glass Painting session?',
        a: 'The workshop runs for 1.5 to 2 hours, covering a brief introduction to the medium, a step-by-step demonstration of the outliner and colour techniques, and hands-on painting time. Glass paint dries quickly, so pieces are ready to handle and carry home before the session ends.',
      },
      {
        q: 'Can Glass Painting be booked for a group in Delhi NCR?',
        a: 'Yes — Kraftykinni conducts Glass Painting sessions for groups of 20 to 200+ across Delhi, Gurgaon, and Noida. All materials — glass items, outliner pens, glass paints, and brushes — are included in the per-person price.',
      },
    ],
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
    faq: [
      {
        q: 'What is Texture Art?',
        a: 'Texture Art is a mixed-media painting technique where layers of materials — tissue paper, acrylic paste, fabric scraps, and paint — are built up on a canvas to create physical depth and dimension. The results are abstract, tactile, and visually striking, even for people who have never painted before.',
      },
      {
        q: 'Do I need any painting experience to join?',
        a: 'No experience is needed. Because the process is abstract and exploratory, there is no wrong outcome. Shramita walks everyone through each layer from the beginning, and participants are often surprised by how impressive their finished canvas looks — regardless of their artistic background.',
      },
      {
        q: 'What materials does Kraftykinni use for the workshop?',
        a: 'All materials are provided and included in the price: canvas boards, acrylic paste, tissue paper, fabric scraps, acrylic colours, palette knives, and brushes. Participants do not need to bring anything — just comfortable clothes they do not mind getting a little paint on.',
      },
      {
        q: 'How long does the Texture Art workshop last?',
        a: 'The session runs for 1.5 to 2 hours. This covers a brief introduction to the technique, a guided step-by-step demonstration, and hands-on creation time where participants build and finish their own canvas at their own pace.',
      },
      {
        q: 'Can Texture Art be booked for a corporate group?',
        a: 'Yes — Texture Art is a popular choice for corporate creative thinking sessions, team-building workshops, and employee engagement events. Kraftykinni can accommodate groups of 20 to 200+ participants and conducts sessions at client venues across Delhi, Gurgaon, and Noida.',
      },
      {
        q: 'What do participants take home after the workshop?',
        a: 'Every participant takes home their own finished Texture Art canvas — a unique, layered, mixed-media piece that is ready to hang on a wall. Because the process is abstract, no two canvases ever look the same, making each one a genuinely personal keepsake.',
      },
    ],
    howToSteps: [
      {
        name: 'Gather your materials',
        text: 'Kraftykinni provides a canvas board, acrylic paste, tissue paper, fabric scraps, acrylic colours, palette knives, and brushes. All materials are laid out at your station — no prep needed from participants.',
      },
      {
        name: 'Apply the first texture layer',
        text: 'Using a palette knife, spread acrylic paste or gesso across the canvas in broad strokes. This creates the base texture that all subsequent layers will adhere to. There is no wrong way — uneven strokes add character.',
      },
      {
        name: 'Add tissue and fabric layers',
        text: 'Tear tissue paper into irregular pieces and press them into the wet paste to create wrinkled, raised surfaces. Shramita guides you on placement — some areas dense, others sparse — to build visual contrast.',
      },
      {
        name: 'Build depth with paint',
        text: 'Apply acrylic colours over the textured surface using a palette knife and brush. Work wet-on-wet or let layers dry between applications. The colour settles differently across raised and recessed areas, creating natural depth and variation.',
      },
      {
        name: 'Add finishing details',
        text: 'Once the main layers are built up, refine with highlight colours, edge detailing, or additional texture elements. Because this is abstract art, the finishing stage is intuitive — Shramita will help you know when it feels complete.',
      },
      {
        name: 'Take your canvas home',
        text: 'Your finished Texture Art canvas is display-ready once dry. Every piece is unique — no two participants ever produce the same result, which makes it a genuinely personal takeaway.',
      },
    ],
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
    metaDescription: 'Tote Bag Painting workshop in Delhi NCR by Kraftykinni. Custom branding for corporate events. Eco-friendly takeaway from ₹600/person. All materials included. Groups from 20 to 200+.',
    pageHeadline: 'Tote Bag Painting Workshop in Delhi NCR',
    intro: 'Tote Bag Painting is one of our most sustainable and practically useful workshops. Each participant paints their own cotton tote bag using fabric paints and stencils, creating a personalised, eco-friendly bag they will actually use. For corporates, we can incorporate brand elements or event themes — making it an excellent branded gifting workshop. The outcome is both a creative achievement and a daily reminder of the experience.',
    citation: { text: 'The tote bag itself is widely promoted as a reusable alternative to single-use plastic bags, part of why it works well as a sustainability-themed corporate takeaway.', url: 'https://en.wikipedia.org/wiki/Tote_bag' },
    whatYouMake: 'A hand-painted cotton tote bag with personalised or themed designs — durable, usable, eco-friendly.',
    whoBenefits: 'Excellent for corporate gifting events, sustainability-themed workshops, school events, and private parties.',
    keywords: ['tote bag painting workshop Delhi', 'fabric painting workshop Delhi NCR', 'eco craft workshop Delhi', 'tote bag art class', 'sustainable corporate workshop Delhi'],
    faq: [
      {
        q: 'What happens in a Tote Bag Painting workshop?',
        a: 'Each participant receives a plain cotton tote bag and paints it using fabric colours, fine brushes, and stencils. Shramita guides participants through design layout, colour mixing, and fabric painting techniques. The result is a fully personalised, durable tote bag that participants take home and use daily.',
      },
      {
        q: 'Is Tote Bag Painting a good activity for a sustainability-themed corporate event?',
        a: 'It is one of the best choices for sustainability or eco-themed events. Each participant creates a reusable cotton bag — reducing dependence on single-use plastic — while also creating a personal piece of art. For corporates, we can incorporate brand elements or event themes into the bag design.',
      },
      {
        q: 'Can we add corporate branding to the tote bags?',
        a: 'Yes — Kraftykinni can pre-print your company logo or event branding on the bags before the workshop. Participants then personalise the bag further with their own painted design. This creates a branded gifting piece that is also genuinely handmade.',
      },
      {
        q: 'Do participants need any painting experience?',
        a: 'No experience is needed. Stencils are available for participants who prefer guided designs, and Shramita provides support for those who want to paint freehand. Both approaches produce great results.',
      },
      {
        q: 'How long does the Tote Bag Painting workshop last?',
        a: 'Sessions run for 1.5 to 2 hours. Fabric paint dries within 15 to 20 minutes, so participants can handle and pack their tote bag before the workshop ends.',
      },
      {
        q: 'Can this be booked for a group across Delhi NCR?',
        a: 'Yes — Kraftykinni conducts Tote Bag Painting workshops for groups of 20 to 200+ across Delhi, Gurgaon, and Noida. All materials — tote bags, fabric paints, brushes, stencils, and palette boards — are included in the per-person price.',
      },
    ],
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
    citation: { text: 'Materials include Fevicryl acrylic paints on an MDF base, the certified product line Shramita Govil trained on.', url: 'https://www.pidilite.com/consumer-brands/fevicryl' },
    whatYouMake: 'A hand-painted trinket or jewellery tray — colourful, functional, and personalised.',
    whoBenefits: 'Great for corporate events, school workshops, office parties, and bridal events as a fun, functional craft.',
    keywords: ['trinket tray painting workshop Delhi', 'decorative tray painting class', 'craft workshop Delhi NCR', 'desk decor art workshop', 'jewellery tray painting Delhi'],
    faq: [
      {
        q: 'What is a Trinket Tray Painting workshop?',
        a: 'In the Trinket Tray Painting workshop, participants receive a plain MDF or ceramic tray and transform it into a colourful, decorative piece using acrylic paints, brushes, and simple decorative techniques. Trays can be used as jewellery holders, desk organisers, or decorative home accents.',
      },
      {
        q: 'Is Trinket Tray Painting a good activity for a corporate event?',
        a: 'Yes — it is a quick, satisfying activity that produces immediate, visible results. It works well as a standalone session for shorter event time slots, or as a secondary activity alongside a main workshop. The desk-tray outcome is also practical for corporate participants who use it daily at their workstation.',
      },
      {
        q: 'Do I need any painting experience?',
        a: 'No experience is needed. The tray\'s flat surface is easy to work with, and the activity is designed to produce beautiful results for beginners. Shramita provides design guidance including colour combinations and simple pattern ideas for those who want inspiration.',
      },
      {
        q: 'What does each participant take home?',
        a: 'A hand-painted trinket or jewellery tray — colourful, functional, and personalised. It is a useful daily-life object that participants see and use regularly, extending the memory of the event.',
      },
      {
        q: 'How long does a Trinket Tray Painting session take?',
        a: 'The workshop runs for 1.5 to 2 hours. Acrylic paint dries quickly, so trays are finished and ready to carry home before the session ends.',
      },
      {
        q: 'Can this be booked for a group in Delhi NCR?',
        a: 'Yes — Kraftykinni conducts Trinket Tray Painting sessions for groups of 20 to 200+ across Delhi, Gurgaon, and Noida. All materials — trays, acrylic paints, brushes, and palette boards — are included in the per-person price.',
      },
    ],
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
    citation: { text: 'Refrigerator magnets have been a household fixture since the 1920s, valued as both everyday tools and keepsakes.', url: 'https://en.wikipedia.org/wiki/Refrigerator_magnet' },
    whatYouMake: 'A set of hand-painted MDF fridge magnets — personalised, colourful, and daily-use.',
    whoBenefits: 'Perfect for quick corporate engagement sessions, school craft days, large events with tight schedules, and children\'s parties.',
    keywords: ['MDF fridge magnet workshop Delhi', 'magnet painting class Delhi NCR', 'quick craft workshop Delhi', 'fun corporate art activity Delhi', 'fridge magnet painting workshop'],
    faq: [
      {
        q: 'What is the MDF Fridge Magnet workshop?',
        a: 'In the MDF Fridge Magnet workshop, participants paint and personalise small MDF shapes — animals, letters, geometric forms, or abstract designs — which are fitted with a magnet backing to create functional fridge magnets. It is one of our most cheerful and immediately satisfying activities.',
      },
      {
        q: 'Why is this workshop popular for corporate employee engagement?',
        a: 'The fridge magnet is a brilliant engagement tool because participants see it every single day when they open their fridge at home. It is a daily reminder of the event, the team, and the experience — with an impressively long recall value for something that takes under two hours to create.',
      },
      {
        q: 'Is this suitable for large events with tight schedules?',
        a: 'Yes — the MDF Fridge Magnet workshop is specifically designed for events where time is limited. It can be completed in as little as 1 hour for a simpler design, making it a versatile option for half-day events, lunch sessions, or multi-activity event programmes.',
      },
      {
        q: 'Do participants need art experience?',
        a: 'No experience is required. The small MDF canvas is easy to work with, and participants can choose from stencils or paint freehand. Shramita provides colour guidance and design ideas for anyone who wants inspiration.',
      },
      {
        q: 'What does each participant take home?',
        a: 'A set of 2 to 3 hand-painted MDF fridge magnets — personalised, colourful, and ready to use immediately. The magnets are finished and dry by the end of the session.',
      },
      {
        q: 'Can the MDF Fridge Magnet workshop be booked for a group in Delhi NCR?',
        a: 'Yes — Kraftykinni conducts this workshop for groups of 20 to 200+ across Delhi, Gurgaon, and Noida. It is also available as an online workshop with shipped kits for pan-India corporate teams. All materials are included in the per-person price.',
      },
    ],
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
    citation: { text: 'Materials include Fevicryl fabric colours, the certified product line Shramita Govil trained on.', url: 'https://www.pidilite.com/consumer-brands/fevicryl' },
    whatYouMake: 'A hand-painted canvas pouch — personalised with the participant\'s own design and ready for daily use.',
    whoBenefits: 'Ideal for corporate gifting events, school sessions, college workshops, and intimate private parties.',
    keywords: ['canvas pouch painting workshop Delhi', 'pouch painting class Delhi NCR', 'fabric craft workshop Delhi', 'personalised pouch workshop', 'canvas bag art class Delhi'],
    faq: [
      {
        q: 'What is the Canvas Pouch Painting workshop?',
        a: 'In the Canvas Pouch Painting workshop, participants personalise a compact fabric pouch using fabric paints, fine brushes, and stencils. The smaller canvas encourages precision and detailed work — participants design everything from floral patterns to geometric motifs, abstract swirls, or personalised lettering. The finished pouch is durable and ready for daily use.',
      },
      {
        q: 'Is Canvas Pouch Painting good for a corporate gifting event?',
        a: 'Yes — it is a popular choice for corporate gifting workshops where participants create a personalised gift for themselves or a colleague. Because it is functional (used for makeup, stationery, or accessories) and handmade, it has a high perceived value as a gifting item.',
      },
      {
        q: 'How is this different from Tote Bag Painting?',
        a: 'Canvas Pouch Painting involves a smaller, more compact canvas that encourages detailed, precise work — it is a quieter, more focused activity. Tote Bag Painting has a larger surface that suits bolder, more expressive designs. The two workshops complement each other well and are sometimes paired at the same event.',
      },
      {
        q: 'Do participants need painting experience?',
        a: 'No experience is needed. The activity works across all skill levels — stencils are available for participants who want guided designs, and Shramita provides support for those who prefer to paint freehand or attempt more detailed work.',
      },
      {
        q: 'How long does the workshop take?',
        a: 'Sessions run for 1.5 to 2 hours. Fabric paint dries within 15 to 20 minutes, so pouches are fully finished and ready to pack before the session ends.',
      },
      {
        q: 'Can Canvas Pouch Painting be booked for a group in Delhi NCR?',
        a: 'Yes — Kraftykinni conducts this workshop for groups of 20 to 200+ across Delhi, Gurgaon, and Noida. All materials — canvas pouches, fabric paints, brushes, and stencils — are included in the per-person price. Online sessions with shipped kits are also available for pan-India teams.',
      },
    ],
  },
  {
    id: 'botanical-dyeing-printing',
    title: 'Botanical Dyeing Printing',
    category: 'Signature',
    image: pressedFlowerArt,
    duration: '1.5 – 2 Hours',
    benefits: [
      'Turns real flowers into a lasting, one-of-a-kind fabric or paper keepsake',
      'Calming, unhurried process that rewards patience over painting skill',
      'A genuinely eco-conscious craft — made entirely from real, foraged botanicals',
    ],
    metaDescription: 'Botanical Dyeing Printing workshop in Delhi NCR by Kraftykinni. Hammer and press real flowers onto fabric or paper for a one-of-a-kind keepsake. Corporate, school & private events. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Botanical Dyeing Printing Workshop in Delhi NCR',
    intro: 'Botanical Dyeing Printing — also known as flower pounding or botanical hammer printing — transfers the real colour and shape of fresh flowers directly onto fabric or paper, with no paint involved. Participants arrange petals and leaves onto their surface, then gently hammer each one to release its natural pigment, leaving a delicate, one-of-a-kind print behind. It is a slow, meditative craft that produces genuinely unique results every time, since no two flowers press exactly the same way.',
    citation: { text: 'The technique of pressing flowers to preserve their colour and shape for decorative work dates back to 16th-century Japan, where it developed into the art form known as oshibana.', url: 'https://en.wikipedia.org/wiki/Oshibana' },
    whatYouMake: 'A hand-pressed botanical print on fabric (tote bag, cushion cover, or cloth panel) or paper — made entirely from real flowers and leaves, unique and one-of-a-kind.',
    whoBenefits: 'Ideal for private events, birthday parties, kitty parties, and corporate wellness or sustainability-themed days. Also popular with schools for nature-study tie-ins.',
    keywords: ['botanical dyeing printing workshop Delhi', 'flower pounding workshop Delhi NCR', 'flower hammering craft class', 'botanical art workshop Delhi', 'nature craft workshop Delhi NCR'],
    faq: [
      {
        q: 'What is Botanical Dyeing Printing?',
        a: 'Botanical Dyeing Printing, also called flower pounding or botanical hammer printing, transfers the natural colour and shape of fresh flowers and leaves directly onto fabric or paper. Participants arrange botanicals onto their surface and gently hammer each one, releasing its pigment to leave a delicate, permanent print — no paint is used at all.',
      },
      {
        q: 'Do I need any art experience to participate?',
        a: 'No experience is needed. The technique relies on careful arranging and gentle, even hammering rather than drawing or painting skill, so it works well for complete beginners and children alike.',
      },
      {
        q: 'What materials are used?',
        a: 'Kraftykinni provides fresh flowers and leaves, a fabric or paper base (tote bags, cloth panels, or cards), a hammer, and a protective covering sheet. Everything is included in the per-person price.',
      },
      {
        q: 'How long does a Botanical Dyeing Printing workshop take?',
        a: 'A session runs for 1.5 to 2 hours, including a short demonstration, hands-on arranging and hammering time, and a finishing period to seal and pack the finished piece.',
      },
      {
        q: 'What does each participant take home?',
        a: 'A finished piece of fabric or paper botanical art — a genuinely one-of-a-kind print made from real flowers, ready to display or gift.',
      },
      {
        q: 'Can Botanical Dyeing Printing be booked for a group in Delhi NCR?',
        a: 'Yes — Kraftykinni conducts this workshop for groups of 15 to 150+ across Delhi, Gurgaon, and Noida. All materials are included in the per-person price.',
      },
    ],
  },
  {
    id: 'rock-painting',
    title: 'Rock Painting',
    category: 'Everyday',
    image: rockPainting,
    duration: '1 – 1.5 Hours',
    benefits: [
      'Quick, low-pressure activity that works for every age and skill level',
      'Turns a plain stone into a genuinely giftable, display-worthy mini artwork',
      'Easy to scale to very large groups since each canvas is small and self-contained',
    ],
    metaDescription: 'Rock Painting workshop in Delhi NCR by Kraftykinni. Paint smooth stones into colourful mini landscapes and patterns. Corporate, school & private events. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Rock Painting Workshop in Delhi NCR',
    intro: 'Rock Painting gives each participant a smooth stone and a set of acrylic paints, and asks for nothing more than a little focus. Popular designs range from miniature mountain-and-sunset landscapes to abstract dot patterns and geometric line work. Because the canvas is small, the activity moves quickly — most participants finish a first piece well within the hour and often start a second. It is one of our most relaxed, no-pressure workshop formats.',
    whatYouMake: 'One or more hand-painted decorative stones — mini landscape scenes, geometric patterns, or abstract designs, ready to display or gift.',
    whoBenefits: 'Great for large school groups, quick corporate engagement sessions, kids\' birthday parties, and any event where a fast, low-mess activity is needed.',
    keywords: ['rock painting workshop Delhi', 'stone painting class Delhi NCR', 'pebble art workshop Delhi', 'kids rock painting party', 'quick craft activity Delhi NCR'],
    faq: [
      {
        q: 'What is the Rock Painting workshop?',
        a: 'Participants paint smooth stones using acrylic colours and fine brushes, creating mini landscapes, geometric patterns, or abstract designs. It is a quick, low-mess activity that produces a finished, giftable piece in well under an hour.',
      },
      {
        q: 'Is Rock Painting suitable for large groups?',
        a: 'Yes — because each canvas is small and self-contained, Rock Painting scales easily to very large groups. It is a popular choice for school events and corporate sessions with tight time slots.',
      },
      {
        q: 'Do participants need any art experience?',
        a: 'No experience is needed. Stencils and simple guided patterns are available for anyone who wants a starting point, while confident painters can go freehand.',
      },
      {
        q: 'What materials are used?',
        a: 'Kraftykinni provides smooth painting stones, acrylic paints, fine brushes, and a protective sealant finish. Everything is included in the per-person price.',
      },
      {
        q: 'How long does the workshop take?',
        a: 'A session runs for 1 to 1.5 hours. Acrylic paint dries quickly, so most participants complete and finish more than one stone within the session.',
      },
      {
        q: 'Can Rock Painting be booked for a group in Delhi NCR?',
        a: 'Yes — Kraftykinni conducts this workshop for groups of 20 to 300+ across Delhi, Gurgaon, and Noida. All materials are included in the per-person price.',
      },
    ],
  },
  {
    id: 'umbrella-painting',
    title: 'Umbrella Painting',
    category: 'Signature',
    image: umbrellaPainting,
    duration: '2 – 2.5 Hours',
    benefits: [
      'A genuinely functional canvas — the finished umbrella gets used, not shelved',
      'Large surface area encourages bold, expressive designs',
      'A standout monsoon-season activity that photographs beautifully',
    ],
    metaDescription: 'Umbrella Painting workshop in Delhi NCR by Kraftykinni. Hand-paint a plain umbrella with florals or bold designs. Corporate, school & private events. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Umbrella Painting Workshop in Delhi NCR',
    intro: 'Umbrella Painting hands participants a plain umbrella canopy and fabric paints, and lets them cover it edge to edge with florals, patterns, or bold freehand designs. The curved, panelled surface is larger and more forgiving than a canvas, so even a simple design reads as intentional once it wraps around the umbrella. Best of all, it is genuinely functional — participants use the umbrella through the monsoon season, not just display it.',
    citation: { text: 'Materials include Fevicryl fabric colours, the certified product line Shramita Govil trained on.', url: 'https://www.pidilite.com/consumer-brands/fevicryl' },
    whatYouMake: 'A hand-painted fabric umbrella with a personalised floral or pattern design — genuinely usable and display-worthy.',
    whoBenefits: 'A standout monsoon-season activity for private parties, corporate wellness days, and college fests. Also works well as a branded corporate gifting piece.',
    keywords: ['umbrella painting workshop Delhi', 'monsoon craft workshop Delhi NCR', 'hand painted umbrella class', 'fabric painting workshop Delhi', 'corporate monsoon activity Delhi NCR'],
    faq: [
      {
        q: 'What is the Umbrella Painting workshop?',
        a: 'Participants paint a plain fabric umbrella using fabric paints and fine brushes, covering the canopy with florals, patterns, or freehand designs. The finished umbrella is genuinely usable, not just decorative.',
      },
      {
        q: 'Is Umbrella Painting a good monsoon-season activity?',
        a: 'Yes — it is one of our most popular seasonal workshops. The activity is festive, photogenic, and produces something participants actually use once the rains begin.',
      },
      {
        q: 'Do participants need any art experience?',
        a: 'No experience is needed. The larger, panelled umbrella surface is forgiving, and Shramita provides stencils and design guidance for anyone who wants a starting point.',
      },
      {
        q: 'What materials are used?',
        a: 'Kraftykinni provides plain fabric umbrellas, Fevicryl fabric colours, and fine brushes. Everything is included in the per-person price.',
      },
      {
        q: 'How long does the workshop take?',
        a: 'A session runs for 2 to 2.5 hours, given the larger surface area. Fabric paint dries within 20 to 30 minutes so umbrellas are ready to pack before the session ends.',
      },
      {
        q: 'Can Umbrella Painting be booked for a group in Delhi NCR?',
        a: 'Yes — Kraftykinni conducts this workshop for groups of 15 to 150+ across Delhi, Gurgaon, and Noida. All materials are included in the per-person price.',
      },
    ],
  },
  {
    id: 'cap-painting',
    title: 'Cap Painting',
    category: 'Everyday',
    image: capPainting,
    duration: '1.5 – 2 Hours',
    benefits: [
      'A wearable, everyday keepsake — not just a shelf decoration',
      'Compact canvas keeps the activity quick without feeling rushed',
      'Popular as a personalised corporate or college gifting item',
    ],
    metaDescription: 'Cap Painting workshop in Delhi NCR by Kraftykinni. Hand-paint a plain cap with florals or your own design. Corporate, school & private events. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Cap Painting Workshop in Delhi NCR',
    intro: 'Cap Painting gives each participant a plain cotton cap and fabric paints to build a personalised design across the panel and brim — florals, lettering, abstract colour blocks, or a favourite motif. The compact surface keeps the session quick and focused, and the finished cap is something participants actually wear afterward rather than put away. It works especially well as a personalised takeaway for college fests and corporate gifting days.',
    citation: { text: 'Materials include Fevicryl fabric colours, the certified product line Shramita Govil trained on.', url: 'https://www.pidilite.com/consumer-brands/fevicryl' },
    whatYouMake: 'A hand-painted cotton cap with a personalised design — wearable, durable, and ready to use immediately.',
    whoBenefits: 'Popular for college fests, corporate gifting days, birthday parties, and school craft sessions.',
    keywords: ['cap painting workshop Delhi', 'hat painting class Delhi NCR', 'fabric cap art workshop', 'personalised cap painting Delhi', 'college fest craft activity Delhi NCR'],
    faq: [
      {
        q: 'What is the Cap Painting workshop?',
        a: 'Participants paint a plain cotton cap using fabric paints and fine brushes, building a personalised design across the panel and brim — florals, lettering, or abstract patterns. The finished cap is wearable immediately.',
      },
      {
        q: 'Is Cap Painting good for corporate or college gifting?',
        a: 'Yes — it is a popular choice for branded gifting events. Company logos or event themes can be pre-printed on the cap before the session, with participants personalising further with their own painted designs.',
      },
      {
        q: 'Do participants need any art experience?',
        a: 'No experience is needed. The compact canvas is easy to work with, and stencils are available for anyone who wants a guided design.',
      },
      {
        q: 'What materials are used?',
        a: 'Kraftykinni provides plain cotton caps, Fevicryl fabric colours, and fine brushes. Everything is included in the per-person price.',
      },
      {
        q: 'How long does the workshop take?',
        a: 'A session runs for 1.5 to 2 hours. Fabric paint dries within 15 to 20 minutes, so caps are fully finished and ready to wear before the session ends.',
      },
      {
        q: 'Can Cap Painting be booked for a group in Delhi NCR?',
        a: 'Yes — Kraftykinni conducts this workshop for groups of 20 to 200+ across Delhi, Gurgaon, and Noida. All materials are included in the per-person price.',
      },
    ],
  },
  {
    id: 'canvas-pearl-art',
    title: 'Canvas Pearl Art',
    category: 'Signature',
    image: pearlStringArt,
    duration: '2 – 2.5 Hours',
    benefits: [
      'An elegant, premium-feel keepsake unlike any other workshop on our list',
      'Rewards patience and precision — deeply satisfying to build up piece by piece',
      'A genuinely display-ready wall piece, not just a craft-table project',
    ],
    metaDescription: 'Canvas Pearl Art workshop in Delhi NCR by Kraftykinni. Build radiating pearl patterns on a black canvas for an elegant wall piece. Corporate, school & private events. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Canvas Pearl Art Workshop in Delhi NCR',
    intro: 'Canvas Pearl Art adapts the traditional string-and-nail technique — normally built with thread wound around pins — using pearls glued directly onto a black canvas instead. Participants build radiating, spiral, or symmetrical patterns one pearl at a time, working outward from a central point. The black background makes every pearl stand out, and the finished piece has a genuinely elegant, gallery-ready look that is unlike anything else in our workshop catalogue.',
    citation: { text: 'The technique draws on string art, where thread wound around a grid of points builds geometric patterns — this workshop swaps thread for pearls glued directly onto the canvas.', url: 'https://en.wikipedia.org/wiki/String_art' },
    whatYouMake: 'A hand-built canvas pearl art piece — an elegant, display-ready wall piece with a radiating or spiral pearl pattern on a black background.',
    whoBenefits: 'A premium option for private events, corporate gifting, bridal showers, and anyone wanting a genuinely elegant keepsake activity.',
    keywords: ['canvas pearl art workshop Delhi', 'pearl art class Delhi NCR', 'string art workshop Delhi', 'elegant craft workshop Delhi NCR', 'pearl canvas art class'],
    faq: [
      {
        q: 'What is Canvas Pearl Art?',
        a: 'Canvas Pearl Art adapts the traditional string-and-nail technique using pearls glued directly onto a black canvas instead of thread wound around pins. Participants build radiating or spiral patterns one pearl at a time, working outward from a central point.',
      },
      {
        q: 'Do I need any art experience to participate?',
        a: 'No experience is needed, though the activity rewards patience — placing each pearl carefully is more important than any drawing or painting skill. Shramita guides participants through the pattern layout before pearl placement begins.',
      },
      {
        q: 'What materials are used?',
        a: 'Kraftykinni provides a black canvas, decorative pearls in varying sizes, adhesive, and a marked guide for the radiating pattern. Everything is included in the per-person price.',
      },
      {
        q: 'How long does the workshop take?',
        a: 'A session runs for 2 to 2.5 hours, since building up a full pearl pattern takes more time than a painted piece. The adhesive sets quickly so the canvas is ready to handle and pack by the end of the session.',
      },
      {
        q: 'What does each participant take home?',
        a: 'A finished canvas pearl art piece — an elegant, display-ready wall piece unlike anything else in our workshop catalogue.',
      },
      {
        q: 'Can Canvas Pearl Art be booked for a group in Delhi NCR?',
        a: 'Yes — Kraftykinni conducts this workshop for groups of 15 to 100+ across Delhi, Gurgaon, and Noida. All materials are included in the per-person price.',
      },
    ],
  },
  {
    id: 'clay-mirror-art',
    title: 'Clay Mirror Art',
    category: 'Signature',
    image: clayMirrorArtImg,
    duration: '2 – 2.5 Hours',
    benefits: [
      'A genuinely functional keepsake — a mirror participants actually use, not just display',
      'Hands-on clay sculpting builds patience and fine motor focus',
      'Every finished frame is unique, since no two flower arrangements are identical',
    ],
    metaDescription: 'Clay Mirror Art workshop in Delhi NCR by Kraftykinni. Sculpt a floral clay frame around a mirror for a genuinely usable keepsake. Corporate, school & private events. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Clay Mirror Art Workshop in Delhi NCR',
    intro: 'Clay Mirror Art gives each participant a small mirror and a set of air-dry clay to build an entirely hand-sculpted floral frame around it. Participants shape individual petals, leaves, and blooms, then arrange and press them around the mirror\'s edge one piece at a time. Unlike a purely decorative craft, the finished mirror is genuinely functional — something participants actually use at home, not just set on a shelf.',
    citation: { text: 'Hand-building and shaping clay is one of humanity\'s oldest crafts — pottery dates back thousands of years and is still valued today for the same tactile, repetitive shaping process.', url: 'https://en.wikipedia.org/wiki/Pottery' },
    whatYouMake: 'A hand-sculpted clay flower mirror frame — a genuinely usable mirror with a fully personalised floral border.',
    whoBenefits: 'Ideal for private events, corporate gifting, school craft days, and anyone wanting a functional keepsake rather than a purely decorative one.',
    keywords: ['clay mirror art workshop Delhi', 'clay flower mirror class Delhi NCR', 'mirror decoration workshop Delhi', 'clay craft workshop Delhi NCR', 'handmade mirror frame class'],
    faq: [
      {
        q: 'What is the Clay Mirror Art workshop?',
        a: 'Participants shape air-dry clay into individual petals, leaves, and blooms, then arrange and press them around the edge of a small mirror to build a fully hand-sculpted floral frame. The finished mirror is genuinely usable, not just decorative.',
      },
      {
        q: 'Do I need any art experience to participate?',
        a: 'No experience is needed. Shaping simple clay petals and leaves is easy to pick up, and Shramita guides the arrangement so every frame looks intentional regardless of skill level.',
      },
      {
        q: 'What materials are used?',
        a: 'Kraftykinni provides a small mirror, air-dry craft clay in multiple colours, and basic shaping tools. Everything is included in the per-person price.',
      },
      {
        q: 'How long does the workshop take?',
        a: 'A session runs for 2 to 2.5 hours, covering shaping, arranging, and a short setting period before the mirror is ready to handle and pack.',
      },
      {
        q: 'What does each participant take home?',
        a: 'A finished clay mirror art piece — a genuinely usable mirror with a unique, hand-sculpted floral frame.',
      },
      {
        q: 'Can Clay Mirror Art be booked for a group in Delhi NCR?',
        a: 'Yes — Kraftykinni conducts this workshop for groups of 15 to 150+ across Delhi, Gurgaon, and Noida. All materials are included in the per-person price.',
      },
    ],
  },
  {
    id: 'mirror-painting',
    title: 'Mirror Painting',
    category: 'Everyday',
    image: mirrorPaintingImg,
    duration: '1.5 – 2 Hours',
    benefits: [
      'Transforms a plain mirror into a genuinely functional piece of wall art',
      'Reflective surface makes every finished piece look more dramatic than the effort involved',
      'Works well for both bold illustrative scenes and delicate detail work',
    ],
    metaDescription: 'Mirror Painting workshop in Delhi NCR by Kraftykinni. Hand-paint an illustrated scene directly onto a mirror for wall-ready décor. Corporate, school & private events. All materials included. ₹600–₹800/person.',
    pageHeadline: 'Mirror Painting Workshop in Delhi NCR',
    intro: 'Mirror Painting has participants paint an illustrated scene — botanical motifs, woodland characters, or bold pattern work — directly onto the surface of a mirror using fine brushes and glass-safe paints. The reflective background behind the painted design gives even a simple illustration real visual depth, and the finished piece works equally well as a wall-mounted mirror or a piece of standalone décor.',
    citation: { text: 'The technique draws on reverse glass painting, a centuries-old art form practised from Europe to India, prized for its glowing, translucent colour effect.', url: 'https://en.wikipedia.org/wiki/Reverse_glass_painting' },
    whatYouMake: 'A hand-painted illustrated mirror — a wall-ready piece that is genuinely functional as well as decorative.',
    whoBenefits: 'Great for private events, school art days, corporate gifting, and anyone wanting a decorative piece that doubles as a usable mirror.',
    keywords: ['mirror painting workshop Delhi', 'painted mirror class Delhi NCR', 'glass and mirror art workshop', 'decorative mirror painting Delhi', 'wall mirror art class'],
    faq: [
      {
        q: 'What is the Mirror Painting workshop?',
        a: 'Participants paint an illustrated scene — botanical motifs, woodland characters, or bold pattern work — directly onto the surface of a mirror using glass-safe paints and fine brushes. The reflective background gives the finished piece real visual depth.',
      },
      {
        q: 'Do I need any art experience to participate?',
        a: 'No experience is needed. Stencils and traced outlines are available for anyone who wants a guided design, and Shramita provides colour and detail guidance throughout.',
      },
      {
        q: 'What materials are used?',
        a: 'Kraftykinni provides a plain mirror, glass-safe acrylic paints, and fine brushes. Everything is included in the per-person price.',
      },
      {
        q: 'How long does the workshop take?',
        a: 'A session runs for 1.5 to 2 hours. Paint dries within 20 to 30 minutes, so mirrors are ready to handle and pack before the session ends.',
      },
      {
        q: 'What does each participant take home?',
        a: 'A finished hand-painted mirror — wall-ready, genuinely functional, and unique to the participant\'s own design.',
      },
      {
        q: 'Can Mirror Painting be booked for a group in Delhi NCR?',
        a: 'Yes — Kraftykinni conducts this workshop for groups of 20 to 200+ across Delhi, Gurgaon, and Noida. All materials are included in the per-person price.',
      },
    ],
  },
];
