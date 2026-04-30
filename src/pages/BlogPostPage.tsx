import { useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Calendar, ArrowLeft, ArrowRight, Tag, Clock } from 'lucide-react';
import { blogPosts, type BlogPost, type BlogFaqItem } from '../data/blogPosts';
import ContactFooter from '../components/ContactFooter';
import { useBookNow } from '../hooks/useBookNow';

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Rough reading time: ~200 words per minute */
function readingTime(post: BlogPost): number {
  const wordCount = post.sections.reduce((acc, s) => {
    const words = [s.heading ?? '', s.body, ...(s.listItems ?? [])].join(' ').split(/\s+/).length;
    return acc + words;
  }, 0);
  return Math.max(1, Math.round(wordCount / 200));
}

const CATEGORY_COLORS: Record<BlogPost['category'], string> = {
  'Corporate': 'bg-brand-pink/10 text-brand-pink',
  'School & College': 'bg-blue-50 text-blue-600',
  'Private Events': 'bg-purple-50 text-purple-600',
  'Workshop Guides': 'bg-emerald-50 text-emerald-600',
};

// ─── Body renderer ───────────────────────────────────────────────────────────

/**
 * Renders a body string that supports **bold** markdown inline.
 * Splits on double newlines into paragraphs.
 */
function BodyText({ text }: { text: string }) {
  const paragraphs = text.split('\n\n').filter(Boolean);

  // Parse a single string segment into bold / link / plain spans
  function renderInline(raw: string) {
    // Split on **bold** and [text](url) tokens
    const parts = raw.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={j} className="font-semibold text-brand-slate">
            {part.slice(2, -2)}
          </strong>
        );
      }
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isInternal = href.startsWith('/');
        return isInternal ? (
          <Link key={j} to={href} className="text-brand-pink underline underline-offset-2 hover:text-brand-pink-light transition-colors">
            {label}
          </Link>
        ) : (
          <a key={j} href={href} target="_blank" rel="noopener noreferrer" className="text-brand-pink underline underline-offset-2 hover:text-brand-pink-light transition-colors">
            {label}
          </a>
        );
      }
      return part;
    });
  }

  return (
    <>
      {paragraphs.map((para, i) => (
        <p key={i} className="text-brand-charcoal leading-relaxed mb-5 text-[1.0625rem]">
          {renderInline(para)}
        </p>
      ))}
    </>
  );
}

// ─── FAQ block ───────────────────────────────────────────────────────────────

function FaqBlock({ items }: { items: BlogFaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-10 mb-8">
      <h2 className="font-serif text-2xl font-bold text-brand-slate mb-6">
        Frequently asked questions
      </h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              aria-expanded={openIndex === i}
            >
              <span className="font-semibold text-brand-slate text-sm pr-4 leading-snug">
                {item.q}
              </span>
              <span className={`text-brand-pink flex-shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-45' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </button>
            {openIndex === i && (
              <div className="px-6 pb-5">
                <p className="text-brand-charcoal/80 text-sm leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const bookNow = useBookNow();

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);
  if (!post) return <Navigate to="/blog" replace />;

  const canonical = `https://kraftykinni.in/blog/${post.slug}`;
  const mins = readingTime(post);

  // Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      '@type': 'Person',
      name: 'Shramita Govil',
      url: 'https://kraftykinni.in/about',
      jobTitle: 'Fevicryl Certified Artist & Workshop Facilitator',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kraftykinni',
      url: 'https://kraftykinni.in',
      logo: { '@type': 'ImageObject', url: 'https://kraftykinni.in/logo.jpeg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    image: 'https://kraftykinni.in/logo.jpeg',
    keywords: post.keywords.join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kraftykinni.in/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://kraftykinni.in/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
    ],
  };

  // Related posts (same category, excluding current)
  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const faqSchema = post.faq && post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  } : null;

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords.join(', ')} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Kraftykinni" />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://kraftykinni.in/logo.jpeg" />
        <meta property="og:locale" content="en_IN" />
        <meta property="article:published_time" content={post.publishDate} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={post.metaTitle} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content="https://kraftykinni.in/logo.jpeg" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <main className="pt-24 bg-brand-offwhite min-h-screen">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-brand-pink transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-brand-pink transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-brand-charcoal/60 truncate max-w-[220px]">{post.title}</span>
          </nav>
        </div>

        {/* Article header */}
        <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Category + meta */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${CATEGORY_COLORS[post.category]}`}>
                <Tag size={11} />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar size={12} />
                {formatDate(post.publishDate)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock size={12} />
                {mins} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.625rem] font-bold text-brand-slate leading-tight mb-6">
              {post.title}
            </h1>

            {/* Byline */}
            <div className="flex items-center gap-3 border-t border-gray-100 pt-6">
              <div className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink font-bold text-sm font-serif">
                SG
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-slate">Shramita Govil</p>
                <p className="text-xs text-gray-400">Fevicryl Certified Artist · Founder, Kraftykinni</p>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gray-200" />
        </div>

        {/* Article body */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          {post.sections.map((section, i) => (
            <section key={i} className="mb-8">
              {section.heading && (
                <h2 className="font-serif text-2xl font-bold text-brand-slate mb-4 leading-snug">
                  {section.heading}
                </h2>
              )}

              <BodyText text={section.body} />

              {section.listItems && section.listItems.length > 0 && (
                section.listType === 'ol' ? (
                  <ol className="list-decimal list-outside ml-5 space-y-2 mb-5">
                    {section.listItems.map((item, j) => (
                      <li key={j} className="text-brand-charcoal leading-relaxed text-[1.0625rem]">{item}</li>
                    ))}
                  </ol>
                ) : (
                  <ul className="list-disc list-outside ml-5 space-y-2 mb-5">
                    {section.listItems.map((item, j) => (
                      <li key={j} className="text-brand-charcoal leading-relaxed text-[1.0625rem]">{item}</li>
                    ))}
                  </ul>
                )
              )}
            </section>
          ))}

          {/* FAQ block */}
          {post.faq && post.faq.length > 0 && (
            <FaqBlock items={post.faq} />
          )}

          {/* Inline CTA box */}
          <div className="mt-12 bg-brand-pink/5 border border-brand-pink/20 rounded-2xl p-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-pink mb-3">
              Ready to book?
            </p>
            <h3 className="font-serif text-2xl font-bold text-brand-slate mb-3">
              Run a workshop for your team
            </h3>
            <p className="text-brand-charcoal/80 mb-6 max-w-md mx-auto text-sm leading-relaxed">
              Kraftykinni conducts art workshops for corporate teams, schools, and private events across Delhi, Gurgaon, and Noida. ₹600–₹800 per person, all materials included.
            </p>
            <button
              onClick={bookNow}
              className="bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Get in Touch
            </button>
          </div>
        </motion.article>

        {/* Back to blog */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-brand-pink text-sm font-semibold hover:gap-3 transition-all duration-200"
          >
            <ArrowLeft size={15} />
            Back to all articles
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-gray-200">
            <h2 className="font-serif text-2xl font-bold text-brand-slate mb-8">
              More from{' '}
              <span className="text-brand-pink italic">Kraftykinni</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-pink block mb-3">
                    {p.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-brand-slate leading-snug group-hover:text-brand-pink transition-colors mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed line-clamp-2 mb-4">
                    {p.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-brand-pink text-sm font-semibold group-hover:gap-2.5 transition-all">
                    Read <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      <ContactFooter />
    </>
  );
}
