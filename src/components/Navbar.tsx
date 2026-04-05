import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/Logo.webp';

// Smooth scroll to a section by id, with navbar offset
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // After navigating to '/', check if we need to scroll to a section.
  // We store the target in sessionStorage so it survives the navigation.
  useEffect(() => {
    if (location.pathname === '/') {
      const target = sessionStorage.getItem('scrollTarget');
      if (target) {
        sessionStorage.removeItem('scrollTarget');
        // Wait one frame for React to finish rendering the homepage
        requestAnimationFrame(() => {
          requestAnimationFrame(() => scrollToSection(target));
        });
      }
    }
  }, [location.pathname]);

  const navLinks = [
    { name: 'Workshops',    href: '#workshops' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing',      href: '#pricing' },
    { name: 'FAQ',          href: '#faq' },
    { name: 'Contact',      href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const sectionId = href.replace('#', '');

    if (location.pathname === '/') {
      // Already on homepage — scroll directly
      if (!sectionId) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      scrollToSection(sectionId);
    } else {
      // On another page — store target, navigate home, scroll happens in useEffect
      sessionStorage.setItem('scrollTarget', sectionId);
      navigate('/');
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Kraftykinni Logo" className="w-10 h-10 rounded-full object-cover" loading="eager" decoding="async" />
            <span className="font-serif font-bold text-2xl tracking-tight text-brand-slate">Kraftykinni</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-brand-charcoal hover:text-brand-pink transition-colors"
              >
                {link.name}
              </a>
            ))}
            {/* Real page links — crawlable by Googlebot, no JS required */}
            <Link to="/corporate-art-workshops" className="text-sm font-medium text-brand-charcoal hover:text-brand-pink transition-colors">
              Corporate
            </Link>
            <Link to="/about" className="text-sm font-medium text-brand-charcoal hover:text-brand-pink transition-colors">
              About
            </Link>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="bg-brand-pink hover:bg-brand-pink-light text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:shadow-md hover:scale-105"
            >
              Book Now
            </a>
          </nav>

          <button
            className="md:hidden p-2 text-brand-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-base font-medium text-brand-charcoal hover:text-brand-pink transition-colors"
                >
                  {link.name}
                </a>
              ))}
              {/* Real page links — crawlable */}
              <Link to="/corporate-art-workshops" className="text-base font-medium text-brand-charcoal hover:text-brand-pink transition-colors">
                Corporate Workshops
              </Link>
              <Link to="/school-workshops" className="text-base font-medium text-brand-charcoal hover:text-brand-pink transition-colors">
                School Workshops
              </Link>
              <Link to="/about" className="text-base font-medium text-brand-charcoal hover:text-brand-pink transition-colors">
                About
              </Link>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="bg-brand-pink text-white text-center px-6 py-3 rounded-full text-base font-medium mt-4"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
