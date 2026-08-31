import { Helmet } from 'react-helmet-async';
import About from '../components/About';
import ContactFooter from '../components/ContactFooter';
import { KRAFTYKINNI_SAME_AS } from '../data/siteConstants';

export default function AboutPage() {
  const title = 'Fevicryl Certified Art Workshop Facilitator Delhi NCR | Kraftykinni';
  const description =
    'Shramita Govil — Fevicryl Certified Artist. 50+ workshops, 1,500+ participants across Delhi, Gurgaon & Noida — corporate teams, schools & private events.';
  const canonical = 'https://kraftykinni.in/about';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shramita Govil',
    jobTitle: 'Fevicryl Certified Artist & Workshop Facilitator',
    description: 'Fevicryl Certified Artist and workshop facilitator based in Delhi NCR. Has conducted 50+ workshops for corporate teams, schools, and private events with 1,500+ participants.',
    worksFor: {
      '@type': 'LocalBusiness',
      name: 'Kraftykinni',
      url: 'https://kraftykinni.in',
      sameAs: KRAFTYKINNI_SAME_AS,
    },
    url: canonical,
    sameAs: KRAFTYKINNI_SAME_AS,
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Fevicryl Certified Artist',
      credentialCategory: 'Professional Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Pidilite Industries',
        url: 'https://www.pidilite.com',
      },
    },
    knowsAbout: [
      'Lippan Art', 'Mandala Art', 'Tie and Dye', 'Block Printing',
      'Clay Art', 'Texture Art', 'Glass Painting', 'Boho Canvas Art',
      'Wall Rope Art',
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kraftykinni.in/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: canonical },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://cdn.kraftykinni.in/workshops/profile.webp" />
        <meta property="og:site_name" content="Kraftykinni" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://cdn.kraftykinni.in/workshops/profile.webp" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <main className="pt-20">
        <About />
        <ContactFooter />
      </main>
    </>
  );
}

