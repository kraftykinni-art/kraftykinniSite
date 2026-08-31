import { CheckCircle2 } from 'lucide-react';

interface KeyTakeawaysProps {
  points: string[];
}

// Short, scannable summary of facts already stated elsewhere on the same
// page — gives readers (and AI answer engines) a quick, citation-ready recap.
export default function KeyTakeaways({ points }: KeyTakeawaysProps) {
  return (
    <section className="py-16 bg-brand-offwhite">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-brand-slate text-center mb-10">
          Key <span className="text-brand-pink italic">Takeaways</span>
        </h2>
        <ul className="space-y-4 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600 font-light leading-relaxed">
              <CheckCircle2 size={20} className="text-brand-pink shrink-0 mt-0.5" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
