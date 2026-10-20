import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'

function useElementWidth(ref) {
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    function update() {
      if (ref.current) setWidth(ref.current.offsetWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [ref])

  return width
}

function wrapValue(min, max, value) {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

/**
 * Scroll-reactive infinite marquee recovered from the shipped bundle (`B_`).
 */
export default function Marquee({ children, baseVelocity = 100, className = '', numCopies = 5 }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })
  const copyRef = useRef(null)
  const containerRef = useRef(null)
  const inView = useRef(true)
  const copyWidth = useElementWidth(copyRef)

  useEffect(() => {
    const node = containerRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting
    }, { rootMargin: '100px 0px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const x = useTransform(baseX, (value) =>
    copyWidth === 0 ? '0px' : `${wrapValue(-copyWidth, 0, value)}px`,
  )
  const directionFactor = useRef(1)

  useAnimationFrame((_, delta) => {
    if (!inView.current) return
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) directionFactor.current = -1
    else if (velocityFactor.get() > 0) directionFactor.current = 1
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div style={{ x, display: 'flex', whiteSpace: 'nowrap' }}>
        {Array.from({ length: numCopies }, (_, index) => (
          <span className={className} ref={index === 0 ? copyRef : null} key={index}>
            {children}&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function MarqueeTicker({ texts = [], velocity = 80, className = '', numCopies = 6 }) {
  return (
    <div>
      {texts.map((text, index) => (
        <Marquee
          key={index}
          className={className}
          baseVelocity={index % 2 === 0 ? velocity : -velocity}
          numCopies={numCopies}
        >
          {text}
        </Marquee>
      ))}
    </div>
  )
}
