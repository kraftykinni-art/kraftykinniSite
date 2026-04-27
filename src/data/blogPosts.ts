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
];
