import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
}

// Optional prop — CorporateWorkshopsPage passes its own FAQs
// Homepage uses the default FAQs below
interface Props {
  extraFaqs?: FAQ[];
}

const defaultFaqs = [
  {
    q: 'Do participants need prior art experience?',
    a: 'No — all sessions are guided step-by-step by Shramita. Every participant creates something they are proud of, regardless of their art background.',
  },
  {
    q: 'What is the minimum group size?',
    a: 'We cater to groups from 20 up to 200+ participants. For very small groups, please reach out and we will do our best.',
  },
  {
    q: 'Do you provide all the materials?',
    a: 'Yes. Kraftykinni provides every art supply — paints, canvases, brushes, aprons, and activity-specific materials. You only need to provide tables and chairs.',
  },
  {
    q: 'Where do you conduct workshops?',
    a: 'In-person across Delhi NCR (Delhi, Gurgaon, Noida) and online pan-India. We come to your office, school, or event venue.',
  },
  {
    q: 'What are the payment and booking terms?',
    a: '7 days advance notice required. 50% deposit to confirm the booking. UPI, bank transfer, or cash accepted.',
  },
];

export default function PricingFAQ({ extraFaqs }: Props) {
  const faqs = extraFaqs ?? defaultFaqs;
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const pricingTiers = [
    { name: 'Intimate', size: '20–50 pax', price: '₹800', unit: '/person', highlighted: false },
    { name: 'Standard', size: '50–100 pax', price: '₹700', unit: '/person', highlighted: true },
    { name: 'Large', size: '100+ pax', price: '₹600', unit: '/person', highlighted: false },
  ];

  return (
    <section id="pricing" className="py-24 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Pricing */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">
            Pricing & <span className="text-brand-pink italic">Logistics</span>
          </h2>
          <div className="w-24 h-1 bg-brand-pink mx-auto rounded-full mb-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative bg-white rounded-3xl p-10 flex flex-col items-center text-center transition-all duration-300 ${
                tier.highlighted
                  ? 'shadow-xl border-2 border-brand-pink scale-105 z-10'
                  : 'shadow-sm border border-gray-100 hover:shadow-md'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-pink text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                  Most Popular
                </div>
              )}
              <h3 className="font-serif text-2xl font-bold text-brand-slate mb-2">{tier.name}</h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">{tier.size}</p>
              <div className="flex items-end justify-center gap-1 mb-8">
                <span className="text-5xl font-bold text-brand-charcoal">{tier.price}</span>
                <span className="text-gray-500 font-medium mb-1">{tier.unit}</span>
              </div>
              <a
                href="#contact"
                className={`w-full py-4 rounded-xl text-base font-medium transition-all ${
                  tier.highlighted
                    ? 'bg-brand-pink hover:bg-brand-pink-light text-white shadow-md hover:-translate-y-1'
                    : 'bg-brand-offwhite hover:bg-gray-100 text-brand-charcoal border border-gray-200'
                }`}
              >
                Book Now
              </a>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-24">
          <p className="text-sm font-medium text-gray-500 italic">
            * Final pricing based on customisation. All materials included. 50% deposit to confirm.
          </p>
        </div>

        {/* FAQ */}
        <div id="faq" className="max-w-3xl mx-auto pt-16">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl font-bold text-brand-slate mb-4">
              Frequently Asked <span className="text-brand-pink italic">Questions</span>
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-medium text-brand-charcoal pr-8">{faq.q}</span>
                  <span className="text-brand-pink shrink-0">
                    {openFAQ === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFAQ === index && (
                    <motion.div
                      key={`faq-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600 font-light leading-relaxed border-t border-gray-50 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
