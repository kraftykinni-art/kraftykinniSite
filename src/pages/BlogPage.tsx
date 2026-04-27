import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { blogPosts, type BlogPost } from '../data/blogPosts';
import ContactFooter from '../components/ContactFooter';

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const CATEGORY_COLORS: Record<BlogPost['category'], string> = {
  'Corporate': 'bg-brand-pink/10 text-brand-pink',
  'School & College': 'bg-blue-50 text-blue-600',
  'Private Events': 'bg-purple-50 text-purple-600',
  'Workshop Guides': 'bg-emerald-50 text-emerald-600',
};

// ─── Components ─────────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Top accent bar */}
      <div className="h-1 bg-brand-pink w-full" />

      <div className="p-7 flex flex-col flex-1">
        {/* Category + date */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${CATEGORY_COLORS[post.category]}`}>
            <Tag size={11} />
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <Calendar size={12} />
            {formatDate(post.publishDate)}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-xl font-bold text-brand-slate leading-snug mb-3 group-hover:text-brand-pink transition-colors duration-200">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-brand-charcoal/80 leading-relaxed mb-6 flex-1">
          {post.excerpt}
        </p>

        {/* Read more */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-brand-pink text-sm font-semibold hover:gap-3 transition-all duration-200 mt-auto"
        >
          Read article
          <ArrowRight size={15} />
        </Link>
      </div>
    </motion.article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const CANONICAL = 'https://kraftykinni.in/blog';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kraftykinni.in/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: CANONICAL },
  ],
};

export default function BlogPage() {
  // Sort newest-first
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );

  return (
    <>
      <Helmet>
        <title>Art Workshop Tips, Ideas & Guides | Kraftykinni Blog</title>
        <meta
          name="description"
          content="Art workshop guides, team building ideas, and event planning tips from Kraftykinni — Delhi NCR's creative workshop studio run by Fevicryl artist Shramita Govil."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kraftykinni" />
        <meta property="og:title" content="Art Workshop Tips, Ideas & Guides | Kraftykinni Blog" />
        <meta
          property="og:description"
          content="Art workshop guides, team building ideas, and event planning tips from Kraftykinni — Delhi NCR's creative workshop studio."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content="https://kraftykinni.in/logo.jpeg" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Art Workshop Tips, Ideas & Guides | Kraftykinni Blog" />
        <meta
          name="twitter:description"
          content="Art workshop guides, team building ideas, and event planning tips from Kraftykinni."
        />
        <meta name="twitter:image" content="https://kraftykinni.in/logo.jpeg" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <main className="pt-24 bg-brand-offwhite min-h-screen">

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-brand-pink mb-4">
              Kraftykinni Blog
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate leading-tight mb-5">
              Workshop ideas,{' '}
              <span className="text-brand-pink italic">guides & stories</span>
            </h1>
            <p className="text-lg text-brand-charcoal/80 leading-relaxed">
              Practical guides on team building, event planning, and art workshops
              from Shramita Govil and the Kraftykinni team in Delhi&nbsp;NCR.
            </p>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gray-200" />
        </div>

        {/* Post grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {sorted.length === 0 ? (
            <p className="text-brand-charcoal/60 text-center py-24">
              Posts coming soon — check back shortly.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {sorted.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </section>

      </main>

      <ContactFooter />
    </>
  );
}
