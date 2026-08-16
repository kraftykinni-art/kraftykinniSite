import { useEffect, useRef, useState } from 'react';
import { Instagram, X } from 'lucide-react';

// Rotating short hooks — keeps the CTA feeling "alive" without resorting to
// fake counters or urgency claims. Swap/edit freely.
const MESSAGES = ['See our reels 🎥', 'Follow us →', '1,500+ hands painted ✨'];

// Appears once the visitor has scrolled a meaningful distance into the
// homepage (not on load), slides up just above the WhatsApp button, and
// can be dismissed. Stays dismissed for the rest of the browser tab session.
export default function InstagramPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem('kk_instagram_popup_dismissed') === '1') {
      setDismissed(true);
      return;
    }

    const onScroll = () => {
      if (hasFiredRef.current) return;
      const scrolled = window.scrollY;
      const threshold = window.innerHeight * 0.6;
      if (scrolled > threshold) {
        hasFiredRef.current = true;
        setVisible(true);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cycle the CTA copy while it's on screen so it reads as "live" content,
  // not a static banner the eye learns to skip.
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [visible]);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('kk_instagram_popup_dismissed', '1');
  };

  if (dismissed || !visible) return null;

  return (
    <div
      // bottom-[92px] stacks this just above the 56px (h-14) WhatsApp
      // button, which sits at bottom-6 right-6 with its own 24px gap.
      className="fixed bottom-[92px] right-6 z-[85] animate-[slideUpFade_0.4s_ease-out_both]"
      role="complementary"
      aria-label="Follow Kraftykinni on Instagram"
    >
      <div className="flex items-center gap-2 bg-white shadow-xl rounded-full border border-gray-100 pl-2 pr-2 py-2 animate-[attentionPulse_4s_ease-in-out_infinite] motion-reduce:animate-none hover:scale-105 transition-transform">
        <a
          href="https://www.instagram.com/kraftykinni"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'instagram_click', {
                event_category: 'social',
                event_label: 'homepage_scroll_popup',
              });
            }
          }}
          className="flex items-center gap-2 group pr-1"
        >
          <span className="relative flex items-center justify-center w-8 h-8 flex-shrink-0">
            {/* Soft expanding ring — a "there's something new here" cue,
                not a fake unread count. */}
            <span className="absolute inset-0 rounded-full bg-[#D62976]/60 animate-[pingRing_2.2s_ease-out_infinite] motion-reduce:hidden" />
            <span className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5] flex items-center justify-center">
              <Instagram size={16} className="text-white" />
            </span>
          </span>
          <span
            key={msgIndex}
            className="text-sm font-semibold text-brand-charcoal whitespace-nowrap group-hover:text-brand-pink transition-colors animate-[slideUpFade_0.35s_ease-out_both] min-w-[7.5rem]"
          >
            {MESSAGES[msgIndex]}
          </span>
        </a>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="text-gray-400 hover:text-brand-charcoal transition-colors flex-shrink-0"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
