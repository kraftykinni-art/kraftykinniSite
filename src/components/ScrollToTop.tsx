import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to the top on every route change,
 * UNLESS the navigation came with a hash (e.g. /#contact).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash target (handled elsewhere), don't interfere
    if (hash) return;
    // If sessionStorage has a scrollTarget (navbar/footer hash nav), don't override
    if (sessionStorage.getItem('scrollTarget')) return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}
