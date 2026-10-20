import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function buildKeyframes(from, to) {
  const keys = new Set([...Object.keys(from), ...to.flatMap((step) => Object.keys(step))])
  const keyframes = {}
  keys.forEach((key) => {
    keyframes[key] = [from[key], ...to.map((step) => step[key])]
  })
  return keyframes
}

/**
 * Word/character blur-reveal recovered from the shipped bundle (`R_`).
 */
export default function SplitText({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  tag = 'span',
}) {
  const items = animateBy === 'words' ? text.split(' ') : text.split('')
  const [visible, setVisible] = useState(false)
  const [done, setDone] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const hidden = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction],
  )

  const shown = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  )

  const from = animationFrom ?? hidden
  const to = animationTo ?? shown
  const frameCount = to.length + 1
  const duration = stepDuration * (frameCount - 1)
  const times = Array.from({ length: frameCount }, (_, index) =>
    frameCount === 1 ? 0 : index / (frameCount - 1),
  )

  const MotionTag = motion[tag] ?? motion.span

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', margin: 0 }}
    >
      {items.map((item, index) => {
        const keyframes = buildKeyframes(from, to)
        const transition = {
          duration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        }

        return (
          <motion.span
            key={index}
            style={{
              display: 'inline-block',
              willChange: done ? 'auto' : 'transform, filter, opacity',
            }}
            initial={from}
            animate={visible ? keyframes : from}
            transition={transition}
            onAnimationComplete={
              index === items.length - 1
                ? () => {
                    setDone(true)
                    onAnimationComplete?.()
                  }
                : undefined
            }
          >
            {item === ' ' ? '\u00A0' : item}
            {animateBy === 'words' && index < items.length - 1 && '\u00A0'}
          </motion.span>
        )
      })}
    </MotionTag>
  )
}
