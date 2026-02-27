import { motion } from "motion/react";
import {
  Youtube,
  Instagram,
  Linkedin,
  PinIcon as Pinterest,
  Send,
} from "lucide-react";

export default function ContactFooter() {
  const socialLinks = [
    {
      icon: <Youtube size={20} />,
      href: "https://www.youtube.com/@kraftykinni",
      label: "YouTube",
    },
    {
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/kraftykinni",
      label: "Instagram",
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/kraftykinni/",
      label: "LinkedIn",
    },
    {
      icon: <Pinterest size={20} />,
      href: "https://in.pinterest.com/KraftyKinni/",
      label: "Pinterest",
    },
  ];

  return (
    <footer
      id="contact"
      className="bg-brand-slate text-white pt-24 pb-12 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-pink/10 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Let's Create{" "}
              <span className="text-brand-pink italic">Together</span>
            </h2>
            <p className="text-gray-300 font-light leading-relaxed mb-12 max-w-md text-lg">
              Ready to host a memorable creative experience? Fill out the form
              and we'll get back to you with a customised proposal.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-brand-pink shrink-0">
                  <Send size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">
                    Email Us
                  </h4>
                  <a
                    href="mailto:kraftykinni@gmail.com"
                    className="text-lg font-medium hover:text-brand-pink transition-colors"
                  >
                    kraftykinni@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 hover:bg-brand-pink rounded-full flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-1"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl text-brand-charcoal"
          >
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="space-y-6"
            >
              <input
                type="hidden"
                name="access_key"
                value="1685ee1e-ebc1-4b36-92fd-647947482d76"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all bg-brand-offwhite"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all bg-brand-offwhite"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all bg-brand-offwhite"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label
                    htmlFor="groupSize"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Group Size
                  </label>
                  <select
                    id="groupSize"
                    name="groupSize"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all bg-brand-offwhite text-gray-600"
                  >
                    <option value="">Select Size</option>
                    <option value="20-50">20 - 50 pax</option>
                    <option value="50-100">50 - 100 pax</option>
                    <option value="100+">100+ pax</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all bg-brand-offwhite text-gray-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="workshop"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Workshop Interest
                  </label>
                  <select
                    id="workshop"
                    name="workshop"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all bg-brand-offwhite text-gray-600"
                  >
                    <option value="">Select Workshop</option>
                    <option value="Boho Canvas Art">Boho Canvas Art</option>
                    <option value="Bottle Lamp Art">Bottle Lamp Art</option>
                    <option value="Lippan Art">Lippan Art</option>
                    <option value="Tie & Dye">Tie & Dye</option>
                    <option value="Trinket Tray Painting">
                      Trinket Tray Painting
                    </option>
                    <option value="Mandala Art">Mandala Art</option>
                    <option value="Block Printing">Block Printing</option>
                    <option value="Clay Art">Clay Art</option>
                    <option value="MDF Fridge Magnet">MDF Fridge Magnet</option>
                    <option value="Glass Painting">Glass Painting</option>
                    <option value="Texture Art">Texture Art</option>
                    <option value="Tote Bag Painting">Tote Bag Painting</option>
                    <option value="Canvas Pouch Painting">
                      Canvas Pouch Painting
                    </option>
                    <option value="Not Sure Yet">Not Sure Yet</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all bg-brand-offwhite resize-none"
                  placeholder="Tell us more about your event..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-pink hover:bg-brand-pink-light text-white px-8 py-4 rounded-xl text-base font-medium transition-all hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Send Request <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-pink rounded-full flex items-center justify-center text-white font-serif font-bold text-sm">
              K
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-white">
              Kraftykinni
            </span>
          </div>
          <p className="text-gray-400 text-sm font-light">
            &copy; {new Date().getFullYear()} Kraftykinni. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
