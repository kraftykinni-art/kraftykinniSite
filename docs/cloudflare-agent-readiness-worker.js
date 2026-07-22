/**
 * Cloudflare Worker — agent-readiness additions
 * ================================================
 * This is NOT a standalone Worker — merge this logic into the existing
 * security-headers Worker already running in front of kraftykinni.in
 * (the one set up in the Navneetarya1989@gmail.com Cloudflare account with
 * the `kraftykinni.in/*` route). GitHub Pages can't set custom response
 * headers or do content negotiation itself, which is why this has to live
 * in the Worker rather than in the repo.
 *
 * Adds two things the isitagentready.com-style audit checks for:
 *
 * 1. Markdown Negotiation
 *    scripts/prerender.mjs now writes a `.md` twin next to every `.html`
 *    page (e.g. /workshops/lippan-art.html -> /workshops/lippan-art.md,
 *    homepage -> /index.md). When a request's Accept header prefers
 *    text/markdown over text/html, fetch the .md twin from GitHub Pages
 *    instead and return it with Content-Type: text/markdown.
 *
 * 2. RFC 8288 Link response headers
 *    Every HTML response gets a Link header pointing agents at llms.txt
 *    (a plain-Markdown site index) and the Agent Skills discovery index.
 *
 * Merge steps:
 *   - Copy `prefersMarkdown`, `markdownPathFor`, and the two numbered
 *     blocks inside `fetch()` into your existing Worker.
 *   - Keep all your existing security header logic (HSTS/CSP/X-Frame-
 *     Options/etc.) — it isn't reproduced here since I don't have that
 *     script's current contents on hand this session.
 */

function prefersMarkdown(request) {
  const accept = request.headers.get('Accept') || '';
  if (!accept.includes('text/markdown')) return false;
  const mdIndex = accept.indexOf('text/markdown');
  const htmlIndex = accept.indexOf('text/html');
  // Prefer markdown only if it's absent from an explicit html preference,
  // or listed ahead of text/html in the Accept header.
  return htmlIndex === -1 || mdIndex < htmlIndex;
}

function markdownPathFor(url) {
  let pathname = url.pathname;
  if (pathname === '/') return '/index.md';
  if (pathname.endsWith('/')) pathname = pathname.slice(0, -1);
  if (pathname.endsWith('.html')) pathname = pathname.slice(0, -5);
  return `${pathname}.md`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ── 1. Markdown Negotiation ──────────────────────────────────────────
    if (
      request.method === 'GET' &&
      prefersMarkdown(request) &&
      !url.pathname.startsWith('/.well-known/') &&
      !url.pathname.startsWith('/assets/')
    ) {
      const mdUrl = new URL(markdownPathFor(url), url);
      const mdResponse = await fetch(mdUrl.toString(), request);
      if (mdResponse.ok) {
        const headers = new Headers(mdResponse.headers);
        headers.set('Content-Type', 'text/markdown; charset=utf-8');
        headers.set('Vary', 'Accept');
        return new Response(mdResponse.body, { status: mdResponse.status, headers });
      }
      // No .md twin for this path (e.g. an asset) — fall through to normal handling.
    }

    // ── existing security-headers logic goes here ────────────────────────
    const response = await fetch(request);
    const headers = new Headers(response.headers);
    // ...HSTS / CSP / X-Frame-Options / X-Content-Type-Options /
    //    Referrer-Policy / Permissions-Policy — keep exactly as deployed.

    // ── 2. RFC 8288 Link headers (agent discovery) ───────────────────────
    const contentType = headers.get('Content-Type') || '';
    if (contentType.includes('text/html')) {
      const agentLinks = [
        '<https://kraftykinni.in/llms.txt>; rel="alternate"; type="text/markdown"',
        '<https://kraftykinni.in/.well-known/agent-skills/index.json>; rel="service-desc"',
      ].join(', ');
      const existingLink = headers.get('Link');
      headers.set('Link', existingLink ? `${existingLink}, ${agentLinks}` : agentLinks);
      headers.append('Vary', 'Accept');
    }

    return new Response(response.body, { status: response.status, headers });
  },
};
