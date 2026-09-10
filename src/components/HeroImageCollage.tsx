interface CollageImage {
  src: string;
  alt: string;
}

interface HeroImageCollageProps {
  // Exactly 4 real workshop photos, in the order: top-left, bottom-left, top-right, bottom-right.
  images: [CollageImage, CollageImage, CollageImage, CollageImage];
  /** Tailwind height classes for the collage container. Defaults suit a py-16/py-20 hero. */
  heightClassName?: string;
}

export default function HeroImageCollage({
  images,
  heightClassName = 'h-[380px] lg:h-[440px]',
}: HeroImageCollageProps) {
  const [topLeft, bottomLeft, topRight, bottomRight] = images;

  return (
    <div className={`relative w-full ${heightClassName} animate-[fadeInRight_0.8s_ease-out_0.2s_both]`}>
      <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4">
        <div className="flex flex-col gap-4">
          <div className="h-2/3 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
            <img
              src={topLeft.src}
              alt={topLeft.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          <div className="h-1/3 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
            <img
              src={bottomLeft.src}
              alt={bottomLeft.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-12">
          <div className="h-1/3 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
            <img
              src={topRight.src}
              alt={topRight.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          <div className="h-2/3 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
            <img
              src={bottomRight.src}
              alt={bottomRight.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
