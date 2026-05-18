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
    path: '/corporate-art-workshops/',
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
    path: '/school-workshops/',
    title: 'School Art Workshops Delhi NCR — Annual Day & Events | Kraftykinni',
    description: 'Art workshops for schools in Delhi NCR — Annual Day, Art Week & student events. From ₹600/student, facilitator travels to your school. Grades 3 to college. 13 activities, all materials included.',
    h1: 'School Art Workshops Delhi NCR — Annual Day, Art Week & Student Events',
    schemas: [
      {
        '@context': 'https://schema.org', '@type': 'HowTo',
        name: 'How to Book a School Art Workshop with Kraftykinni',
        description: 'Steps to book a guided art workshop for your school in Delhi NCR. Sessions from ₹600/student, all materials included, facilitator travels to your school.',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Choose an activity', text: 'Browse the 13 Kraftykinni signature activities and shortlist 2–3 that match your student age group and event theme.' },
          { '@type': 'HowToStep', position: 2, name: 'Send an enquiry', text: 'WhatsApp +91 9599622210 or fill the contact form with your school name, event date, expected student count, and preferred activity.' },
          { '@type': 'HowToStep', position: 3, name: 'Confirm your date', text: 'Shramita confirms availability within 24 hours. A 50% deposit is required to secure the booking.' },
          { '@type': 'HowToStep', position: 4, name: 'We arrive and set up', text: 'Kraftykinni arrives at your school with all materials — paints, canvases, aprons, brushes. Setup takes 20–30 minutes before the session starts.' },
          { '@type': 'HowToStep', position: 5, name: 'Workshop runs', text: 'The session runs for 1.5 to 2.5 hours. Every student completes a finished artwork to take home. Kraftykinni handles cleanup.' },
        ],
      },
    ],
    bodyContent: `
      <h1>School Art Workshops Delhi NCR — Annual Day, Art Week &amp; Student Events</h1>
      <p>Kraftykinni conducts structured, guided art workshops for schools and colleges across Delhi, Gurgaon, and Noida. We run sessions for groups from 30 to 300+ students at schools from Grade 3 through college level. The facilitator travels to your school with all materials. From ₹600 per student, everything included.</p>
      <h2>Annual Day Art Activities for Schools in Delhi NCR</h2>
      <p>Annual day planning committees consistently choose Kraftykinni because every student completes a finished, display-worthy piece within the session — no half-finished work, no mess to clean up. The most popular annual day activities are Tote Bag Painting, Mandala Art, Lippan Art, Tie and Dye, and Block Printing. Each one scales to 100+ students simultaneously and produces a finished artwork students take home.</p>
      <h2>Why Schools Choose Kraftykinni</h2>
      <p>All art materials are provided — paints, canvases, brushes, aprons, and activity-specific supplies. We travel to your school anywhere in Delhi NCR and set up before the session. Every student completes a finished, display-worthy piece they take home. Fevicryl-certified facilitation ensures professional guidance. Group sizes from 30 students to full school assemblies of 300+.</p>
      <h2>Activities by Grade Group</h2>
      <h3>Primary (Grade 3–5)</h3>
      <p>MDF Fridge Magnet, Clay Art, Tote Bag Painting, Canvas Pouch. Simple, tactile activities that develop fine motor skills and creative confidence.</p>
      <h3>Middle School (Grade 6–8)</h3>
      <p>Block Printing, Tie and Dye, Trinket Tray Painting, Texture Art. Detailed craft activities introducing Indian heritage techniques and fabric art.</p>
      <h3>Senior School (Grade 9–12)</h3>
      <p>Lippan Art, Mandala Art, Boho Canvas Art, Glass Painting. Mandala Art is the top annual day choice for senior school groups — impressive results regardless of art ability.</p>
      <h3>College and University</h3>
      <p>All 13 Kraftykinni signature activities are available for college groups. Lippan Art and Boho Canvas are particularly popular for fest events and orientation days.</p>
      <h2>School Workshop Pricing</h2>
      <p>Pricing is per student with all materials included. No hidden charges. Facilitator travels to your school.</p>
      <ul>
        <li><strong>Small Group (20–50 students):</strong> ₹800 per student — all materials included</li>
        <li><strong>Standard (50–100 students):</strong> ₹700 per student — all materials included</li>
        <li><strong>Large Group (100+ students):</strong> ₹600 per student — all materials included</li>
      </ul>
      <p>A 50% deposit confirms the booking. Minimum 7 days advance notice required for large groups. WhatsApp +91 9599622210 for a custom quote for 200+ students or multi-session bookings.</p>
      <h2>School Case Study — Jaypee Public School, Noida</h2>
      <p>Jaypee Public School booked a full-school Bottle Lamp Art session with Kraftykinni — 150+ students creating upcycled glass bottle lamps in a single afternoon. Each student decorated their bottle using Fevicryl Mouldit and acrylic colours, taking home a finished, display-worthy lamp. The upcycling theme aligned with the school's sustainability focus for the event. Read the full case study at kraftykinni.in/blog/bottle-lamp-art-workshop-school-delhi-ncr/</p>
      <h2>Occasions We Cover</h2>
      <p>Annual Day activities, Art Week celebrations, inter-school events, student orientation days, Teacher's Day programmes, farewell events, college fests, and creative enrichment classes. Curriculum-aligned sessions available for CBSE and ICSE schools.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What art activities work best for a school annual day in Delhi NCR?</h3>
      <p>The most popular annual day art activities are Tote Bag Painting, Mandala Art, Lippan Art, and Tie and Dye. All four produce a finished piece in 60 to 90 minutes, require no prior experience, and scale to groups of 50 to 300+ students.</p>
      <h3>Can you come to our school for the workshop?</h3>
      <p>Yes — we travel to your school anywhere in Delhi NCR. We bring all materials and set up before the session. You only need to provide tables, chairs, and the space.</p>
      <h3>How much does a school annual day art workshop cost?</h3>
      <p>Pricing starts at ₹600 per student for groups of 100+ with all materials included. ₹700 per student for 50–100, and ₹800 per student for groups of 20–50. Contact us with your student count for a specific quote.</p>
      <h3>How many students can participate in one session?</h3>
      <p>We handle groups from 30 students up to full school assemblies of 300+. For very large groups we bring additional facilitators to maintain quality.</p>
      <h3>Do students need any prior art experience?</h3>
      <p>No experience needed. Every workshop is step-by-step guided. All students, regardless of their art ability, create a finished piece to take home on the day.</p>
      <h3>Which grades do you cover?</h3>
      <p>We work with Grade 3 through Class 12 and college groups. Activity recommendations are tailored to age group — simpler tactile crafts for primary, detailed heritage art forms for senior school.</p>
      <h3>Do you align workshops with the CBSE or ICSE art syllabus?</h3>
      <p>Yes — on request, sessions can be framed around art curriculum themes. Mandala Art aligns with geometry and symmetry units, Block Printing with Indian textile heritage, and Clay Art with sculpture fundamentals.</p>
    `,
  },

  // ── Private art workshops ─────────────────────────────────────────────────
  {
    path: '/private-art-workshops/',
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
    path: '/about/',
    title: 'Fevicryl Certified Art Workshop Facilitator Delhi NCR | Kraftykinni',
    description: 'Shramita Govil — Fevicryl Certified Artist. 50+ workshops, 1,500+ participants across Delhi, Gurgaon & Noida — corporate teams, schools & private events.',
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
    path: '/privacy-policy/',
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

  // ── Blog ─────────────────────────────────────────────────────────────────
  {
    path: '/blog/',
    title: 'Art Workshop Tips, Ideas & Guides | Kraftykinni Blog',
    description: 'Art workshop guides, team building ideas, and event planning tips from Kraftykinni — Delhi NCR\'s creative workshop studio run by Fevicryl artist Shramita Govil.',
    h1: 'Kraftykinni Blog — Workshop Ideas, Guides & Stories',
    bodyContent: `
      <h1>Kraftykinni Blog — Workshop Ideas, Guides & Stories</h1>
      <p>Practical guides on team building, event planning, and art workshops from Shramita Govil and the Kraftykinni team in Delhi NCR. Read our latest posts on corporate art activities, school workshop planning, and creative event ideas.</p>
    `,
  },
  {
    path: '/blog/lippan-art-complete-beginners-guide-kutch-mirror-work/',
    title: "Lippan Art Guide: Kutch Mirror Work for Beginners | Kraftykinni",
    description: "Everything you need to know about Lippan Art — the Kutch mirror-work tradition, materials, step-by-step process, and why it's one of the best group workshop activities in Delhi NCR.",
    h1: "Lippan Art — A Complete Beginner's Guide to Kutch Mirror Work",
    bodyContent: `
      <h1>Lippan Art — A Complete Beginner's Guide to Kutch Mirror Work</h1>
      <p>Lippan Art is a 500-year-old craft from the Kutch region of Gujarat. Originally practised by women of the Rabari and Mutwa communities, it was used to decorate the interior walls of mud homes.</p>
      <h2>The Tradition Behind the Craft</h2>
      <p>The word lippan refers to the mud-and-cow-dung plaster that Kutchi women historically applied to their home walls. Embedded into this plaster were abhla — small circular mirrors — arranged in concentric geometric patterns.</p>
      <h2>The Materials: What Makes Lippan Art Work</h2>
      <p>Clay compound (Fevicryl Mouldit), convex mirrors, acrylic paints, and an MDF board or terracotta surface are the core materials used in Lippan Art.</p>
      <h2>The Process: Step by Step</h2>
      <p>Base coat, pattern sketch, clay application, mirror placement, and painting with metallic acrylics — the process takes 90 minutes to 2 hours in a guided workshop session.</p>
      <h2>Why Lippan Art Works So Well in a Group</h2>
      <p>Geometric patterns are inherently forgiving, mirror placement produces repeatable small successes, and every finished piece looks different despite being made with the same materials.</p>
      <h2>Who Should Try a Lippan Art Workshop</h2>
      <p>Kraftykinni runs Lippan Art workshops across Delhi, Gurgaon, and Noida for corporate teams, schools, and private events. Groups from 20 to 200+, starting at Rs. 600 per person.</p>
    `,
  },
  {
    path: '/blog/best-corporate-team-building-activities-gurgaon-2026/',
    title: 'Best Corporate Team Building Activities Gurgaon 2026 | Kraftykinni',
    description: 'Top 10 corporate team building activities in Gurgaon for 2026. From art workshops to offsite games — honest picks with real team outcomes. ₹600/person all-in.',
    h1: 'Best Corporate Team Building Activities in Gurgaon 2026',
    bodyContent: `
      <h1>Best Corporate Team Building Activities in Gurgaon 2026</h1>
      <p>Gurgaon's corporate event scene is full of options — escape rooms, bowling, and go-karting have their place. But after running 50+ team workshops across Cyber City, Udyog Vihar, and DLF Cyber Park, we've seen which activities actually produce conversation, connection, and something teams talk about months later.</p>
      <h2>1. Art Workshop — the #1 pick for genuine connection</h2>
      <p>Art workshops consistently outperform every other team activity on one metric: conversation. Kraftykinni runs guided art sessions starting at ₹600 per person across Gurgaon, with 13 workshop activities — Lippan Art, Tie and Dye, Boho Canvas, Mandala Art, and more. Every participant takes a finished artwork home. Groups from 20 to 200+ are accommodated.</p>
      <h2>2–10. Other options</h2>
      <p>The full list includes Escape Rooms, Cooking Competitions, Pottery workshops, Photography Walks, Indoor Sports Days, Improv Workshops, Scavenger Hunts, Board Game sessions, and Mixology events — each assessed on group size flexibility and real team outcomes.</p>
      <h2>Book a workshop for your Gurgaon team</h2>
      <p>Kraftykinni runs art workshops for corporate teams across Gurgaon, Delhi, and Noida. All materials are included. Starting at ₹600 per person. Contact us to discuss your event date and preferred activity.</p>
    `,
  },

  {
    path: '/blog/annual-day-activity-ideas-schools-delhi-ncr/',
    title: 'Annual Day Activity Ideas for Schools in Delhi NCR | Kraftykinni',
    description: '8 art-based annual day activity ideas for schools in Delhi NCR. Structured, mess-free, and designed for 50–300 students. Led by a Fevicryl-certified artist.',
    h1: 'Annual Day Activity Ideas for Schools in Delhi NCR (Art-Based Edition)',
    bodyContent: `
      <h1>Annual Day Activity Ideas for Schools in Delhi NCR (Art-Based Edition)</h1>
      <p>Most schools start planning their annual day in April or May. This list focuses on art-based activities — structured, led by a trained facilitator, and scaled to school group sizes. Each one works for 50 to 300 students and produces a finished piece every participant takes home.</p>
      <h2>1. Tote Bag Painting</h2>
      <p>Students paint fabric tote bags using stencils and fabric colours — a personalised bag they will actually use. Scales to 100+ students simultaneously and photographs well for school newsletters.</p>
      <h2>2. Block Printing</h2>
      <p>Carved wooden blocks, fabric colours, and cotton cloth. Students stamp repeat patterns and take home a finished fabric piece. Connected to India textile heritage with strong cross-curricular value.</p>
      <h2>3. Mandala Art</h2>
      <p>Geometric mandala patterns built from the centre outward using dotting tools and acrylic paint. Meditative, structured, and produces results that look far more impressive than the effort involved.</p>
      <h2>4. Lippan Art</h2>
      <p>A centuries-old Kutch folk craft involving clay and mirror work. One of the most culturally rich activities — art teachers appreciate the cross-curricular depth.</p>
      <h2>5. Canvas Pouch Painting</h2>
      <p>Good for younger students or shorter time slots of 60 to 75 minutes. Low-pressure, immediately usable, affordable to run at scale.</p>
      <h2>6. Tie and Dye</h2>
      <p>Vibrant, energetic, and genuinely exciting. The reveal moment when bindings come off is always memorable. No two pieces ever turn out identically.</p>
      <h2>7. Clay Art</h2>
      <p>The most tactile activity on this list. Students build small decorative pieces with air-dry clay — forgiving material that works across a wide skill range.</p>
      <h2>8. Glass Painting</h2>
      <p>Transparent glass paint on tiles or bottles creates stained-glass-style pieces. Works well as a competition format.</p>
      <h2>Book an art workshop for your school annual day</h2>
      <p>Kraftykinni runs structured art workshops for schools across Delhi, Gurgaon, and Noida. All materials included. Groups from 30 to 300+ students. Starting at Rs 600 per student. Contact us to discuss your annual day date.</p>
    `,
  },

  {
    path: '/blog/art-workshop-ideas-birthday-party-delhi-ncr/',
    title: 'Art Workshop Ideas for Birthday Parties Delhi NCR | Kraftykinni',
    description: 'Planning a birthday party in Delhi NCR? Art workshops make every guest create something and take it home. 5 activity options, ₹600/person, all materials included.',
    h1: 'Art Workshop Ideas for Birthday Parties in Delhi NCR',
    bodyContent: `
      <h1>Art Workshop Ideas for Birthday Parties in Delhi NCR</h1>
      <p>An art workshop changes the structure of a birthday party. Instead of a room full of people waiting for the food or half-listening to music, you get 15 to 40 people deeply absorbed in the same task — talking, comparing, helping each other, laughing at their own results. Every guest walks out with a finished artwork in hand, something they made that evening.</p>
      <h2>Best Activities for a Birthday Party</h2>
      <h3>Lippan Art</h3>
      <p>The standout choice for adult birthday parties. Participants press clay patterns and embed decorative mirrors onto a board — the finished piece is display-worthy and deeply conversational. Works for groups of 15 to 60.</p>
      <h3>Tote Bag Painting</h3>
      <p>Relaxed, easy, and always a hit. Guests paint fabric tote bags using acrylic colours and stencils. Works for mixed-age groups of 20 to 100.</p>
      <h3>Mandala Art</h3>
      <p>The right choice for milestone birthdays and wellness-themed celebrations. Meditative, absorbing, and produces impressive results regardless of artistic background.</p>
      <h3>Tie and Dye</h3>
      <p>High energy, vibrant, and exciting. The reveal moment when the ties come undone is genuinely dramatic. Best for younger adult groups and bachelorette parties.</p>
      <h3>Canvas Pouch Painting</h3>
      <p>The compact option for tighter budgets. Guests paint a small canvas pouch — practical, personal, and usable every day.</p>
      <h2>Book an Art Workshop for Your Birthday Party in Delhi NCR</h2>
      <p>Kraftykinni runs private art workshops for birthday parties, kitty parties, bachelorette celebrations, and baby showers across Delhi, Gurgaon, and Noida. Starting at ₹600 per person, all materials included. Contact us via WhatsApp or the contact form to discuss your date.</p>
    `,
  },
  {
    path: '/blog/bottle-lamp-art-workshop-school-delhi-ncr/',
    title: 'Bottle Lamp Art Workshop for Schools Delhi NCR | Kraftykinni',
    description: 'See how Jaypee Public School Noida ran a Bottle Lamp Art session for 150+ students using Fevicryl Mouldit & Acrylic Colours. A guide for schools planning art activities in Delhi NCR.',
    h1: 'Bottle Lamp Art Workshop for Schools: How Jaypee Public School Noida Did It',
    bodyContent: `
      <h1>Bottle Lamp Art Workshop for Schools: How Jaypee Public School Noida Did It</h1>
      <p>The Hindustan Times Lit Fest Preview at Jaypee Public School, Greater Noida, needed an art activity that would run simultaneously for over 150 students — clear steps, no prior skill required, and a finished piece every student could carry home. The answer was Bottle Lamp Art: glass bottles transformed into decorative lamps using Fevicryl Mouldit epoxy compound and Acrylic Colours.</p>
      <h2>What is Bottle Lamp Art?</h2>
      <p>Bottle Lamp Art transforms a plain glass bottle into a textured, painted decorative lamp. The surface is built up using Fevicryl Mouldit — a two-part epoxy compound — to create raised patterns directly on the bottle. Once set, the surface is painted with Fevicryl Acrylic Colours and finished with metallic accents. Mouldit sets fast enough that students complete a full piece in one 90-minute session, with no overnight drying required.</p>
      <h2>Materials Used</h2>
      <p>Fevicryl Mouldit two-part epoxy compound and Fevicryl Acrylic Colours are the core materials. All supplies — bottles, Mouldit, paints, brushes, aprons, and newspaper workspace covers — are provided by Kraftykinni. Schools supply only the venue, tables, and chairs.</p>
      <h2>How the Session Ran — Step by Step</h2>
      <p>Stage 1: Base coat on the entire bottle surface (10 minutes). Stage 2: Mouldit pattern application — flowers, geometric lines, spirals, or sculptural motifs (25 minutes). Stage 3: Detail painting in contrasting Acrylic Colours while Mouldit sets (20 minutes). Stage 4: Gold and silver highlight touches and group display photograph (15 minutes). Every student completed a finished piece in 90 minutes.</p>
      <h2>Why Bottle Lamp Art Works at Scale for Schools</h2>
      <p>Bottle Lamp Art is self-paced — faster workers add more intricate detail, slower workers produce cleaner shapes. Both look intentional. The bottle shape guides design decisions for students who say they cannot draw. The upcycling angle adds purpose that works especially well for sustainability-themed events, Earth Day programmes, and environment club activities. For school art workshops across Delhi NCR, it ranks alongside Mandala Art and Tote Bag Painting as one of the most reliable large-group formats.</p>
      <h2>Book a Bottle Lamp Art Workshop for Your School</h2>
      <p>Bottle Lamp Art is one of Kraftykinni's 13 signature school workshop activities, conducted by Shramita Govil, Fevicryl Certified Artist. Groups from 30 to 300+ students. Pricing from ₹600 per student, all materials included. Available across Delhi, Gurgaon, and Noida. WhatsApp +91 9599622210 or book via kraftykinni.in/school-workshops.</p>
    `,
  },


  {
    path: '/blog/mothers-day-art-workshop-gift-delhi-ncr/',
    title: "Mother's Day Art Workshop Delhi NCR — Unique Gift Ideas 2026 | Kraftykinni",
    description: "Skip the flowers. Gift an art workshop experience this Mother's Day in Delhi, Gurgaon & Noida. Lippan Art, Bottle Lamp, Clay — from ₹600/person, all materials included.",
    h1: "Mother's Day Art Workshop Gift Ideas in Delhi NCR — Make Something She'll Keep",
    bodyContent: `
      <h1>Mother's Day Art Workshop Gift Ideas in Delhi NCR — Make Something She'll Keep</h1>
      <p>Flowers wilt by Tuesday. But a Lippan Art plaque with "MOM" raised in gold on teal clay goes on the shelf and stays there. This Mother's Day (May 10, 2026), give her an experience she makes with her own hands — a guided art workshop in Delhi, Gurgaon, or Noida that produces a keepsake she takes home and keeps for years.</p>
      <h2>Why an Art Workshop Works as a Mother's Day Gift</h2>
      <p>In a guided art session, she is not a passive recipient — she is shaping clay, placing mirrors, painting a bottle, mixing colours. The process itself is the experience: absorbing, tactile, and genuinely calming. The finished piece she takes home carries the memory of the afternoon. Kraftykinni sessions accommodate groups from 10 to 100+ with all materials included from Rs 600 per person.</p>
      <h2>Best Workshops for Mother's Day</h2>
      <p>Lippan Art: a Kutch folk craft where raised clay patterns and embedded mirrors create a striking wall piece. Kraftykinni creates custom MOM and Maa motif Lippan plaques as keepsakes. Bottle Lamp Art: participants paint a glass bottle with an Indian motif, sunset scene, or floral design. Clay Art: tactile and therapeutic, producing handmade sculpted keepsakes in a single 1.5 to 2 hour session.</p>
      <h2>Private Mother's Day Workshops in Delhi NCR</h2>
      <p>Kraftykinni runs private sessions for groups of 15 to 100+ at a venue of your choice — home, community hall, club, or residential complex. All sessions facilitated by Shramita Govil, Fevicryl Certified Artist. Pricing from Rs 600 per person, all materials included. Online workshops with shipped kits available pan-India. WhatsApp +91 9599622210 to book.</p>
    `,
  },

  {
    path: '/blog/clay-trinket-painting-workshop-cars24-gurgaon/',
    title: 'Clay Trinket Painting Workshop at Cars24 Gurgaon — Corporate Art Session | Kraftykinni',
    description: '40 Cars24 employees in Gurgaon made hand-painted clay trinkets using Fevicryl Mouldit. A relaxed, creative team activity that produced something real. Read the full workshop recap.',
    h1: 'Clay Trinket Painting Workshop at Cars24 Gurgaon — 40 Participants, One Relaxing Afternoon',
    bodyContent: `<h1>Clay Trinket Painting Workshop at Cars24 Gurgaon — 40 Participants, One Relaxing Afternoon</h1>
      <p>On 29 April 2026, 40 Cars24 employees in Gurgaon sat down at tables covered in newspaper, picked up brushes, and spent two hours making hand-painted clay trinkets. They had no art experience requirement. They had Fevicryl Mouldit clay, a set of acrylic colours, and a facilitator walking them through every step. By the end, every single person left holding something they made themselves.</p>
      <h2>What is Clay Trinket Painting?</h2>
      <p>Clay Trinket Painting is a Kraftykinni workshop where participants shape and paint small decorative objects using Fevicryl Mouldit air-dry clay. Mouldit is a professional-grade modelling compound that air-dries to a firm, paintable surface — no kiln, no specialist equipment required. Participants shape their trinket — a heart, a circle, a free-form dish — let it set slightly, then paint it with Fevicryl acrylic colours using fine brushes. The result is a small, personal, handmade object that feels genuinely crafted, not like a generic craft kit.</p>
      <h2>How the Cars24 Session Ran</h2>
      <p>Shramita arrived at the Cars24 Gurgaon office with all materials: Fevicryl Mouldit clay packs, acrylic colour sets, brushes, water cups, palette plates, and newspaper table covers. Setup took 20 minutes. Participants were seated in groups of four to five at tables — a layout that naturally encouraged conversation and colour-sharing without forcing interaction. Shramita opened with a five-minute demonstration: how to condition the clay, how to shape it without cracking, how to create smooth edges. Then the room got to work. What followed was two hours of focused, low-pressure creativity. Some participants painted detailed patterns — cherries, strawberries, geometric lines. Others went abstract. A few spent the first 20 minutes shaping their clay with obvious care before picking up a brush. Nobody asked whether they were doing it right.</p>
      <h2>What 40 Corporate Participants Made</h2>
      <p>Heart-shaped trinket dishes with floral and fruit motifs. Round coaster-style pieces with landscape paintings. Abstract colour-block objects. Character illustrations on clay surfaces. Every participant's trinket was different because every decision — the shape, the palette, the subject — was entirely theirs. That is the consistent outcome of Clay Trinket Painting: 40 people in the same room with the same materials, and 40 completely distinct finished objects.</p>
      <h2>Why It Worked for a Corporate Team</h2>
      <p>Corporate art workshops work because they lower the social stakes. There is no scoreboard, no performance, no seniority. When a director and a junior analyst are both trying to figure out how to paint a strawberry on a clay heart, hierarchy disappears. The shared technical challenge — and the shared mild confusion — levels the room. By the time people are comparing finished pieces, they have been talking naturally for two hours. That is what team-building actually looks like when it works. Cars24 ran this session mid-week, and the feedback from participants was consistent: it was relaxing in a way they did not expect a work activity to be. The combination of working with clay (tactile, grounding) and painting (focused, absorbing) produces a genuine decompression effect. Participants described it as calming without being passive — they were making something real.</p>
      <h2>Book a Similar Workshop for Your Team</h2>
      <p>Kraftykinni runs Clay Trinket Painting sessions for corporate groups across Delhi, Gurgaon, and Noida. All materials are provided and included in the price. Shramita handles setup and cleanup — your team just needs tables, chairs, and two hours. Groups from 20 to 200+. Pricing from Rs 600 per person. WhatsApp +91 9599622210 or visit kraftykinni.in to book.</p>
    `,
  },

  {
    path: '/blog/summer-art-workshop-for-schools-delhi-ncr/',
    title: 'Summer Art Workshop for Schools Delhi NCR — Planning Guide | Kraftykinni',
    description: 'Planning a summer art workshop for your school in Delhi NCR? Guide covers best activities, age groups, group sizes & what to expect. Facilitator travels to you. ₹600/student.',
    h1: 'Summer Art Workshops for Schools in Delhi NCR — A Complete Planning Guide',
    bodyContent: `<h1>Summer Art Workshops for Schools in Delhi NCR — A Complete Planning Guide</h1>
      <p>Summer is the one window in the school calendar where there's room to try something outside the syllabus. No exam pressure, smaller groups, and students who actually want to be there — the conditions for a genuinely great workshop are perfect. Over the past two years, Kraftykinni has run summer art workshops at schools across Delhi, Gurgaon, and Noida — from single half-day sessions for 30 students to multi-day programmes for 300+ across different grade batches.</p>
      <h2>Why a Summer Workshop Is Different from a Regular School Art Session</h2>
      <p>The best school art workshops happen when students are not being assessed. Summer workshops remove that pressure entirely. Students attend because they want to, and the facilitator is an external artist rather than the class teacher. Both conditions change the energy in the room significantly.</p>
      <h2>Photo Frame Craft — the Standout Summer Activity for Schools</h2>
      <p>Photo frame making has become one of the most requested summer activities for schools in Delhi NCR. Every student works with craft materials — popsicle sticks, acrylic colours, Fevicryl clay, mirrors, and decorative elements — to build and personalise a photo frame they can place their own photograph in. The result is functional, personal, and immediately meaningful.</p>
      <h2>Lippan Art — the Top Pick for Senior School Groups (Classes 7–12)</h2>
      <p>For senior school groups, Lippan Art consistently produces the strongest outcomes. The craft requires patience and precision, which engages older students differently from a painting task. The finished pieces look genuinely impressive — the mirror-work effect is dramatic and display-ready.</p>
      <h2>Mandala Art — the Ideal Activity for Mixed-Ability Groups</h2>
      <p>Mandala Art works well for summer school workshops because it democratises artistic ability. Students build concentric geometric patterns using dotting tools and acrylic paint. The activity is genuinely meditative, and teachers frequently comment that they see usually restless students become completely absorbed.</p>
      <h2>Bottle Lamp Art — the High-Impact Activity for School Events</h2>
      <p>Students decorate glass bottles using Fevicryl Mouldit clay and acrylic colours, transforming them into decorative lamps. The upcycling narrative gives teachers a curriculum connection point. At Jaypee Public School in Noida, 150+ students completed Bottle Lamp Art pieces in a single afternoon session.</p>
      <h2>Tie & Dye — the Activity That Works for Any Age</h2>
      <p>For primary school students (Class 3 and below), Tie & Dye is the most reliable choice. The moment of reveal — when students untie their fabric and see what they have created — is one of the most reliably joyful moments in a school workshop context.</p>
      <h2>Book a Summer Workshop for Your School</h2>
      <p>Kraftykinni runs summer art workshops for schools across Delhi, Gurgaon, and Noida. All materials are included. Groups from 30 students to full school batches of 300+. Starting at ₹600 per student. WhatsApp +91 9599622210 or visit kraftykinni.in/school-workshops to enquire.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What is the best summer art activity for school students in Delhi NCR?</h3>
      <p>For primary school students (Class 3–5), Tie & Dye and Photo Frame Craft work best. For middle and senior school students (Class 6–12), Lippan Art and Mandala Art consistently produce the most impressive finished pieces.</p>
      <h3>How much does a summer art workshop for a school cost in Delhi NCR?</h3>
      <p>Kraftykinni charges ₹600 to ₹800 per student with all materials included. Smaller batches of 30–50 students are priced at ₹800 per student; batches of 50–100 at ₹700; batches above 100 at ₹600.</p>
      <h3>Can Kraftykinni conduct a summer workshop at our school premises?</h3>
      <p>Yes. All materials, table covers, aprons, and cleanup supplies are transported and managed by the facilitator. You only need to provide tables, chairs, and the space.</p>
      <h3>How far in advance should we book a summer school workshop?</h3>
      <p>May and early June are the busiest months. For dates in this period, booking 4–6 weeks in advance is strongly recommended.</p>
      <h3>What grade levels are suitable for a school summer art workshop?</h3>
      <p>Kraftykinni runs workshops for students from Class 3 through Class 12 and college groups. Activity recommendations are tailored by age group.</p>
      <h3>Can a summer art workshop be integrated into an existing school summer camp programme?</h3>
      <p>Yes — many schools in Delhi NCR use Kraftykinni for one or two art sessions within a broader summer camp timetable. Sessions run for 90 minutes per batch.</p>
    `,
  },

  {
    path: '/blog/fathers-day-gift-ideas-art-workshop-delhi-ncr-2026/',
    title: "Father's Day Gift Ideas 2026 — Art Workshop Delhi NCR | Kraftykinni",
    description: "Skip the boring tie. This Father's Day (15 June 2026), gift Dad a handmade Fevicryl Mouldit Clay Fridge Magnet, Father's Day Special Bottle Art, Clay Bottle Art, or Clay Trinket workshop experience in Delhi NCR. From ₹600/person.",
    h1: "Father's Day Gift Ideas 2026 — Handmade Art Workshops in Delhi NCR",
    bodyContent: `<h1>Father's Day Gift Ideas 2026 — Handmade Art Workshops in Delhi NCR</h1>
      <p>A tie he won't wear. A grooming kit he has three of. A "World's Best Dad" mug that joins the other two in the back of the cupboard. Father's Day is 15 June 2026. Kraftykinni workshops solve this in two ways: you can create a handmade gift for him — a Fevicryl Mouldit Clay Fridge Magnet, Father's Day Special Bottle Art piece, Clay Bottle Art décor, or a handmade Clay Trinket — in a guided session. Or you can gift him the experience itself: a shared afternoon where Dad gets to make something with his own hands.</p>
      <h2>Why a Handmade Gift Lands Differently on Father's Day</h2>
      <p>Most Father's Day gifts are purchases — perfectly fine, and perfectly forgettable inside two weeks. A handmade gift carries something different: the visible fact that someone spent time and attention making it. The imperfection is part of the message. Kraftykinni sessions produce exactly this kind of object. They're not craft kits where you assemble pre-cut pieces. You shape the clay, apply the Mouldit, mix the colours, and make the decisions. The result is yours — and when you give it to your father, he knows it too.</p>
      <h2>Best Kraftykinni Workshops for Father's Day Gifts</h2>
      <p>Four activities produce the strongest Father's Day results — each for different reasons and different creative abilities.</p>
      <h3>1. Fevicryl Mouldit Clay Fridge Magnet — a handmade keepsake Dad will actually keep</h3>
      <p>Participants use Fevicryl Mouldit clay and acrylic colours to create customised fridge magnets with personalised Father's Day themes and messages — "Dad", hearts, flowers, messages, or decorative elements that reflect your father's personality. Beginner-friendly, relaxing, and highly personalised. Duration: 60 to 90 minutes. Works well for personal sessions and private groups of 15–60 participants.</p>
      <h3>2. Father's Day Special Bottle Art — creative handmade bottle décor for Dad</h3>
      <p>Father's Day Special Bottle Art transforms ordinary bottles into beautiful handmade art pieces using paints, textures, and decorative detailing. Participants paint and customise bottles with Father's Day themes, messages, and personalised creative designs. Every participant creates their own unique design, making each bottle a one-of-a-kind Father's Day keepsake.</p>
      <h3>3. Clay Bottle Art — artistic handmade bottle decoration workshop</h3>
      <p>Clay Bottle Art combines bottle decoration with creative clay detailing techniques to produce aesthetic handmade décor pieces. Participants work with clay textures, acrylic colours, and artistic embellishments to transform simple bottles into personalised Father's Day creations. Duration: 1.5 to 2 hours with all materials included.</p>
      <h3>4. Clay Trinket — a small handmade Father's Day keepsake</h3>
      <p>Clay Trinket workshops create small handmade decorative keepsakes for Father's Day gifting. Participants learn simple clay crafting techniques to create personalised trinkets using textures, colours, and creative decorative elements. Works especially well for children, beginners, school workshops, and family-friendly Father's Day events.</p>
      <h2>How to Book a Father's Day Workshop in Delhi NCR</h2>
      <p>Kraftykinni runs private Father's Day workshop sessions for groups of 10 to 100+ participants across Delhi, Gurgaon, and Noida. Sessions come to you — at home, at a residential club, at an office, or at any hired venue. All materials are brought and set up by the facilitator. Pricing from ₹600 per person with all materials included. All sessions are led by Shramita Govil, Fevicryl Certified Artist. WhatsApp +91 9599622210 to book. Minimum 7 days notice required; 2–3 weeks recommended for June dates.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What are the best handmade Father's Day gift ideas from an art workshop in Delhi NCR?</h3>
      <p>The most popular handmade Father's Day gifts from Kraftykinni workshops are Fevicryl Mouldit Clay Fridge Magnets, Father's Day Special Bottle Art pieces, Clay Bottle Art décor, and handmade Clay Trinkets. All can be made in a single guided session of 90 minutes to 2 hours, with all materials included from ₹600 per person.</p>
      <h3>Can I book a private Father's Day art workshop for a family group in Delhi NCR?</h3>
      <p>Yes. Kraftykinni runs private sessions for groups from 10 to 100+ participants at your home, club, residential society, or any venue in Delhi, Gurgaon, or Noida. All materials are brought to you. WhatsApp +91 9599622210 with your date, group size, and preferred activity. Minimum 7 days notice required.</p>
      <h3>How much does a Father's Day art workshop cost in Delhi NCR?</h3>
      <p>Kraftykinni Father's Day workshops start at ₹600 per person with all materials included — clay, paints, brushes, workspace covers, and a take-home finished piece. Private groups of 10–25 participants are the most popular format for families.</p>
    `,
  },

  // ── Workshop detail pages ─────────────────────────────────────────────────
  {
    path: '/workshops/lippan-art/',
    title: 'Lippan Art Workshop Delhi NCR — Kutch Mirror Work | Kraftykinni',
    description: 'Lippan Art workshop in Delhi NCR by Kraftykinni. Traditional Kutch mirror work in a guided group session. Corporate team building, schools & private events. All materials included. ₹600–₹800/person.',
    h1: 'Lippan Art Workshop in Delhi NCR',
    bodyContent: `<h1>Lippan Art Workshop in Delhi NCR</h1><p>Lippan Art is a centuries-old folk craft from the Kutch region of Gujarat where artisans use clay and mirror work to create intricate wall decorations. In our Lippan Art workshop, participants experience this meditative craft firsthand — shaping clay patterns, embedding mirrors, and creating a piece of genuine Indian heritage they can take home. It is one of our most requested activities for corporate teams and school groups alike.</p><h2>What you make</h2><p>A finished Lippan Art wall piece with clay patterning and embedded mirrors — a unique, display-ready piece of folk art.</p><h2>Who it is for</h2><p>Perfect for corporate team-building events, school art days, college fests, and private parties. No prior art experience needed. Duration: 2 to 2.5 hours. Group size: 20 to 200+ participants. Location: Delhi, Gurgaon, Noida and online pan-India. All materials included. Pricing from ₹600 per person.</p><h2>Why this activity works for corporate teams</h2><p>The meditative, repetitive nature of shaping clay and placing mirrors creates a calm, focused atmosphere — a rare and valuable contrast to the pace of corporate life. Every participant produces a strikingly beautiful piece, regardless of prior art experience. Lippan Art is one of the highest-rated activities in participant feedback across all 13 Kraftykinni workshops.</p>`,
  },
  {
    path: '/workshops/mandala-art/',
    title: 'Mandala Art Workshop Delhi NCR — Stress Relief & Team Building | Kraftykinni',
    description: 'Mandala Art workshop in Delhi NCR by Kraftykinni. Meditative, stress-relieving mandala painting sessions for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    h1: 'Mandala Art Workshop in Delhi NCR',
    bodyContent: `<h1>Mandala Art Workshop in Delhi NCR</h1><p>Mandala art is one of the most universally loved art forms — symmetrical, meditative, and endlessly satisfying to create. Our Mandala Art workshops guide participants through building their own mandala from the centre outward, using dotting tools, colours, and repetitive patterns that calm the mind and engage full attention. Popular as a corporate wellness activity and equally loved by school students.</p><h2>What you make</h2><p>A colourful, symmetric mandala artwork on canvas or paper — a beautiful piece to display or gift.</p><h2>Who it is for</h2><p>Ideal for corporate wellness sessions, mental health awareness events, school art days, and team-building retreats. Duration: 1.5 to 2 hours. Pricing from ₹600 per person. All materials included.</p><h2>Why mandala art works as a corporate activity</h2><p>Scientific research consistently links repetitive pattern-making with reduced cortisol levels and improved focus. For HR teams planning a wellness day, a mindfulness workshop, or simply a positive break from the work week, Mandala Art delivers measurable impact alongside a beautiful physical takeaway.</p>`,
  },
  {
    path: '/workshops/tie-and-dye/',
    title: 'Tie & Dye Workshop Delhi NCR — High-Energy Team Activity | Kraftykinni',
    description: 'Tie & Dye workshop in Delhi NCR by Kraftykinni. High-energy fabric dyeing sessions for corporate teams, schools & private events. Wearable takeaway. All materials included. ₹600–₹800/person.',
    h1: 'Tie & Dye Workshop in Delhi NCR',
    bodyContent: `<h1>Tie and Dye Workshop in Delhi NCR</h1><p>Tie and Dye is the workshop that fills a room with laughter, colour, and energy. Participants fold, twist, and bind fabric before applying vibrant dyes — and every single piece turns out uniquely different. Because the outcome is a wearable item — a t-shirt, dupatta, or tote — participants carry the memory of the event into their daily lives long after the workshop ends.</p><h2>What you make</h2><p>A one-of-a-kind tie-dye fabric item — t-shirt, tote bag, or dupatta — to wear and keep.</p><h2>Who it is for</h2><p>Best for high-energy corporate events, college fests, team outings, and large group gatherings of 50 to 200+ people. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p><h2>Why Tie and Dye is popular for large corporate events</h2><p>Unlike most art activities, Tie and Dye creates visible, energetic activity across a room. The process is visual, tactile, and social — groups naturally interact and compare results. For annual day events, outdoor corporate events, and high-energy onboarding programmes, Tie and Dye is consistently the highest-energy option in the Kraftykinni catalogue.</p>`,
  },
  {
    path: '/workshops/boho-canvas/',
    title: 'Boho Canvas Art Workshop Delhi NCR — Abstract Painting | Kraftykinni',
    description: 'Boho Canvas Art workshop in Delhi NCR by Kraftykinni. Guided abstract canvas painting sessions for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    h1: 'Boho Canvas Art Workshop in Delhi NCR',
    bodyContent: `<h1>Boho Canvas Art Workshop in Delhi NCR</h1><p>Boho Canvas Art combines warm earthy tones, abstract composition, and layered textures into a painting style that looks impressive but requires no drawing skills. Participants learn to blend colours, layer shapes, and create the bohemian aesthetic that has become one of the most popular contemporary art styles for home décor. Each canvas is unique to the person who painted it.</p><h2>What you make</h2><p>A finished boho-style canvas painting in earthy, warm tones — ready to hang at home or gift.</p><h2>Who it is for</h2><p>Popular choice for corporate team events, art days at schools and colleges, and private birthday or kitty parties. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },
  {
    path: '/workshops/bottle-lamp-art/',
    title: 'Bottle Lamp Art Workshop Delhi NCR — Upcycling Craft | Kraftykinni',
    description: 'Bottle Lamp Art workshop in Delhi NCR by Kraftykinni. Transform glass bottles into glowing fairy-light lamps. Corporate & school sessions. All materials included. ₹600–₹800/person.',
    h1: 'Bottle Lamp Art Workshop in Delhi NCR',
    bodyContent: `<h1>Bottle Lamp Art Workshop in Delhi NCR</h1><p>Bottle Lamp Art is one of our most magical workshops — participants paint and decorate glass bottles, which are then fitted with fairy lights to create glowing home décor pieces. It blends sustainability through upcycling, creativity, and a deeply satisfying result. When the lights come on at the end of the session, the room transforms.</p><h2>What you make</h2><p>A hand-painted glass bottle lamp with fairy lights — a glowing, functional piece of home décor.</p><h2>Who it is for</h2><p>Great for corporate gifting events, school craft days, private parties, and eco-themed corporate events. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },
  {
    path: '/workshops/block-printing/',
    title: 'Block Printing Workshop Delhi NCR — Traditional Indian Craft | Kraftykinni',
    description: 'Block Printing workshop in Delhi NCR by Kraftykinni. Learn traditional Indian block printing on fabric. Corporate & school sessions. All materials included. ₹600–₹800/person.',
    h1: 'Block Printing Workshop in Delhi NCR',
    bodyContent: `<h1>Block Printing Workshop in Delhi NCR</h1>
      <p>Block Printing is one of India's most treasured textile traditions, originating in Rajasthan and Gujarat over 500 years ago. Participants learn to apply fabric colours using carved wooden blocks to create repeat patterns on cloth — a rhythmic, meditative process that produces strikingly beautiful results. Popular both as a cultural heritage activity and as a stress-relief exercise for corporate teams.</p>
      <h2>The History of Block Printing in India</h2>
      <p>Indian block printing traces its roots to 12th-century Rajasthan, where artisans in towns like Bagru, Sanganer, and Barmer developed distinct regional styles using natural dyes and hand-carved teak blocks. The craft flourished under Mughal patronage and became a key export commodity during the colonial period — European demand for Indian printed textiles directly influenced global fashion for over two centuries.</p>
      <p>Today, block printing remains a living craft tradition. Jaipur's printing districts still produce hand-block-printed fabric at commercial scale, using the same basic techniques participants learn in a Kraftykinni workshop. Running a block printing session in Delhi NCR is not just a craft activity — it is a direct connection to one of India's most significant industrial and artistic heritage traditions.</p>
      <h2>What You Make</h2>
      <p>A block-printed fabric item — tote bag, cotton dupatta, or fabric panel — in traditional or contemporary patterns. Participants choose from a selection of pre-carved wooden and foam blocks, select their fabric colour palette, and build up a repeat pattern across their fabric. Because hand-stamping naturally varies in pressure and alignment, every piece is genuinely unique — no two participants produce an identical result even using the same block.</p>
      <p>Fabric colours dry within 15 to 20 minutes and are heat-set, meaning the printed fabric is wash-fast and suitable for regular use. Participants can handle and fold their finished pieces before the session ends.</p>
      <h2>Who Benefits Most</h2>
      <p>Block Printing is the top heritage craft choice for corporate cultural events, India-themed office programmes, and school heritage day activities. For corporates, it combines the engagement of a hands-on creative activity with genuine cultural depth — participants leave knowing something real about Indian textile history, not just with a craft souvenir. For schools, it provides a natural cross-curricular link to history, geography, and social studies units on Indian heritage crafts.</p>
      <p>The rhythmic stamping process is deeply calming — it is one of the most frequently cited activities for stress relief in post-workshop feedback. Groups that arrive stressed or distracted consistently settle into focused, quiet engagement within the first 10 minutes of stamping.</p>
      <h2>Internal Link — Corporate Art Workshops</h2>
      <p>Block Printing is one of 13 activities available through Kraftykinni's <a href="/corporate-art-workshops/">corporate art workshop</a> programme. It is particularly popular for India Heritage Day events, cultural immersion programmes, and sustainability-themed corporate days.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What is Block Printing?</h3>
      <p>A traditional Indian textile art form from Rajasthan and Gujarat, where carved wooden or foam blocks are dipped in fabric colour and stamped onto cloth to create repeat patterns. One of India's oldest craft traditions, still commercially practised in Jaipur and Sanganer.</p>
      <h3>What do participants make in a Block Printing workshop?</h3>
      <p>A block-printed fabric item — tote bag, cotton dupatta, or fabric panel. Every piece is unique because hand-stamping produces natural variation in pressure and alignment.</p>
      <h3>Is Block Printing suitable for corporate team-building?</h3>
      <p>Yes — it is one of the top heritage craft activities for corporate cultural programmes in Delhi NCR. The rhythmic stamping process is calming, the Indian craft context provides cultural depth, and every participant takes home a finished fabric piece.</p>
      <h3>How long does a Block Printing workshop take?</h3>
      <p>1.5 to 2 hours — introduction to history and technique, facilitator demonstration, hands-on stamping, and a drying phase before participants pack their finished pieces.</p>
      <h3>What is the cost of a Block Printing workshop in Delhi NCR?</h3>
      <p>₹600 per person for groups of 100+, ₹700 per person for 50–100, and ₹800 per person for groups of 20–50. All materials — blocks, fabric colours, fabric items, and aprons — are included.</p>`,
  },
  {
    path: '/workshops/clay-art/',
    title: 'Clay Art Workshop Delhi NCR — Therapeutic Sculpting | Kraftykinni',
    description: 'Clay Art workshop in Delhi NCR by Kraftykinni. Hands-on clay sculpting sessions for corporate teams, schools & private events. All materials included. ₹600–₹800/person.',
    h1: 'Clay Art Workshop in Delhi NCR',
    bodyContent: `<h1>Clay Art Workshop in Delhi NCR</h1><p>Working with clay is one of the most grounding, stress-relieving creative experiences available. Our Clay Art workshops guide participants through sculpting small 3D objects — decorative bowls, figures, jewellery holders, or fridge magnets — using air-dry clay. The tactile nature of the material engages the nervous system and produces a state of calm focus that participants often describe as genuinely therapeutic.</p><h2>What you make</h2><p>A handcrafted clay sculpture or functional object — air-dried and ready to take home.</p><h2>Who it is for</h2><p>Ideal for corporate wellness days, school art sessions, stress management workshops, and mindfulness events. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },
  {
    path: '/workshops/glass-painting/',
    title: 'Glass Painting Workshop Delhi NCR — Translucent Art | Kraftykinni',
    description: 'Glass Painting workshop in Delhi NCR by Kraftykinni. Learn glass painting techniques in a guided group session. Corporate, school & private events. All materials included. ₹600–₹800/person.',
    h1: 'Glass Painting Workshop in Delhi NCR',
    bodyContent: `<h1>Glass Painting Workshop in Delhi NCR</h1><p>Glass Painting produces some of the most visually spectacular results of any workshop activity — translucent colours that glow when light passes through them. Participants paint directly onto glass surfaces using special glass paints, creating geometric or floral patterns that look stunning on display. It is a medium that most people have never tried, which makes the experience feel novel and memorable.</p><h2>What you make</h2><p>A hand-painted glass piece — a frame, bottle, or panel — with translucent painted designs.</p><h2>Who it is for</h2><p>Popular at corporate events, school art days, and private parties. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },
  {
    path: '/workshops/texture-art/',
    title: 'Texture Art Workshop Delhi NCR — Beginner-Friendly | Kraftykinni',
    description: 'Create a layered texture canvas using tissue, acrylic & mixed media. Beginner-friendly. Corporate teams, schools & private events. All materials included. Delhi NCR. From ₹600/person.',
    h1: 'Texture Art Workshop in Delhi NCR',
    bodyContent: `<h1>Texture Art Workshop in Delhi NCR</h1>
      <p>Texture Art uses layered materials — tissue paper, acrylic paste, fabric scraps, and paint — to build deeply tactile canvases with real physical dimension. Because the process is abstract and exploratory, there is no wrong way to do it, making it ideal for participants who feel intimidated by art. The results consistently surprise people — what begins as a messy layering process resolves into rich, gallery-quality wall art.</p>
      <h2>What is Texture Art?</h2>
      <p>Texture Art is a mixed-media painting technique that builds up layers of material on a canvas to create physical dimension and depth. Unlike flat painting, Texture Art uses acrylic paste, tissue paper, palette knives, and fabric elements to create surfaces you can feel as well as see. The technique originated in contemporary Western abstract art but has become one of the most accessible beginner workshop formats because the abstract nature of the outcome means every piece looks intentional and beautiful — regardless of the maker's skill level.</p>
      <p>In a Kraftykinni session, Shramita Govil guides participants through the layering process step by step: base coat application, tissue layering, paste build-up, colour washing, and final detailing. The session runs 1.5 to 2 hours and every participant completes a finished, display-ready canvas to take home.</p>
      <h2>What You Make</h2>
      <p>A layered, textured mixed-media canvas — unique, abstract, and display-ready. Dimensions are typically A3 (30cm × 42cm) or canvas board. Because every participant builds their own layers independently, no two canvases in the same session look alike. The finished pieces are suitable for framing and home display.</p>
      <h2>Why Texture Art Works for Corporate Teams</h2>
      <p>Texture Art is one of the top three corporate activities in the Kraftykinni catalogue. The reason is straightforward: it removes the fear of drawing. In representational art workshops, participants who feel they cannot draw become anxious. In Texture Art, there is nothing to draw — only layers to build. The result is that even the most self-described non-creative participants engage fully and produce something they are genuinely proud of. HR managers running team-building days consistently report that Texture Art generates more spontaneous conversation and laughter than structured team games, because the shared medium removes hierarchy — the CEO's canvas looks as interesting as the intern's.</p>
      <h2>Who It Is For</h2>
      <p>Texture Art is suitable for corporate team-building and creative thinking days, school art days for senior students (Grade 8 onward), college fests, birthday parties, kitty parties, and private creative events. Duration: 1.5 to 2 hours. Groups from 20 to 200+. All materials included. Pricing from ₹600 per person.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>Is Texture Art suitable for beginners?</h3>
      <p>Yes — it is one of the most beginner-friendly activities in the Kraftykinni catalogue. Because the process is abstract and layered, there is no wrong way to do it. Every participant produces a unique, gallery-quality result regardless of art experience.</p>
      <h3>What materials are used in a Texture Art workshop?</h3>
      <p>Tissue paper, acrylic paste, acrylic paints, palette knives, and mixed media elements including fabric scraps and texture gels. All materials are included. No prior supplies needed from participants.</p>
      <h3>How long does a Texture Art workshop take?</h3>
      <p>1.5 to 2 hours. This includes a guided layering demonstration, hands-on creation time, and a final detailing phase. Every participant completes a finished canvas to take home on the day.</p>
      <h3>What is the cost of a Texture Art workshop in Delhi NCR?</h3>
      <p>Pricing starts at ₹600 per person for groups of 100+, ₹700 for 50–100, and ₹800 per person for groups of 20–50. All art materials and facilitation included. Kraftykinni travels to your venue anywhere in Delhi, Gurgaon, or Noida.</p>
      <h3>Is Texture Art suitable for corporate team-building?</h3>
      <p>Yes — it is among the top three activities booked by corporate HR teams. The abstract process encourages creative thinking without the pressure of representational art, making it ideal for teams where participants feel self-conscious about drawing.</p>`,
  },
  {
    path: '/workshops/tote-bag-painting/',
    title: 'Tote Bag Painting Workshop Delhi NCR — ₹600/person | Kraftykinni',
    description: 'Tote Bag Painting workshop in Delhi NCR by Kraftykinni. Custom branding available for corporate events. Eco-friendly, functional takeaway. All materials included. ₹600–₹800/person.',
    h1: 'Tote Bag Painting Workshop in Delhi NCR',
    bodyContent: `<h1>Tote Bag Painting Workshop in Delhi NCR</h1><p>Tote Bag Painting is one of our most sustainable and practically useful workshops. Each participant paints their own cotton tote bag using fabric paints and stencils, creating a personalised, eco-friendly bag they will actually use. For corporates, we can incorporate brand elements or event themes — making it an excellent branded gifting workshop. Pricing from ₹600 per person, all materials included.</p><h2>What you make</h2><p>A hand-painted cotton tote bag with personalised or themed designs — durable, usable, and eco-friendly. Fabric paint dries within 15 to 20 minutes, so every participant can handle and pack their tote before the workshop ends.</p><h2>Custom Branding for Corporate Events</h2><p>Tote Bag Painting is the only Kraftykinni activity where company branding can be incorporated directly onto the artwork. We can pre-print your logo or event theme on the bags before the session — participants then personalise them further with their own painted designs. The result is a branded gifting piece that is genuinely handmade, not a generic promotional item. HR teams running CSR days, sustainability events, or onboarding programmes have used this format to create takeaways that employees actually keep and use — providing ongoing brand visibility long after the event ends.</p><h2>Why Tote Bag Painting Works for Corporate Gifting</h2><p>Most corporate event takeaways are forgotten within a week. A hand-painted tote bag is different: it is functional, eco-friendly, and visibly personal. Participants use it for groceries, commuting, and errands — which means your brand remains visible for months. It is the most environmentally conscious activity in the Kraftykinni catalogue, making it the top choice for sustainability-themed events, Earth Day programmes, and CSR workshops across Delhi NCR.</p><h2>Who it is for</h2><p>Excellent for corporate gifting events, sustainability-themed workshops, school annual days, and private parties. Duration: 1.5 to 2 hours. Groups from 20 to 200+. Pricing from ₹600 per person.</p><h2>Frequently Asked Questions</h2><h3>Can you add our company logo to the tote bags?</h3><p>Yes — Kraftykinni can pre-print your company logo or event theme on the bags before the workshop. Participants then add their own painted designs around the branding, creating a personalised gifting piece.</p><h3>What fabric and paint is used?</h3><p>We use plain cotton canvas tote bags and professional-grade fabric acrylic colours. The paint is non-toxic, water-resistant once dry, and safe for daily use. Stencils and fine brushes are provided for all skill levels.</p><h3>Is the painted design washable?</h3><p>Yes — fabric acrylic paint is wash-fast once fully dry and heat-set. We recommend a gentle first hand-wash before machine washing, and turning the bag inside out for subsequent washes.</p>`,
  },
  {
    path: '/workshops/trinket-tray/',
    title: 'Trinket Tray Painting Workshop Delhi NCR — Desk Décor | Kraftykinni',
    description: 'Trinket Tray Painting workshop in Delhi NCR by Kraftykinni. Paint your own decorative jewellery or desk tray. Corporate & school sessions. All materials included. ₹600–₹800/person.',
    h1: 'Trinket Tray Painting Workshop in Delhi NCR',
    bodyContent: `<h1>Trinket Tray Painting Workshop in Delhi NCR</h1><p>Trinket Tray Painting gives participants a plain MDF or ceramic tray and the freedom to transform it into something beautiful. Using acrylic paints, brushes, and simple decorative techniques, each tray becomes a unique piece of functional desk art. It is a quick, satisfying activity that produces immediate results.</p><h2>What you make</h2><p>A hand-painted trinket or jewellery tray — colourful, functional, and personalised.</p><h2>Who it is for</h2><p>Great for corporate events, school workshops, office parties, and bridal events. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },
  {
    path: '/workshops/mdf-fridge-magnet/',
    title: 'MDF Fridge Magnet Workshop Delhi NCR — Quick Corporate Craft | Kraftykinni',
    description: 'MDF Fridge Magnet painting workshop in Delhi NCR by Kraftykinni. Fun, quick craft activity for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    h1: 'MDF Fridge Magnet Painting Workshop in Delhi NCR',
    bodyContent: `<h1>MDF Fridge Magnet Painting Workshop in Delhi NCR</h1><p>The MDF Fridge Magnet workshop is proof that great art does not need a large canvas. Participants paint and personalise small MDF shapes — animals, letters, frames, or abstract forms — which become fridge magnets they take home. The activity is quick, cheerful, and produces a result that participants see every single day when they open their fridge.</p><h2>What you make</h2><p>A set of hand-painted MDF fridge magnets — personalised, colourful, and daily-use.</p><h2>Who it is for</h2><p>Perfect for quick corporate engagement sessions, school craft days, large events with tight schedules, and children's parties. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },
  {
    path: '/workshops/canvas-pouch/',
    title: 'Canvas Pouch Painting Workshop Delhi NCR — Personalised Gift | Kraftykinni',
    description: 'Canvas Pouch Painting workshop in Delhi NCR by Kraftykinni. Personalise your own canvas pouch with fabric paints. Corporate, school & private event sessions. All materials included.',
    h1: 'Canvas Pouch Painting Workshop in Delhi NCR',
    bodyContent: `<h1>Canvas Pouch Painting Workshop in Delhi NCR</h1><p>Canvas Pouch Painting lets participants personalise a compact fabric pouch using fabric paints, fine brushes, and stencils. The smaller canvas encourages precision and detailed work — participants focus deeply on their design and leave with a pouch they actually use for makeup, stationery, or accessories.</p><h2>What you make</h2><p>A hand-painted canvas pouch — personalised with the participant's own design and ready for daily use.</p><h2>Who it is for</h2><p>Ideal for corporate gifting events, school sessions, college workshops, and intimate private parties. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>`,
  },

  // ── Employee Engagement Gurgaon ──────────────────────────────────────────
  {
    path: '/employee-engagement-activities-gurgaon/',
    title: 'Employee Engagement Activities Gurgaon | Art Workshops | Kraftykinni',
    description: 'Guided art workshops for employee engagement in Gurgaon. Teams of 20–200+, all materials supplied. Lippan Art, Mandala, Tie & Dye at your Cyber City or Udyog Vihar office. ₹600/person.',
    h1: 'Employee Engagement Activities in Gurgaon',
    ogImage: 'https://kraftykinni.in/og-corporate.jpg',
    bodyContent: `
      <h1>Employee Engagement Activities in Gurgaon — Art Workshops by Kraftykinni</h1>
      <p>Kraftykinni runs guided art workshops for employee engagement across Gurgaon — at DLF Cyber City, Udyog Vihar, MG Road, and Golf Course Road offices. All materials included, all supplies brought to your venue. Groups of 20 to 200+. Starting at ₹600 per person.</p>
      <h2>Why Art Workshops for Employee Engagement?</h2>
      <p>Art workshops sit in a category most team activities don't reach: collaborative and creative without being competitive. There's no scoring, no elimination, and no performance pressure. The shared creative process produces genuine conversation across hierarchies, and every participant walks out with a physical artwork they made themselves — a rare outcome from a corporate event.</p>
      <h2>Popular Use Cases in Gurgaon</h2>
      <h3>Quarterly Team-Building Events</h3>
      <p>The most common booking format. HR teams across DLF Cyber City and Udyog Vihar run these quarterly to maintain team cohesion. A 90-minute guided art session fills an afternoon slot without requiring an external venue.</p>
      <h3>Employee Appreciation Days</h3>
      <p>A creative session signals investment in your people. Employees frequently describe it as "the first company event I actually enjoyed." The artwork they take home is a daily reminder of the gesture.</p>
      <h3>Annual Day Activities</h3>
      <p>For large annual days at hotels or banquet halls in Gurgaon, art workshops are an effective structured activity before or after the formal programme. Groups of 100 to 200+ accommodated.</p>
      <h3>Onboarding & New Hire Orientation</h3>
      <p>A creative session on day one signals company culture and breaks the ice across cohorts far more effectively than a team quiz.</p>
      <h2>Pricing</h2>
      <ul>
        <li>20–50 participants: ₹800 per person — all materials included</li>
        <li>50–100 participants: ₹700 per person — all materials included</li>
        <li>100+ participants: ₹600 per person — all materials included</li>
      </ul>
      <h2>Top Activities for Corporate Engagement</h2>
      <p>Lippan Art (most requested for corporate groups), Mandala Art (ideal for mindfulness days), Tie & Dye (high energy, great for large groups), Boho Canvas (popular at off-site retreats), Tote Bag Painting (doubles as a branded takeaway), Clay Art (ideal for wellness sessions).</p>
      <h2>Frequently Asked Questions</h2>
      <h3>Can you handle 100+ participants at our Gurgaon office?</h3>
      <p>Yes. Standard format handles 20 to 200+ participants. For groups above 60, we bring additional facilitators. Pricing drops to Rs 600 per person at 100+ scale.</p>
      <h3>Do you come to DLF Cyber City / Udyog Vihar?</h3>
      <p>Yes — we travel to your office across all of Gurgaon including DLF Cyber City, Udyog Vihar, DLF Cyber Park, MG Road, Golf Course Road, and Sohna Road. You do not need to book an external venue.</p>
    `,
  },

  // ── Location pages ────────────────────────────────────────────────────────
  {
    path: '/workshops-in-delhi',
    title: 'Art Workshops in Delhi | Corporate & School Sessions | Kraftykinni',
    description: 'Kraftykinni conducts art and DIY workshops across Delhi — corporate team building, school sessions, and private events. 13 activities, all materials included. Led by Fevicryl-certified artist. ₹600–₹800/person.',
    h1: 'Art Workshops in Delhi',
    bodyContent: `<h1>Art Workshops in Delhi — Book a Session Today</h1>
      <p>Delhi is home to some of the most active corporate campuses, schools, and private event venues in India — and Kraftykinni runs art workshops across all three segments. We conduct guided art and DIY workshops at corporate offices in Connaught Place, Bhikaji Cama Place, and Nehru Place, at schools and colleges across North Delhi, South Delhi, Dwarka, and Rohini, and at private venues for birthdays, kitty parties, and bachelorettes.</p>
      <p>Every session is led by Shramita Govil, Fevicryl Certified Artist, who brings all materials directly to your space. You provide the venue, tables, and chairs — we handle everything else, from setup to facilitation to cleanup. Sessions run 1.5 to 2.5 hours and every participant leaves with a finished piece of artwork.</p>
      <p>Whether you are an HR manager planning a team-building day, a school teacher organising an annual day activity, or a family hosting a birthday in South Delhi, Kraftykinni has run workshops for your exact situation — across Delhi, many times over. Pricing starts at ₹600 per person with all materials included.</p>
      <h2>Areas We Cover in Delhi</h2>
      <p>Connaught Place, Bhikaji Cama Place, South Delhi, Dwarka, Rohini, Lajpat Nagar, Saket, Vasant Kunj, Nehru Place, and all areas across Delhi. We travel to your office, school, or event venue — anywhere in the city.</p>
      <h2>All 13 Activities Available in Delhi</h2>
      <p>Lippan Art, Mandala Art, Tie and Dye, Boho Canvas Art, Bottle Lamp Art, Block Printing, Clay Art, Glass Painting, Texture Art, Tote Bag Painting, Trinket Tray Painting, MDF Fridge Magnet, Canvas Pouch Painting.</p>
      <h2>Pricing for Art Workshops in Delhi</h2>
      <ul>
        <li><strong>Small Group (20–50 people):</strong> ₹800 per person — all materials included</li>
        <li><strong>Standard (50–100 people):</strong> ₹700 per person — all materials included</li>
        <li><strong>Large Group (100+ people):</strong> ₹600 per person — all materials included</li>
      </ul>
      <p>A 50% deposit confirms the booking. Minimum 7 days advance notice required.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>Do you conduct art workshops across all areas of Delhi?</h3>
      <p>Yes — Kraftykinni travels to your location anywhere in Delhi, including South Delhi, North Delhi, Dwarka, Rohini, Connaught Place, Saket, Vasant Kunj, and Nehru Place. If your area is not listed, reach out and we will confirm availability.</p>
      <h3>What art workshops are available in Delhi?</h3>
      <p>All 13 Kraftykinni signature activities are available in Delhi: Lippan Art, Mandala Art, Tie &amp; Dye, Boho Canvas Art, Block Printing, Clay Art, Glass Painting, Texture Art, Tote Bag Painting, Bottle Lamp Art, MDF Fridge Magnet, Trinket Tray Painting, and Canvas Pouch Painting.</p>
      <h3>What is the cost of an art workshop in Delhi?</h3>
      <p>Pricing starts at ₹800 per person for groups of 20–50, ₹700 per person for 50–100 participants, and ₹600 per person for groups of 100+. All art materials, facilitation, setup, and cleanup are included. There are no hidden charges.</p>
      <h3>What occasions are art workshops suitable for in Delhi?</h3>
      <p>Kraftykinni runs workshops for corporate team-building days, employee engagement events, school annual days, college fests, birthday parties, kitty parties, bachelorette parties, and private social gatherings. Any group occasion with 20 or more participants is a good fit.</p>
      <h3>How far in advance should I book an art workshop in Delhi?</h3>
      <p>A minimum of 7 days advance notice is required to arrange materials and confirm logistics. For large groups of 150+ or multi-activity sessions, 10–14 days is preferred. A 50% deposit confirms your booking.</p>
      <h3>Do participants need any prior art experience?</h3>
      <p>No prior art experience is needed. Every Kraftykinni session is guided step by step by Shramita Govil. Participants of all skill levels — including those who say they cannot draw — finish with a completed artwork they are proud of.</p>
      <h3>What is the minimum group size for an art workshop in Delhi?</h3>
      <p>The minimum group size is 20 participants. We cater to groups up to 200+ in a single session, with additional facilitators brought in for very large groups to maintain quality guidance for every participant.</p>
      <h3>What is the best area in Delhi for an art workshop venue?</h3>
      <p>For corporate groups, offices in Connaught Place, Nehru Place, and Bhikaji Cama Place are our most frequent locations — workshops happen directly on your office floor, no external venue needed. For private events, Hauz Khas, Saket, and South Delhi homes are most common. For schools, we regularly work across Vasant Kunj, Dwarka, and Rohini.</p>
      <h3>Do you conduct art workshops in East Delhi and North Delhi?</h3>
      <p>Yes — Kraftykinni covers all of Delhi, including East Delhi and North Delhi. Distance within the city is not a constraint. Send your location and we will confirm availability within 24 hours.</p>
      <h3>Can you accommodate a mixed group of children and adults in Delhi?</h3>
      <p>Yes — Mandala Art, Tote Bag Painting, and Canvas Pouch Painting work well for mixed-age groups. These are popular for family birthday parties where children and adults participate together. Shramita adjusts the facilitation pace to suit the group.</p>
      <h2>Where We Conduct Workshops in Delhi</h2>
      <p><strong>Corporate Offices:</strong> Offices in Connaught Place, Bhikaji Cama Place, and Nehru Place are our most frequent Delhi bookings. We set up on your conference room floor or cafeteria — setup takes 20 minutes and we handle all cleanup.</p>
      <p><strong>Schools &amp; Colleges:</strong> We work with schools across Vasant Kunj, Dwarka, Rohini, and Saket for annual days and art sessions. Groups of 30 to 300+ students in assembly halls or classrooms.</p>
      <p><strong>Private Homes &amp; Event Venues:</strong> Birthday parties, kitty parties, and bachelorettes in South Delhi, Hauz Khas, and central Delhi. At your home, a rented farmhouse, or a café — we adapt to any space.</p>
      <h2>A Session That Shows What We Do</h2>
      <p>Jaypee Public School booked a full-school Bottle Lamp Art session with Kraftykinni — 150+ students creating upcycled glass bottle lamps in a single afternoon. Each student took home a finished, display-worthy lamp. The upcycling theme aligned with the school's sustainability focus. <a href="/blog/bottle-lamp-art-workshop-school-delhi-ncr/">Read the full Jaypee School case study</a>.</p>`,
  },
  {
    path: '/workshops-in-gurgaon',
    title: 'Art Workshops in Gurgaon | Corporate Team Building | Kraftykinni',
    description: 'Kraftykinni conducts corporate art workshops and team-building sessions in Gurgaon. Office visits, off-site events, school sessions. 13 activities, all materials included. ₹600–₹800/person.',
    h1: 'Art Workshops in Gurgaon',
    bodyContent: `<h1>Art Workshops in Gurgaon — For Corporate Teams and Events</h1>
      <p>Gurgaon's corporate ecosystem is exactly where Kraftykinni thrives. We regularly conduct corporate art workshops for teams in Gurgaon's major business hubs — from DLF Cyber City to Udyog Vihar, MG Road, Sohna Road, and Golf Course Road. Companies in Gurgaon choose Kraftykinni for quarterly team-building events, employee appreciation days, onboarding workshops, and annual day activities. We bring all art supplies directly to your Gurgaon office or preferred venue — no logistics burden on your HR team.</p>
      <h2>Neighbourhoods We Cover in Gurgaon</h2>
      <p><strong>DLF Cyber City</strong> — the most frequent booking location. We regularly run workshops for tech and consulting companies in Cyber City's office towers. Setup works in standard conference rooms and cafeteria spaces.</p>
      <p><strong>Udyog Vihar</strong> — large manufacturing and services companies with teams of 100+ are a core segment. Block Printing and Tie &amp; Dye are the top choices for larger Udyog Vihar groups.</p>
      <p><strong>MG Road and IFFCO Chowk</strong> — retail and hospitality sector offices. Smaller, more intimate sessions of 20–40 participants.</p>
      <p><strong>Golf Course Road and Sohna Road</strong> — financial services and startup offices. Lippan Art and Boho Canvas are the most requested activities in this corridor.</p>
      <p><strong>Sector 29, Sector 56, and Manesar</strong> — including co-working spaces and industrial campuses. We cater to all group sizes across these areas.</p>
      <h2>All 13 Activities Available in Gurgaon</h2>
      <p>Lippan Art, Mandala Art, Tie and Dye, Boho Canvas Art, Bottle Lamp Art, Block Printing, Clay Art, Glass Painting, Texture Art, Tote Bag Painting, Trinket Tray Painting, MDF Fridge Magnet, Canvas Pouch Painting.</p>
      <h2>Employee Engagement in Gurgaon</h2>
      <p>Art workshops are one of the highest-rated <a href="/employee-engagement-activities-gurgaon/">employee engagement activities in Gurgaon</a>. Post-event surveys consistently show that participants rate art sessions above conventional team games and off-site dinners for connection and enjoyment. The session structure — everyone making something at the same table — removes hierarchy and creates natural conversation between people who rarely interact across departments.</p>
      <h2>Pricing</h2>
      <ul>
        <li><strong>Small Group (20–50 people):</strong> ₹800 per person — all materials included</li>
        <li><strong>Standard (50–100 people):</strong> ₹700 per person — all materials included</li>
        <li><strong>Large Group (100+ people):</strong> ₹600 per person — all materials included</li>
      </ul>
      <h2>Frequently Asked Questions</h2>
      <h3>Do you conduct art workshops at Gurgaon offices?</h3>
      <p>Yes — Kraftykinni travels to your Gurgaon office with all materials. We regularly run workshops at offices in DLF Cyber City, Udyog Vihar, MG Road, Golf Course Road, and Sohna Road. Setup takes 20–30 minutes and we handle all cleanup after the session.</p>
      <h3>What is the cost of a corporate art workshop in Gurgaon?</h3>
      <p>Pricing starts at ₹800 per person for groups of 20–50, ₹700 per person for 50–100, and ₹600 per person for 100+ participants. All materials are included. There are no additional travel or setup charges within Gurgaon.</p>
      <h3>What activities work best for corporate teams in Gurgaon?</h3>
      <p>The most popular activities for Gurgaon corporate teams are Lippan Art, Boho Canvas Art, Block Printing, and Mandala Art. All four produce a finished piece in 90 minutes and require no prior art experience. Tie &amp; Dye is the top choice for large groups of 100+.</p>
      <h3>How far in advance should I book a workshop in Gurgaon?</h3>
      <p>Minimum 7 days advance notice is required to arrange materials and confirm logistics. A 50% deposit secures the date. Shramita confirms availability within 24 hours of your enquiry.</p>
      <h3>Can you run a workshop at an off-site venue in Gurgaon?</h3>
      <p>Yes — we work at office cafeterias, hotel banquet rooms, co-working spaces, and outdoor terrace venues across Gurgaon. You only need to provide tables, chairs, and a flat work surface. We bring everything else.</p>`,
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

function injectMeta(html, route) {
  const { path: routePath, title, description, h1, bodyContent, ogImage } = route;
  const canonical = `https://kraftykinni.in${routePath}`;

  // Update meta tags
  html = html.replace(/<title>[^<]*<\/title>/g, '');
  html = html.replace('</head>', `  <title>${title}</title>\n  </head>`);
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

  // Inject per-route JSON-LD schemas into <head>
  if (route.schemas && route.schemas.length > 0) {
    const schemaScripts = route.schemas
      .map(s => `  <script type="application/ld+json">${JSON.stringify(s)}</script>`)
      .join('\n');
    html = html.replace('</head>', `${schemaScripts}\n  </head>`);
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
  { loc: '/corporate-art-workshops/',       priority: '0.9', changefreq: 'monthly' },
  { loc: '/school-workshops/',              priority: '0.8', changefreq: 'monthly' },
  { loc: '/private-art-workshops/',         priority: '0.9', changefreq: 'monthly' },
  { loc: '/workshops/lippan-art/',          priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops/mandala-art/',         priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops/tie-and-dye/',         priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops/boho-canvas/',         priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/bottle-lamp-art/',     priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/clay-art/',            priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/glass-painting/',      priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/texture-art/',         priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/block-printing/',      priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/tote-bag-painting/',   priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/trinket-tray/',        priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/mdf-fridge-magnet/',   priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops/canvas-pouch/',        priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops-in-delhi',            priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops-in-gurgaon',          priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops-in-noida',            priority: '0.8', changefreq: 'monthly' },
  { loc: '/employee-engagement-activities-gurgaon/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/about/',                         priority: '0.6', changefreq: 'yearly'  },
  { loc: '/privacy-policy/',               priority: '0.2', changefreq: 'yearly'  },
  { loc: '/blog/',                          priority: '0.7', changefreq: 'weekly'  },
  { loc: '/blog/lippan-art-complete-beginners-guide-kutch-mirror-work/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/bottle-lamp-art-workshop-school-delhi-ncr/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/best-corporate-team-building-activities-gurgaon-2026/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/annual-day-activity-ideas-schools-delhi-ncr/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/art-workshop-ideas-birthday-party-delhi-ncr/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/mothers-day-art-workshop-gift-delhi-ncr/', priority: '0.8', changefreq: 'yearly' },
  { loc: '/blog/clay-trinket-painting-workshop-cars24-gurgaon/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/summer-art-workshop-for-schools-delhi-ncr/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/blog/fathers-day-gift-ideas-art-workshop-delhi-ncr-2026/', priority: '0.8', changefreq: 'yearly' },
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
