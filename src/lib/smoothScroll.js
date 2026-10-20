/**
 * Shared Lenis instance.
 *
 * The recovered bundle used Lenis for wheel smoothing but left in-page links on
 * native `scrollIntoView({ behavior: 'smooth' })`. The two animations then fought
 * over `window.scrollY` (the browser's smooth scroll and Lenis' rAF loop), which
 * is the main reason nav clicks felt jerky. Everything that scrolls the page now
 * goes through the one Lenis instance.
 */
let lenis = null

/** Height of the fixed nav plus its top offset. */
const NAV_OFFSET = 86

export function setLenis(instance) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

export function scrollToTarget(target, options = {}) {
  const node = typeof target === 'string' ? document.querySelector(target) : target
  if (!node) return

  if (lenis) {
    // `force` lets navigation win over a temporarily stopped instance (e.g. the
    // mobile menu closing in the same click).
    lenis.scrollTo(node, { offset: -NAV_OFFSET, duration: 0.9, force: true, ...options })
  } else {
    node.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function scrollToTop({ immediate = true } = {}) {
  if (lenis) {
    lenis.scrollTo(0, { immediate, force: true })
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' })
  }
}
