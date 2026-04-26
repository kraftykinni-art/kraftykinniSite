/**
 * prerender.mjs  (v3 — cloaking fix + trailing-slash enforcement)
 *
 * Changes from v2:
 *  - REMOVED the hidden #crawler-content div (position:absolute; left:-9999px).
 *    That pattern is a cloaking risk — Google executes JS and sees both the hidden
 *    text AND the React-rendered content, which violates Google's cloaking policy.
 *  - Kept the <noscript> block — fully legitimate for non-JS crawlers (Bing, etc.)
 *  - Added a small inline <script> to each pre-rendered page that strips a trailing
 *    slash from the URL via history.replaceState (no reload). This prevents
 *    /page/ and /page being treated as separate URLs in GSC.
 *  - Updated corporate page title + description for better CTR
 *    ("corporate art workshop" was at position 2.42 with 0 clicks — title fix)
 *  - Regenerates public/sitemap.xml with today's date as lastmod.
 *
 * Run automatically via `npm run build` → postbuild hook.
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir   = path.resolve(__dirname, '..', 'dist');
const publicDir = path.resolve(__dirname, '..', 'public');
const template  = path.join(distDir, 'index.html');

if (!fs.existsSync(template)) {
  console.error('❌  dist/index.html not found — run `npm run build` first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(template, 'utf-8');

// ─── Trailing-slash fix script (injected into every pre-rendered page) ────────
// Runs synchronously before React boots so the URL is clean before any
// analytics, history listeners or React Router reads window.location.
const SLASH_FIX_SCRIPT = `<script>(function(){var p=location.pathname;if(p.length>1&&p.slice(-1)==='/'){history.replaceState(null,null,p.slice(0,-1)+location.search+location.hash)}})()</script>`;

// ─── Route metadata + visible noscript body content ──────────────────────────

const routes = [
  // ── Corporate workshops ──────────────────────────────────────────────────
  {
    path: '/corporate-art-workshops',
    // Updated title: was getting 12 impressions, 0 clicks at position 2.4
    // Added pricing + social proof to compete with local-pack displacing clicks
    title: 'Corporate Art Workshops Delhi NCR — ₹600/person · 50+ Events | Kraftykinni',
    description: 'Guided art workshops for teams of 20–200+. Lippan, Tie & Dye, Mandala + 10 more. Zero prep for your team — we bring everything. Delhi · Gurgaon · Noida. Book now.',
    ogImage: 'https://kraftykinni.in/og-corporate.jpg',
    h1: 'Corporate Art Workshops in Delhi NCR',
    bodyContent: `
      <h1>Corporate Art Workshops in Delhi NCR — Your Team Will Remember</h1>
      <p>Kraftykinni offers hands-on, guided corporate art workshops for teams of 20 to 200+ across Delhi, Gurgaon, and Noida. Every participant creates something real and takes it home. Led by Shramita Govil, Fevicryl-certified artist with 50+ workshops and 1,500+ happy participants.</p>
      <h2>Why Teams Choose Kraftykinni</h2>
      <p>No experience needed — step-by-step guidance from a Fevicryl-certified facilitator means every participant walks away proud of what they made. We bring every art supply, set up before the session, and clean up after. You only need to provide tables, chairs, and your team. Every participant takes artwork home — a physical takeaway that lasts long after the event. Flexible group sizes from intimate offsites of 20 to large annual days of 200+. Fully customisable to your theme, colour palette, or corporate branding. Online sessions available pan-India with materials shipped to participants.</p>
      <h2>Workshop Pricing</h2>
      <ul>
        <li>Intimate (20–50 participants): ₹800 per person — all materials included</li>
        <li>Standard (50–100 participants): ₹700 per person — all materials included</li>
        <li>Large (100+ participants): ₹600 per person — all materials included</li>
      </ul>
      <h2>13 Signature Workshop Activities</h2>
      <p>Lippan Art, Mandala Art, Tie and Dye, Boho Canvas Art, Bottle Lamp Art, Block Printing, Clay Art, Glass Painting, Texture Art, Tote Bag Painting, Trinket Tray Painting, MDF Fridge Magnet, Canvas Pouch Painting.</p>
      <h2>Logistics</h2>
      <p>Group size: 20 to 200+ participants. Location: Delhi, Gurgaon, Noida, and online pan-India. All art supplies provided by Kraftykinni. Your venue needs only tables and chairs. Duration: 1.5 to 2.5 hours depending on activity. Minimum 7 days booking notice required with 50% deposit to confirm. Payment via UPI, bank transfer, or cash.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What makes art workshops better than other corporate team-building activities?</h3>
      <p>Unlike games or quizzes, art workshops produce a physical outcome every participant keeps. The shared creative process builds camaraderie without competition. Participants frequently describe the experience as genuinely therapeutic.</p>
      <h3>Can you handle 100+ participants in a single session?</h3>
      <p>Yes — our large-group format is designed for 100 to 200+ participants. Pricing drops to ₹600 per person at this scale and we bring additional facilitators if required.</p>
      <h3>Which activity works best for corporate team building?</h3>
      <p>Lippan Art, Mandala Art, and Boho Canvas are our most requested for corporate groups. Tie and Dye works brilliantly for outdoor or high-energy events. We always recommend based on your group size, event tone, and duration available.</p>
      <h3>Can you incorporate our company branding or colours?</h3>
      <p>Absolutely. Tote Bag Painting and Canvas Pouch are particularly popular as branded gifting workshops. We can work with your brand palette and theme across most activities.</p>
      <h3>Do you conduct workshops on weekends or at off-site venues?</h3>
      <p>Yes — we conduct workshops any day of the week including weekends, at your office, a rented venue, hotel banquet hall, or outdoor space. We only need tables and chairs.</p>
    `,
  },

  // ── School workshops ─────────────────────────────────────────────────────
  {
    path: '/school-workshops',
    title: 'Art Workshops for Schools & Colleges Delhi NCR | Kraftykinni',
    description: 'Fun, guided art workshops for schools and colleges in Delhi NCR. 13 activities including Clay Art, Block Printing & Tote Bag Painting. All materials included. Led by Fevicryl-certified artist.',
    h1: 'Art Workshops for Schools & Colleges in Delhi NCR',
    bodyContent: `
      <h1>Art Workshops for Schools and Colleges in Delhi NCR</h1>
      <p>Kraftykinni conducts fun, guided art and craft workshops for schools and colleges across Delhi NCR. Sessions are suitable for students from Grade 3 through to college level. All materials are included and no prior art experience is needed. Led by Shramita Govil, Fevicryl-certified artist with 50+ workshops and 1,500+ participants trained.</p>
      <h2>Why Schools Choose Kraftykinni</h2>
      <p>All art materials are provided — paints, canvases, brushes, aprons, and activity-specific supplies. We travel to your school anywhere in Delhi NCR and set up before the session. Every student completes a finished, display-worthy piece they take home. Fevicryl-certified facilitation ensures professional, high-quality guidance. Group sizes from 20 students to full school assemblies of 200+.</p>
      <h2>Activities by Grade Group</h2>
      <h3>Primary (Grade 3–5)</h3>
      <p>MDF Fridge Magnet, Clay Art, Tote Bag Painting, Canvas Pouch. Simple, tactile activities that develop fine motor skills and creative confidence.</p>
      <h3>Middle School (Grade 6–8)</h3>
      <p>Block Printing, Tie and Dye, Trinket Tray Painting, Texture Art. More detailed craft activities introducing Indian heritage techniques and fabric art.</p>
      <h3>Senior School (Grade 9–12)</h3>
      <p>Lippan Art, Mandala Art, Boho Canvas Art, Glass Painting. Sophisticated art forms with rich cultural context, popular as stress-relief activities.</p>
      <h3>College and University</h3>
      <p>All 13 Kraftykinni signature activities are available for college groups. Lippan Art and Boho Canvas are particularly popular for fest events and orientation days.</p>
      <h2>Suitable Occasions</h2>
      <p>Annual Day activities, Art Week celebrations, inter-school events, student orientation days, Teacher's Day programmes, farewell events, and everyday creative enrichment classes.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What age groups are your school workshops suitable for?</h3>
      <p>Our workshops are designed for students from Grade 3 onwards through college level. Activities are adapted to the age group — simpler crafts for younger students, more detailed art forms for older groups.</p>
      <h3>Can you come to our school for the workshop?</h3>
      <p>Yes — we travel to your school anywhere in Delhi NCR. We bring all materials and set up before the session. You only need to provide tables, chairs, and the space.</p>
      <h3>How many students can participate in one session?</h3>
      <p>We handle groups from 20 students up to full school assemblies of 200+. For very large groups we bring additional facilitators.</p>
      <h3>Do students need any prior art experience?</h3>
      <p>No experience needed. Every workshop is step-by-step guided. All students, regardless of their art ability, create a finished piece to take home.</p>
      <h3>What occasions are school workshops suitable for?</h3>
      <p>Annual Day activities, Art Week celebrations, inter-school events, student orientation days, Teacher's Day programmes, farewell events, and everyday creative enrichment classes.</p>
    `,
  },

  // ── Private art workshops ─────────────────────────────────────────────────
  {
    path: '/private-art-workshops',
    title: 'Art Workshops for Private Events in Delhi NCR | Kraftykinni',
    description: 'Art workshops for birthday parties, kitty parties, bachelorettes & baby showers in Delhi NCR. ₹600/person, all materials included. Led by a Fevicryl-certified artist. Book Kraftykinni.',
    h1: 'Art Workshops for Private Celebrations in Delhi NCR',
    bodyContent: `
      <h1>Art Workshops for Private Celebrations in Delhi NCR</h1>
      <p>Kraftykinni conducts hands-on art workshops for private events across Delhi, Gurgaon and Noida — including birthday parties, kitty parties, bachelorette parties, and baby showers. Every participant creates something real and takes it home. All materials are included. Sessions are led by Shramita Govil, Fevicryl-certified artist with 50+ workshops and 1,500+ happy participants.</p>
      <h2>Private Events We Specialise In</h2>
      <h3>Birthday Parties</h3>
      <p>Art workshops are among the most memorable birthday party activities for adults in Delhi NCR. Guests create a unique piece of artwork — Boho Canvas, Glass Painting, or Lippan Art are most popular — and leave with a keepsake of the day. More personal and more social than a dinner or a bar.</p>
      <h3>Kitty Parties</h3>
      <p>Add something genuinely creative to your next kitty party. Art sessions are relaxed, social, and require no prior experience. Popular choices include Mandala Art, Trinket Tray Painting, and Canvas Pouch Painting.</p>
      <h3>Bachelorette Parties</h3>
      <p>A bachelorette the bride will remember. Each guest paints a personal keepsake — photogenic, creative, and unique. Boho Canvas and Tote Bag Painting are top choices for bachelorettes in Delhi NCR.</p>
      <h3>Baby Showers</h3>
      <p>Guests create a handmade gift for the parents-to-be. Clay Art and Canvas Pouch are particularly meaningful for baby shower sessions, adding warmth that standard party games cannot match.</p>
      <h2>Why Kraftykinni for Private Events</h2>
      <p>No experience needed — every session is step-by-step guided. We bring all supplies and set up before guests arrive. Every participant takes their finished artwork home. Flexible group sizes from 10 to 80+ participants. Fully customisable to your event theme and colour palette. We come to your home, venue, or café — anywhere in Delhi NCR. Starting at ₹600 per person, all materials inclusive.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>Which art workshop is best for a birthday party in Delhi?</h3>
      <p>Boho Canvas Art and Glass Painting are our most popular birthday party choices. Both produce beautiful, display-ready artwork that guests keep as a memory of the occasion.</p>
      <h3>Can you conduct a workshop at my home or a private venue?</h3>
      <p>Yes — we come to you. We travel anywhere in Delhi, Gurgaon, and Noida. We bring all supplies and set up before guests arrive. You only need tables, chairs, and adequate lighting.</p>
      <h3>What is the minimum group size for a private art workshop?</h3>
      <p>We accept bookings from groups of 10 upward for private events. Pricing stays at ₹600–₹800 per person inclusive of all materials.</p>
      <h3>Do guests need any prior art experience?</h3>
      <p>None at all. Every session is designed so that someone who has never held a paintbrush walks away with something genuinely beautiful.</p>
    `,
  },

  // ── About ────────────────────────────────────────────────────────────────
  {
    path: '/about',
    title: 'About Kraftykinni | Shramita Govil — Fevicryl Certified Artist Delhi NCR',
    description: 'Kraftykinni is led by Shramita Govil, a Fevicryl-certified artist with 50+ workshops and 1,500+ participants across Delhi NCR. Learn about our story, mission, and approach.',
    h1: 'About Kraftykinni — Shramita Govil, Fevicryl Certified Artist',
    bodyContent: `
      <h1>About Kraftykinni — Shramita Govil, Fevicryl Certified Artist</h1>
      <p>Shramita Govil is a Fevicryl-certified art professional and the founder of Kraftykinni — a Delhi NCR-based creative workshop studio specialising in hands-on art and DIY sessions for corporate teams, schools, universities, and private events. With over 50 workshops conducted and more than 1,500 participants trained, Kraftykinni has become one of the most trusted art workshop facilitators in Delhi NCR.</p>
      <h2>The Kraftykinni Story</h2>
      <p>Shramita's journey into art facilitation began with a Fevicryl certification — a credential that gave her both the technical foundation and the teaching framework to guide complete beginners through complex art forms. What started as private workshops for friends and family quickly revealed something important: people were hungry for creative experiences, but most felt intimidated by the idea of making art. Kraftykinni was founded to bridge that gap.</p>
      <p>The brand was built around a single promise: that every participant, regardless of skill level, would create something they genuinely love. Sessions were designed to be guided, relaxed, and joyful rather than instructional and pressured. Word spread quickly — corporate HR teams discovered that art workshops were among the most effective team-building activities available, and schools found that Kraftykinni sessions were both curriculum-friendly and deeply engaging for students.</p>
      <p>Today, Kraftykinni operates across Delhi, Gurgaon, and Noida with 13 signature activities and a growing roster of repeat clients including corporate teams, schools, universities, and private event organisers.</p>
      <h2>Credentials and Experience</h2>
      <p>Fevicryl Certified Artist — India's most recognised art certification. Over 50 workshops conducted across Delhi NCR. More than 1,500 participants trained across corporate, school, university, and private settings. Regular facilitator at Amity University across Delhi and Noida campuses. Corporate clients across Delhi, Gurgaon, and Noida. Available for in-person sessions across Delhi NCR and online workshops pan-India.</p>
      <h2>What We Believe In</h2>
      <p>Kraftykinni was built on the belief that creativity is not a talent you are born with — it is a practice that anyone can access with the right guidance and environment. Every session is designed so participants walk away with a finished piece they are genuinely proud of. We bring every supply, set up before the session, and clean up after — the only thing participants need to do is show up and enjoy the process.</p>
      <h2>Service Area</h2>
      <p>Kraftykinni conducts in-person workshops across Delhi, Gurgaon, and Noida. Online workshops are available pan-India with materials shipped directly to participants. All 13 signature activities are available for corporate bookings, school programmes, college events, and private occasions.</p>
    `,
  },

  // ── Privacy Policy ────────────────────────────────────────────────────────
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Kraftykinni',
    description: "Kraftykinni's privacy policy — how we collect and use information submitted through our contact form. We never sell your data.",
    h1: 'Privacy Policy',
    bodyContent: `
      <h1>Privacy Policy</h1>
      <p>This website is operated by Kraftykinni, a creative art workshop business based in Delhi NCR, India. Kraftykinni is founded and run by Shramita Govil. If you have any questions about this policy, contact us at kraftykinni@gmail.com.</p>
      <h2>What information we collect</h2>
      <p>We collect information only when you voluntarily submit our contact form. The form asks for your name, email address, phone number (optional), group size, preferred date, and a message. We do not use cookies, analytics trackers, or any other form of passive data collection.</p>
      <h2>How your information is used</h2>
      <p>The information you submit is used solely to respond to your enquiry and send you a customised workshop proposal. Our contact form is powered by Web3Forms, which forwards your submission to our email address. We do not store your form data on our own servers.</p>
      <h2>Data sharing</h2>
      <p>We do not sell, rent, or share your personal information with any third party for marketing purposes. Your contact details are used only by Kraftykinni to follow up on your workshop enquiry.</p>
      <h2>Your rights</h2>
      <p>You have the right to request access to, correction of, or deletion of any personal data we hold about you. Write to us at kraftykinni@gmail.com and we will respond within 14 business days.</p>
    `,
  },

  // ── Workshop detail pages ─────────────────────────────────────────────────
  {
    path: '/workshops/lippan-art',
    title: 'Lippan Art Workshop Delhi NCR — Kutch Mirror Work | Kraftykinni',
    description: 'Lippan Art workshop in Delhi NCR by Kraftykinni. Traditional Kutch mirror work in a guided group session. Corporate team building, schools & private events. All materials included. ₹600–₹800/person.',
    h1: 'Lippan Art Workshop in Delhi NCR',
    bodyContent: `<h1>Lippan Art Workshop in Delhi NCR</h1><p>Lippan Art is a centuries-old folk craft from the Kutch region of Gujarat where artisans use clay and mirror work to create intricate wall decorations. In our Lippan Art workshop, participants experience this meditative craft firsthand — shaping clay patterns, embedding mirrors, and creating a piece of genuine Indian heritage they can take home. It is one of our most requested activities for corporate teams and school groups alike.</p><h2>What you make</h2><p>A finished Lippan Art wall piece with clay patterning and embedded mirrors — a unique, display-ready piece of folk art.</p><h2>Who it is for</h2><p>Perfect for corporate team-building events, school art days, college fests, and private parties. No prior art experience needed. Duration: 2 to 2.5 hours. Group size: 20 to 200+ participants. Location: Delhi, Gurgaon, Noida and online pan-India. All materials included. Pricing from ₹600 per person.</p><h2>Why this activity works for corporate teams</h2><p>The meditative, repetitive nature of shaping clay and placing mirrors creates a calm, focused atmosphere — a rare and valuable contrast to the pace of corporate life. Every participant produces a strikingly beautiful piece, regardless of prior art experience. Lippan Art is one of the highest-rated activities in participant feedback across all 13 Kraftykinni workshops.</p>`,
  },
  {
    path: '/workshops/mandala-art',
    title: 'Mandala Art Workshop Delhi NCR — Stress Relief & Team Building | Kraftykinni',
    description: 'Mandala Art workshop in Delhi NCR by Kraftykinni. Meditative, stress-relieving mandala painting sessions for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    h1: 'Mandala Art Workshop in Delhi NCR',
    bodyContent: `<h1>Mandala Art Workshop in Delhi NCR</h1><p>Mandala art is one of the most universally loved art forms — symmetrical, meditative, and endlessly satisfying to create. Our Mandala Art workshops guide participants through building their own mandala from the centre outward, using dotting tools, colours, and repetitive patterns that calm the mind and engage full attention. Popular as a corporate wellness activity and equally loved by school students.</p><h2>What you make</h2><p>A colourful, symmetric mandala artwork on canvas or paper — a beautiful piece to display or gift.</p><h2>Who it is for</h2><p>Ideal for corporate wellness sessions, mental health awareness events, school art days, and team-building retreats. Duration: 1.5 to 2 hours. Pricing from ₹600 per person. All materials included.</p><h2>Why mandala art works as a corporate activity</h2><p>Scientific research consistently links repetitive pattern-making with reduced cortisol levels and improved focus. For HR teams planning a wellness day, a mindfulness workshop, or simply a positive break from the work week, Mandala Art delivers measurable impact alongside a beautiful physical takeaway.</p>`,
  },
  {
    path: '/workshops/tie-and-dye',
    title: 'Tie & Dye Workshop Delhi NCR — High-Energy Team Activity | Kraftykinni',
    description: 'Tie & Dye workshop in Delhi NCR by Kraftykinni. High-energy fabric dyeing sessions for corporate teams, schools & private events. Wearable takeaway. All materials included. ₹600–₹800/person.',
    h1: 'Tie & Dye Workshop in Delhi NCR',
    bodyContent: `<h1>Tie and Dye Workshop in Delhi NCR</h1><p>Tie and Dye is the workshop that fills a room with laughter, colour, and energy. Participants fold, twist, and bind fabric before applying vibrant dyes — and every single piece turns out uniquely different. Because the outcome is a wearable item — a t-shirt, dupatta, or tote — participants carry the memory of the event into their daily lives long after the workshop ends.</p><h2>What you make</h2><p>A one-of-a-kind tie-dye fabric item — t-shirt, tote bag, or dupatta — to wear and keep.</p><h2>Who it is for</h2><p>Best for high-energy corporate events, college fests, team outings, and large group gatherings of 50 to 200+ people. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p><h2>Why Tie and Dye is popular for large corporate events</h2><p>Unlike most art activities, Tie and Dye creates visible, energetic activity across a room. The process is visual, tactile, and social — groups naturally interact and compare results. For annual day events, outdoor corporate events, and high-energy onboarding programmes, Tie and Dye is consistently the highest-energy option in the Kraftykinni catalogue.</p>`,
  },
  {
    path: '/workshops/boho-canvas',
    title: 'Boho Canvas Art Workshop Delhi NCR — Abstract Painting | Kraftykinni',
    description: 'Boho Canvas Art workshop in Delhi NCR by Kraftykinni. Guided abstract canvas painting sessions for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    h1: 'Boho Canvas Art Workshop in Delhi NCR',
    bodyContent: `<h1>Boho Canvas Art Workshop in Delhi NCR</h1><p>Boho Canvas Art combines warm earthy tones, abstract composition, and layered textures into a painting style that looks impressive but requires no drawing skills. Participants learn to blend colours, layer shapes, and create the bohemian aesthetic that has become one of the most popular contemporary art styles for home décor. Each canvas is unique to the person who painted it.</p><h2>What you make</h2><p>A finished boho-style canvas painting in earthy, warm tones — ready to hang at home or gift.</p><h2>Who it is for</h2><p>Popular choice for corporate team events, art days at schools and colleges, and private birthday or kitty parties. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },
  {
    path: '/workshops/bottle-lamp-art',
    title: 'Bottle Lamp Art Workshop Delhi NCR — Upcycling Craft | Kraftykinni',
    description: 'Bottle Lamp Art workshop in Delhi NCR by Kraftykinni. Transform glass bottles into glowing fairy-light lamps. Corporate & school sessions. All materials included. ₹600–₹800/person.',
    h1: 'Bottle Lamp Art Workshop in Delhi NCR',
    bodyContent: `<h1>Bottle Lamp Art Workshop in Delhi NCR</h1><p>Bottle Lamp Art is one of our most magical workshops — participants paint and decorate glass bottles, which are then fitted with fairy lights to create glowing home décor pieces. It blends sustainability through upcycling, creativity, and a deeply satisfying result. When the lights come on at the end of the session, the room transforms.</p><h2>What you make</h2><p>A hand-painted glass bottle lamp with fairy lights — a glowing, functional piece of home décor.</p><h2>Who it is for</h2><p>Great for corporate gifting events, school craft days, private parties, and eco-themed corporate events. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },
  {
    path: '/workshops/block-printing',
    title: 'Block Printing Workshop Delhi NCR — Traditional Indian Craft | Kraftykinni',
    description: 'Block Printing workshop in Delhi NCR by Kraftykinni. Learn traditional Indian block printing on fabric. Corporate & school sessions. All materials included. ₹600–₹800/person.',
    h1: 'Block Printing Workshop in Delhi NCR',
    bodyContent: `<h1>Block Printing Workshop in Delhi NCR</h1><p>Block Printing is one of India's most treasured textile traditions, originating in Rajasthan and Gujarat. Participants learn to apply natural pigments using carved wooden blocks to create repeat patterns on fabric — a rhythmic, meditative process that produces strikingly beautiful results. Popular both as a cultural heritage activity and as a stress-relief exercise for corporate teams.</p><h2>What you make</h2><p>A block-printed fabric item — tote bag, dupatta, or fabric panel — in traditional or contemporary patterns.</p><h2>Who it is for</h2><p>Excellent for corporate cultural events, school heritage days, college fests, and curated team-building sessions. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p><h2>Block printing in Delhi NCR</h2><p>Delhi NCR has a rich textile heritage and block printing connects participants directly to that tradition. Our block printing workshops are among the most frequently booked for corporate cultural programmes, India-themed office events, and school heritage day activities. The rhythmic stamping process is deeply calming and produces striking results on every piece.</p>`,
  },
  {
    path: '/workshops/clay-art',
    title: 'Clay Art Workshop Delhi NCR — Therapeutic Sculpting | Kraftykinni',
    description: 'Clay Art workshop in Delhi NCR by Kraftykinni. Hands-on clay sculpting sessions for corporate teams, schools & private events. All materials included. ₹600–₹800/person.',
    h1: 'Clay Art Workshop in Delhi NCR',
    bodyContent: `<h1>Clay Art Workshop in Delhi NCR</h1><p>Working with clay is one of the most grounding, stress-relieving creative experiences available. Our Clay Art workshops guide participants through sculpting small 3D objects — decorative bowls, figures, jewellery holders, or fridge magnets — using air-dry clay. The tactile nature of the material engages the nervous system and produces a state of calm focus that participants often describe as genuinely therapeutic.</p><h2>What you make</h2><p>A handcrafted clay sculpture or functional object — air-dried and ready to take home.</p><h2>Who it is for</h2><p>Ideal for corporate wellness days, school art sessions, stress management workshops, and mindfulness events. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },
  {
    path: '/workshops/glass-painting',
    title: 'Glass Painting Workshop Delhi NCR — Translucent Art | Kraftykinni',
    description: 'Glass Painting workshop in Delhi NCR by Kraftykinni. Learn glass painting techniques in a guided group session. Corporate, school & private events. All materials included. ₹600–₹800/person.',
    h1: 'Glass Painting Workshop in Delhi NCR',
    bodyContent: `<h1>Glass Painting Workshop in Delhi NCR</h1><p>Glass Painting produces some of the most visually spectacular results of any workshop activity — translucent colours that glow when light passes through them. Participants paint directly onto glass surfaces using special glass paints, creating geometric or floral patterns that look stunning on display. It is a medium that most people have never tried, which makes the experience feel novel and memorable.</p><h2>What you make</h2><p>A hand-painted glass piece — a frame, bottle, or panel — with translucent painted designs.</p><h2>Who it is for</h2><p>Popular at corporate events, school art days, and private parties. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },
  {
    path: '/workshops/texture-art',
    title: 'Texture Art Workshop Delhi NCR — Mixed Media Canvas | Kraftykinni',
    description: 'Texture Art workshop in Delhi NCR by Kraftykinni. Mixed-media layered canvas art sessions for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    h1: 'Texture Art Workshop in Delhi NCR',
    bodyContent: `<h1>Texture Art Workshop in Delhi NCR</h1><p>Texture Art uses layered materials — tissue paper, acrylic paste, fabric scraps, and paint — to build deeply tactile canvases with real physical dimension. Because the process is abstract and exploratory, there is no wrong way to do it, making it ideal for participants who feel intimidated by art. The results consistently surprise people — what begins as a messy layering process resolves into rich, gallery-quality wall art.</p><h2>What you make</h2><p>A layered, textured mixed-media canvas — unique, abstract, and display-ready.</p><h2>Who it is for</h2><p>Perfect for corporate creative thinking workshops, school art days, and private events. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },
  {
    path: '/workshops/tote-bag-painting',
    title: 'Tote Bag Painting Workshop Delhi NCR — Eco Corporate Gift | Kraftykinni',
    description: 'Tote Bag Painting workshop in Delhi NCR by Kraftykinni. Eco-friendly fabric painting for corporate teams, schools & events. Custom branding available. All materials included. ₹600–₹800/person.',
    h1: 'Tote Bag Painting Workshop in Delhi NCR',
    bodyContent: `<h1>Tote Bag Painting Workshop in Delhi NCR</h1><p>Tote Bag Painting is one of our most sustainable and practically useful workshops. Each participant paints their own cotton tote bag using fabric paints and stencils, creating a personalised, eco-friendly bag they will actually use. For corporates, we can incorporate brand elements or event themes — making it an excellent branded gifting workshop.</p><h2>What you make</h2><p>A hand-painted cotton tote bag with personalised or themed designs — durable, usable, eco-friendly.</p><h2>Who it is for</h2><p>Excellent for corporate gifting events, sustainability-themed workshops, school events, and private parties. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },
  {
    path: '/workshops/trinket-tray',
    title: 'Trinket Tray Painting Workshop Delhi NCR — Desk Décor | Kraftykinni',
    description: 'Trinket Tray Painting workshop in Delhi NCR by Kraftykinni. Paint your own decorative jewellery or desk tray. Corporate & school sessions. All materials included. ₹600–₹800/person.',
    h1: 'Trinket Tray Painting Workshop in Delhi NCR',
    bodyContent: `<h1>Trinket Tray Painting Workshop in Delhi NCR</h1><p>Trinket Tray Painting gives participants a plain MDF or ceramic tray and the freedom to transform it into something beautiful. Using acrylic paints, brushes, and simple decorative techniques, each tray becomes a unique piece of functional desk art. It is a quick, satisfying activity that produces immediate results.</p><h2>What you make</h2><p>A hand-painted trinket or jewellery tray — colourful, functional, and personalised.</p><h2>Who it is for</h2><p>Great for corporate events, school workshops, office parties, and bridal events. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },
  {
    path: '/workshops/mdf-fridge-magnet',
    title: 'MDF Fridge Magnet Workshop Delhi NCR — Quick Corporate Craft | Kraftykinni',
    description: 'MDF Fridge Magnet painting workshop in Delhi NCR by Kraftykinni. Fun, quick craft activity for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    h1: 'MDF Fridge Magnet Painting Workshop in Delhi NCR',
    bodyContent: `<h1>MDF Fridge Magnet Painting Workshop in Delhi NCR</h1><p>The MDF Fridge Magnet workshop is proof that great art does not need a large canvas. Participants paint and personalise small MDF shapes — animals, letters, frames, or abstract forms — which become fridge magnets they take home. The activity is quick, cheerful, and produces a result that participants see every single day when they open their fridge.</p><h2>What you make</h2><p>A set of hand-painted MDF fridge magnets — personalised, colourful, and daily-use.</p><h2>Who it is for</h2><p>Perfect for quick corporate engagement sessions, school craft days, large events with tight schedules, and children's parties. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },
  {
    path: '/workshops/canvas-pouch',
    title: 'Canvas Pouch Painting Workshop Delhi NCR — Personalised Gift | Kraftykinni',
    description: 'Canvas Pouch Painting workshop in Delhi NCR by Kraftykinni. Personalise your own canvas pouch with fabric paints. Corporate, school & private event sessions. All materials included.',
    h1: 'Canvas Pouch Painting Workshop in Delhi NCR',
    bodyContent: `<h1>Canvas Pouch Painting Workshop in Delhi NCR</h1><p>Canvas Pouch Painting lets participants personalise a compact fabric pouch using fabric paints, fine brushes, and stencils. The smaller canvas encourages precision and detailed work — participants focus deeply on their design and leave with a pouch they actually use for makeup, stationery, or accessories.</p><h2>What you make</h2><p>A hand-painted canvas pouch — personalised with the participant's own design and ready for daily use.</p><h2>Who it is for</h2><p>Ideal for corporate gifting events, school sessions, college workshops, and intimate private parties. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },

  // ── Location pages ────────────────────────────────────────────────────────
  {
    path: '/workshops-in-delhi',
    title: 'Art Workshops in Delhi | Corporate & School Sessions | Kraftykinni',
    description: 'Kraftykinni conducts art and DIY workshops across Delhi — corporate team building, school sessions, and private events. 13 activities, all materials included. Led by Fevicryl-certified artist. ₹600–₹800/person.',
    h1: 'Art Workshops in Delhi',
    bodyContent: `<h1>Art Workshops in Delhi — Book a Session Today</h1><p>Kraftykinni conducts art and DIY workshops across Delhi — at corporate offices in Connaught Place and Nehru Place, schools and colleges across North and South Delhi, and private venues for birthdays, kitty parties, and special events. We come to your space with all the supplies and the facilitation.</p><h2>Areas We Cover in Delhi</h2><p>Connaught Place, South Delhi, Dwarka, Rohini, Lajpat Nagar, Saket, Vasant Kunj, Nehru Place, and all areas across Delhi. We travel to your office, school, or event venue.</p><h2>All 13 Activities Available in Delhi</h2><p>Lippan Art, Mandala Art, Tie and Dye, Boho Canvas Art, Bottle Lamp Art, Block Printing, Clay Art, Glass Painting, Texture Art, Tote Bag Painting, Trinket Tray Painting, MDF Fridge Magnet, Canvas Pouch Painting.</p><h2>Pricing</h2><p>₹800 per person for groups of 20–50, ₹700 per person for 50–100 participants, ₹600 per person for 100+ participants. All art materials included. Minimum 7 days advance notice required. 50% deposit to confirm booking.</p>`,
  },
  {
    path: '/workshops-in-gurgaon',
    title: 'Art Workshops in Gurgaon | Corporate Team Building | Kraftykinni',
    description: 'Kraftykinni conducts corporate art workshops and team-building sessions in Gurgaon. Office visits, off-site events, school sessions. 13 activities, all materials included. ₹600–₹800/person.',
    h1: 'Art Workshops in Gurgaon',
    bodyContent: `<h1>Art Workshops in Gurgaon — For Corporate Teams and Events</h1><p>Gurgaon's corporate ecosystem is exactly where Kraftykinni thrives. We regularly conduct corporate art workshops for teams in Gurgaon's major business hubs — from DLF Cyber City to Udyog Vihar and MG Road. Companies in Gurgaon choose Kraftykinni for quarterly team-building events, employee appreciation days, onboarding workshops, and annual day activities.</p><h2>Areas We Cover in Gurgaon</h2><p>DLF Cyber City, Udyog Vihar, MG Road, Sohna Road, Golf Course Road, Sector 29, Sector 56, Manesar, and all areas across Gurgaon and Gurugram. We bring all art supplies directly to your Gurgaon office or preferred venue.</p><h2>All 13 Activities Available in Gurgaon</h2><p>Lippan Art, Mandala Art, Tie and Dye, Boho Canvas Art, Bottle Lamp Art, Block Printing, Clay Art, Glass Painting, Texture Art, Tote Bag Painting, Trinket Tray Painting, MDF Fridge Magnet, Canvas Pouch Painting.</p><h2>Pricing</h2><p>₹800 per person for groups of 20–50, ₹700 per person for 50–100 participants, ₹600 per person for 100+ participants. All art materials included.</p>`,
  },
  {
    path: '/workshops-in-noida',
    title: 'Art Workshops in Noida | Corporate & School Sessions | Kraftykinni',
    description: 'Kraftykinni conducts art and DIY workshops in Noida and Greater Noida — corporate team building, school sessions, and private events. All materials included. ₹600–₹800/person.',
    h1: 'Art Workshops in Noida',
    bodyContent: `<h1>Art Workshops in Noida — Corporate and School Sessions</h1><p>Noida has rapidly grown into one of the most active corporate and educational hubs in the NCR, and Kraftykinni serves both. We conduct corporate art workshops for companies across Sector 62, Sector 16, and Film City Road, as well as school and college workshops for institutions in Noida and Greater Noida. Our workshops at Amity University are among our most frequently repeated.</p><h2>Areas We Cover in Noida</h2><p>Sector 62, Sector 16, Film City Road, Sector 18, Expressway, Greater Noida, Knowledge Park, Sector 125, and all areas across Noida and Greater Noida.</p><h2>All 13 Activities Available in Noida</h2><p>Lippan Art, Mandala Art, Tie and Dye, Boho Canvas Art, Bottle Lamp Art, Block Printing, Clay Art, Glass Painting, Texture Art, Tote Bag Painting, Trinket Tray Painting, MDF Fridge Magnet, Canvas Pouch Painting.</p><h2>Pricing</h2><p>₹800 per person for groups of 20–50, ₹700 per person for 50–100 participants, ₹600 per person for 100+ participants. All art materials included.</p>`,
  },
];

// ─── HTML injection helper ────────────────────────────────────────────────────

function injectMeta(html, { path: routePath, title, description, h1, bodyContent, ogImage }) {
  const canonical = `https://kraftykinni.in${routePath}`;

  // Update meta tags
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${description}">`);
  html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${description}">`);

  // Update og:image / twitter:image if route specifies a custom image
  if (ogImage) {
    html = html.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${ogImage}">`);
    html = html.replace(/<meta property="og:image:width" content="[^"]*">/, `<meta property="og:image:width" content="1200">`);
    html = html.replace(/<meta property="og:image:height" content="[^"]*">/, `<meta property="og:image:height" content="630">`);
    html = html.replace(/<meta name="twitter:card" content="[^"]*">/, `<meta name="twitter:card" content="summary_large_image">`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${ogImage}">`);
  }

  // Inject trailing-slash fix script into <head> (runs before React boots)
  html = html.replace('</head>', `  ${SLASH_FIX_SCRIPT}\n  </head>`);

  // Build the noscript block ONLY — no hidden crawler div (that was cloaking)
  const noscriptBlock = `
    <noscript>
      <div style="font-family:sans-serif;max-width:900px;margin:40px auto;padding:0 20px;line-height:1.7;color:#333;">
        ${bodyContent || `<h1>${h1}</h1><p>Please enable JavaScript to view this page.</p>`}
        <p><strong>Contact:</strong> kraftykinni@gmail.com | +91 9599622210</p>
        <p><strong>Service area:</strong> Delhi, Gurgaon, Noida and online pan-India</p>
        <p><strong>Pricing:</strong> ₹600–₹800 per person, all materials included</p>
      </div>
    </noscript>`;

  // Inject noscript before the root div
  html = html.replace(
    '<div id="root">',
    `${noscriptBlock}\n    <div id="root">`
  );

  return html;
}

// ─── 1. Pre-render routes ────────────────────────────────────────────────────

let created = 0;

for (const route of routes) {
  const dir      = path.join(distDir, route.path);
  const filePath = path.join(dir, 'index.html');
  const html     = injectMeta(baseHtml, route);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`✅  ${route.path}`);
  created++;
}

console.log(`\n🎉  Pre-rendered ${created} routes.`);
console.log('    Each page has:\n' +
            '      • Unique title + meta injected\n' +
            '      • Trailing-slash fix script in <head>\n' +
            '      • <noscript> content block for non-JS crawlers\n' +
            '      • No hidden cloaking divs\n');

// ─── 2. Regenerate sitemap.xml ────────────────────────────────────────────────

const today = new Date().toISOString().slice(0, 10);

const sitemapEntries = [
  { loc: '/',                              priority: '1.0', changefreq: 'monthly' },
  { loc: '/corporate-art-workshops',       priority: '0.9', changefreq: 'monthly' },
  { loc: '/school-workshops',              priority: '0.8', changefreq: 'monthly' },
  { loc: '/private-art-workshops',         priority: '0.9', changefreq: 'monthly' },
  { loc: '/workshops/lippan-art',          priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops/mandala-art',         priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops/tie-and-dye',         priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops/boho-canvas',         priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/bottle-lamp-art',     priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/clay-art',            priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/glass-painting',      priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/texture-art',         priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/block-printing',      priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/tote-bag-painting',   priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/trinket-tray',        priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/mdf-fridge-magnet',   priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/canvas-pouch',        priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops-in-delhi',            priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops-in-gurgaon',          priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops-in-noida',            priority: '0.8', changefreq: 'monthly' },
  { loc: '/about',                         priority: '0.6', changefreq: 'yearly'  },
  { loc: '/privacy-policy',               priority: '0.2', changefreq: 'yearly'  },
];

const base = 'https://kraftykinni.in';

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(({ loc, priority, changefreq }) => `  <url>
    <loc>${base}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.join(distDir,   'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`🗺️   Sitemap regenerated with lastmod: ${today}\n`);
