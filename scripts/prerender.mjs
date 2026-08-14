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

// Build date — used both as the sitemap lastmod AND as a genuine, auto-updating
// freshness signal ("Last updated") in every page's noscript block. Real
// because it reflects the actual last build/deploy date, not a hardcoded string.
const today = new Date().toISOString().slice(0, 10);

// ─── Site-wide navigation + footer links, injected into EVERY route's
// noscript block. Without this, only the route's own bodyContent was visible
// to non-JS crawlers (AI bots included) — the real <Navbar>/<ContactFooter>
// React components never render under <noscript>, so pages had zero
// internal links, no ARIA landmarks, and no About/Contact/Privacy links
// detectable by static crawlers. This single block fixes all of that,
// site-wide, in one place. ──────────────────────────────────────────────────
const SITE_NAV_LINKS = `
    <nav aria-label="Site navigation">
      <a href="/">Home</a> ·
      <a href="/corporate-art-workshops">Corporate Workshops</a> ·
      <a href="/school-art-workshops">School Workshops</a> ·
      <a href="/private-art-workshops">Private Events</a> ·
      <a href="/workshops-in-delhi">Workshops in Delhi</a> ·
      <a href="/workshops-in-gurgaon">Workshops in Gurgaon</a> ·
      <a href="/workshops-in-noida">Workshops in Noida</a> ·
      <a href="/blog">Blog</a> ·
      <a href="/about">About</a>
    </nav>`;

const SITE_FOOTER_LINKS = `
    <footer>
      <p><strong>Contact:</strong> <a href="mailto:kraftykinni@gmail.com">kraftykinni@gmail.com</a> | <a href="tel:+919599622210">+91 9599622210</a></p>
      <p><strong>Service area:</strong> Delhi, Gurgaon, Noida and online pan-India</p>
      <p><strong>Pricing:</strong> ₹600–₹800 per person, all materials included</p>
      <p>
        <a href="/about">About Kraftykinni</a> ·
        <a href="/#contact">Contact / Book a Workshop</a> ·
        <a href="/privacy-policy">Privacy Policy</a> ·
        <a href="/blog">Blog</a>
      </p>
      <p>Last updated: <time datetime="${today}">${today}</time></p>
    </footer>`;

// ─── Trailing-slash fix script (injected into every pre-rendered page) ────────
// Runs synchronously before React boots so the URL is clean before any
// analytics, history listeners or React Router reads window.location.
const SLASH_FIX_SCRIPT = `<script>(function(){var p=location.pathname;if(p.length>1&&p.slice(-1)==='/'){history.replaceState(null,null,p.slice(0,-1)+location.search+location.hash)}})()</script>`;

// Removes SSR-prerendered data-rh tags so React Helmet can add its own without
// creating duplicate title / description / canonical tags in the rendered DOM.
const DATA_RH_CLEANUP_SCRIPT = `<script>document.querySelectorAll('[data-rh]').forEach(function(e){e.remove()})</script>`;

// ─── Real workshop data, parsed from src/data/workshops.ts ────────────────────
// Several workshop pages' noscript bodyContent below predate the FAQ/benefits
// data that now lives in workshops.ts, so they were missing FAQ sections and
// heading depth entirely. Rather than hand-copy that content (and have it
// drift out of sync over time), we parse the real file directly — same
// technique used for the RSS feed further down — and use it to append a
// "Workshop Benefits" list + the real "Frequently Asked Questions" section
// to any page missing one. Nothing here is invented; every word already
// exists in workshops.ts as the single source of truth for this data.
function parseWorkshopsData() {
  const workshopsPath = path.resolve(__dirname, '..', 'src', 'data', 'workshops.ts');
  if (!fs.existsSync(workshopsPath)) return {};
  const src = fs.readFileSync(workshopsPath, 'utf-8');
  const chunks = src.split(/\n {4}id: '/).slice(1);

  const byId = {};
  for (const chunk of chunks) {
    const idMatch = chunk.match(/^([^']+)'/);
    if (!idMatch) continue;
    const id = idMatch[1];

    const benefitsMatch = chunk.match(/benefits:\s*\[([\s\S]*?)\n {4}\],/);
    const benefits = benefitsMatch
      ? [...benefitsMatch[1].matchAll(/(['"])([\s\S]*?)\1,/g)].map((m) => m[2])
      : [];

    const faqBlockMatch = chunk.match(/faq:\s*\[([\s\S]*?)\n {4}\],\n {2}\},/);
    const faq = [];
    if (faqBlockMatch) {
      const faqRe = /q:\s*(['"])([\s\S]*?)\1,\s*a:\s*(['"])([\s\S]*?)\3,/g;
      let m;
      while ((m = faqRe.exec(faqBlockMatch[1])) !== null) {
        faq.push({ q: m[2].replace(/\\'/g, "'"), a: m[4].replace(/\\'/g, "'") });
      }
    }
    byId[id] = { benefits, faq };
  }
  return byId;
}

const WORKSHOPS_DATA = parseWorkshopsData();

// Returns a "Workshop Benefits" list + full "Frequently Asked Questions"
// section for a given workshop id, or '' if the id/data isn't found.
function workshopFaqHtml(id) {
  const data = WORKSHOPS_DATA[id];
  if (!data) return '';
  let html = '';
  if (data.benefits.length) {
    html += `<h2>Workshop Benefits</h2><ul>${data.benefits.map((b) => `<li>${b}</li>`).join('')}</ul>`;
  }
  if (data.faq.length) {
    html += '<h2>Frequently Asked Questions</h2>';
    html += data.faq.map((f) => `<h3>${f.q}</h3><p>${f.a}</p>`).join('');
  }
  return html;
}

// ─── Real blog post data, parsed from src/data/blogPosts.ts ───────────────────
// Same rationale as parseWorkshopsData() above — used to build the blog index
// page's link list below, and reused again by the RSS generator further down.
function parseBlogPosts() {
  const blogDataPath = path.resolve(__dirname, '..', 'src', 'data', 'blogPosts.ts');
  if (!fs.existsSync(blogDataPath)) return [];
  const blogSrc = fs.readFileSync(blogDataPath, 'utf-8');
  const chunks = blogSrc.split(/\n {4}slug: '/).slice(1);

  function grabField(chunk, field) {
    const re = new RegExp(`${field}:\\s*\\n?\\s*(['"])([\\s\\S]*?)\\1,`);
    const m = chunk.match(re);
    return m ? m[2] : null;
  }

  return chunks
    .map((chunk) => {
      const slugMatch = chunk.match(/^([^']+)'/);
      if (!slugMatch) return null;
      return {
        slug: slugMatch[1],
        title: grabField(chunk, 'title'),
        publishDate: grabField(chunk, 'publishDate'),
        excerpt: grabField(chunk, 'excerpt'),
        category: grabField(chunk, 'category'),
      };
    })
    .filter((p) => p && p.title && p.publishDate)
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1)); // newest first
}

const BLOG_POSTS = parseBlogPosts();

// Builds the full linked post list for the /blog index page's noscript
// content — real titles, excerpts, and links, sourced from BLOG_POSTS above.
function blogIndexListHtml() {
  if (!BLOG_POSTS.length) return '';
  return `<ol>${BLOG_POSTS.map(
    (p) => `<li><a href="/blog/${p.slug}">${p.title}</a> — ${p.excerpt || ''}</li>`
  ).join('')}</ol>`;
}

// ─── Route metadata + visible noscript body content ──────────────────────────

const routes = [
  // ── Homepage ─────────────────────────────────────────────────────────────
  // Included so the pre-rendered dist/index.html gets a proper <noscript> H1
  // that Bing (and other non-JS crawlers) can read without executing JavaScript.
  {
    path: '/',
    title: 'Art Workshops Delhi NCR | ₹600/person | 1,500+ | Kraftykinni',
    description: 'Art workshops in Delhi, Gurgaon & Noida for corporate teams, schools & events. ₹600/person, all materials included. Fevicryl-certified artist.',
    h1: 'Kraftykinni Art Workshops in Delhi NCR',
    schemas: [
      {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kraftykinni.in/' },
        ],
      },
      {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Do participants need prior art experience?', acceptedAnswer: { '@type': 'Answer', text: 'No — all sessions are guided step-by-step by Shramita. Every participant creates something they are proud of, regardless of their art background.' } },
          { '@type': 'Question', name: 'What is the minimum group size?', acceptedAnswer: { '@type': 'Answer', text: 'Kraftykinni caters to groups from 20 up to 200+ participants. For smaller groups, reach out directly and Shramita will do her best to accommodate.' } },
          { '@type': 'Question', name: 'Do you provide all the materials?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every art supply is included — paints, canvases, brushes, aprons, and activity-specific materials. You only need to provide tables and chairs.' } },
          { '@type': 'Question', name: 'Where do you conduct workshops?', acceptedAnswer: { '@type': 'Answer', text: 'In person across Delhi, Gurgaon, and Noida, plus online pan-India with materials shipped to participants.' } },
          { '@type': 'Question', name: 'What are the payment and booking terms?', acceptedAnswer: { '@type': 'Answer', text: "Seven days' advance notice is required, along with a 50% deposit to confirm. UPI, bank transfer, or cash are all accepted." } },
        ],
      },
    ],
    bodyContent: `
      <article>
      <h1>Kraftykinni Art Workshops in Delhi NCR</h1>
      <p>Kraftykinni runs hands-on, guided art workshops for corporate teams, schools, and private events across Delhi, Gurgaon, and Noida. Shramita Govil, a <a href="https://www.pidilite.com/consumer-brands/fevicryl" rel="noopener">Fevicryl Certified Artist</a>, leads every session herself. Materials are included from ₹600 per person, and no prior art experience is needed.</p>

      <nav aria-label="Page contents">
        <h2>On this page</h2>
        <ul>
          <li><a href="#quick-facts">Quick Facts</a></li>
          <li><a href="#offerings">What art workshops does Kraftykinni offer?</a></li>
          <li><a href="#pricing">How much do workshops cost?</a></li>
          <li><a href="#booking">How does booking work?</a></li>
          <li><a href="#why-workshops">Why do corporate teams choose hands-on art workshops?</a></li>
          <li><a href="#comparison">Art workshops vs. other team-building activities</a></li>
          <li><a href="#testimonials">What do past participants say?</a></li>
          <li><a href="#faq">Frequently Asked Questions</a></li>
          <li><a href="#who-its-for">Is Kraftykinni right for your event?</a></li>
          <li><a href="#summary">Key Takeaways</a></li>
        </ul>
      </nav>

      <section id="quick-facts">
        <h2>Quick Facts</h2>
        <p>Here is Kraftykinni at a glance, for example if you only have a minute to decide whether to read further:</p>
        <ul>
          <li><strong>Founder:</strong> Shramita Govil, Fevicryl Certified Artist</li>
          <li><strong>Activities:</strong> 13 signature workshop formats</li>
          <li><strong>Group size:</strong> 20 to 200+ participants</li>
          <li><strong>Duration:</strong> 1.5 to 2.5 hours per session</li>
          <li><strong>Price:</strong> ₹600–₹800 per person, all materials included</li>
          <li><strong>Coverage:</strong> Delhi, Gurgaon, Noida in person; pan-India online with shipped kits</li>
          <li><strong>Booking lead time:</strong> 7 days' notice, 50% deposit</li>
          <li><strong>Track record:</strong> 50+ workshops, 1,500+ participants as of July 2026 (source: Kraftykinni's own internal booking records, not a third-party count)</li>
        </ul>
      </section>

      <section id="offerings">
        <h2>What art workshops does Kraftykinni offer?</h2>
        <p>There are 13 signature activities to choose from, grouped into three categories. Each one is picked based on group size, event setting, and how much time is available — a corporate offsite and a school art day rarely call for the same activity. As a result, Shramita usually asks a few quick questions before recommending one.</p>

        <figure>
          <img src="https://cdn.kraftykinni.in/assets/lippan-art-opt.webp" alt="Finished Lippan Art mud-and-mirror workshop piece made by a Kraftykinni participant" width="640" height="480" />
          <figcaption>A finished Lippan Art piece from a Kraftykinni workshop — mud relief work embedded with mirror pieces.</figcaption>
        </figure>

        <h3>Signature Workshops</h3>
        <p><a href="/workshops/lippan-art">Lippan Art</a>, <a href="/workshops/wall-rope-art">Wall &amp; Rope Art</a>, Tie &amp; Dye, Boho Canvas Art, Bottle Lamp Art, and Trinket Tray Painting.</p>

        <h3>Heritage Craft Workshops</h3>
        <p><a href="/workshops/mandala-art">Mandala Art</a> and Block Printing — traditional Indian craft techniques adapted into guided group sessions.</p>

        <h3>Everyday Craft Workshops</h3>
        <p>Clay Art, Glass Painting, Texture Art, Tote Bag Painting, MDF Fridge Magnet, and Canvas Pouch Painting — quicker, lower-cost activities well suited to shorter event slots.</p>

        <dl>
          <dt>Lippan Art</dt>
          <dd>A traditional Kutch mudwork craft that embeds mirror pieces into clay relief patterns — read the <a href="/blog/lippan-art-complete-beginners-guide-kutch-mirror-work">full beginner's guide</a>.</dd>
          <dt>Mandala Art</dt>
          <dd>Geometric, symmetrical patterns built outward from a central point — popular for its calming, meditative pace.</dd>
          <dt>Tie &amp; Dye</dt>
          <dd>A resist-dyeing technique where fabric is folded, twisted, and bound before colour is applied.</dd>
        </dl>
      </section>

      <section id="pricing">
        <h2>How much do Kraftykinni workshops cost?</h2>
        <p>Pricing depends on group size. Larger groups cost less per person, since setup and facilitation time are shared across more participants:</p>
        <table>
          <caption>Kraftykinni workshop pricing by group size</caption>
          <thead>
            <tr><th>Tier</th><th>Group size</th><th>Price per person</th></tr>
          </thead>
          <tbody>
            <tr><td>Intimate</td><td>20–50 pax</td><td>₹800</td></tr>
            <tr><td>Standard</td><td>50–100 pax</td><td>₹700</td></tr>
            <tr><td>Large</td><td>100+ pax</td><td>₹600</td></tr>
          </tbody>
        </table>
        <p>All three tiers include every art supply. You only need to provide a table, chairs, and your group — Kraftykinni brings everything else and cleans up afterward. If you are unsure which tier applies, try sending your expected headcount through the contact form.</p>
      </section>

      <section id="booking">
        <h2>How does booking work?</h2>
        <p>Booking is a simple four-step process, and most hosts hear back the same day. <strong>Deposit:</strong> 50% · <strong>Notice period:</strong> 7 days minimum · <strong>Payment methods:</strong> UPI, bank transfer, or cash.</p>
        <ol>
          <li>Get in touch by <a href="/#contact">WhatsApp, phone, or the contact form</a> with your group size and preferred date.</li>
          <li>Pick a workshop activity — Shramita can recommend one based on your event type.</li>
          <li>Confirm with 7 days' notice and a 50% deposit (UPI, bank transfer, or cash).</li>
          <li>Kraftykinni arrives with all materials, runs the session, and cleans up.</li>
        </ol>
        <p>For instance, here is a message template you can copy directly into WhatsApp to start a booking:</p>
        <pre><code>Hi Shramita! I'd like to book a workshop.
Group size: [e.g. 40]
Preferred date: [DD/MM/YYYY]
City: Delhi / Gurgaon / Noida</code></pre>
      </section>

      <section id="why-workshops">
        <h2>Why do corporate teams choose hands-on art workshops?</h2>
        <p>Many corporate teams default to standard offsites, quizzes, or happy hours for team building. On the other hand, a growing number of event planners are choosing hands-on creative workshops instead, since every participant leaves with something they physically made rather than just a shared afternoon. For instance, a session that ends with 40 finished Lippan Art pieces on a conference-room table tends to generate more conversation afterward than a trivia night does.</p>
        <p>In addition, experiential team building of this kind gives quieter employees a low-pressure way to take part, since the creative facilitation itself does the work of starting conversation. For a deeper look at this option, see the <a href="/corporate-art-workshops">corporate art workshops page</a> or read the <a href="/blog/clay-trinket-painting-workshop-cars24-gurgaon">CARS24 Gurgaon workshop case study</a> and the <a href="/blog/best-corporate-team-building-activities-gurgaon-2026">team-building activities in Gurgaon</a> guide. General research on workplace team building is summarised on <a href="https://en.wikipedia.org/wiki/Team_building" rel="noopener">Wikipedia</a>.</p>
      </section>

      <section id="comparison">
        <h2>Art workshops vs. other team-building activities</h2>
        <p>If you are choosing between formats, here is how a Kraftykinni session compares with two common alternatives:</p>
        <ul>
          <li><strong>Vs. escape rooms/quizzes:</strong> every participant takes home a physical object, rather than just a shared memory — useful for teams that want a longer-lasting reminder of the event.</li>
          <li><strong>Vs. office happy hours:</strong> a guided art workshop gives quieter team members a structured way to participate, since the activity itself creates conversation rather than relying on small talk.</li>
          <li><strong>Vs. outdoor sports days:</strong> art workshops need no special venue or weather, and work for mixed-fitness or mixed-age groups without anyone sitting out.</li>
        </ul>
        <p>None of these formats is objectively better. Instead, the right choice depends on your team's size, budget, and what you want people to remember afterward.</p>
      </section>

      <section id="testimonials">
        <h2>What do past participants say?</h2>
        <blockquote cite="https://www.google.com/maps/place/KraftyKinni/@28.5032749,77.3817466,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce9fb49d4e935:0xbed5ad5b5362b002!8m2!3d28.5032702!4d77.3843215!16s%2Fg%2F11svwnn70v">
          <p>"What an amazing time! I haven't had that much fun in years, it really brought out my inner child. Thank you Mam for this workshop."</p>
          <cite>— Saiyam Jain, Google review</cite>
        </blockquote>
        <blockquote cite="https://www.google.com/maps/place/KraftyKinni/@28.5032749,77.3817466,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce9fb49d4e935:0xbed5ad5b5362b002!8m2!3d28.5032702!4d77.3843215!16s%2Fg%2F11svwnn70v">
          <p>"Kraftykinni brought such a creative, refreshing energy to our corporate event. The team loved every moment and the art they created was stunning. Highly recommended!"</p>
          <cite>— Gurjeet, Google review</cite>
        </blockquote>
      </section>

      <section id="faq">
        <h2>Frequently Asked Questions</h2>
        <details>
          <summary>Do participants need prior art experience?</summary>
          <p>No — all sessions are guided step-by-step by Shramita. Every participant creates something they are proud of, regardless of their art background.</p>
        </details>
        <details>
          <summary>What is the minimum group size?</summary>
          <p>Kraftykinni caters to groups from 20 up to 200+ participants. For smaller groups, try reaching out directly — Shramita will do her best to accommodate.</p>
        </details>
        <details>
          <summary>Do you provide all the materials?</summary>
          <p>Yes. Every art supply is included — paints, canvases, brushes, aprons, and activity-specific materials. You only need to provide tables and chairs.</p>
        </details>
        <details>
          <summary>Where do you conduct workshops?</summary>
          <p>In person across <a href="/workshops-in-delhi">Delhi</a>, <a href="/workshops-in-gurgaon">Gurgaon</a>, and <a href="/workshops-in-noida">Noida</a>, plus online pan-India with materials shipped to participants.</p>
        </details>
        <details>
          <summary>What are the payment and booking terms?</summary>
          <p>Seven days' advance notice is required, along with a 50% deposit to confirm. UPI, bank transfer, or cash are all accepted.</p>
        </details>
      </section>

      <section id="who-its-for">
        <h2>Is Kraftykinni right for your event?</h2>
        <p>Kraftykinni works well for three kinds of hosts: <a href="/corporate-art-workshops">corporate teams</a> planning an offsite or annual day, <a href="/school-art-workshops">schools</a> running an art day or fest, and <a href="/private-art-workshops">private hosts</a> organising a birthday, kitty party, or baby shower. Meanwhile, if none of the 13 activities above stands out yet, try the <a href="/about">About page</a> for more on Shramita's background, or browse recent write-ups on the <a href="/blog">blog</a> for real event examples.</p>
      </section>

      <section id="summary">
        <h2>Key Takeaways</h2>
        <ul>
          <li>13 guided art workshops across Delhi, Gurgaon, and Noida, from ₹600 per person</li>
          <li>All materials included — no prior art experience needed</li>
          <li>Booking needs 7 days' notice and a 50% deposit</li>
          <li>Best fit for corporate teams, schools, and private hosts who want participants to leave with something they made</li>
        </ul>
        <p>In short, if you need a guided, hands-on activity for a group in Delhi NCR, Kraftykinni is a straightforward studio to shortlist and contact directly for a quote.</p>
      </section>
      </article>
    `,
  },

  // ── Corporate workshops ──────────────────────────────────────────────────
  {
    path: '/corporate-art-workshops',
    // Updated title: was getting 12 impressions, 0 clicks at position 2.4
    // Added pricing + social proof to compete with local-pack displacing clicks
    title: 'Corporate Art Workshops Delhi NCR | ₹600/person | Kraftykinni',
    description: 'Guided art workshops for teams of 20–200+. Lippan, Tie & Dye, Mandala + 10 more. Zero logistics — we bring everything. Delhi, Gurgaon, Noida.',
    ogImage: 'https://cdn.kraftykinni.in/og-corporate.jpg',
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
    path: '/school-art-workshops',
    title: 'School Art Workshops Delhi NCR — Annual Day | Kraftykinni',
    description: 'Art workshops for schools in Delhi NCR. Annual Day, Art Week & student events. ₹600/student, all materials included. Facilitator travels to your school.',
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
      <p>All art materials are provided — paints, canvases, brushes, aprons, and activity-specific supplies. We travel to your school anywhere in Delhi NCR and set up before the session. Every student completes a finished, display-worthy piece they take home. Sessions are led by Shramita Govil, Fevicryl Certified Artist with 50+ workshops and 1,500+ participants. Group sizes from 30 students to full school assemblies of 300+.</p>
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
    path: '/private-art-workshops',
    title: 'Art Workshops for Private Events in Delhi NCR | Kraftykinni',
    description: 'Art workshops for birthday parties, kitty parties & bachelorettes in Delhi NCR. ₹600/person, all materials included. Fevicryl-certified artist.',
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
    title: 'Fevicryl Certified Art Facilitator Delhi NCR | Kraftykinni',
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

  // ── Blog ─────────────────────────────────────────────────────────────────
  {
    path: '/blog',
    title: 'Art Workshop Tips, Ideas & Guides | Kraftykinni Blog',
    description: 'Art workshop guides, team building ideas & event planning tips from Kraftykinni — Delhi NCR\'s studio led by Fevicryl artist Shramita Govil.',
    h1: 'Kraftykinni Blog — Workshop Ideas, Guides & Stories',
    bodyContent: `
      <h1>Kraftykinni Blog — Workshop Ideas, Guides & Stories</h1>
      <p>Practical guides on team building, event planning, and art workshops from Shramita Govil and the Kraftykinni team in Delhi NCR. Real write-ups from real bookings — corporate offsites, school annual days, birthdays, and heritage-craft deep dives — plus a beginner's guide to Lippan Art.</p>
      <h2>All Posts</h2>
      ${blogIndexListHtml()}
    `,
  },
  {
    path: '/blog/lippan-art-complete-beginners-guide-kutch-mirror-work',
    title: "Lippan Art Guide: Kutch Mirror Work for Beginners | Kraftykinni",
    description: "Lippan Art explained — the Kutch mirror-work tradition, materials, step-by-step process, and why it's the top group workshop activity in Delhi NCR.",
    h1: "Lippan Art — A Complete Beginner's Guide to Kutch Mirror Work",
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': "Lippan Art Guide: Kutch Mirror Work for Beginners | Kraftykinni",
        'description': "Lippan Art explained — the Kutch mirror-work tradition, materials, step-by-step process, and why it's the top group workshop activity in Delhi NCR.",
        'url': 'https://kraftykinni.in/blog/lippan-art-complete-beginners-guide-kutch-mirror-work/',
        'datePublished': '2026-05-01',
        'dateModified': '2026-05-01',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/lippan-art-complete-beginners-guide-kutch-mirror-work/' },
      },
    ],
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
      <p>Kraftykinni runs Lippan Art workshops across Delhi, Gurgaon, and Noida for corporate teams, schools, and private events, led by Shramita Govil, Fevicryl Certified Artist. Groups from 20 to 200+, starting at Rs. 600 per person.</p>
    `,
  },
  {
    path: '/blog/best-corporate-team-building-activities-gurgaon-2026',
    title: 'Best Corporate Team Building Gurgaon 2026 | Kraftykinni',
    description: 'Top 10 team building activities in Gurgaon for 2026. From art workshops to offsite games — honest picks with real team outcomes. ₹600/person.',
    h1: 'Best Corporate Team Building Activities in Gurgaon 2026',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'Best Corporate Team Building Gurgaon 2026 | Kraftykinni',
        'description': 'Top 10 team building activities in Gurgaon for 2026. From art workshops to offsite games — honest picks with real team outcomes. ₹600/person.',
        'url': 'https://kraftykinni.in/blog/best-corporate-team-building-activities-gurgaon-2026/',
        'datePublished': '2026-04-27',
        'dateModified': '2026-04-27',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/best-corporate-team-building-activities-gurgaon-2026/' },
      },
    ],
    bodyContent: `
      <h1>Best Corporate Team Building Activities in Gurgaon 2026</h1>
      <p>Gurgaon's corporate event scene is full of options — escape rooms, bowling, and go-karting have their place. But after running 50+ team workshops across Cyber City, Udyog Vihar, and DLF Cyber Park, we've seen which activities actually produce conversation, connection, and something teams talk about months later.</p>
      <h2>1. Art Workshop — the #1 pick for genuine connection</h2>
      <p>Art workshops consistently outperform every other team activity on one metric: conversation. Kraftykinni runs guided art sessions starting at ₹600 per person across Gurgaon, with 13 workshop activities — Lippan Art, Tie and Dye, Boho Canvas, Mandala Art, and more. Every participant takes a finished artwork home. Groups from 20 to 200+ are accommodated.</p>
      <h2>2–10. Other options</h2>
      <p>The full list includes Escape Rooms, Cooking Competitions, Pottery workshops, Photography Walks, Indoor Sports Days, Improv Workshops, Scavenger Hunts, Board Game sessions, and Mixology events — each assessed on group size flexibility and real team outcomes.</p>
      <h2>Book a workshop for your Gurgaon team</h2>
      <p>Kraftykinni runs art workshops for corporate teams across Gurgaon, Delhi, and Noida, led by Shramita Govil, Fevicryl Certified Artist. All materials are included. Starting at ₹600 per person. Contact us to discuss your event date and preferred activity.</p>
    `,
  },

  {
    path: '/blog/annual-day-activity-ideas-schools-delhi-ncr',
    title: 'Annual Day Activity Ideas for Schools in Delhi NCR | Kraftykinni',
    description: '8 art-based annual day activity ideas for schools in Delhi NCR. Structured, mess-free, for 50–300 students. Led by a Fevicryl-certified artist.',
    h1: 'Annual Day Activity Ideas for Schools in Delhi NCR (Art-Based Edition)',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'Annual Day Activity Ideas for Schools in Delhi NCR | Kraftykinni',
        'description': '8 art-based annual day activity ideas for schools in Delhi NCR. Structured, mess-free, for 50–300 students. Led by a Fevicryl-certified artist.',
        'url': 'https://kraftykinni.in/blog/annual-day-activity-ideas-schools-delhi-ncr/',
        'datePublished': '2026-04-28',
        'dateModified': '2026-04-28',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/annual-day-activity-ideas-schools-delhi-ncr/' },
      },
    ],
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
      <p>Kraftykinni runs structured art workshops for schools across Delhi, Gurgaon, and Noida, led by Shramita Govil, Fevicryl Certified Artist. All materials included. Groups from 30 to 300+ students. Starting at Rs 600 per student. Contact us to discuss your annual day date.</p>
    `,
  },

  {
    path: '/blog/art-workshop-ideas-birthday-party-delhi-ncr',
    title: 'Art Workshop Ideas for Birthday Parties Delhi NCR | Kraftykinni',
    description: 'Planning a birthday party in Delhi NCR? Art workshops let every guest create and take home a keepsake. ₹600/person, all materials included.',
    h1: 'Art Workshop Ideas for Birthday Parties in Delhi NCR',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'Art Workshop Ideas for Birthday Parties Delhi NCR | Kraftykinni',
        'description': 'Planning a birthday party in Delhi NCR? Art workshops let every guest create and take home a keepsake. ₹600/person, all materials included.',
        'url': 'https://kraftykinni.in/blog/art-workshop-ideas-birthday-party-delhi-ncr/',
        'datePublished': '2026-04-29',
        'dateModified': '2026-04-29',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/art-workshop-ideas-birthday-party-delhi-ncr/' },
      },
    ],
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
      <p>Kraftykinni runs private art workshops for birthday parties, kitty parties, bachelorette celebrations, and baby showers across Delhi, Gurgaon, and Noida, led by Shramita Govil, Fevicryl Certified Artist. Starting at ₹600 per person, all materials included. Contact us via WhatsApp or the contact form to discuss your date.</p>
    `,
  },
  {
    path: '/blog/bottle-lamp-art-workshop-school-delhi-ncr',
    title: 'Bottle Lamp Art Workshop for Schools Delhi NCR | Kraftykinni',
    description: 'How Jaypee Public School Noida ran Bottle Lamp Art for 150+ students using Fevicryl Mouldit. A school art activity guide for Delhi NCR.',
    h1: 'Bottle Lamp Art Workshop for Schools: How Jaypee Public School Noida Did It',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'Bottle Lamp Art Workshop for Schools Delhi NCR | Kraftykinni',
        'description': 'How Jaypee Public School Noida ran Bottle Lamp Art for 150+ students using Fevicryl Mouldit. A school art activity guide for Delhi NCR.',
        'url': 'https://kraftykinni.in/blog/bottle-lamp-art-workshop-school-delhi-ncr/',
        'datePublished': '2026-05-02',
        'dateModified': '2026-05-02',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/bottle-lamp-art-workshop-school-delhi-ncr/' },
      },
    ],
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
    path: '/blog/mothers-day-art-workshop-gift-delhi-ncr',
    title: "Mother's Day Art Workshop Gift Ideas Delhi NCR | Kraftykinni",
    description: "Skip the flowers. Gift a Mother's Day art workshop in Delhi NCR. Lippan Art, Bottle Lamp, Clay — ₹600/person, all materials included.",
    h1: "Mother's Day Art Workshop Gift Ideas in Delhi NCR — Make Something She'll Keep",
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': "Mother's Day Art Workshop Gift Ideas Delhi NCR | Kraftykinni",
        'description': "Skip the flowers. Gift a Mother's Day art workshop in Delhi NCR. Lippan Art, Bottle Lamp, Clay — ₹600/person, all materials included.",
        'url': 'https://kraftykinni.in/blog/mothers-day-art-workshop-gift-delhi-ncr/',
        'datePublished': '2026-05-05',
        'dateModified': '2026-05-05',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/mothers-day-art-workshop-gift-delhi-ncr/' },
      },
    ],
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
    path: '/blog/clay-trinket-painting-workshop-cars24-gurgaon',
    title: 'Clay Trinket Painting Workshop — Cars24 Gurgaon | Kraftykinni',
    description: '40 Cars24 employees made hand-painted clay trinkets using Fevicryl Mouldit at their Gurgaon office. A relaxed, creative corporate team session.',
    h1: 'Clay Trinket Painting Workshop at Cars24 Gurgaon — 40 Participants, One Relaxing Afternoon',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'Clay Trinket Painting Workshop — Cars24 Gurgaon | Kraftykinni',
        'description': '40 Cars24 employees made hand-painted clay trinkets using Fevicryl Mouldit at their Gurgaon office. A relaxed, creative corporate team session.',
        'url': 'https://kraftykinni.in/blog/clay-trinket-painting-workshop-cars24-gurgaon/',
        'datePublished': '2026-04-29',
        'dateModified': '2026-04-29',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/clay-trinket-painting-workshop-cars24-gurgaon/' },
      },
    ],
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
      <p>Kraftykinni runs Clay Trinket Painting sessions for corporate groups across Delhi, Gurgaon, and Noida, led by Shramita Govil, Fevicryl Certified Artist. All materials are provided and included in the price. Shramita handles setup and cleanup — your team just needs tables, chairs, and two hours. Groups from 20 to 200+. Pricing from Rs 600 per person. WhatsApp +91 9599622210 or visit kraftykinni.in to book.</p>
    `,
  },

  {
    path: '/blog/summer-art-workshop-for-schools-delhi-ncr',
    title: 'Summer Art Workshops for Schools Delhi NCR | Kraftykinni',
    description: 'Planning a summer art workshop for your school in Delhi NCR? Covers activities, age groups & sizes. Facilitator travels to you. ₹600/student.',
    h1: 'Summer Art Workshops for Schools in Delhi NCR — A Complete Planning Guide',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'Summer Art Workshops for Schools Delhi NCR | Kraftykinni',
        'description': 'Planning a summer art workshop for your school in Delhi NCR? Covers activities, age groups & sizes. Facilitator travels to you. ₹600/student.',
        'url': 'https://kraftykinni.in/blog/summer-art-workshop-for-schools-delhi-ncr/',
        'datePublished': '2026-05-08',
        'dateModified': '2026-05-08',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/summer-art-workshop-for-schools-delhi-ncr/' },
      },
    ],
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
      <p>Kraftykinni runs summer art workshops for schools across Delhi, Gurgaon, and Noida, led by Shramita Govil, Fevicryl Certified Artist. All materials are included. Groups from 30 students to full school batches of 300+. Starting at ₹600 per student. WhatsApp +91 9599622210 or visit kraftykinni.in/school-workshops to enquire.</p>
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
    path: '/blog/fathers-day-gift-ideas-art-workshop-delhi-ncr-2026',
    title: "Father's Day Art Workshop Gift Ideas 2026 | Kraftykinni",
    description: "Handmade Father's Day gift workshops in Delhi NCR — Clay Magnet, Bottle Art & Clay Trinket. Guided sessions from ₹600/person, all materials included.",
    h1: "Father's Day Gift Ideas 2026 — Handmade Art Workshops in Delhi NCR",
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': "Father's Day Art Workshop Gift Ideas 2026 | Kraftykinni",
        'description': "Handmade Father's Day gift workshops in Delhi NCR — Clay Magnet, Bottle Art & Clay Trinket. Guided sessions from ₹600/person, all materials included.",
        'url': 'https://kraftykinni.in/blog/fathers-day-gift-ideas-art-workshop-delhi-ncr-2026/',
        'datePublished': '2026-05-18',
        'dateModified': '2026-05-18',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/fathers-day-gift-ideas-art-workshop-delhi-ncr-2026/' },
      },
    ],
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

  {
    path: '/blog/world-environment-day-upcycled-bottle-art-workshop-delhi-ncr',
    title: 'World Environment Day 2026 — Bottle Art Workshop | Kraftykinni',
    description: 'Celebrate World Environment Day 2026 with upcycled bottle art. Turn old bottles into mandala planters and décor. Workshops across Delhi NCR.',
    h1: 'World Environment Day 2026 — How Upcycled Bottle Art Makes Sustainability Hands-On',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'World Environment Day 2026 — How Upcycled Bottle Art Makes Sustainability Hands-On',
        'description': 'Celebrate World Environment Day 2026 with upcycled bottle art. Turn old bottles into mandala planters and décor. Workshops across Delhi NCR.',
        'url': 'https://kraftykinni.in/blog/world-environment-day-upcycled-bottle-art-workshop-delhi-ncr/',
        'datePublished': '2026-05-30',
        'dateModified': '2026-05-30',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/world-environment-day-upcycled-bottle-art-workshop-delhi-ncr/' },
      },
    ],
    bodyContent: `<h1>World Environment Day 2026 — How Upcycled Bottle Art Makes Sustainability Hands-On</h1>
      <p>World Environment Day falls on 5 June every year — and for most people, it goes by as a scroll through green-tinted social posts and a mental note to do something more sustainable. Kraftykinni offers a different kind of celebration: one where you sit down with a discarded bottle, a brush, and some paint — and turn the thing you were about to throw away into something you actually want to keep.</p>
      <h2>Why Bottle Art Is the Right Activity for Environment Day</h2>
      <p>Bottle art workshops start with what most people would call waste: old glass bottles, empty jam jars, used plastic containers. By the end of 90 minutes, every participant has a decorated planter, a vase, or a home décor piece sitting in front of them. The material transformation is visible and immediate — a hands-on demonstration of upcycling that no presentation can replicate. For schools, it connects craft to the Environment Day lesson naturally. For corporate teams, it works as a CSR or sustainability week activity that runs indoors and produces a take-home piece. For private groups, it is a meaningful afternoon that leaves everyone with something made from something they would have discarded.</p>
      <h2>What Upcycled Bottle Art Looks Like in Practice</h2>
      <p>Dot mandala bottle planters — small black-painted bottles with hand-dotted mandala patterns in jewel colours, topped with greenery — are one of Kraftykinni's most requested Environment Day formats. The technique is the same dot-mandala method used in Mandala Art workshops, applied to a three-dimensional surface. The results are striking enough to sit on a desk or windowsill permanently.</p>
      <h2>Message Bottles — Making Sustainability Personal</h2>
      <p>Message bottle art gives every piece a personal dimension. Participants paint a word or phrase onto the bottle surface — "Home Sweet Home", "Love", "Family" — and the message becomes part of the design. Because no two people paint the same way, no two bottles ever look identical. Jute twine and dried flower finishing details move the result from craft project to something that could sit on a café shelf or a living room sideboard.</p>
      <h2>The Workshops Kraftykinni Runs for Environment Day</h2>
      <p>Kraftykinni runs two primary formats for World Environment Day: Bottle Art Workshop (90 minutes, groups of 20 to 200+) where participants decorate upcycled bottles using Fevicryl colours, lettering, and decorative finishes; and Dot Mandala Planter Workshop (step-by-step guided, no experience needed, groups of 30 to 150). Both are led by Shramita Govil, Fevicryl Certified Artist, and available across Delhi, Gurgaon, and Noida, and online pan-India with shipped material kits. Pricing from ₹600 per person, all materials included.</p>
      <h2>How to Book for World Environment Day 2026</h2>
      <p>World Environment Day is 5 June 2026. Minimum 7 days advance notice required; 2 to 3 weeks strongly recommended for June dates. WhatsApp +91 9599622210 with your date, location, group size, and preferred activity. Confirmation within 24 hours.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What craft activity is best for World Environment Day for a school in Delhi NCR?</h3>
      <p>Upcycled bottle art and dot mandala planter workshops are the strongest options for Environment Day school events. Both use discarded bottles as the creative material, giving the session a direct sustainability message. Groups of 30 to 300 students across Delhi, Gurgaon, and Noida. All materials included from ₹600 per student.</p>
      <h3>Can Kraftykinni run an Environment Day workshop at our corporate office in Delhi NCR?</h3>
      <p>Yes. Kraftykinni runs corporate bottle art and dot mandala workshops for Environment Day CSR events at offices across Delhi, Gurgaon, and Noida. Group sizes from 20 to 200+. Starting at ₹600 per person, all materials included. WhatsApp +91 9599622210 with your date and group size.</p>
      <h3>What is upcycled bottle art and how is it sustainable?</h3>
      <p>Upcycled bottle art transforms discarded glass or plastic bottles into decorated home décor, planters, or vases using paint, clay, and craft materials. The bottle you would throw away becomes the art piece you take home — a practical, hands-on demonstration of the reduce-reuse-recycle principle.</p>
      <h3>How much does a World Environment Day art workshop cost in Delhi NCR?</h3>
      <p>Kraftykinni Environment Day workshops start at ₹600 per person for groups of 100 and above, ₹700 for groups of 50 to 100, and ₹800 for groups of 20 to 50. All materials included. No additional venue or logistics charges.</p>
    `,
  },

  {
    path: '/blog/independence-day-bottle-art-workshop-delhi-ncr',
    title: 'Independence Day Bottle Art Workshop Delhi NCR | Kraftykinni',
    description: 'Celebrate Independence Day 2026 with tricolour bottle art and Har Ghar Tiranga jars. Hands-on workshops for schools, offices and families across Delhi NCR.',
    h1: 'Independence Day 2026 — Tricolour Bottle Art & Har Ghar Tiranga Workshops in Delhi NCR',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'Independence Day 2026 — Tricolour Bottle Art & Har Ghar Tiranga Workshops in Delhi NCR',
        'description': 'Celebrate Independence Day 2026 with tricolour bottle art and Har Ghar Tiranga jars. Hands-on workshops for schools, offices and families across Delhi NCR.',
        'url': 'https://kraftykinni.in/blog/independence-day-bottle-art-workshop-delhi-ncr/',
        'datePublished': '2026-07-24',
        'dateModified': '2026-07-24',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/independence-day-bottle-art-workshop-delhi-ncr/' },
      },
    ],
    bodyContent: `<h1>Independence Day 2026 — Tricolour Bottle Art & Har Ghar Tiranga Workshops in Delhi NCR</h1>
      <p>Independence Day this year falls on a Saturday — which gives schools, offices, and families a rare window to turn the flag hoisting and patriotic songs into something people actually make with their hands. Kraftykinni's Independence Day bottle art takes an ordinary bottle or jar, adds tricolour paint, a monument mural, or a Har Ghar Tiranga-style tag, and hands people a finished piece by the end of the session.</p>
      <h2>Why Bottle Art Works So Well for Independence Day</h2>
      <p>Independence Day events tend to default to a flag hoisting and a patriotic playlist — fine, but rarely something a participant keeps. Bottle art changes that: a group sits down with paints and a plain bottle, and 60 to 90 minutes later everyone has a tricolour vase, a monument-mural bottle, or a set of Har Ghar Tiranga jars in front of them. For schools, it works as a class activity or a station at a bigger 15 August celebration. For corporate teams, a session at the town hall fits naturally alongside the flag hoisting without needing outdoor space. For private groups, housing societies and family gatherings get a genuinely festive activity where the tricolour theme does the decorating for you.</p>
      <h2>What Independence Day Bottle Art Looks Like in Practice</h2>
      <p>Monument-mural bottles use an arch or monument silhouette painted in blue against a bright orange-and-white bottle, finished with a small flag on a stick and a "Proud to Be Indian" tag, with silver-dipped dried flowers for a gift-worthy finish. Har Ghar Tiranga jars take their name from India's flag campaign: three small bottles in saffron, white, and green get polka dots and a hand-painted flower, then a round tag reading हर, घर, and तिरंगा, so the three jars read as one phrase when displayed together.</p>
      <h2>The Workshops Kraftykinni Runs for Independence Day</h2>
      <p>Independence Day bottle art runs as part of Kraftykinni's existing Bottle Lamp Art workshop, adapted with a tricolour theme for the season, using Fevicryl acrylic colours and finishing elements like dried flowers, twine, and flags. A single-bottle session runs 60 to 90 minutes; a three-jar Har Ghar Tiranga set runs closer to 90 minutes. Both formats work for groups of 15 to 200+ across Delhi, Gurgaon, and Noida, led by Shramita Govil, Fevicryl Certified Artist, with online kits available pan-India.</p>
      <h2>How to Book for Independence Day 2026</h2>
      <p>Independence Day is 15 August 2026. Minimum 7 days advance notice required; 2 to 3 weeks recommended given seasonal demand. WhatsApp +91 9599622210 with your date, location, group size, and preferred format. Confirmation within 24 hours.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What craft activity works best for Independence Day in a Delhi NCR school?</h3>
      <p>Tricolour monument-mural bottle art and Har Ghar Tiranga jar sets are the strongest options, producing a finished take-home piece within a single art period. Groups of 20 to 300+ across Delhi, Gurgaon, and Noida, from ₹600 per student.</p>
      <h3>Can Kraftykinni run an Independence Day workshop at our corporate office in Delhi NCR?</h3>
      <p>Yes. Kraftykinni runs corporate Independence Day bottle art sessions at offices across Delhi, Gurgaon, and Noida. Group sizes from 20 to 200+, starting at ₹600 per person, all materials included. WhatsApp +91 9599622210 with your date and group size.</p>
      <h3>What is Har Ghar Tiranga bottle art?</h3>
      <p>Har Ghar Tiranga bottle art takes its name from India's "every home, a tricolour" flag campaign. Participants paint three small bottles — saffron, white, and green — with a hand-painted flower and a Hindi tag, so the set together reads हर घर तिरंगा.</p>
      <h3>How much does an Independence Day art workshop cost in Delhi NCR?</h3>
      <p>Kraftykinni Independence Day workshops start at ₹600 per person for groups of 100+, ₹700 for groups of 50 to 100, and ₹800 for groups of 20 to 50. All materials included, no additional venue or logistics charges.</p>
    `,
  },

  {
    path: '/blog/raksha-bandhan-mdf-fridge-magnet-workshop-delhi-ncr',
    title: 'Raksha Bandhan MDF Fridge Magnet Workshop | Kraftykinni',
    description: 'Celebrate Raksha Bandhan 2026 with hand-painted MDF fridge magnet gifts for siblings. Personalised workshops for schools, offices, families in Delhi NCR.',
    h1: 'Raksha Bandhan 2026 — Hand-Painted MDF Fridge Magnet Gifts for Siblings in Delhi NCR',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'Raksha Bandhan 2026 — Hand-Painted MDF Fridge Magnet Gifts for Siblings in Delhi NCR',
        'description': 'Celebrate Raksha Bandhan 2026 with hand-painted MDF fridge magnet gifts for siblings. Personalised workshops for schools, offices, families in Delhi NCR.',
        'url': 'https://kraftykinni.in/blog/raksha-bandhan-mdf-fridge-magnet-workshop-delhi-ncr/',
        'datePublished': '2026-07-25',
        'dateModified': '2026-07-25',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/raksha-bandhan-mdf-fridge-magnet-workshop-delhi-ncr/' },
      },
    ],
    bodyContent: `<h1>Raksha Bandhan 2026 — Hand-Painted MDF Fridge Magnet Gifts for Siblings in Delhi NCR</h1>
      <p>Raksha Bandhan this year falls on Friday, 28 August — a little over four weeks from now, and enough runway for a gift that takes more than a five-minute online order. Kraftykinni's Raksha Bandhan MDF plaque workshop gives siblings a different kind of rakhi gift: a hand-painted wooden plaque or fridge magnet, personalised with a name, a private joke, or a message a store-bought rakhi hamper never quite manages.</p>
      <h2>Why a Hand-Painted Plaque Beats a Store-Bought Rakhi Gift</h2>
      <p>Most Raksha Bandhan gifts follow the same script: a rakhi, sweets, an envelope — fine, but rarely something the sibling actually made. A Kraftykinni MDF plaque workshop changes that: participants paint a message onto a plain wooden shape themselves. For schools, a pre-Raksha Bandhan art period turns a classroom craft session into a real Rakhi gift. For corporate teams, a plaque or fridge magnet session doubles as a festive employee engagement activity in the run-up to 28 August. For private groups, sisters and brothers can turn gift-shopping into an afternoon spent painting together.</p>
      <h2>What Raksha Bandhan Plaque Art Looks Like in Practice</h2>
      <p>One of the most requested formats is the sibling-on-a-sofa design — two painted figures wrestling over a TV remote, painted in warm orange and teal with polka-dot upholstery detail. It reads as affectionate teasing rather than generic décor, and it's usually the plaque siblings laugh at hardest when they unwrap it.</p>
      <h2>The Tom & Jerry Bond Plaque</h2>
      <p>A teal rectangular plaque reading "Tom & Jerry Bond — We Love, Fight, Care" pairs two painted figures holding hands with a caption that sums up most sibling relationships in five words. Because every piece is hand-painted, no two plaques look identical even when participants choose the same quote.</p>
      <h2>Making It a Family Set</h2>
      <p>For siblings with more than one brother or sister to acknowledge, a circular hoop-style plaque reading "We don't need a superhero, we have a little brother" — painted across a teal-to-blue ombré background with three figures — works well as one keepsake representing the whole sibling group.</p>
      <h2>The Workshop Kraftykinni Runs for Raksha Bandhan</h2>
      <p>Kraftykinni runs this as part of its existing MDF Fridge Magnet workshop, adapted with Raksha Bandhan quotes and sibling-themed illustrations. Participants paint with Fevicryl acrylic colours on pre-cut MDF shapes using stencils or freehand lettering — no experience needed. Sessions are led by Shramita Govil, Fevicryl Certified Artist. Each participant typically finishes 2 to 3 pieces in a 1 to 2 hour session, for groups of 20 to 200+ across Delhi, Gurgaon, and Noida, with online kits shipped pan-India. All materials included.</p>
      <h2>How to Book for Raksha Bandhan 2026</h2>
      <p>Raksha Bandhan 2026 is 28 August 2026. Minimum 7 days advance notice required; 2 to 3 weeks recommended for dates near 28 August. WhatsApp +91 9599622210 with your date, location, group size, and preferred format. Confirmation within 24 hours.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What craft activity works best for Raksha Bandhan in a Delhi NCR school?</h3>
      <p>Hand-painted MDF plaques and fridge magnets are the strongest options, letting students personalise a wooden plaque for a sibling within a single art period. Groups of 20 to 300+ across Delhi, Gurgaon, and Noida, from ₹600 per student.</p>
      <h3>Can Kraftykinni run a Raksha Bandhan workshop at our corporate office in Delhi NCR?</h3>
      <p>Yes. Kraftykinni runs corporate MDF plaque and fridge magnet sessions for Raksha Bandhan at offices across Delhi, Gurgaon, and Noida. Group sizes from 20 to 200+, starting at ₹600 per person, all materials included. WhatsApp +91 9599622210 with your date and group size.</p>
      <h3>Can MDF plaques be personalised with a sibling's name or a specific message?</h3>
      <p>Yes. Participants paint any message or illustration they choose, including a sibling's name or a private joke, guided by stencils or freehand lettering. Popular formats include quote plaques, couch-scene magnets, and multi-figure hoop designs.</p>
      <h3>How much does a Raksha Bandhan art workshop cost in Delhi NCR?</h3>
      <p>Kraftykinni Raksha Bandhan workshops start at ₹600 per person for groups of 100+, ₹700 for groups of 50 to 100, and ₹800 for groups of 20 to 50. All materials included, no additional venue or logistics charges.</p>
    `,
  },

  {
    path: '/blog/friendship-day-photo-magnet-workshop-delhi-ncr',
    title: 'Friendship Day Photo Magnet Workshop | Kraftykinni',
    description: 'Celebrate Friendship Day 2026 with hand-painted photo magnets for best friends. Personalised MDF magnet workshops in Delhi, Gurgaon and Noida.',
    h1: 'Friendship Day 2026 — Hand-Painted Photo Magnets for Best Friends in Delhi NCR',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'Friendship Day 2026 — Hand-Painted Photo Magnets for Best Friends in Delhi NCR',
        'description': 'Celebrate Friendship Day 2026 with hand-painted photo magnets for best friends. Personalised MDF magnet workshops in Delhi, Gurgaon and Noida.',
        'url': 'https://kraftykinni.in/blog/friendship-day-photo-magnet-workshop-delhi-ncr/',
        'datePublished': '2026-07-28',
        'dateModified': '2026-07-28',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/friendship-day-photo-magnet-workshop-delhi-ncr/' },
      },
    ],
    bodyContent: `<h1>Friendship Day 2026 — Hand-Painted Photo Magnets for Best Friends in Delhi NCR</h1>
      <p>Friendship Day falls on Sunday, 2 August this year — less than a week away. Kraftykinni's photo magnet workshop gives a friend group a different kind of gift: a hand-painted MDF magnet with an actual photo of the two of you set into a painted frame, made by hand rather than picked off a shelf.</p>
      <h2>Why a Photo Magnet Beats a Store-Bought Friendship Band</h2>
      <p>Most Friendship Day gifts follow the same script: a band, a card, a box of chocolates — fine, but none of it something either friend actually made. A Kraftykinni photo magnet workshop changes that: participants paint a frame around a printed photo of themselves and a friend, finished with hand-sculpted details. For schools and colleges, a pre-Friendship Day art period turns a classroom craft session into a real gift. For corporate teams, a photo magnet session doubles as a festive employee engagement activity around 2 August. For private groups, a friend circle can turn Friendship Day plans into an afternoon of painting together.</p>
      <h2>Works for Any Duo</h2>
      <p>The format isn't limited to one photo style — a round frame with a polka-dot border and a hand-sculpted rose works just as well for any pair, with painting choices entirely up to whoever's holding the brush.</p>
      <h2>The Batch Reunion Magnet</h2>
      <p>For friend groups from school or college, a themed magnet works particularly well — a circular frame with a "Class Of" illustration and hand-sculpted details around the edge, a popular pick when a batch of friends wants one keepsake that nods to where the friendship started.</p>
      <h2>Personalising With a Name</h2>
      <p>Not every piece needs a photo. A name, a heart, and a few hand-sculpted flowers on a painted MDF base is its own kind of Friendship Day keepsake, useful when a friend prefers a nameplate-style gift over a photo piece.</p>
      <h2>The Workshop Kraftykinni Runs for Friendship Day</h2>
      <p>Kraftykinni runs this as part of its existing MDF Fridge Magnet workshop, adapted with photo transfers and Friendship Day details. Participants paint pre-cut MDF shapes with Fevicryl acrylic colours and finish them with hand-sculpted clay details — no experience needed. Sessions are led by Shramita Govil, Fevicryl Certified Artist. Each participant typically finishes 1 to 2 pieces in a 1 to 2 hour session, for groups of 20 to 200+ across Delhi, Gurgaon, and Noida, with online kits shipped pan-India.</p>
      <h2>How to Book for Friendship Day 2026</h2>
      <p>Friendship Day 2026 is 2 August 2026 — less than a week away. WhatsApp +91 9599622210 as soon as possible with your date, location, group size, and the photos you'd like used; confirmation within 24 hours on whether it can be arranged in time.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What craft activity works best for Friendship Day in Delhi NCR?</h3>
      <p>Hand-painted MDF photo magnets are the strongest option — friends personalise a wooden magnet with a printed photo within a single session. Groups of 20 to 200+ across Delhi, Gurgaon, and Noida, from ₹600 per person.</p>
      <h3>Can Kraftykinni run a Friendship Day workshop at our corporate office in Delhi NCR?</h3>
      <p>Yes. Kraftykinni runs corporate photo magnet sessions for Friendship Day at offices across Delhi, Gurgaon, and Noida. Group sizes from 20 to 200+, starting at ₹600 per person, all materials included. WhatsApp +91 9599622210 with your date and group size.</p>
      <h3>Can the magnet include an actual photo of us?</h3>
      <p>Yes. Each photo magnet is built around a printed photo set into a hand-painted MDF frame. It helps to share the image you want used when you confirm your booking so it is ready in time.</p>
      <h3>How much does a Friendship Day photo magnet workshop cost in Delhi NCR?</h3>
      <p>Kraftykinni Friendship Day workshops start at ₹600 per person for groups of 100+, ₹700 for groups of 50 to 100, and ₹800 for groups of 20 to 50. All materials included, no additional venue or logistics charges.</p>
    `,
  },

  {
    path: '/blog/dot-mandala-art-corporate-workshop-noida',
    title: 'Dot Mandala Art Corporate Workshop | Kraftykinni',
    description: 'A 20-person team in Noida Sector 90 traded desks for dot mandala art with Kraftykinni — a relaxed, no-experience corporate reset. See how the session ran.',
    h1: 'Dot Mandala Art at a Noida Corporate Office — 20 People, One Desk-Side Afternoon',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'Dot Mandala Art at a Noida Corporate Office — 20 People, One Desk-Side Afternoon',
        'description': 'A 20-person team in Noida Sector 90 traded desks for dot mandala art with Kraftykinni — a relaxed, no-experience corporate reset. See how the session ran.',
        'url': 'https://kraftykinni.in/blog/dot-mandala-art-corporate-workshop-noida/',
        'datePublished': '2026-08-02',
        'dateModified': '2026-08-02',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/dot-mandala-art-corporate-workshop-noida/' },
      },
    ],
    bodyContent: `<h1>Dot Mandala Art at a Noida Corporate Office — 20 People, One Desk-Side Afternoon</h1>
      <p>Last week, a 20-person team at an office in Noida Sector 90 didn't head offsite for their team activity. Kraftykinni brought the studio to them, straight to the office floor — keyboards pushed back, laptops closed, desks covered in palettes, dotting tools, and blank round wooden discs. By 3:00 PM they were managers, analysts, and developers. By 3:30 PM they were just people trying to keep their dot spacing even.</p>
      <h2>What Is Dot Mandala Art?</h2>
      <p>Dot Mandala Art is a variation of Kraftykinni's Mandala Art workshop built entirely from dots rather than brush strokes. Participants use fine dotting tools and acrylic paints to build symmetrical, radiating patterns one dot at a time on a round wooden or MDF base. It is slower and more meditative than free-hand painting, which is exactly why it works as a corporate reset — there is no fast way to rush a dot mandala. No prior art experience is needed.</p>
      <h2>How the Session Ran</h2>
      <p>The session ran desk-side rather than in a separate breakout room — set up directly at the team's own workstations with all materials included, no offsite venue or added logistics. The results captured very different personalities in the room: carefully detailed dot mandalas, a few serene landscape pieces, and one deeply stressed-out cartoon character that had the whole floor laughing. Every finished piece was different, even though everyone started with the same blank base and the same technique.</p>
      <h2>Why It Works as a Corporate Reset</h2>
      <p>There is something genuinely disarming about watching corporate hierarchy fall away the moment everyone is handed a paintbrush and a set of dots to fill in. For that hour, nobody was checking their inbox. "Burnout" is talked about often in workplace circles, usually as something solved with more rest — but sometimes the better reset for an overworked mind is doing something completely different with your hands for an hour, with a real object to show for it at the end.</p>
      <h2>Book a Desk-Side Dot Mandala Session for Your Team</h2>
      <p>Kraftykinni runs Dot Mandala Art as a desk-side or boardroom corporate session, led by Shramita Govil, Fevicryl Certified Artist, with no offsite venue required. Groups from 20 to 200+, across Delhi, Gurgaon, and Noida. Pricing starts at ₹600 per person, all materials included. WhatsApp +91 9599622210 to book or check availability.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What is Dot Mandala Art?</h3>
      <p>A version of mandala painting built entirely from dots rather than brush strokes, using fine dotting tools and acrylic paint on a round wooden or MDF base. It requires patience rather than prior art skill.</p>
      <h3>Can Kraftykinni run a Dot Mandala Art workshop at our office in Noida?</h3>
      <p>Yes. Kraftykinni runs desk-side and boardroom Dot Mandala Art sessions for corporate teams across Noida, Delhi, and Gurgaon, working directly at your existing office space. A recent session ran for a 20-person team at a Noida Sector 90 office.</p>
      <h3>Do participants need any art experience?</h3>
      <p>No. The activity is guided step by step and relies on repetition rather than freehand drawing skill.</p>
      <h3>How long does a Dot Mandala Art corporate session take?</h3>
      <p>A desk-side session can run in about an hour, or 1.5 to 2 hours for a fuller workshop format with a demonstration and more detailed pieces.</p>
      <h3>What does a Dot Mandala Art corporate workshop cost in Noida?</h3>
      <p>Pricing starts at ₹600 per person for groups of 100+, ₹700 for 50–100, and ₹800 for groups of 20–50. All materials included, no separate venue charge since sessions run at your own office.</p>
    `,
  },

  {
    path: '/blog/block-printing-workshop-delhi-israeli-family',
    title: 'Block Printing Workshop Delhi: Israel to India | Kraftykinni',
    description: 'A private block printing workshop in Delhi for a mother-daughter duo from Israel — the craft, the story, and the fabric they took home. Book with Kraftykinni.',
    h1: 'A Block Printing Workshop in Delhi, for a Mother and Daughter Visiting from Israel',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'A Block Printing Workshop in Delhi, for a Mother and Daughter Visiting from Israel',
        'description': 'A private block printing workshop in Delhi for a mother-daughter duo from Israel — the craft, the story, and the fabric they took home. Book with Kraftykinni.',
        'url': 'https://kraftykinni.in/blog/block-printing-workshop-delhi-israeli-family/',
        'datePublished': '2026-07-19',
        'dateModified': '2026-07-19',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/block-printing-workshop-delhi-israeli-family/' },
      },
    ],
    bodyContent: `<h1>A Block Printing Workshop in Delhi, for a Mother and Daughter Visiting from Israel</h1>
      <p>Most Kraftykinni sessions are booked for a birthday, a school event, or a corporate offsite. This one was different. A mother and daughter, visiting India from Israel, reached out specifically to learn the traditional art of Indian block printing — and asked if we could teach them privately, in their hotel room, before they flew home. We said yes, and spent an afternoon sitting on the floor of their room surrounded by carved wooden blocks, small pots of colour, and a long spread of plain white fabric.</p>
      <h2>A Workshop Built Around Two People, Not Twenty</h2>
      <p>Kraftykinni sessions usually run for groups of 20, 50, sometimes 200. This one was for two — a mother and her daughter, with one facilitator and the time to explain the craft properly. This kind of one-on-one or small private session sits alongside Kraftykinni's usual private art workshops — the same craft, the same materials, just scaled down to fit a family, a couple, or a small group of friends rather than an event.</p>
      <h2>What Block Printing Actually Is</h2>
      <p>Block printing is one of India's oldest textile traditions, practised for centuries across Rajasthan and Gujarat — Bagru and Sanganer near Jaipur, and the Ajrakh work of Kutch, among others. Each pattern is carved by hand into a block of wood, usually teak or sheesham, with a separate block cut for every colour in the design. The block is pressed onto a pad loaded with fabric-safe colour, then stamped onto the cloth with even, direct pressure. The real skill is in repetition: consistent spacing and alignment across the whole length of fabric.</p>
      <h2>The Paint Drop That Almost Ruined a Hotel Bedsheet</h2>
      <p>They were doing so well until a single bright drop of paint landed right on the hotel's white bedsheet. For a second, everyone froze, then came the shared panic of scrubbing it clean before the hotel staff noticed. The stress turned into a proper laughing fit almost immediately after, and it set the tone for the rest of the session.</p>
      <h2>A Fabric Piece Worth Carrying Home to Israel</h2>
      <p>By the end of the afternoon, the plain white fabric was covered in leaf motifs and small flowers — a full repeating pattern built stamp by stamp across the entire length. Sharing a piece of Indian craft heritage with someone from across the world, and watching it travel back to Israel in a suitcase, is one of the more rewarding parts of running Kraftykinni.</p>
      <h2>Why Private Sessions Work Well for Visitors to India</h2>
      <p>A private session fits around a travel itinerary rather than the other way round, and it can run wherever the guest already is — a hotel room, a serviced apartment, or a private residence. It works well for families, small friend groups, or a parent and child looking for a hands-on introduction to an Indian craft.</p>
      <h2>Book a Private Block Printing Workshop in Delhi NCR</h2>
      <p>Kraftykinni runs private block printing sessions across Delhi, Gurgaon, and Noida. Larger private group bookings (10+ participants) start at ₹600–₹800 per person, all materials included. For a smaller or custom session, WhatsApp +91 9599622210 with your dates, location, and group size.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>Can tourists visiting Delhi book a private block printing workshop?</h3>
      <p>Yes. Kraftykinni runs private block printing sessions for visitors to Delhi NCR, including at hotels and private residences. WhatsApp +91 9599622210 with your dates, location, and group size.</p>
      <h3>What is block printing and where does it come from in India?</h3>
      <p>Block printing is a centuries-old Indian textile craft using hand-carved wooden blocks to stamp patterns onto fabric, strongly associated with Bagru and Sanganer in Rajasthan and Ajrakh printing from Kutch in Gujarat.</p>
      <h3>How long does a private block printing session take?</h3>
      <p>A private block printing session typically runs 1.5 to 2.5 hours, including an introduction to the technique, guided practice, and time to complete a full patterned piece.</p>
      <h3>How much does a private block printing workshop cost in Delhi NCR?</h3>
      <p>Larger private group bookings (10+ participants) start at ₹600–₹800 per person, all materials included. For smaller or custom sessions, WhatsApp +91 9599622210 for a quote.</p>
    `,
  },

  // ── Workshop detail pages ─────────────────────────────────────────────────
  {
    path: '/workshops/lippan-art',
    title: 'Lippan Art Workshop Delhi NCR — Kutch Mirror Work | Kraftykinni',
    description: 'Lippan Art workshop in Delhi NCR — Kutch mirror work in a guided session. Corporate, schools & events. All materials included. ₹600–₹800/person.',
    h1: 'Lippan Art Workshop in Delhi NCR',
    bodyContent: `<h1>Lippan Art Workshop in Delhi NCR</h1><p>Lippan Art is a centuries-old folk craft from the Kutch region of Gujarat where artisans use clay and mirror work to create intricate wall decorations. In our Lippan Art workshop, participants experience this meditative craft firsthand — shaping clay patterns, embedding mirrors, and creating a piece of genuine Indian heritage they can take home. It is one of our most requested activities for corporate teams and school groups alike.</p><h2>What you make</h2><p>A finished Lippan Art wall piece with clay patterning and embedded mirrors — a unique, display-ready piece of folk art.</p><h2>Who it is for</h2><p>Perfect for corporate team-building events, school art days, college fests, and private parties. No prior art experience needed. Duration: 2 to 2.5 hours. Group size: 20 to 200+ participants. Location: Delhi, Gurgaon, Noida and online pan-India. All materials included. Pricing from ₹600 per person.</p><h2>Why this activity works for corporate teams</h2><p>The meditative, repetitive nature of shaping clay and placing mirrors creates a calm, focused atmosphere — a rare and valuable contrast to the pace of corporate life. Every participant produces a strikingly beautiful piece, regardless of prior art experience. Lippan Art is one of the highest-rated activities in participant feedback across all 13 Kraftykinni workshops.</p>${workshopFaqHtml('lippan-art')}`,
  },
  {
    path: '/workshops/mandala-art',
    title: 'Mandala Art Workshop Delhi NCR — Stress Relief | Kraftykinni',
    description: 'Mandala Art workshop in Delhi NCR. Meditative mandala painting for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    h1: 'Mandala Art Workshop in Delhi NCR',
    bodyContent: `<h1>Mandala Art Workshop in Delhi NCR</h1><p>Mandala art is one of the most universally loved art forms — symmetrical, meditative, and endlessly satisfying to create. Our Mandala Art workshops guide participants through building their own mandala from the centre outward, using dotting tools, colours, and repetitive patterns that calm the mind and engage full attention. Popular as a corporate wellness activity and equally loved by school students.</p><h2>What you make</h2><p>A colourful, symmetric mandala artwork on canvas or paper — a beautiful piece to display or gift.</p><h2>Who it is for</h2><p>Ideal for corporate wellness sessions, mental health awareness events, school art days, and team-building retreats. Duration: 1.5 to 2 hours. Pricing from ₹600 per person. All materials included.</p><h2>Why mandala art works as a corporate activity</h2><p>Scientific research consistently links repetitive pattern-making with reduced cortisol levels and improved focus. For HR teams planning a wellness day, a mindfulness workshop, or simply a positive break from the work week, Mandala Art delivers measurable impact alongside a beautiful physical takeaway.</p>${workshopFaqHtml('mandala-art')}`,
  },
  {
    path: '/workshops/tie-and-dye',
    title: 'Tie & Dye Workshop Delhi NCR — High-Energy Team Activity | Kraftykinni',
    description: 'Tie & Dye workshop in Delhi NCR. High-energy fabric dyeing for corporate teams, schools & events. Wearable takeaway. All materials included. ₹600–₹800/person.',
    h1: 'Tie & Dye Workshop in Delhi NCR',
    bodyContent: `<h1>Tie and Dye Workshop in Delhi NCR</h1><p>Tie and Dye is the workshop that fills a room with laughter, colour, and energy. Participants fold, twist, and bind fabric before applying vibrant dyes — and every single piece turns out uniquely different. Because the outcome is a wearable item — a t-shirt, dupatta, or tote — participants carry the memory of the event into their daily lives long after the workshop ends.</p><h2>What you make</h2><p>A one-of-a-kind tie-dye fabric item — t-shirt, tote bag, or dupatta — to wear and keep.</p><h2>Who it is for</h2><p>Best for high-energy corporate events, college fests, team outings, and large group gatherings of 50 to 200+ people. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p><h2>Why Tie and Dye is popular for large corporate events</h2><p>Unlike most art activities, Tie and Dye creates visible, energetic activity across a room. The process is visual, tactile, and social — groups naturally interact and compare results. For annual day events, outdoor corporate events, and high-energy onboarding programmes, Tie and Dye is consistently the highest-energy option in the Kraftykinni catalogue.</p>${workshopFaqHtml('tie-and-dye')}`,
  },
  {
    path: '/workshops/boho-canvas',
    title: 'Boho Canvas Art Workshop Delhi NCR — Abstract Painting | Kraftykinni',
    description: 'Boho Canvas Art workshop in Delhi NCR. Guided abstract canvas painting for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    h1: 'Boho Canvas Art Workshop in Delhi NCR',
    bodyContent: `<h1>Boho Canvas Art Workshop in Delhi NCR</h1><p>Boho Canvas Art combines warm earthy tones, abstract composition, and layered textures into a painting style that looks impressive but requires no drawing skills. Participants learn to blend colours, layer shapes, and create the bohemian aesthetic that has become one of the most popular contemporary art styles for home décor. Each canvas is unique to the person who painted it.</p><h2>What you make</h2><p>A finished boho-style canvas painting in earthy, warm tones — ready to hang at home or gift.</p><h2>Who it is for</h2><p>Popular choice for corporate team events, art days at schools and colleges, and private birthday or kitty parties. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>${workshopFaqHtml('boho-canvas')}`,
  },
  {
    path: '/workshops/bottle-lamp-art',
    title: 'Bottle Lamp Art Workshop Delhi NCR — Upcycling Craft | Kraftykinni',
    description: 'Bottle Lamp Art workshop in Delhi NCR. Transform glass bottles into glowing lamps. Corporate & school sessions. All materials included. ₹600–₹800/person.',
    h1: 'Bottle Lamp Art Workshop in Delhi NCR',
    bodyContent: `<h1>Bottle Lamp Art Workshop in Delhi NCR</h1><p>Bottle Lamp Art is one of our most magical workshops — participants paint and decorate glass bottles, which are then fitted with fairy lights to create glowing home décor pieces. It blends sustainability through upcycling, creativity, and a deeply satisfying result. When the lights come on at the end of the session, the room transforms.</p><h2>What you make</h2><p>A hand-painted glass bottle lamp with fairy lights — a glowing, functional piece of home décor.</p><h2>Who it is for</h2><p>Great for corporate gifting events, school craft days, private parties, and eco-themed corporate events. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>${workshopFaqHtml('bottle-lamp-art')}`,
  },
  {
    path: '/workshops/block-printing',
    title: 'Block Printing Workshop Delhi NCR — Indian Craft | Kraftykinni',
    description: 'Block Printing workshop in Delhi NCR. Learn traditional Indian block printing on fabric. Corporate & school sessions. All materials included. ₹600–₹800/person.',
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
    path: '/workshops/clay-art',
    title: 'Clay Art Workshop Delhi NCR — Therapeutic Sculpting | Kraftykinni',
    description: 'Clay Art workshop in Delhi NCR. Hands-on clay sculpting for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    h1: 'Clay Art Workshop in Delhi NCR',
    bodyContent: `<h1>Clay Art Workshop in Delhi NCR</h1><p>Working with clay is one of the most grounding, stress-relieving creative experiences available. Our Clay Art workshops guide participants through sculpting small 3D objects — decorative bowls, figures, jewellery holders, or fridge magnets — using air-dry clay. The tactile nature of the material engages the nervous system and produces a state of calm focus that participants often describe as genuinely therapeutic.</p><h2>What you make</h2><p>A handcrafted clay sculpture or functional object — air-dried and ready to take home.</p><h2>Who it is for</h2><p>Ideal for corporate wellness days, school art sessions, stress management workshops, and mindfulness events. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>${workshopFaqHtml('clay-art')}`,
  },
  {
    path: '/workshops/glass-painting',
    title: 'Glass Painting Workshop Delhi NCR — Translucent Art | Kraftykinni',
    description: 'Glass Painting workshop in Delhi NCR. Learn glass painting in a guided group session. Corporate, school & events. All materials included. ₹600–₹800/person.',
    h1: 'Glass Painting Workshop in Delhi NCR',
    bodyContent: `<h1>Glass Painting Workshop in Delhi NCR</h1><p>Glass Painting produces some of the most visually spectacular results of any workshop activity — translucent colours that glow when light passes through them. Participants paint directly onto glass surfaces using special glass paints, creating geometric or floral patterns that look stunning on display. It is a medium that most people have never tried, which makes the experience feel novel and memorable.</p><h2>What you make</h2><p>A hand-painted glass piece — a frame, bottle, or panel — with translucent painted designs.</p><h2>Who it is for</h2><p>Popular at corporate events, school art days, and private parties. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>${workshopFaqHtml('glass-painting')}`,
  },
  {
    path: '/workshops/texture-art',
    title: 'Texture Art Workshop Delhi NCR — Beginner-Friendly | Kraftykinni',
    description: 'Texture Art workshop in Delhi NCR. Layered mixed-media canvas — tissue, acrylic & paste. Beginner-friendly. Corporate, schools & events. From ₹600/person.',
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
    path: '/workshops/tote-bag-painting',
    title: 'Tote Bag Painting Workshop Delhi NCR — ₹600/person | Kraftykinni',
    description: 'Tote Bag Painting workshop in Delhi NCR. Custom branding for corporate events. Eco-friendly, functional takeaway. All materials included. ₹600–₹800/person.',
    h1: 'Tote Bag Painting Workshop in Delhi NCR',
    bodyContent: `<h1>Tote Bag Painting Workshop in Delhi NCR</h1><p>Tote Bag Painting is one of our most sustainable and practically useful workshops. Each participant paints their own cotton tote bag using fabric paints and stencils, creating a personalised, eco-friendly bag they will actually use. For corporates, we can incorporate brand elements or event themes — making it an excellent branded gifting workshop. Pricing from ₹600 per person, all materials included.</p><h2>What you make</h2><p>A hand-painted cotton tote bag with personalised or themed designs — durable, usable, and eco-friendly. Fabric paint dries within 15 to 20 minutes, so every participant can handle and pack their tote before the workshop ends.</p><h2>Custom Branding for Corporate Events</h2><p>Tote Bag Painting is the only Kraftykinni activity where company branding can be incorporated directly onto the artwork. We can pre-print your logo or event theme on the bags before the session — participants then personalise them further with their own painted designs. The result is a branded gifting piece that is genuinely handmade, not a generic promotional item. HR teams running CSR days, sustainability events, or onboarding programmes have used this format to create takeaways that employees actually keep and use — providing ongoing brand visibility long after the event ends.</p><h2>Why Tote Bag Painting Works for Corporate Gifting</h2><p>Most corporate event takeaways are forgotten within a week. A hand-painted tote bag is different: it is functional, eco-friendly, and visibly personal. Participants use it for groceries, commuting, and errands — which means your brand remains visible for months. It is the most environmentally conscious activity in the Kraftykinni catalogue, making it the top choice for sustainability-themed events, Earth Day programmes, and CSR workshops across Delhi NCR.</p><h2>Who it is for</h2><p>Excellent for corporate gifting events, sustainability-themed workshops, school annual days, and private parties. Duration: 1.5 to 2 hours. Groups from 20 to 200+. Pricing from ₹600 per person.</p><h2>Frequently Asked Questions</h2><h3>Can you add our company logo to the tote bags?</h3><p>Yes — Kraftykinni can pre-print your company logo or event theme on the bags before the workshop. Participants then add their own painted designs around the branding, creating a personalised gifting piece.</p><h3>What fabric and paint is used?</h3><p>We use plain cotton canvas tote bags and professional-grade fabric acrylic colours. The paint is non-toxic, water-resistant once dry, and safe for daily use. Stencils and fine brushes are provided for all skill levels.</p><h3>Is the painted design washable?</h3><p>Yes — fabric acrylic paint is wash-fast once fully dry and heat-set. We recommend a gentle first hand-wash before machine washing, and turning the bag inside out for subsequent washes.</p>`,
  },
  {
    path: '/workshops/trinket-tray',
    title: 'Trinket Tray Painting Workshop Delhi NCR — Desk Décor | Kraftykinni',
    description: 'Trinket Tray Painting workshop in Delhi NCR. Paint your own decorative desk tray. Corporate & school sessions. All materials included. ₹600–₹800/person.',
    h1: 'Trinket Tray Painting Workshop in Delhi NCR',
    bodyContent: `<h1>Trinket Tray Painting Workshop in Delhi NCR</h1><p>Trinket Tray Painting gives participants a plain MDF or ceramic tray and the freedom to transform it into something beautiful. Using acrylic paints, brushes, and simple decorative techniques, each tray becomes a unique piece of functional desk art. It is a quick, satisfying activity that produces immediate results.</p><h2>What you make</h2><p>A hand-painted trinket or jewellery tray — colourful, functional, and personalised.</p><h2>Who it is for</h2><p>Great for corporate events, school workshops, office parties, and bridal events. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>${workshopFaqHtml('trinket-tray')}`,
  },
  {
    path: '/workshops/mdf-fridge-magnet',
    title: 'MDF Fridge Magnet Workshop Delhi NCR | Kraftykinni',
    description: 'MDF Fridge Magnet painting workshop in Delhi NCR. Fun, quick craft for corporate teams, schools & events. All materials included. ₹600–₹800/person.',
    h1: 'MDF Fridge Magnet Painting Workshop in Delhi NCR',
    bodyContent: `<h1>MDF Fridge Magnet Painting Workshop in Delhi NCR</h1><p>The MDF Fridge Magnet workshop is proof that great art does not need a large canvas. Participants paint and personalise small MDF shapes — animals, letters, frames, or abstract forms — which become fridge magnets they take home. The activity is quick, cheerful, and produces a result that participants see every single day when they open their fridge.</p><h2>What you make</h2><p>A set of hand-painted MDF fridge magnets — personalised, colourful, and daily-use.</p><h2>Who it is for</h2><p>Perfect for quick corporate engagement sessions, school craft days, large events with tight schedules, and children's parties. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>${workshopFaqHtml('mdf-fridge-magnet')}`,
  },
  {
    path: '/workshops/canvas-pouch',
    title: 'Canvas Pouch Painting Workshop Delhi NCR | Kraftykinni',
    description: 'Canvas Pouch Painting workshop in Delhi NCR. Personalise your own canvas pouch with fabric paints. Corporate, school & events. All materials included.',
    h1: 'Canvas Pouch Painting Workshop in Delhi NCR',
    bodyContent: `<h1>Canvas Pouch Painting Workshop in Delhi NCR</h1><p>Canvas Pouch Painting lets participants personalise a compact fabric pouch using fabric paints, fine brushes, and stencils. The smaller canvas encourages precision and detailed work — participants focus deeply on their design and leave with a pouch they actually use for makeup, stationery, or accessories.</p><h2>What you make</h2><p>A hand-painted canvas pouch — personalised with the participant's own design and ready for daily use.</p><h2>Who it is for</h2><p>Ideal for corporate gifting events, school sessions, college workshops, and intimate private parties. Duration: 1.5 to 2 hours. All materials included. Pricing from ₹600 per person.</p>${workshopFaqHtml('canvas-pouch')}`,
  },
  {
    path: '/workshops/wall-rope-art',
    title: 'Wall Rope Art Workshop Delhi NCR — Boho Wall Décor | Kraftykinni',
    description: 'Wall Rope Art workshop in Delhi NCR. Coil natural cotton rope and paint it with earthy botanical & boho designs. Corporate, school & private events. All materials included. ₹600–₹800/person.',
    h1: 'Wall Rope Art Workshop in Delhi NCR',
    bodyContent: `<h1>Wall Rope Art Workshop in Delhi NCR</h1><p>Wall Rope Art is one of our most visually striking workshops — participants coil natural cotton rope into circular forms and paint them with earthy botanical motifs, sunrise scenes, and boho-inspired designs that become show-stopping wall décor. The combination of tactile rope-work and freehand painting makes it uniquely satisfying: part sculpture, part canvas. Every piece is different, and every participant walks away genuinely surprised by what they have created.</p><h2>What you make</h2><p>A hand-coiled rope wall hanging painted with earthy botanical and boho motifs — unique, display-ready home décor.</p><h2>Who it is for</h2><p>Ideal for corporate team-building events, school art days, private parties, and bachelorette events where a distinctive, Instagram-worthy takeaway is desired. Duration: 2 to 2.5 hours. Groups from 20 to 200+. All materials included. Pricing from ₹600 per person.</p><h2>Why this activity works for corporate teams</h2><p>The two-stage process — coiling then painting — keeps participants engaged for the full session. The coiling phase is meditative and collaborative; the painting phase is expressive and personal. No two finished pieces look the same, which sparks genuine conversation and creative pride across the group.</p><h2>Frequently Asked Questions</h2><h3>What is Wall Rope Art?</h3><p>Wall Rope Art is a craft technique where natural cotton rope is coiled and glued into a circular form, then painted with earthy colours, botanical motifs, and boho-inspired designs. The finished piece is a unique wall hanging that combines the texture of natural rope with hand-painted artwork.</p><h3>Do I need any art experience to participate?</h3><p>No experience is required. Shramita guides participants through the coiling technique and the painting process step by step. The rope provides a natural, forgiving surface to paint on — even participants who consider themselves non-artists consistently produce beautiful results.</p><h3>How long does a Wall Rope Art workshop take?</h3><p>A Wall Rope Art session runs for 2 to 2.5 hours, including a demonstration of the coiling technique, guided painting of botanical and boho motifs, a drying period, and fitting of the jute hanging cord so the piece is ready to display immediately.</p>`,
  },

  // ── Employee Engagement Gurgaon ──────────────────────────────────────────
  {
    path: '/employee-engagement-activities-gurgaon',
    title: 'Employee Engagement Activities Gurgaon | Art Workshops | Kraftykinni',
    description: 'Guided art workshops for employee engagement in Gurgaon. 20–200+, all materials supplied. Lippan Art, Mandala, Tie & Dye at your Cyber City or Udyog Vihar office.',
    h1: 'Employee Engagement Activities in Gurgaon',
    ogImage: 'https://cdn.kraftykinni.in/og-corporate.jpg',
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
    description: 'Art workshops across Delhi for corporate teams, schools & private events. 13 activities, all materials included. Fevicryl-certified artist. ₹600–₹800/person.',
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
    description: 'Corporate art workshops and team-building in Gurgaon. Office visits, off-site events, school sessions. 13 activities, all materials included. ₹600–₹800/person.',
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
    description: 'Art workshops in Noida and Greater Noida for corporate teams, schools & private events. 13 activities, all materials included. ₹600–₹800/person.',
    h1: 'Art Workshops in Noida',
    bodyContent: `<h1>Art Workshops in Noida — Corporate and School Sessions</h1>
      <p>Noida has rapidly grown into one of the most active corporate and educational hubs in the NCR, and Kraftykinni serves both. We conduct corporate art workshops for companies across Sector 62, Sector 16, and Film City Road, as well as school and college workshops for institutions in Noida and Greater Noida. Our workshops at Amity University are among our most frequently repeated.</p>
      <h2>Areas We Cover in Noida</h2>
      <p>Sector 62, Sector 16, Film City Road, Sector 18, Expressway, Greater Noida, Knowledge Park, Sector 125, and all areas across Noida and Greater Noida.</p>
      <h2>All 13 Activities Available in Noida</h2>
      <p>Lippan Art, Mandala Art, Tie and Dye, Boho Canvas Art, Bottle Lamp Art, Block Printing, Clay Art, Glass Painting, Texture Art, Tote Bag Painting, Trinket Tray Painting, MDF Fridge Magnet, Canvas Pouch Painting.</p>
      <h2>Pricing for Art Workshops in Noida</h2>
      <ul>
        <li><strong>Small Group (20–50 people):</strong> ₹800 per person — all materials included</li>
        <li><strong>Standard (50–100 people):</strong> ₹700 per person — all materials included</li>
        <li><strong>Large Group (100+ people):</strong> ₹600 per person — all materials included</li>
      </ul>
      <p>A 50% deposit confirms the booking. Minimum 7 days advance notice required.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>Do you conduct art workshops across all areas of Noida?</h3>
      <p>Yes — Kraftykinni travels to your location anywhere in Noida and Greater Noida, including Sector 62, Sector 16, Film City Road, Sector 18, the Expressway corridor, Knowledge Park, and Sector 125. If your area is not listed, reach out and we will confirm availability.</p>
      <h3>What is the cost of an art workshop in Noida?</h3>
      <p>Pricing starts at ₹800 per person for groups of 20–50, ₹700 per person for 50–100 participants, and ₹600 per person for groups of 100+. All art materials, facilitation, setup, and cleanup are included.</p>
      <h3>Do you work with universities and colleges in Noida?</h3>
      <p>Yes — Amity University is one of our most frequently repeated bookings, alongside other colleges and schools across Noida and Greater Noida. Sessions are adapted for student groups, college fests, and orientation events.</p>
      <h3>How far in advance should I book an art workshop in Noida?</h3>
      <p>A minimum of 7 days advance notice is required to arrange materials and confirm logistics. A 50% deposit confirms your booking.</p>
      <h3>Do participants need any prior art experience?</h3>
      <p>No prior art experience is needed. Every Kraftykinni session is guided step by step by Shramita Govil, Fevicryl Certified Artist. Participants of all skill levels finish with a completed artwork they are proud of.</p>
      <h3>What is the minimum group size for an art workshop in Noida?</h3>
      <p>The minimum group size is 20 participants, with sessions scaling up to 200+ in a single booking. Additional facilitators are brought in for larger groups.</p>`,
  },

  {
    path: '/blog/janmashtami-krishna-art-workshop-delhi-ncr',
    title: 'Janmashtami Craft Workshop Ideas Delhi NCR | Kraftykinni',
    description: 'Celebrate Janmashtami 2026 with hand-painted Dahi Handi matkis and mirror-work Radha Krishna trinket trays. School and private workshops across Delhi NCR.',
    h1: 'Janmashtami 2026 — Dahi Handi Matki Painting and Radha Krishna Trinket Trays in Delhi NCR',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'Janmashtami 2026 — Dahi Handi Matki Painting and Radha Krishna Trinket Trays in Delhi NCR',
        'description': 'Celebrate Janmashtami 2026 with hand-painted Dahi Handi matkis and mirror-work Radha Krishna trinket trays. School and private workshops across Delhi NCR.',
        'url': 'https://kraftykinni.in/blog/janmashtami-krishna-art-workshop-delhi-ncr/',
        'datePublished': '2026-08-13',
        'dateModified': '2026-08-13',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/janmashtami-krishna-art-workshop-delhi-ncr/' },
      },
    ],
    bodyContent: `<h1>Janmashtami 2026 — Dahi Handi Matki Painting and Radha Krishna Trinket Trays in Delhi NCR</h1>
      <p>Every year in the days before Janmashtami, Delhi NCR classrooms and living rooms turn into miniature Vrindavans — peacock feathers, mini matkis, and Radha-Krishna cutouts start appearing well before the festival itself. Krishna Janmashtami falls on Friday, 4 September 2026, and it remains one of the busiest festival-craft windows on the Kraftykinni calendar. This year Kraftykinni is running two Janmashtami-themed variations of its regular workshops: a hand-painted Dahi Handi matki, and a mirror-embellished Radha Krishna trinket tray, both built on techniques Shramita Govil, a Fevicryl Certified Artist, already teaches year-round.</p>
      <h2>Dahi Handi Matki Painting — A Clay Art Variation</h2>
      <p>The Dahi Handi — the pot Krishna is said to have raided for butter as a child — is the most recognisable symbol of Janmashtami. Participants start with a plain clay pot and build it up with acrylic paint, hand-lettering such as "Radhe Krishna," a string of beads, and cotton stuffed at the rim to represent the makhan spilling out, finished with a peacock feather and a small Krishna-and-cow figurine. Sessions run 1.5 to 2 hours, no sculpting experience needed.</p>
      <h2>Radha Krishna Mirror Trinket Tray — A Trinket Tray Painting Variation</h2>
      <p>This option builds on the regular Trinket Tray Painting workshop. Participants paint a Radha Krishna scene at the centre of a round MDF tray, bordered by a lotus-petal frame finished with small mirror pieces, echoing the mirror-inlay technique from the Lippan Art workshop. It runs as a guided, step-by-step session, and the finished tray doubles as a jewellery or desk tray for the rest of the year.</p>
      <h2>Why Janmashtami Craft Works Well for Schools and Home Puja</h2>
      <p>For schools, a hands-on craft period complements dress-up and storytelling and sends every child home with something they made. For private bookings, a hand-painted matki or trinket tray gives families a puja-ready decoration without needing to source one from a shop.</p>
      <h2>Book a Janmashtami Workshop in Delhi NCR</h2>
      <p>Kraftykinni runs both workshops for schools, housing societies, and private bookings across Delhi, Gurgaon, and Noida ahead of Janmashtami on 4 September 2026. Pricing starts at ₹600 per person for groups of 100+, ₹700 for 50–100, and ₹800 for groups of 20–50, all materials included. WhatsApp +91 9599622210 to book.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>When is Janmashtami in 2026?</h3>
      <p>Krishna Janmashtami falls on Friday, 4 September 2026. Booking a festival craft session a week or two ahead is recommended.</p>
      <h3>What is Dahi Handi Matki Painting?</h3>
      <p>A Janmashtami variation of the Clay Art workshop, where participants hand-paint a plain clay pot with festival motifs to recreate the Dahi Handi.</p>
      <h3>What is the Radha Krishna Trinket Tray workshop?</h3>
      <p>A themed version of the Trinket Tray Painting workshop — a hand-painted Radha Krishna scene with a mirror-embellished lotus border on a round MDF tray.</p>
      <h3>Are these workshops suitable for schools?</h3>
      <p>Yes. Both formats run in 1.5 to 2 hours, fit comfortably into a school festival period, and need no prior art experience.</p>
      <h3>How do I book a Janmashtami workshop before September 4?</h3>
      <p>WhatsApp +91 9599622210 with your preferred date, location, and group size. Booking a week or two ahead is recommended.</p>
    `,
  },

  {
    path: '/blog/ganesh-chaturthi-clay-ganpati-idol-workshop-delhi-ncr',
    title: 'Ganesh Chaturthi Clay Idol Workshop Delhi NCR | Kraftykinni',
    description: 'Celebrate Ganesh Chaturthi 2026 with a hand-painted eco-friendly clay Ganpati idol from Kraftykinni. School, corporate CSR and private workshops in Delhi NCR.',
    h1: 'Ganesh Chaturthi 2026 — Eco-Friendly Clay Ganpati Idol Painting Workshops in Delhi NCR',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': 'Ganesh Chaturthi 2026 — Eco-Friendly Clay Ganpati Idol Painting Workshops in Delhi NCR',
        'description': 'Celebrate Ganesh Chaturthi 2026 with a hand-painted eco-friendly clay Ganpati idol from Kraftykinni. School, corporate CSR and private workshops in Delhi NCR.',
        'url': 'https://kraftykinni.in/blog/ganesh-chaturthi-clay-ganpati-idol-workshop-delhi-ncr/',
        'datePublished': '2026-08-14',
        'dateModified': '2026-08-14',
        'author': { '@type': 'Person', 'name': 'Shramita Govil', 'url': 'https://kraftykinni.in/about/' },
        'publisher': { '@type': 'Organization', 'name': 'Kraftykinni', 'url': 'https://kraftykinni.in', 'logo': { '@type': 'ImageObject', 'url': 'https://cdn.kraftykinni.in/logo.jpeg' } },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://kraftykinni.in/blog/ganesh-chaturthi-clay-ganpati-idol-workshop-delhi-ncr/' },
      },
    ],
    bodyContent: `<h1>Ganesh Chaturthi 2026 — Eco-Friendly Clay Ganpati Idol Painting Workshops in Delhi NCR</h1>
      <p>Every September, Delhi NCR balconies and puja corners fill up with Ganpati idols bought in a hurry from the nearest stall — usually Plaster of Paris, usually painted in the same handful of factory colours. Ganesh Chaturthi falls on Monday, 14 September 2026, and this year Kraftykinni is running it differently: a hands-on workshop where participants paint their own eco-friendly clay Ganpati idol from a plain, unpainted base. The workshop is a variation of Kraftykinni's regular Clay Art workshop, led by Shramita Govil, a Fevicryl Certified Artist, running for schools, housing societies, corporate CSR days, and private home-puja bookings across Delhi, Gurgaon, and Noida.</p>
      <h2>Why Clay, Not Plaster of Paris</h2>
      <p>Kraftykinni's Ganpati idols are made from natural clay rather than Plaster of Paris — clay dissolves cleanly during visarjan, while POP idols do not break down the same way and are widely discouraged for that reason. Participants start with a plain, unpainted clay idol rather than a template that is already coloured in, so every finished Ganpati looks slightly different.</p>
      <h2>How the Painting Session Works</h2>
      <p>Each participant works on their own plain clay idol using acrylic paints, fine brushes, and metallic gold detailing for the crown, jewellery, and dhoti. Shramita demonstrates the base colours and traditional detailing first, then participants build up their own idol at their own pace, finishing with small extras like a garland, a modak, or a mouse at the base. A session runs 1.5 to 2 hours, no prior experience needed, and every participant leaves with their own finished, immersion-ready idol.</p>
      <h2>Ganesh Wall Hangings — An MDF Fridge Magnet Variation</h2>
      <p>Kraftykinni also runs a Ganesh wall-hanging format built on the same technique as the MDF Fridge Magnet workshop — a hand-cut MDF shape, hand-painted rather than moulded. The base is cut into a small plaque with a Ganesh face and trunk in profile, finished with acrylic colour, a pearl bead border, a jute hanging cord strung with wooden beads, and a small brass bell. It works as a door or entrance hanging through the festival and stays up as a keepsake afterward.</p>
      <h2>Ganesh Tealight Holders — A Trinket Tray Painting Variation</h2>
      <p>The second add-on format builds on the Trinket Tray Painting workshop, using the same round MDF base and mirror-inlay technique from Lippan Art. Participants paint a Ganesh silhouette on a small stand, then finish a round base with a mirror-cutwork border, with a tealight seated at the centre — a quicker table-top piece that suits kitty parties and festive evenings.</p>
      <h2>Who These Workshops Are For</h2>
      <p>Schools use the clay idol session as a Ganesh Chaturthi craft period paired with a short story of Ganesha's birth, with the wall hanging as a quicker add-on for younger grades. Housing societies and RWAs book the idol session ahead of their society's Ganpati sthapana, often adding the tealight holder as a shorter evening craft slot. Corporate teams increasingly book the clay idol workshop as a CSR or sustainability-linked activity, since the "no Plaster of Paris" choice gives a wellness day a genuine, tangible angle. Private bookings tend to be families wanting a hand-painted idol for home puja, sometimes with the wall hanging or tealight holder added on.</p>
      <h2>Book a Ganesh Chaturthi Workshop in Delhi NCR</h2>
      <p>Kraftykinni runs the eco-friendly Clay Ganpati idol workshop, along with the MDF wall hanging and mirror-work tealight holder formats, for schools, housing societies, corporate CSR days, and private bookings across Delhi, Gurgaon, and Noida, ahead of Ganesh Chaturthi on 14 September 2026. Sessions run 1.5 to 2 hours, with pricing starting at ₹600 per person for groups of 100+, ₹700 for 50–100, and ₹800 for groups of 20–50 — all materials included. WhatsApp +91 9599622210 to check availability.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>When is Ganesh Chaturthi in 2026?</h3>
      <p>Ganesh Chaturthi falls on Monday, 14 September 2026. Schools, housing societies, and families in Delhi NCR typically book festival craft sessions in the two weeks before the date.</p>
      <h3>Why use a clay Ganpati idol instead of Plaster of Paris?</h3>
      <p>Clay idols dissolve cleanly during visarjan, while Plaster of Paris idols do not break down the same way and are widely discouraged for that reason. Kraftykinni's clay idols are genuinely immersion-safe, not just decorative.</p>
      <h3>What does the Ganesh Chaturthi clay idol workshop actually involve?</h3>
      <p>Participants hand-paint their own plain, unpainted clay Ganpati idol using acrylic paints and metallic gold detailing, guided step by step by Shramita Govil, a Fevicryl Certified Artist. Sessions run 1.5 to 2 hours.</p>
      <h3>What other Ganesh Chaturthi craft formats does Kraftykinni offer besides the clay idol?</h3>
      <p>Kraftykinni also runs a hand-painted MDF Ganesh wall hanging (a variation of the MDF Fridge Magnet workshop) and a mirror-work Ganesh tealight holder (a variation of Trinket Tray Painting), both as shorter add-on activities alongside the main clay idol session.</p>
      <h3>Can this be booked as a corporate CSR activity?</h3>
      <p>Yes. Companies book the eco-friendly clay Ganpati idol workshop as a CSR or sustainability-linked activity ahead of Ganesh Chaturthi, replacing a Plaster of Paris purchase with a hands-on, immersion-safe alternative the team makes themselves.</p>
      <h3>How much does a Ganesh Chaturthi workshop cost in Delhi NCR?</h3>
      <p>Pricing starts at ₹600 per person for groups of 100+, ₹700 per person for 50–100, and ₹800 per person for groups of 20–50. All materials are included, with no separate venue charge since Kraftykinni travels to your location.</p>
    `,
  },
];

// ─── Markdown twins (Markdown Negotiation for AI agents) ────────────────────
// Every prerendered route also gets a flat-file Markdown twin at the same
// path with a .md extension (homepage → index.md). A Cloudflare Worker in
// front of GitHub Pages (see docs/cloudflare-agent-readiness-worker.js) serves
// this twin instead of the .html file when a request's Accept header prefers
// text/markdown — this is what agents/crawlers actually parse most cleanly.

function stripTags(str) {
  return String(str)
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function htmlToMarkdown(html) {
  if (!html) return '';
  let md = html;
  md = md.replace(/<nav[\s\S]*?<\/nav>/g, '');
  md = md.replace(/<footer[\s\S]*?<\/footer>/g, '');
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/g, (_, t) => `\n# ${stripTags(t)}\n`);
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, (_, t) => `\n## ${stripTags(t)}\n`);
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, (_, t) => `\n### ${stripTags(t)}\n`);
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/g, (_, t) => `\n#### ${stripTags(t)}\n`);
  md = md.replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, text) => {
    const url = href.startsWith('http') ? href : `https://kraftykinni.in${href}`;
    return `[${stripTags(text)}](${url})`;
  });
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/g, (_, t) => `**${stripTags(t)}**`);
  md = md.replace(/<b>([\s\S]*?)<\/b>/g, (_, t) => `**${stripTags(t)}**`);
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/g, (_, t) => `*${stripTags(t)}*`);
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/g, (_, t) => `\n> ${stripTags(t)}\n`);
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, (_, t) => `- ${stripTags(t)}\n`);
  md = md.replace(/<\/?(ul|ol)[^>]*>/g, '\n');
  md = md.replace(/<time[^>]*>([\s\S]*?)<\/time>/g, (_, t) => stripTags(t));
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/g, (_, t) => `\n${stripTags(t)}\n`);
  md = stripTags(md);
  md = md.replace(/\n{3,}/g, '\n\n').trim();
  return md;
}

// Site-wide "more pages" list, built once from the real routes array so it
// always matches whatever pages actually exist — no separate list to drift.
const NAV_MD = routes
  .map((r) => `- [${r.title.split(' | ')[0]}](https://kraftykinni.in${r.path})`)
  .join('\n');

function buildMarkdownDoc(route) {
  const canonical = `https://kraftykinni.in${route.path}`;
  const bodyMd = htmlToMarkdown(route.bodyContent) || `# ${route.h1 || route.title}`;
  return `---
title: ${route.title}
description: ${route.description}
canonical: ${canonical}
last_updated: ${today}
---

${bodyMd}

---

**Contact:** kraftykinni@gmail.com | +91 9599622210
**Service area:** Delhi, Gurgaon, Noida and pan-India (materials shipped)
**Pricing:** ₹600–₹800 per person, all materials included

## More pages on this site
${NAV_MD}
`;
}

// ─── HTML injection helper ────────────────────────────────────────────────────

function injectMeta(html, route) {
  const { path: routePath, title, description, h1, bodyContent, ogImage } = route;
  const canonical = `https://kraftykinni.in${routePath}`;

  // Update meta tags
  // Strip ALL existing <title> tags (with or without attributes) — prevents duplicate title issue
  html = html.replace(/<title[^>]*>[^<]*<\/title>/g, '');
  // Remove non-standard <meta name="title"> — BingMaster counts it as a second title tag
  html = html.replace(/<meta name="title"[^>]*>/g, '');
  // Inject the page title with data-rh="true" so React-Helmet updates (not duplicates) it on hydration
  html = html.replace('</head>', `  <title data-rh="true">${title}</title>\n  </head>`);
  // All injected meta tags carry data-rh="true" so React-Helmet replaces them on mount
  // rather than appending new tags alongside them (which causes the 2× description / canonical issue)
  // NOTE: index.html carries data-rh="true" as the first attribute on both tags,
  // so the old narrower patterns never matched.  These attribute-order-agnostic
  // regexes fix the canonical-mismatch and duplicate-description bugs.
  html = html.replace(/<meta\b[^>]*\bname="description"[^>]*>/, `<meta data-rh="true" name="description" content="${description}">`);
  html = html.replace(/<link\b[^>]*\brel="canonical"[^>]*>/, `<link data-rh="true" rel="canonical" href="${canonical}" />`);
  // hreflang tags are self-referencing per page (see index.html comment) — keep
  // them in sync with canonical so every route points to itself, not home.
  html = html.replace(/<link rel="alternate" hreflang="en-in" href="[^"]*" \/>/, `<link rel="alternate" hreflang="en-in" href="${canonical}" />`);
  html = html.replace(/<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/, `<link rel="alternate" hreflang="x-default" href="${canonical}" />`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta data-rh="true" property="og:title" content="${title}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta data-rh="true" property="og:description" content="${description}">`);
  html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta data-rh="true" property="og:url" content="${canonical}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta data-rh="true" name="twitter:title" content="${title}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta data-rh="true" name="twitter:description" content="${description}">`);

  // Update og:image / twitter:image if route specifies a custom image
  if (ogImage) {
    html = html.replace(/<meta property="og:image" content="[^"]*">/, `<meta data-rh="true" property="og:image" content="${ogImage}">`);
    html = html.replace(/<meta property="og:image:width" content="[^"]*">/, `<meta data-rh="true" property="og:image:width" content="1200">`);
    html = html.replace(/<meta property="og:image:height" content="[^"]*">/, `<meta data-rh="true" property="og:image:height" content="630">`);
    html = html.replace(/<meta name="twitter:card" content="[^"]*">/, `<meta data-rh="true" name="twitter:card" content="summary_large_image">`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*">/, `<meta data-rh="true" name="twitter:image" content="${ogImage}">`);
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
  // Remove SSR-prerendered data-rh tags before React mounts — prevents duplicate
  // title / description / canonical tags for JS crawlers (Bing, Googlebot).
  html = html.replace('</head>', `  ${DATA_RH_CLEANUP_SCRIPT}\n  </head>`);

  // Build the noscript block ONLY — no hidden crawler div (that was cloaking).
  // Structured with real <nav>/<main>/<footer> landmarks (not just divs) so
  // non-JS crawlers and AI bots see standard semantic HTML and a full set of
  // internal links on every single page, not just whatever bodyContent covers.
  const noscriptBlock = `
    <noscript>
      <div style="font-family:sans-serif;max-width:900px;margin:40px auto;padding:0 20px;line-height:1.7;color:#333;">
        ${SITE_NAV_LINKS}
        <main>
          ${bodyContent || `<h1>${h1}</h1><p>Please enable JavaScript to view this page.</p>`}
        </main>
        ${SITE_FOOTER_LINKS}
      </div>
    </noscript>`;

  // Strip the ORIGINAL hardcoded homepage <noscript> block that lives inside
  // <div id="root"> in the base template. Without this, every non-homepage
  // pre-rendered page ends up shipping TWO noscript blocks — its own correct
  // one, plus the homepage's "Kraftykinni: Corporate Art & DIY Workshops..."
  // block baked in from the template — which is duplicate/irrelevant content
  // for non-JS crawlers (Bing) and a minor content-quality issue for Google.
  html = html.replace(
    /<div id="root">\s*<noscript>[\s\S]*?<\/noscript>\s*<\/div>/,
    '<div id="root"></div>'
  );

  // Inject the route-specific noscript before the (now-empty) root div
  html = html.replace(
    '<div id="root">',
    `${noscriptBlock}\n    <div id="root">`
  );

  return html;
}

// ─── 1. Pre-render routes ────────────────────────────────────────────────────

let created = 0;

for (const route of routes) {
  const html = injectMeta(baseHtml, route);

  // ─── Flat-file output (critical for GitHub Pages) ──────────────────────
  // GitHub Pages redirects /about → /about/ ONLY when the sole match on
  // disk is a folder (about/index.html). It serves /about directly — with
  // NO redirect — when about.html exists as a flat file. Since every
  // route.path here is already non-trailing-slash (matching React Router,
  // every internal <Link>, and the canonical/sitemap convention), writing
  // flat files means the canonical URL always returns 200 with zero
  // redirect hops. This is what was producing the GSC "Page with redirect"
  // + intermittent 404 reports: dist/<route>/index.html only satisfies the
  // *trailing-slash* URL directly; the non-slash URL everyone actually
  // links to had to be redirected first.
  let filePath;
  if (route.path === '/') {
    filePath = path.join(distDir, 'index.html');
  } else {
    filePath = path.join(distDir, `${route.path}.html`); // e.g. /workshops/lippan-art -> dist/workshops/lippan-art.html
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  fs.writeFileSync(filePath, html, 'utf-8');

  // Markdown twin — same path, .md extension (homepage → index.md)
  const mdPath = route.path === '/'
    ? path.join(distDir, 'index.md')
    : path.join(distDir, `${route.path}.md`);
  fs.mkdirSync(path.dirname(mdPath), { recursive: true });
  fs.writeFileSync(mdPath, buildMarkdownDoc(route), 'utf-8');

  console.log(`✅  ${route.path === '/' ? '/' : route.path + '.html'}  (+ .md twin)`);
  created++;
}

console.log(`\n🎉  Pre-rendered ${created} routes.`);
console.log('    Each page has:\n' +
            '      • Unique title + meta injected\n' +
            '      • Trailing-slash fix script in <head>\n' +
            '      • <noscript> content block for non-JS crawlers\n' +
            '      • No hidden cloaking divs\n');

// ─── 2. Regenerate sitemap.xml ────────────────────────────────────────────────
// (today was computed once near the top of this file, and reused above as the
// "Last updated" freshness signal injected into every page's noscript footer)

const sitemapEntries = [
  { loc: '/',                              priority: '1.0', changefreq: 'monthly' },
  { loc: '/corporate-art-workshops',       priority: '0.9', changefreq: 'monthly' },
  { loc: '/school-art-workshops',              priority: '0.8', changefreq: 'monthly' },
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
  { loc: '/workshops/wall-rope-art',       priority: '0.7', changefreq: 'monthly' },
  { loc: '/workshops-in-delhi',            priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops-in-gurgaon',          priority: '0.8', changefreq: 'monthly' },
  { loc: '/workshops-in-noida',            priority: '0.8', changefreq: 'monthly' },
  { loc: '/employee-engagement-activities-gurgaon', priority: '0.8', changefreq: 'monthly' },
  { loc: '/about',                         priority: '0.6', changefreq: 'yearly'  },
  { loc: '/privacy-policy',               priority: '0.2', changefreq: 'yearly'  },
  { loc: '/blog',                          priority: '0.7', changefreq: 'weekly'  },
  { loc: '/blog/lippan-art-complete-beginners-guide-kutch-mirror-work', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/bottle-lamp-art-workshop-school-delhi-ncr', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/best-corporate-team-building-activities-gurgaon-2026', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/annual-day-activity-ideas-schools-delhi-ncr', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/art-workshop-ideas-birthday-party-delhi-ncr', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/mothers-day-art-workshop-gift-delhi-ncr', priority: '0.8', changefreq: 'yearly' },
  { loc: '/blog/clay-trinket-painting-workshop-cars24-gurgaon', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/summer-art-workshop-for-schools-delhi-ncr', priority: '0.8', changefreq: 'monthly' },
  { loc: '/blog/fathers-day-gift-ideas-art-workshop-delhi-ncr-2026', priority: '0.8', changefreq: 'yearly' },
  { loc: '/blog/world-environment-day-upcycled-bottle-art-workshop-delhi-ncr', priority: '0.8', changefreq: 'yearly' },
  { loc: '/blog/block-printing-workshop-delhi-israeli-family', priority: '0.8', changefreq: 'yearly' },
  { loc: '/blog/independence-day-bottle-art-workshop-delhi-ncr', priority: '0.8', changefreq: 'yearly' },
  { loc: '/blog/raksha-bandhan-mdf-fridge-magnet-workshop-delhi-ncr', priority: '0.8', changefreq: 'yearly' },
  { loc: '/blog/friendship-day-photo-magnet-workshop-delhi-ncr', priority: '0.8', changefreq: 'yearly' },
  { loc: '/blog/dot-mandala-art-corporate-workshop-noida', priority: '0.8', changefreq: 'yearly' },
  { loc: '/blog/janmashtami-krishna-art-workshop-delhi-ncr', priority: '0.8', changefreq: 'yearly' },
  { loc: '/blog/ganesh-chaturthi-clay-ganpati-idol-workshop-delhi-ncr', priority: '0.8', changefreq: 'yearly' },
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

// ─── 3. Generate rss.xml from BLOG_POSTS (parsed near the top of this file,
// and already reused by the /blog index page above) ───────────────────────────
function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

if (BLOG_POSTS.length) {
  const rssItems = BLOG_POSTS
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      const pubDate = new Date(post.publishDate).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt || '')}</description>
    </item>`;
    })
    .join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Kraftykinni Blog</title>
  <link>${base}/blog</link>
  <description>Art workshop guides, event write-ups, and craft tips from Kraftykinni — Delhi NCR.</description>
  <language>en-in</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
</channel>
</rss>
`;

  fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssXml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'rss.xml'), rssXml, 'utf-8');
  console.log(`📰  RSS feed generated with ${BLOG_POSTS.length} posts (rss.xml)\n`);
} else {
  console.warn('⚠️   src/data/blogPosts.ts not found or empty — skipped RSS generation.');
}

// ─── 4. Generate llms.txt (site-wide agent/LLM entry point) ─────────────────
// llms.txt is an informal, still-evolving community convention (not an IETF
// or W3C standard) — a plain-Markdown index that points agents/LLMs at the
// site's real content instead of making them scrape rendered HTML. Safe to
// publish because every fact below already lives in the site/skill content.
const llmsTxt = `# Kraftykinni

> Hands-on creative art workshops for corporate teams, schools & private events across Delhi, Gurgaon and Noida, India. Guided by Shramita Govil, Fevicryl Certified Artist. ₹600–₹800 per person, all materials included.

Contact: kraftykinni@gmail.com | +91 9599622210
Booking: 7 days advance notice, 50% deposit confirms a booking, minimum 20 participants (scales to 200+)

## Pages
${routes.map((r) => `- [${r.title.split(' | ')[0]}](https://kraftykinni.in${r.path === '/' ? '/index' : r.path}.md): ${r.description}`).join('\n')}

## Agent resources
- Any page above is also available as clean Markdown at the same URL with a .md extension, or via \`Accept: text/markdown\`
- Agent Skills index: https://kraftykinni.in/.well-known/agent-skills/index.json
- Sitemap: https://kraftykinni.in/sitemap.xml
- RSS feed: https://kraftykinni.in/rss.xml
`;

fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf-8');
fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt, 'utf-8');
console.log('🤖  llms.txt regenerated\n');
