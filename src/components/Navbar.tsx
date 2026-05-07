import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/Logo-small.webp';

// Smooth scroll to a section by id, with navbar offset
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

const serviceLinks = [
  { name: 'Corporate Workshops', href: '/corporate-art-workshops' },
  { name: 'School & College Workshops', href: '/school-workshops' },
  { name: 'Private Events',      href: '/private-art-workshops' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      const target = sessionStorage.getItem('scrollTarget');
      if (target) {
        sessionStorage.removeItem('scrollTarget');
        const timer = setTimeout(() => scrollToSection(target), 100);
        return () => clearTimeout(timer);
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
      if (!sectionId) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      scrollToSection(sectionId);
    } else {
      sessionStorage.setItem('scrollTarget', sectionId);
      navigate('/');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-[slideDown_0.5s_ease-out_both] ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Kraftykinni Logo" className="w-10 h-10 rounded-full object-cover" width={40} height={40} loading="eager" decoding="async" />
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

            {/* Services dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setIsServicesOpen((prev) => !prev)}
                onMouseEnter={() => setIsServicesOpen(true)}
                className="flex items-center gap-1 text-sm font-medium text-brand-charcoal hover:text-brand-pink transition-colors"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

                {isServicesOpen && (
                  <div
                    onMouseLeave={() => setIsServicesOpen(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-[fadeInUp_0.15s_ease-out_both]"
                  >
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="block px-5 py-3 text-sm font-medium text-brand-charcoal hover:text-brand-pink hover:bg-brand-offwhite transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
            </div>

            <Link to="/about" className="text-sm font-medium text-brand-charcoal hover:text-brand-pink transition-colors">
              About
            </Link>
            <Link to="/blog" className="text-sm font-medium text-brand-charcoal hover:text-brand-pink transition-colors">
              Blog
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
      {isMobileMenuOpen && (
          <div
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden animate-[fadeInUp_0.2s_ease-out_both]"
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
              {/* Services — flat links with label */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Services</p>
                {serviceLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block text-base font-medium text-brand-charcoal hover:text-brand-pink transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <Link to="/about" className="text-base font-medium text-brand-charcoal hover:text-brand-pink transition-colors">
                About
              </Link>
              <Link to="/blog" className="text-base font-medium text-brand-charcoal hover:text-brand-pink transition-colors">
                Blog
              </Link>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="bg-brand-pink text-white text-center px-6 py-3 rounded-full text-base font-medium mt-4"
              >
                Book Now
              </a>
            </div>
          </div>
        )}
    </header>
  );
}
