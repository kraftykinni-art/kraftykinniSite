import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, BookOpen, Check } from 'lucide-react';
import ContactFooter from '../components/ContactFooter';
import { useBookNow } from '../hooks/useBookNow';
import { trackGuideClick } from '../utils/analytics';
import { BLOCK_PRINTING_GUIDE as G, isGuideLive } from '../data/guides';

const PAGE_URL = 'https://kraftykinni.in/block-printing-guide';
const TITLE = 'Block Printing at Home: Beginner PDF Guide | Kraftykinni';
const DESCRIPTION =
  'A 29-page beginner PDF guide to block printing at home: 7 lessons, a tote bag and a cushion cover project. By Kraftykinni, Delhi NCR.';

const inside = [
  'What you need, and a shopping checklist',
  'Preparing fabric and a padded workspace',
  'Loading the block and stamping cleanly',
  'Straight, brick and half-drop repeat layouts',
  'Two projects: a tote bag and a cushion cover',
  'Combining blocks, with a real Kraftykinni example',
  'Drying, heat-setting and washing',
  'A troubleshooting page, glossary and printable practice sheets',
  'A bonus page on carving your own stamp safely',
];

const faqs = [
  {
    q: 'What do I get?',
    a: `One PDF (A4, ${G.pages} pages) that you download straight after paying. Read it on a phone or tablet, or print the quick-start and practice pages.`,
  },
  {
    q: 'Do I need any experience?',
    a: 'No. The guide starts from a plain piece of fabric and goes one step at a time.',
  },
  {
    q: 'Which colours and blocks do I need?',
    a: 'A block, colour made for fabric, cotton or linen fabric and a few simple tools. The guide has a shopping checklist with examples for India and for other countries. Brand names there are examples, not recommendations.',
  },
  {
    q: 'Are the pictures real?',
    a: 'Some illustrations in the guide are AI-generated. The studio tote, the group workshop photo and the author portrait are real photographs from Kraftykinni. The guide says so on its last page.',
  },
  {
    q: 'Who sells and delivers it?',
    a: 'Payment and delivery are handled by Gumroad, so you will pay on Gumroad’s page and receive the PDF from them by email. Refunds follow the policy shown on the product page.',
  },
  {
    q: 'Can I print it or share it?',
    a: 'You can print it for your own use. Please do not share or resell the file.',
  },
];

export default function BlockPrintingGuidePage() {
  const bookNow = useBookNow();
  const live = isGuideLive(G.gumroadUrl);

  const onBuy = (where: string) => trackGuideClick(G.slug, where);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kraftykinni.in/' },
      { '@type': 'ListItem', position: 2, name: 'Block Printing Guide (PDF)', item: PAGE_URL },
    ],
  };

  // Product schema only once there is a real link to buy from.
  const productSchema = live
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${G.title}: ${G.subtitle}`,
        description: DESCRIPTION,
        image: G.images.og,
        brand: { '@type': 'Brand', name: 'Kraftykinni' },
        offers: {
          '@type': 'Offer',
          url: G.gumroadUrl,
          price: G.price,
          priceCurrency: G.currency,
          availability: 'https://schema.org/InStock',
        },
      }
    : null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const BuyButton = ({ where, className = '' }: { where: string; className?: string }) =>
    live ? (
      <a
        href={G.gumroadUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onBuy(where)}
        className={`inline-flex items-center justify-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1 ${className}`}
      >
        <Download size={18} /> Get the guide · {G.priceLabel}
      </a>
    ) : (
      <span
        aria-disabled="true"
        className={`inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-500 px-8 py-4 rounded-full text-base font-medium cursor-not-allowed ${className}`}
      >
        Coming soon
      </span>
    );

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={G.images.og} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={G.images.og} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        {productSchema && <script type="application/ld+json">{JSON.stringify(productSchema)}</script>}
      </Helmet>

      <main className="pt-28 bg-brand-offwhite">
        {/* Hero */}
        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-brand-pink transition-colors">Home</Link>
                <span>/</span>
                <span className="text-brand-charcoal font-medium">Block Printing Guide (PDF)</span>
              </nav>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-pink mb-3">Beginner PDF guide</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">
                Block Printing <span className="text-brand-pink italic">at Home</span>
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">
                {G.subtitle}. {G.lessons} lessons and {G.projects} projects (a tote bag and a cushion cover) in a
                {' '}{G.pages}-page PDF. No experience needed.
              </p>
              <ul className="space-y-2 mb-8 text-gray-600 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-brand-pink" /> Instant PDF download</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-brand-pink" /> Printable quick-start and practice sheets</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-brand-pink" /> Written by a Fevicryl Certified Artist</li>
              </ul>
              <BuyButton where="guide_hero" />
              <p className="text-xs text-gray-400 mt-3">Secure checkout and delivery by Gumroad.</p>
            </div>
            <div className="flex justify-center">
              <img
                src={G.images.cover}
                alt="Cover of the Block Printing at Home beginner guide"
                width={909}
                height={1286}
                loading="eager"
                decoding="async"
                className="w-72 md:w-80 h-auto rounded-2xl shadow-xl border border-gray-100"
              />
            </div>
          </div>
        </section>

        {/* What's inside */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-brand-slate mb-8 flex items-center gap-3">
              <BookOpen className="text-brand-pink" size={28} /> What’s inside
            </h2>
            <ul className="space-y-3">
              {inside.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-600 font-light">
                  <Check size={18} className="text-brand-pink mt-1 shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-400 mt-6">
              Where products differ, the guide tells you to follow your own colour’s label rather than guess.
            </p>
          </div>
        </section>

        {/* Look inside */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-brand-slate text-center mb-10">
              Look <span className="text-brand-pink italic">inside</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {G.images.previews.map((p) => (
                <img
                  key={p.src}
                  src={p.src}
                  alt={p.alt}
                  width={909}
                  height={1286}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-xl shadow-md border border-gray-100"
                />
              ))}
            </div>
            <div className="text-center mt-10">
              <BuyButton where="guide_preview" />
            </div>
          </div>
        </section>

        {/* Author */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-brand-slate mb-4">
              From the <span className="text-brand-pink italic">Kraftykinni</span> studio
            </h2>
            <p className="text-gray-600 font-light leading-relaxed mb-6">
              Kraftykinni runs art workshops for companies, schools and private groups in Delhi, Gurgaon and Noida,
              led by Shramita Govil, a Fevicryl Certified Artist. This guide is the home version of our block
              printing workshop.
            </p>
            <button
              onClick={bookNow}
              className="inline-flex items-center gap-2 text-brand-pink font-medium hover:underline underline-offset-4"
            >
              Prefer to learn live? Book a workshop <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-brand-slate mb-8">Questions</h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-semibold text-brand-charcoal mb-1">{f.q}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-10">
              See our <Link to="/terms-of-service" className="text-brand-pink hover:underline">Terms</Link> and{' '}
              <Link to="/privacy-policy" className="text-brand-pink hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </section>
      </main>

      <ContactFooter />
    </>
  );
}
