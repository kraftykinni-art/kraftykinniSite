# Site-wide prerendered SEO design

## Goal
Ensure every public route serves meaningful HTML before JavaScript executes, so search engines and AI crawlers can read headings, content, navigation, freshness signals, and structured metadata.

## Approach
Keep the current React/Vite client application and use the existing post-build prerender pipeline as the production solution. The build will generate a flat HTML file for each route, preserving the current URL and SPA hydration behavior. No server runtime or framework migration is required.

## Implementation
- Run the existing Vite build and postbuild prerender script.
- Verify every route in the prerender route manifest produces an HTML file in `dist`.
- Verify each generated page contains route-specific heading/content and a `noscript` content block.
- Add a lightweight validation script and npm command to fail builds when route HTML is missing or nearly empty.
- Keep deployment pointed at `dist`, so generated files are published rather than only the client shell.

## Validation
The build must complete successfully. The route validation must confirm that representative homepage, service, workshop, location, blog, policy, and not-found outputs contain meaningful text and route-specific titles. Existing TypeScript and SEO validation commands remain part of verification.

## Non-goals
This change does not attempt to rewrite all page copy to 2,500-3,500 words, create new third-party authority profiles, or migrate the application to runtime SSR. Those are separate content and authority initiatives from the audit report.
