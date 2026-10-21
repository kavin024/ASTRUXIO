# Astruxio — source-level reconstruction

A React + Vite reconstruction of [astruxio.in](https://astruxio.in/), recovered from the
production bundle with REA (browser/DOM/network capture plus static analysis of the shipped
JavaScript). The accompanying analysis is in
[`../astruxio-analysis-report.md`](../astruxio-analysis-report.md).

The goal is behavioral and visual fidelity, not a screenshot mirror. The original minified
JSX was transliterated back into components, the original stylesheet is used verbatim, and
the shipped images are the original assets.

## Run it

```bash
npm install
npm run dev      # http://127.0.0.1:5173/
npm run build    # production bundle in dist/
npm run preview  # serve the production build
```

Node 18+ is required. The build was verified with Node 24 and Vite 7.1.9.

## Stack

| Layer | Version |
|---|---|
| React / React DOM | 19.2.6 |
| Vite | 7.1.9 |
| three.js | 0.184.0 |
| @react-three/fiber / drei | 9.3.0 / 10.7.6 |
| framer-motion | 12.23.24 |
| GSAP / Lenis | 3.13.0 / 1.3.26 |
| OGL | 1.0.11 |
| EmailJS browser SDK | 4.4.1 |
| lucide-react | 0.544.0 |

`motion-dom` 12.23.23 and `motion-utils` 12.23.6 are pinned with npm `overrides` because
newer transitive releases removed an export still used by framer-motion 12.23.24.

## What is reproduced

- **Home** — hero with the animated silk shader and the chrome/amber three.js sculpture,
  about story (three scroll-driven chapters), six services + FAQ accordions, seven-step
  process, technology marquee/grid, engineering bento grid, CTA with the WebGL thread field,
  and footer.
- **ZiyaMaktab / Hotspot Dindigul** — the two case-study views, including their image
  galleries, metrics, and CTA links.
- **Overlays** — contact/quote modal (including sending and success states), privacy policy,
  and terms of service.
- **Motion/UI details** — preloader, custom cursor, magnetic buttons, split-text reveals,
  Lenis smooth scrolling, nav view switching, and mobile menu.
- **Original quirks** — the service-row icon/toggle classes are intentionally unstyled in the
  original CSS, so they render left-aligned under the row number. This is preserved.

Navigation is still React state (`home | ziya | hotspot`), exactly as the original: there are
no URL routes for the case studies, and the browser Back button leaves the app.

## Deviations from the live site

These are deliberate and documented:

1. **Self-hosted HDR environment.** The original loads its studio HDR from a remote CDN and
   blocks the preloader until it arrives. The file is now served from
   `public/hdri/studio_small_03_1k.hdr` so the hero scene works offline and reliably.
2. **Preloader failsafe.** The original only leaves the preloader once asset progress reaches
   100%, and on the live site it can hang there indefinitely. This build keeps the same
   animation but forces the exit after 9 seconds. Normal loads clear in roughly 4–5 seconds.
3. **Contact form is in demo mode by default.** The original EmailJS service/template/public
   key are intentionally *not* embedded. Without a local `.env`, the form shows the same
   sending → success flow but transmits nothing. To deliver real mail through your own
   EmailJS account, copy `.env.example` to `.env` and set:
   ```
   VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_TEMPLATE_ID=...
   VITE_EMAILJS_PUBLIC_KEY=...
   ```
4. **Dialog semantics.** The contact modal gained `role="dialog"`, `aria-modal="true"`, and an
   accessible name. The original had none. Focus trapping was not added, matching the
   original's keyboard behavior.
5. **OG image.** The live `og-image.png` is a 79-byte 404 body. A real 1200×630 image was
   generated from the reconstructed hero and saved to `public/og-image.png`.
6. **Scroll performance.** The recovered page mixed Lenis smooth scrolling with native
   `scrollIntoView({ behavior: 'smooth' })`, kept the hero's WebGL scene rendering at 60fps
   for the whole page, and re-blurred a 20px backdrop filter behind the fixed nav on every
   scroll frame. The behavior is unchanged, but the plumbing now:
   - routes every in-page jump (nav links, “Learn More”, “Explore Platform”) through the one
     Lenis instance, tuned to `lerp: 0.09` (the original 1.2s duration read as input lag);
   - pauses the hero canvas, silk shader, and ticker marquee once they leave the viewport;
   - drops the nav's backdrop blur in its `.scrolled` state (the background is 97% opaque
     there, so it was invisible but costly);
   - caps the thread-field shader in the CTA to 40fps and the full-screen shaders to
     `dpr ≤ 1.25`;
   - stops Lenis while a modal or the mobile menu is open, and marks the modal scroll areas
     with `data-lenis-prevent`.
   `src/lib/smoothScroll.js` and `src/styles/scroll.css` hold the added plumbing; the
   recovered stylesheet itself is untouched.

No form was submitted to the live site during analysis or reconstruction.

## Assets

- `src/styles/index.css` — the original 60,770-byte stylesheet, copied verbatim.
- `src/styles/lenis.css` — Lenis' required base styles.
- `public/assets/` — original Ziya/Hotspot images and favicon, with their hashed filenames.
- `public/hdri/` — self-hosted studio HDR (see deviation 1).
- `public/og-image.png` — generated replacement (see deviation 5).

Fonts are loaded from the original Google Fonts URL in `index.html`; no font binaries are
bundled.

## Verification

Checked in Chromium at 1440×900 and 390×844:

- Home hero, ZiyaMaktab, and Hotspot screenshots align with the reference captures; measured
  text bounding boxes and panel geometry match.
- Preloader clears, nav links switch views, service/FAQ/legal accordions open, mobile menu
  opens, and the contact form reaches its success state in demo mode.
- No page errors or failed requests. Only benign upstream warnings remain (`THREE.Clock`
  deprecation and a drei static-position warning for the scroll container).
# ASTRUXIO
