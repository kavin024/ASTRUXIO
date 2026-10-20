import { useEffect, useRef } from 'react'

/**
 * Eased document scroll progress, recovered from the bundle (`A`).
 * Used by the 3D hero to move the sculpture out of frame on scroll.
 */
export function useScrollProgress() {
  const progress = useRef(0)
  const smooth = useRef(0)
  const animating = useRef(true)
  const frame = useRef(0)
  const maxScroll = useRef(0)

  useEffect(() => {
    const measure = () => {
      maxScroll.current = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      )
    }
    measure()

    // Reading scrollHeight on every animation frame forces layout work while
    // Lenis scrolls, so measure only when the document actually resizes.
    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    resizeObserver?.observe(document.body)
    window.addEventListener('resize', measure, { passive: true })

    const tick = () => {
      const target = window.scrollY
      const max = maxScroll.current
      const ratio = max > 0 ? target / max : 0
      const previous = smooth.current
      smooth.current += (ratio - previous) * 0.08
      progress.current = Math.max(0, Math.min(1, smooth.current))

      if (Math.abs(smooth.current - ratio) > 1e-4) {
        frame.current = requestAnimationFrame(tick)
      } else {
        smooth.current = ratio
        progress.current = ratio
        animating.current = false
      }
    }

    const onScroll = () => {
      if (animating.current) return
      animating.current = true
      frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      resizeObserver?.disconnect()
      cancelAnimationFrame(frame.current)
    }
  }, [])

  return progress
}

export function isMobileViewport() {
  return typeof window !== 'undefined' && window.innerWidth <= 768
}
