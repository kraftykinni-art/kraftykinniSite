import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ContactFooter from '../components/ContactFooter';

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kraftykinni.in/' },
      { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: 'https://kraftykinni.in/privacy-policy' },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Kraftykinni</title>
        <meta
          name="description"
          content="Kraftykinni's privacy policy — how we collect and use information submitted through our contact form. We never sell your data."
        />
        <link rel="canonical" href="https://kraftykinni.in/privacy-policy" />
        <meta name="robots" content="noindex, follow" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <main className="pt-28 pb-24 bg-brand-offwhite min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-10" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-brand-pink transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-charcoal font-medium">Privacy Policy</span>
          </nav>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-pink mb-3">Legal</p>
            <h1 className="font-serif text-4xl font-bold text-brand-slate mb-2">
              Privacy <span className="text-brand-pink italic">Policy</span>
            </h1>
            <p className="text-sm text-gray-400 mb-10">Last updated: April 2026</p>

            <div className="prose prose-gray max-w-none space-y-8 text-gray-600 font-light leading-relaxed">

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Who we are</h2>
                <p>
                  This website is operated by <strong className="font-medium text-brand-charcoal">Kraftykinni</strong>, a creative art workshop business based in Delhi NCR, India. Kraftykinni is founded and run by Shramita Govil. If you have any questions about this policy, you can reach us at{' '}
                  <a href="mailto:kraftykinni@gmail.com" className="text-brand-pink hover:underline underline-offset-2">
                    kraftykinni@gmail.com
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">What information we collect</h2>
                <p>
                  We collect information only when you voluntarily submit our contact form. The form asks for your name, email address, phone number (optional), group size, preferred date, and a message. We do not use cookies, analytics trackers, or any other form of passive data collection on this website.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">How your information is used</h2>
                <p>
                  The information you submit through our contact form is used solely to respond to your enquiry and, where relevant, to send you a customised workshop proposal. Our contact form is powered by{' '}
                  <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="text-brand-pink hover:underline underline-offset-2">
                    Web3Forms
                  </a>
                  , which forwards your submission to our email address. We do not store your form data on our own servers.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Third-party services</h2>
                <p>
                  We use Web3Forms to process contact form submissions. Web3Forms receives the data you enter in the form and delivers it to us via email. You can review Web3Forms' own privacy practices at{' '}
                  <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-pink hover:underline underline-offset-2">
                    web3forms.com/privacy
                  </a>. We do not use Google Analytics, Meta Pixel, or any advertising trackers.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Data sharing</h2>
                <p>
                  We do not sell, rent, or share your personal information with any third party for marketing purposes. Your contact details are used only by Kraftykinni to follow up on your workshop enquiry.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Data retention</h2>
                <p>
                  We retain email correspondence (including form submissions forwarded to our inbox) for as long as necessary to manage the business relationship. If you would like your information removed from our records, please email us and we will action your request promptly.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Your rights</h2>
                <p>
                  You have the right to request access to, correction of, or deletion of any personal data we hold about you. To exercise any of these rights, write to us at{' '}
                  <a href="mailto:kraftykinni@gmail.com" className="text-brand-pink hover:underline underline-offset-2">
                    kraftykinni@gmail.com
                  </a>. We will respond within 14 business days.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-brand-slate mb-3">Changes to this policy</h2>
                <p>
                  We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated date at the top. We encourage you to review this page periodically.
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
