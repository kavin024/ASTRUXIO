import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const spring = { damping: 30, stiffness: 100, mass: 2 }

/**
 * 3D tilt wrapper recovered from the bundle (`nv`).
 */
export default function Tilt({
  children,
  className = '',
  style,
  scaleOnHover = 1.02,
  rotateAmplitude = 8,
}) {
  const ref = useRef(null)
  const rotateX = useSpring(useMotionValue(0), spring)
  const rotateY = useSpring(useMotionValue(0), spring)
  const scale = useSpring(1, spring)

  function onMouseMove(event) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    rotateX.set((y / (rect.height / 2)) * -rotateAmplitude)
    rotateY.set((x / (rect.width / 2)) * rotateAmplitude)
  }

  function onMouseEnter() {
    scale.set(scaleOnHover)
  }

  function onMouseLeave() {
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        scale,
        ...style,
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}
