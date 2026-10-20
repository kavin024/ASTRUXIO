import { useEffect, useRef } from 'react'

/**
 * Magnetic hover wrapper recovered from the bundle (`Lf`).
 */
export default function Magnetic({
  children,
  padding = 80,
  disabled = false,
  magnetStrength = 2.5,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  style,
}) {
  const wrapperRef = useRef(null)
  const innerRef = useRef(null)
  const active = useRef(false)

  useEffect(() => {
    if (disabled) {
      if (innerRef.current) {
        innerRef.current.style.transform = 'translate3d(0,0,0)'
        innerRef.current.style.transition = inactiveTransition
      }
      return
    }

    const onMouseMove = (event) => {
      if (!wrapperRef.current || !innerRef.current) return
      const { left, top, width, height } = wrapperRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const distanceX = Math.abs(centerX - event.clientX)
      const distanceY = Math.abs(centerY - event.clientY)

      if (distanceX < width / 2 + padding && distanceY < height / 2 + padding) {
        const x = (event.clientX - centerX) / magnetStrength
        const y = (event.clientY - centerY) / magnetStrength
        if (!active.current) {
          active.current = true
          innerRef.current.style.transition = activeTransition
        }
        innerRef.current.style.transform = `translate3d(${x}px,${y}px,0)`
      } else if (active.current) {
        active.current = false
        innerRef.current.style.transition = inactiveTransition
        innerRef.current.style.transform = 'translate3d(0,0,0)'
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [padding, disabled, magnetStrength, activeTransition, inactiveTransition])

  return (
    <div
      ref={wrapperRef}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block', ...style }}
    >
      <div
        ref={innerRef}
        className={innerClassName}
        style={{
          transform: 'translate3d(0,0,0)',
          transition: inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}
