import { motion } from 'motion/react';
import { Users, Palette, Award, CheckCircle, Star, Heart, Lightbulb, Shield } from 'lucide-react';
import profileImg from '../assets/profile.webp';

export default function About() {
  const stats = [
    { icon: <Palette size={24} />, value: '50+', label: 'Workshops' },
    { icon: <Users size={24} />, value: '1500+', label: 'Happy Participants' },
    { icon: <CheckCircle size={24} />, value: '13', label: 'Activities' },
    { icon: <Award size={24} />, value: 'Certified', label: 'Fevicryl Artist' },
  ];

  const values = [
    {
      icon: <Star size={20} />,
      title: 'Everyone creates something beautiful',
      desc: 'Every session is designed so that participants — regardless of their art background — walk away with a finished piece they are genuinely proud of. No half-done projects, no "good try" outcomes.',
    },
    {
      icon: <Heart size={20} />,
      title: 'Stress-free from start to finish',
      desc: 'We bring every supply, set up before the session starts, and clean up after it ends. The only thing participants need to do is show up and enjoy the process.',
    },
    {
      icon: <Lightbulb size={20} />,
      title: 'Creativity is for everyone',
      desc: "Kraftykinni was built on the belief that art is not a talent you are born with — it is a practice that anyone can access with the right guidance and environment.",
    },
    {
      icon: <Shield size={20} />,
      title: 'Certified, trusted facilitation',
      desc: "Shramita holds a Fevicryl certification — India's leading art credential — giving every participant the confidence that they are learning from a trained, qualified professional.",
    },
  ];

  const credentials = [
    "Fevicryl Certified Artist — India's most recognised art certification",
    '50+ workshops conducted across Delhi NCR since founding',
    '1,500+ participants trained across corporate, school, university, and private settings',
    'Regular facilitator at Amity University, Delhi and Noida campuses',
    'Corporate clients across Delhi, Gurgaon, and Noida including MNCs and startups',
    'Available for in-person sessions across Delhi NCR and online workshops pan-India',
  ];

  const journey = [
    {
      year: 'The Beginning',
      text: "Shramita Govil's journey into art facilitation began with a Fevicryl certification — a credential that gave her both the technical foundation and the teaching framework to guide complete beginners through complex art forms. What started as private workshops for friends and family quickly revealed something important: people were hungry for creative experiences, but most felt intimidated by the idea of making art.",
    },
    {
      year: 'Building Kraftykinni',
      text: 'Kraftykinni was founded to bridge that gap. The name reflects the playful, kinetic energy of creative making — and the brand was built around a single promise: that every participant, regardless of skill level, would create something they genuinely love. Sessions were designed to be guided, relaxed, and joyful rather than instructional and pressured.',
    },
    {
      year: 'Growing Across Delhi NCR',
      text: 'Word spread quickly. Corporate HR teams discovered that art workshops were among the most effective team-building activities available — producing physical takeaways, building camaraderie, and providing genuine stress relief. Schools found that Kraftykinni sessions were both curriculum-friendly and deeply engaging for students. Today, Kraftykinni operates across Delhi, Gurgaon, and Noida with 13 signature activities and a growing roster of repeat clients.',
    },
  ];

  return (
    <section id="about" className="bg-white">

      {/* Main intro section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative bg-gray-100">
                <img
                  src={profileImg}
                  alt="Shramita Govil — Fevicryl Certified Artist and founder of Kraftykinni, Delhi NCR"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-pink/10 rounded-full blur-2xl -z-10"></div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">
                Meet the Artist Behind <span className="text-brand-pink italic">Kraftykinni</span>
              </h2>

              <h3 className="text-lg font-medium text-brand-charcoal mb-6 uppercase tracking-wider">
                Shramita Govil — Fevicryl Certified Artist
              </h3>

              <div className="space-y-5 text-gray-600 font-light leading-relaxed text-lg">
                <p>
                  Shramita Govil is a Fevicryl-certified art professional and the founder of Kraftykinni — a Delhi NCR-based creative workshop studio specialising in hands-on art and DIY sessions for corporate teams, schools, universities, and private events.
                </p>
                <p>
                  With over 50 workshops conducted and more than 1,500 participants trained, Shramita has developed a facilitation style that is inclusive, energetic, and deeply results-oriented. Every session she leads is designed around one core outcome: that every participant — regardless of their art background or confidence — walks away with something they are genuinely proud of.
                </p>
                <p>
                  Her Fevicryl certification is India's most recognised credential in art education and gives participants the assurance that they are learning from a trained, qualified professional who understands both technique and pedagogy.
                </p>
                <p>
                  Kraftykinni operates primarily across Delhi, Gurgaon, and Noida, with online sessions available for teams across India. All 13 signature activities are available for corporate bookings, school programmes, college events, and private occasions.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-8 bg-brand-offwhite rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-pink shadow-sm mb-4">
                  {stat.icon}
                </div>
                <h4 className="font-serif text-3xl font-bold text-brand-slate mb-2">
                  {stat.value}
                </h4>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest text-center">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Journey Section */}
      <div className="py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-slate mb-4">
              The Kraftykinni <span className="text-brand-pink italic">Story</span>
            </h2>
            <div className="w-24 h-1 bg-brand-pink mx-auto rounded-full mb-6" />
            <p className="text-lg text-brand-slate/70 max-w-2xl mx-auto">
              From a personal passion for art to Delhi NCR's most trusted workshop facilitator.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {journey.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold uppercase tracking-widest mb-4">
                  {item.year}
                </div>
                <p className="text-gray-600 font-light leading-relaxed text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-brand-slate mb-4">
              What We <span className="text-brand-pink italic">Believe In</span>
            </h2>
            <div className="w-24 h-1 bg-brand-pink mx-auto rounded-full mb-6" />
            <p className="text-lg text-brand-slate/70 max-w-2xl mx-auto">
              The principles that guide every Kraftykinni workshop.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-4 p-6 bg-brand-offwhite rounded-2xl border border-gray-100"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-pink shadow-sm shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-brand-slate mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Credentials + How it works */}
      <div className="py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold text-brand-slate mb-6">
                Credentials & <span className="text-brand-pink italic">Experience</span>
              </h2>
              <p className="text-gray-600 font-light leading-relaxed text-lg mb-8">
                Kraftykinni's credibility comes from consistent, high-quality facilitation across a wide range of audiences and settings. Here is what we bring to every booking.
              </p>
              <ul className="space-y-4">
                {credentials.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 font-light leading-relaxed">
                    <CheckCircle size={18} className="text-brand-pink shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-pink mb-4">What to expect from a session</p>
              <h3 className="font-serif text-2xl font-bold text-brand-slate mb-6">How a Kraftykinni Workshop Runs</h3>
              <div className="space-y-6">
                {[
                  { step: '01', title: 'We arrive before you do', desc: 'Shramita and team arrive 30–45 minutes early to set up all materials, tables, and workstations. You arrive to a ready room.' },
                  { step: '02', title: 'Step-by-step guided session', desc: 'Every activity is broken into clear, achievable steps. No one is left behind. The pace accommodates all skill levels simultaneously.' },
                  { step: '03', title: 'Everyone finishes with artwork', desc: 'The session is designed so every participant completes a finished, display-worthy piece — not a rough draft.' },
                  { step: '04', title: 'We clean up completely', desc: 'After the session, Kraftykinni packs up all materials and leaves the space exactly as it was found. Zero burden on the host.' },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <span className="font-serif text-2xl font-bold text-brand-pink shrink-0">{s.step}</span>
                    <div>
                      <p className="font-medium text-brand-charcoal mb-1">{s.title}</p>
                      <p className="text-sm text-gray-600 font-light leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
