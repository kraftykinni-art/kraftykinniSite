import { Phone } from 'lucide-react';

export default function CallButton() {
  return (
    <a
      href="tel:+919599622210"
      onClick={() => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'phone_click', {
            event_category: 'contact',
            event_label: 'floating_call_button',
          });
        }
      }}
      // Mobile-only: a tel: link opens the dialer on a phone but does nothing
      // useful on desktop, so this is hidden from md breakpoint up.
      className="md:hidden fixed bottom-6 left-6 z-[90] w-14 h-14 bg-brand-pink text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-[popIn_0.4s_ease-out_1s_both]"
      aria-label="Call Kraftykinni"
    >
      <Phone size={26} />
    </a>
  );
}
