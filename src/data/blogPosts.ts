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
  {
    slug: 'art-workshop-ideas-birthday-party-delhi-ncr',
    title: 'Art Workshop Ideas for Birthday Parties in Delhi NCR',
    metaTitle: 'Art Workshop Ideas for Birthday Parties Delhi NCR | Kraftykinni',
    metaDescription:
      'Planning a birthday party in Delhi NCR? Skip the venue-and-buffet formula. Art workshops make every guest create something — and take it home. ₹600/person, all materials included.',
    publishDate: '2026-04-29',
    category: 'Private Events',
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
        body: `Kraftykinni runs private art workshops for birthday parties, kitty parties, bachelorette celebrations, and baby showers across Delhi, Gurgaon, and Noida. Every session is led by Shramita Govil, a Fevicryl-certified artist with 50+ workshops and 1,500+ participants across Delhi NCR.\n\nGet in touch via WhatsApp or the contact form to discuss your date, group size, and preferred activity. We'll confirm availability and send a quote within 24 hours.`,
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
];
