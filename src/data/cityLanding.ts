// Block 5 — city landing copy (audience sections + extra FAQs) for the Delhi,
// Gurgaon and Noida pages.
//
// Single source of truth: src/pages/LocationPage.tsx renders this file and
// scripts/prerender.mjs reads the same file for the plain-HTML copy, so the two
// cannot drift apart.
//
// RULES FOR EDITING
//  - Keep the data between the @prerender markers as a plain object literal:
//    no TypeScript syntax, no template strings, no variables. prerender.mjs
//    evaluates exactly that literal.
//  - Write plain text only (no HTML). prerender.mjs escapes it.
//  - Use only facts already published on the site (blog posts, city pages).

export type CityKey = 'delhi' | 'gurgaon' | 'noida';
export type AudienceKey = 'students' | 'kids' | 'adults' | 'corporate';

export interface CityAudience {
  key: AudienceKey;
  label: string;
  title: string;
  body: string;
  groupSize: string;
  price: string;
  note?: string;
  link?: { to: string; label: string };
}

export interface CityLanding {
  heading: string;
  intro: string;
  audiences: CityAudience[];
  faqs: { q: string; a: string }[];
}

export const cityLanding: Record<CityKey, CityLanding> = /* @prerender:start */ {
  delhi: {
    heading: "Who We Run Workshops For in Delhi",
    intro: "Four kinds of group book Kraftykinni in Delhi. Prices are per person, with all materials, setup and cleanup included.",
    audiences: [
      {
        key: "students",
        label: "Students",
        title: "Art workshops for students in Delhi",
        body: "We run workshops for schools and colleges across Vasant Kunj, Dwarka, Rohini and Saket, in assembly halls or classrooms, for annual days, art days and orientation programmes. Activities are matched to the age group, from Grade 3 through college, and every student takes a finished piece home.",
        groupSize: "20 to 200+ students",
        price: "₹800 for 20–50 · ₹700 for 50–100 · ₹600 for 100+, per student",
        link: { to: "/school-art-workshops", label: "School art workshops" },
      },
      {
        key: "kids",
        label: "Kids",
        title: "Kids' birthday art workshops in Delhi",
        body: "In October 2026 we ran two kids' birthday workshops in Delhi, each lasting 2 hours: 20 children aged 10 to 11 at a home party (DIY spinner and photo frame kits) and 10 children aged 10 to 11 at the Diggin café in Connaught Place (Clay Mirror Art). Every child took their piece home as the return gift.",
        groupSize: "10 to 80+ guests",
        price: "₹600–₹800 per person, depending on group size",
        note: "Groups under 20: WhatsApp +91 9599622210 for a quote.",
        link: { to: "/blog/kids-birthday-party-art-workshop-delhi-noida", label: "Kids' birthday art workshops in Delhi NCR: 3 real parties" },
      },
      {
        key: "adults",
        label: "Adults",
        title: "Painting workshops for adults in Delhi",
        body: "Kitty parties, birthdays and bachelorette celebrations in South Delhi, Hauz Khas and central Delhi, at your home, a rented farmhouse or a café. Boho Canvas Art and Glass Painting are the most popular choices for birthdays, and Tote Bag Painting suits themed events. No painting experience is needed.",
        groupSize: "10 to 80+ guests",
        price: "₹600–₹800 per person, depending on group size",
        note: "Groups under 20: WhatsApp +91 9599622210 for a quote.",
        link: { to: "/blog/painting-workshop-for-adults-delhi-ncr-groups", label: "Painting workshops for adults in Delhi NCR" },
      },
      {
        key: "corporate",
        label: "Corporate",
        title: "Corporate team workshops in Delhi",
        body: "Offices in Connaught Place, Bhikaji Cama Place and Nehru Place are our most frequent Delhi bookings. We set up on your conference room floor or cafeteria in about 20 minutes and handle all cleanup. Teams book us for quarterly team events, onboarding days and annual day activities.",
        groupSize: "20 to 200+ people",
        price: "₹800 for 20–50 · ₹700 for 50–100 · ₹600 for 100+, per person",
        link: { to: "/corporate-art-workshops", label: "Corporate art workshops" },
      },
    ],
    faqs: [
      {
        q: "Do you run art workshops for students in Delhi?",
        a: "Yes. Kraftykinni runs guided art workshops for students from Grade 3 through college at schools and colleges across Delhi, including Vasant Kunj, Dwarka, Rohini and Saket. Pricing is ₹800 per student for groups of 20–50, ₹700 for 50–100 and ₹600 for 100+, with all materials included. We travel to your school and handle setup and cleanup.",
      },
      {
        q: "Do you run art classes or one-off workshops in Delhi?",
        a: "Kraftykinni runs one-off guided workshops, not a weekly class. Each session lasts 1.5 to 2 hours at your venue in Delhi, and every participant finishes and takes home a piece in that single sitting. If you want a recurring course, WhatsApp +91 9599622210 and we will discuss it.",
      },
    ],
  },
  gurgaon: {
    heading: "Who We Run Workshops For in Gurgaon",
    intro: "Four kinds of group book Kraftykinni in Gurgaon. Prices are per person, with all materials, setup and cleanup included.",
    audiences: [
      {
        key: "students",
        label: "Students",
        title: "Art workshops for students in Gurgaon",
        body: "We work with schools along Sohna Road and across Sectors 49 and 56 for annual days and craft weeks, from Grade 3 through college level. The facilitator brings all materials, sets up before the session and cleans up after, so the school only provides the room, tables and chairs.",
        groupSize: "20 to 200+ students",
        price: "₹800 for 20–50 · ₹700 for 50–100 · ₹600 for 100+, per student",
        link: { to: "/school-art-workshops", label: "School art workshops" },
      },
      {
        key: "kids",
        label: "Kids",
        title: "Kids' birthday art workshops in Gurgaon",
        body: "We run kids' birthday workshops at your home, a farmhouse, a club, a café or a hired venue, and each child takes their finished piece home as the return gift. Clay fridge magnets suit ages 4 to 7, while Clay Mirror Art and DIY spinner and photo frame kits suit ages 10 to 11.",
        groupSize: "10 to 80+ guests",
        price: "₹600–₹800 per person, depending on group size",
        note: "Groups under 20: WhatsApp +91 9599622210 for a quote.",
        link: { to: "/blog/kids-birthday-party-art-workshop-delhi-noida", label: "Kids' birthday art workshops in Delhi NCR: 3 real parties" },
      },
      {
        key: "adults",
        label: "Adults",
        title: "Painting workshops for adults in Gurgaon",
        body: "Kitty parties, birthdays, bachelorettes and baby showers, at your Gurgaon home, a banquet hall or a café. We come to you, and your space only needs tables, chairs and adequate lighting. Every session is guided step by step, so no painting experience is needed.",
        groupSize: "10 to 80+ guests",
        price: "₹600–₹800 per person, depending on group size",
        note: "Groups under 20: WhatsApp +91 9599622210 for a quote.",
        link: { to: "/blog/painting-workshop-for-adults-delhi-ncr-groups", label: "Painting workshops for adults in Delhi NCR" },
      },
      {
        key: "corporate",
        label: "Corporate",
        title: "Corporate team workshops in Gurgaon",
        body: "DLF Cyber City is our most frequent Gurgaon booking location, and we also work in Udyog Vihar, MG Road, Golf Course Road and Sohna Road. 40 Cars24 employees painted clay trinkets at their Gurgaon office in a 2-hour session, with setup taking under 20 minutes.",
        groupSize: "20 to 200+ people",
        price: "₹800 for 20–50 · ₹700 for 50–100 · ₹600 for 100+, per person",
        link: { to: "/blog/clay-trinket-painting-workshop-cars24-gurgaon", label: "Cars24 Gurgaon case study" },
      },
    ],
    faqs: [
      {
        q: "Do you run art workshops for students in Gurgaon?",
        a: "Yes. Kraftykinni runs guided art workshops for students from Grade 3 through college at schools in Gurgaon, including along Sohna Road and across Sectors 49 and 56. Pricing is ₹800 per student for groups of 20–50, ₹700 for 50–100 and ₹600 for 100+, with all materials included. We travel to your school and handle setup and cleanup.",
      },
      {
        q: "Do you run art classes or one-off workshops in Gurgaon?",
        a: "Kraftykinni runs one-off guided workshops, not a weekly class. Each session lasts 1.5 to 2 hours at your venue in Gurgaon, and every participant finishes and takes home a piece in that single sitting. If you want a recurring course, WhatsApp +91 9599622210 and we will discuss it.",
      },
    ],
  },
  noida: {
    heading: "Who We Run Workshops For in Noida",
    intro: "Four kinds of group book Kraftykinni in Noida and Greater Noida. Prices are per person, with all materials, setup and cleanup included.",
    audiences: [
      {
        key: "students",
        label: "Students",
        title: "Art workshops for students in Noida",
        body: "Amity University is one of our most repeated bookings, and we work with colleges in the Knowledge Park and Sector 125 belt for fests, orientation days and student events. In Greater Noida, 150+ students at Jaypee Public School made Bottle Lamp Art together in a single session.",
        groupSize: "20 to 200+ students",
        price: "₹800 for 20–50 · ₹700 for 50–100 · ₹600 for 100+, per student",
        link: { to: "/blog/bottle-lamp-art-workshop-school-delhi-ncr", label: "Jaypee Public School case study" },
      },
      {
        key: "kids",
        label: "Kids",
        title: "Kids' birthday art workshops in Noida",
        body: "On 24 October 2026 we ran a Clay Fridge Magnet workshop at a home in Noida for 24 children aged 4 to 7. Each child worked on their own coloured sheet on the floor, the session lasted 2 hours, and every child took their magnet home.",
        groupSize: "10 to 80+ guests",
        price: "₹600–₹800 per person, depending on group size",
        note: "Groups under 20: WhatsApp +91 9599622210 for a quote.",
        link: { to: "/blog/kids-birthday-party-art-workshop-delhi-noida", label: "Kids' birthday art workshops in Delhi NCR: 3 real parties" },
      },
      {
        key: "adults",
        label: "Adults",
        title: "Painting workshops for adults in Noida",
        body: "Kitty parties, birthdays and bachelorettes, at your home, a banquet hall or a café anywhere in Noida and Greater Noida. Your space only needs tables, chairs and adequate lighting. Every session is guided step by step, so no painting experience is needed.",
        groupSize: "10 to 80+ guests",
        price: "₹600–₹800 per person, depending on group size",
        note: "Groups under 20: WhatsApp +91 9599622210 for a quote.",
        link: { to: "/blog/painting-workshop-for-adults-delhi-ncr-groups", label: "Painting workshops for adults in Delhi NCR" },
      },
      {
        key: "corporate",
        label: "Corporate",
        title: "Corporate team workshops in Noida",
        body: "Teams in Sector 62, Sector 16 and Film City Road book us for team-building days and wellness events. A 20-person team at a Sector 90 office ran a desk-side Dot Mandala Art session at their own workstations, with no change of venue.",
        groupSize: "20 to 200+ people",
        price: "₹800 for 20–50 · ₹700 for 50–100 · ₹600 for 100+, per person",
        link: { to: "/blog/dot-mandala-art-corporate-workshop-noida", label: "Noida Sector 90 case study" },
      },
    ],
    faqs: [
      {
        q: "Do you run art workshops for students in Noida?",
        a: "Yes. Kraftykinni runs guided art workshops for students from Grade 3 through college at schools and colleges across Noida and Greater Noida, including Amity University and institutions in Knowledge Park and Sector 125. Pricing is ₹800 per student for groups of 20–50, ₹700 for 50–100 and ₹600 for 100+, with all materials included. We travel to your campus and handle setup and cleanup.",
      },
      {
        q: "Do you run art classes or one-off workshops in Noida?",
        a: "Kraftykinni runs one-off guided workshops, not a weekly class. Each session lasts 1.5 to 2 hours at your venue in Noida, and every participant finishes and takes home a piece in that single sitting. If you want a recurring course, WhatsApp +91 9599622210 and we will discuss it.",
      },
    ],
  },
} /* @prerender:end */;
