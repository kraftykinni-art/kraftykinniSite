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
  relatedWorkshop?: string;  // workshop id from workshops.ts — shown as a "Related workshop" link
  updatedDate?: string;  // ISO date of the last real content update — drives dateModified + sitemap lastmod
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
  image?: string;              // optional image URL rendered below body
  imageAlt?: string;           // alt text for the image
  imageCaption?: string;       // optional visible caption under the image
}

// ─── Posts ──────────────────────────────────────────────────────────────────

const allBlogPosts: BlogPost[] = [
  {
    slug: 'best-corporate-team-building-activities-gurgaon-2026',
    title: 'Best Corporate Team Building Activities in Gurgaon 2026',
    metaTitle: 'Team Building Activities in Gurgaon 2026 | Kraftykinni',
    metaDescription:
      'Top 10 team building activities in Gurgaon for 2026, from art workshops to escape rooms. Honest picks with real team outcomes. Workshops from ₹600/person.',
    publishDate: '2026-04-27',
    updatedDate: '2026-10-13',
    category: 'Corporate',
    relatedWorkshop: 'lippan-art',
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
        body: `**Updated October 2026.**\n\nGurgaon's corporate event scene is full of options — escape rooms, bowling, and go-karting have their place. But after running 50+ team workshops across Cyber City, Udyog Vihar, and DLF Cyber Park, we've seen which activities actually produce conversation, connection, and something teams talk about months later.\n\nThis list is built on that experience. We've kept it honest: art workshops are on this list because they work, not because we run them. Each pick is assessed on group size flexibility, what actually happens in the room, and whether the activity survives the Monday-morning test — will your team still be talking about it the following week?`,
      },
      {
        heading: '1. Art Workshop — the #1 pick for genuine connection',
        body: `Art workshops consistently outperform every other team activity on one metric: conversation. When you give 40 people a craft task and tell them there's no wrong answer, something relaxes. Colleagues who rarely speak end up debating colour choices. Senior managers sit alongside interns, both equally bad at Lippan Art, equally delighted by the result.\n\n[Kraftykinni](/corporate-art-workshops) runs guided art sessions starting at ₹600 per person across Gurgaon, with 13 workshop activities — [Lippan Art](/workshops/lippan-art), [Tie & Dye](/workshops/tie-and-dye), [Texture Art](/workshops/texture-art), [Block Printing](/workshops/block-printing), Boho Canvas, Mandala Art, Bottle Lamp Art, and more. Every participant takes a finished artwork home. Groups from 20 to 200+ are accommodated.\n\nFor a real example, read how [40 Cars24 employees made hand-painted clay trinkets at their Gurgaon office](/blog/clay-trinket-painting-workshop-cars24-gurgaon) in a single afternoon session.\n\nWhy it's #1: You get a genuine creative experience, a physical takeaway, and 90 minutes of unforced, cross-team interaction. It's hard to top that combination at this price point.`,
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
        body: `Kraftykinni runs art workshops for corporate teams across Gurgaon, Delhi, and Noida. All materials are included. Setup and cleanup are on us. You just need tables, chairs, and your people.\n\nGroups from 20 to 200+. Starting at ₹600 per person. [See our corporate workshop page](/corporate-art-workshops), browse [art workshops in Gurgaon](/workshops-in-gurgaon), or read about our [employee engagement activities in Gurgaon](/employee-engagement-activities-gurgaon). Get in touch to discuss your event date and preferred activity.`,
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
    metaTitle: 'Annual Day Art Ideas for Schools Delhi NCR | Kraftykinni',
    metaDescription:
      '8 art-based annual day activity ideas for schools in Delhi NCR. Structured, mess-free, for 50–300 students. Led by a Fevicryl-certified artist.',
    publishDate: '2026-04-28',
    category: 'School & College',
    relatedWorkshop: 'tote-bag-painting',
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
        body: `Most schools start planning their annual day in April or May — when the academic calendar clears and the event committee starts arguing about what to do. The standard rotation is a cultural programme, a few stalls, maybe a game or two. All fine. But after running art sessions for schools across Delhi, Gurgaon, and Noida, we've seen what happens when students are handed proper materials, a structured activity, and a little creative latitude: they produce work that surprises even themselves.\n\nThis list focuses on art-based activities specifically — structured, led by a trained facilitator, and scaled to school group sizes. Each one works for [school groups of 50 to 300 students](/school-art-workshops) and produces a finished piece every participant takes home.`,
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
        body: `Kraftykinni runs structured art workshops for schools across Delhi, Gurgaon, and Noida. All materials are brought to your school — you provide the venue, tables, and chairs. Sessions run from 60 to 120 minutes, and every student takes their finished artwork home.\n\nWe work with groups from 30 to 300+ students. Pricing starts at ₹600 per student with all materials included. [See school workshop packages and pricing](/school-art-workshops) or get in touch to discuss your annual day date and the activity that fits your group best.`,
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
  {
    slug: 'art-workshop-ideas-birthday-party-delhi-ncr',
    title: 'Art Workshop Ideas for Birthday Parties in Delhi NCR',
    metaTitle: 'Birthday Party Art Workshop Ideas Delhi NCR | Kraftykinni',
    metaDescription:
      'Planning a birthday party in Delhi NCR? Art workshops let every guest create and take home a keepsake. ₹600/person, all materials included.',
    publishDate: '2026-04-29',
    category: 'Private Events',
    relatedWorkshop: 'boho-canvas',
    excerpt:
      "The standard Delhi birthday party formula — venue, buffet, DJ, go home — produces a fine evening. But after running art sessions for birthday groups across South Delhi, Gurgaon, and Noida, we've noticed something: guests who make something together remember the evening very differently from guests who just attended it.",
    keywords: [
      'art workshop birthday party Delhi',
      'creative birthday ideas Delhi NCR',
      'art workshop birthday party Gurgaon',
      'unique birthday party ideas Delhi',
      'kitty party art workshop Delhi NCR',
    ],
    sections: [
      {
        body: `The standard Delhi birthday party formula — venue, buffet, DJ, go home — produces a fine evening. But after running art sessions for birthday groups across South Delhi, Gurgaon, and Noida, we've noticed something: guests who make something together remember the evening very differently from guests who just attended it.\n\nAn art workshop changes the structure of a birthday party. Instead of a room full of people waiting for the food or half-listening to music, you get 15 to 40 people deeply absorbed in the same task — talking, comparing, helping each other, laughing at their own results. It is an activity that fills the room with energy without requiring anyone to perform or compete. And at the end, every guest walks out with a finished artwork in hand, something they made with their own hands that evening.\n\nThis post covers the best art workshop formats for birthday parties in Delhi NCR, what makes each one work, and what to expect when you book.`,
      },
      {
        heading: 'Why an art workshop works as a birthday party activity',
        body: `Most birthday party activities split into two categories: passive (watch a performer, eat, socialise) or competitive (games, trivia, sports). Art workshops sit in a third category: collaborative and creative without being competitive. There is no scoring, no winner, no elimination. Everyone is working on their own piece at their own pace, but the process is shared.\n\nThis makes art workshops particularly good for mixed groups — guests who know each other well and guests who are meeting for the first time both have something to do with their hands and a natural conversation starter in front of them. The artwork itself becomes the talking point.\n\nFor the birthday person, the format also has a practical advantage: you are not responsible for entertaining every guest simultaneously. The activity does that for you, for 90 minutes, while you move around the room at your own pace.`,
      },
      {
        heading: 'Best art workshop activities for a birthday party',
        body: `Not every workshop suits every birthday crowd. Here is how the main options break down for a private party setting.`,
      },
      {
        heading: 'Lippan Art — the standout choice for adult birthday parties',
        body: `Lippan Art is the workshop guests talk about afterward. The craft comes from the Kutch region of Gujarat — artisans traditionally press clay into geometric patterns and embed small mirrors to create striking wall panels. In our sessions, participants recreate this technique on a board using craft clay and decorative mirrors.\n\nWhat makes it work for a birthday party specifically: the finished piece is genuinely display-worthy, not something you put in a drawer and forget. Guests leave with something they are proud of and want to put up at home. The process is slow enough to allow real conversation — you cannot rush clay — which means the 90-minute session becomes one long, relaxed social hour that also produces art.\n\nBest for: adult birthday parties, kitty parties, small office celebration groups. Works for groups of 15 to 60.`,
      },
      {
        heading: 'Tote Bag Painting — relaxed, easy, and always a hit',
        body: `Tote Bag Painting is the easiest entry point into a workshop-format birthday party. Guests paint fabric tote bags using acrylic colours and stencils — personalised with their own patterns, names, or designs. The process takes 60 to 75 minutes, produces a functional takeaway, and has essentially no learning curve.\n\nIt works well for mixed-age groups where some guests might be more hesitant about art. The bag is something practical and personal — several of our birthday party guests have returned to book Kraftykinni specifically because they still use the tote from the party they attended.\n\nBest for: casual birthday parties, cousin gatherings, mixed-age groups. Works for groups of 20 to 100.`,
      },
      {
        heading: 'Mandala Art — the right choice for a wellness-themed celebration',
        body: `Mandala Art has become popular for birthday parties that want a calmer, more intentional energy — particularly popular for milestone birthdays (30th, 40th, 50th) where the tone is reflective rather than high-energy. Guests build symmetric mandala patterns on canvas using dotting tools and acrylic paint, working from the centre outward.\n\nThe process is meditative and genuinely absorbing — people look up from their canvas surprised that 90 minutes have passed. Every piece looks impressive regardless of the guest's artistic background, which matters when you have guests who come in saying "I'm terrible at art."\n\nBest for: milestone birthdays, close friend groups, bachelorette parties where you want a quieter afternoon activity. Works for groups of 15 to 50.`,
      },
      {
        heading: 'Tie & Dye — the high-energy option',
        body: `If your birthday party group leans younger or you want something with more visual drama, Tie & Dye is the pick. Guests fold, bind, and dip fabric — a dupatta, t-shirt, or cotton square — and the reveal when the ties come undone is genuinely exciting every time. No two pieces ever look the same, which means every guest gets a unique result.\n\nTie & Dye sessions are louder and livelier than the other options on this list. The shared reveal moment creates a burst of energy that feels like the party equivalent of a toast.\n\nBest for: younger adult groups, bachelorette parties, casual birthday celebrations where you want high energy. Works for groups of 20 to 80.`,
      },
      {
        heading: 'Canvas Pouch Painting — the compact option for smaller budgets',
        body: `Canvas Pouch Painting offers the same personalised-takeaway appeal as Tote Bag Painting but in a smaller format and at a lower per-person cost. Guests paint and decorate a small canvas pouch — zippered, usable, personal. It works well as a party favour format where guests rotate through in a shorter window.\n\nBest for: birthday parties on a tighter budget, parties with 30+ guests where cost per head matters, children's birthday parties for ages 10 and above.`,
      },
      {
        heading: 'What to expect when you book a birthday party workshop',
        body: `**Group size.** Kraftykinni accommodates birthday party groups from 15 to 80 guests for most activities. Smaller groups (below 15) can sometimes be accommodated — ask when you enquire.\n\n**Venue.** We bring everything to your home, farmhouse, club, or hired venue. You need tables, chairs, and reasonable surface space per person. We handle materials, setup, facilitation, and cleanup.\n\n**Duration.** Most birthday party workshops run for 90 minutes of active creation time. Factor in 15 to 20 minutes on each side for setup and cleanup — a 2 to 2.5 hour booking window is standard.\n\n**Advance booking.** Seven days minimum. For weekend dates in November through February (the peak Delhi party season), three to four weeks is safer.\n\n**Pricing.** ₹600 to ₹800 per person, all materials included. The per-person rate depends on group size and activity. There are no venue charges — the price you are quoted covers everything.`,
      },
      {
        heading: 'Book an art workshop for your birthday party in Delhi NCR',
        body: `Kraftykinni runs private art workshops for birthday parties, kitty parties, bachelorette celebrations, and baby showers across Delhi, Gurgaon, and Noida. Every session is led by Shramita Govil, a Fevicryl Certified Artist with 50+ workshops and 1,500+ participants across Delhi NCR.\n\nGet in touch via WhatsApp or the contact form to discuss your date, group size, and preferred activity. We'll confirm availability and send a quote within 24 hours. [Browse all workshop activities](/workshops/lippan-art) or [read about private events](/private-art-workshops) to find the format that suits your group. Planning a party for children? See how three recent [kids' birthday art workshops in Delhi and Noida](/blog/kids-birthday-party-art-workshop-delhi-noida) worked, from ages 4 to 11.`,
      },
    ],
    faq: [
      {
        q: 'What is the best art workshop activity for a birthday party in Delhi NCR?',
        a: 'Lippan Art and Tote Bag Painting are the most popular choices for birthday parties in Delhi NCR. Lippan Art produces a display-worthy wall piece and creates a relaxed, conversational atmosphere — ideal for adult groups of 15 to 60. Tote Bag Painting is more accessible, works for mixed-age groups, and produces a functional everyday takeaway. Kraftykinni can advise on the best fit based on your group size and party style.',
      },
      {
        q: 'How much does an art workshop birthday party cost in Delhi NCR?',
        a: 'Kraftykinni charges ₹600 to ₹800 per person for birthday party art workshops, with all materials included. Groups of 50 to 100 pay ₹700 per person; smaller groups of 15 to 50 pay ₹800; groups above 100 pay ₹600. Setup, facilitation, and cleanup are all included — there are no additional venue or logistics charges.',
      },
      {
        q: 'Can Kraftykinni conduct an art workshop at my home or farmhouse?',
        a: 'Yes. Kraftykinni brings all materials, setup, and equipment to your home, farmhouse, club, or any hired venue in Delhi, Gurgaon, or Noida. You provide tables, chairs, and surface space. We handle everything else — including cleanup after the session.',
      },
      {
        q: 'How far in advance should I book an art workshop for a birthday party?',
        a: 'A minimum of seven days is required for most bookings. For weekend dates between November and February — the peak party season in Delhi NCR — three to four weeks advance booking is recommended to ensure availability of your preferred date and activity.',
      },
      {
        q: 'Can a birthday art workshop work for both experienced and non-artistic guests?',
        a: 'Yes — and this is one of the strongest arguments for choosing a workshop format. All Kraftykinni sessions are designed for complete beginners. Shramita guides guests step by step from the start, and the activities are chosen specifically because they produce impressive results regardless of prior experience. Guests who arrive saying \"I cannot draw\" consistently finish with artwork they want to display or keep.',
      },
    ],
  },
  {
    slug: 'lippan-art-complete-beginners-guide-kutch-mirror-work',
    title: "How to Make Lippan Art: A Beginner's Guide to Kutch Mirror Work",
    metaTitle: 'How to Make Lippan Art: Beginner\'s Guide | Kraftykinni',
    metaDescription:
      'Learn how to make Lippan Art: materials, 5 steps and what a guided Lippan Art workshop in Delhi NCR involves. From ₹600/person, all materials included.',
    publishDate: '2026-05-01',
    updatedDate: '2026-10-13',
    category: 'Workshop Guides',
    relatedWorkshop: 'lippan-art',
    excerpt:
      "Lippan Art is a centuries-old craft from the Kutch region of Gujarat, and it produces some of the most striking wall pieces you'll see in Indian craft. Clay, mirrors, and geometric patterns — here's how to make it, step by step, before your first session.",
    keywords: [
      'lippan art tutorial',
      'kutch lippan art',
      'how to make lippan art',
      'lippan art workshop Delhi',
      'kutch mirror work workshop',
      'lippan art for beginners',
      'mirror work wall art India',
    ],
    sections: [
      {
        body: `Lippan Art is a centuries-old folk craft from the Kutch region of Gujarat, where clay patterns are built up on a surface and small mirrors are pressed into them so the piece catches the light. You can learn the basic technique in a single guided session of around two hours, and no art experience is needed.\n\nThis guide explains how to make Lippan Art step by step: the materials, the five stages from base coat to metallic painting, and what to expect if you book a [Lippan Art workshop](/workshops/lippan-art) in Delhi, Gurgaon or Noida. At Kraftykinni it is the most requested workshop activity, and first-timers consistently finish with a wall piece they want to display.`,
      },
      {
        heading: 'The Tradition Behind the Craft',
        body: `The word "lippan" refers to the mud-and-cow-dung plaster that Kutchi women historically applied to their home walls. Embedded into this plaster were "abhla" — small circular mirrors — arranged in concentric geometric patterns. The mirrors served a practical function in the harsh Rann of Kutch environment: they reflected sunlight into dim interiors and were believed to ward off the evil eye.\n\nThe patterns were not random. Different communities in Kutch developed distinct visual vocabularies — interlocking chevrons, nested octagons, floral medallions, and the characteristic six-pointed star motifs that appear across Islamic and folk art traditions in the region. Each pattern was passed down through families, which is why traditional Lippan work has such visual coherence despite being produced by many hands.\n\nThe craft almost disappeared during the devastating 2001 Bhuj earthquake, which destroyed much of Kutch's built heritage and displaced many of its artisan communities. The revival was partly driven by craft organisations working with women's self-help groups and partly by a growing urban market for authentic Indian craft objects. What you're doing when you make Lippan Art is participating in something with real cultural weight — which makes it a more interesting workshop than it might sound on a brochure.`,
      },
      {
        heading: 'The Materials: What Makes Lippan Art Work',
        body: `Traditional Lippan Art used naturally sourced mud and cow dung as the base medium, with genuine mirror glass cut into small rounds. The contemporary version — what you'd use in a workshop or at home — substitutes those with accessible equivalents that are just as effective.\n\n**Clay compound (Fevicryl Mouldit or similar epoxy putty):** This is the primary medium. It's a two-part compound — when the two components are kneaded together, a chemical reaction makes it workable for 20–30 minutes before it sets hard. It adheres to wood, MDF, canvas board, and most painted surfaces. It can be smoothed, textured, and shaped with basic tools.\n\n**Convex mirrors (abhla):** These are small, domed mirror pieces — typically 10mm to 20mm in diameter — sold in craft supply stores. The convex surface catches light from multiple angles, which is why traditional Lippan pieces appear to glow even in low light. Flat mirrors work but don't produce the same optical effect.\n\n**Acrylic paints:** The clay is painted after it sets and is dry. Metallic acrylics (gold, copper, silver) are the most traditional choice. Earth tones work well for a more muted, contemporary look. Most workshop participants use two to three colours.\n\n**Surface:** The standard workshop surface is an MDF board (typically 20cm × 25cm for a 2-hour session) or a terracotta pot. MDF is recommended for beginners because its flat surface makes pattern laying easier.`,
        image: 'https://cdn.kraftykinni.in/lippan-art-process.jpeg',
        imageAlt: 'Participant applying clay detail work to a painted pot at a Kraftykinni Lippan Art workshop',
      },
      {
        heading: 'The Process: Step by Step',
        body: `Understanding the process helps you set realistic expectations — and explains why Lippan Art is genuinely achievable for beginners in a two-hour session.\n\n**Step 1 — Base coat.** The MDF board or surface is painted with one or two coats of acrylic in your chosen background colour. This dries in 10–15 minutes. Most participants choose terracotta, ivory, or black as their base.\n\n**Step 2 — Pattern sketch (optional).** A light pencil sketch of the geometric layout helps beginners. In our workshops, Shramita provides a reference pattern card with a few classic Kutch motifs — nested diamonds, star medallions, and border patterns. You're not copying it exactly; it's a structural guide.\n\n**Step 3 — Clay application.** Knead the two-part compound until it's uniform and begins to warm slightly — this means the reaction has started. Roll small amounts into ropes and press them onto the surface following the pencil lines. You use your fingertip and a basic clay tool to smooth edges and create texture. This is the most tactile part of the process and where most of the absorption happens — people stop talking and focus.\n\n**Step 4 — Mirror placement.** While the clay is still workable (you have a 20-minute window), press the convex mirror pieces into the clay at the intersections and centres of your geometric pattern. The clay grips them as it sets. The placement of mirrors transforms a flat pattern into something three-dimensional — this is usually the moment participants realise what they're making is genuinely beautiful.\n\n**Step 5 — Paint and detailing.** Once the clay is fully set (it hardens within 30–40 minutes of application), you paint the raised clay elements. Metallic gold or copper over the clay against a dark background is the most striking combination. A fine brush adds detail lines and fills.\n\nThe result is a lightweight, durable piece that genuinely looks handcrafted — because it is.`,
        image: 'https://cdn.kraftykinni.in/lippan-workshop-session.jpeg',
        imageAlt: 'Participants working on Lippan Art projects at a Kraftykinni workshop in Delhi NCR',
      },
      {
        heading: 'Why Lippan Art Works So Well in a Group',
        body: `Most craft activities have a problem in group settings: the gap between skilled and unskilled participants becomes visible quickly, and people who fall behind feel self-conscious. Lippan Art sidesteps this almost entirely.\n\nThe reason is the structure of the process. Geometric patterns are inherently forgiving — imprecise clay lines often look more authentic than perfectly uniform ones, because traditional Lippan work was hand-applied by eye. The mirror placement is satisfying regardless of skill level: pressing a convex mirror into fresh clay and seeing it sit flush and catch the light is a small, repeatable success that happens dozens of times across a single piece. The metallic paint step produces dramatic results quickly.\n\nWhen 30 people are working on Lippan Art simultaneously, the room produces a particular kind of focused, quiet engagement. It's not silent — there's conversation — but it's the kind of conversation that happens when people are doing something with their hands. People compare mirror placement choices. They disagree about whether to use gold or copper. They notice what the person next to them is doing and ask about it.\n\nEvery finished piece looks different despite being made with the same materials and the same basic pattern guidance. That individuality is important in a group setting: no one walks away with an identical object, and the work is genuinely their own.`,
      },
      {
        heading: 'Who Should Try a Lippan Art Workshop',
        body: `The short answer: anyone who has 90 minutes and access to a table. Lippan Art works for corporate team-building sessions, school craft days, birthday parties, and private groups looking for something more substantial than a paint-and-sip evening.\n\nFor **corporate teams**, it's one of the few group activities that scales cleanly from 20 to 150+ participants while maintaining quality. The tactile process cuts through the usual corporate event dynamics — seniority doesn't matter when everyone's trying to roll a clay rope the same width. Participants take their finished piece home, which means the event stays with them.\n\nFor **school and college groups**, Lippan Art introduces students to a living Indian craft tradition without being didactic about it. The cultural context lands naturally when you're actually making something from that tradition. It works for art days, orientation events, and cultural programmes.\n\nFor **private events** — birthdays, kitty parties, bachelorettes — it's more engaging than most alternatives because the finished piece is genuinely useful. People display their Lippan Art. It doesn't end up in a drawer.\n\nKraftykinni runs [Lippan Art workshops](/workshops/lippan-art) across Delhi, Gurgaon, and Noida, coming to your office, school, or event venue with all materials included. Group sizes from 20 to 200+, starting at ₹600 per person. If you want to understand what a session looks like before booking, the [corporate workshop page](/corporate-art-workshops) has the full format details.`,
      },
    ],
    faq: [
      {
        q: 'Is Lippan Art difficult for complete beginners?',
        a: 'No — and this is one of the reasons it works so well as a group activity. The geometric structure of Lippan Art means that variations in line accuracy look intentional rather than like mistakes. Shramita guides every session step by step, and participants consistently finish with pieces they want to display regardless of their art background.',
      },
      {
        q: 'What surfaces can Lippan Art be done on?',
        a: "MDF board is the standard for workshops — it's lightweight, flat, and the clay compound adheres reliably. Terracotta pots, canvas board, wooden panels, and glass surfaces also work. The only surfaces to avoid are those that flex (the clay can crack as it sets) or that are heavily coated in a non-porous finish without sanding first.",
      },
      {
        q: 'How long does a Lippan Art workshop session take?',
        a: 'A standard guided session runs 90 minutes to 2 hours for beginners, which is enough time to complete one MDF board piece — pattern application, mirror placement, and basic painting. More elaborate pieces or terracotta pot formats can run to 2.5 hours.',
      },
      {
        q: 'What materials do I need to try Lippan Art at home?',
        a: 'You need Fevicryl Mouldit epoxy compound (available at art supply stores and online), convex mirror pieces (abhla, available in 10mm and 15mm sizes), acrylic paints including metallic shades, an MDF board or terracotta surface, and basic clay tools. Craft stores in Delhi NCR typically stock all of these. A Kraftykinni workshop includes all materials in the per-person cost.',
      },
      {
        q: 'Can Lippan Art be done as a team-building activity for large groups?',
        a: "Yes — it's one of Kraftykinni's most requested corporate activities for large groups. Sessions scale to 150+ participants with additional facilitators, and the process works in standard office or banquet hall settings with basic tables and chairs. The tactile, non-competitive format produces genuine cross-team interaction.",
      },
      {
        q: 'How do I book a Lippan Art workshop in Delhi, Gurgaon, or Noida?',
        a: 'Contact Kraftykinni via the booking form or WhatsApp at +91 9599622210. Share your group size, preferred date, and location. Shramita confirms availability within 24 hours and suggests the right format for your group. A 50% deposit confirms the date; minimum 7 days notice required.',
      },
    ],
  },
  {
    slug: 'bottle-lamp-art-workshop-school-delhi-ncr',
    title: 'Bottle Lamp Art Workshop for Schools: How Jaypee Public School Noida Did It',
    metaTitle: 'Bottle Lamp Art Workshop for Schools Delhi NCR | Kraftykinni',
    metaDescription: 'How Jaypee Public School Noida ran Bottle Lamp Art for 150+ students using Fevicryl Mouldit. A school art activity guide for Delhi NCR.',
    publishDate: '2026-05-02',
    category: 'School & College',
    relatedWorkshop: 'bottle-lamp-art',
    excerpt:
      '150+ students at Jaypee Public School Greater Noida turned empty glass bottles into handcrafted decorative lamps using Fevicryl Mouldit and Acrylic Colours — and every single one took their finished piece home on the day.',
    keywords: [
      'bottle lamp art workshop school',
      'bottle art workshop Delhi NCR',
      'school art workshop Noida',
      'Fevicryl Mouldit workshop',
      'art activity for school annual day',
      'school art fest activity',
      'bottle decoration workshop students',
      'upcycling art workshop school',
    ],
    sections: [
      {
        body: `The Hindustan Times Lit Fest Preview at Jaypee Public School, Greater Noida, needed an art activity that would run simultaneously for over 150 students across grade groups — something with clear steps, no prior skill required, and a finished piece every student could carry home. The answer was Bottle Lamp Art: glass bottles transformed into decorative lamps using Fevicryl Mouldit epoxy compound and Acrylic Colours.\n\nHere is exactly how the session ran, what materials were used, and why Bottle Lamp Art works particularly well as a large-scale school event activity.`,
        image: 'https://cdn.kraftykinni.in/bottle-art-workshop-jaypee-school-noida-students.jpeg',
        imageAlt: 'Students at Jaypee Public School Greater Noida displaying finished Bottle Lamp Art pieces with Shramita Govil at the Hindustan Times Lit Fest Preview — Kraftykinni',
      },
      {
        heading: 'What is Bottle Lamp Art?',
        body: `Bottle Lamp Art is a craft technique that transforms a plain glass bottle into a textured, painted decorative lamp. The surface is built up using Fevicryl Mouldit — a two-part epoxy compound that sets firm within minutes — to create raised patterns, motifs, or sculptural elements directly on the bottle. Once set, the surface is painted with Fevicryl Acrylic Colours and finished with metallic or glitter accents.\n\nThe appeal is threefold: it is a genuine upcycling activity (empty bottles become display pieces), the tactile process of shaping Mouldit is immediately satisfying, and the finished lamp is functional — students can place a battery-powered LED inside and actually use it at home.\n\nFor schools, there is a further practical advantage: the Mouldit sets fast enough that students complete their full piece in a single 90-minute session, with no overnight drying required.`,
      },
      {
        heading: 'Materials Used at Jaypee Public School',
        body: `Students worked with the following materials, arranged in advance by the school and students, with facilitation and guidance provided by Kraftykinni:`,
        listItems: [
          'One clean glass bottle per student (round, square, and Borosil-style shapes were used)',
          'Fevicryl Mouldit two-part epoxy compound — pre-measured per student',
          'Fevicryl Acrylic Colours in a curated palette of 6 shades per group',
          'Shaping tools for Mouldit: wooden stylus and silicone tip',
          'Brushes in two sizes (flat for base coat, round for detail work)',
          'Mixing palette sheet',
          'Newspapers for workspace protection (laid before students arrived)',
          'Aprons for mess-free working',
        ],
        listType: 'ul',
        image: 'https://cdn.kraftykinni.in/bottle-lamp-art-school-workshop-session-noida.jpeg',
        imageAlt: 'Large-scale Bottle Lamp Art session at Jaypee Public School Noida — 150+ students working simultaneously on the atrium floor with Fevicryl materials by Kraftykinni',
      },
      {
        heading: 'How the Workshop Ran — Step by Step',
        body: `With 150+ students working across the school atrium simultaneously, the session ran in four clear stages with Shramita Govil and her facilitation team moving continuously between groups:`,
        listItems: [
          'Stage 1 — Base coat (10 minutes): Students painted the entire bottle surface with a single acrylic base colour of their choice. This step primes the surface for Mouldit adhesion.',
          'Stage 2 — Mouldit design application (25 minutes): Each student mixed their Mouldit portion and applied raised patterns — flowers, geometric lines, spirals, or sculptural motifs. Three pattern styles were demonstrated at the start; students then chose their own direction.',
          'Stage 3 — Set time and detail painting (20 minutes): While the Mouldit set (approximately 15–20 minutes), students added detail painting in contrasting or metallic Acrylic Colours around the raised elements.',
          'Stage 4 — Final accent and display (15 minutes): Gold and silver highlight touches were added to the Mouldit relief. Students placed finished bottles upright for a group display and photograph.',
        ],
        listType: 'ol',
        image: 'https://cdn.kraftykinni.in/bottle-art-shramita-guiding-students-jaypee.jpeg',
        imageAlt: 'Shramita Govil guiding a student on Bottle Lamp Art Mouldit technique at Jaypee Public School Greater Noida — Kraftykinni school workshop',
      },
      {
        heading: 'Why Bottle Lamp Art Works at Scale for Schools',
        body: `Most art activities that run smoothly for 20 students become unmanageable at 150. Bottle Lamp Art is one of the few formats that scales reliably — and here is why.\n\nThe Mouldit stage is self-paced. Students who work faster add more intricate detail to their relief pattern; students who work slower produce simpler, cleaner shapes. Both results look intentional. There is no penalty for speed difference, which removes the frustration that derails large-group activities when faster finishers are left idle and slower finishers feel rushed.\n\nThe bottle shape provides natural structure. Unlike a blank canvas, a bottle guides design decisions — students instinctively work around the curves, the neck, and the base. Students who say they "can't draw" consistently produce a structured, satisfying result because the surface itself provides direction.\n\nThe upcycling angle gives the activity a purpose beyond craft. Schools running sustainability-themed days, Earth Day programmes, or environment club activities find that the upcycled bottle narrative adds a layer of meaning that students carry home with the object itself.\n\nFor [school art workshops across Delhi NCR](/school-art-workshops), Bottle Lamp Art sits alongside Mandala Art and Tote Bag Painting as one of the three most reliable formats for large-group school events — each for different reasons, but all producing a finished piece that every participant takes home.`,
      },
      {
        heading: 'Book a Bottle Lamp Art Workshop for Your School',
        body: `[Bottle Lamp Art is one of Kraftykinni's signature workshop activities](/workshops/bottle-lamp-art), conducted by [Shramita Govil, Fevicryl Certified Artist](/about). Sessions are available across Delhi, Gurgaon, and Noida. Kraftykinni provides facilitation and guidance for the workshop. Materials can be arranged by the school or provided by Kraftykinni on request.\n\nGroup sizes from 30 to 300+ students. Duration: 90 minutes to 2 hours depending on group size and detail level. Pricing from ₹600 per student, all materials included. A minimum of 7 days notice is required to organise materials for large groups.\n\nTo book or enquire, WhatsApp +91 9599622210 or use the form below with your event date, student count, and grade group. Shramita confirms availability within 24 hours.`,
      },
    ],
    faq: [
      {
        q: 'What is Bottle Lamp Art and is it suitable for school students?',
        a: 'Bottle Lamp Art is a craft technique where glass bottles are decorated with Fevicryl Mouldit epoxy compound to create raised sculptural patterns, then painted with Acrylic Colours. It is suitable for students from Grade 5 upwards. Younger students in Grades 3–4 can participate with simpler pattern options. No prior art experience is required.',
      },
      {
        q: 'What materials are needed for a Bottle Lamp Art school workshop?',
        a: 'The primary materials are Fevicryl Mouldit (two-part epoxy compound) and Fevicryl Acrylic Colours. All materials — bottles, Mouldit, paints, brushes, tools, aprons, and newspaper workspace covers — are supplied by Kraftykinni. Schools do not need to arrange any art materials.',
      },
      {
        q: 'How long does a school Bottle Lamp Art session take?',
        a: 'A standard session runs 90 minutes for most school groups, covering base coat, Mouldit application, setting time, and detail painting. For very large groups of 200+ or for more detailed designs, 2 hours is recommended. Every student completes a finished piece before the session ends — there is no overnight drying.',
      },
      {
        q: 'Is Bottle Lamp Art suitable for a school annual day or art fest?',
        a: 'Yes — Bottle Lamp Art is one of the most-requested activities for school annual days and art fests in Delhi NCR. The finished bottle is display-worthy and students take it home as a memento of the event. The upcycling theme also works well for sustainability-themed school programmes and environment club activities.',
      },
      {
        q: 'How many students can do this activity at the same time?',
        a: 'Kraftykinni has conducted Bottle Lamp Art sessions for groups from 30 to 200+ students simultaneously. For large groups, additional trained facilitators are deployed. The Jaypee Public School Greater Noida session ran for over 150 students working across the school atrium floor.',
      },
      {
        q: 'Do students need to bring materials or prepare anything in advance?',
        a: 'No preparation required from students or the school. All materials are brought and laid out by Kraftykinni before the session begins. The workspace is covered in newspaper, cleared, and cleaned after the session. Schools only need to ensure the venue space, tables, and chairs are available.',
      },
    ],
  },

  // ─── Mother's Day Blog ────────────────────────────────────────────────────
  {
    slug: 'mothers-day-art-workshop-gift-delhi-ncr',
    title: "Mother's Day Art Workshop Gift Ideas in Delhi NCR — Make Something She'll Keep",
    metaTitle: 'Mother\'s Day Art Workshop Gift Ideas Delhi NCR | Kraftykinni',
    metaDescription:
      'Skip the flowers. Gift a Mother\'s Day art workshop in Delhi NCR. Lippan Art, Bottle Lamp, Clay — ₹600/person, all materials included.',
    publishDate: '2026-05-05',
    category: 'Private Events',
    relatedWorkshop: 'glass-painting',
    excerpt:
      "Flowers wilt by Tuesday. A handmade Lippan Art plaque, a painted bottle lamp, or a clay keepsake — those stay on the shelf for years. This Mother's Day, give her an experience she makes with her own hands, and takes home as something real.",
    keywords: [
      "mother's day art workshop Delhi",
      "mother's day gift experience Delhi NCR",
      "unique mother's day gift Delhi",
      "art workshop gift for mom Delhi",
      "mother's day activity Delhi NCR",
      "painting workshop mother's day Gurgaon",
      "mother's day craft workshop Delhi",
    ],
    sections: [
      {
        body: `Flowers wilt by Tuesday. A scented candle gets forgotten in a drawer. But a Lippan Art plaque with "MOM" raised in gold on teal clay — that goes on the shelf and stays there.\n\nThis Mother's Day (May 10, 2026), a growing number of families in Delhi, Gurgaon, and Noida are choosing experience gifts over objects. Not because they're cheaper — they're not always — but because making something together, or gifting someone a session to make something herself, creates a memory that outlasts any product.\n\nHere's how Kraftykinni's art workshops work as Mother's Day gifts, and which activities land best.`,
        image: 'https://cdn.kraftykinni.in/mothers-day-lippan-art-mom-plaque-kraftykinni.jpg',
        imageAlt: "Kraftykinni Lippan Art 'MOM' plaque in teal and gold on a wooden easel — a handmade Mother's Day keepsake from an art workshop in Delhi NCR",
      },
      {
        heading: "Why an Art Workshop Works as a Mother's Day Gift",
        body: `Most gift categories for Mother's Day — skincare, jewellery, flowers — are things given to her. An art workshop is something she makes. That's a meaningful difference.\n\nIn a guided art session, she isn't a passive recipient. She's shaping clay, placing mirrors, painting a bottle, mixing colours. The process itself is the experience: absorbing, tactile, and genuinely calming in a way that a spa voucher sitting in an envelope is not.\n\nThe finished piece she takes home carries that memory. Every time she looks at the Lippan Art plaque on her wall or the painted bottle on her shelf, the afternoon comes back — the colours she chose, the detail she worked on, the moment it all came together.\n\nFor families who want to attend together — a daughter and her mother, a group of friends, a kitty party gathered around art — Kraftykinni sessions accommodate groups from 10 to 100+ with all materials included from ₹600 per person.`,
      },
      {
        heading: "Best Kraftykinni Workshops for Mother's Day",
        body: `Three activities in particular work especially well for Mother's Day — each for different reasons.`,
        listItems: [
          'Lippan Art — the most gift-worthy takeaway. Lippan is a centuries-old Kutch folk craft where raised clay patterns and embedded mirrors create a striking, textured wall piece. Kraftykinni has created custom "MOM" and "Maa" motif Lippan plaques — the result is a keepsake that genuinely looks like something you\'d buy in a boutique store. Duration: 2–2.5 hours. Works well for groups of 10–50.',
          'Bottle Lamp Art — beautiful and personal. Participants paint a glass bottle — with an Indian motif, a sunset scene, a floral design — and the finished bottle serves as a vase or fairy-light lamp at home. The example image above shows what\'s possible: a saree-clad woman in an orange-green sunset, painted entirely in a single session. The artistic level is genuinely impressive for a first-time participant.',
          'Clay Art — tactile and therapeutic. Working with clay has a deeply calming effect that makes it a natural fit for a relaxed Mother\'s Day afternoon. Each participant shapes and paints their own clay creation — from small decorative bowls to sculpted figurines. No prior experience needed. Duration: 1.5–2 hours.',
        ],
        listType: 'ul',
        image: 'https://cdn.kraftykinni.in/mothers-day-bottle-lamp-art-saree-kraftykinni.jpg',
        imageAlt: "Hand-painted bottle lamp art with Indian woman in saree motif — a Kraftykinni workshop takeaway ideal as a Mother's Day gift in Delhi NCR",
      },
      {
        heading: "The 'Maa Tu Sabse Achi Hai' Gift — A Workshop Moment",
        body: `One of the most loved Mother's Day creations from a Kraftykinni session is the small painted bottle with "Maa tu sabse achi hai" — a hand-lettered message on a burnt-paper card tucked into a tiny red vase with dried flowers. It takes about 45 minutes to make, costs almost nothing in materials, and is the kind of thing a mother keeps on her dressing table for years.\n\nThis is the Bottle Art format scaled down to a personal size — a mini gifting session that works well for children, for school groups close to Mother's Day, or for families who want to create something together at home or in a private group session.\n\nFor private groups wanting a customised Mother's Day workshop — whether a kitty party, a mother-daughter session, or a building-wide event in a Gurgaon residential complex — [Kraftykinni runs private sessions](/private-art-workshops) with a minimum of 15 participants.`,
        image: 'https://cdn.kraftykinni.in/mothers-day-bottle-art-maa-gift-kraftykinni.webp',
        imageAlt: "Small hand-painted red bottle vase with 'Maa tu sabse achi hai' message and dried flowers — a Mother's Day art workshop creation by Kraftykinni Delhi NCR",
      },
      {
        heading: "How to Book a Mother's Day Workshop",
        body: `Kraftykinni runs workshops across Delhi, Gurgaon, and Noida. For Mother's Day sessions, private group bookings are available for 15 to 100+ participants at a venue of your choice — home, community hall, club, or office.\n\nPricing starts at ₹600 per person with all materials included. For groups of 30+, custom motifs (Maa, MOM, floral initials) can be incorporated into the Lippan Art or Bottle Art design.\n\nAll sessions are facilitated by [Shramita Govil, Fevicryl Certified Artist](/about), with trained assistants for larger groups. Session duration: 1.5 to 2.5 hours depending on activity.\n\nTo book or enquire, WhatsApp +91 9599622210 with your event date, number of participants, and preferred activity. Shramita confirms availability within 24 hours. For online bookings across India, materials are shipped to participants before the session.`,
      },
    ],
    faq: [
      {
        q: "What art workshops does Kraftykinni offer for Mother's Day?",
        a: "Kraftykinni's most popular Mother's Day workshops are Lippan Art (Kutch mirror work clay plaques), Bottle Lamp Art (painted glass bottles as vases or fairy-light lamps), and Clay Art (handmade sculpted keepsakes). All sessions are guided by Shramita Govil, Fevicryl Certified Artist, and include all materials from ₹600 per person.",
      },
      {
        q: "Can I book a private Mother's Day art workshop for a kitty party or family group?",
        a: "Yes. Kraftykinni runs private sessions for groups of 15 to 100+ participants at a venue of your choice — home, community hall, club, or residential complex. Minimum group size is 15 for a private booking. WhatsApp +91 9599622210 with your date, location, group size, and preferred activity.",
      },
      {
        q: "How long does a Mother's Day art workshop session take?",
        a: "Sessions run 1.5 to 2.5 hours depending on the activity and group size. Lippan Art takes 2–2.5 hours; Bottle Lamp Art and Clay Art run 1.5–2 hours. All participants complete a finished piece before the session ends — there is no drying wait required.",
      },
      {
        q: "Is prior art experience needed for these workshops?",
        a: "No prior art experience is needed for any Kraftykinni workshop. Every session is fully guided by Shramita Govil, with step-by-step instruction for each stage. Participants of all skill levels — including those who say they 'can't draw' — consistently complete impressive, display-worthy pieces.",
      },
      {
        q: "What is the cost of a Mother's Day art workshop in Delhi NCR?",
        a: "Pricing starts at ₹600 per person with all materials included — paints, clay, Lippan mirrors, brushes, aprons, and workspace covers. For private groups of 30+ people with custom motifs (Maa, MOM, floral initials), Shramita can confirm pricing on enquiry via WhatsApp +91 9599622210.",
      },
      {
        q: "Does Kraftykinni offer online art workshops for Mother's Day?",
        a: "Yes. Kraftykinni ships art kits pan-India before the session and runs a live guided workshop over video call. This is ideal for families where children are in a different city from their mother, or for corporate teams celebrating Mother's Day remotely. Contact via WhatsApp +91 9599622210 for kit shipping timelines.",
      },
    ],
  },

  // ─── Cars24 Corporate Clay Trinket Workshop ───────────────────────────────
  {
    slug: 'clay-trinket-painting-workshop-cars24-gurgaon',
    title: 'Clay Trinket Painting Workshop at Cars24 Gurgaon — 40 Participants, One Relaxing Afternoon',
    metaTitle: 'Clay Trinket Workshop — Cars24 Gurgaon | Kraftykinni',
    metaDescription:
      '40 Cars24 employees made hand-painted clay trinkets using Fevicryl Mouldit at their Gurgaon office. A relaxed, creative corporate team session.',
    publishDate: '2026-04-29',
    category: 'Corporate',
    relatedWorkshop: 'clay-art',
    excerpt:
      '40 Cars24 employees in Gurgaon sat down with clay, brushes, and Fevicryl colours on 29 April. Two hours later, every single one of them walked out holding something they had made themselves. This is how a Clay Trinket Painting session works when it actually works.',
    keywords: [
      'corporate art workshop Gurgaon',
      'clay trinket painting workshop',
      'team building activity Gurgaon',
      'clay art workshop corporate',
      'Fevicryl Mouldit workshop Delhi NCR',
      'Cars24 team building',
    ],
    sections: [
      {
        body: `40 Cars24 employees in Gurgaon sat down with clay, brushes, and Fevicryl colours on 29 April. Two hours later, every single one of them walked out holding something they had made themselves — a small, hand-painted clay trinket. Heart-shaped ones, circular ones, abstract ones. Some with cherries. Some with strawberries. Some with geometric patterns that looked almost architectural.\n\nThis is what a [Clay Trinket Painting workshop](/workshops/clay-art) looks like when it lands well. The room starts quiet and a little uncertain. It ends with people comparing pieces, asking each other how they did the tiny dots, and reluctantly packing up because the session is over.`,
        image: 'https://cdn.kraftykinni.in/cars24-clay-trinket-workshop-kraftykinni-gurgaon.jpeg',
        imageAlt: 'Shramita Govil, Kraftykinni founder, at the Cars24 Gurgaon corporate office ahead of the Clay Trinket Painting workshop — 29 April 2026',
      },
      {
        heading: 'What Is Clay Trinket Painting?',
        body: `Clay Trinket Painting is a Kraftykinni workshop where participants shape and paint small decorative objects using **Fevicryl Mouldit** — a professional-grade air-dry modelling clay. Mouldit is different from craft store clay: it is smooth, easy to condition, and dries to a firm, fully paintable surface without any baking or kiln. Participants shape their trinket — a heart, a circle, a free-form dish — let it set slightly, then paint it with Fevicryl acrylic colours using fine brushes.\n\nThe result is a small, personal, handmade object that feels genuinely crafted. Not a kit. Not a colouring exercise. Something the participant shaped and painted themselves, start to finish, in a single session.`,
        image: 'https://cdn.kraftykinni.in/cars24-trinket-materials-fevicryl-setup.jpeg',
        imageAlt: 'Fevicryl acrylic colours, brushes and art supplies laid out for the Cars24 clay trinket painting corporate workshop by Kraftykinni in Gurgaon',
      },
      {
        heading: 'How the Session Ran',
        body: `Shramita arrived at the Cars24 office with all materials: Fevicryl Mouldit packs, acrylic colour sets, fine brushes, water cups, palette plates, and newspaper covers for the tables. Setup took under 20 minutes. Participants were seated in groups of four to five — a layout that encourages colour-sharing and conversation without feeling forced.\n\nShramita opened with a short demonstration: how to condition the clay, how to shape it without cracking the edges, how to create smooth surfaces before painting. Five minutes of technique. Then everyone got to work.\n\nWhat followed was two hours of focused, low-pressure creativity. The room found a quiet rhythm quickly — the kind of focused calm that is genuinely unusual in a corporate setting. Some participants painted detailed motifs: cherries, floral patterns, tiny animals. Others went abstract — bold colour-blocks, layered washes, minimal geometric lines. Nobody asked whether they were doing it right, because there was no wrong answer.`,
        image: 'https://cdn.kraftykinni.in/cars24-trinket-workshop-in-progress.jpeg',
        imageAlt: 'Shramita Govil guiding a Cars24 employee during the clay trinket painting workshop at the Gurgaon corporate office — Kraftykinni',
      },
      {
        heading: 'What 40 Corporate Participants Made',
        body: `Heart-shaped trinket dishes painted with floral and fruit motifs. Round coaster-style pieces with hand-lettered text. Abstract colour-block objects. Character illustrations on clay surfaces. One participant painted a tiny night sky on a circular piece that looked like a professional miniature.\n\nEvery single trinket was different, because every decision — the shape, the colour palette, the subject — was entirely the participant's own. That is the consistent outcome of Clay Trinket Painting: the same materials, the same guidance, forty completely distinct finished objects.`,
        image: 'https://cdn.kraftykinni.in/cars24-trinket-workshop-participants.jpeg',
        imageAlt: 'Cars24 employees in Gurgaon holding their finished hand-painted clay trinkets after the Kraftykinni workshop — 29 April 2026',
      },
      {
        heading: 'Why It Worked for a Corporate Team',
        body: `Corporate art workshops work because they lower social stakes in a room where social stakes are usually high. There is no scoreboard, no performance metric, no hierarchy. When a senior manager and a new joiner are both figuring out how to paint a strawberry on a clay heart, the usual professional distance shrinks. The shared technical challenge — and the shared mild confusion — levels the room naturally.\n\nCars24 ran this session mid-week, and participant feedback pointed to something specific: it was **relaxing in a way they did not expect a work activity to be**. The combination of working with clay — tactile, grounding, requiring full attention — and painting — focused, absorbing, immediately rewarding — produces a genuine decompression effect. Participants were making something real. That matters.`,
      },
      {
        heading: 'Book a Similar Workshop for Your Team',
        body: `Kraftykinni runs [Clay Trinket Painting workshops](/workshops/clay-art) for corporate groups across Delhi, Gurgaon, and Noida. All materials — Fevicryl Mouldit clay, acrylic colours, brushes, palette plates, table covers — are provided and included in the price. Shramita handles setup and cleanup. Your team needs tables, chairs, and two hours.\n\nGroups from 20 to 200+. Pricing from ₹600 per person, all materials included. To book or check availability, WhatsApp **+91 9599622210** or see our [corporate art workshops page](/corporate-art-workshops).`,
      },
    ],
    faq: [
      {
        q: 'What is Clay Trinket Painting and how does it work?',
        a: 'Clay Trinket Painting is a workshop where participants shape small decorative objects from Fevicryl Mouldit air-dry clay, then paint them with acrylic colours. The clay sets within minutes, is fully paintable, and requires no kiln or baking. Participants shape and paint their trinket in a single 1.5 to 2 hour session and take the finished piece home.',
      },
      {
        q: 'Is Clay Trinket Painting suitable for corporate teams with no art experience?',
        a: 'Yes — it is specifically designed for participants with no prior art background. The clay is easy to condition and shape, and the painting process is fully guided by Shramita Govil step by step. Every participant, regardless of experience, completes a finished trinket by the end of the session.',
      },
      {
        q: 'How many people can join a Clay Trinket Painting corporate workshop?',
        a: 'Kraftykinni accommodates groups from 20 to 200+ participants. The Cars24 Gurgaon session ran for 40 employees. For larger groups, additional facilitator support is arranged to ensure every participant gets individual guidance.',
      },
      {
        q: 'What does a Clay Trinket Painting workshop cost for a corporate group in Gurgaon?',
        a: 'Pricing starts at ₹600 per person for groups of 100+, ₹700 per person for 50–100, and ₹800 per person for groups of 20–50. All materials — Fevicryl Mouldit clay, acrylic colours, brushes, table covers, and palette plates — are included. Kraftykinni travels to your office or event venue.',
      },
      {
        q: 'Does Kraftykinni come to the corporate office for workshops in Gurgaon?',
        a: 'Yes — Kraftykinni conducts sessions at your office, event venue, or any accessible space in Gurgaon, Delhi, or Noida. All materials are transported and set up by Shramita. Your team only needs to provide tables and chairs. Setup and cleanup are included.',
      },
    ],
  },
  {
    slug: 'summer-art-workshop-for-schools-delhi-ncr',
    title: 'Summer Art Workshops for Schools in Delhi NCR — A Complete Planning Guide',
    metaTitle: 'Summer Art Workshops for Schools Delhi NCR | Kraftykinni',
    metaDescription:
      'Planning a summer art workshop for your school in Delhi NCR? Covers activities, age groups & sizes. Facilitator travels to you. ₹600/student.',
    publishDate: '2026-05-08',
    category: 'School & College',
    relatedWorkshop: 'canvas-pouch',
    excerpt:
      "Summer is the one window in the school calendar where there's room to try something outside the syllabus. No exam pressure, smaller groups, and students who actually want to be there — the conditions for a genuinely great workshop are perfect. Here's what schools in Delhi NCR are booking, what works by age group, and how to plan one well.",
    keywords: [
      'summer workshop for schools Delhi NCR',
      'summer art workshop school Delhi',
      'summer camp art activity school Gurgaon',
      'art and craft summer workshop school Noida',
      'school summer holiday workshop Delhi NCR',
      'summer art activity ideas for students',
    ],
    sections: [
      {
        body: `Summer is the one window in the school calendar where there's room to try something outside the syllabus. No exam pressure, smaller groups, and students who actually want to be there — the conditions for a genuinely great workshop are perfect.\n\nOver the past two years, Kraftykinni has run summer art workshops at schools across Delhi, Gurgaon, and Noida — from single half-day sessions for 30 students to multi-day programmes for 300+ across different grade batches. This guide is built from that experience: what works by age group, which activities produce the best student outcomes, and how to plan a summer workshop that students and teachers both remember.`,
        image: 'https://cdn.kraftykinni.in/summer-school-workshop-students-cambridge-delhi-ncr.webp',
        imageAlt: 'Students at a Kraftykinni summer art workshop at a Delhi NCR school, holding up their finished photo frame artworks in the school auditorium.',
      },
      {
        heading: 'Why a summer workshop is different from a regular school art session',
        body: `The best school art workshops happen when students are not being assessed. The moment a grade is attached to creative work, something tightens — students start optimising for the teacher's approval rather than making genuine decisions about colour, form, and design.\n\nSummer workshops remove that pressure entirely. Students attend because they want to, and the facilitator is an external artist rather than the class teacher. Both of these conditions change the energy in the room significantly. You get risk-taking, experimentation, and real creative conversation between students who might barely interact during regular school hours.\n\nThis is also why summer workshops tend to produce better finished work than regular art periods. Students who claim to have no artistic ability consistently surprise themselves when the only measure of success is their own satisfaction with the piece.`,
      },
      {
        heading: 'The activities that work best for school summer workshops',
        body: `Not all art activities suit a summer school context. The best ones share three qualities: they produce a finished, display-worthy result within the session time; they are scalable to batches of 30 to 100 students; and they have a low barrier to entry — no student should feel unable to participate.\n\nHere are the activities Kraftykinni runs most frequently in summer school programmes, with an honest assessment of what works and for whom.`,
      },
      {
        heading: 'Photo Frame Craft — the standout summer activity for schools',
        body: `Photo frame making has become one of the most requested summer activities for schools in Delhi NCR, and it is easy to understand why. Every student works with a set of craft materials — popsicle sticks, acrylic colours, Fevicryl clay, mirrors, and decorative elements — to build and personalise a photo frame they can place their own photograph in.\n\nThe process takes 75 to 90 minutes for most grade groups. Students decorate the frame base with paint, add clay accents spelling their name or a favourite word, and finish with mirror or jewel embellishments. The result is functional, personal, and immediately meaningful — students see their own name on something they made with their hands.\n\nWhat makes it particularly effective for summer school settings: the activity is self-contained and requires no prior experience. Students who are not strong at drawing still produce excellent frames. The photograph element adds a layer of personalisation that makes the workshop feel special rather than generic. Every student takes home something they genuinely want to keep.`,
        image: 'https://cdn.kraftykinni.in/summer-school-workshop-photo-frame-craft-girl.webp',
        imageAlt: 'A student at a school summer art workshop in Delhi NCR proudly showing her completed personalised photo frame, decorated with craft clay and popsicle sticks.',
      },
      {
        heading: 'Lippan Art — the top pick for senior school groups (Classes 7–12)',
        body: `Lippan Art is rooted in the craft tradition of Kutch, Gujarat, where artisans traditionally press clay into geometric relief patterns and embed small mirrors to create striking wall panels. In a school workshop setting, students recreate this technique on a wooden board — building geometric designs from craft clay and embedding mirrors and decorative elements.\n\nFor senior school groups, Lippan Art consistently produces the strongest outcomes. The craft requires patience and precision, which engages older students differently from a painting task. The finished pieces look genuinely impressive — the mirror-work effect is dramatic and display-ready — which matters for students at an age where they are self-conscious about their creative work.\n\nLippan Art sessions also generate excellent content for school social media: a wall of 40 completed Lippan Art boards photographed together is visually striking in a way that a class painting session rarely is.`,
      },
      {
        heading: 'Mandala Art — the ideal activity for mixed-ability groups',
        body: `Mandala Art works well for summer school workshops because it democratises artistic ability. Students build concentric geometric patterns from the centre outward using dotting tools and acrylic paint — the radial symmetry of the mandala means that even a simple pattern looks complete and balanced.\n\nThe activity is genuinely meditative for students who engage with it. In a summer setting where the pressure is off, many students find that 90 minutes of Mandala Art is one of the quietest and most focused experiences they have had in a school environment. Teachers frequently comment that they see students who are usually restless become completely absorbed.\n\nRecommended for: Classes 5 onwards. Works well as an end-of-day or afternoon session when students' energy is lower.`,
      },
      {
        heading: 'Bottle Lamp Art — the high-impact activity for school events',
        body: `Bottle Lamp Art is the right choice when the school wants a summer workshop that also functions as an environmental awareness programme. Students decorate glass bottles using Fevicryl Mouldit clay, acrylic colours, and mirror embellishments, transforming them into decorative lamps. The upcycling narrative — waste glass into functional art — gives teachers a curriculum connection point.\n\nThe finished bottle lamps are among the most display-worthy pieces that come out of school workshops. Schools that have run Bottle Lamp Art sessions have displayed completed pieces in their corridors and entry foyers. At Jaypee Public School in Noida, 150+ students completed Bottle Lamp Art pieces in a single afternoon session — the display was up for weeks after the event.\n\nRecommended for: Classes 6 and above. Best suited to half-day or full-day summer programmes where the setup can include a drying/display area.',`,
        image: 'https://cdn.kraftykinni.in/summer-school-workshop-circle-session-students.webp',
        imageAlt: 'Students seated in a circle during a hands-on art and craft workshop at a school in Delhi NCR, working on their summer workshop projects together.',
      },
      {
        heading: 'Tie & Dye — the activity that works for any age',
        body: `If the summer programme includes primary school students (Class 3 and below), Tie & Dye is the most reliable choice. The technique — folding, binding, and dipping fabric to create unpredictable colour patterns — has essentially no learning curve and produces dramatic, visually exciting results that younger students find genuinely thrilling.\n\nThe moment of reveal, when students untie their fabric and see what they have created, is one of the most reliably joyful moments in a school workshop context. No two pieces ever look the same, which means every student gets a unique result and there is no comparison anxiety.\n\nFor schools running a multi-grade summer programme, Tie & Dye is often used as a common activity that can run across Class 3 through Class 8 batches without needing significant adaptation. Older students engage with more complex folding patterns; younger students succeed with simpler techniques.`,
      },
      {
        heading: 'How to plan a summer workshop well — advice from experience',
        body: `**Batch size matters more than total student count.** A workshop for 200 students is straightforward if it runs in four batches of 50. The same 200 students in a single session are more difficult to manage well. When you enquire, share your total count and we will recommend a batching structure.\n\n**Book early for May–June dates.** Summer is now Kraftykinni's busiest school period. May and early June dates book up by mid-March. If your school calendar is set, send an enquiry as soon as the date is confirmed — even a provisional enquiry holds your spot while logistics are worked out.\n\n**A large hall or open classroom works best.** You do not need a dedicated art room. Any large, well-ventilated space with tables and chairs is suitable. We bring waterproof table covers, aprons, all materials, and cleanup supplies. You need to provide the space, seating, and — if using photographs for a frame activity — prints in advance.\n\n**Students take home their work.** This is not negotiable from Kraftykinni's side — every student should leave with their finished piece. The takeaway is part of what makes a workshop memorable. If display is also needed, a short display period before dispersal can be arranged.`,
        image: 'https://cdn.kraftykinni.in/summer-school-workshop-photo-frame-students.webp',
        imageAlt: 'Three students proudly displaying their colourful handmade photo frames completed during a summer art workshop at their school in Delhi NCR.',
      },
      {
        heading: 'What schools across Delhi NCR are booking in summer 2026',
        body: `Based on enquiries and bookings so far in 2026, the most popular formats for school summer workshops in Delhi NCR are:\n\n**Single half-day session (3 hours, one batch of 40–80 students):** The most common format for schools doing a summer camp day or end-of-term celebration. Activities: Photo Frame Craft, Mandala Art, or Tote Bag Painting.\n\n**Multi-batch full day (6 hours, two or three grade-group batches):** Used by schools running formal summer programmes across multiple days. Different activities for different grade groups are recommended — simpler crafts for primary, detailed heritage art forms like Lippan Art for senior school.\n\n**Summer camp integration (one art session within a broader programme):** Several schools in Delhi NCR now run 2–4 week summer camps where Kraftykinni provides one or two art workshop days within a broader schedule of activities including sports, music, and STEM. These sessions typically run for 90 minutes per batch.\n\nAll sessions are priced at ₹600 to ₹800 per student, with all materials, setup, facilitation, and cleanup included. The facilitator — Shramita Govil, Fevicryl Certified Artist — travels to your school anywhere in Delhi NCR.`,
      },
      {
        heading: 'Book a summer workshop for your school',
        body: `Kraftykinni runs summer art workshops for schools across Delhi, Gurgaon, and Noida. All materials are included. Shramita travels to your school with everything needed — paints, clay, brushes, table covers, aprons — and handles setup and cleanup around the session.\n\nGroups from 30 students to full school batches of 300+. Starting at ₹600 per student, all materials included. Fevicryl-certified facilitation. [See our school workshop page](/school-art-workshops) for more detail, or get in touch directly via WhatsApp at +91 9599622210 to discuss your date, batch size, and preferred activity.`,
      },
    ],
    faq: [
      {
        q: 'What is the best summer art activity for school students in Delhi NCR?',
        a: 'For primary school students (Class 3–5), Tie & Dye and Photo Frame Craft work best — they are accessible, exciting, and produce a strong personalised takeaway. For middle and senior school students (Class 6–12), Lippan Art and Mandala Art consistently produce the most impressive finished pieces and the most engaged student groups. Kraftykinni can advise on the best activity based on your grade group, batch size, and session duration.',
      },
      {
        q: 'How much does a summer art workshop for a school cost in Delhi NCR?',
        a: 'Kraftykinni charges ₹600 to ₹800 per student for school summer workshops, with all materials included. Smaller batches of 30–50 students are priced at ₹800 per student; batches of 50–100 at ₹700 per student; batches above 100 at ₹600 per student. There are no additional venue or logistics charges — the facilitator travels to your school with all materials.',
      },
      {
        q: 'Can Kraftykinni conduct a summer workshop at our school premises?',
        a: 'Yes. Kraftykinni conducts all school workshops on your premises — in your school hall, auditorium, or large classroom. All materials, table covers, aprons, and cleanup supplies are transported and managed by the facilitator. You only need to provide tables, chairs, and the space.',
      },
      {
        q: 'How far in advance should we book a summer school workshop?',
        a: 'May and early June are the busiest months for school summer workshops in Delhi NCR. For dates in this period, booking 4–6 weeks in advance is strongly recommended. Once you have a confirmed date on your school calendar, contact Kraftykinni via WhatsApp at +91 9599622210 to check availability — even a provisional enquiry holds the date while logistics are confirmed.',
      },
      {
        q: 'What grade levels are suitable for a school summer art workshop?',
        a: 'Kraftykinni runs workshops for students from Class 3 through Class 12 and college groups. Activity recommendations are tailored by age: Tie & Dye and Photo Frame Craft work well for Class 3–6; Mandala Art and Block Printing for Class 6–9; Lippan Art and Bottle Lamp Art for Class 9 and above. Mixed-grade sessions can be accommodated with a shared activity, or different activities can be run for different grade batches in the same day.',
      },
      {
        q: 'Can a summer art workshop be integrated into an existing school summer camp programme?',
        a: 'Yes — many schools in Delhi NCR use Kraftykinni for one or two art sessions within a broader summer camp timetable. Sessions run for 90 minutes per batch. If your summer camp runs across multiple days, different activities can be offered on different days to give students variety. All logistics are handled by Kraftykinni around your existing programme schedule.',
      },
    ],
  },
  {
    slug: 'fathers-day-gift-ideas-art-workshop-delhi-ncr-2026',
    title: "Father's Day Gift Ideas 2026 — Handmade Art Workshops in Delhi NCR",
    metaTitle: 'Father\'s Day Art Workshop Gift Ideas 2026 | Kraftykinni',
    metaDescription:
      'Handmade Father\'s Day gift workshops in Delhi NCR — Clay Magnet, Bottle Art & Clay Trinket. Guided sessions from ₹600/person, all materials included.',
    publishDate: '2026-05-18',
    category: 'Private Events' as const,
    relatedWorkshop: 'wall-rope-art',
    excerpt:
      "A tie he won't wear. A mug with \"World's Best Dad\" he already has three of. This Father's Day, gift something handmade — a Fevicryl Mouldit Clay Fridge Magnet, Father's Day Special Bottle Art, Clay Bottle Art, or a handmade Clay Trinket created in a guided art workshop experience in Delhi NCR.",
    keywords: [
      "father's day gift ideas Delhi NCR",
      "father's day art workshop Delhi",
      "unique father's day gift Delhi 2026",
      "handmade gift for dad Delhi NCR",
      "father's day craft workshop Gurgaon",
      "father's day experience gift Delhi",
      "baap baap hota hai gift",
      "father's day bottle art workshop",
    ],
    sections: [
      {
        body: `A tie he won't wear. A grooming kit he has three of. A "World's Best Dad" mug that joins the other two in the back of the cupboard.\n\nFather's Day is 15 June 2026. And if you're reading this, you've probably already ruled out the obvious options. What's harder to find is something that actually means something — something made, something specific, something he didn't see coming.\n\nKraftykinni workshops solve this in two ways. You can create a handmade gift for him — a Fevicryl Mouldit Clay Fridge Magnet, Father's Day Special Bottle Art piece, Clay Bottle Art décor, or a handmade Clay Trinket — in a guided session. Or you can gift him the experience itself: a shared afternoon where Dad gets to make something with his own hands, possibly for the first time in his adult life. Both formats work. Both produce something he'll keep.\n\nHere's what works, and how to book it.`,
        image: 'https://cdn.kraftykinni.in/fathers-day-worlds-best-dad-rock-art-flowers-kraftykinni.webp',
        imageAlt:
          "Handmade Father's Day rock art piece painted bright blue with a globe motif reading 'DAD', yellow flowers, gold glitter hearts, and a 'World's Best' sign — Kraftykinni Delhi NCR",
      },
      {
        heading: "Why a Handmade Gift Lands Differently on Father's Day",
        body: `Most Father's Day gifts are purchases. Something selected, ordered, delivered, gifted. Perfectly fine — and perfectly forgettable inside two weeks.\n\nA handmade gift carries something different: the visible fact that someone spent time and attention making it. The imperfection is part of the message. When the clay lines aren't perfectly uniform, when the paint has a slight texture, when the bottle figurine looks roughly like Dad but not quite — that's not a flaw, that's evidence of the hand that made it.\n\nKraftykinni sessions produce exactly this kind of object. They're not craft kits where you assemble pre-cut pieces. You shape the clay, apply the Mouldit, mix the colours, and make the decisions. The result is yours — and when you give it to your father, he knows it too.\n\nFor [private group sessions](/private-art-workshops) — a family Father's Day afternoon, a group of siblings making gifts together, or a residential society event — Kraftykinni runs bookings from 10 participants.`,
      },
      {
        heading: "Best Kraftykinni Workshops for Father's Day Gifts",
        body: `Four activities in particular produce the strongest Father's Day results — each for different reasons and different creative abilities.`,
      },
      {
        heading: '1. Fevicryl Mouldit Clay Fridge Magnet — a handmade keepsake Dad will actually keep',
        body: `Fevicryl Mouldit Clay Fridge Magnet is one of Kraftykinni's most loved handmade gifting workshops for Father's Day. Participants use Fevicryl Mouldit clay and acrylic colours to create customised fridge magnets with personalised Father's Day themes and messages.The Father's Day angle: create a handmade magnet featuring "Dad", hearts, flowers, messages, or customised decorative elements that reflect your father's personality and your bond with him.This workshop is beginner-friendly, relaxing, and highly personalised — making it perfect for children, adults, families, and private groups looking for a meaningful handmade Father's Day gift.Duration: 60 to 90 minutes. Works well for personal sessions and private groups of 15–60 participants.`,
        image: 'https://cdn.kraftykinni.in/fathers-day-bottle-art-baap-baap-hota-hai-gift-kraftykinni.webp',
        imageAlt:
          "Hand-painted Tuborg bottle with 'Baap, Baap Hota Hai' text in black on yellow — a Kraftykinni Father's Day Bottle Art gift from Delhi NCR",
      },
      {
        heading: "2. Father's Day Special Bottle Art — creative handmade bottle décor for Dad",
        body: `Father's Day Special Bottle Art transforms ordinary bottles into beautiful handmade art pieces using paints, textures, and decorative detailing. Participants paint and customise bottles with Father's Day themes, messages, and personalised creative designs.The result feels artistic, personal, and completely different from a store-bought gift. Every participant creates their own unique design, making each bottle a one-of-a-kind Father's Day keepsake.This workshop works especially well for beginners because Shramita demonstrates every step — from painting and colour blending to final decorative detailing.For adults, teenagers, and families looking for a creative Father's Day activity, this is one of the most engaging workshop formats.`,
        image: 'https://cdn.kraftykinni.in/fathers-day-bottle-art-dad-figurine-pink-shirt-kraftykinni.webp',
        imageAlt:
          "Hand-painted bottle figurine of a Dad character in pink polka-dot shirt with moustache and 'Father Day' clay tag — Kraftykinni Father's Day workshop gift",
      },
      {
        heading: "3. Clay Bottle Art — artistic handmade bottle decoration workshop",
        body: `Clay Bottle Art combines bottle decoration with creative clay detailing techniques to produce aesthetic handmade décor pieces. Participants work with clay textures, acrylic colours, and artistic embellishments to transform simple bottles into personalised Father's Day creations.The finished artwork looks elegant, handmade, and display-worthy — perfect for desks, shelves, or home décor gifting.This workshop is ideal for beginners, art lovers, schools, corporates, and private groups looking for a relaxing and creative Father's Day activity experience.Duration: 1.5 to 2 hours with all materials included.`,
        image: 'https://cdn.kraftykinni.in/fathers-day-dad-plaque-clay-art-blue-heart-kraftykinni.webp',
        imageAlt:
          "Handmade clay art Father's Day plaque in midnight blue with 'DAD' text and pink heart, on a small wooden easel — Kraftykinni workshop gift Delhi NCR",
      },
      {
        heading: "4. Clay Trinket — a small handmade Father's Day keepsake",
        body: `Clay Trinket workshops focus on creating small handmade decorative keepsakes specially designed for Father's Day gifting. Participants learn simple clay crafting techniques to create personalised trinkets using textures, colours, and creative decorative elements.The handmade nature of the activity makes every piece unique and meaningful. These trinkets work beautifully as shelf décor, desk keepsakes, or thoughtful personalised gifts for Dad.This format works especially well for children, beginners, school workshops, and family-friendly Father's Day events because the process is simple, fun, and creatively satisfying.`
      },
      {
        heading: "How to Book a Father's Day Workshop in Delhi NCR",
        body: `Kraftykinni runs private Father's Day workshop sessions for groups of 10 to 100+ participants across Delhi, Gurgaon, and Noida. Sessions come to you — at home, at a residential club, at an office, or at any hired venue. All materials are brought and set up by the facilitator.\n\n**For families and friend groups:** A private session for 10–25 participants is the most popular format. Everyone makes their own gift for Dad in the same afternoon — different designs, different personal details. Duration: 1.5 to 2.5 hours.\n\n**For residential societies:** Several housing complexes in Gurgaon and Noida run Father's Day events for their community. Kraftykinni can accommodate 30 to 100+ participants in a clubhouse or open courtyard setting.\n\n**For corporate offices:** Father's Day falls on a Sunday, but the week before (9–13 June) is popular for office gift-making sessions where employees create something to take home to their father. [Corporate workshop details here](/corporate-art-workshops).\n\n**Pricing:** Starting at ₹600 per person with all materials included — clay, paints, brushes, workspace covers, and a take-home finished piece. Custom motifs ("Papa", "Baba", "Dad" in various scripts) can be incorporated into Lippan Art and Clay formats for groups of 20+.\n\nAll sessions are led by Shramita Govil, Fevicryl Certified Artist. [Read more about Shramita and her work here](/about).\n\nTo book or check availability, WhatsApp **+91 9599622210** with your date, group size, location, and preferred activity. Confirmation within 24 hours. Minimum 7 days notice required; 2–3 weeks is recommended for June dates.`,
      },
    ],
    faq: [
      {
        q: "What are the best handmade Father's Day gift ideas from an art workshop in Delhi NCR?",
        a: "The most popular handmade Father's Day gifts from Kraftykinni workshops are Fevicryl Mouldit Clay Fridge Magnets, Father's Day Special Bottle Art pieces, Clay Bottle Art décor, and handmade Clay Trinkets.. All can be made in a single guided session of 90 minutes to 2 hours, with all materials included from ₹600 per person.",
      },
      {
        q: "Can I book a private Father's Day art workshop for a family group in Delhi NCR?",
        a: "Yes. Kraftykinni runs private sessions for groups from 10 to 100+ participants at your home, club, residential society, or any venue in Delhi, Gurgaon, or Noida. All materials are brought to you. WhatsApp +91 9599622210 with your date, group size, and preferred activity. Minimum 7 days notice required; 2–3 weeks recommended for June dates.",
      },
      {
        q: "When is Father's Day 2026 in India?",
        a: "Father's Day 2026 in India falls on Sunday, 15 June 2026 — the third Sunday of June. For workshop sessions before Father's Day, Kraftykinni is available throughout June. For gift-making sessions in the week before (9–13 June), early booking is strongly recommended as June dates fill up quickly.",
      },
      {
        q: "Is an art workshop suitable as a Father's Day activity for Dad himself?",
        a: "Yes — and it is often more memorable than a gift. A guided art session gives Dad something to do with his hands, a finished object to take home, and an afternoon completely different from his usual routine. Clay Art and Bottle Art are particularly popular for men who have never tried an art session before — the step-by-step format means no prior experience is needed, and the results are consistently impressive.",
      },
      {
        q: "How much does a Father's Day art workshop cost in Delhi NCR?",
        a: "Kraftykinni charges ₹600 to ₹800 per person, with all materials included. Smaller private groups of 10–30 are priced at ₹800 per person; groups of 30–80 at ₹700; groups of 80+ at ₹600. Setup, facilitation, and cleanup are included. There are no hidden venue or logistics charges — the facilitator travels to you.",
      },
      {
        q: "Can children participate in a Father's Day art workshop to make a gift for their dad?",
        a: "Yes. Kraftykinni workshops are designed for all skill levels and ages. Children from age 8 upward can participate in Clay Art, Bottle Art, and Rock Art sessions. Shramita adapts the guidance for younger participants, ensuring every child completes a finished piece they are proud to give. Private family sessions for mixed adult-and-child groups are regularly run.",
      },
    ],
  },
  {
    slug: 'block-printing-workshop-delhi-israeli-family',
    title: 'A Block Printing Workshop in Delhi, for a Mother and Daughter Visiting from Israel',
    metaTitle: 'Block Printing Workshop Delhi: Israel to India | Kraftykinni',
    metaDescription:
      'A private block printing workshop in Delhi for a mother-daughter duo from Israel: the craft, the story and the fabric they took home. Book with us.',
    publishDate: '2026-07-19',
    category: 'Private Events' as const,
    relatedWorkshop: 'block-printing',
    excerpt:
      'A mother and daughter travelling through India reached out to Kraftykinni for a private lesson in traditional block printing — set up right in their hotel room. Here is how the afternoon actually went, paint spill included.',
    keywords: [
      'block printing workshop Delhi',
      'private art workshop Delhi NCR',
      'block printing history India',
      'traditional Indian block printing workshop',
      'art workshop for tourists Delhi',
      'hand block printing class Delhi',
      'private workshop at hotel Delhi',
    ],
    sections: [
      {
        body: `Most Kraftykinni sessions are booked for a birthday, a school event, or a corporate offsite. This one was different. A mother and daughter, visiting India from Israel, reached out specifically to learn the traditional art of Indian block printing — and asked if we could teach them privately, in their hotel room, before they flew home.\n\nWe said yes. A few days later, we were sitting on the floor of their room surrounded by carved wooden blocks, small pots of colour, and a long spread of plain white fabric — about to spend an afternoon turning it into something they'd carry back with them.`,
        image: 'https://cdn.kraftykinni.in/block-printing-israel-to-india-finished-fabric-kraftykinni.webp',
        imageAlt:
          'Mother and daughter from Israel holding up a finished hand block printed fabric with green leaf and pink flower motifs — Kraftykinni Delhi NCR',
      },
      {
        heading: 'A Workshop Built Around Two People, Not Twenty',
        body: `Kraftykinni sessions usually run for groups of 20, 50, sometimes 200. This one was for two — a mother and her daughter, sitting cross-legged on the floor of a hotel room with a stamp in hand and a long roll of fabric spread out in front of them.\n\nThat scale changes the session completely. There's no rotation between tables, no managing forty people's attention at once. Just two learners, one facilitator, and the time to actually explain why a block needs to be pressed straight down rather than dragged, and why the ink pad matters as much as the block itself.\n\nThis kind of one-on-one or small private session sits alongside Kraftykinni's usual [private art workshops](/private-art-workshops) — the same craft, the same materials, just scaled down to fit a family, a couple, or a small group of friends rather than an event.`,
        image: 'https://cdn.kraftykinni.in/block-printing-israel-mother-daughter-learning-kraftykinni.webp',
        imageAlt:
          'Facilitator guiding a young learner through hand block printing technique on white fabric during a private workshop — Kraftykinni Delhi NCR',
      },
      {
        heading: 'What Block Printing Actually Is',
        body: `Block printing is one of India's oldest textile traditions, practised for centuries across Rajasthan and Gujarat — Bagru and Sanganer near Jaipur, and the Ajrakh work of Kutch, among others. Each pattern is carved by hand into a block of wood, usually teak or sheesham, with a separate block cut for every colour in the design.\n\nThe technique itself is simple to describe and genuinely difficult to do well. The block is pressed onto a pad loaded with fabric-safe colour, then stamped onto the cloth with even, direct pressure — no rocking, no dragging. The real skill is in repetition: keeping the spacing consistent, lining up each new stamp against the last one, and building a pattern that reads as seamless once the whole length of fabric is done.\n\nWe cover this technique in detail — the loading, the pressure, the spacing — as part of Kraftykinni's regular [block printing workshop](/workshops/block-printing), which we also run for schools, corporate teams, and private groups across Delhi, Gurgaon, and Noida.`,
        image: 'https://cdn.kraftykinni.in/block-printing-wooden-blocks-tools-flatlay-kraftykinni.webp',
        imageAlt:
          'Hand-carved wooden block printing stamps, paintbrushes, and colour pots laid out for a Kraftykinni workshop — Delhi NCR',
      },
      {
        heading: 'The Paint Drop That Almost Ruined a Hotel Bedsheet',
        body: `They were doing so well — steady pressure, even spacing, a pattern that was genuinely coming together — until a single bright drop of paint landed right on the hotel's white bedsheet.\n\nFor a second, everyone froze. Then came the shared panic of "what is the hotel staff going to think?" We scrubbed, blotted, and worked at it until there was no trace left. The stress turned into a proper laughing fit almost immediately after, and it set the tone for the rest of the session — focused work, interrupted by moments that were genuinely funny.\n\nIt's a small thing, but it's the kind of moment that tends to stick. Not the finished fabric on its own, but the panic-then-laughter that happened while making it.`,
      },
      {
        heading: 'A Fabric Piece Worth Carrying Home to Israel',
        body: `By the end of the afternoon, the plain white fabric was covered — leaf motifs, small flowers, a full repeating pattern built stamp by stamp across the entire length. It wasn't just a finished craft project. It was proof of an afternoon spent learning a technique that neither of them had tried before, made with their own hands, in a country they were visiting for the first time.\n\nSharing a piece of Indian craft heritage with someone from across the world is genuinely one of the more rewarding parts of running Kraftykinni. It's the same block printing tradition we teach at schools and corporate offsites in Delhi NCR every week — but watching it travel back to Israel in someone's suitcase is a different kind of satisfying.`,
        image: 'https://cdn.kraftykinni.in/block-printing-group-stamping-fabric-kraftykinni.webp',
        imageAlt:
          'Private block printing workshop session with a mother, daughter, and facilitator stamping a long length of patterned fabric together — Kraftykinni Delhi NCR',
      },
      {
        heading: 'Why Private Sessions Work Well for Visitors to India',
        body: `Most people visiting India for a short trip don't have room in their schedule for a full workshop booking built around a large group. A private session solves that — it fits around a travel itinerary rather than the other way round, and it can run wherever the guest already is: a hotel room, a serviced apartment, or a private residence.\n\nIt also works well for anyone who wants a genuinely hands-on introduction to an Indian craft rather than a shopping-trip version of it — families on holiday, small friend groups, or a parent and child looking for something to do together that isn't a monument or a market. [Private art workshops](/private-art-workshops) at Kraftykinni are built around exactly this kind of request.`,
      },
      {
        heading: 'Book a Private Block Printing Workshop in Delhi NCR',
        body: `Kraftykinni runs private block printing sessions across Delhi, Gurgaon, and Noida — for families, small groups, and larger private events alike. Larger private group bookings (10+ participants) start at ₹600–₹800 per person, all materials included. For a smaller or custom session — a hotel room, a couple, a parent and child — WhatsApp us directly with your dates and group size and we'll work out a session that fits.\n\nAll sessions are led by Shramita Govil, Fevicryl Certified Artist. [Read more about Shramita and her work here](/about).\n\nTo book or check availability, WhatsApp **+91 9599622210** with your dates, location, and group size. Minimum 7 days' notice is recommended, more if your travel dates are fixed and flexibility is limited.`,
      },
    ],
    faq: [
      {
        q: 'Can tourists visiting Delhi book a private block printing workshop?',
        a: "Yes. Kraftykinni runs private block printing sessions for visitors to Delhi NCR, including at hotels and private residences. Sessions can be scheduled around a travel itinerary — WhatsApp +91 9599622210 with your dates, location, and group size to check availability.",
      },
      {
        q: 'What is block printing and where does it come from in India?',
        a: 'Block printing is a centuries-old Indian textile craft in which hand-carved wooden blocks — usually teak or sheesham — are used to stamp patterns onto fabric, with a separate block for each colour. The tradition is strongly associated with Bagru and Sanganer near Jaipur in Rajasthan, and with Ajrakh printing from Kutch in Gujarat.',
      },
      {
        q: 'Can Kraftykinni host a workshop inside a hotel room or private residence?',
        a: "Yes. Kraftykinni brings all materials — blocks, colours, fabric, and workspace protection — to the guest's location, whether that's a hotel room, a serviced apartment, or a private home. This format works particularly well for short-stay visitors and small private groups.",
      },
      {
        q: 'How long does a private block printing session take?',
        a: 'A private block printing session typically runs 1.5 to 2.5 hours, depending on group size and how much of the fabric is printed. This includes an introduction to the technique, guided practice, and time to complete a full patterned piece.',
      },
      {
        q: 'How much does a private block printing workshop cost in Delhi NCR?',
        a: 'Larger private group bookings (10+ participants) start at ₹600–₹800 per person, all materials included. For smaller or custom sessions — such as a family or a couple booking at a hotel — WhatsApp +91 9599622210 with your group size and dates for a quote.',
      },
    ],
  },
  {
    slug: 'world-environment-day-upcycled-bottle-art-workshop-delhi-ncr',
    title: 'World Environment Day 2026 — How Upcycled Bottle Art Makes Sustainability Hands-On',
    metaTitle: 'World Environment Day 2026 Bottle Art | Kraftykinni',
    metaDescription:
      'Celebrate World Environment Day 2026 with upcycled bottle art. Turn old bottles into mandala planters and décor. Workshops across Delhi NCR.',
    publishDate: '2026-05-30',
    category: 'Workshop Guides' as const,
    relatedWorkshop: 'bottle-lamp-art',
    excerpt:
      "World Environment Day falls on 5 June every year — and this year, instead of a pledge or a social post, we want to show you what sustainability looks like when you put paint, clay, and a discarded bottle in front of a group of people.",
    keywords: [
      'world environment day 2026 activity',
      'upcycled bottle art workshop Delhi NCR',
      'eco-friendly craft workshop Delhi',
      'sustainability art workshop Delhi',
      'upcycle old bottles craft ideas',
      'environment day activity for schools Delhi',
      'bottle painting workshop Delhi NCR',
      'green craft workshop Gurgaon Noida',
    ],
    sections: [
      {
        body: `World Environment Day falls on 5 June every year — and for most people, it goes by as a scroll through green-tinted social posts and a mental note to do something more sustainable.\n\nWe'd like to suggest a different kind of celebration this year: one where you sit down with a discarded bottle, a brush, and some paint — and turn the thing you were about to throw away into something you actually want to keep.\n\nThat's the premise behind upcycled bottle art. And it turns out it's also one of the most effective ways to make the idea of sustainability concrete, tactile, and genuinely memorable — whether you're running it for a school, a corporate team, or a private gathering.`,
        image: 'https://cdn.kraftykinni.in/env-day-dot-mandala-upcycled-bottle-planters.webp',
        imageAlt: 'Four upcycled bottle planters with hand-painted dot mandala patterns in orange, blue, red and green on black — World Environment Day craft activity by Kraftykinni Delhi NCR',
      },
      {
        heading: 'Why Bottle Art Is the Right Activity for Environment Day',
        body: `Sustainability messaging is everywhere. What's rarer is a sustainability experience — something that produces a physical result from a material that would otherwise end up in landfill.\n\nBottle art does exactly that. The workshop starts with what most people would call waste: old glass bottles, empty jam jars, used plastic containers. By the end of 90 minutes, every participant has a decorated planter, a vase, or a home décor piece sitting in front of them. The material transformation is visible and immediate.\n\nThis is what makes bottle art workshops particularly powerful for Environment Day events. You're not asking people to remember a fact or sign up to a habit. You're giving them an object they made — from something they'd have discarded — and sending them home with it. That's a memory that reinforces the message better than any presentation could.\n\n**For schools:** The combination of craft + environmental lesson is a natural fit for an Environment Day assembly or special session. Students learn that "upcycling" isn't an abstract concept — it's a bottle, some Fevicryl colours, and forty-five minutes.\n\n**For corporate teams:** Bottle art sessions for Environment Day work particularly well as part of CSR or sustainability week programming. The activity is hands-on, inclusive, and produces a takeaway. Unlike a tree-planting exercise that requires outdoor logistics, bottle art runs easily indoors — at your office, at a conference venue, or at an off-site location.\n\n**For private groups:** A World Environment Day afternoon with friends, a housing society green event, or a family session where everyone upcycles a bottle together — all of these produce the same outcome: a room full of people who've made something from nothing.`,
      },
      {
        heading: 'What Upcycled Bottle Art Looks Like in Practice',
        body: `There's a common assumption that "eco-friendly craft" means rough or rustic. The pieces you see in these photos suggest otherwise.\n\nDot mandala bottle planters — small black-painted bottles with hand-dotted mandala patterns in jewel colours, topped with a pop of greenery — are one of Kraftykinni's most requested Environment Day formats. The technique is based on the same dot-mandala method used in Mandala Art workshops, applied to a three-dimensional surface. The result is striking enough to sit on a desk or windowsill permanently.`,
        image: 'https://cdn.kraftykinni.in/env-day-home-sweet-home-upcycled-bottle-art.webp',
        imageAlt: 'Three upcycled bottles painted with rainbow gradient and "HOME SWEET HOME" lettering, wrapped with jute twine and topped with dried yellow flowers — Kraftykinni upcycled bottle art workshop',
      },
      {
        heading: 'Message Bottles — Making Sustainability Personal',
        body: `Another format that works especially well for Environment Day is message bottle art — where participants paint a word or phrase directly onto the bottle surface. "Home Sweet Home." "Love." "Family." The message becomes part of the design.\n\nThis approach gives every participant's piece a personal dimension. The bottle is no longer just a decorated object — it's a statement. And because no two people paint the same way, no two bottles ever look identical. A room of thirty people making "Love" bottles produces thirty entirely different pieces.\n\nThe jute twine detailing and dried flower topping that you see in these pieces are finishing touches Kraftykinni adds to the workshop process — small details that move the result from craft project to something that could sit comfortably on a café shelf or a living room sideboard.`,
        image: 'https://cdn.kraftykinni.in/env-day-love-jar-upcycled-bottle-vases.webp',
        imageAlt: 'Four small upcycled glass jars painted in teal, yellow, pink, and green with LOVE lettering, wrapped in decorative twine and filled with white dried flowers — Kraftykinni Delhi NCR',
      },
      {
        heading: 'The Workshops Kraftykinni Runs for Environment Day',
        body: `Kraftykinni runs two primary workshop formats for World Environment Day:\n\n**Bottle Art Workshop** — Participants decorate upcycled bottles using Fevicryl acrylic colours, texture techniques, lettering, and decorative finishes including jute, twine, and dried elements. The session runs 90 minutes. Every participant takes their finished bottle home. Works for groups of 20 to 200+.\n\n**Dot Mandala Planter Workshop** — A more focused format where participants create mandala-patterned mini planters from small bottles or containers. The dot-mandala technique is guided step by step — no prior experience needed, and the results are consistently striking. Works well for school groups and corporate sessions of 30 to 150.\n\nBoth formats are available across Delhi, Gurgaon, and Noida — and can also be run online as a [pan-India workshop](/corporate-art-workshops) with material kits shipped to participants.\n\nAll materials — bottles, paints, brushes, jute, protective covers — are included in the per-person cost. You provide the space. We bring everything else.\n\nPricing starts at ₹600 per person, all materials included. [See our full workshop menu](/workshops/bottle-lamp-art) or [get in touch directly](/corporate-art-workshops) to discuss your Environment Day date and group size.`,
      },
      {
        heading: 'How to Book for World Environment Day 2026',
        body: `World Environment Day is 5 June 2026 — which means bookings are filling up now for the first week of June.\n\nKraftykinni recommends a minimum of 7 days advance notice for all workshop bookings. For June dates — particularly the 3rd, 4th, and 5th — **2 to 3 weeks notice is strongly recommended**.\n\nTo book or check availability: WhatsApp **+91 9599622210** with your date, location (Delhi / Gurgaon / Noida), group size, and preferred activity. We confirm within 24 hours.\n\nFor schools planning an Environment Day session, we can coordinate with your event team on timing, space layout, and student batch structure. [Read more about school art workshops here](/school-art-workshops).\n\nFor corporate teams running a sustainability week or CSR event, we offer group sizes from 20 to 200+ with full logistics support. [Read more about corporate workshops here](/corporate-art-workshops).`,
      },
    ],
    faq: [
      {
        q: 'What craft activity is best for World Environment Day for a school in Delhi NCR?',
        a: 'Upcycled bottle art and dot mandala planter workshops are the strongest options for Environment Day school events in Delhi NCR. Both formats use discarded bottles or containers as the creative material, which gives the session a direct sustainability message. Kraftykinni runs these sessions for school groups of 30 to 300 students across Delhi, Gurgaon, and Noida. All materials are included from ₹600 per student.',
      },
      {
        q: 'Can Kraftykinni run an Environment Day workshop at our corporate office in Delhi NCR?',
        a: 'Yes. Kraftykinni runs corporate bottle art and dot mandala workshops for Environment Day CSR events at offices across Delhi, Gurgaon, and Noida. The facilitator brings all materials — including the upcycled bottles — and handles setup and cleanup. Group sizes from 20 to 200+. Starting at ₹600 per person, all materials included. WhatsApp +91 9599622210 with your date and group size to check availability.',
      },
      {
        q: 'What is upcycled bottle art and how is it sustainable?',
        a: 'Upcycled bottle art transforms discarded glass or plastic bottles — materials that would otherwise end up in landfill — into decorated home décor, planters, or vases using paint, clay, and craft materials. The "upcycling" element is the starting material: the bottle you would throw away becomes the art piece you take home. This makes it a practical, hands-on demonstration of the reduce-reuse-recycle principle — which is why it works particularly well as a World Environment Day activity.',
      },
      {
        q: 'How much does a World Environment Day art workshop cost in Delhi NCR?',
        a: 'Kraftykinni Environment Day workshops start at ₹600 per person for groups of 100+, ₹700 per person for groups of 50–100, and ₹800 per person for groups of 20–50. All materials are included — bottles, paints, brushes, jute, and workspace protection. There are no additional venue or logistics charges. The facilitator travels to your location.',
      },
      {
        q: 'Can an Environment Day bottle art workshop be run online for a distributed team?',
        a: 'Yes. Kraftykinni offers online bottle art workshops with material kits shipped to participants across India. Each participant receives a kit with a bottle, paints, brushes, and all required materials. The session is facilitated live over video call. This format works well for distributed corporate teams and schools with students in multiple locations. Contact kraftykinni@gmail.com or WhatsApp +91 9599622210 for online workshop pricing and kit delivery timelines.',
      },
    ],
  },
  {
    slug: 'independence-day-bottle-art-workshop-delhi-ncr',
    title: 'Independence Day 2026 — Tricolour Bottle Art & Har Ghar Tiranga Workshops in Delhi NCR',
    metaTitle: 'Independence Day Bottle Art Workshop Delhi NCR | Kraftykinni',
    metaDescription:
      'Celebrate Independence Day 2026 with tricolour bottle art and Har Ghar Tiranga jars. Hands-on workshops for schools, offices and families across Delhi NCR.',
    publishDate: '2026-07-24',
    category: 'Workshop Guides' as const,
    relatedWorkshop: 'bottle-lamp-art',
    excerpt:
      "Independence Day is 15 August — and this year, instead of just a flag hoisting and a patriotic playlist, we're showing what the day looks like when paint, a plain bottle, and the tricolour come together in a single hands-on session.",
    keywords: [
      'independence day craft activity Delhi NCR',
      'tricolour bottle art workshop Delhi',
      'Har Ghar Tiranga craft workshop',
      'independence day workshop for schools Delhi',
      '15 August activity ideas Delhi NCR',
      'patriotic craft workshop Gurgaon Noida',
      'corporate independence day activity Delhi NCR',
      'bottle art workshop Delhi NCR',
    ],
    sections: [
      {
        body: `Independence Day this year falls on a Saturday — which gives schools, offices, and families a rare window to turn the flag hoisting and patriotic songs into something people actually make with their hands.\n\nThat's the idea behind Independence Day bottle art: take an ordinary glass bottle or jar, add tricolour paint, a monument mural, or a Har Ghar Tiranga-style tag, and hand people a finished piece by the end of the session — not just a memory of a speech.`,
        image: 'https://cdn.kraftykinni.in/independence-day-tricolor-bottle-vase-gateway-of-india-kraftykinni.webp',
        imageAlt: 'Hand-painted Independence Day bottle vase with an Indian monument arch mural, a miniature tricolour flag, a "Proud to Be Indian" tag and silver-dipped dried flowers — Kraftykinni bottle art workshop Delhi NCR',
      },
      {
        heading: 'Why Bottle Art Works So Well for Independence Day',
        body: `Independence Day events tend to default to the same formats every year: a flag hoisting, a patriotic playlist, maybe a fancy-dress competition for younger students. All of it is fine, but very little of it produces something a participant keeps.\n\nBottle art changes that. A group sits down with paints, brushes, and a plain bottle, and 60 to 90 minutes later, everyone has a tricolour vase, a monument-mural bottle, or a set of Har Ghar Tiranga jars sitting in front of them. The activity does the same job as a patriotic assembly — it marks the occasion — but it leaves behind an object instead of just an announcement.\n\n**For schools:** Independence Day bottle art works as a class activity, an art-period special, or a station at a bigger 15 August celebration. Students paint their own take on the tricolour or a national monument, which turns a top-down celebration into something personal.\n\n**For corporate teams:** Independence Day is one of the few dates every office marks on the calendar regardless of industry. A bottle art session at the town hall or in the cafeteria gives teams a shared activity that fits naturally alongside the flag hoisting, without needing outdoor space or heavy logistics.\n\n**For private groups:** Housing societies, kitty parties, and family gatherings around 15 August get a genuinely festive activity — one where the tricolour theme does the decorating for you.`,
      },
      {
        heading: 'What Independence Day Bottle Art Looks Like in Practice',
        body: `The two formats that come up most often for Independence Day are monument-mural bottles and Har Ghar Tiranga jars.\n\nMonument-mural bottles use an arch or monument silhouette — painted in blue against a bright orange-and-white bottle — finished with a small flag on a stick and a tag reading "Proud to Be Indian." Silver-dipped dried flowers around the flag give the piece a finished, gift-worthy look rather than a rushed classroom craft.\n\nHar Ghar Tiranga jars take their name directly from India's flag campaign of the same name. Three small bottles, one each in saffron, white, and green, get a coat of polka dots and a hand-painted flower, then a round tag reading हर, घर, and तिरंगा — so the three jars read as one phrase when displayed together. It's a simple format, but displaying it as a set is what makes it work as home décor rather than a one-off craft.`,
        image: 'https://cdn.kraftykinni.in/har-ghar-tiranga-mini-bottle-art-kraftykinni.webp',
        imageAlt: 'Set of three Har Ghar Tiranga mini bottle art jars in saffron, white and green with hand-painted flowers and Hindi tricolour tags, styled with greenery — Kraftykinni Independence Day workshop Delhi NCR',
      },
      {
        heading: 'The Workshops Kraftykinni Runs for Independence Day',
        body: `Kraftykinni runs Independence Day bottle art as part of its existing Bottle Lamp Art workshop, adapted with a tricolour and patriotic theme for the season. Participants work with Fevicryl acrylic colours, fine brushes for lettering and mural detail, and finishing elements like dried flowers, twine, and flags.\n\nA single-bottle session (monument mural or a large tricolour vase) runs 60 to 90 minutes. A Har Ghar Tiranga set — three smaller jars per participant — runs closer to 90 minutes given the extra painting and lettering per piece. Both formats work for groups of 15 to 200+, and for school assemblies, corporate town halls, and private family sessions alike.\n\nAll materials are included in the per-person cost, and the facilitator brings everything and handles setup. Sessions across Delhi, Gurgaon, and Noida are led by Shramita Govil, Fevicryl Certified Artist. Online sessions with material kits shipped pan-India are also available for distributed teams. See our full [bottle art workshop page](/workshops/bottle-lamp-art) or explore [corporate workshops](/corporate-art-workshops) and [school workshops](/school-art-workshops) for format details.`,
      },
      {
        heading: 'How to Book for Independence Day 2026',
        body: `Independence Day is 15 August 2026 — a little over three weeks from now, which is exactly the window when school and office calendars start locking in dates.\n\nKraftykinni recommends a minimum of 7 days advance notice for all bookings, and 2 to 3 weeks for dates close to 15 August given seasonal demand. To book or check availability, WhatsApp **+91 9599622210** with your date, location (Delhi / Gurgaon / Noida), group size, and preferred format — monument mural, tricolour vase, or Har Ghar Tiranga set. We confirm within 24 hours.\n\nFor schools planning a 15 August assembly or special art period, our team can coordinate on timing, space, and batch size — read more about [school art workshops here](/school-art-workshops). For corporate teams marking Independence Day at the office, group sizes run from 20 to 200+ with full logistics support — read more about [corporate art workshops here](/corporate-art-workshops). All sessions are designed and led by [Shramita Govil, Fevicryl-certified artist](/about).`,
      },
    ],
    faq: [
      {
        q: 'What craft activity works best for Independence Day in a Delhi NCR school?',
        a: 'Tricolour monument-mural bottle art and Har Ghar Tiranga jar sets are the strongest Independence Day options for schools. Both use a plain bottle as the base and produce a finished, take-home piece within a single art period. Kraftykinni runs these sessions for student groups of 20 to 300+ across Delhi, Gurgaon, and Noida, with all materials included from ₹600 per student.',
      },
      {
        q: 'Can Kraftykinni run an Independence Day workshop at our corporate office in Delhi NCR?',
        a: 'Yes. Kraftykinni runs corporate Independence Day bottle art sessions — tricolour vases, monument murals, and Har Ghar Tiranga jar sets — at offices across Delhi, Gurgaon, and Noida. The facilitator brings all materials and handles setup and cleanup. Group sizes run from 20 to 200+, starting at ₹600 per person, all materials included. WhatsApp +91 9599622210 with your date and group size to check availability.',
      },
      {
        q: 'What is Har Ghar Tiranga bottle art?',
        a: 'Har Ghar Tiranga bottle art takes its name from India\'s "every home, a tricolour" flag campaign. Participants paint a set of three small bottles or jars — one each in saffron, white, and green — with polka dots, a hand-painted flower, and a Hindi tag, so the three jars together spell out हर घर तिरंगा when displayed as a set. It is one of Kraftykinni\'s Independence Day bottle art formats.',
      },
      {
        q: 'How much does an Independence Day art workshop cost in Delhi NCR?',
        a: 'Kraftykinni Independence Day bottle art workshops start at ₹600 per person for groups of 100+, ₹700 per person for groups of 50 to 100, and ₹800 per person for groups of 20 to 50. All materials are included — bottles, Fevicryl paints, brushes, tags, and finishing details. There are no additional venue or logistics charges; the facilitator travels to your location.',
      },
    ],
  },
  {
    slug: 'raksha-bandhan-mdf-fridge-magnet-workshop-delhi-ncr',
    title: 'Raksha Bandhan 2026 — Hand-Painted MDF Fridge Magnet Gifts for Siblings in Delhi NCR',
    metaTitle: 'Raksha Bandhan MDF Fridge Magnet Workshop | Kraftykinni',
    metaDescription:
      'Celebrate Raksha Bandhan 2026 with hand-painted MDF fridge magnet gifts for siblings. Personalised workshops for schools, offices, families in Delhi NCR.',
    publishDate: '2026-07-25',
    category: 'Workshop Guides' as const,
    relatedWorkshop: 'mdf-fridge-magnet',
    excerpt:
      "Raksha Bandhan falls on 28 August this year — and instead of another store-bought rakhi set, we're showing what the day looks like when siblings sit down and paint their own MDF keepsake plaque, together.",
    keywords: [
      'raksha bandhan gift workshop Delhi NCR',
      'MDF fridge magnet painting workshop Delhi',
      'raksha bandhan craft activity 2026',
      'personalised sibling gift workshop Delhi',
      'rakhi gift ideas Delhi NCR',
      'corporate raksha bandhan activity Gurgaon',
      'raksha bandhan workshop for schools Delhi',
      'MDF plaque painting Delhi NCR',
    ],
    sections: [
      {
        body: `Raksha Bandhan this year falls on Friday, 28 August — a little over four weeks from now, and enough runway for a gift that takes more than a five-minute online order.\n\nKraftykinni's Raksha Bandhan MDF plaque workshop gives siblings a different kind of rakhi gift: a hand-painted wooden plaque or fridge magnet, personalised with a name, a private joke, or a message a store-bought rakhi hamper never quite manages.`,
        image: 'https://cdn.kraftykinni.in/raksha-bandhan-big-brother-superhero-mdf-plaque-kraftykinni.webp',
        imageAlt: "Hand-painted yellow MDF plaque reading \"I don't need a superhero, I have a big brother\" with cartoon brother and sister illustration, hand-lettered in blue and black — Kraftykinni Raksha Bandhan gift workshop Delhi NCR",
      },
      {
        heading: 'Why a Hand-Painted Plaque Beats a Store-Bought Rakhi Gift',
        body: `Most Raksha Bandhan gifts follow the same script: a rakhi, a box of sweets, an envelope. All of it is fine, but very little of it is something the sibling actually made.\n\nA Kraftykinni MDF plaque workshop changes that. Participants sit down with a plain wooden shape — a rectangle, a circle, a die-cut couch or figure — and paint a message onto it themselves. "I don't need a superhero, I have a big brother." A private joke about who always steals the remote. The plaque becomes personal because the sibling giving it painted every letter and colour choice — not something picked off a shelf.\n\n**For schools:** a pre-Raksha Bandhan art period works well here — students paint a plaque for a sibling at home, turning a classroom craft session into a real Rakhi gift.\n\n**For corporate teams:** a plaque or fridge magnet session doubles as a festive employee engagement activity in the run-up to 28 August, giving an office's Rakhi gifting gesture more substance than a bought hamper.\n\n**For private groups:** sisters and brothers getting together before Rakhi, a kitty party, or a family gathering can turn gift-shopping into an afternoon everyone spends painting together instead.`,
      },
      {
        heading: 'What Raksha Bandhan Plaque Art Looks Like in Practice',
        body: `Humour travels well on a small wooden canvas. One of the most requested formats is the sibling-on-a-sofa design — two painted figures wrestling over a TV remote — which works because almost every sibling relationship has lived some version of that exact scene. Painted in warm orange and teal with polka-dot upholstery detail, the piece reads as affectionate teasing rather than generic décor, and it's usually the plaque siblings laugh at hardest when they unwrap it.`,
        image: 'https://cdn.kraftykinni.in/raksha-bandhan-sibling-remote-fight-mdf-magnet-kraftykinni.webp',
        imageAlt: 'Three hand-painted wooden sofa-shaped fridge magnets showing brother and sister figures fighting over a TV remote, orange couch with polka-dot upholstery detail — Kraftykinni Raksha Bandhan MDF magnet workshop Delhi NCR',
      },
      {
        heading: 'The Tom & Jerry Bond Plaque',
        body: `A teal rectangular plaque reading "Tom & Jerry Bond — We Love, Fight, Care" is another popular pick — two painted figures holding hands, framed by a hand-lettered caption that sums up most sibling relationships in five words. Because every piece is painted by hand rather than printed, no two plaques from the same session look identical, even when several participants choose the same quote.`,
        image: 'https://cdn.kraftykinni.in/raksha-bandhan-tom-jerry-bond-mdf-plaque-kraftykinni.webp',
        imageAlt: 'Hand-painted teal MDF plaque reading "Tom & Jerry Bond — We Love, Fight, Care" with two cartoon sibling figures holding hands, yellow dashed border — Kraftykinni Raksha Bandhan workshop Delhi NCR',
      },
      {
        heading: 'Making It a Family Set',
        body: `For siblings with more than one brother or sister to acknowledge, a circular hoop-style plaque works well — "We don't need a superhero, we have a little brother" — painted across an ombré teal-to-blue background with three figures standing together. It's the format Kraftykinni recommends when a participant wants one keepsake to represent the whole sibling group rather than a single relationship.`,
        image: 'https://cdn.kraftykinni.in/raksha-bandhan-little-brother-superhero-mdf-plaque-kraftykinni.webp',
        imageAlt: "Hand-painted circular MDF hoop plaque with teal-to-blue ombré background reading \"We don't need a superhero, we have a little brother\" with three cartoon sibling figures — Kraftykinni Raksha Bandhan workshop Delhi NCR",
      },
      {
        heading: 'The Workshop Kraftykinni Runs for Raksha Bandhan',
        body: `Kraftykinni runs this as part of its existing MDF Fridge Magnet workshop, adapted with Raksha Bandhan quotes and sibling-themed illustrations for the season. Participants paint with Fevicryl acrylic colours on pre-cut MDF shapes, using stencils or freehand lettering — no prior art experience needed. Each participant typically finishes 2 to 3 pieces, and a session runs 1 to 2 hours depending on design complexity.\n\nThe workshop works for groups of 20 to 200+ across Delhi, Gurgaon, and Noida, and is also available online with material kits shipped pan-India for distributed teams or siblings living apart. All materials are included in the per-person cost.`,
      },
      {
        heading: 'How to Book for Raksha Bandhan 2026',
        body: `Raksha Bandhan 2026 falls on Friday, 28 August — just over four weeks away. Kraftykinni recommends a minimum of 7 days advance notice for all bookings, and 2 to 3 weeks for dates in the week around 28 August given seasonal demand. To book or check availability, WhatsApp **+91 9599622210** with your date, location (Delhi / Gurgaon / Noida), group size, and preferred format.\n\nFor schools planning a pre-Rakhi art period, read more about [school art workshops here](/school-art-workshops). For corporate teams looking to add a festive activity before 28 August, read more about [corporate art workshops here](/corporate-art-workshops). All sessions are designed and led by [Shramita Govil, Fevicryl-certified artist](/about), and the full activity is detailed on the [MDF Fridge Magnet workshop page](/workshops/mdf-fridge-magnet).`,
      },
    ],
    faq: [
      {
        q: 'What craft activity works best for Raksha Bandhan in a Delhi NCR school?',
        a: 'Hand-painted MDF plaques and fridge magnets are the strongest Raksha Bandhan options for schools — students personalise a wooden plaque with a message or illustration for a sibling at home, finishing within a single art period. Kraftykinni runs these sessions for student groups of 20 to 300+ across Delhi, Gurgaon, and Noida, with all materials included from ₹600 per student.',
      },
      {
        q: 'Can Kraftykinni run a Raksha Bandhan workshop at our corporate office in Delhi NCR?',
        a: 'Yes. Kraftykinni runs corporate MDF plaque and fridge magnet sessions for Raksha Bandhan at offices across Delhi, Gurgaon, and Noida. The facilitator brings all materials and handles setup and cleanup. Group sizes run from 20 to 200+, starting at ₹600 per person, all materials included. WhatsApp +91 9599622210 with your date and group size to check availability.',
      },
      {
        q: "Can MDF plaques be personalised with a sibling's name or a specific message?",
        a: 'Yes. Participants can paint any message or illustration they choose onto their MDF plaque or magnet, including a sibling\'s name or a private joke, guided by stencils or freehand lettering. Popular Raksha Bandhan formats include quote plaques, couch-scene magnets, and multi-figure hoop designs, but the wording and colours are chosen by each participant.',
      },
      {
        q: 'How much does a Raksha Bandhan art workshop cost in Delhi NCR?',
        a: 'Kraftykinni Raksha Bandhan MDF plaque workshops start at ₹600 per person for groups of 100+, ₹700 per person for groups of 50 to 100, and ₹800 per person for groups of 20 to 50. All materials are included — MDF shapes, Fevicryl paints, brushes, and magnet backings. There are no additional venue or logistics charges; the facilitator travels to your location.',
      },
    ],
  },
  {
    slug: 'friendship-day-photo-magnet-workshop-delhi-ncr',
    title: 'Friendship Day 2026 — Hand-Painted Photo Magnets for Best Friends in Delhi NCR',
    metaTitle: 'Friendship Day Photo Magnet Workshop | Kraftykinni',
    metaDescription:
      'Celebrate Friendship Day 2026 with hand-painted photo magnets for best friends. Personalised MDF magnet workshops in Delhi, Gurgaon and Noida.',
    publishDate: '2026-07-28',
    category: 'Private Events' as const,
    relatedWorkshop: 'mdf-fridge-magnet',
    excerpt:
      "Friendship Day falls on 2 August this year — instead of another friendship band, we're showing what it looks like when a friend group sits down and paints a personalised photo magnet together.",
    keywords: [
      'friendship day gift workshop Delhi NCR',
      'personalised photo magnet workshop Delhi',
      'friendship day craft activity 2026',
      'MDF photo magnet painting Delhi NCR',
      'friendship day gift ideas Delhi NCR',
      'group art workshop for friends Delhi',
      'photo magnet workshop Gurgaon Noida',
      'friendship day activity for office',
    ],
    sections: [
      {
        body: `Friendship Day falls on Sunday, 2 August this year — less than a week away. Kraftykinni's photo magnet workshop gives a friend group a different kind of gift: a hand-painted MDF magnet with an actual photo of the two of you set into a painted frame, made by hand rather than picked off a shelf.`,
        image: 'https://cdn.kraftykinni.in/friendship-day-photo-magnet-friends-kraftykinni.webp',
        imageAlt: 'Hand-painted teal, yellow and pink round MDF photo magnet with a printed photo of two friends set into a painted frame, finished with a hand-sculpted flower and leaves — Kraftykinni Friendship Day workshop Delhi NCR',
      },
      {
        heading: 'Why a Photo Magnet Beats a Store-Bought Friendship Band',
        body: `Most Friendship Day gifts follow the same script: a band, a card, a box of chocolates. All of it is fine, but none of it is something either friend actually made.\n\nA Kraftykinni photo magnet workshop changes that. Participants sit down with a plain MDF shape, paint a frame around a printed photo of themselves and a friend, and finish it with hand-sculpted details — a flower, a border, a name. The magnet becomes personal because the person giving it painted every colour choice themselves, not something bought in bulk.\n\n**For schools and colleges:** a pre-Friendship Day art period works well — students paint a magnet for a classmate or their whole friend group, turning a classroom craft session into a real Friendship Day gift.\n\n**For corporate teams:** a photo magnet session doubles as a festive employee engagement activity around 2 August, giving colleagues who've become genuine friends a reason to sit down together outside a meeting room.\n\n**For private groups:** a friend circle or kitty party group can turn Friendship Day plans into an afternoon of painting together instead of another restaurant booking.`,
      },
      {
        heading: 'Works for Any Duo',
        body: `The format isn't limited to one photo style. A round frame with a polka-dot border and a hand-sculpted rose works just as well for two close friends as it does for any pair — the painting choices are entirely up to whoever's holding the brush.`,
        image: 'https://cdn.kraftykinni.in/friendship-day-duo-photo-magnet-frame-kraftykinni.webp',
        imageAlt: 'Hand-painted blue polka-dot round MDF photo magnet with a printed photo set into a white inner frame, finished with a hand-sculpted pink rose and leaves — Kraftykinni photo magnet workshop Delhi NCR',
      },
      {
        heading: 'The Batch Reunion Magnet',
        body: `For friend groups from school or college, a themed magnet works particularly well — a circular frame with a "Class Of" illustration and hand-sculpted details around the edge. It's a popular pick when a batch of friends wants one keepsake that nods to where the friendship started rather than a generic photo frame.`,
        image: 'https://cdn.kraftykinni.in/friendship-day-batch-friends-photo-magnet-kraftykinni.webp',
        imageAlt: 'Hand-painted black and yellow round MDF magnet with a "Class Of" school-friends illustration and two hand-sculpted bee figures on either side — Kraftykinni Friendship Day workshop Delhi NCR',
      },
      {
        heading: 'Personalising With a Name',
        body: `Not every piece needs a photo. A name, a heart, and a few hand-sculpted flowers on a painted MDF base is its own kind of Friendship Day keepsake — useful when a friend prefers a nameplate-style gift over a photo piece, or as a second small piece alongside a photo magnet.`,
        image: 'https://cdn.kraftykinni.in/friendship-day-personalized-name-magnet-kraftykinni.webp',
        imageAlt: "Hand-painted mustard-yellow MDF stand with a friend's name in a red heart, polka dots, and paper flower and leaf details, with a small printed photo on a stick — Kraftykinni personalised magnet workshop Delhi NCR",
      },
      {
        heading: 'The Workshop Kraftykinni Runs for Friendship Day',
        body: `Kraftykinni runs this as part of its existing MDF Fridge Magnet workshop, adapted with photo transfers and Friendship Day details for the season. Participants paint pre-cut MDF shapes with Fevicryl acrylic colours and finish them with hand-sculpted clay details — no prior art experience needed. Each participant typically finishes 1 to 2 pieces, and a session runs 1 to 2 hours depending on design complexity.\n\nBecause each piece includes a printed photo, it helps to confirm your date and share photos a little ahead of the session so prints are ready in time. The workshop works for groups of 20 to 200+ across Delhi, Gurgaon, and Noida, and is also available online with material kits shipped pan-India for friends celebrating apart.`,
      },
      {
        heading: 'How to Book for Friendship Day 2026',
        body: `Friendship Day 2026 falls on Sunday, 2 August — less than a week away, so this one needs a quick decision if you want it ready in time. Kraftykinni recommends a minimum of 7 days advance notice for all bookings; for a date this close, WhatsApp **+91 9599622210** as soon as possible with your date, location (Delhi / Gurgaon / Noida), group size, and the photos you'd like used, and we'll confirm within 24 hours whether it can be arranged in time.\n\nFor colleges and schools planning a Friendship Day art period, read more about [school art workshops here](/school-art-workshops). For offices marking the day with their team, read more about [corporate art workshops here](/corporate-art-workshops). All sessions are designed and led by [Shramita Govil, Fevicryl-certified artist](/about), and the full activity is detailed on the [MDF Fridge Magnet workshop page](/workshops/mdf-fridge-magnet).`,
      },
    ],
    faq: [
      {
        q: 'What craft activity works best for Friendship Day in Delhi NCR?',
        a: 'Hand-painted MDF photo magnets are the strongest Friendship Day option — friends personalise a wooden magnet with a printed photo of themselves and a friend, finishing within a single session. Kraftykinni runs these for groups of 20 to 200+ across Delhi, Gurgaon, and Noida, with all materials included from ₹600 per person.',
      },
      {
        q: 'Can Kraftykinni run a Friendship Day workshop at our corporate office in Delhi NCR?',
        a: 'Yes. Kraftykinni runs corporate photo magnet sessions for Friendship Day at offices across Delhi, Gurgaon, and Noida. The facilitator brings all materials and handles setup and cleanup. Group sizes run from 20 to 200+, starting at ₹600 per person, all materials included. WhatsApp +91 9599622210 with your date and group size to check availability.',
      },
      {
        q: 'Can the magnet include an actual photo of us?',
        a: 'Yes. Each photo magnet is built around a printed photo set into a hand-painted MDF frame. Since the photo needs to be printed ahead of the session, it helps to share the image you want used when you confirm your booking so it is ready in time.',
      },
      {
        q: 'How much does a Friendship Day photo magnet workshop cost in Delhi NCR?',
        a: 'Kraftykinni Friendship Day photo magnet workshops start at ₹600 per person for groups of 100+, ₹700 per person for groups of 50 to 100, and ₹800 per person for groups of 20 to 50. All materials are included — MDF shapes, Fevicryl paints, brushes, magnet backings, and photo printing. There are no additional venue or logistics charges; the facilitator travels to your location.',
      },
    ],
  },
  {
    slug: 'dot-mandala-art-corporate-workshop-noida',
    title: 'Dot Mandala Art at a Noida Corporate Office — 20 People, One Desk-Side Afternoon',
    metaTitle: 'Dot Mandala Art Corporate Workshop | Kraftykinni',
    metaDescription:
      'A 20-person team in Noida Sector 90 traded desks for dot mandala art with Kraftykinni — a relaxed, no-experience corporate reset. See how the session ran.',
    publishDate: '2026-08-02',
    category: 'Corporate' as const,
    relatedWorkshop: 'mandala-art',
    excerpt:
      'Last week, a 20-person team at a Noida Sector 90 office pushed back their keyboards and picked up dotting tools instead. This is what a desk-side Dot Mandala Art session actually looks like — and why it works as a corporate reset.',
    keywords: [
      'dot mandala art workshop corporate',
      'corporate art workshop Noida',
      'mandala art workshop Delhi NCR',
      'employee engagement activity Noida',
      'desk side art workshop corporate',
      'corporate wellness activity Noida',
      'team building activity Noida',
    ],
    sections: [
      {
        body: `Last week, a 20-person team at an office in Noida Sector 90 didn't head offsite for their team activity. Kraftykinni brought the studio to them — straight to the office floor. Keyboards were pushed back, laptops were closed, and standard desks were covered in palettes, dotting tools, and blank round wooden discs.\n\nBy 3:00 PM they were managers, analysts, and developers. By 3:30 PM they were just people trying to figure out how to keep their dot spacing even. That shift — from job title to just-a-person-with-a-paintbrush — is the entire point of a desk-side [Dot Mandala Art workshop](/workshops/mandala-art).`,
        image: 'https://cdn.kraftykinni.in/noida-corporate-dot-mandala-workshop-group-kraftykinni.webp',
        imageAlt: 'A 20-person corporate team in Noida Sector 90 holding up their finished hand-painted dot mandala artworks after a Kraftykinni desk-side workshop',
      },
      {
        heading: 'What Is Dot Mandala Art?',
        body: `Dot Mandala Art is a variation of Kraftykinni's [Mandala Art workshop](/workshops/mandala-art) built entirely from dots rather than brush strokes. Participants use fine dotting tools and acrylic paints to build symmetrical, radiating patterns one dot at a time — on a round wooden or MDF base rather than canvas.\n\nIt is slower and more meditative than free-hand painting, which is exactly why it works so well as a corporate reset: there is no fast way to rush a dot mandala, so the activity forces a genuine pause. No prior art experience is needed — the technique is entirely about patience and repetition, not skill.`,
        image: 'https://cdn.kraftykinni.in/corporate-dot-mandala-workshop-in-progress-kraftykinni.webp',
        imageAlt: 'Corporate team members using dotting tools and acrylic paint to build dot mandala art at their desks during a Kraftykinni Noida workshop',
      },
      {
        heading: 'How the Session Ran',
        body: `The session ran desk-side rather than in a separate breakout room — Shramita set up directly at the team's own workstations with all materials: acrylic paints, dotting tools, brushes, and pre-cut round bases. No offsite venue, no additional logistics, just the existing office floor repurposed for an hour.\n\nThe results captured very different personalities in the room. There were carefully detailed dot mandalas, a few serene landscape pieces, and — by participant account — one deeply stressed-out cartoon character that had the whole floor laughing. Every finished piece was different, even though everyone started with the same blank round base and the same dotting technique.`,
        image: 'https://cdn.kraftykinni.in/dot-mandala-art-finished-pieces-corporate-kraftykinni.webp',
        imageAlt: 'Two finished dot mandala artworks — one blue and white wave pattern, one colourful abstract design — held up by a workshop participant in Noida',
      },
      {
        heading: 'Why It Works as a Corporate Reset',
        body: `There is something genuinely disarming about watching corporate hierarchy fall away the moment everyone is handed a paintbrush and a set of dots to fill in. For that hour, nobody was checking their inbox — the pressure of being "perfect" at work was replaced by the simple, grounding act of getting a dot pattern to line up evenly.\n\n"Burnout" gets talked about often in HR and workplace circles, usually as something to be solved with more rest. But sometimes the better reset for an overworked mind isn't doing nothing — it's doing something completely different with your hands for an hour. That is the specific value a dot mandala session offers over a generic break: full attention, low stakes, and a real object to show for it at the end.\n\nPlanning something around World Mental Health Day on 10 October? See our guide to [art workshops for stress relief in Delhi NCR](/blog/world-mental-health-day-art-workshop-delhi-ncr).`,
        image: 'https://cdn.kraftykinni.in/dot-mandala-sunset-artwork-corporate-kraftykinni.webp',
        imageAlt: 'A finished dot mandala artwork in warm sunset colours, held up by a corporate workshop participant in Noida',
      },
      {
        heading: 'Book a Desk-Side Dot Mandala Session for Your Team',
        body: `Kraftykinni runs Dot Mandala Art as a desk-side or boardroom corporate session — no offsite venue required. Shramita brings all materials (dotting tools, acrylic paints, round bases) and handles setup and cleanup; your team just needs desks or tables.\n\nGroups from 20 to 200+, across Delhi, Gurgaon, and Noida. Pricing starts at ₹600 per person, all materials included. To book or check availability, WhatsApp **+91 9599622210** or see our [corporate art workshops page](/corporate-art-workshops) and [Noida workshops page](/workshops-in-noida).`,
        image: 'https://cdn.kraftykinni.in/corporate-art-workshop-branded-kraftykinni-noida.webp',
        imageAlt: 'A Kraftykinni team member holding a branded "Corporate Art Workshop" card at the entrance of the Noida office where the session was held',
      },
    ],
    faq: [
      {
        q: 'What is Dot Mandala Art?',
        a: 'Dot Mandala Art is a version of mandala painting built entirely from dots rather than brush strokes. Using fine dotting tools and acrylic paint, participants build a symmetrical, radiating pattern one dot at a time on a round wooden or MDF base. It requires patience rather than prior art skill, making it a genuinely meditative activity.',
      },
      {
        q: 'Can Kraftykinni run a Dot Mandala Art workshop at our office in Noida?',
        a: 'Yes. Kraftykinni runs desk-side and boardroom Dot Mandala Art sessions for corporate teams across Noida, Delhi, and Gurgaon. The facilitator brings all materials and works directly at your existing office space — no separate venue is needed. A recent session ran for a 20-person team at a Noida Sector 90 office.',
      },
      {
        q: 'Do participants need any art experience?',
        a: 'No. Dot Mandala Art is guided step by step and relies on repetition rather than freehand drawing skill, so participants with zero art background produce a complete, symmetric piece by the end of the session.',
      },
      {
        q: 'How long does a Dot Mandala Art corporate session take?',
        a: 'A desk-side session can run in about an hour for a focused group activity, or 1.5 to 2 hours for a fuller workshop format with a demonstration and more detailed pieces. Kraftykinni adapts the format and duration to fit your team\'s schedule.',
      },
      {
        q: 'What does a Dot Mandala Art corporate workshop cost in Noida?',
        a: 'Pricing starts at ₹600 per person for groups of 100+, ₹700 per person for 50–100, and ₹800 per person for groups of 20–50. All materials — dotting tools, acrylic paints, and round bases — are included, with no separate venue charge since sessions run at your own office.',
      },
    ],
  },
  {
    slug: 'janmashtami-krishna-art-workshop-delhi-ncr',
    title: 'Janmashtami 2026 — Dahi Handi Matki Painting and Radha Krishna Trinket Trays in Delhi NCR',
    metaTitle: 'Janmashtami Craft Workshop Ideas Delhi NCR | Kraftykinni',
    metaDescription:
      'Celebrate Janmashtami 2026 with hand-painted Dahi Handi matkis and mirror-work Radha Krishna trinket trays. School and private workshops across Delhi NCR.',
    publishDate: '2026-08-13',
    category: 'Workshop Guides' as const,
    relatedWorkshop: 'trinket-tray',
    excerpt:
      'Krishna Janmashtami falls on Friday, 4 September 2026. Kraftykinni is running two festival-themed workshop variations this year — a hand-painted Dahi Handi matki and a mirror-work Radha Krishna trinket tray — for schools, housing societies, and private bookings across Delhi NCR.',
    keywords: [
      'janmashtami craft workshop Delhi NCR',
      'dahi handi matki painting workshop',
      'radha krishna trinket tray workshop',
      'janmashtami art workshop for schools',
      'krishna janmashtami craft ideas Delhi',
    ],
    sections: [
      {
        body: `Every year in the days before Janmashtami, Delhi NCR classrooms and living rooms turn into miniature Vrindavans — peacock feathers, mini matkis, and Radha-Krishna cutouts start appearing on desks and windowsills well before the festival itself. Krishna Janmashtami falls on Friday, 4 September 2026, and it remains one of the busiest festival-craft windows on the Kraftykinni calendar, especially for schools running dress-up-and-craft days and families decorating for puja at home.\n\nThis year Kraftykinni is running two Janmashtami-themed variations of its regular workshops: a hand-painted Dahi Handi matki, and a mirror-embellished Radha Krishna trinket tray. Both are built on techniques [Shramita Govil](/about), a Fevicryl Certified Artist, already teaches year-round — Clay Art and Trinket Tray Painting — adapted with festival motifs, so schools and families get something that actually looks like Janmashtami rather than a generic craft with a diya glued on.`,
      },
      {
        heading: 'Dahi Handi Matki Painting — A Clay Art Variation',
        body: `The Dahi Handi — the pot Krishna is said to have raided for butter as a child — is the most recognisable symbol of Janmashtami, and painting one is a natural fit for the [Clay Art workshop](/workshops/clay-art). Participants start with a plain clay pot and build it up with acrylic paint, hand-lettering such as "Radhe Krishna," a string of beads around the neck, and cotton stuffed at the rim to represent the makhan spilling out.\n\nThe finishing touches — a peacock feather, a small Krishna-and-cow figurine, string lights tucked around the base — turn a plain clay pot into a piece that works equally well as a puja centrepiece or a keepsake for the rest of the year. Setup follows the same format as the standard Clay Art sessions: 1.5 to 2 hours, no sculpting experience needed, and every participant leaves with their own finished matki. Schools running a Janmashtami craft period usually pair this with a Radha-Krishna dress-up segment; families booking it for home puja usually want it a few days ahead of the 4th, so the paint has time to fully cure before it goes on display.`,
        image: 'https://cdn.kraftykinni.in/janmashtami-dahi-handi-matki-painting-kraftykinni.webp',
        imageAlt: 'Hand-painted Dahi Handi matki for Janmashtami with Radhe Krishna lettering, cotton makhan, peacock feather and a Krishna figurine — Kraftykinni Clay Art workshop',
      },
      {
        heading: 'Radha Krishna Mirror Trinket Tray — A Trinket Tray Painting Variation',
        body: `The second Janmashtami option builds on the regular [Trinket Tray Painting workshop](/workshops/trinket-tray). Instead of a freeform pattern, participants paint a Radha Krishna scene at the centre of a round MDF tray — Krishna playing the flute is the most requested pose — bordered by a lotus-petal frame finished with small mirror pieces, echoing the mirror-inlay technique from the [Lippan Art workshop](/workshops/lippan-art).\n\nIt takes longer than a standard trinket tray session because of the figure painting and mirror placement, so it runs as a guided, step-by-step session rather than a freeform one. Shramita demonstrates the Radha Krishna outline first, then participants build up colour and mirror detail at their own pace, working from a plain tray to a finished piece across the session. The tray works as festive wall decor through Janmashtami and doubles as a jewellery or trinket tray for the rest of the year, which is part of why it is popular with schools looking for a craft that does not get put away after a week.`,
        image: 'https://cdn.kraftykinni.in/janmashtami-radha-krishna-mirror-trinket-tray-kraftykinni.webp',
        imageAlt: 'Hand-painted round Radha Krishna trinket tray with mirror-work lotus border, made in a Kraftykinni Janmashtami Trinket Tray Painting workshop in Delhi NCR',
      },
      {
        heading: 'Why Janmashtami Craft Works Well for Schools and Home Puja',
        body: `For schools, Janmashtami sits in the small group of festivals where a hands-on craft period genuinely complements the rest of the day's programme — dress-up as Radha and Krishna, a short retelling of the birth story, and a craft table that sends every child home with something they made rather than something bought. It also gives teachers a structured activity block that does not need last-minute props beyond what the workshop brings, since Kraftykinni handles material setup and cleanup for the group.\n\nFor private bookings, the appeal is more practical: a hand-painted matki or trinket tray gives families a puja-ready decoration without needing to source one from a shop, and it is an activity parents can do with children in the days leading up to the festival rather than the rush on the 4th itself. Housing society and kitty-party groups have also booked the trinket tray format as a shorter festive activity slot ahead of Janmashtami gatherings.`,
      },
      {
        heading: 'Book a Janmashtami Workshop in Delhi NCR',
        body: `Kraftykinni runs both the Dahi Handi Matki Painting and Radha Krishna Trinket Tray workshops for schools, housing societies, and private bookings across Delhi, Gurgaon, and Noida, in the run-up to Janmashtami on 4 September 2026. Sessions run 1.5 to 2 hours, with pricing starting at ₹600 per person for groups of 100+, ₹700 for 50–100, and ₹800 for groups of 20–50 — all materials included. To check availability before the festival, WhatsApp **+91 9599622210** or see our [school workshops page](/school-art-workshops) for group bookings.`,
      },
    ],
    faq: [
      {
        q: 'When is Janmashtami in 2026?',
        a: 'Krishna Janmashtami falls on Friday, 4 September 2026. Schools and families in Delhi NCR typically book festival craft sessions in the week or two before the date, so pieces like a painted matki or trinket tray are ready in time for puja and dress-up day.',
      },
      {
        q: 'What is Dahi Handi Matki Painting?',
        a: 'It is a Janmashtami variation of Kraftykinni\'s Clay Art workshop, where participants hand-paint a plain clay pot with festival motifs — lettering, beads, a peacock feather, and cotton to represent spilling butter — to recreate the Dahi Handi, the pot associated with Krishna\'s childhood butter-stealing stories.',
      },
      {
        q: 'What is the Radha Krishna Trinket Tray workshop?',
        a: 'It is a themed version of Kraftykinni\'s Trinket Tray Painting workshop. Participants paint a Radha Krishna scene on a round MDF tray, finished with a mirror-embellished lotus border. The tray doubles as festive Janmashtami decor and a functional jewellery or desk tray afterward.',
      },
      {
        q: 'Are these workshops suitable for schools?',
        a: 'Yes. Both formats are designed for group settings and run in 1.5 to 2 hours, which fits comfortably into a school festival period. No prior art experience is needed, and every student takes home a finished piece.',
      },
      {
        q: 'How do I book a Janmashtami workshop before September 4?',
        a: 'WhatsApp +91 9599622210 with your preferred date, location (Delhi, Gurgaon, or Noida), and group size. Booking a week or two ahead of Janmashtami is recommended since this is a high-demand festival window.',
      },
    ],
  },
  {
    slug: 'ganesh-chaturthi-clay-ganpati-idol-workshop-delhi-ncr',
    title: 'Ganesh Chaturthi 2026 — Eco-Friendly Clay Ganpati Idol Painting Workshops in Delhi NCR',
    metaTitle: 'Ganesh Chaturthi Clay Idol Workshop Delhi NCR | Kraftykinni',
    metaDescription:
      'Celebrate Ganesh Chaturthi 2026 with a hand-painted eco-friendly clay Ganpati idol from Kraftykinni. School, corporate and private workshops in Delhi NCR.',
    publishDate: '2026-08-14',
    category: 'Workshop Guides' as const,
    relatedWorkshop: 'clay-art',
    excerpt:
      'Ganesh Chaturthi falls on Monday, 14 September 2026. Kraftykinni runs a hand-painted eco-friendly clay Ganpati idol workshop — plus MDF wall hangings and mirror-work tealight holders — for schools, housing societies, corporate CSR days, and private bookings across Delhi NCR.',
    keywords: [
      'ganesh chaturthi workshop delhi ncr',
      'eco friendly ganpati idol workshop',
      'clay ganesh idol painting workshop',
      'ganesh chaturthi craft workshop for schools',
      'corporate CSR ganesh chaturthi activity',
      'ganesh wall hanging workshop',
      'ganesh tealight holder workshop',
    ],
    sections: [
      {
        body: `Every September, Delhi NCR balconies and puja corners fill up with Ganpati idols bought in a hurry from the nearest stall — usually Plaster of Paris, usually painted in the same handful of factory colours. Ganesh Chaturthi falls on Monday, 14 September 2026, and this year Kraftykinni is running it differently: a hands-on workshop where participants paint their own eco-friendly clay Ganpati idol from a plain, unpainted base, rather than buying a finished one.\n\nThe workshop is a variation of Kraftykinni's regular [Clay Art workshop](/workshops/clay-art), led by [Shramita Govil](/about), a Fevicryl Certified Artist. It runs for schools, housing societies, corporate CSR days, and private home-puja bookings across Delhi, Gurgaon, and Noida in the run-up to the festival.`,
        image: 'https://cdn.kraftykinni.in/ganesh-chaturthi-eco-friendly-clay-ganpati-idol-kraftykinni.webp',
        imageAlt: 'Hand-painted eco-friendly clay Ganpati idol with traditional red and gold detailing, incense holder and festive decor — Kraftykinni Ganesh Chaturthi clay art workshop Delhi NCR',
      },
      {
        heading: 'Why Clay, Not Plaster of Paris',
        body: `The single biggest difference between this workshop and a shop-bought idol is the material. Kraftykinni's Ganpati idols are made from natural clay rather than Plaster of Paris — clay dissolves cleanly during visarjan, while POP idols do not break down the same way and are widely discouraged for that reason. Choosing clay is less about following a rule and more about the idol actually being immersion-safe, which matters to a lot of families who want to observe the tradition properly.\n\nParticipants start with a plain, unpainted clay idol rather than a template that is already coloured in. That is a deliberate choice: it means every finished Ganpati looks slightly different, and the painting itself — not just the unboxing — is the part people remember.`,
      },
      {
        heading: 'How the Painting Session Works',
        body: `Each participant works on their own plain clay idol using acrylic paints, fine brushes, and metallic gold detailing for the crown, jewellery, and dhoti. Shramita demonstrates the base colours and traditional detailing first — the standard red-and-gold Ganpati palette is the most requested — then participants build up their own idol at their own pace, finishing with small extras like a garland, a modak in hand, or a mouse (Ganesha's vahan) at the base.\n\nA session runs 1.5 to 2 hours depending on group size and idol size, and no prior painting or sculpting experience is needed. Every participant leaves with their own finished, immersion-ready Ganpati idol rather than a shared or demonstration piece.`,
      },
      {
        heading: 'Ganesh Wall Hangings — An MDF Fridge Magnet Variation',
        body: `Alongside the clay idol, Kraftykinni also runs a Ganesh wall-hanging format built on the same technique as the [MDF Fridge Magnet workshop](/workshops/mdf-fridge-magnet) — a hand-cut MDF shape, hand-painted rather than moulded. For Ganesh Chaturthi, the base is cut into a small plaque with a Ganesh face and trunk in profile, finished with acrylic colour, a border of tiny pearl beads, a jute hanging cord strung with wooden beads, and a small brass bell at the bottom.\n\nIt works well as a door or entrance hanging through the festival, and unlike the clay idol it is not meant for visarjan — it stays up as a keepsake. Schools and housing societies often pair it with the idol-painting session as a shorter, lower-mess add-on activity, since it needs only paint and a brush rather than a full clay setup.`,
        image: 'https://cdn.kraftykinni.in/ganesh-chaturthi-mdf-wall-hanging-kraftykinni.webp',
        imageAlt: 'Hand-painted MDF Ganesh wall hanging with pearl bead border, jute cord with wooden beads and a brass bell — Kraftykinni Ganesh Chaturthi MDF craft workshop Delhi NCR',
      },
      {
        heading: 'Ganesh Tealight Holders — A Trinket Tray Painting Variation',
        body: `The second add-on format builds on the [Trinket Tray Painting workshop](/workshops/trinket-tray), using the same round MDF base and mirror-inlay technique from [Lippan Art](/workshops/lippan-art). Participants paint a Ganesh silhouette in outline on a small stand, then finish a round base with a mirror-cutwork border in festive colours, with a tealight seated at the centre.\n\nIt is a shorter, table-top piece rather than a full idol, so it suits kitty parties and housing-society festive evenings looking for a quicker Ganesh Chaturthi craft slot, or families who want a lit centrepiece for their puja table alongside the idol itself.`,
        image: 'https://cdn.kraftykinni.in/ganesh-chaturthi-tealight-holder-mirror-work-kraftykinni.webp',
        imageAlt: 'Hand-painted Ganesh silhouette tealight holder with a pink mirror-cutwork base, lit tealight at the centre — Kraftykinni Ganesh Chaturthi Trinket Tray Painting workshop Delhi NCR',
      },
      {
        heading: 'Who These Workshops Are For',
        body: `Schools use the clay idol session as a Ganesh Chaturthi craft period that pairs naturally with a short story of Ganesha's birth, sending every child home with an idol they made rather than one that was bought — the wall-hanging format works as a quicker add-on for younger grades. Housing societies and RWAs book the idol session as a community activity ahead of their society's Ganpati sthapana, and often add the tealight holder as a shorter evening craft slot for residents.\n\nCorporate teams increasingly book the clay idol workshop as a CSR or sustainability-linked activity — it gives a wellness or CSR day a genuine, tangible angle beyond a generic team activity, since the "no Plaster of Paris" choice is something companies can point to directly. Private bookings tend to be families who want a hand-painted idol for home puja, sometimes with the wall hanging or tealight holder added on for the entrance and puja table.`,
      },
      {
        heading: 'Book a Ganesh Chaturthi Workshop in Delhi NCR',
        body: `Kraftykinni runs the eco-friendly Clay Ganpati idol workshop, along with the MDF wall hanging and mirror-work tealight holder formats, for schools, housing societies, corporate CSR days, and private bookings across Delhi, Gurgaon, and Noida, in the run-up to Ganesh Chaturthi on 14 September 2026. Sessions run 1.5 to 2 hours, with pricing starting at ₹600 per person for groups of 100+, ₹700 for 50–100, and ₹800 for groups of 20–50 — all materials included. Corporate teams can also pair this with our [corporate art workshops](/corporate-art-workshops) format. To check availability before the festival, WhatsApp **+91 9599622210** or see our [school workshops page](/school-art-workshops) for group bookings.`,
      },
    ],
    faq: [
      {
        q: 'When is Ganesh Chaturthi in 2026?',
        a: 'Ganesh Chaturthi falls on Monday, 14 September 2026. Schools, housing societies, and families in Delhi NCR typically book festival craft sessions in the two weeks before the date, so idols are painted and ready in time for sthapana.',
      },
      {
        q: 'Why use a clay Ganpati idol instead of Plaster of Paris?',
        a: "Clay idols dissolve cleanly during visarjan, while Plaster of Paris idols do not break down the same way and are widely discouraged for that reason. Kraftykinni's workshop uses natural clay idols so the finished piece is genuinely immersion-safe, not just decorative.",
      },
      {
        q: 'What does the Ganesh Chaturthi clay idol workshop actually involve?',
        a: 'Participants hand-paint their own plain, unpainted clay Ganpati idol using acrylic paints and metallic gold detailing for the crown and jewellery, guided step by step by Shramita Govil, a Fevicryl Certified Artist. Sessions run 1.5 to 2 hours and every participant takes home their own finished idol.',
      },
      {
        q: 'What other Ganesh Chaturthi craft formats does Kraftykinni offer besides the clay idol?',
        a: 'Kraftykinni also runs a hand-painted MDF Ganesh wall hanging (a variation of the MDF Fridge Magnet workshop) and a mirror-work Ganesh tealight holder (a variation of Trinket Tray Painting). Both work as shorter add-on activities alongside the main clay idol session.',
      },
      {
        q: 'Can this be booked as a corporate CSR activity?',
        a: 'Yes. Companies book the eco-friendly clay Ganpati idol workshop as a CSR or sustainability-linked activity ahead of Ganesh Chaturthi, since it replaces a Plaster of Paris purchase with a hands-on, immersion-safe alternative the team makes themselves.',
      },
      {
        q: 'How much does a Ganesh Chaturthi workshop cost in Delhi NCR?',
        a: 'Pricing starts at ₹600 per person for groups of 100+, ₹700 per person for 50–100, and ₹800 per person for groups of 20–50. All materials — clay idols, acrylic paints, brushes, and gold detailing — are included, with no separate venue charge since Kraftykinni travels to your location.',
      },
    ],
  },
  {
    slug: 'trending-art-craft-workshops-delhi-ncr',
    title: "What's Trending in Art & Craft Workshops in Delhi NCR Right Now (2026)",
    metaTitle: 'What\'s Trending in Art & Craft Workshops? | Kraftykinni',
    metaDescription:
      'What\'s trending in art and craft workshops in 2026 — personalization, mindful crafts, eco-friendly materials — from Kraftykinni\'s Delhi NCR sessions.',
    publishDate: '2026-09-04',
    category: 'Workshop Guides' as const,
    relatedWorkshop: 'lippan-art',
    excerpt:
      "Personalized keepsakes, slow meditative crafts like Dot Mandala Art, and eco-friendly materials are what's actually driving workshop bookings in 2026 — here's what that looks like across Kraftykinni's real sessions this year.",
    keywords: [
      'what is trending in art and craft',
      'trending art and craft workshops 2026',
      'creative workshops Delhi NCR',
      'DIY workshop trends Delhi',
      'art and craft workshop trends 2026',
      'corporate team building trends Gurgaon',
      'mandala art classes Delhi NCR',
    ],
    sections: [
      {
        body: `If you've searched for what's trending in art and craft lately, the honest answer isn't a single new craft — it's a shift in what people want the craft to do for them. Across the workshops Kraftykinni has run through 2026, three things keep repeating: participants want something personal, not generic; something slow, not another five-minute activity; and something made from materials that don't feel wasteful.\n\nEverything below comes from actual sessions Kraftykinni has run this year, not a trend report — here's what that looks like in practice, across the workshops Delhi NCR is actually booking right now.`,
      },
      {
        heading: 'Personalization Has Replaced Generic Craft Kits',
        body: `The single biggest shift this year has been away from "everyone paints the same template" toward pieces built around a specific person or relationship. For Friendship Day, Kraftykinni's [MDF Fridge Magnet workshop](/workshops/mdf-fridge-magnet) turned into a personalized photo-magnet session — participants brought a photo of a friend and painted a magnet built around that exact picture, not a generic design. The same shift showed up for Raksha Bandhan, where siblings painted magnets referencing real in-jokes rather than a standard rakhi motif.\n\nThis isn't a one-off request anymore. It's the difference between a craft session and a keepsake, and it's why personalization now comes up in nearly every private-event and gifting enquiry Kraftykinni gets.`,
        image: 'https://cdn.kraftykinni.in/friendship-day-photo-magnet-friends-kraftykinni.webp',
        imageAlt: 'Hand-painted personalized photo magnet made by a participant at a Kraftykinni workshop in Delhi NCR',
      },
      {
        heading: 'Slow, Meditative Crafts Are Winning Over Quick DIY',
        body: `The second shift is toward activities that take genuine, unhurried time rather than another 20-minute craft. [Dot Mandala Art](/workshops/mandala-art) is the clearest example — at [a recent corporate session in Noida](/blog/dot-mandala-art-corporate-workshop-noida), a 20-person team spent an hour building symmetrical patterns one dot at a time at their own desks. There's no way to rush a dot mandala, and that's the point: it forces a real pause in a way a five-minute craft can't.\n\nThis isn't just a Kraftykinni observation — it's showing up in what people are actually searching for, with steady interest in mandala art classes across Delhi NCR alongside a broader pull toward workshops that double as a genuine mental reset rather than pure entertainment.`,
        image: 'https://cdn.kraftykinni.in/dot-mandala-sunset-artwork-corporate-kraftykinni.webp',
        imageAlt: 'Finished dot mandala artwork in warm sunset colours from a Kraftykinni corporate mindfulness workshop',
      },
      {
        heading: 'Eco-Conscious Materials Are Now a Default Expectation',
        body: `A few years ago, "eco-friendly craft" was a request schools or CSR teams made specifically for Environment Day. In 2026, it's closer to a default expectation. Kraftykinni's [Clay Art](/workshops/clay-art) workshop now runs an eco-friendly clay Ganpati idol format for Ganesh Chaturthi — natural clay instead of Plaster of Paris, so the idol dissolves cleanly at visarjan instead of sitting in a landfill. The same instinct drives the [upcycled bottle art](/blog/world-environment-day-upcycled-bottle-art-workshop-delhi-ncr) sessions Kraftykinni runs through the year, where the craft material is literally a bottle someone was about to throw away.\n\nFor corporate teams, this has become a genuine CSR angle rather than a nice-to-have: a hands-on, immersion-safe alternative the team makes themselves does more for a sustainability week than a poster ever will.`,
        image: 'https://cdn.kraftykinni.in/ganesh-chaturthi-eco-friendly-clay-ganpati-idol-kraftykinni.webp',
        imageAlt: 'Hand-painted eco-friendly clay Ganpati idol from a Kraftykinni Ganesh Chaturthi workshop in Delhi NCR',
      },
      {
        heading: 'Heritage Indian Crafts Are Finding a Wider Audience',
        body: `The third pattern is renewed interest in traditional Indian craft techniques — not as a museum topic, but as something people actually want to sit down and learn. [Lippan Art](/workshops/lippan-art), the mirror-inlay mud work that originates from Kutch, Gujarat, remains one of Kraftykinni's most-searched workshops on its own. [Block printing](/workshops/block-printing) has drawn interest from an unexpected direction too — [a recent session welcomed an Israeli family](/blog/block-printing-workshop-delhi-israeli-family) learning the technique together, a reminder that these heritage crafts travel well beyond their region of origin.\n\nBoth crafts share what makes them work as workshops: a clear, teachable technique with centuries of tradition behind it, and a finished piece that looks nothing like generic mass-market decor.`,
        image: 'https://cdn.kraftykinni.in/block-printing-israel-mother-daughter-learning-kraftykinni.webp',
        imageAlt: 'A mother and daughter learning traditional Indian block printing together at a Kraftykinni workshop in Delhi NCR',
      },
      {
        heading: 'What This Means for Corporate Teams Booking in Gurgaon and Delhi',
        body: `For corporate teams, all three shifts point the same way: art workshops are being booked less as generic entertainment and more as a deliberate reset — personalized, unhurried, and increasingly tied to a real CSR or wellness goal rather than just "something different for the offsite." That's especially visible in [Gurgaon](/workshops-in-gurgaon), where Kraftykinni continues to see steady enquiry volume for [corporate team-building sessions](/corporate-art-workshops) that run desk-side rather than needing a separate offsite venue.\n\nIf your team is planning something around the upcoming festive season — Navratri, Diwali, or a corporate wellness day — these are the formats worth building around: Dot Mandala Art for a genuine reset, a personalized keepsake format like MDF magnets or trinket trays for a gifting angle, and an eco-friendly option like the clay idol workshop if sustainability is part of the brief.`,
        image: 'https://cdn.kraftykinni.in/corporate-art-workshop-branded-kraftykinni-noida.webp',
        imageAlt: 'A Kraftykinni team member at a branded corporate art workshop setup in Delhi NCR',
      },
      {
        heading: 'Book a Workshop Built Around Where Craft Is Headed',
        body: `Kraftykinni runs all of the formats mentioned here — Dot Mandala Art, personalized MDF magnets and trinket trays, eco-friendly clay idols, Lippan Art, and block printing — for corporate teams, schools, and private events across Delhi, Gurgaon, and Noida. Every session is led by [Shramita Govil](/about), a Fevicryl Certified Artist, with pricing starting at ₹600 per person for groups of 100+, ₹700 for 50–100, and ₹800 for 20–50, all materials included.\n\nTo check availability or talk through which format fits your group, WhatsApp **+91 9599622210** with your date, location, and group size.`,
      },
    ],
    faq: [
      {
        q: 'What is trending in art and craft right now?',
        a: 'In 2026, three trends are driving most craft workshop bookings: personalization (custom photo magnets and named keepsakes over generic templates), slow and meditative formats like Dot Mandala Art over quick five-minute crafts, and eco-conscious materials such as natural clay idols and upcycled bottle art. Kraftykinni, a Delhi NCR art workshop studio, has run all three formats across corporate, school, and private bookings through 2026.',
      },
      {
        q: 'What are the most popular creative workshops in Delhi NCR right now?',
        a: "Dot Mandala Art, personalized MDF photo-magnet workshops, and heritage crafts like Lippan Art and block printing are among the most-booked creative workshops in Delhi NCR in 2026, based on Kraftykinni's own session bookings across corporate, school, and private events.",
      },
      {
        q: 'Are DIY workshops still popular in Delhi NCR?',
        a: 'Yes — DIY and hands-on craft workshops remain in steady demand across Delhi NCR for corporate team building, school events, and private celebrations. What has changed in 2026 is the format: participants increasingly prefer personalized, unhurried sessions like Dot Mandala Art or custom photo-magnet painting over quick generic craft activities.',
      },
      {
        q: "What's a good corporate team-building activity trend in Gurgaon?",
        a: 'Desk-side or boardroom art workshops that double as a wellness reset are the strongest corporate team-building trend in Gurgaon right now — Dot Mandala Art in particular, since it needs no offsite venue and gives every participant a finished piece. Kraftykinni runs these sessions for teams of 20 to 200+ across Gurgaon, Delhi, and Noida.',
      },
      {
        q: 'Does Kraftykinni use eco-friendly materials?',
        a: "Yes. Kraftykinni's Ganesh Chaturthi workshop uses natural clay idols instead of Plaster of Paris, and its Environment Day sessions turn upcycled bottles into painted planters and décor. Both are run as regular workshop formats, not one-off specials, for schools, corporate teams, and private groups across Delhi NCR.",
      },
    ],
  },
  {
    slug: 'corporate-diwali-celebration-ideas-delhi-ncr',
    title: 'Corporate Diwali Celebration Ideas for Delhi NCR: 9 Creative Activities Employees Actually Enjoy',
    metaTitle: 'Corporate Diwali Activities Delhi NCR 2026 | Kraftykinni',
    metaDescription:
      'Planning a corporate Diwali in Delhi, Gurgaon or Noida? 9 hands-on Diwali art activities, pricing and group-size guidance for 20-200+ employees.',
    publishDate: '2026-09-12',
    updatedDate: '2026-10-26',
    category: 'Corporate' as const,
    relatedWorkshop: 'lippan-art',
    excerpt:
      "Diwali falls on Sunday, 8 November 2026. Beyond décor, sweets and games, hands-on creative activities give employees something to actually participate in — and something they take home. Here are 9 corporate Diwali workshop ideas Kraftykinni runs across Delhi, Gurgaon and Noida, from a premium Lippan Ganesha canvas to a budget-friendly diya set.",
    keywords: [
      'corporate diwali celebration ideas delhi ncr',
      'corporate diwali activities delhi ncr',
      'corporate diwali party ideas gurgaon',
      'diwali office activities delhi',
      'diwali team building activities',
      'diwali art workshop corporate',
      'diya painting corporate event',
      'lippan art diwali workshop',
      'creative diwali activities for employees',
    ],
    sections: [
      {
        body: `**Updated 26 October 2026.** Diwali is on Sunday, 8 November, and corporate Diwali workshops need at least 10 days' advance booking. That makes 29 October the last date to book a session that falls on or before Diwali itself.\n\nPlanning a Diwali celebration for your office in Delhi, Gurgaon or Noida? Beyond décor, sweets and games, hands-on creative activities give employees something to participate in — and something they can take home.\n\nKraftykinni runs corporate Diwali art workshops for **20–200+ employees**, all beginner-friendly, with materials included and no prior art experience required. This guide covers what makes a Diwali activity actually work for an office, nine formats we run, how to pick between them, and what to expect on the day.`,
      },
      {
        heading: 'What Makes a Good Corporate Diwali Activity',
        body: `Not every "festive" activity works well in an office setting. Before picking a format, it's worth checking it against a few basics:`,
        listItems: [
          'Easy to join — nobody should need prior art experience',
          'Scalable — the same format should work for 20 people and 150 people',
          'Time-efficient — ideally 60–120 minutes, so it fits around a workday',
          "Inclusive — doesn't unintentionally exclude anyone from participating",
          'Take-home — employees leave with something they actually made',
          'Office-friendly — minimal mess, simple setup, easy cleanup',
          'Photogenic — gives your internal comms team something worth sharing',
        ],
      },
      {
        heading: '9 Corporate Diwali Art Activities for Employees',
        body: `We're not going to pretend all nine of these are equally good for every office. For most corporate teams, we point people first toward the Lippan Ganesha Canvas Art, Diya Painting or the Lippan Mirror Tealight Holder — they combine easy participation with a genuinely useful take-home piece. The rest are strong options once you know what you're optimising for: budget, cultural heritage, or festive symbolism.`,
      },
      {
        heading: '1. Lippan Ganesha Canvas Art',
        body: `**Best for:** premium employee celebrations · **Duration:** 90–120 min · **Group size:** 20–100 · **Take-home:** Yes\n\nOur flagship Diwali format. Employees build a mirror-inlay Ganesha on canvas using the same [Lippan Art](/workshops/lippan-art) technique — mud-and-mirror inlay work from Kutch, Gujarat — set against a hand-blended festive background. This is the one to lead with when you want the celebration to feel like a premium experience rather than a children's craft activity.`,
        image: 'https://cdn.kraftykinni.in/assets/lippan-ganesha-canvas-opt.webp',
        imageAlt: 'Hand-crafted Lippan mirror-inlay Ganesha canvas art — Kraftykinni corporate Diwali workshop Delhi NCR',
      },
      {
        heading: '2. Diya Painting',
        body: `**Best for:** budget-friendly, high-volume events · **Duration:** 60–75 min · **Group size:** 30–200+ · **Take-home:** Yes\n\nOur most-requested Diwali format, and the easiest to position as "Create Your Festive Diwali Set" rather than plain diya painting. Employees hand-paint clay diyas with acrylic colours, floral motifs and metallic detailing using the same [Clay Art](/workshops/clay-art) technique — no wheel, no kiln, and every design comes out different.`,
        image: 'https://cdn.kraftykinni.in/assets/diwali-diya-painting-opt.webp',
        imageAlt: 'Hand-painted clay diyas with festive floral detailing — Kraftykinni corporate Diwali diya painting workshop',
      },
      {
        heading: '3. Diwali Jar Painting (Tealight Jars)',
        body: `**Best for:** a visual, photographable centrepiece · **Duration:** 75–90 min · **Group size:** 20–150 · **Take-home:** Yes\n\nEmployees hand-paint a stained-glass-style mosaic design onto a glass jar using the same [Glass Painting](/workshops/glass-painting) technique, then fit it with a warm tealight. The moment everyone lights their jar and the office lights dim for a group photograph is the highlight — a genuine reveal moment that photographs well for internal comms, which is why this works particularly well for larger office Diwali parties.`,
        image: 'https://cdn.kraftykinni.in/assets/diwali-jar-painting-opt.webp',
        imageAlt: 'Hand-painted stained-glass style Diwali tealight jars lit up — Kraftykinni corporate Diwali workshop Delhi NCR',
      },
      {
        heading: '4. Lippan Mirror Tealight Holder',
        body: `**Best for:** a premium alternative to diya painting · **Duration:** 75–90 min · **Group size:** 20–100 · **Take-home:** Yes\n\nA round mirror-inlay plate built around a central tealight, using the same [Lippan Art](/workshops/lippan-art) technique. A good option when a client says they already did diya painting last year and want something that still feels festive but different.`,
        image: 'https://cdn.kraftykinni.in/assets/lippan-tealight-holder-opt.webp',
        imageAlt: 'Lippan mirror-work Diwali tealight holder plate — Kraftykinni corporate Diwali workshop Delhi NCR',
      },
      {
        heading: '5. Lippan Mirror Décor Plate',
        body: `**Best for:** a quick, display-ready decorative piece · **Duration:** 60–75 min · **Group size:** 20–150 · **Take-home:** Yes\n\nA circular mandala of mirror pieces built up on a coloured base, using the same [Lippan Art](/workshops/lippan-art) technique as our flagship pieces but on a faster, simpler format. Works well as a companion activity alongside diya painting when you want two take-home pieces without adding much time to the session.`,
        image: 'https://cdn.kraftykinni.in/assets/lippan-mirror-plate-opt.webp',
        imageAlt: 'Lippan mirror mosaic Diwali décor plate — Kraftykinni corporate Diwali workshop Delhi NCR',
      },
      {
        heading: '6. Mini Lippan Art Wall Hanging',
        body: `**Best for:** a small, quick keepsake · **Duration:** 60–75 min · **Group size:** 20–150 · **Take-home:** Yes\n\nEmployees build a small tasselled, mirror-inlay wall hanging using the same [Lippan Art](/workshops/lippan-art) technique in miniature. A good fit for shorter time slots or when you want a lighter, more compact take-home piece than the full-size canvas or tealight formats.`,
        image: 'https://cdn.kraftykinni.in/assets/mini-lippan-art-hanging-opt.webp',
        imageAlt: 'Mini Lippan mirror-work wall hanging with tassels — Kraftykinni corporate Diwali workshop Delhi NCR',
      },
      {
        heading: '7. Madhubani Art Coasters',
        body: `**Best for:** cultural/heritage art on a functional piece · **Duration:** 60–90 min · **Group size:** 20–150 · **Take-home:** Yes\n\nEmployees hand-paint a Madhubani folk-art design — elephants, fish and birds are popular motifs — onto a set of wooden coasters. This suits senior-management sessions, women's employee groups and premium offsites well, and gives HR a genuine cultural-heritage story alongside a coaster set people actually use at their desk or at home.`,
        image: 'https://cdn.kraftykinni.in/assets/madhubani-art-coasters-opt.webp',
        imageAlt: 'Hand-painted Madhubani art coasters with elephant, fish and bird motifs — Kraftykinni corporate Diwali workshop Delhi NCR',
      },
      {
        heading: '8. Shubh-Labh Hanging Basket',
        body: `**Best for:** auspicious festive door or wall décor · **Duration:** 60–75 min · **Group size:** 20–150 · **Take-home:** Yes\n\nEmployees paint a small jute-handled hanging basket with the traditional "Shubh" and "Labh" script and fill it with festive artificial flowers. "Shubh-Labh" is one of the most recognisable auspicious phrases of the festival, symbolising good fortune and gain — a genuine cultural touch that also works well as a door or wall hanging at home.`,
        image: 'https://cdn.kraftykinni.in/assets/shubh-labh-hanging-basket-opt.webp',
        imageAlt: 'Hand-painted Shubh-Labh festive hanging basket with jute handle — Kraftykinni corporate Diwali workshop Delhi NCR',
      },
      {
        heading: '9. Riddhi-Siddhi Hanging Basket',
        body: `**Best for:** a companion piece to Shubh-Labh, or its own auspicious activity · **Duration:** 60–75 min · **Group size:** 20–150 · **Take-home:** Yes\n\nThe same jute-handled hanging basket format, this time painted with "Riddhi" and "Siddhi" — the auspicious pairing for prosperity and spiritual accomplishment. Many offices run this alongside the Shubh-Labh basket so employees can choose their design, or pair the two as a matching set.`,
        image: 'https://cdn.kraftykinni.in/assets/riddhi-siddhi-hanging-basket-opt.webp',
        imageAlt: 'Hand-painted Riddhi-Siddhi festive hanging basket with jute handle — Kraftykinni corporate Diwali workshop Delhi NCR',
      },
      {
        heading: 'Which Diwali Activity Fits Your Team',
        body: `A quick way to narrow the nine down to two or three options worth pitching internally:`,
        listItems: [
          '20–40 employees → Lippan Ganesha Canvas Art or Lippan Mirror Tealight Holder',
          '50–100 employees → Diwali Jar Painting or Diya Painting',
          '100–200+ employees → Diya Painting, Madhubani Art Coasters or Mini Lippan Art Wall Hanging',
          'Want a premium experience → Lippan Ganesha Canvas Art',
          'Short 60-minute slot → Diya Painting or Mini Lippan Art Wall Hanging',
          'Cultural/heritage angle → Madhubani Art Coasters',
          'Auspicious festive symbolism → Shubh-Labh Hanging Basket or Riddhi-Siddhi Hanging Basket',
          'Something different from last year\'s diya painting → Diwali Jar Painting or Lippan Mirror Décor Plate',
          'MNC or premium office → Lippan Ganesha Canvas Art or Lippan Mirror Tealight Holder',
        ],
      },
      {
        heading: 'What a Corporate Diwali Workshop Costs in Delhi NCR',
        body: `Kraftykinni's standard workshop pricing is **₹800 per person for groups of 20–50, ₹700 for 50–100, and ₹600 for 100+**, all materials included. Diwali-specific formats with mirror inlay work and premium packaging — the Lippan Ganesha Canvas Art and Lippan Mirror Tealight Holder in particular — are typically priced toward the upper end of that range or slightly above it, depending on the exact materials chosen.\n\nWe don't lock every Diwali product to one fixed number upfront because group size, venue and exact materials all move the final quote — but this gives you a realistic budget range to plan around before you reach out.`,
      },
      {
        heading: 'How a Kraftykinni Corporate Diwali Workshop Works',
        body: `**Before the event** — you pick the activity, group size, date and any branding or theme.\n\n**On the day** — Kraftykinni brings all materials and sets up at your office. [Shramita Govil](/about), a Fevicryl Certified Artist, walks the group through a short demonstration, then guides participants step-by-step through the activity.\n\n**At the end** — employees finish their piece, and everything is packaged for them to take home. Setup and cleanup are handled by Kraftykinni.`,
      },
      {
        heading: 'Why Art Works Especially Well for Corporate Diwali',
        body: `Corporate Diwali celebrations tend to default to DJ, sweets, games and décor — all things employees watch or consume rather than do. A creative workshop flips that: employees participate, and they leave with something they made themselves rather than a photo booth print or a party favour.\n\nKraftykinni has run 50+ corporate workshops for 1,500+ participants across Delhi, Gurgaon and Noida, led by [Shramita Govil](/about), a Fevicryl Certified Artist. Every session is designed for beginners — no prior art experience is assumed — and scales from 20 to 200+ participants with full setup and cleanup handled on-site.`,
      },
      {
        heading: 'Corporate Diwali Activities in Gurgaon and Noida',
        body: `**Gurgaon** — we run sessions across Cyber City, Udyog Vihar, Golf Course Road, Sohna Road and DLF Cyber Park. Gurgaon's MNC-heavy office base tends to lean toward the premium end — the Lippan Ganesha Canvas Art, Lippan Mirror Tealight Holder and Mini Lippan Art Wall Hanging all work well here. See our [corporate art workshops](/corporate-art-workshops) and [employee engagement activities in Gurgaon](/employee-engagement-activities-gurgaon) pages for group formats and pricing.\n\n**Noida** — we run sessions across Sectors 62, 63, 135, 142 and 16/18. Diya Painting, Diwali Jar Painting and Madhubani Art Coasters tend to work best for Noida's larger, more price-sensitive office events. See our [employee engagement activities in Noida](/employee-engagement-activities-noida) page for group formats.`,
      },
      {
        heading: 'Planning Timeline for Your Office Diwali Workshop',
        body: `Diwali falls on Sunday, 8 November 2026, so most offices run their celebration in the weeks leading up to it. Kraftykinni needs at least 10 days' advance booking for corporate Diwali workshops, so plan backwards from your event date.`,
        listItems: [
          '6–8 weeks before — shortlist your activity and vendor',
          '4–6 weeks before — confirm participant count and finalise the artwork format',
          '2–3 weeks before — lock in materials, any branding, and logistics',
          '10 days before — the last date we can take a booking',
          '1 week before — confirm final attendance and venue setup',
          'Event day — Kraftykinni handles workshop setup and facilitation on-site',
        ],
      },
      {
        heading: 'Booking Late? Your Last-Minute Diwali Options',
        body: `Corporate Diwali workshops need at least 10 days' advance booking. With Diwali on Sunday, 8 November, the last date to book a session on or before Diwali is 29 October.\n\nIf you are close to that cut-off, choose a format that fits a short slot, such as Diya Painting or the Mini Lippan Art Wall Hanging, both 60–75 minutes. If you have already missed it, a celebration date after Diwali can still be booked with 10 days' notice. WhatsApp **+91 9599622210** with your date, headcount and location, and we will confirm what is available.`,
      },
      {
        heading: 'Who Else Books a Diwali Workshop',
        body: `**Schools** run diya painting or Madhubani coasters as a Diwali craft period ahead of the school break — see our [school workshops page](/school-art-workshops) for group bookings.\n\n**Cafés** book jar painting or diya painting as a festive pop-up session for customers, a sip-and-craft format alongside chai and Diwali snacks.\n\n**Colleges and universities** book a live diya-painting or coaster-painting stall as part of their annual Diwali Mela.\n\n**Event managers** book Kraftykinni as the craft-activity vendor for a client's Diwali event, slotting any of the nine formats above into a larger celebration programme.\n\nRunning Diwali for a school, college, café, residential society or home group rather than an office? Read our [Diwali art workshop guide for schools, societies and home groups](/blog/diwali-art-workshop-schools-societies-delhi-ncr).`,
      },
      {
        heading: 'Get a Corporate Diwali Quote',
        body: `Planning your office Diwali celebration? Tell us your employee count, location and preferred date, and we'll recommend a workshop that fits your team, timing and budget. Sessions run 60 to 120 minutes depending on the format, with pricing starting at ₹600 per person for groups of 100+, ₹700 for 50–100, and ₹800 for groups of 20–50 — all materials included.\n\nTo check availability, WhatsApp **+91 9599622210** with your employee count, location (Delhi, Gurgaon or Noida), preferred date, and which of the nine formats you'd like to run. Corporate Diwali bookings need at least 10 days' advance notice.`,
      },
    ],
    faq: [
      {
        q: 'When is Diwali in 2026?',
        a: 'Diwali (Lakshmi Puja) falls on Sunday, 8 November 2026. Most corporate offices in Delhi NCR book their celebration workshop through October and into early November, ahead of the date.',
      },
      {
        q: 'How far in advance do I need to book a corporate Diwali workshop?',
        a: 'At least 10 days in advance. With Diwali on 8 November 2026, the last date to book a session on or before Diwali is 29 October. Sessions after Diwali can be booked with the same 10 days of notice.',
      },
      {
        q: 'What are the best Diwali activities for corporate offices in Delhi NCR?',
        a: 'For most corporate teams, we recommend the Lippan Ganesha Canvas Art, Diya Painting or the Lippan Mirror Tealight Holder — they combine easy participation with a genuinely useful take-home piece. Kraftykinni also runs Diwali Jar Painting, a Lippan Mirror Décor Plate, a Mini Lippan Art Wall Hanging, Madhubani Art Coasters, and Shubh-Labh and Riddhi-Siddhi Hanging Baskets.',
      },
      {
        q: 'How much does a corporate Diwali art workshop cost?',
        a: 'Standard pricing is ₹800 per person for groups of 20–50, ₹700 for 50–100, and ₹600 for 100+, all materials included. Diwali-specific formats with mirror inlay work — the Lippan Ganesha Canvas Art and the Lippan Mirror Tealight Holder — are typically priced toward the upper end of that range depending on materials.',
      },
      {
        q: 'Which Diwali activity works best for 100+ employees?',
        a: 'Diya Painting, Madhubani Art Coasters and the Mini Lippan Art Wall Hanging all scale comfortably to 100–300+ participants in a single 60–90 minute session.',
      },
      {
        q: 'Can the workshop be conducted at our Gurgaon or Noida office?',
        a: "Yes. Kraftykinni travels to your office across Delhi, Gurgaon (Cyber City, Udyog Vihar, Golf Course Road, Sohna Road, DLF Cyber Park) and Noida (Sectors 62, 63, 135, 142, 16/18), and handles all setup and cleanup on-site.",
      },
      {
        q: 'Do employees need previous art experience?',
        a: 'No. Every format is designed for complete beginners, guided step-by-step by Shramita Govil, a Fevicryl Certified Artist. No prior art experience is assumed for any of the nine activities.',
      },
      {
        q: 'What is the difference between the Shubh-Labh and Riddhi-Siddhi hanging baskets?',
        a: 'Both use the same jute-handled hanging basket format and take a similar 60–75 minutes. The difference is just the painted script and its meaning — "Shubh-Labh" symbolises good fortune and gain, while "Riddhi-Siddhi" symbolises prosperity and spiritual accomplishment. Many offices run both so employees can pick a design, or pair them as a matching set.',
      },
      {
        q: 'Can the artwork be customised to our company colours or branding?',
        a: 'Yes, particularly for the Lippan Ganesha Canvas Art and the hanging basket formats, where colours or the Hindi script (Shubh-Labh or Riddhi-Siddhi) can be adjusted. Other formats can also incorporate light branding on request.',
      },
      {
        q: 'How long does a corporate Diwali workshop take?',
        a: 'Most formats run 60 to 90 minutes. Diya Painting and the Mini Lippan Art Wall Hanging are the fastest at 60–75 minutes, while the Lippan Ganesha Canvas Art and Lippan Mirror Tealight Holder run closer to 90–120 minutes.',
      },
      {
        q: 'Do you run Diwali craft workshops for schools, cafés or colleges too?',
        a: 'Yes. Schools book diya painting or Madhubani coasters as a Diwali craft period, cafés run festive pop-up sessions for customers, and colleges book a live workshop stall for their annual Diwali Mela. Event managers can also book Kraftykinni as the craft-activity vendor for a client\'s Diwali event.',
      },
    ],
  },
  {
    slug: 'navratri-tie-dye-trinket-tray-workshop-delhi-ncr',
    title: 'Navratri 2026 Workshop Ideas — Tie & Dye "9 Colours" Sessions and Garba Trinket Trays in Delhi NCR',
    metaTitle: 'Navratri Workshop Ideas Delhi NCR 2026 | Kraftykinni',
    metaDescription:
      'Navratri 2026 workshop ideas: a 9-colours Tie & Dye session for corporate teams and a garba trinket tray for schools. Delhi, Gurgaon, Noida.',
    publishDate: '2026-09-25',
    category: 'Workshop Guides' as const,
    relatedWorkshop: 'tie-and-dye',
    excerpt:
      'Navratri Ghatasthapana falls on Sunday, 11 October 2026. Kraftykinni runs two festival-timed workshops this year — a Tie & Dye session built around the "9 colours of Navratri" office tradition, and a garba-ready trinket tray for storing bangles and jewellery — for corporate teams, schools, and private bookings across Delhi NCR.',
    keywords: [
      'navratri workshop delhi ncr',
      'navratri corporate activity ideas',
      '9 colours of navratri office',
      'garba theme workshop delhi',
      'navratri craft workshop for schools',
      'tie dye navratri workshop',
      'navratri team building activity',
    ],
    sections: [
      {
        body: `Most Delhi NCR offices already do some version of the "9 colours of Navratri" tradition — a WhatsApp forward goes around each September with the colour assigned to each of the nine days, and employees try to wear it to work. Navratri Ghatasthapana falls on Sunday, 11 October 2026, and this year Kraftykinni is turning that existing tradition into something teams actually do together, rather than just something they dress for.\n\nTwo workshops are running through the festival window: a **Tie & Dye** session built directly around the 9-colours idea for corporate teams, and a **garba-ready Trinket Tray** for schools and private bookings — a practical place for bangles, jhumkas, and payal to land during nine nights of dandiya. Both are festival-timed variations of workshops [Shramita Govil](/about), a Fevicryl Certified Artist, already runs year-round.`,
      },
      {
        heading: '"9 Colours of Navratri" Tie & Dye — A Corporate Workshop',
        body: `Instead of just asking employees to wear the day's assigned colour, this session gives them something to make in it. Using the regular [Tie & Dye workshop](/workshops/tie-and-dye) format, participants fold, twist, and bind a plain t-shirt, tote bag, or dupatta before applying dye in that day's Navratri colour — so the take-home piece is genuinely tied to the festival rather than an unrelated craft with a colour theme bolted on.\n\nIt keeps everything that makes Tie & Dye work well as a team activity: every piece comes out different, there's no wrong way to fold the fabric, and the result is wearable, so the event stays visible well after the session ends. A session runs 1.5 to 2 hours and scales from 20 people up to 200+, which makes it workable for both a single-department activity and a full-office Navratri celebration.`,
        image: 'https://cdn.kraftykinni.in/assets/tie-and-dye-opt.webp',
        imageAlt: 'Vibrant hand-dyed fabric pieces from a Kraftykinni Tie & Dye workshop, used for a Navratri 9-colours corporate activity in Delhi NCR',
      },
      {
        heading: 'Garba Trinket Tray — A Practical Take on Trinket Tray Painting',
        body: `The second workshop builds on the regular [Trinket Tray Painting workshop](/workshops/trinket-tray). It's a straightforward, functional piece for the festival: nine nights of garba and dandiya means bangles, jhumkas, and payal coming on and off all evening, and a hand-painted tray gives them somewhere to land instead of scattering across a dressing table.\n\nParticipants paint a plain MDF tray with bold colours and patterns — festive motifs like mirror-work borders or Navratri-colour blocking are popular choices, echoing the same mirror-inlay technique used in the [Lippan Art workshop](/workshops/lippan-art) — and take it home ready to use for the festival and afterward as an everyday jewellery or desk tray. It's a shorter session than Tie & Dye, which makes it a good fit for a school craft period or a quicker private-event slot ahead of a garba night.`,
        image: 'https://cdn.kraftykinni.in/assets/trinket-dish-opt.webp',
        imageAlt: 'Hand-painted MDF trinket tray, made in a Kraftykinni workshop as a garba jewellery tray for Navratri in Delhi NCR',
      },
      {
        heading: 'Why This Works for Offices and Schools',
        body: `For offices, the appeal is that it replaces a passive tradition — remembering to wear the right colour — with an active one people actually participate in together, and it photographs well for internal comms without needing a separate photo-contest setup. It also fits neatly alongside a Garba Dance-off or Dandiya Night if HR is already planning one, as a shorter craft slot before the music starts.\n\nFor schools, a garba trinket tray session works well as a pre-festival craft period timed around Navratri colour-days, and gives students something practical to take home rather than a decoration that gets put away after a week. Housing societies and kitty-party groups have also booked the trinket tray as a short activity ahead of their own garba nights.`,
      },
      {
        heading: 'Book a Navratri Workshop in Delhi NCR',
        body: `Kraftykinni runs both the "9 Colours" Tie & Dye and Garba Trinket Tray workshops for corporate teams, schools, and private bookings across Delhi, Gurgaon, and Noida, in the run-up to Navratri on 11 October 2026. Pricing starts at ₹600 per person for groups of 100+, ₹700 for 50–100, and ₹800 for groups of 20–50, all materials included. To check availability before the festival, WhatsApp **+91 9599622210** or see our [corporate workshops page](/corporate-art-workshops) for group bookings.`,
      },
    ],
    faq: [
      {
        q: 'When is Navratri in 2026?',
        a: 'Navratri Ghatasthapana falls on Sunday, 11 October 2026, beginning nine nights of festivities. Offices and schools in Delhi NCR typically book festival workshops in the two to three weeks beforehand.',
      },
      {
        q: 'What is the "9 Colours of Navratri" Tie & Dye workshop?',
        a: 'It is a Navratri variation of Kraftykinni\'s regular Tie & Dye workshop, where participants dye a t-shirt, tote bag, or dupatta in that day\'s assigned Navratri colour, turning the common office tradition of wearing the colour of the day into a hands-on team activity.',
      },
      {
        q: 'What is the Garba Trinket Tray workshop?',
        a: 'It is a themed version of Kraftykinni\'s Trinket Tray Painting workshop — a hand-painted MDF tray, often finished with mirror-work or Navratri-colour patterns, made to hold bangles and jewellery during garba and dandiya nights and used as an everyday jewellery or desk tray afterward.',
      },
      {
        q: 'Is the Tie & Dye workshop suitable for large offices?',
        a: 'Yes. It scales from 20 participants up to 200+, runs 1.5 to 2 hours, and needs no prior experience, which makes it workable for a single team or a full-office Navratri celebration.',
      },
      {
        q: 'How do I book a Navratri workshop before October 11?',
        a: 'WhatsApp +91 9599622210 with your preferred date, location (Delhi, Gurgaon, or Noida), and group size. Booking two to three weeks ahead of Navratri is recommended since this is a high-demand festival window.',
      },
    ],
  },
  {
    slug: 'daughters-day-personalised-gifts-workshop-delhi-ncr',
    title: "Daughter's Day — Personalised Craft Gifts and Keepsakes in Delhi NCR",
    metaTitle: 'Daughter\'s Day Gift Ideas Delhi NCR | Kraftykinni',
    metaDescription:
      'Daughter\'s Day gift ideas in Delhi NCR: handmade, personalised custom canvas art, clay keepsakes and made-to-order nameplates.',
    publishDate: '2026-09-24',
    updatedDate: '2026-10-26',
    category: 'Private Events' as const,
    relatedWorkshop: 'boho-canvas',
    excerpt:
      "Daughter's Day falls on the last Sunday of September every year. Kraftykinni puts together a few different ways to mark it — a personalised canvas piece, a hand-sculpted clay keepsake, and made-to-order nameplates and monogram wall hangings — for anyone who'd rather give something made than bought.",
    keywords: [
      "daughter's day gift ideas delhi",
      'personalised gifts for daughter delhi ncr',
      'custom nameplate gift delhi',
      'handmade gift for daughter',
      "daughter's day workshop delhi",
      'monogram wall hanging gift',
    ],
    sections: [
      {
        body: `India's Daughter's Day falls on the last Sunday of September every year. It's a quieter occasion than Mother's Day or Father's Day, and gifting for it tends to default to flowers or a card. Kraftykinni puts together a few handmade alternatives instead, split across two different ways of getting one: a guided private workshop session, or a made-to-order custom piece.`,
      },
      {
        heading: 'A Personalised Canvas Piece — Boho Canvas Art',
        body: `The regular [Boho Canvas Art workshop](/workshops/boho-canvas) is normally an abstract, earthy-tone painting format — but for a private Daughter's Day booking, it can be taken further into a fully personalised portrait piece, like the one shown here: a hand-painted character with a floral crown, built specifically for the person receiving it rather than following the usual abstract template.\n\nA private one-on-one or small-group session runs 1.5 to 2 hours, with no drawing experience needed — the guided format works the same way whether the result is an abstract composition or a custom character design like this.`,
        image: 'https://cdn.kraftykinni.in/assets/daughters-day-boho-girl-canvas-kraftykinni.webp',
        imageAlt: "Hand-painted personalised boho-style canvas art with a floral crown character, a customised Daughter's Day gift from Kraftykinni",
      },
      {
        heading: 'A Clay Keepsake — Personalised Photo Charm',
        body: `Built on the regular [Clay Art workshop](/workshops/clay-art), this variation sculpts a small hand-painted clay frame around a photo — in this case, a heart-accented charm holding a baby photo. It's a genuinely different kind of keepsake from a printed photo frame, since every border, dot, and heart is shaped by hand rather than moulded or mass-produced.\n\nLike the standard Clay Art format, it's a tactile, guided session — the personalisation is in the photo and the colours chosen, not in a different technique.`,
        image: 'https://cdn.kraftykinni.in/assets/daughters-day-baby-photo-clay-charm-kraftykinni.webp',
        imageAlt: "Hand-sculpted clay photo charm with a heart accent, holding a personalised baby photo, a Kraftykinni Clay Art keepsake",
      },
      {
        heading: 'Made-to-Order: Personalised Name Letters and Monogram Wall Hangings',
        body: `These two are different from the workshops above — they're made-to-order pieces, not a group session you book. Personalised wooden name letters, hand-painted individually with a different pattern or theme on each letter, make a name-spelling wall display. A monogram wall hanging takes a single initial and builds a small hand-painted scene inside it — in this example, a tiny bookshelf tucked into the letter "S".\n\nBoth are commissioned individually rather than taught as a workshop, so pricing depends on the number of letters, size, and design detail. To order one for Daughter's Day, WhatsApp Kraftykinni directly with the name or initial you'd like and a sense of the style — there's no group booking process for these, just a direct conversation about what you want made.`,
        image: 'https://cdn.kraftykinni.in/assets/daughters-day-personalised-name-letters-kraftykinni.webp',
        imageAlt: "Hand-painted personalised wooden name letters with floral, donut, and ocean designs, a made-to-order Kraftykinni keepsake",
      },
      {
        heading: 'Monogram Wall Hangings',
        body: `A monogram wall hanging takes the same made-to-order approach but built around a single initial instead of a full name. The letter becomes a small shadow-box scene — in this example, a tiny hand-painted bookshelf, complete with tiny books, a plant, and a star, tucked inside the letter "S". It works well as a standalone piece for a bedroom or study, or alongside the name letters as a matched pair.`,
        image: 'https://cdn.kraftykinni.in/assets/daughters-day-monogram-wall-hanging-kraftykinni.webp',
        imageAlt: "Hand-painted monogram wall hanging shaped like the letter S with a tiny bookshelf scene inside, a made-to-order Kraftykinni piece",
      },
      {
        heading: "Book a Workshop or Order a Custom Piece",
        body: `For the Boho Canvas Art or Clay Art sessions, private bookings in Delhi, Gurgaon, and Noida start at ₹600–800 per person depending on group size, all materials included — WhatsApp **+91 9599622210** with your preferred date and group size. For a made-to-order nameplate or monogram wall hanging, message the same number directly with the name/initial and design you have in mind for a custom quote — these are made individually rather than priced per person.`,
      },
    ],
    faq: [
      {
        q: "When is Daughter's Day?",
        a: "India's Daughter's Day falls on the last Sunday of September every year.",
      },
      {
        q: 'Can the Boho Canvas Art workshop be personalised into a portrait, not just an abstract design?',
        a: 'Yes — for private bookings, the Boho Canvas Art format can be adapted into a fully personalised character or portrait piece rather than the usual abstract composition, built specifically around the person receiving it.',
      },
      {
        q: 'What is the personalised clay photo charm?',
        a: 'It is a variation of the Clay Art workshop where a small hand-painted clay frame is sculpted around a chosen photo, finished with decorative details like a heart accent — a handmade alternative to a printed photo frame.',
      },
      {
        q: 'Are the personalised name letters and monogram wall hangings a workshop I can book?',
        a: "No — these are made-to-order pieces Kraftykinni creates individually, not a group workshop. WhatsApp +91 9599622210 directly with the name or initial and design you'd like for a custom quote.",
      },
      {
        q: "How do I book a Daughter's Day workshop or order a custom piece?",
        a: 'WhatsApp +91 9599622210. For the Boho Canvas Art or Clay Art private workshops, share your preferred date, location, and group size. For a custom nameplate or monogram wall hanging, share the name/initial and design you want instead.',
      },
    ],
  },
  {
    slug: 'world-mental-health-day-art-workshop-delhi-ncr',
    title: "World Mental Health Day 2026: Art Workshops for Stress Relief in Delhi NCR",
    metaTitle: 'World Mental Health Day Art Workshop Delhi NCR | Kraftykinni',
    metaDescription:
      'World Mental Health Day is 10 October. Guided mandala, clay and Lippan art breaks for teams, schools and adults in Delhi, Gurgaon and Noida. Book now.',
    publishDate: "2026-09-29",
    category: 'Workshop Guides' as const,
    relatedWorkshop: 'mandala-art',
    excerpt:
      "World Mental Health Day falls on Saturday, 10 October 2026, and this year's theme is about listening. Kraftykinni looks at how a guided, screen-free art break — dot mandala, clay, Lippan and rope art — can give teams, schools and adults a calm hour, and where a creative session stops and professional support begins.",
    keywords: [
      "world mental health day workshop delhi",
      "stress relief art workshop delhi ncr",
      "corporate wellness workshop gurgaon",
      "mandala art for stress relief",
      "art activity for employee wellbeing",
      "mindfulness art workshop noida",
      "creative wellbeing workshop for schools delhi",
    ],
    sections: [
      {
        body: `World Mental Health Day is observed every year on 10 October — this year that is Saturday, 10 October 2026. For most workplaces and schools it passes with a poster, an email, or a short talk. Kraftykinni's take is simpler: give people a genuine, screen-free hour to slow down, use their hands, and sit next to each other without a meeting agenda.\n\nThis post covers what a guided art break can and cannot do, which Kraftykinni workshops suit that purpose best, and how teams, schools and adults across Delhi, Gurgaon and Noida can book one. A quick note up front: these are creative sessions, not therapy or treatment, and they are not a substitute for professional mental health support.`,
      },
      {
        heading: "This Year's Theme: Lived Experiences Heard",
        body: `The World Federation for Mental Health has set the 2026 theme as ["Lived Experiences Heard: Real Voices, Real Change"](https://wfmh.global/news/2026.26-08-11_world-mental-health-day-2026). It is a theme about listening to people's own accounts of what they go through, rather than talking over them.\n\nAn art session cannot do that work on its own. What it can do is create a low-pressure setting where colleagues, classmates or friends are side by side, hands busy, and conversation happens naturally instead of being forced. Many people find it easier to talk while they are doing something with their hands, and a group art activity gives that setting without anyone being put on the spot.`,
      },
      {
        heading: "Why a Hands-On Creative Break Helps People Slow Down",
        body: `Most working days are made of screens, notifications and back-to-back calls. A guided art session is close to the opposite: one task, one surface, materials in front of you, and no way to multitask. Slow, repetitive, tactile work — placing dots, pressing clay, coiling rope — gives attention somewhere gentle to rest, and many participants describe coming out of a session calmer and more talkative than they went in.\n\nKraftykinni's sessions are built around that idea. There is no grading, no prior experience needed, and every participant ends the hour with a finished object of their own. That low-stakes, visible result is a large part of why people leave a session feeling lighter rather than drained.`,
      },
      {
        heading: "Dot Mandala Art — A Desk-Side Reset for Teams",
        body: `If you want a single workshop for World Mental Health Day, [Dot Mandala Art](/workshops/mandala-art) is the most natural fit. Participants use fine dotting tools and acrylic paint to build a symmetrical pattern one dot at a time on a round wooden base. It cannot be rushed, which is exactly why it works as a pause.\n\nKraftykinni ran this format for a 20-person team at an office in Noida Sector 90, set up desk-side so nobody had to travel anywhere. Laptops were closed, the floor got quieter, and by the end managers and analysts were comparing dot spacing rather than checking inboxes. The full account is in the [Noida dot mandala case study](/blog/dot-mandala-art-corporate-workshop-noida).`,
        image: "https://cdn.kraftykinni.in/noida-corporate-dot-mandala-workshop-group-kraftykinni.webp",
        imageAlt: "A 20-person corporate team in Noida holding up their finished hand-painted dot mandala artworks after a Kraftykinni desk-side workshop",
      },
      {
        body: `The sessions are guided step by step, so participants with no art background still finish a complete, symmetric piece. Sessions can run in about an hour for a focused break, or up to 1.5 to 2 hours with a demonstration and more detailed designs.`,
        image: "https://cdn.kraftykinni.in/corporate-dot-mandala-workshop-in-progress-kraftykinni.webp",
        imageAlt: "Corporate team members using dotting tools and acrylic paint to build dot mandala art at their desks during a Kraftykinni workshop in Noida",
      },
      {
        heading: "Clay Art — Tactile and Grounding",
        body: `For groups that prefer to work with their hands rather than a brush, [Clay Art](/workshops/clay-art) is a good alternative. Participants shape and paint small air-dry clay pieces using Fevicryl Mouldit, and the physical act of pressing, rolling and shaping tends to be absorbing in a way that screen work is not. It suits school groups, adult hobby sessions and corporate teams equally, and it needs no experience.\n\nMany participants say the tactile side is what they enjoy most, and the session ends with a keepsake they made themselves rather than something bought.`,
      },
      {
        heading: "Lippan Art and Wall Rope Art — Slow, Repetitive, Absorbing",
        body: `Two of Kraftykinni's heritage-style workshops are especially good for a calm, unhurried session. In [Lippan Art](/workshops/lippan-art), participants build raised clay patterns and place small mirrors by hand, following the Kutch folk tradition. In [Wall Rope Art](/workshops/wall-rope-art), cotton rope is coiled into a spiral and painted, which is repetitive and focused in a similar way.\n\nBoth formats reward patience over skill, and both leave participants with a piece they can hang at home or at their desk.`,
        image: "https://cdn.kraftykinni.in/assets/lippan-art-opt.webp",
        imageAlt: "Hand-finished Lippan Art clay and mirror work piece from a Kraftykinni workshop in Delhi NCR",
      },
      {
        heading: "Who These Sessions Are For",
        body: `**Corporate teams.** A desk-side or boardroom session is an easy way to mark World Mental Health Day without booking an offsite. Kraftykinni brings all materials and handles setup and cleanup, for groups from 20 to 200+. See the [corporate art workshops page](/corporate-art-workshops), or the pages for [employee engagement in Gurgaon](/employee-engagement-activities-gurgaon) and [employee engagement in Noida](/employee-engagement-activities-noida).\n\n**Schools.** Mental Health Day is a good prompt for a calm, non-competitive creative period in place of a regular class. Students can work on Mandala, Clay or Rope Art in a guided format that suits mixed abilities. Details are on the [school art workshops page](/school-art-workshops).\n\n**Adults, friends and kitty parties.** Not everyone has a company or a school to organise this for them. A small private session for friends, a community group or a kitty party is a relaxed way to spend a Saturday, and no drawing experience is needed. See the [private art workshops page](/private-art-workshops).`,
      },
      {
        heading: "A 10-Minute Dot Pattern You Can Try at Your Desk",
        body: `You do not need a workshop to try the basic idea. Here is a short, free version you can do today with a pen and a sheet of paper:`,
        listType: 'ol',
        listItems: [
          "Draw a small circle in the middle of the page and fill it with a few evenly spaced dots.",
          "Draw a ring of dots around it, keeping the spacing as even as you can.",
          "Keep adding rings outward, changing the dot size or the spacing on each ring.",
          "Breathe slowly, and only focus on the next dot — not on how the whole thing will look.",
          "Stop after ten minutes, whether or not it is finished.",
        ],
        image: "https://cdn.kraftykinni.in/dot-mandala-art-finished-pieces-corporate-kraftykinni.webp",
        imageAlt: "Two finished dot mandala artworks — one blue and white wave pattern, one colourful abstract design — held up by a workshop participant in Noida",
      },
      {
        heading: "Book a World Mental Health Day Session",
        body: `Kraftykinni runs Dot Mandala Art, Clay Art, Lippan Art and Wall Rope Art sessions across Delhi, Gurgaon and Noida. Corporate pricing starts at ₹600 per person for groups of 100+, ₹700 per person for 50–100, and ₹800 per person for 20–50, all materials included. Private and school bookings start at ₹600–800 per person depending on group size.\n\nBecause 10 October is a Saturday, most offices and schools will want a session in the days around it. Booking a week or two ahead is recommended. To check availability, WhatsApp **+91 9599622210** with your preferred date, location and group size.`,
      },
      {
        heading: "If You Need More Than a Creative Break",
        body: `An art session can be a good pause, but it is not treatment. If you or someone you know is struggling with low mood, anxiety, or thoughts of self-harm, please speak to a qualified professional or a trusted person. In India, Tele-MANAS offers free, confidential, 24/7 support in multiple languages on **14416** (or 1800-891-4416).`,
      },
    ],
    faq: [
      {
        q: "When is World Mental Health Day 2026?",
        a: "World Mental Health Day is observed every year on 10 October. In 2026 it falls on Saturday, 10 October.",
      },
      {
        q: "What is the theme of World Mental Health Day 2026?",
        a: "The World Federation for Mental Health has set the 2026 theme as \"Lived Experiences Heard: Real Voices, Real Change\".",
      },
      {
        q: "Can an art workshop help with stress?",
        a: "Many people find a guided, screen-free art session a calming break, because slow and repetitive making gives attention somewhere gentle to rest. It is a relaxing activity, not a medical treatment, and it does not replace professional support.",
      },
      {
        q: "Do I need art experience to join a wellbeing workshop?",
        a: "No. Kraftykinni sessions are guided step by step and rely on patience rather than drawing skill, so participants with no art background finish a complete piece.",
      },
      {
        q: "Which Kraftykinni workshop is best for a calming team activity?",
        a: "Dot Mandala Art is the most popular choice for a calm team reset because it is slow, structured and easy to run desk-side. Clay Art, Lippan Art and Wall Rope Art are also good, tactile options.",
      },
      {
        q: "Can Kraftykinni run a session at our office or school in Delhi, Gurgaon or Noida?",
        a: "Yes. Kraftykinni brings all materials and runs sessions at your office, school or venue across Delhi, Gurgaon and Noida. WhatsApp +91 9599622210 with your date, location and group size.",
      },
      {
        q: "Is an art workshop a substitute for therapy?",
        a: "No. Art sessions are creative and relaxing, but they are not therapy or treatment. If you are struggling, please speak to a qualified professional. In India, Tele-MANAS offers free 24/7 support on 14416.",
      },
    ],
  },
  {
    slug: 'diwali-art-workshop-schools-societies-delhi-ncr',
    title: "Diwali Art Workshop in Delhi NCR for Schools, Colleges, Cafés and Home Groups",
    metaTitle: 'Diwali Art Workshop Delhi NCR: Schools, Groups | Kraftykinni',
    metaDescription:
      'Book a Diwali art workshop in Delhi NCR for schools, colleges, cafés, societies and home groups. Diya painting, Lippan and Madhubani, ₹600–₹800/person.',
    publishDate: '2026-10-03',
    category: 'School & College' as const,
    relatedWorkshop: 'clay-art',
    excerpt:
      "Diwali falls on Sunday, 8 November 2026. Here is how schools, colleges, cafés, residential societies and home groups of 10 or more can book a Diwali art workshop in Delhi NCR: three formats, group sizes, pricing and booking deadlines.",
    keywords: [
      "diwali art workshop delhi ncr",
      "diwali workshop for schools delhi ncr",
      "diya painting workshop delhi ncr",
      "diwali craft workshop for societies delhi",
      "diwali workshop for colleges delhi",
      "madhubani coaster painting workshop",
      "lippan mirror tealight holder workshop",
      "diwali art activity for home groups delhi",
    ],
    sections: [
      {
        body: `Diwali falls on Sunday, 8 November 2026. If you are organising a Diwali art workshop in Delhi NCR for a school, a college fest, a café, a residential society or a group of friends and family, this guide covers the three Diwali formats Kraftykinni runs for these groups: Diya Painting, the Lippan Mirror Tealight Holder and Madhubani Art Coasters.\n\nEvery session is guided step by step by [Shramita Govil](/about), a Fevicryl Certified Artist, with all materials included and no prior art experience needed. Looking for an office celebration instead? See our guide to [Diwali workshop ideas for offices](/blog/corporate-diwali-celebration-ideas-delhi-ncr).`,
      },
      {
        heading: "Who Books a Diwali Art Workshop",
        body: `**Schools** run Diya Painting or Madhubani Art Coasters as a Diwali craft period. Kraftykinni's school workshops cover students from Grade 3 through college level, and the facilitator travels to your school. The [school art workshops page](/school-art-workshops) has group formats and pricing.\n\n**Colleges** book a live Diya Painting or coaster-painting stall as part of an annual Diwali Mela.\n\n**Cafés** book Diya Painting or Diwali Jar Painting as a festive pop-up session for customers, a sip-and-craft format alongside chai and Diwali snacks.\n\n**Residential societies and community groups** book a private session at a club, community hall or residential complex, so neighbours can make something together for Diwali.\n\n**Home groups of 10 or more**, whether family, friends or a kitty party, book a session in a living room or a rented venue. Kraftykinni brings all the supplies and you provide tables, chairs and good lighting. Details are on the [private art workshops page](/private-art-workshops).`,
      },
      {
        heading: "Three Diwali Art Workshop Formats for Schools and Groups",
        body: `These are the same three formats that appear in our guide for offices, with notes here for schools, colleges, cafés, societies and home groups. In each one, every participant finishes a piece to take home.`,
      },
      {
        heading: "1. Diya Painting",
        body: `**Duration:** 60–75 minutes · **Take-home:** Yes\n\nParticipants hand-paint clay diyas with acrylic colours, floral motifs and metallic detailing, using the same [Clay Art](/workshops/clay-art) technique. There is no wheel and no kiln, and every design comes out different. It is our most-requested Diwali format, and at 60–75 minutes it is one of the shorter ones, which suits a school period or a stall at a college Diwali Mela.`,
        image: "https://cdn.kraftykinni.in/assets/diwali-diya-painting-opt.webp",
        imageAlt: "Hand-painted clay diyas with festive floral detailing — Diwali diya painting workshop — Delhi NCR — Kraftykinni",
      },
      {
        heading: "2. Lippan Mirror Tealight Holder",
        body: `**Duration:** 75–90 minutes · **Take-home:** Yes\n\nParticipants build a round mirror-inlay plate around a central tealight, using the same [Lippan Art](/workshops/lippan-art) technique, the mud-and-mirror inlay work from Kutch, Gujarat. It is a good option when a group has already done diya painting before and wants something that still feels festive but different.`,
        image: "https://cdn.kraftykinni.in/assets/lippan-tealight-holder-opt.webp",
        imageAlt: "Lippan mirror-work Diwali tealight holder plate — Lippan Art workshop — Delhi NCR — Kraftykinni",
      },
      {
        heading: "3. Madhubani Art Coasters",
        body: `**Duration:** 60–90 minutes · **Take-home:** Yes\n\nParticipants hand-paint a Madhubani folk-art design onto a set of wooden coasters. Elephants, fish and birds are popular motifs. It gives a school or college group a cultural-heritage angle, along with a functional piece that people actually use at home.`,
        image: "https://cdn.kraftykinni.in/assets/madhubani-art-coasters-opt.webp",
        imageAlt: "Hand-painted Madhubani art coasters with elephant, fish and bird motifs — Diwali workshop — Delhi NCR — Kraftykinni",
      },
      {
        heading: "Which Diwali Format Fits Your Group",
        body: `A quick way to narrow the three down:`,
        listItems: [
          "School Diwali craft period → Diya Painting or Madhubani Art Coasters",
          "College Diwali Mela stall → Diya Painting or Madhubani Art Coasters",
          "Café festive pop-up → Diya Painting or Diwali Jar Painting",
          "Residential society or home group that wants a display piece → Lippan Mirror Tealight Holder",
          "Shorter slot → Diya Painting (60–75 minutes)",
          "Cultural or heritage angle → Madhubani Art Coasters",
          "Did diya painting last year → Lippan Mirror Tealight Holder",
        ],
      },
      {
        heading: "Group Size, Pricing and Notice for Diwali Workshops",
        body: `The terms depend on who is booking.\n\n**Schools and colleges:** groups from 20 students up to 200+. Pricing is ₹800 per student for 20–50 students, ₹700 for 50–100 and ₹600 for 100+, all materials included. Minimum 7 days' advance notice, with a 50% deposit to confirm the booking.\n\n**Residential societies and home groups (private bookings):** groups from 10 participants upward. Pricing is ₹600–₹800 per person regardless of group size, all materials included. Minimum 5 days' notice, with a 50% deposit to confirm your date.\n\n**Cafés:** share your date and the expected number of participants when you enquire, and we will confirm the details for a pop-up session.\n\nThe final quote depends on the format, group size and materials you choose.`,
      },
      {
        heading: "Booking Deadlines for Diwali 2026",
        body: `Diwali is on Sunday, 8 November 2026. The notice periods above count back from your event date, not from Diwali itself. A session held on Diwali Sunday needs a private booking by **Tuesday, 3 November** (5 days' notice) or a school or college booking by **Sunday, 1 November** (7 days' notice).\n\nThose are minimums, not recommendations. Weekend dates fill first, and for private groups we suggest booking about two weeks ahead for a Saturday. For Saturday, 7 November, that means enquiring by around 24 October.`,
      },
      {
        heading: "How a Diwali Art Workshop Works",
        body: `**Before the event**: you choose the format, group size, date and venue.\n\n**On the day**: Kraftykinni brings all the materials. [Shramita Govil](/about) demonstrates the technique and then guides everyone step by step. For private bookings you only need to provide tables, chairs and adequate lighting.\n\n**At the end**: every participant finishes a piece to take home. Kraftykinni has run 50+ workshops for 1,500+ participants across Delhi, Gurgaon and Noida.`,
      },
      {
        heading: "Book a Diwali Art Workshop",
        body: `To check availability, WhatsApp **+91 9599622210** with your school, society, café or group name, the expected number of participants, your location (Delhi, Gurgaon or Noida), your preferred date and which of the three formats you would like to run.`,
      },
    ],
    faq: [
      {
        q: "When is Diwali in 2026?",
        a: "Diwali (Lakshmi Puja) falls on Sunday, 8 November 2026.",
      },
      {
        q: "What is the minimum group size for a Diwali art workshop?",
        a: "Schools and colleges book from 20 students upward. Private groups such as residential societies and home groups book from 10 participants upward.",
      },
      {
        q: "How much does a Diwali art workshop cost for schools, societies and home groups?",
        a: "For schools and colleges, pricing is ₹800 per student for 20–50 students, ₹700 for 50–100 and ₹600 for 100+. For private groups it is ₹600–₹800 per person regardless of group size. All materials are included, and the final quote depends on the format and materials.",
      },
      {
        q: "How much notice do you need for a Diwali workshop?",
        a: "Schools and colleges need a minimum of 7 days' notice. Private bookings need a minimum of 5 days' notice. A 50% deposit confirms the booking. Weekend dates fill first, so book earlier where you can.",
      },
      {
        q: "Which Diwali workshop is best for school students?",
        a: "Schools typically run Diya Painting or Madhubani Art Coasters as a Diwali craft period. Diya Painting takes 60–75 minutes and Madhubani Art Coasters take 60–90 minutes.",
      },
      {
        q: "Do participants need art experience?",
        a: "No. Every session is guided step by step by Shramita Govil, a Fevicryl Certified Artist, and every participant finishes a piece to take home.",
      },
      {
        q: "Can the workshop be held at our school, society or home?",
        a: "Yes. Kraftykinni brings all materials and runs sessions across Delhi, Gurgaon and Noida. For private bookings you need to provide tables, chairs and adequate lighting.",
      },
      {
        q: "I am organising Diwali for an office. Is this the right page?",
        a: "This guide is for schools, colleges, cafés, societies and home groups. For an office celebration, read our separate guide to Diwali workshop ideas for offices, linked at the top of this post.",
      },
    ],
  },
  {
    slug: 'corporate-art-workshops-delhi-ncr-guide',
    title: "Corporate Art Workshops in Delhi NCR: A Complete Guide to Formats, Cost and Booking",
    metaTitle: 'Corporate Art Workshops: A Delhi NCR Guide | Kraftykinni',
    metaDescription:
      'What a corporate art workshop is, how a session runs, formats, group sizes of 20–200+, cost from ₹600/person and how to book in Delhi, Gurgaon and Noida.',
    publishDate: '2026-10-01',
    category: 'Corporate' as const,
    relatedWorkshop: 'tie-and-dye',
    excerpt:
      "A corporate art workshop is a guided session where every team member makes a finished artwork to keep. This guide explains how a session runs, the formats Kraftykinni offers, group sizes, cost and how to book across Delhi, Gurgaon and Noida.",
    keywords: [
      "corporate art workshops",
      "corporate workshops Delhi NCR",
      "corporate craft workshops",
      "art workshops for corporates",
      "corporate art workshop Delhi NCR",
      "corporate art workshop Gurgaon",
      "corporate art workshop Noida",
      "what is a corporate art workshop",
    ],
    sections: [
      {
        body: `A corporate art workshop is a guided creative session where a team sits down together and each person makes a finished piece of artwork to keep. No drawing skill is needed, because a facilitator walks the whole group through the technique step by step.\n\nThis guide explains what a session looks like, the formats Kraftykinni runs, group sizes, cost and how booking works for teams in Delhi, Gurgaon and Noida. If you are ready to request a quote, our [corporate art workshops](/corporate-art-workshops) page has the full activity list.`,
        image: "https://cdn.kraftykinni.in/noida-corporate-dot-mandala-workshop-group-kraftykinni.webp",
        imageAlt: "Dot mandala art workshop, a 20-person corporate team holding up finished artworks — Noida — Kraftykinni",
      },
      {
        heading: "What Is a Corporate Art Workshop?",
        body: `In a corporate art workshop, a team makes something with its hands, together, in one sitting. Everyone works on the same activity, such as painting a canvas, building a mirror-inlay piece or block-printing fabric. Everyone finishes with an object they made and take home.\n\nCompanies book these sessions for team-building days, employee engagement events, festival celebrations, wellbeing days and large annual days. You may also see them called corporate craft workshops or art workshops for corporates. The format is the same: a facilitated, beginner-friendly session with all materials supplied.`,
      },
      {
        heading: "What Happens in a Session",
        body: `A Kraftykinni session follows the same simple pattern regardless of the activity:`,
        listItems: [
          "Kraftykinni brings every art supply and sets up before the session. Your venue only needs tables and chairs.",
          "Shramita Govil, a Fevicryl Certified Artist, demonstrates the technique to the whole group.",
          "Participants work step by step with guidance. No prior art experience is assumed.",
          "Every participant finishes a piece and takes it home.",
          "Kraftykinni cleans up afterwards.",
        ],
        listType: 'ol',
      },
      {
        heading: "Corporate Art Workshop Formats",
        body: `Sessions run between 1 and 2.5 hours depending on the activity. Here are the formats grouped by the duration listed on each workshop page.\n\n**1 to 1.5 hours:** [Rock Painting](/workshops/rock-painting).\n\n**1.5 to 2 hours:** [Mandala Art](/workshops/mandala-art), [Tie & Dye](/workshops/tie-and-dye), [Boho Canvas Art](/workshops/boho-canvas), [Bottle Lamp Art](/workshops/bottle-lamp-art), [Block Printing](/workshops/block-printing), [Clay Art](/workshops/clay-art), [Glass Painting](/workshops/glass-painting), [Texture Art](/workshops/texture-art), [Tote Bag Painting](/workshops/tote-bag-painting), [Trinket Tray Painting](/workshops/trinket-tray), [MDF Fridge Magnet](/workshops/mdf-fridge-magnet), [Canvas Pouch Painting](/workshops/canvas-pouch), [Botanical Dyeing Printing](/workshops/botanical-dyeing-printing), [Cap Painting](/workshops/cap-painting) and [Mirror Painting](/workshops/mirror-painting).\n\n**2 to 2.5 hours:** [Lippan Art](/workshops/lippan-art), [Wall Rope Art](/workshops/wall-rope-art), [Umbrella Painting](/workshops/umbrella-painting), [Canvas Pearl Art](/workshops/canvas-pearl-art) and [Clay Mirror Art](/workshops/clay-mirror-art).`,
        image: "https://cdn.kraftykinni.in/cars24-trinket-workshop-in-progress.jpeg",
        imageAlt: "Facilitator guiding a participant hand-painting a clay trinket at a corporate office art workshop — Gurgaon — Kraftykinni",
      },
      {
        heading: "How to Choose a Format",
        body: `Kraftykinni recommends an activity based on your group size, the tone of the event and the time you have. As a starting point:`,
        listItems: [
          "Most requested for corporate groups → Lippan Art, Mandala Art or Boho Canvas Art",
          "Outdoor or high-energy events → Tie & Dye",
          "Branded gifting → Tote Bag Painting or Canvas Pouch Painting",
          "A calm desk-side reset → Dot Mandala Art, a variation of Mandala Art",
          "A short slot → Rock Painting, or a desk-side Dot Mandala session of about an hour",
        ],
      },
      {
        heading: "Real Examples From Delhi NCR Offices",
        body: `**Gurgaon:** 40 Cars24 employees made hand-painted clay trinkets with Fevicryl Mouldit at their office in a session of about two hours. Read the full [Cars24 Gurgaon case study](/blog/clay-trinket-painting-workshop-cars24-gurgaon).\n\n**Noida:** a 20-person team at a Sector 90 office ran a desk-side Dot Mandala Art session at their own workstations, with no offsite venue. Read the [Noida dot mandala case study](/blog/dot-mandala-art-corporate-workshop-noida).\n\nLooking for a ranked list of team activities rather than an explainer? Our guide to [team building activities in Gurgaon](/blog/best-corporate-team-building-activities-gurgaon-2026) compares art workshops with other options. Teams planning broader programmes can also see the pages on [employee engagement activities in Gurgaon](/employee-engagement-activities-gurgaon) and [employee engagement activities in Noida](/employee-engagement-activities-noida).`,
      },
      {
        heading: "Group Size and Venue",
        body: `Kraftykinni's corporate sessions are for teams of 20 to 200+ participants across Delhi, Gurgaon and Noida. The large-group format is designed for 100 to 200+ participants, and additional facilitators are brought in if required.\n\nSessions can run at your office, a rented venue, a hotel banquet hall or an outdoor space, on any day of the week including weekends. For distributed teams, Kraftykinni also runs live online sessions pan-India, with the materials shipped to each participant.`,
      },
      {
        heading: "What a Corporate Art Workshop Costs",
        body: `Pricing is per person and scales with group size, with all materials included:\n\n**₹800 per person** for groups of 20–50, **₹700** for 50–100 and **₹600** for 100+.\n\nFinal pricing depends on customisation. Most activities can be aligned to your brand palette or event theme, and Tote Bag Painting and Canvas Pouch Painting are particularly popular as branded gifting workshops.`,
        image: "https://cdn.kraftykinni.in/corporate-workshop-coaster-painting-closeup-kraftykinni.webp",
        imageAlt: "Close-up of corporate participants hand-painting a coaster together at an art workshop — Delhi NCR — Kraftykinni",
      },
      {
        heading: "How Booking Works",
        body: `Booking a corporate art workshop takes four steps:`,
        listItems: [
          "Share your team size, location, preferred date and the activity you have in mind.",
          "Kraftykinni recommends a format that fits your group size, event tone and time available.",
          "Confirm the date with a minimum of 7 days' notice and a 50% deposit. UPI, bank transfer and cash are accepted.",
          "On the day, Kraftykinni brings the materials, runs the session and cleans up.",
        ],
        listType: 'ol',
      },
      {
        heading: "Plan a Corporate Art Workshop for Your Team",
        body: `See the activities, pricing and logistics on our [corporate art workshops](/corporate-art-workshops) page. To check availability, WhatsApp **+91 9599622210** with your team size, location (Delhi, Gurgaon or Noida), preferred date and the activity you would like to run.`,
      },
    ],
    faq: [
      {
        q: "What is a corporate art workshop?",
        a: "A corporate art workshop is a guided creative session where a team makes a finished piece of artwork together, led by a facilitator. Kraftykinni supplies all materials, and every participant takes their piece home.",
      },
      {
        q: "How long does a corporate art workshop take?",
        a: "Most activities run 1.5 to 2.5 hours depending on the format. Rock Painting is shorter at 1 to 1.5 hours, and a desk-side Dot Mandala session can run in about an hour for a focused group activity.",
      },
      {
        q: "How many people can join a corporate art workshop?",
        a: "Kraftykinni runs corporate sessions for 20 to 200+ participants. The large-group format is designed for 100 to 200+ participants, with additional facilitators brought in if required.",
      },
      {
        q: "Do employees need art experience?",
        a: "No. Every session is guided step by step by a Fevicryl Certified Artist, so participants of any ability finish a piece they are proud of.",
      },
      {
        q: "How much does a corporate art workshop cost in Delhi NCR?",
        a: "Pricing is ₹800 per person for groups of 20–50, ₹700 for 50–100 and ₹600 for 100+, all materials included. Final pricing depends on customisation.",
      },
      {
        q: "Can the workshop be held at our office, off-site or online?",
        a: "Yes. Sessions run at your office, a rented venue, a hotel banquet hall or an outdoor space, on any day including weekends. Live online sessions are available pan-India with materials shipped to each participant.",
      },
      {
        q: "Can we add our company branding?",
        a: "Yes. Kraftykinni can work with your brand palette and theme across most activities, and Tote Bag Painting and Canvas Pouch Painting are particularly popular as branded gifting workshops.",
      },
      {
        q: "How far in advance should we book?",
        a: "A minimum of 7 days' notice is required, along with a 50% deposit to confirm the date.",
      },
    ],
  },
  {
    slug: 'mandala-art-workshop-delhi-ncr-beginners-guide',
    title: "Mandala Art Workshop in Delhi NCR: A Beginner's Guide to Making Your First Mandala",
    metaTitle: 'Mandala Art Workshop Delhi NCR: Beginner Guide | Kraftykinni',
    metaDescription:
      'New to mandala art? See how a guided mandala workshop works in Delhi NCR: no experience needed, 1.5–2 hours, ₹600–₹800/person, all materials included.',
    publishDate: '2026-10-06',
    category: 'Workshop Guides' as const,
    relatedWorkshop: 'mandala-art',
    excerpt:
      "A beginner's guide to the Kraftykinni Mandala Art workshop: what mandala art is, how a guided session runs, what you take home, and how teams across Delhi, Gurgaon and Noida book one.",
    keywords: [
      "mandala art workshop",
      "mandala art workshop Delhi NCR",
      "mandala art classes Delhi NCR",
      "mandala painting workshop Delhi",
      "beginner mandala art",
      "dot mandala art workshop",
      "mandala art for stress relief",
      "corporate mandala workshop",
    ],
    sections: [
      {
        body: `If you have never picked up a dotting tool, a mandala workshop is one of the easiest places to start. You build a symmetrical pattern from the centre outward, one repeated shape at a time, and a facilitator guides you through every step. No drawing skill is needed.\n\nThis beginner's guide explains what mandala art is, how a Kraftykinni session runs, what you take home and how to book a [Mandala Art workshop](/workshops/mandala-art) for your team, school or group in Delhi, Gurgaon and Noida.`,
        image: "https://cdn.kraftykinni.in/dot-mandala-sunset-artwork-corporate-kraftykinni.webp",
        imageAlt: "Finished dot mandala artwork in warm sunset colours held up by a workshop participant — Noida — Kraftykinni",
      },
      {
        heading: "What Is Mandala Art?",
        body: `Mandala art is the practice of creating symmetrical, circular patterns that radiate outward from a central point, using repeating shapes, dots and colours. The word mandala comes from Sanskrit and means "circle".\n\nIn Kraftykinni's workshop, participants build their own mandala from the centre outward with dotting tools and brushes. Because the pattern is structured and repetitive, it gives you a clear next step at every point, which is why beginners tend to feel at ease with it.`,
      },
      {
        heading: "Mandala Art vs Dot Mandala Art",
        body: `The two names are closely related. Dot Mandala Art is a variation of the Mandala Art workshop that is built entirely from dots rather than brush strokes. Participants use fine dotting tools and acrylic paint to build the pattern one dot at a time, on a round wooden or MDF base rather than canvas.\n\nIt is slower and more meditative than free-hand painting, because a dot mandala cannot be rushed. You can read how this played out for a real team in our [Noida dot mandala case study](/blog/dot-mandala-art-corporate-workshop-noida).`,
      },
      {
        heading: "Do You Need Art Experience?",
        body: `No. Shramita Govil, a Fevicryl Certified Artist, guides the group step by step from the very first dot. The structured, symmetrical nature of mandala art means every participant ends up with a finished piece, whatever their background in art.`,
      },
      {
        heading: "What Happens in a Mandala Art Session",
        body: `A session runs for 1.5 to 2 hours and moves at a relaxed pace. Participants work at their own speed and finish when they are satisfied with the piece.`,
        listItems: [
          "A brief introduction to the art form.",
          "A guided demonstration of the technique.",
          "Hands-on creation, building your mandala from the centre outward with dotting tools, colours and repeating patterns.",
          "Kraftykinni brings all materials, and every participant takes their finished mandala home.",
        ],
        listType: 'ol',
        image: "https://cdn.kraftykinni.in/corporate-dot-mandala-workshop-in-progress-kraftykinni.webp",
        imageAlt: "Team members using dotting tools and acrylic paint to build dot mandala art at their desks during a workshop — Noida — Kraftykinni",
      },
      {
        heading: "What You Take Home",
        body: `Every participant completes a colourful, symmetric mandala on canvas or paper. It is display-ready, so it works as a piece for a desk or a wall, or as a gift. The dot mandala format is painted on a round wooden base instead.\n\nBecause each person chooses their own colours and patterns, no two finished pieces look alike, even when the whole group starts from the same technique.`,
        image: "https://cdn.kraftykinni.in/dot-mandala-art-finished-pieces-corporate-kraftykinni.webp",
        imageAlt: "Two finished dot mandala artworks, one blue and white wave pattern and one colourful abstract design — Noida — Kraftykinni",
      },
      {
        heading: "Who Books a Mandala Art Workshop",
        body: `The workshop is a popular pick for corporate wellness sessions, mental health awareness events, school art days and team-building retreats. Many HR teams book it as a calm, screen-free break during busy periods.\n\nA guided art break gives people a slow, hands-on hour. It is a creative session, not therapy or treatment, and it does not replace professional mental health support. For ideas around that theme, see our guide to [art workshops for stress relief in Delhi NCR](/blog/world-mental-health-day-art-workshop-delhi-ncr). Teams can see how the formats compare on our [corporate art workshops](/corporate-art-workshops) page.`,
      },
      {
        heading: "Group Size, Cost and Booking",
        body: `Kraftykinni runs Mandala Art workshops for groups of 20 to 200+ participants across Delhi, Gurgaon and Noida, at your venue. Pricing is ₹600–₹800 per person with all materials included. Online Mandala Art sessions with shipped kits are also available pan-India.\n\nFor corporate bookings, Kraftykinni asks for a minimum of 7 days' notice and a 50% deposit to confirm the date.`,
      },
      {
        heading: "Book a Mandala Art Workshop",
        body: `To check availability, WhatsApp **+91 9599622210** with your group size, location (Delhi, Gurgaon or Noida), preferred date and whether you would like Mandala Art or the dot mandala format. You can also read more about [Shramita Govil and Kraftykinni](/about).`,
      },
    ],
    faq: [
      {
        q: "What is a mandala art workshop?",
        a: "A mandala art workshop is a guided session where participants build a symmetrical, circular pattern from the centre outward using dotting tools, brushes and colours. Kraftykinni supplies all materials and every participant takes their finished piece home.",
      },
      {
        q: "Do I need any art experience to join?",
        a: "No. Shramita Govil guides the group step by step from the first dot, so every participant finishes a piece regardless of their artistic background.",
      },
      {
        q: "How long is the Mandala Art workshop?",
        a: "Sessions run for 1.5 to 2 hours, including a brief introduction, a guided demonstration and hands-on creation time.",
      },
      {
        q: "What is the difference between mandala art and dot mandala art?",
        a: "Dot Mandala Art is a variation of Mandala Art built entirely from dots rather than brush strokes, painted with dotting tools on a round wooden or MDF base.",
      },
      {
        q: "How much does a mandala art workshop cost in Delhi NCR?",
        a: "Pricing is ₹600–₹800 per person with all materials included.",
      },
      {
        q: "How many people can join?",
        a: "Kraftykinni runs Mandala Art workshops for 20 to 200+ participants across Delhi, Gurgaon and Noida. Online sessions with shipped kits are also available pan-India.",
      },
    ],
  },
  {
    slug: 'texture-art-workshop-delhi-ncr-beginners-guide',
    title: "Texture Art Workshop in Delhi NCR: A Beginner's Guide to Layered Mixed-Media Canvas",
    metaTitle: 'Texture Art Workshop Delhi NCR: Beginner Guide | Kraftykinni',
    metaDescription:
      'What is a texture art workshop? 6 steps, 1.5–2 hours, no experience needed. Layered canvas for teams in Delhi NCR from ₹600/person, all materials included.',
    publishDate: '2026-10-09',
    category: 'Workshop Guides' as const,
    relatedWorkshop: 'texture-art',
    excerpt:
      "A beginner's guide to the Kraftykinni Texture Art workshop: the materials, the six steps, how long it takes, what you take home and how to book it across Delhi, Gurgaon and Noida.",
    keywords: [
      "texture art workshop",
      "texture art workshop Delhi NCR",
      "mixed media workshop Delhi NCR",
      "textured canvas class",
      "abstract art workshop Delhi",
      "texture art for beginners",
      "corporate texture art workshop",
    ],
    sections: [
      {
        body: `Texture Art builds a canvas in layers. Instead of painting a picture, you press tissue paper and fabric scraps into acrylic paste, then add colour on top, so the surface has real physical depth. Because the result is abstract, there is no wrong way to do it, which makes it a good first art workshop for people who feel nervous about painting.\n\nThis guide explains how the Kraftykinni [Texture Art workshop](/workshops/texture-art) works: the materials, the steps, the time it takes and how groups in Delhi, Gurgaon and Noida can book it.`,
        image: "https://cdn.kraftykinni.in/assets/texture-tissue-art-opt.webp",
        imageAlt: "Texture Art workshop canvas with layered tissue paper and acrylic paste — Delhi NCR — Kraftykinni",
      },
      {
        heading: "What Is Texture Art?",
        body: `Texture Art is a mixed-media painting technique where layers of materials, including tissue paper, acrylic paste, fabric scraps and paint, are built up on a canvas to create physical depth and dimension. The results are abstract and tactile, even for people who have never painted before.`,
      },
      {
        heading: "Materials Provided",
        body: `All materials are provided and included in the price, so participants do not need to bring anything:`,
        listItems: [
          "Canvas boards",
          "Acrylic paste",
          "Tissue paper",
          "Fabric scraps",
          "Acrylic colours",
          "Palette knives",
          "Brushes",
        ],
      },
      {
        heading: "How a Texture Art Session Works, Step by Step",
        body: `The session runs for 1.5 to 2 hours. Shramita Govil, a Fevicryl Certified Artist, walks the group through each layer:`,
        listItems: [
          "**Gather your materials.** Everything is laid out at your station, with no prep needed.",
          "**Apply the first texture layer.** Use a palette knife to spread acrylic paste across the canvas in broad strokes. Uneven strokes add character.",
          "**Add tissue and fabric layers.** Tear tissue paper into irregular pieces and press them into the wet paste to make wrinkled, raised surfaces. Some areas are dense and others sparse, which builds contrast.",
          "**Build depth with paint.** Apply acrylic colours over the textured surface with a palette knife and brush. The colour settles differently on raised and recessed areas.",
          "**Add finishing details.** Refine with highlight colours, edge detailing or extra texture. Shramita helps you judge when the piece feels complete.",
          "**Take your canvas home.** The finished canvas is display-ready once dry.",
        ],
        listType: 'ol',
      },
      {
        heading: "Why Texture Art Suits Beginners",
        body: `The process is abstract and exploratory, so there is no wrong outcome to worry about. Participants who feel intimidated by art often relax once they see the layers taking shape, and no prior painting experience is needed.\n\nEvery canvas is different. Because the process is abstract, no two participants end up with the same piece, which makes each one a personal keepsake.`,
      },
      {
        heading: "Who Books a Texture Art Workshop",
        body: `Texture Art is a popular choice for corporate creative-thinking sessions, team-building workshops and employee engagement events. It also suits school art days and private events where participants want something visually striking.\n\nIf you are comparing formats for a team, our [corporate art workshops](/corporate-art-workshops) page lists the full set of activities.`,
      },
      {
        heading: "Group Size, Cost and Booking",
        body: `Kraftykinni runs Texture Art workshops for groups of 20 to 200+ participants at your venue across Delhi, Gurgaon and Noida, with pricing of ₹600–₹800 per person and all materials included. Participants only need comfortable clothes they do not mind getting a little paint on.\n\nTo check availability, WhatsApp **+91 9599622210** with your group size, location, preferred date and the activity you would like. You can read more about [Shramita Govil and Kraftykinni](/about).`,
      },
    ],
    faq: [
      {
        q: "What is Texture Art?",
        a: "Texture Art is a mixed-media painting technique where layers of tissue paper, acrylic paste, fabric scraps and paint are built up on a canvas to create physical depth. The results are abstract and tactile.",
      },
      {
        q: "Do I need painting experience to join?",
        a: "No. The process is abstract and exploratory, so there is no wrong outcome. Shramita Govil guides everyone through each layer from the beginning.",
      },
      {
        q: "What materials are included?",
        a: "Canvas boards, acrylic paste, tissue paper, fabric scraps, acrylic colours, palette knives and brushes are all provided and included in the price.",
      },
      {
        q: "How long does the Texture Art workshop last?",
        a: "The session runs for 1.5 to 2 hours, including a brief introduction, a guided demonstration and hands-on creation time at your own pace.",
      },
      {
        q: "Can Texture Art be booked for a corporate group?",
        a: "Yes. Kraftykinni accommodates groups of 20 to 200+ participants and runs sessions at client venues across Delhi, Gurgaon and Noida.",
      },
      {
        q: "What do participants take home?",
        a: "Every participant takes home their own finished Texture Art canvas, a unique layered piece that is display-ready once dry.",
      },
    ],
  },
  {
    slug: 'boho-wall-art-workshop-delhi-ncr',
    title: "Boho Wall Art Workshops in Delhi NCR: Wall Rope Art vs Canvas Pearl Art vs Boho Canvas",
    metaTitle: 'Boho Wall Art Workshop Delhi NCR: 3 Formats | Kraftykinni',
    metaDescription:
      'Compare three boho wall décor workshops in Delhi NCR: Wall Rope Art, Canvas Pearl Art and Boho Canvas. Duration, materials, group size, ₹600–₹800/person.',
    publishDate: '2026-10-04',
    category: 'Workshop Guides' as const,
    relatedWorkshop: 'canvas-pearl-art',
    excerpt:
      "Three Kraftykinni workshops end with a piece you hang on the wall: Wall Rope Art, Canvas Pearl Art and Boho Canvas Art. This guide compares duration, materials, what you make and group size so you can pick the right one.",
    keywords: [
      "boho wall art workshop Delhi NCR",
      "boho wall decor workshop",
      "wall rope art workshop",
      "canvas pearl art workshop",
      "boho canvas art workshop",
      "wall hanging workshop Delhi",
      "boho art workshop for groups",
    ],
    sections: [
      {
        body: `If you want a workshop that ends with something to hang on the wall, Kraftykinni offers three boho-style options: Wall Rope Art, Canvas Pearl Art and Boho Canvas Art. All three are guided step by step by Shramita Govil, a Fevicryl Certified Artist, with every material supplied.\n\nThis guide compares them side by side, using the details from each workshop page, so you can pick the one that fits your group, your time and your budget. Pricing is the same for all three: ₹600–₹800 per person.`,
      },
      {
        heading: "Wall Rope Art: Coiled Rope, Painted by Hand",
        body: `[Wall Rope Art](/workshops/wall-rope-art) is part sculpture, part canvas. Participants coil natural cotton rope into a circular form on a base board, then paint it with earthy botanical motifs, sunrise scenes and boho-inspired designs.\n\n**Duration:** 2 to 2.5 hours, including the coiling demonstration, guided painting, a drying period and fitting the hanging cord.\n\n**Materials provided:** natural cotton rope, a base board, strong adhesive, acrylic paints in an earthy palette, fine and flat brushes and a jute hanging cord.\n\n**You take home:** a circular rope wall hanging painted with your own design, ready to hang on a nail or hook.\n\n**Group size:** 20 to 200+ participants.`,
        image: "https://cdn.kraftykinni.in/assets/wall-rope-art-opt.webp",
        imageAlt: "Wall Rope Art workshop piece, a coiled rope wall hanging painted with boho motifs — Delhi NCR — Kraftykinni",
      },
      {
        heading: "Canvas Pearl Art: Pearls on Black Canvas",
        body: `[Canvas Pearl Art](/workshops/canvas-pearl-art) adapts the traditional string-and-nail technique. Instead of thread wound around pins, participants glue pearls directly onto a black canvas, building radiating, spiral or symmetrical patterns one pearl at a time from a central point.\n\n**Duration:** 2 to 2.5 hours, because a full pearl pattern takes more time than a painted piece.\n\n**Materials provided:** a black canvas, decorative pearls in varying sizes, adhesive and a marked guide for the radiating pattern.\n\n**You take home:** a pearl pattern on black canvas, a display-ready wall piece with a more elegant, premium look than the other two.\n\n**Group size:** 15 to 100+ participants.`,
        image: "https://cdn.kraftykinni.in/assets/pearl-string-art-opt.webp",
        imageAlt: "Canvas Pearl Art workshop piece with a pearl pattern on a black canvas — Delhi NCR — Kraftykinni",
      },
      {
        heading: "Boho Canvas Art: Earthy, Abstract Painting",
        body: `[Boho Canvas Art](/workshops/boho-canvas) is an abstract painting style in warm earthy tones such as terracotta, ochre, cream and sage, layered with loose shapes and simple texture techniques. It looks sophisticated but needs no drawing skills.\n\n**Duration:** 1.5 to 2 hours, the shortest of the three.\n\n**Materials provided:** a stretched canvas, acrylic paints in an earthy palette, brushes of various sizes, palette knives and optional texture elements such as dried flowers or twine.\n\n**You take home:** a finished boho-style canvas painting, unique to each participant and ready to hang or gift.\n\n**Group size:** 20 to 200+ participants.`,
        image: "https://cdn.kraftykinni.in/assets/boho-art-opt.webp",
        imageAlt: "Boho Canvas Art workshop painting in warm earthy tones — Delhi NCR — Kraftykinni",
      },
      {
        heading: "Side-by-Side Comparison",
        body: `Here is how the three workshops compare on the points that usually decide a booking:`,
        listItems: [
          "**Shortest session:** Boho Canvas Art (1.5 to 2 hours). Wall Rope Art and Canvas Pearl Art both run 2 to 2.5 hours.",
          "**Most hands-on building:** Wall Rope Art, where you coil the rope yourself before painting it.",
          "**Most elegant, premium look:** Canvas Pearl Art, with pearls on a black background.",
          "**Most free-form and forgiving:** Boho Canvas Art, because the style has no strict rules about placement or precision.",
          "**Largest groups:** Wall Rope Art and Boho Canvas Art run for 20 to 200+ participants. Canvas Pearl Art runs for 15 to 100+.",
        ],
      },
      {
        heading: "Which Boho Wall Art Workshop Should You Choose?",
        body: `Choose **Boho Canvas Art** if you have the shortest time slot or a mixed group of complete beginners. Choose **Wall Rope Art** if you want a more tactile, craft-led session with a hanging piece at the end. Choose **Canvas Pearl Art** if you want a refined keepsake and your group is 15 to 100+, and you have 2 to 2.5 hours for patient, detailed work.\n\nAll three need no prior art experience.`,
      },
      {
        heading: "Booking for Teams, Schools and Private Groups",
        body: `Corporate and school groups can see the wider activity list on our [corporate art workshops](/corporate-art-workshops) page. For birthdays, kitty parties and other private events, see our [private art workshops](/private-art-workshops) page, which covers groups of 10 to 80+ at ₹600–₹800 per person with all materials included.\n\nKraftykinni brings the materials and runs the session at your venue across Delhi, Gurgaon and Noida. To check availability, WhatsApp **+91 9599622210** with your group size, location, preferred date and the workshop you would like.`,
      },
    ],
    faq: [
      {
        q: "What is the difference between Wall Rope Art and Boho Canvas Art?",
        a: "Wall Rope Art is a coiled cotton rope wall hanging that you build and then paint, and it runs 2 to 2.5 hours. Boho Canvas Art is an abstract painting on a stretched canvas in earthy tones, and it runs 1.5 to 2 hours.",
      },
      {
        q: "How long does each boho wall art workshop take?",
        a: "Boho Canvas Art runs 1.5 to 2 hours. Wall Rope Art and Canvas Pearl Art each run 2 to 2.5 hours.",
      },
      {
        q: "Do I need art experience for these workshops?",
        a: "No. Shramita Govil guides every session step by step, and none of the three requires prior art experience.",
      },
      {
        q: "What is the group size for each workshop?",
        a: "Wall Rope Art and Boho Canvas Art accommodate 20 to 200+ participants. Canvas Pearl Art accommodates 15 to 100+.",
      },
      {
        q: "How much does a boho wall art workshop cost in Delhi NCR?",
        a: "Pricing is ₹600–₹800 per person with all materials included.",
      },
      {
        q: "Can I book one of these workshops for a private party?",
        a: "Yes. Private groups of 10 to 80+ can book at ₹600–₹800 per person, with all materials included. See the private art workshops page for details.",
      },
    ],
  },
  {
    slug: 'team-building-activities-noida-2026',
    title: "Team Building Activities in Noida 2026: Occasions, Formats and Costs for Corporate Teams",
    metaTitle: 'Team Building Activities in Noida 2026 | Kraftykinni',
    metaDescription:
      'Planning team building in Noida? See 5 occasions that suit art workshops, which format fits your team, group sizes of 20–150+ and costs from ₹600/person.',
    publishDate: '2026-10-11',
    category: 'Corporate' as const,
    relatedWorkshop: 'tie-and-dye',
    excerpt:
      "Quarterly team days, desk-side resets, appreciation days, annual days and onboarding: a Noida guide to when an art workshop works as a team building activity, which format to pick, and what it costs.",
    keywords: [
      "team building activities Noida",
      "corporate team building Noida",
      "team outing Noida",
      "employee engagement activities Noida",
      "art workshop team building Noida",
      "corporate team activities Noida office",
      "team building ideas Noida",
    ],
    sections: [
      {
        body: `Team building in Noida usually has to fit a tight brief: a fixed slot in the calendar, a mixed group of colleagues and little appetite for logistics. A guided art workshop is one option that meets that brief, because the facilitator brings every supply and the session runs at your own office or venue.\n\nThis guide covers the occasions when teams in Noida book art workshops, which format suits which group, and what it costs. It draws on Kraftykinni's work with Noida offices and colleges. For the full service page, see our [employee engagement activities in Noida](/employee-engagement-activities-noida).`,
      },
      {
        heading: "1. Quarterly Team-Building Events",
        body: `This is the most common booking format. HR teams across Sector 62 and Film City Road run these quarterly to keep teams connected between performance cycles. A 90-minute guided art session fills an afternoon slot without requiring an external venue.`,
      },
      {
        heading: "2. Desk-Side Resets During the Workday",
        body: `Not every session needs a conference room. Kraftykinni has run guided sessions directly at participants' desks during a work shift, which gives a team a mental break without taking them off-site.\n\nA 20-person team at an office in Noida Sector 90 did exactly this with Dot Mandala Art, at their own workstations with no venue change. Read the full account in our [Noida dot mandala case study](/blog/dot-mandala-art-corporate-workshop-noida).`,
        image: "https://cdn.kraftykinni.in/noida-corporate-dot-mandala-workshop-group-kraftykinni.webp",
        imageAlt: "A 20-person corporate team holding up finished dot mandala artworks after a desk-side workshop — Noida — Kraftykinni",
      },
      {
        heading: "3. Employee Appreciation Days",
        body: `When you want to signal investment in your people rather than just entertainment, a creative session can work well. Every participant takes home the artwork they made, which stays with them after the event.`,
      },
      {
        heading: "4. Annual Days and Fests",
        body: `For large annual days and college fests in Noida, an art workshop is a structured activity to run before or after the formal programme. Groups of 100 to 150+ are accommodated, with additional facilitators brought in at no extra logistics cost.`,
      },
      {
        heading: "5. Onboarding and New-Hire Orientation",
        body: `A creative session on day one gives a new cohort something to do together instead of a quiz or a slide deck. Because there is no scoring or competition, newer joiners can take part on equal footing with the rest of the team.`,
      },
      {
        heading: "Which Format Fits Your Noida Team?",
        body: `All sessions are guided step by step by Shramita Govil, a Fevicryl Certified Artist, and no art experience is needed. As a starting point:`,
        listItems: [
          "**Most requested for corporate groups:** [Lippan Art](/workshops/lippan-art)",
          "**Mindfulness and wellness days:** [Mandala Art](/workshops/mandala-art)",
          "**High energy and large groups:** [Tie & Dye](/workshops/tie-and-dye)",
          "**Off-site retreats:** [Boho Canvas Art](/workshops/boho-canvas)",
          "**A branded takeaway:** [Tote Bag Painting](/workshops/tote-bag-painting)",
          "**Decompression and wellness days:** [Clay Art](/workshops/clay-art)",
        ],
        image: "https://cdn.kraftykinni.in/corporate-dot-mandala-workshop-in-progress-kraftykinni.webp",
        imageAlt: "Team members building dot mandala art with dotting tools at their desks — Noida — Kraftykinni",
      },
      {
        heading: "Teams of 20 to 50",
        body: `For smaller teams working in a fixed time slot or a smaller conference room, Mandala Art and Lippan Art are the top picks, because they do not need a large open floor. Boho Canvas and Tie & Dye suit larger, higher-energy groups better. Kraftykinni will recommend a format based on your group's profile and the tone of the event.`,
      },
      {
        heading: "Group Size, Cost and Notice",
        body: `For Noida offices, colleges and universities, Kraftykinni runs sessions for 20 to 150+ participants. Above 60 participants, additional facilitators are brought in. All art supplies are included, and you provide tables and chairs.\n\nPricing is per person: **₹800** for groups of 20–50, **₹700** for 50–100 and **₹600** for 100+. A 50% deposit confirms the date, and the minimum notice is 7 days.`,
      },
      {
        heading: "Where in Noida",
        body: `Kraftykinni travels to your office or event venue across Noida, including Sector 62, Sector 16, Sector 90, Film City Road, Sector 18, Knowledge Park, Sector 125 and Greater Noida. You do not need to book an external venue.`,
      },
      {
        heading: "Colleges and Universities in Noida",
        body: `Amity University in Noida is one of Kraftykinni's most frequently repeated bookings, with sessions for orientation programmes, fests, annual days and student wellness days for groups of 40 to 150+. The activities run there include Lippan Art, Mandala Art and Tote Bag Painting.`,
      },
      {
        heading: "Book a Team Building Workshop in Noida",
        body: `Browse [art workshops in Noida](/workshops-in-noida) or see our wider [corporate art workshops](/corporate-art-workshops) page. Teams in Gurgaon can read our guide to [team building activities in Gurgaon](/blog/best-corporate-team-building-activities-gurgaon-2026). To check availability, WhatsApp **+91 9599622210** with your group size, Noida location, preferred date and the activity you have in mind.`,
      },
    ],
    faq: [
      {
        q: "What is a good team building activity for a Noida office?",
        a: "A guided art workshop that runs at your own office is a good fit when you want a structured, non-competitive activity with a physical takeaway. Kraftykinni brings every supply and cleans up afterwards.",
      },
      {
        q: "How many people can join a team building workshop in Noida?",
        a: "Kraftykinni runs sessions for 20 to 150+ participants at Noida offices, colleges and universities. Additional facilitators are brought in for larger groups.",
      },
      {
        q: "How much does a team building art workshop cost in Noida?",
        a: "Pricing is ₹800 per person for groups of 20–50, ₹700 for 50–100 and ₹600 for 100+, with all art materials included.",
      },
      {
        q: "Can the workshop run at our desks or office in Noida?",
        a: "Yes. Kraftykinni has run sessions directly at participants' desks during a work shift, as well as at offices and venues across Noida, including Sector 62 and Sector 90.",
      },
      {
        q: "How far in advance should we book a Noida team building session?",
        a: "A minimum of 7 days' notice is required, with a 50% deposit to confirm the date.",
      },
    ],
  },
  {
    slug: 'painting-workshop-for-adults-delhi-ncr-groups',
    title: "Painting Workshop for Adults in Delhi NCR: Ideas for Groups of 10 or More",
    metaTitle: 'Painting Workshop for Adults in Delhi NCR | Kraftykinni',
    metaDescription:
      'Painting workshop for adults in Delhi NCR: canvas, glass, mirror and tote options for groups of 10+. No experience needed. ₹600–₹800/person, all inclusive.',
    publishDate: '2026-10-07',
    category: 'Private Events' as const,
    relatedWorkshop: 'texture-art',
    excerpt:
      "Looking for a painting workshop for adults in Delhi NCR? This guide compares the painting formats Kraftykinni runs for groups of 10 or more, with durations, what you make and how booking works.",
    keywords: [
      "painting workshop for adults Delhi NCR",
      "adult painting workshop group",
      "painting workshop for groups Delhi",
      "art workshop for adults Delhi",
      "canvas painting workshop Delhi NCR",
      "kitty party painting workshop",
      "painting workshop at home Delhi NCR",
    ],
    sections: [
      {
        body: `A painting workshop for adults works best when it asks for no skill and still ends with something worth keeping. Kraftykinni runs guided painting sessions for groups of 10 or more across Delhi, Gurgaon and Noida, led step by step by Shramita Govil, a Fevicryl Certified Artist, with every material supplied.\n\nThis guide compares the painting formats on offer, explains which suits which occasion and covers the practical details of booking. Pricing is ₹600–₹800 per person, all inclusive.`,
        image: "https://cdn.kraftykinni.in/assets/canvas-pouch-opt.webp",
        imageAlt: "Hand-painted canvas pouches with fruit, flower and flame designs — Canvas Pouch Painting workshop — Delhi NCR — Kraftykinni",
      },
      {
        heading: "Who Books Painting Workshops for Adults",
        body: `Private groups book these sessions for birthday parties, kitty parties, bachelorettes and baby showers, and for friend or family get-togethers. Kraftykinni comes to your home, a banquet hall, a café or any space you have booked, so nobody has to travel. For a wider look at party formats, see our guide to [art workshop ideas for a birthday party in Delhi NCR](/blog/art-workshop-ideas-birthday-party-delhi-ncr).`,
      },
      {
        heading: "Painting Formats to Choose From",
        body: `All of these are painting-led and need no prior experience. Durations are the ones listed on each workshop page:`,
        listItems: [
          "**[Boho Canvas Art](/workshops/boho-canvas)** (1.5–2 hours): an abstract painting in warm earthy tones such as terracotta, ochre, cream and sage. It needs no drawing skills.",
          "**[Glass Painting](/workshops/glass-painting)** (1.5–2 hours): translucent paints applied to glass frames or panels with outliner pens, giving designs that glow when light passes through.",
          "**[Mirror Painting](/workshops/mirror-painting)** (1.5–2 hours): an illustrated scene painted directly onto a mirror with glass-safe paints, so the piece is both functional and decorative.",
          "**[Mandala Art](/workshops/mandala-art)** (1.5–2 hours): a symmetric mandala built from the centre outward with dotting tools and brushes.",
          "**[Texture Art](/workshops/texture-art)** (1.5–2 hours): a layered, abstract mixed-media canvas using tissue paper, acrylic paste and paint.",
          "**[Tote Bag Painting](/workshops/tote-bag-painting)** (1.5–2 hours): a cotton tote you paint with a personal or themed design and can use afterwards.",
          "**[Canvas Pouch Painting](/workshops/canvas-pouch)** (1.5–2 hours): a compact fabric pouch painted with fabric paints, brushes and stencils.",
          "**[Rock Painting](/workshops/rock-painting)** (1–1.5 hours): smooth stones painted with acrylics, the quickest option on this list.",
        ],
        image: "https://cdn.kraftykinni.in/assets/glass-painting-opt.webp",
        imageAlt: "Glass Painting workshop piece with translucent painted designs — Delhi NCR — Kraftykinni",
      },
      {
        heading: "Which Painting Workshop Suits Which Occasion",
        body: `Kraftykinni recommends a format based on your group size, age range and how hands-on you want the session to be. As a starting point:`,
        listItems: [
          "**Birthday parties:** Boho Canvas Art and Glass Painting are the most popular choices, because both produce display-ready artwork guests keep as a memory.",
          "**Themed events such as bachelorettes and baby showers:** Tote Bag Painting and Canvas Pouch Painting are particularly easy to theme, and colour palettes and personal touches can be worked in.",
          "**A calmer, focused session:** Mandala Art, where the structured pattern gives you a clear next step at every point.",
          "**A short slot:** Rock Painting, which runs 1 to 1.5 hours.",
        ],
        image: "https://cdn.kraftykinni.in/assets/mirror-painting-opt.webp",
        imageAlt: "Mirror Painting workshop piece with an illustrated scene on a mirror — Delhi NCR — Kraftykinni",
      },
      {
        heading: "Do Adults Need Painting Experience?",
        body: `No. Every session is guided step by step, so someone who has never held a paintbrush can finish a piece they are happy with. Guests take their artwork home at the end.`,
      },
      {
        heading: "Group Size, Cost and Booking",
        body: `Private bookings are for groups of 10 to 80+ participants, at ₹600–₹800 per person with all art supplies included. Sessions run 1.5 to 2.5 hours depending on the activity. For groups under 10, get in touch to discuss options.\n\nKraftykinni needs a minimum of 5 days' notice and a 50% deposit to confirm the date. For weekend dates, especially Saturdays, book about 2 weeks ahead because slots fill quickly. Your space only needs tables, chairs and adequate lighting. Online sessions with kits shipped pan-India are also available.`,
      },
      {
        heading: "Booking for a Workplace Group Instead?",
        body: `For office teams of 20 or more, see our [corporate art workshops](/corporate-art-workshops) page, where pricing scales with group size. Private groups can read more on our [private art workshops](/private-art-workshops) page.`,
      },
      {
        heading: "Book a Painting Workshop for Your Group",
        body: `To check availability, WhatsApp **+91 9599622210** with your group size, location (Delhi, Gurgaon or Noida), preferred date and the painting format you have in mind. You can also read more about [Shramita Govil and Kraftykinni](/about).`,
      },
    ],
    faq: [
      {
        q: "Is there a painting workshop for adults in Delhi NCR?",
        a: "Yes. Kraftykinni runs guided painting workshops for adult groups of 10 or more across Delhi, Gurgaon and Noida, including Boho Canvas Art, Glass Painting, Mirror Painting and Tote Bag Painting.",
      },
      {
        q: "Do adults need any painting experience?",
        a: "No. Every session is guided step by step by a Fevicryl Certified Artist, so complete beginners finish a piece they can take home.",
      },
      {
        q: "What is the minimum group size for a private painting workshop?",
        a: "Kraftykinni accepts private bookings from groups of 10 upward. For groups under 10, get in touch to discuss options.",
      },
      {
        q: "How much does an adult painting workshop cost?",
        a: "Pricing is ₹600–₹800 per person, all inclusive, regardless of group size.",
      },
      {
        q: "Can the workshop be held at my home?",
        a: "Yes. Kraftykinni comes to your home, a banquet hall, a café or any venue you have booked, and only needs tables, chairs and adequate lighting.",
      },
    ],
  },
  {
    slug: 'tote-bag-painting-workshop-delhi-ncr-guide',
    title: "Tote Bag Painting Workshop in Delhi NCR: How a Session Works, Branding Options and Booking",
    metaTitle: 'Tote Bag Painting Workshop Delhi NCR Guide | Kraftykinni',
    metaDescription:
      'Tote bag painting workshop in Delhi NCR: how a session runs, branding options, 1.5–2 hours, groups of 20–200+, from ₹600/person, all materials included.',
    publishDate: '2026-10-12',
    category: 'Workshop Guides' as const,
    relatedWorkshop: 'tote-bag-painting',
    excerpt:
      "A guide to the Kraftykinni Tote Bag Painting workshop: what happens in a session, stencils versus freehand, adding company branding, who books it and how it is priced across Delhi, Gurgaon and Noida.",
    keywords: [
      "tote bag painting workshop Delhi NCR",
      "tote bag painting workshop",
      "fabric painting workshop Delhi NCR",
      "branded gifting workshop",
      "corporate tote bag painting",
      "eco craft workshop Delhi",
      "tote bag art class",
    ],
    sections: [
      {
        body: `In a tote bag painting workshop, each participant paints a plain cotton tote bag with fabric colours, and leaves with a personalised bag they can use the next day. It is one of Kraftykinni's most practical formats, because the finished piece is something people carry rather than something they store.\n\nThis guide explains how a session runs, how stencils and freehand painting work, how company branding can be added and what booking involves for groups in Delhi, Gurgaon and Noida. The full workshop page is [Tote Bag Painting](/workshops/tote-bag-painting).`,
        image: "https://cdn.kraftykinni.in/assets/tote-bag-opt.webp",
        imageAlt: "Hand-painted cotton tote bag from a Tote Bag Painting workshop — Delhi NCR — Kraftykinni",
      },
      {
        heading: "What Happens in a Tote Bag Painting Workshop",
        body: `Sessions run for 1.5 to 2 hours and are guided by Shramita Govil, a Fevicryl Certified Artist:`,
        listItems: [
          "Each participant receives a plain cotton tote bag.",
          "Shramita guides the group through design layout, colour mixing and fabric painting techniques.",
          "Participants paint their bag with fabric colours, fine brushes and stencils.",
          "Fabric paint dries within 15 to 20 minutes, so participants can handle and pack their tote before the session ends.",
        ],
        listType: 'ol',
      },
      {
        heading: "Materials Included",
        body: `Everything is supplied and included in the per-person price: tote bags, fabric paints, brushes, stencils and palette boards.`,
      },
      {
        heading: "Stencils or Freehand?",
        body: `No painting experience is needed. Participants who prefer a guided design can use stencils, and those who want to paint freehand get support from Shramita. Both approaches produce good results, so a mixed group can work side by side.`,
      },
      {
        heading: "Adding Company Branding",
        body: `For corporate events, Kraftykinni can pre-print your company logo or event branding on the bags before the workshop. Participants then personalise the bag further with their own painted design, which gives you a branded gift that is also handmade. Brand elements and event themes can also be worked into the design without printing.\n\nTote Bag Painting and Canvas Pouch Painting are the two formats Kraftykinni recommends most often for branded gifting. For a wider look at formats, see our guide to [corporate art workshops in Delhi NCR](/blog/corporate-art-workshops-delhi-ncr-guide).`,
      },
      {
        heading: "A Sustainability-Themed Option",
        body: `Each participant creates a reusable cotton bag, which suits sustainability or eco-themed events by reducing dependence on single-use plastic bags while also producing a personal piece of art.`,
      },
      {
        heading: "Who Books a Tote Bag Painting Workshop",
        body: `The page lists corporate gifting events, sustainability-themed workshops, school events and private parties. Schools use it as a classroom or annual-day activity, which is covered in our guide to [annual day activity ideas for schools in Delhi NCR](/blog/annual-day-activity-ideas-schools-delhi-ncr). For birthday and group celebrations, see our [birthday party workshop ideas](/blog/art-workshop-ideas-birthday-party-delhi-ncr), and for school bookings visit [school art workshops](/school-art-workshops).`,
      },
      {
        heading: "Group Size, Cost and Booking",
        body: `Kraftykinni runs Tote Bag Painting for groups of 20 to 200+ across Delhi, Gurgaon and Noida, at your venue. Pricing is ₹600–₹800 per person with all materials included. For corporate groups it is **₹800** for 20–50 people, **₹700** for 50–100 and **₹600** for 100+.\n\nCorporate bookings need a minimum of 7 days' notice and a 50% deposit to confirm the date. Private groups of 10 or more can book too, with a minimum of 5 days' notice, through our [private art workshops](/private-art-workshops) page.`,
      },
      {
        heading: "Book a Tote Bag Painting Workshop",
        body: `See our [corporate art workshops](/corporate-art-workshops) page for the wider activity list. To check availability, WhatsApp **+91 9599622210** with your group size, location, preferred date and whether you would like branding on the bags. You can also read more about [Shramita Govil and Kraftykinni](/about).`,
      },
    ],
    faq: [
      {
        q: "What happens in a Tote Bag Painting workshop?",
        a: "Each participant receives a plain cotton tote bag and paints it with fabric colours, fine brushes and stencils, guided by Shramita Govil through layout, colour mixing and fabric painting techniques. They take the bag home to use.",
      },
      {
        q: "Can we add corporate branding to the tote bags?",
        a: "Yes. Kraftykinni can pre-print your company logo or event branding on the bags before the workshop, and participants then add their own painted design.",
      },
      {
        q: "Do participants need painting experience?",
        a: "No. Stencils are available for guided designs, and Shramita supports anyone who wants to paint freehand.",
      },
      {
        q: "How long does the workshop last?",
        a: "Sessions run for 1.5 to 2 hours. Fabric paint dries within 15 to 20 minutes, so participants can pack their tote before the session ends.",
      },
      {
        q: "How much does a tote bag painting workshop cost?",
        a: "Pricing is ₹600–₹800 per person with all materials included. For corporate groups it is ₹800 for 20–50, ₹700 for 50–100 and ₹600 for 100+.",
      },
      {
        q: "Can it be booked for a group across Delhi NCR?",
        a: "Yes. Kraftykinni runs Tote Bag Painting for groups of 20 to 200+ across Delhi, Gurgaon and Noida, with all materials included.",
      },
    ],
  },
  {
    slug: 'block-printing-workshop-delhi-ncr-guide',
    title: "Block Printing Workshop in Delhi NCR: How a Session Works, What You Print and Booking",
    metaTitle: 'Block Printing Workshop Delhi NCR Guide | Kraftykinni',
    metaDescription:
      'Block printing workshop in Delhi NCR: how a session runs, what you print, 1.5–2 hours, groups of 20–200+, from ₹600 per person, all materials included.',
    publishDate: '2026-10-14',
    category: 'Workshop Guides' as const,
    relatedWorkshop: 'block-printing',
    excerpt:
      "A guide to the Kraftykinni Block Printing workshop: the materials, the six steps from choosing a block to heat-setting the fabric, what you take home, who books it and how it is priced across Delhi, Gurgaon and Noida.",
    keywords: [
      "block printing workshop Delhi NCR",
      "block printing workshop Delhi",
      "hand block printing class Delhi",
      "fabric printing workshop Delhi",
      "block print corporate workshop",
      "block printing workshop for schools",
    ],
    sections: [
      {
        body: `In a block printing workshop, each participant loads a carved wooden block with fabric colour and stamps it onto cloth, building a repeat pattern by hand. The rhythm of loading, pressing and lifting is relaxing, and the result is a fabric piece people actually use.\n\nThis guide explains how a Kraftykinni session runs, what you print, who books it and what booking involves in Delhi, Gurgaon and Noida. The full workshop page is [Block Printing](/workshops/block-printing).`,
        image: "https://cdn.kraftykinni.in/assets/block-printing-opt.webp",
        imageAlt: "Yellow floral repeat pattern stamped with two carved blocks — Block Printing workshop — Delhi NCR — Kraftykinni",
      },
      {
        heading: "Materials Included",
        body: `Kraftykinni supplies everything and sets it up at each workstation before the session begins: carved wooden blocks, fabric colours, printing pads and a fabric item to print on. Blocks come in traditional geometric, floral and paisley designs.`,
        image: "https://cdn.kraftykinni.in/block-printing-wooden-blocks-tools-flatlay-kraftykinni.webp",
        imageAlt: "Hand-carved wooden printing blocks, brushes and colour pots laid out before a session — Block Printing workshop — Delhi NCR — Kraftykinni",
      },
      {
        heading: "How a Block Printing Session Works",
        body: `Sessions run for 1.5 to 2 hours and are guided by Shramita Govil, a Fevicryl Certified Artist:`,
        listItems: [
          "**Choose a block and colours.** Pick a geometric, floral or paisley block, and Shramita helps you choose a palette that suits the fabric.",
          "**Load the block.** Press it firmly and evenly onto the printing pad for an even coat of colour. Shramita demonstrates the right pressure and angle.",
          "**Stamp the fabric.** Press the inked block onto the fabric, hold for a moment and lift cleanly in one motion.",
          "**Build the repeat pattern.** Keep stamping in a grid or a freeform layout with consistent spacing. You can combine several blocks and colours.",
          "**Heat-set the colour.** Once the design is finished, the colour is heat-set so the fabric is washable and durable.",
        ],
        listType: 'ol',
        image: "https://cdn.kraftykinni.in/block-printing-group-stamping-fabric-kraftykinni.webp",
        imageAlt: "Participants stamping a repeat leaf and flower pattern onto a long length of white fabric — Block Printing workshop — Delhi NCR — Kraftykinni",
      },
      {
        heading: "What You Take Home",
        body: `Each participant takes home a block-printed fabric item, usually a tote bag, dupatta or fabric panel, in traditional or contemporary patterns. Because the colour is heat-set, the piece is washable and ready to use or wear.`,
      },
      {
        heading: "Do You Need Experience?",
        body: `No. The technique is straightforward: load the block, press firmly and lift cleanly. Shramita demonstrates first and then guides everyone through spacing, pattern repetition and colour combinations.`,
      },
      {
        heading: "Who Books a Block Printing Workshop",
        body: `It suits corporate cultural events, school heritage days, college fests and team-building sessions. Companies also book it as a wellness activity, because the stamping rhythm is calming. See [corporate art workshops](/corporate-art-workshops) and [school art workshops](/school-art-workshops) for group formats.\n\nPrivate groups book it too. For a real example, read about a [private block printing workshop in Delhi for a mother and daughter visiting from Israel](/blog/block-printing-workshop-delhi-israeli-family).`,
      },
      {
        heading: "Group Size, Cost and Booking",
        body: `Kraftykinni runs Block Printing for groups of 20 to 200+ across Delhi, Gurgaon and Noida, at your venue. Pricing is ₹600–₹800 per person with all materials included. For corporate groups it is **₹800** for 20–50 people, **₹700** for 50–100 and **₹600** for 100+.\n\nCorporate bookings need a minimum of 7 days' notice and a 50% deposit to confirm the date. Private groups of 10 or more can book with a minimum of 5 days' notice through our [private art workshops](/private-art-workshops) page.`,
      },
      {
        heading: "Book a Block Printing Workshop",
        body: `To check availability, WhatsApp **+91 9599622210** with your group size, location, preferred date and which fabric item you would like to print. You can also read more about [Shramita Govil and Kraftykinni](/about).`,
      },
    ],
    faq: [
      {
        q: "What happens in a Block Printing workshop?",
        a: "Participants choose a carved wooden block, load it with fabric colour on a printing pad and stamp a repeat pattern onto fabric, guided by Shramita Govil. The colour is then heat-set so the piece is washable.",
      },
      {
        q: "How long does the workshop last?",
        a: "Sessions run for 1.5 to 2 hours, including a demonstration and hands-on stamping time to complete the fabric piece.",
      },
      {
        q: "What does each participant take home?",
        a: "A block-printed fabric item, usually a tote bag, dupatta or fabric panel. It is heat-set, washable and ready to use.",
      },
      {
        q: "Do participants need any prior experience?",
        a: "No. Shramita demonstrates the technique and guides participants through spacing, pattern repetition and colour combinations.",
      },
      {
        q: "How much does a block printing workshop cost?",
        a: "Pricing is ₹600–₹800 per person with all materials included. For corporate groups it is ₹800 for 20–50, ₹700 for 50–100 and ₹600 for 100+.",
      },
      {
        q: "Can it be booked for a group across Delhi NCR?",
        a: "Yes. Kraftykinni runs Block Printing for groups of 20 to 200+ across Delhi, Gurgaon and Noida, and brings blocks, colours, printing pads and fabric items to your venue.",
      },
    ],
  },
  {
    slug: 'kids-birthday-party-art-workshop-delhi-noida',
    title: "Kids' Birthday Art Workshops in Delhi NCR: 3 Real Parties",
    metaTitle: 'Kids Birthday Art Parties Delhi & Noida | Kraftykinni',
    metaDescription:
      'See how 3 kids\' birthday parties in Delhi and Noida used clay mirror art, DIY spinner kits and fridge magnets. ₹600–₹800/person, all materials included.',
    publishDate: '2026-10-25',
    category: 'Private Events' as const,
    relatedWorkshop: 'clay-mirror-art',
    excerpt:
      "Between 17 and 24 October 2026, Kraftykinni ran three kids' birthday art workshops for 54 children: two in Delhi and one in Noida, for guests aged 4 to 11. Here is what each craft involved and how to choose one for your own party.",
    keywords: [
      "kids birthday party art workshop Delhi NCR",
      "art and craft birthday party for kids Delhi",
      "birthday party craft activity for kids",
      "DIY return gift workshop for kids",
      "art party for kids Noida",
      "clay mirror art birthday party",
      "birthday party activities for 10 year olds",
      "kids birthday party art workshop Connaught Place",
    ],
    sections: [
      {
        body: `The best art activity for a kids' birthday party in Delhi NCR depends on age. Clay fridge magnets suit ages 4 to 7, while Clay Mirror Art and DIY spinner and photo frame kits suit ages 10 to 11. All run at ₹600–₹800 per person, materials included.\n\nBetween 17 and 24 October 2026, Kraftykinni ran all three for 54 children: two parties in Delhi and one in Noida, each lasting 2 hours. This post records what we ran, what the children made and how the format changed with age, group size and venue. If you are planning a birthday for adults, see our guide to [art workshop ideas for a birthday party in Delhi NCR](/blog/art-workshop-ideas-birthday-party-delhi-ncr).`,
      },
      {
        heading: "Which Art Activity Suits Which Age for a Kids' Birthday Party?",
        body: `These are the age groups we worked with this month. For other ages, message us and we will suggest a format.`,
        listItems: [
          "**Ages 4 to 7:** Clay Fridge Magnet. A small piece, painted and decorated by each child on their own sheet.",
          "**Ages 10 to 11, build and paint:** DIY kits with a colour-mixing spinner and a photo frame. Structured, with a chart to follow.",
          "**Ages 10 to 11, sculpt:** Clay Mirror Art, where children shape clay letters and flowers around a mirror.",
        ],
      },
      {
        heading: "The Three Parties at a Glance",
        body: `Here are the three October 2026 parties side by side:`,
        listItems: [
          "**17 October, Delhi (at home):** DIY spinner and photo frame kits. A boy's birthday, 20 children aged 10 to 11, 2 hours.",
          "**18 October, Delhi (Diggin café, Connaught Place):** Clay Mirror Art. A girl's birthday, 10 children aged 10 to 11, 2 hours.",
          "**24 October, Noida (at home):** Clay Fridge Magnet. 24 children aged 4 to 7, 2 hours.",
        ],
      },
      {
        heading: "Delhi, 17 October: DIY Spinner and Photo Frame Kits at a Football-Themed Home Party",
        body: `The first party was a boy's birthday at home in Delhi, with 20 guests aged 10 to 11 and a blue-and-white football theme. Instead of one shared project, every child got a personal kit, packed and labelled with the birthday child's name before the guests sat down.`,
        image: "https://cdn.kraftykinni.in/kids-birthday-diy-spinner-photo-frame-kits-delhi-kraftykinni.webp",
        imageAlt: "Personalised DIY kit bags with wooden pieces and tempera colours laid out for a kids' birthday workshop in Delhi — Kraftykinni",
        imageCaption: "Personalised kits, packed and labelled before the 17 October party in Delhi.",
      },
      {
        heading: "How the Kit Worked for 10 to 11 Year Olds",
        body: `Each kit held wooden pieces to paint and assemble, tempera colours with a brush and a colour-mixing chart. Children painted a colour-wheel spinner and decorated a photo frame, using the chart to mix their own shades instead of only using colours straight from the pot. At this age, a small rule to follow gives children something to work out as well as something to paint.\n\nFloor seating on a mat worked well for 20 children. They sat in a loose circle and compared results as they went. Each child took home the finished spinner and frame, so the kit doubled as the return gift.`,
        image: "https://cdn.kraftykinni.in/kids-birthday-diy-spinner-painting-delhi-home-kraftykinni.webp",
        imageAlt: "Children painting colour-wheel spinners on a mat at a football-themed birthday party in Delhi — Kraftykinni",
        imageCaption: "Painting colour-wheel spinners at the Delhi home party on 17 October: 20 children, 2 hours.",
      },
      {
        heading: "Delhi, 18 October: Clay Mirror Art at Diggin Café, Connaught Place",
        body: `The second party was a girl's birthday at the Diggin café in Connaught Place, central Delhi, for 10 guests aged 10 to 11. The tables were set in the café's seating area before the guests arrived, with a mirror, packs of air-dry clay in assorted colours, glue and a dreamcatcher kit at each place. The dreamcatcher kit is part of Kraftykinni's standard setup for this workshop.`,
        image: "https://cdn.kraftykinni.in/kids-birthday-clay-mirror-art-dreamcatcher-setup-delhi-kraftykinni.webp",
        imageAlt: "Café table laid with mirrors, coloured air-dry clay packs and dreamcatcher kits for a kids' birthday Clay Mirror Art workshop in Delhi — Kraftykinni",
        imageCaption: "The table at Diggin, Connaught Place, laid with mirrors, clay and dreamcatcher kits before the 18 October party.",
      },
      {
        heading: "What the Children Made: Clay Mirror Art",
        body: `[Clay Mirror Art](/workshops/clay-mirror-art) is a sculpting workshop. Children shape air-dry clay into letters, flowers and small motifs, then press them around the edge of a mirror. At this party the pieces included clay lettering, sunflowers and other flowers, and small fruit and animal shapes.\n\nThe finished mirror is usable, not only decorative, so it works as the return gift. The party ran for 2 hours, and the workshop page lists 2 to 2.5 hours.\n\nIf you are planning a party at a café, check with the venue in advance that an outside activity is allowed, and ask for a long table or a clear block of seating. Kraftykinni handles setup, facilitation and cleanup.`,
        image: "https://cdn.kraftykinni.in/kids-birthday-clay-mirror-art-finished-mirror-delhi-kraftykinni.webp",
        imageAlt: "Finished mirror with clay lettering, a sunflower and fruit motifs made by a child at a birthday workshop in Delhi — Kraftykinni",
        imageCaption: "A finished clay-lettered mirror from the 18 October party: 10 children, 2 hours.",
      },
      {
        heading: "Noida, 24 October: Clay Fridge Magnets at a Home Party for 24 Children Aged 4 to 7",
        body: `The third party was at a home in Noida, for 24 guests aged 4 to 7, with a pink-and-gold balloon backdrop. Each child worked on their own coloured sheet laid on the floor, which marks out a personal space and protects the surface underneath.\n\nChildren painted and decorated round fridge magnets with brushes and clay details. A magnet is small, so younger children can finish it in one sitting, and it ends up somewhere they see every day. Related workshop pages: [MDF Fridge Magnet](/workshops/mdf-fridge-magnet) and [Clay Art](/workshops/clay-art).`,
        image: "https://cdn.kraftykinni.in/kids-birthday-clay-fridge-magnet-painting-noida-kraftykinni.webp",
        imageAlt: "Top-down view of children painting round fridge magnets on coloured sheets at a kids' birthday workshop in Noida — Kraftykinni",
        imageCaption: "Painting fridge magnets on individual coloured sheets at the Noida party on 24 October.",
      },
      {
        heading: "Keeping 24 Children Aged 4 to 7 Focused",
        body: `For the youngest and largest group we kept the setup simple: one sheet and one set of materials per child, everything within reach, and the birthday decorations as the backdrop. The session ran for 2 hours, and each child took their magnet home at the end of the party.`,
        image: "https://cdn.kraftykinni.in/kids-birthday-party-art-workshop-noida-home-kraftykinni.webp",
        imageAlt: "Children painting fridge magnets on coloured sheets at a pink-and-gold birthday party at home in Noida — Kraftykinni",
        imageCaption: "The Noida home party on 24 October: 24 children aged 4 to 7, 2 hours.",
      },
      {
        heading: "Materials We Used and How Children Used Them",
        body: `The clay parties used Fevicryl Mouldit and Super Clay, two air-dry modelling clays that are generally safe to use. Painting used acrylic paints, and the DIY kits also included tempera colours.\n\nChildren used all materials under the facilitator's guidance throughout. If a child has allergies or skin sensitivities, tell us when you book so we can plan around it.`,
      },
      {
        heading: "What a Parent Said",
        body: `One parent left a five-star Google review after a recent party: “Kinni managed each and every kid nicely… Thank you so much for all the efforts.” (Shaily Chaudhary, Google review)`,
      },
      {
        heading: "Home, Café or Hall: What You Need to Provide",
        body: `At home, floor seating on a mat worked for both the 20-child and the 24-child party. A café or hired hall needs tables and chairs with surface space for each child and, as above, the venue's agreement. Kraftykinni brings the materials in every case and handles setup, facilitation and cleanup.`,
      },
      {
        heading: "Where Kraftykinni Hosts Kids' Birthday Workshops",
        body: `Kraftykinni runs kids' birthday workshops across Delhi, Gurgaon and Noida, at your home, a farmhouse, a club, a café or a hired venue. For area details, see our pages for [workshops in Delhi](/workshops-in-delhi), [workshops in Gurgaon](/workshops-in-gurgaon) and [workshops in Noida](/workshops-in-noida).`,
      },
      {
        heading: "Pricing and Booking",
        body: `Pricing is ₹600–₹800 per person with all materials included: ₹800 for groups of 15 to 50, ₹700 for 50 to 100 and ₹600 for groups above 100. Worked examples at the ₹800 rate:`,
        listItems: [
          "**20 children:** ₹16,000",
          "**24 children:** ₹19,200",
          "**For groups under 15:** message us for a quote.",
        ],
      },
      {
        heading: "Booking Notice",
        body: `A minimum of 7 days' notice and a 50% deposit confirm the date. For weekend dates between November and February, the peak party season, book three to four weeks ahead.`,
      },
      {
        heading: "Book a Kids' Birthday Art Workshop",
        body: `Every session is led by Shramita Govil, a Fevicryl Certified Artist. To check availability, WhatsApp **+91 9599622210** with the date, city, venue, number of children and their ages. You can also read about [private art workshops](/private-art-workshops) or learn more about [Shramita Govil and Kraftykinni](/about).`,
      },
    ],
    faq: [
      {
        q: "What is the best art activity for a kids' birthday party in Delhi NCR?",
        a: "It depends on the ages. Clay fridge magnets suit guests aged 4 to 7, while Clay Mirror Art and DIY kits with a colour-mixing spinner and photo frame suit guests aged 10 to 11. Kraftykinni runs all three across Delhi, Gurgaon and Noida.",
      },
      {
        q: "How much does a kids' birthday art workshop cost in Delhi NCR?",
        a: "Pricing is ₹600–₹800 per person with all materials included: ₹800 for groups of 15 to 50, ₹700 for 50 to 100 and ₹600 above 100. For example, 20 children at ₹800 comes to ₹16,000.",
      },
      {
        q: "How many children can join a birthday workshop?",
        a: "Kraftykinni's recent parties had 10, 20 and 24 children, each lasting 2 hours. Private bookings run from 10 participants up to 80 or more.",
      },
      {
        q: "What age group are the birthday workshops suitable for?",
        a: "Kraftykinni's recent birthday parties had guests aged 4 to 11. The craft is chosen by age, so tell us the ages when you enquire.",
      },
      {
        q: "Can the workshop be held at home or at a café?",
        a: "Yes. Kraftykinni has run kids' birthday workshops at homes in Delhi and Noida and at a café in Connaught Place, Delhi. For a café, check with the venue that an outside activity is allowed.",
      },
      {
        q: "What space does a kids' birthday workshop need?",
        a: "Tables and chairs, or floor seating on a mat, with surface space for each child. Both October home parties used floor seating. Kraftykinni brings the materials and handles setup, facilitation and cleanup.",
      },
      {
        q: "Are the materials safe for children?",
        a: "Kraftykinni uses Fevicryl Mouldit and Super Clay air-dry clays and acrylic paints, which are generally safe to use, and children work under the facilitator's guidance throughout. If your child has allergies or skin sensitivities, tell us when you book.",
      },
      {
        q: "Can the workshop replace return gifts?",
        a: "Yes. Each child takes home what they made, such as a spinner and photo frame, a clay mirror or a fridge magnet, so no separate return gift is needed.",
      },
      {
        q: "How far in advance should I book a kids' birthday workshop?",
        a: "A minimum of 7 days' notice and a 50% deposit are required. For weekend dates between November and February, book three to four weeks ahead.",
      },
    ],
  },
  {
    slug: 'childrens-day-art-workshop-schools-delhi-ncr',
    title: "Children's Day Art Workshop Ideas for Schools in Delhi NCR",
    metaTitle: "Children's Day Art Workshop Delhi NCR Schools | Kraftykinni",
    metaDescription:
      "Children's Day (14 November) art workshop ideas for Delhi NCR schools: clay, fridge magnets, tote bags and more. From ₹600/student, materials included.",
    publishDate: '2026-10-26',
    category: 'School & College' as const,
    relatedWorkshop: 'tote-bag-painting',
    excerpt:
      "Children's Day on 14 November is usually a day of performances, games and treats. A guided art workshop gives every student something to make and take home, and the school only needs to provide space and a time slot.",
    keywords: [
      "children's day activity ideas for schools Delhi NCR",
      "children's day art workshop Delhi",
      "14 november school activity Gurgaon Noida",
      "art workshop for school students Delhi NCR",
      "children's day craft ideas for school",
    ],
    sections: [
      {
        body: `Children's Day is celebrated on 14 November across India, and in 2026 it falls on a Saturday, so schools planning something around it should settle the date early. Most schools fill the occasion with performances, games and treats. A guided art session adds something every child actually makes and takes home.\n\nKraftykinni runs these sessions at schools across Delhi, Gurgaon and Noida. The facilitator brings every material, sets up, runs the session and clears up afterwards, so the school only needs to provide a space and a time slot.`,
      },
      {
        heading: "Why an Art Workshop Works for Children's Day",
        body: `Children's Day events often turn out to be something children watch or receive. An art workshop reverses that: every student is the maker. Sessions are guided step by step by [Shramita Govil](/about), a Fevicryl Certified Artist, and are designed for beginners, so no child needs prior art experience to finish a piece.\n\nBecause every student takes their piece home, the day leaves behind something they can show their family, not just a memory of the event.`,
      },
      {
        heading: "Workshop Formats That Suit a Children's Day Session",
        body: `These formats come from the regular Kraftykinni workshop menu. Durations are the ones listed on each workshop page, and all materials are included.`,
        listItems: [
          "Clay Art: a hand-built air-dry clay piece (1.5–2 hours)",
          "MDF Fridge Magnets: a set of hand-painted magnets (1.5–2 hours)",
          "Tote Bag Painting: a hand-painted cotton tote (1.5–2 hours)",
          "Canvas Pouch: a personalised hand-painted pouch (1.5–2 hours)",
          "Rock Painting: one or more painted stones (1–1.5 hours), the shortest format and the best fit for a shorter slot",
        ],
        listType: 'ul',
      },
      {
        heading: "Pricing and Group Sizes",
        body: `School sessions cost ₹800 per person for groups of 20–50, ₹700 for 50–100 and ₹600 for 100+, all materials included, with no extra venue or logistics charge because the facilitator travels to you. Groups run from 20 to 200+ students, and our team can coordinate batch size and timing with your school.\n\nSee the [school art workshops](/school-art-workshops) page for how a school booking works, or the [Clay Art](/workshops/clay-art) and [Tote Bag Painting](/workshops/tote-bag-painting) pages for details of two popular formats.`,
      },
      {
        heading: "How to Book for Children's Day",
        body: `Kraftykinni recommends a minimum of 7 days' advance notice for all bookings, and 2 to 3 weeks for dates close to a major occasion because of seasonal demand. Booking early gives you the widest choice of dates and formats.\n\nWhatsApp **+91 9599622210** with your location (Delhi, Gurgaon or Noida), group size, preferred date and format. We confirm within 24 hours.`,
      },
    ],
    faq: [
      {
        q: "What art activity works best for Children's Day in a school?",
        a: "Clay Art, MDF fridge magnets, tote bag painting and canvas pouches all work well because every student finishes a piece to take home. Rock Painting is the shortest format at 1 to 1.5 hours, which suits a shorter slot.",
      },
      {
        q: "How much does a Children's Day art workshop cost for a school?",
        a: "School workshops cost ₹800 per student for groups of 20–50, ₹700 for 50–100 and ₹600 for 100+, all materials included. The facilitator travels to your school, so there is no extra venue charge.",
      },
      {
        q: "Do students need any art experience?",
        a: "No. Every session is designed for beginners and guided step by step by Shramita Govil, a Fevicryl Certified Artist.",
      },
      {
        q: "How early should a school book a Children's Day workshop?",
        a: "Kraftykinni needs a minimum of 7 days' notice, and recommends 2 to 3 weeks for dates close to 14 November because of seasonal demand.",
      },
    ],
  },
  {
    slug: 'christmas-art-workshop-corporate-schools-delhi-ncr',
    title: "Christmas Art Workshop Ideas for Offices and Schools in Delhi NCR",
    metaTitle: "Christmas Art Workshop Delhi NCR | Kraftykinni",
    metaDescription:
      "Christmas art workshop ideas for Delhi NCR offices and schools: bottle lamps, glass painting, clay and tote bags. From ₹600/person, materials included.",
    publishDate: '2026-11-30',
    category: 'Corporate' as const,
    relatedWorkshop: 'bottle-lamp-art',
    excerpt:
      "Christmas on 25 December is a natural moment for a year-end team session or a school celebration. A guided art workshop gives everyone a festive piece to take home, with all materials and setup handled by Kraftykinni.",
    keywords: [
      "christmas activity ideas for office Delhi NCR",
      "christmas art workshop Gurgaon",
      "christmas workshop for schools Delhi",
      "corporate christmas celebration ideas Noida",
      "year end team activity Delhi NCR",
    ],
    sections: [
      {
        body: `Christmas on 25 December falls on a Friday in 2026, which puts the build-up in the last weeks of the year, when offices wind down and schools hold their winter celebrations. A guided art workshop turns that moment into a hands-on activity where everyone leaves with a piece they made themselves.\n\nKraftykinni runs these sessions at offices and schools across Delhi, Gurgaon and Noida. The facilitator brings all materials, sets up, runs the session and handles cleanup.`,
      },
      {
        heading: "Why an Art Workshop Fits a Year-End Celebration",
        body: `Year-end events tend to centre on food, music and gifts that people receive. An art workshop asks everyone to make something instead, and it works for mixed groups because no prior art experience is needed. Sessions are led by [Shramita Govil](/about), a Fevicryl Certified Artist, and every participant takes their finished piece home.\n\nFor offices, that doubles as a team activity and a personal keepsake. For schools, it gives a class a calm, creative period in the middle of a busy celebration week.`,
      },
      {
        heading: "Workshop Formats That Suit Christmas",
        body: `These formats come from the regular Kraftykinni workshop menu. Each can be themed with festive colours and motifs, so mention the look you want when you enquire.`,
        listItems: [
          "Bottle Lamp Art: a hand-painted glass bottle lamp with fairy lights (1.5–2 hours)",
          "Glass Painting: a hand-painted frame, bottle or panel with translucent designs (1.5–2 hours)",
          "Clay Art: a hand-built air-dry clay piece (1.5–2 hours)",
          "Tote Bag Painting: a hand-painted cotton tote (1.5–2 hours)",
          "MDF Fridge Magnets: a set of hand-painted magnets (1.5–2 hours)",
        ],
        listType: 'ul',
      },
      {
        heading: "Pricing and Group Sizes",
        body: `Pricing is ₹800 per person for groups of 20–50, ₹700 for 50–100 and ₹600 for 100+, all materials included, with no extra venue or logistics charge because the facilitator travels to you. Groups run from 20 to 200+ participants.\n\nSee the [corporate art workshops](/corporate-art-workshops) page for office bookings and the [school art workshops](/school-art-workshops) page for schools. You can also read how [Bottle Lamp Art](/workshops/bottle-lamp-art) works step by step.`,
      },
      {
        heading: "How to Book for Christmas",
        body: `Kraftykinni recommends a minimum of 7 days' advance notice for all bookings, and 2 to 3 weeks for dates close to Christmas because December calendars fill quickly.\n\nWhatsApp **+91 9599622210** with your location (Delhi, Gurgaon or Noida), group size, preferred date and format. We confirm within 24 hours.`,
      },
    ],
    faq: [
      {
        q: "What are good Christmas activity ideas for an office in Delhi NCR?",
        a: "A guided art workshop works well for a year-end office celebration. Bottle Lamp Art, Glass Painting, Clay Art, Tote Bag Painting and MDF fridge magnets all give each person a finished piece to take home.",
      },
      {
        q: "Can the workshop be themed for Christmas?",
        a: "Yes. The formats can be given festive colours and motifs. Tell us the look you want when you enquire and we will plan the session around it.",
      },
      {
        q: "How much does a Christmas art workshop cost?",
        a: "Pricing is ₹800 per person for groups of 20–50, ₹700 for 50–100 and ₹600 for 100+, all materials included.",
      },
      {
        q: "Can Kraftykinni run a Christmas workshop at a school?",
        a: "Yes. Kraftykinni runs workshops at schools across Delhi, Gurgaon and Noida, with the facilitator bringing all materials and handling setup and cleanup.",
      },
    ],
  },
  {
    slug: 'lohri-celebration-art-workshop-corporate-delhi-ncr',
    title: "Lohri Celebration Ideas: Art Workshops for Offices in Delhi NCR",
    metaTitle: "Lohri Art Workshop for Offices Delhi NCR | Kraftykinni",
    metaDescription:
      "Lohri celebration ideas for Delhi NCR offices: diya painting, mandala art, block printing and tie & dye. From ₹600/person, materials included.",
    publishDate: '2026-12-18',
    category: 'Corporate' as const,
    relatedWorkshop: 'clay-art',
    excerpt:
      "Lohri on 13 January is a harvest festival of bonfires, music and shared food. A guided art workshop adds a hands-on activity to an office celebration, with every employee taking home a piece they made.",
    keywords: [
      "lohri celebration ideas for office Delhi NCR",
      "lohri activity ideas Gurgaon",
      "lohri art workshop corporate",
      "lohri team activity Noida",
      "january office celebration ideas Delhi NCR",
    ],
    sections: [
      {
        body: `Lohri is celebrated on 13 January, and in 2027 it falls on a Wednesday. It is a harvest festival marked by bonfires, music and shared food, and many offices in Delhi NCR mark it with a team lunch or a small gathering. A guided art workshop adds an activity where everyone takes part rather than only watching or eating.\n\nKraftykinni sets up at your office across Delhi, Gurgaon and Noida, so an indoor session works even when January mornings are cold.`,
      },
      {
        heading: "Why an Art Workshop Works for Lohri",
        body: `Lohri celebrations at work usually centre on food and conversation. A workshop gives teams a shared task, and because every format is designed for beginners, colleagues at every level can join in. Sessions are led by [Shramita Govil](/about), a Fevicryl Certified Artist, and each participant takes their finished piece home.\n\nIt also works in a short window: formats run from 1.5 to 2 hours, so the session fits into a half-day celebration.`,
      },
      {
        heading: "Workshop Formats That Suit Lohri",
        body: `These formats come from the regular Kraftykinni workshop menu. All materials are included.`,
        listItems: [
          "Diya Painting using the Clay Art technique: hand-painted clay diyas with acrylic colours",
          "Mandala Art: a colourful symmetric mandala on canvas or paper (1.5–2 hours)",
          "Block Printing: a block-printed fabric item such as a tote bag or dupatta (1.5–2 hours)",
          "Tie & Dye: a one-of-a-kind tie-dye fabric item (1.5–2 hours)",
        ],
        listType: 'ul',
      },
      {
        heading: "Pricing and Group Sizes",
        body: `Pricing is ₹800 per person for groups of 20–50, ₹700 for 50–100 and ₹600 for 100+, all materials included, with no extra venue or logistics charge because the facilitator travels to you. Groups run from 20 to 200+ employees.\n\nSee the [corporate art workshops](/corporate-art-workshops) page for how an office booking works, or the [Mandala Art](/workshops/mandala-art) and [Block Printing](/workshops/block-printing) pages for two popular formats.`,
      },
      {
        heading: "How to Book for Lohri",
        body: `Kraftykinni recommends a minimum of 7 days' advance notice for all bookings, and 2 to 3 weeks for dates close to a festival. Bookings made before the winter break give you the widest choice of dates.\n\nWhatsApp **+91 9599622210** with your location (Delhi, Gurgaon or Noida), group size, preferred date and format. We confirm within 24 hours.`,
      },
    ],
    faq: [
      {
        q: "What are good Lohri activity ideas for an office in Delhi NCR?",
        a: "A guided art workshop is a good fit. Diya Painting, Mandala Art, Block Printing and Tie & Dye are all beginner-friendly, and every employee takes home a finished piece.",
      },
      {
        q: "How long does a Lohri art workshop take?",
        a: "Most formats run 1.5 to 2 hours, so a session fits into a half-day celebration.",
      },
      {
        q: "How much does a corporate Lohri workshop cost?",
        a: "Pricing is ₹800 per person for groups of 20–50, ₹700 for 50–100 and ₹600 for 100+, all materials included.",
      },
      {
        q: "Can the workshop be held at our office?",
        a: "Yes. Kraftykinni travels to your office across Delhi, Gurgaon and Noida and handles setup and cleanup on site.",
      },
    ],
  },
  {
    slug: 'republic-day-art-workshop-schools-delhi-ncr',
    title: "Republic Day Art Workshop Ideas for Schools in Delhi NCR",
    metaTitle: "Republic Day Art Workshop Delhi NCR Schools | Kraftykinni",
    metaDescription:
      "Republic Day art workshop ideas for Delhi NCR schools: tricolour bottle art, tote bags, canvas pouches and rock painting. From ₹600/student.",
    publishDate: '2027-01-02',
    category: 'School & College' as const,
    relatedWorkshop: 'rock-painting',
    excerpt:
      "Republic Day on 26 January is usually marked with a parade, songs and speeches. A guided art workshop gives students a tricolour piece they make and keep, and Kraftykinni handles all materials and setup.",
    keywords: [
      "republic day activity ideas for schools Delhi NCR",
      "republic day art workshop Delhi",
      "26 january craft activity school Gurgaon",
      "tricolour craft workshop Noida",
      "republic day craft ideas for school",
    ],
    sections: [
      {
        body: `Republic Day is on 26 January, and in 2027 it falls on a Tuesday. Schools usually mark it with a flag hoisting, songs and speeches. A guided art workshop adds an activity where every student makes something to take home.\n\nKraftykinni runs these sessions at schools across Delhi, Gurgaon and Noida. The facilitator brings all materials, sets up, runs the session and handles cleanup.`,
      },
      {
        heading: "Why an Art Workshop Works for Republic Day",
        body: `Republic Day programmes are often something students watch or perform in. An art workshop lets every student take part by making their own piece. Sessions are guided step by step by [Shramita Govil](/about), a Fevicryl Certified Artist, and are designed for beginners.\n\nIf you ran a tricolour activity for Independence Day, our [Independence Day bottle art guide](/blog/independence-day-bottle-art-workshop-delhi-ncr) shows the formats that carry over to 26 January.`,
      },
      {
        heading: "Workshop Formats That Suit Republic Day",
        body: `These formats come from the regular Kraftykinni workshop menu. Each can be given a tricolour or patriotic theme, so mention the look you want when you enquire.`,
        listItems: [
          "Bottle Art: a hand-painted bottle in tricolour or monument-mural designs, adapted from Bottle Lamp Art",
          "Tote Bag Painting: a hand-painted cotton tote (1.5–2 hours)",
          "Canvas Pouch: a personalised hand-painted pouch (1.5–2 hours)",
          "Rock Painting: one or more painted stones (1–1.5 hours), the shortest format",
        ],
        listType: 'ul',
      },
      {
        heading: "Pricing and Group Sizes",
        body: `School sessions cost ₹800 per person for groups of 20–50, ₹700 for 50–100 and ₹600 for 100+, all materials included, with no extra venue or logistics charge because the facilitator travels to you. Groups run from 20 to 200+ students, and our team can coordinate batch size and timing with your school.\n\nSee the [school art workshops](/school-art-workshops) page for how a school booking works, or the [Bottle Lamp Art](/workshops/bottle-lamp-art) page for the base format behind our bottle art.`,
      },
      {
        heading: "How to Book for Republic Day",
        body: `Kraftykinni recommends a minimum of 7 days' advance notice for all bookings, and 2 to 3 weeks for dates close to a major occasion because of seasonal demand. Schools reopening after the winter break should book early.\n\nWhatsApp **+91 9599622210** with your location (Delhi, Gurgaon or Noida), group size, preferred date and format. We confirm within 24 hours.`,
      },
    ],
    faq: [
      {
        q: "What art activity works best for Republic Day in a school?",
        a: "Tricolour bottle art, tote bag painting, canvas pouches and rock painting all let every student finish a piece to take home. Rock Painting is the shortest format at 1 to 1.5 hours.",
      },
      {
        q: "How much does a Republic Day art workshop cost for a school?",
        a: "School workshops cost ₹800 per student for groups of 20–50, ₹700 for 50–100 and ₹600 for 100+, all materials included.",
      },
      {
        q: "Do students need any art experience?",
        a: "No. Every session is designed for beginners and guided step by step by Shramita Govil, a Fevicryl Certified Artist.",
      },
      {
        q: "How early should a school book a Republic Day workshop?",
        a: "Kraftykinni needs a minimum of 7 days' notice, and recommends 2 to 3 weeks for dates close to 26 January because of seasonal demand.",
      },
    ],
  },
];

// Posts dated in the future stay hidden until their publishDate arrives.
// scripts/prerender.mjs applies the same rule to static pages, sitemap and RSS.
const todayISO = new Date().toISOString().slice(0, 10);
export const blogPosts: BlogPost[] = allBlogPosts.filter((p) => p.publishDate <= todayISO);
