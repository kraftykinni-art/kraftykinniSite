import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Returns a `bookNow` function that navigates to the contact form
 * from any page — reliably, without full page reloads.
 *
 * Usage:
 *   const bookNow = useBookNow();
 *   <button onClick={bookNow}>Book This Workshop</button>
 */
export function useBookNow() {
  const navigate = useNavigate();
  const location = useLocation();

  return function bookNow(e?: React.MouseEvent) {
    if (e) e.preventDefault();

    if (location.pathname === '/') {
      // Already on homepage — just scroll to the contact section
      const el = document.getElementById('contact');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else {
      // On any other page — store scroll target, navigate home.
      // Navbar's useEffect picks up 'scrollTarget' and scrolls after render.
      sessionStorage.setItem('scrollTarget', 'contact');
      navigate('/');
    }
  };
}
