// Block 5 — case studies shown on the corporate and school pages.
//
// Only sessions that are already published as blog posts belong here. Every
// figure below comes from that post. To add one, publish the post first, then
// add an entry that points at its slug.
//
// Rendered by src/components/CaseStudyCard.tsx; scripts/prerender.mjs reads the
// same literal for the plain-HTML copy, so keep the data between the
// @prerender markers a plain array literal (no TypeScript syntax, no template
// strings, no variables) and write plain text only.

export type CaseStudyAudience = 'corporate' | 'school';

export interface CaseStudy {
  id: string;
  audience: CaseStudyAudience;
  client: string;
  activity: string;
  summary: string;
  groupSize: string;
  duration: string;
  venue: string;
  postSlug: string;
}

export const caseStudies: CaseStudy[] = /* @prerender:start */ [
  {
    id: "cars24-gurgaon",
    audience: "corporate",
    client: "Cars24, Gurgaon",
    activity: "Clay trinket painting",
    summary: "Employees painted hand-made clay trinkets with Fevicryl Mouldit and acrylic colours at their Gurgaon office, seated in groups of four to five. Setup took under 20 minutes.",
    groupSize: "40 employees",
    duration: "2 hours",
    venue: "Office",
    postSlug: "clay-trinket-painting-workshop-cars24-gurgaon",
  },
  {
    id: "noida-sector-90",
    audience: "corporate",
    client: "Noida Sector 90 office",
    activity: "Dot Mandala Art",
    summary: "A desk-side session at the team's own workstations: laptops closed, desks covered in palettes, dotting tools and round wooden bases, with no offsite venue.",
    groupSize: "20 people",
    duration: "About 1 hour, desk-side",
    venue: "Office floor",
    postSlug: "dot-mandala-art-corporate-workshop-noida",
  },
  {
    id: "jaypee-greater-noida",
    audience: "school",
    client: "Jaypee Public School, Greater Noida",
    activity: "Bottle Lamp Art",
    summary: "Students at the Hindustan Times Lit Fest Preview turned glass bottles into decorated lamps using Fevicryl Mouldit and acrylic colours. Every student took a finished piece home.",
    groupSize: "150+ students",
    duration: "90 minutes standard",
    venue: "School atrium floor",
    postSlug: "bottle-lamp-art-workshop-school-delhi-ncr",
  },
] /* @prerender:end */;

export const caseStudiesFor = (audience: CaseStudyAudience): CaseStudy[] =>
  caseStudies.filter((s) => s.audience === audience);
