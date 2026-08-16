import { ArrowRight, Sparkles, Star } from 'lucide-react';

const CDN = 'https://cdn.kraftykinni.in/assets';
const bohoArt = `${CDN}/boho-art.webp`;
const bohoArtMobile = `${CDN}/boho-art-mobile.webp`;
const bottleArt = `${CDN}/bottle-art.webp`;
const bottleArtMobile = `${CDN}/bottle-art-mobile.webp`;
const lippanArt = `${CDN}/lippan-art.webp`;
const lippanArtMobile = `${CDN}/lippan-art-mobile.webp`;
const tieAndDye = `${CDN}/tie-and-dye.webp`;
const tieAndDyeMobile = `${CDN}/tie-and-dye-mobile.webp`;

// Real Google Business Profile URL — same one already cited on
// testimonial blockquotes in scripts/prerender.mjs.
const GOOGLE_PROFILE_URL =
  'https://www.google.com/maps/place/KraftyKinni/@28.5032749,77.3817466,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce9fb49d4e935:0xbed5ad5b5362b002!8m2!3d28.5032702!4d77.3843215!16s%2Fg%2F11svwnn70v';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-brand-offwhite">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-pink/5 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-100/50 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="flex flex-col items-start animate-[fadeInUp_0.8s_ease-out_both]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8 animate-[fadeInScale_0.5s_ease-out_0.2s_both]">
              <Sparkles size={16} className="text-brand-pink" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-charcoal">
                Fevicryl Certified Artist
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-brand-slate leading-tight mb-6">
              Art & DIY Workshops <br />
              <span className="text-brand-pink italic">in Delhi NCR</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-light">
              Hands-on creative sessions for corporate teams, schools, colleges & private events.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#workshops"
                className="inline-flex items-center justify-center gap-2 bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1"
              >
                Explore Workshops
                <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-brand-charcoal border border-gray-200 px-8 py-4 rounded-full text-base font-medium transition-all hover:shadow-md"
              >
                Request a Quote
              </a>
            </div>

            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 group"
              aria-label="4.9 out of 5 stars on Google, based on 18 reviews — open our Google Business Profile"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-brand-charcoal group-hover:text-brand-pink transition-colors">
                4.9
              </span>
              <span className="text-sm text-gray-500 group-hover:text-brand-pink transition-colors underline decoration-gray-300 group-hover:decoration-brand-pink underline-offset-2">
                18 Google Reviews
              </span>
            </a>
          </div>

          {/* Image Grid */}
          <div className="relative h-[500px] lg:h-[600px] w-full animate-[fadeInRight_0.8s_ease-out_0.2s_both]">
            <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4">
              <div className="flex flex-col gap-4">
                <div className="h-2/3 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
                  <img
                    srcSet={`${bohoArtMobile} 320w, ${bohoArt} 629w`}
                    sizes="(max-width: 768px) 160px, 280px"
                    src={bohoArt}
                    alt="Boho Canvas Art workshop in Delhi NCR"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={629}
                    height={1308}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="h-1/3 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
                  <img
                    srcSet={`${bottleArtMobile} 320w, ${bottleArt} 736w`}
                    sizes="(max-width: 768px) 160px, 280px"
                    src={bottleArt}
                    alt="Bottle Lamp Art workshop in Delhi NCR"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={736}
                    height={757}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-12">
                <div className="h-1/3 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
                  <img
                    srcSet={`${lippanArtMobile} 320w, ${lippanArt} 735w`}
                    sizes="(max-width: 768px) 160px, 280px"
                    src={lippanArtMobile}
                    alt="Lippan Art workshop in Delhi NCR"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={735}
                    height={687}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="h-2/3 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
                  <img
                    srcSet={`${tieAndDyeMobile} 320w, ${tieAndDye} 586w`}
                    sizes="(max-width: 768px) 160px, 280px"
                    src={tieAndDye}
                    alt="Tie and Dye workshop in Delhi NCR"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={586}
                    height={1104}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
