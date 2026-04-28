import { Helmet } from 'react-helmet-async';
import About from '../components/About';
import ContactFooter from '../components/ContactFooter';

export default function AboutPage() {
  const title = 'About Kraftykinni | Shramita Govil – Fevicryl Certified Artist, Delhi NCR';
  const description =
    'Shramita Govil, Fevicryl-certified artist & founder of Kraftykinni. 50+ workshops, 1,500+ participants across Delhi NCR — corporate, school & private events.';
  const canonical = 'https://kraftykinni.in/about';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shramita Govil',
    jobTitle: 'Fevicryl Certified Artist & Workshop Facilitator',
    worksFor: {
      '@type': 'LocalBusiness',
      name: 'Kraftykinni',
      url: 'https://kraftykinni.in',
    },
    url: canonical,
    sameAs: [
      'https://www.instagram.com/kraftykinni',
      'https://www.linkedin.com/in/kraftykinni/',
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
        <meta property="og:image" content="https://kraftykinni.in/og-corporate.jpg" />
        <meta property="og:site_name" content="Kraftykinni" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://kraftykinni.in/og-corporate.jpg" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <main className="pt-20">
        <About />
        <ContactFooter />
      </main>
    </>
  );
}
