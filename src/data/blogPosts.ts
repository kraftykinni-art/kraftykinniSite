export interface BlogFaqItem {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishDate: string;
  category: 'Corporate' | 'School & College' | 'Private Events' | 'Workshop Guides';
  excerpt: string;
  keywords: string[];
  sections: BlogSection[];
  faq?: BlogFaqItem[];   // renders as FAQ block + FAQPage schema
}

export interface BlogSection {
  heading?: string;            // h2 — omit for intro section
  body: string;                // plain text paragraphs separated by \n\n
  listItems?: string[];        // bullet / numbered list items (optional)
  listType?: 'ul' | 'ol';
}

// ─── Posts ──────────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    slug: 'best-corporate-team-building-activities-gurgaon-2026',
    title: 'Best Corporate Team Building Activities in Gurgaon 2026',
    metaTitle: 'Best Corporate Team Building Activities Gurgaon 2026 | Kraftykinni',
    metaDescription:
      'Top 10 corporate team building activities in Gurgaon for 2026. From art workshops to offsite games — honest picks with real team outcomes. ₹600/person all-in.',
    publishDate: '2026-04-27',
    category: 'Corporate',
    excerpt:
      "Gurgaon's corporate event scene is full of options — escape rooms, bowling, and go-karting have their place. But after running 50+ team workshops across Cyber City and Udyog Vihar, we've seen which activities actually produce conversation, connection, and something teams talk about months later.",
    keywords: [
      'corporate team building activities Gurgaon',
      'team building ideas Gurgaon',
      'corporate team outing Gurgaon',
      'group activities Gurgaon office',
      'art workshop team building Gurgaon',
    ],
    sections: [
      {
        body: `Gurgaon's corporate event scene is full of options — escape rooms, bowling, and go-karting have their place. But after running 50+ team workshops across Cyber City, Udyog Vihar, and DLF Cyber Park, we've seen which activities actually produce conversation, connection, and something teams talk about months later.\n\nThis list is built on that experience. We've kept it honest: art workshops are on this list because they work, not because we run them. Each pick is assessed on group size flexibility, what actually happens in the room, and whether the activity survives the Monday-morning test — will your team still be talking about it the following week?`,
      },
      {
        heading: '1. Art Workshop — the #1 pick for genuine connection',
        body: `Art workshops consistently outperform every other team activity on one metric: conversation. When you give 40 people a craft task and tell them there's no wrong answer, something relaxes. Colleagues who rarely speak end up debating colour choices. Senior managers sit alongside interns, both equally bad at Lippan Art, equally delighted by the result.\n\nKraftykinni runs guided art sessions starting at ₹600 per person across Gurgaon, with 13 workshop activities — Lippan Art, Tie & Dye, Boho Canvas, Mandala Art, Bottle Lamp Art, and more. Every participant takes a finished artwork home. Groups from 20 to 200+ are accommodated.\n\nWhy it's #1: You get a genuine creative experience, a physical takeaway, and 90 minutes of unforced, cross-team interaction. It's hard to top that combination at this price point.`,
      },
      {
        heading: '2. Escape Room',
        body: `Gurgaon has several well-designed escape room venues. They work well for small groups of 6–10, test lateral thinking, and produce a shared story ("remember when Rahul couldn't find the key for 20 minutes"). The limitation is scale — you can't run 80 people through an escape room simultaneously, and the experience fragments across parallel rooms.`,
      },
      {
        heading: '3. Cooking Competition',
        body: `Cooking events have grown in Gurgaon's corporate calendar. They work best when paired with a competitive structure — teams assigned different cuisines, a blind tasting at the end. The messiness is part of the appeal. Venue-dependent: you need a kitchen setup, which limits location flexibility.`,
      },
      {
        heading: '4. Pottery / Clay Workshop',
        body: `Clay is one of the most genuinely therapeutic materials. There's a reason occupational therapists prescribe it — working with something tactile quiets the nervous system reliably. Clay workshops in Gurgaon are harder to find than painting workshops, which makes them feel premium. Kraftykinni runs Clay Art sessions as part of its workshop menu — it's one of the most requested activities for companies running wellness days or mental health awareness events.`,
      },
      {
        heading: '5. Photography Walk',
        body: `A guided photography walk through parts of Gurgaon (Leisure Valley Park, Cyber Hub) works well for smaller teams of 15–25. It gets people out of the office, requires observation and creativity, and produces content your company can actually use. Needs a competent photography facilitator to run well.`,
      },
      {
        heading: '6. Indoor Cricket / Sports Day',
        body: `Classic and effective for large groups. Gurgaon has multiple indoor sports facilities. Cricket tournaments work particularly well in North Indian corporate culture — near-universal participation and immediate competitive energy. Less useful for teams that span a wide fitness or age range.`,
      },
      {
        heading: '7. Stand-Up Improv Workshop',
        body: `Improv comedy workshops — where teams learn improv techniques and perform short scenes — are underused in Gurgaon's corporate market. They build listening, spontaneity, and the ability to support a colleague's idea in real time. The vulnerability of performing in front of colleagues also creates unusual closeness. Good facilitators are rare; the quality of this experience varies significantly.`,
      },
      {
        heading: '8. Scavenger Hunt (city or campus)',
        body: `Campus or neighbourhood scavenger hunts work for teams that want a high-energy, mobile activity. Apps like GooseChase allow custom challenge sets. They require significant logistical setup but produce high energy and a great finish-line moment. Best for teams of 30–80.`,
      },
      {
        heading: '9. Board Game / Strategy Session',
        body: `Modern board game cafés in Gurgaon have elevated the format. Strategy games like Ticket to Ride or Pandemic reveal team dynamics in genuinely interesting ways — who leads, who defers, who plays to win versus plays for the group. Works for quieter, analytically-oriented teams. Not suitable for very large groups.`,
      },
      {
        heading: '10. Wine & Cheese / Mixology Session',
        body: `Mixology workshops are growing in Gurgaon's corporate circuit. They're relaxed, produce immediate results (the drink in your hand), and have an inherently social structure. Best for evening events and teams where alcohol consumption is culturally comfortable and policy-appropriate.`,
      },
      {
        heading: 'How to pick the right activity for your team',
        body: `A few questions that clarify the choice quickly:\n\n**Group size.** Art workshops and sports days scale to 200+. Escape rooms and cooking events cap at 50–80 without fragmenting the experience.\n\n**What you actually want.** Cross-team conversation and a physical memory → art workshop. Competitive energy → sports or scavenger hunt. Decompression and stress relief → clay or improv.\n\n**Budget.** Most of these activities land between ₹500 and ₹1,500 per person in Gurgaon. Art workshops at ₹600/person (all materials included) sit at the efficient end of that range for what you get.\n\n**Venue.** Some activities need specialist facilities. Art workshops come to you — Kraftykinni brings all supplies and sets up at your office or event venue.`,
      },
      {
        heading: 'Book a workshop for your Gurgaon team',
        body: `Kraftykinni runs art workshops for corporate teams across Gurgaon, Delhi, and Noida. All materials are included. Setup and cleanup are on us. You just need tables, chairs, and your people.\n\nGroups from 20 to 200+. Starting at ₹600 per person. Get in touch to discuss your event date and preferred activity.`,
      },
    ],
    faq: [
      {
        q: 'What is the best team building activity in Gurgaon for a large group?',

        a: 'For large groups of 50 to 200+ in Gurgaon, guided art workshops consistently produce the strongest team outcomes. Kraftykinni runs sessions across Cyber City, Udyog Vihar, and DLF Cyber Park — activities like Tie & Dye, Lippan Art, and Mandala Art scale well, need no prior experience, and give every participant a physical takeaway. Starting at ₹600 per person with all materials included.',
      },
      {
        q: 'How much does a corporate art workshop cost in Gurgaon?',
        a: 'Kraftykinni charges ₹600 to ₹800 per person for corporate art workshops in Gurgaon, depending on group size and activity. Groups of 50 to 100 pay ₹700 per person; smaller groups of 20 to 50 pay ₹800; larger groups above 100 pay ₹600. All materials, setup, and cleanup are included. There are no hidden venue or logistics charges.',
      },
      {
        q: 'Where can I book a team outing activity in Gurgaon?',
        a: 'Kraftykinni can be booked directly via WhatsApp at +91 9599622210 or through the contact form at kraftykinni.in. We conduct sessions at your office or event venue across Gurgaon, Delhi, and Noida — you do not need to arrange a separate venue. Online workshops with shipped material kits are also available for distributed teams.',
      },
      {
        q: 'What team building activities in Gurgaon work for a group of 100 people?',
        a: 'Activities that work well at 100-person scale in Gurgaon include guided art workshops (Tie & Dye, Mandala Art, Boho Canvas), indoor sports tournaments, cooking competitions, and scavenger hunts. Art workshops are particularly effective because they run simultaneously across a large room without fragmenting the group into separate rotations or time slots.',
      },
    ],
  },
  {
    slug: 'annual-day-activity-ideas-schools-delhi-ncr',
    title: 'Annual Day Activity Ideas for Schools in Delhi NCR (Art-Based Edition)',
    metaTitle: 'Annual Day Activity Ideas for Schools in Delhi NCR | Kraftykinni',
    metaDescription:
      '8 art-based annual day activity ideas for schools in Delhi NCR. Structured, mess-free, and designed for 50–300 students. Led by a Fevicryl-certified artist.',
    publishDate: '2026-04-28',
    category: 'School & College',
    excerpt:
      "Most schools start planning their annual day in April or May — when the academic calendar clears and the event committee starts arguing about what to do. If you're looking for activities that go beyond a generic craft stall and actually produce something students are proud of, this list is for you.",
    keywords: [
      'annual day activities school Delhi',
      'school event ideas Delhi NCR',
      'art day school workshop',
      'annual day workshop for students',
      'school art activity Delhi NCR',
    ],
    sections: [
      {
        body: `Most schools start planning their annual day in April or May — when the academic calendar clears and the event committee starts arguing about what to do. The standard rotation is a cultural programme, a few stalls, maybe a game or two. All fine. But after running art sessions for schools across Delhi, Gurgaon, and Noida, we've seen what happens when students are handed proper materials, a structured activity, and a little creative latitude: they produce work that surprises even themselves.\n\nThis list focuses on art-based activities specifically — structured, led by a trained facilitator, and scaled to school group sizes. Each one works for 50 to 300 students and produces a finished piece every participant takes home.`,
      },
      {
        heading: '1. Tote Bag Painting',
        body: `Tote Bag Painting is the most universally popular activity for school annual days, and for good reason. Students paint fabric tote bags using stencils, freehand patterns, and fabric colours — the result is a personalised bag they'll actually use. It photographs beautifully, works for every age group from Class 4 upward, and the finished bags function as a lasting memory of the event.\n\nIt scales effortlessly: 100 students painting simultaneously at long tables creates a vibrant visual that also photographs well for school newsletters and social posts.`,
      },
      {
        heading: '2. Block Printing',
        body: `Block Printing connects students to one of India's oldest textile traditions. Carved wooden blocks, fabric colours, and white cotton cloth — students learn to align and stamp repeat patterns, building up a finished printed fabric piece step by step. The process is rhythmic and satisfying, and the Indian craft context gives teachers a natural tie-in to history or geography lessons.\n\nBlock Printing works particularly well for senior school students (Class 8 onward) — the precision required keeps it engaging without being frustrating.`,
      },
      {
        heading: '3. Mandala Art',
        body: `Mandala Art is structured, meditative, and produces results that look far more impressive than the effort involved. Students build geometric mandala patterns on paper or canvas using dotting tools and acrylic paint, starting from the centre and working outward. The step-by-step guidance means even students who insist they "can't draw" finish with something genuinely beautiful.\n\nFor schools running a wellness or mindfulness theme on their annual day, Mandala Art is the strongest choice — the repetitive, pattern-based process has a measurably calming effect.`,
      },
      {
        heading: '4. Lippan Art',
        body: `Lippan Art is the activity that consistently generates the most conversation on the day. It's a centuries-old folk craft from Gujarat's Kutch region — traditionally, artisans use clay and small mirrors to create raised, geometric wall panels. In our school sessions, students work with craft clay and mirror pieces on a board, building their own version of this distinctive pattern.\n\nThe cultural storytelling angle is strong: students learn where the craft comes from, what it originally meant, and why it looks the way it does. Art teachers in particular appreciate the cross-curricular richness. The finished boards are display-worthy — many schools put them up in classrooms or corridors after the event.`,
      },
      {
        heading: '5. Canvas Pouch Painting',
        body: `Canvas Pouch Painting is a good choice for younger students or when the schedule allows a shorter activity slot (60–75 minutes). Students paint and decorate a small canvas pouch using acrylic colours — it's low-pressure, produces an immediately usable result, and works well for a stall-style format where students rotate through at their own pace.\n\nIt's also one of the most affordable activities to run at scale, which matters when a school is budgeting for 200+ students.`,
      },
      {
        heading: '6. Tie & Dye',
        body: `Tie & Dye is the activity for schools that want energy and colour. Students fold, twist, and bind white cotton fabric — a t-shirt, dupatta, or cloth square — before dipping it in vibrant dye. The reveal moment, when the bindings come off and the pattern appears, is genuinely exciting and always produces a room full of noise.\n\nBecause no two pieces ever turn out identical, Tie & Dye sidesteps comparison anxiety completely — there's no "better" or "worse" result, only different ones. That makes it particularly good for mixed-age groups or students who tend to be self-conscious about art.`,
      },
      {
        heading: '7. Clay Art',
        body: `Clay Art is the most tactile activity on this list — and often the most memorable. Students work with air-dry craft clay to build small decorative pieces: bowls, tiles, figurines, or relief patterns. The material is forgiving and self-correcting in a way that paint is not, which makes it excellent for students across a wide skill range.\n\nClay sessions run best for smaller groups (up to 80 per session) and require slightly more table space than painting activities. They work well as a premium activity for senior students or as a separate experience from the main annual day programme.`,
      },
      {
        heading: '8. Glass Painting',
        body: `Glass Painting uses transparent glass paint and outliners to create stained-glass-style designs on glass tiles or bottles. The finished pieces are translucent and look especially striking when held to light. It's a calm, detail-oriented activity — well suited to students who enjoy precision and want something different from brush-on-paper painting.\n\nGlass Painting works well as a competition format, where a group of students create pieces that are displayed and voted on.`,
      },
      {
        heading: 'What makes an art activity work at a school annual day',
        body: `The activities above all share a few characteristics that matter when you're managing a large group of students on a busy event day.\n\n**A finished result in 60–90 minutes.** Students need to complete something within a single session. Activities that require drying, curing, or multiple phases across days don't work in an event format.\n\n**No experience required.** Step-by-step facilitation is non-negotiable. The facilitator's job is to ensure every student — not just the confident ones — finishes with something they're proud of.\n\n**Mess managed in advance.** Schools reasonably worry about paint on floors and uniforms. A professional facilitator brings protective coverings, appropriate materials, and handles cleanup. The venue is left exactly as it was found.\n\n**Scale.** The activity needs to run simultaneously for your full group size, not in small rotations that fragment the experience across the day.`,
      },
      {
        heading: "Book an art workshop for your school's annual day",
        body: `Kraftykinni runs structured art workshops for schools across Delhi, Gurgaon, and Noida. All materials are brought to your school — you provide the venue, tables, and chairs. Sessions run from 60 to 120 minutes, and every student takes their finished artwork home.\n\nWe work with groups from 30 to 300+ students. Pricing starts at ₹600 per student with all materials included. Get in touch to discuss your annual day date and the activity that fits your group best.`,
      },
    ],
    faq: [
      {
        q: 'What art activities work best for a school annual day in Delhi NCR?',
        a: 'The most popular art activities for school annual days in Delhi NCR are Tote Bag Painting, Mandala Art, Lippan Art, and Tie & Dye. All four produce a finished piece in 60–90 minutes, require no prior experience, and scale to groups of 50 to 300+ students. Kraftykinni runs all of these at schools across Delhi, Gurgaon, and Noida.',
      },
      {
        q: 'How much does an art workshop for a school annual day cost?',
        a: 'Kraftykinni charges ₹600 per student for school art workshops, with all materials included. For larger groups of 200+ students, pricing is discussed based on the activity and logistics. There are no hidden charges — setup, facilitation, and cleanup are all included.',
      },
      {
        q: 'Can an art workshop be run for 200 students on the same day?',
        a: 'Yes. Activities like Tote Bag Painting, Mandala Art, and Block Printing can run simultaneously for groups of 200+ students across a large hall. Kraftykinni brings sufficient materials and facilitators to manage large school groups. The activity runs as one cohesive session, not in fragmented rotations.',
      },
      {
        q: 'Do students need any prior art experience for these workshops?',
        a: 'No. Every Kraftykinni session is designed for complete beginners. The facilitator guides students step by step — from materials to technique to finishing. Students who have never held a paintbrush walk away with a finished piece they are proud of. That is by design, not by chance.',
      },
    ],
  },
];
