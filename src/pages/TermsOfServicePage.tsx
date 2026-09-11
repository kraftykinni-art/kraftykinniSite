import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ContactFooter from '../components/ContactFooter';

export default function TermsOfServicePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kraftykinni.in/' },
      { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: 'https://kraftykinni.in/terms-of-service' },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Terms of Service | Kraftykinni</title>
        <meta
          name="description"
          content="Kraftykinni's terms of service — booking, cancellation, rescheduling, materials, recording, and liability terms for art workshops in Delhi NCR."
        />
        <link rel="canonical" href="https://kraftykinni.in/terms-of-service" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <main className="pt-28 pb-24 bg-brand-offwhite min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-10" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-pink transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-charcoal font-medium">Terms of Service</span>
          </nav>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-pink mb-3">Legal</p>
            <h1 className="font-serif text-4xl font-bold text-brand-slate mb-2">
              Terms of <span className="text-brand-pink italic">Service</span>
            </h1>
            <p className="text-sm text-gray-400 mb-10">Last updated: September 2026</p>

            <div className="prose prose-gray max-w-none space-y-8 text-gray-600 font-light leading-relaxed">

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Who you're booking with</h2>
                <p>
                  Kraftykinni is an art workshop business founded and run by Shramita Govil, registered in Noida, Uttar Pradesh under Udyam Registration for Micro, Small and Medium Enterprises (MSME). By booking a workshop with Kraftykinni, you agree to the terms on this page. If you have questions about any of these terms, write to{' '}
                  <a href="mailto:kraftykinni@gmail.com" className="text-brand-pink hover:underline underline-offset-2">
                    kraftykinni@gmail.com
                  </a>{' '}
                  before confirming your booking.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Booking and payment</h2>
                <p>
                  A booking is confirmed once a 50% deposit is received, with a minimum of 7 days' notice ahead of the event date. Deposits can be paid via UPI, bank transfer, or cash. The remaining balance is due on the day of the workshop unless otherwise agreed in writing.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Cancellation policy</h2>
                <p>
                  Kraftykinni operates a strict no-refund policy on cancellations made by the client once a booking is confirmed. The deposit and any advance payment are non-refundable if you choose to cancel.
                </p>
                <p>
                  If Kraftykinni needs to cancel a confirmed session — for example, due to illness or an urgent, unavoidable circumstance — a rescheduled date will be offered first. If rescheduling isn't possible, a full refund will be provided.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Rescheduling</h2>
                <p>
                  Clients may request to reschedule an upcoming session. Rescheduling is subject to slot availability on your requested new date; if that date isn't available, Kraftykinni will offer alternative dates based on current availability. Rescheduling is not automatic and should be requested as early as possible.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Materials and venue arrangements</h2>
                <p>
                  Kraftykinni provides all workshop activity materials — art supplies, clay, mirrors, paints, and similar items — as agreed for the chosen activity, or based on the client's specific preference where discussed in advance. The client is responsible for arranging the basic venue setup: tables, chairs, and adequate space for the group. Kraftykinni does not arrange the venue itself.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Photography and recording</h2>
                <p>
                  Kraftykinni records photos and video of workshop sessions as standard practice, for portfolio and marketing use, without requiring prior consent for each session. If you have a specific concern about being photographed or recorded, please raise it with us in advance — we're happy to discuss and adjust how a particular session is recorded once we've talked it through.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Supervision of children</h2>
                <p>
                  For workshops involving children — school sessions, birthday parties, and similar events — supervision and overall responsibility for the children present rests with whoever is hosting or has arranged the venue (for example, the school or the parent booking the event), not with Kraftykinni.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Liability</h2>
                <p>
                  Kraftykinni takes reasonable care in facilitating each workshop and in the materials it supplies. To the extent permitted by law, Kraftykinni's liability in connection with any booking is limited to the amount paid for that session. Kraftykinni is not responsible for pre-existing conditions of the venue, or for loss or damage arising from circumstances outside its reasonable control.
                </p>
                <p className="text-sm text-gray-400 italic">
                  This liability clause is standard, general-purpose language rather than terms Shramita has separately specified — if you'd like it reviewed or adjusted, we'd recommend having it checked by a legal professional.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Governing law</h2>
                <p>
                  These terms are governed by the laws of India, and any disputes arising from a booking with Kraftykinni are subject to the jurisdiction of the courts in Noida, Uttar Pradesh.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Changes to these terms</h2>
                <p>
                  Kraftykinni may update these terms from time to time. Any changes will be reflected on this page with an updated date at the top. We encourage you to review this page before confirming a new booking.
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>

      <ContactFooter />
    </>
  );
}
