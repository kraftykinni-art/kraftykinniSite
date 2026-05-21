/**
 * AdSenseAd.tsx
 * Place at: src/components/AdSenseAd.tsx
 *
 * Lazy-loads the ad only when it scrolls near the viewport.
 * This protects your Core Web Vitals (LCP / CLS) on blog pages.
 */

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSenseAdProps {
  /** Get this from AdSense → Ads → By ad unit → your unit's data-ad-slot value */
  slot: string;
  className?: string;
}

export default function AdSenseAd({ slot, className = '' }: AdSenseAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const pushed = useRef(false);

  // Step 1: Reveal the ad container only when it's ~200px from viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Step 2: Push the ad unit once the container is visible
  useEffect(() => {
    if (!isVisible || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense script not yet loaded — silently ignore
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} className={`my-8 ${className}`}>
      {isVisible && (
        <div className="rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm">
          {/* "Advertisement" label — required by AdSense policy */}
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 text-center pt-2 pb-1 select-none">
            Advertisement
          </p>
          <ins
            className="adsbygoogle block"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-2594206998239067"
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      )}
    </div>
  );
}
