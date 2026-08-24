# Site-wide Prerendered SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ensure every public route publishes meaningful prerendered HTML that non-JavaScript crawlers can read.

**Architecture:** Preserve the React/Vite SPA and use the existing `postbuild` prerender script to create flat route HTML files in `dist`. Add a standalone validator that checks the generated files for route-specific titles and visible content, then run it in the build pipeline after prerendering.

**Tech Stack:** Vite 6, React 19, TypeScript, Node.js ESM scripts, GitHub Pages static deployment.

---

### Task 1: Establish the current build failure or gap

**Files:**
- Inspect: `package.json`
- Inspect: `scripts/prerender.mjs`
- Inspect: `.github/workflows/deploy.yml` if present

- [ ] Run `npm run build` from the repository root.
- [ ] Confirm whether `dist` contains route HTML files such as `about.html`, `corporate-art-workshops.html`, and `workshops/lippan-art.html`.
- [ ] Confirm whether the deployment workflow uploads `dist` after the `postbuild` hook completes.

Expected result: the build either exposes a concrete prerender failure or demonstrates that the output exists locally and the missing protection is validation/deployment wiring.

### Task 2: Add generated-route validation

**Files:**
- Create: `scripts/validate-prerender.mjs`
- Modify: `package.json`

- [ ] Define a route manifest in the validator covering `/`, the landing pages, all workshop detail routes listed in `scripts/prerender.mjs`, locations, blog routes, privacy, thank-you, and the not-found output.
- [ ] Map each URL to the expected flat HTML path used by the prerender script.
- [ ] For each file, fail with a non-zero exit code when the file is missing, lacks a non-empty `<h1>`, lacks `<noscript>`, or has fewer than 100 visible text words inside the noscript block.
- [ ] Check representative route-specific text so the validator cannot pass because every route contains only the homepage shell.
- [ ] Add an npm script named `validate:prerender` that runs the validator.
- [ ] Update `postbuild` to run the validator after `scripts/prerender.mjs`.

### Task 3: Verify static publishing configuration

**Files:**
- Modify: `.github/workflows/deploy.yml` only if it uploads a directory other than `dist`
- Modify: `README.md` if the documented route-output behavior is inaccurate

- [ ] Ensure the deployment job builds before uploading and publishes the complete `dist` directory.
- [ ] Keep GitHub Pages SPA fallback behavior for unknown routes while allowing generated route files to win for known routes.
- [ ] Document `npm run validate:prerender` alongside the build command.

### Task 4: Run focused and full verification

**Files:**
- No source changes

- [ ] Run `npm run build`; expected result is Vite build, prerender generation, and route validation all pass.
- [ ] Run `npm run lint`; expected result is no TypeScript errors.
- [ ] Run `python validate_seo.py` if its invocation is documented and dependencies are available.
- [ ] Inspect generated HTML for `/about`, `/workshops/lippan-art`, `/blog`, and `/privacy-policy` to confirm visible route-specific content.
