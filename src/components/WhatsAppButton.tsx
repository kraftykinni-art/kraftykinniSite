import { MessageCircle } from 'lucide-react';

const PREFILLED_MESSAGE =
  "Hi Kraftykinni! I'm interested in booking an art workshop. Could you share more details?";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/919599622210?text=${encodeURIComponent(PREFILLED_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'whatsapp_click', {
            event_category: 'contact',
            event_label: 'whatsapp_button',
          });
        }
      }}
      className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group animate-[popIn_0.4s_ease-out_1s_both]"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="group-hover:animate-pulse" />

      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white text-brand-charcoal text-sm font-medium rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-gray-100">
        Chat with us
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-[-45deg]"></div>
      </div>
    </a>
  );
}
