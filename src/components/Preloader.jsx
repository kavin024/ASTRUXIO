import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'
import gsap from 'gsap'

const WORDMARK = 'ASTRUXIO'

/**
 * Preloader recovered from the shipped bundle (`Jb`).
 *
 * Deviation: the original could hang forever if the external studio HDR failed.
 * The HDR is self-hosted here, and a 9s failsafe lets the site recover anyway.
 */
export default function Preloader() {
  const { progress } = useProgress()
  const [visible, setVisible] = useState(true)
  const [forced, setForced] = useState(false)
  const overlayRef = useRef(null)
  const charsRef = useRef([])
  const startedRef = useRef(false)
  const exitingRef = useRef(false)

  useEffect(() => {
    const chars = charsRef.current.filter(Boolean)
    gsap.fromTo(
      chars,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.9, ease: 'expo.out', delay: 0.2 },
    )
  }, [])

  useEffect(() => {
    const failsafe = window.setTimeout(() => setForced(true), 9000)
    return () => window.clearTimeout(failsafe)
  }, [])

  useEffect(() => {
    const ready = progress >= 100 || forced
    if (!ready || startedRef.current) return

    startedRef.current = true
    const start = Date.now()
    const interval = window.setInterval(() => {
      if (Date.now() - start >= 1800) {
        window.clearInterval(interval)
        if (!overlayRef.current || exitingRef.current) return
        exitingRef.current = true
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: 'expo.inOut',
          onComplete: () => setVisible(false),
        })
      }
    }, 100)

    return () => window.clearInterval(interval)
  }, [progress, forced])

  if (!visible) return null

  const barProgress = forced ? 100 : progress

  return (
    <div ref={overlayRef} className="preloader-overlay" aria-hidden="true">
      <div className="preloader-inner">
        <div className="preloader-wordmark">
          {WORDMARK.split('').map((char, index) => (
            <span
              key={index}
              ref={(node) => {
                charsRef.current[index] = node
              }}
              className="preloader-char"
            >
              {char}
            </span>
          ))}
        </div>
        <div className="preloader-bar-wrap">
          <div className="preloader-bar" style={{ width: `${barProgress}%` }} />
        </div>
        <div className="preloader-sub">Precision Engineering · Est. 2026</div>
      </div>
    </div>
  )
}
