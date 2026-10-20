import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const HOVER_SELECTOR = 'a, button, [data-cursor="hover"]'

/**
 * Two-part custom cursor recovered from the shipped bundle (`Xb`).
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    // Touch / pen devices have no hover cursor and no mousemove stream.
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let frame = 0

    const tick = () => {
      const dx = mouseX - ringX
      const dy = mouseY - ringY
      ringX += dx * 0.16
      ringY += dy * 0.16
      gsap.set(ring, { x: ringX, y: ringY, force3D: true })

      // Stop the loop once the ring has caught up; it restarts on the next move.
      if (Math.abs(dx) + Math.abs(dy) > 0.05) {
        frame = requestAnimationFrame(tick)
      } else {
        frame = 0
      }
    }

    const onMouseMove = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
      gsap.set(dot, { x: mouseX, y: mouseY, force3D: true })
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMouseOver = (event) => {
      const target = event.target
      if (!target) return
      if (target.matches(HOVER_SELECTOR) || target.closest(HOVER_SELECTOR)) {
        gsap.to(ring, {
          scale: 2,
          borderColor: 'var(--amber)',
          duration: 0.3,
          ease: 'power2.out',
        })
        gsap.to(dot, { scale: 0, duration: 0.2 })
      }
    }

    const onMouseOut = (event) => {
      const target = event.target
      const related = event.relatedTarget
      if (!target) return
      const entering = target.matches(HOVER_SELECTOR) || target.closest(HOVER_SELECTOR)
      const leaving = related && (related.matches(HOVER_SELECTOR) || related.closest(HOVER_SELECTOR))
      if (entering && !leaving) {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(18,10,6,0.25)',
          duration: 0.3,
          ease: 'power2.out',
        })
        gsap.to(dot, { scale: 1, duration: 0.2 })
      }
    }

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.15 })
      gsap.to(dot, { scale: 2.5, duration: 0.15 })
    }

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.25, ease: 'elastic.out(1, 0.5)' })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
