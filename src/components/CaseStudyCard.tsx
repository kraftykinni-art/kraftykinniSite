import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Users } from 'lucide-react';
import type { CaseStudy } from '../data/caseStudies';

// Block 5 — proof card for a real session. Data lives in src/data/caseStudies.ts
// and is mirrored into the plain-HTML copy by scripts/prerender.mjs.
export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const facts = [
    { icon: <Users size={16} />, label: 'Group size', value: study.groupSize },
    { icon: <Clock size={16} />, label: 'Duration', value: study.duration },
    { icon: <MapPin size={16} />, label: 'Venue', value: study.venue },
  ];

  return (
    <article className="flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-pink">
        {study.audience === 'school' ? 'School session' : 'Corporate session'}
      </p>
      <h3 className="mb-1 font-serif text-2xl font-bold text-brand-slate">{study.client}</h3>
      <p className="mb-4 text-sm text-gray-400">{study.activity}</p>
      <p className="mb-6 font-light leading-relaxed text-gray-600">{study.summary}</p>

      <dl className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {facts.map((f) => (
          <div key={f.label} className="rounded-2xl border border-gray-100 bg-brand-offwhite p-4">
            <dt className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-400">
              <span className="text-brand-pink">{f.icon}</span>
              {f.label}
            </dt>
            <dd className="text-sm font-medium text-brand-charcoal">{f.value}</dd>
          </div>
        ))}
      </dl>

      <Link
        to={`/blog/${study.postSlug}`}
        className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-brand-pink underline-offset-4 hover:underline"
      >
        Read the full case study <ArrowRight size={15} />
      </Link>
    </article>
  );
}
