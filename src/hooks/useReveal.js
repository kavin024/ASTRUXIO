import { useEffect, useRef, useState } from 'react'

/**
 * Reveal-on-scroll hook recovered from the shipped bundle (`ev`).
 */
export function useReveal(options) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -60px 0px',
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [options?.threshold, options?.rootMargin])

  return [ref, visible]
}
