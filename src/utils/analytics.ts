// Block 6 — GA4 click tracking helpers.
//
// link_location = which button was clicked (e.g. "floating_whatsapp").
// page_path     = which page it was clicked on (e.g. "/workshops-in-noida").
// Together they show in GA4 which button on which page brings leads.
//
// To report them in GA4: Admin > Custom definitions > create event-scoped
// custom dimensions for "link_location" and "link_type" (page_path is built in).

type EventParams = Record<string, string | number | boolean>;

function sendEvent(name: string, params: EventParams): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as any).gtag;
  if (typeof gtag !== 'function') return;
  gtag('event', name, { page_path: window.location.pathname, ...params });
}

/** whatsapp_click / phone_click. `linkLocation` names the button, e.g. "floating_whatsapp". */
export function trackContactClick(
  eventName: 'whatsapp_click' | 'phone_click',
  linkLocation: string,
): void {
  sendEvent(eventName, {
    event_category: 'contact',
    event_label: linkLocation, // kept so existing GA4 reports keep working
    link_location: linkLocation,
  });
}

/**
 * review_link_click. Use on the "Read all reviews" and "Write a review" buttons.
 * `linkType` is "read_all" or "write"; `linkLocation` names the button's place,
 * e.g. "home_reviews" or "about_reviews".
 */
export function trackReviewClick(
  linkType: 'read_all' | 'write',
  linkLocation: string,
): void {
  sendEvent('review_link_click', {
    event_category: 'reviews',
    event_label: linkLocation,
    link_type: linkType,
    link_location: linkLocation,
  });
}
