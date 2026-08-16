interface GalleryPhoto {
  src: string;
  alt: string;
  tag: string;
}

// Images live on the Cloudflare CDN root (cdn.kraftykinni.in), same convention
// used for blog post images. Update this array to add/remove/reorder photos.
const photos: GalleryPhoto[] = [
  {
    src: 'https://cdn.kraftykinni.in/corporate-office-team-painted-plates-workshop-kraftykinni.webp',
    alt: 'Corporate office team holding hand-painted decorative plates after a Kraftykinni workshop',
    tag: 'Bhutani Alphathum Corporate Workshop',
  },
  {
    src: 'https://cdn.kraftykinni.in/school-assembly-stage-mass-workshop-kraftykinni.webp',
    alt: 'Students on stage holding their finished artwork at a school Kraftykinni workshop',
    tag: 'Cambridge University',
  },
  {
    src: 'https://cdn.kraftykinni.in/founder-hands-on-teaching-workshop-kraftykinni.webp',
    alt: 'Kraftykinni founder Shramita Govil guiding a participant during a hands-on art session',
    tag: 'Toony Tales',
  },
  {
    src: 'https://cdn.kraftykinni.in/community-outreach-bottle-painting-workshop-kraftykinni.webp',
    alt: 'Community outreach group holding hand-painted bottles at a Kraftykinni workshop',
    tag: 'NGO/community',
  },
  {
    src: 'https://cdn.kraftykinni.in/founder-radisson-hotel-stall-display-kraftykinni.webp',
    alt: 'Kraftykinni founder Shramita Govil at a display stall of handmade decor pieces',
    tag: 'Radisson Blu',
  },
  {
    src: 'https://cdn.kraftykinni.in/corporate-workshop-coaster-painting-closeup-kraftykinni.webp',
    alt: 'Close-up of corporate participants hand-painting a coaster together',
    tag: 'Max Tower Corporate Workshop',
  },
  {
    src: 'https://cdn.kraftykinni.in/summer-workshop-mall-kids-event-kraftykinni.webp',
    alt: 'Children holding their crafts at a Kraftykinni summer workshop mall event',
    tag: 'Kids Workshop',
  },
  {
    src: 'https://cdn.kraftykinni.in/college-workshop-painted-bowls-plates-kraftykinni.webp',
    alt: 'College students holding hand-painted bowls and plates at a Kraftykinni workshop',
    tag: 'Amity University',
  },
  {
    src: 'https://cdn.kraftykinni.in/block-printing-mother-daughter-workshop-kraftykinni.webp',
    alt: 'Mother and daughter holding a hand block-printed fabric piece from a Kraftykinni session',
    tag: 'Block Printing for Israel Client',
  },
  {
    src: 'https://cdn.kraftykinni.in/school-workshop-group-artwork-display-kraftykinni.webp',
    alt: 'School students holding up their colourful finished artwork sheets',
    tag: 'School',
  },
  {
    src: 'https://cdn.kraftykinni.in/cultural-economy-summit-panel-kraftykinni.webp',
    alt: 'Kraftykinni team at the Mairi Cultural Economy Summit',
    tag: 'Ministry of culture Summit',
  },
  {
    src: 'https://cdn.kraftykinni.in/community-bottle-painting-closeup-kraftykinni.webp',
    alt: 'Young participants holding freshly painted bottles at a community workshop',
    tag: 'Community/NGO',
  },
  {
    src: 'https://cdn.kraftykinni.in/fevicryl-certified-artist-product-display-kraftykinni.webp',
    alt: 'Kraftykinni founder Shramita Govil with a table of Fevicryl craft supplies',
    tag: 'Cars 24',
  },
];

export default function TrustGallery() {
  // Render the list twice back-to-back so the marquee animation (which
  // translates by exactly -50%) loops seamlessly with no visible seam/jump.
  const loopedPhotos = [...photos, ...photos];

  return (
    <section
      aria-labelledby="trust-gallery-heading"
      className="relative py-16 md:py-20 bg-brand-offwhite overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-brand-pink font-semibold tracking-wide uppercase text-sm mb-2">
          Real Sessions, Real Hands
        </p>
        <h2
          id="trust-gallery-heading"
          className="font-serif text-3xl md:text-4xl text-brand-charcoal"
        >
          Straight From Our Workshops
        </h2>
      </div>

      {/* Edge fades so the loop reads as intentional, not a cut-off scroll area */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-16 z-10 bg-gradient-to-r from-brand-offwhite to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-16 z-10 bg-gradient-to-l from-brand-offwhite to-transparent" />

      <div className="overflow-hidden">
        <div
          className="flex gap-5 w-max animate-[marqueeScroll_50s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none"
          aria-hidden={false}
        >
          {loopedPhotos.map((photo, i) => (
            <figure
              key={i}
              className="relative flex-shrink-0 w-64 md:w-72 aspect-[3/4] rounded-2xl overflow-hidden shadow-md group"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                width={800}
                height={1000}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-slate/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full bg-brand-pink/90 backdrop-blur-sm">
                {photo.tag}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
