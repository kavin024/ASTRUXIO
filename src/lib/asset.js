/**
 * Resolve a file in public/ against Vite's configured base path.
 *
 * Root-absolute paths such as `/assets/hero.png` only work when the site is
 * served from the domain root. GitHub Pages project sites live under a
 * subpath (e.g. `/ASTRUXIO/`), so every public asset goes through here.
 */
export function asset(path) {
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`
}
