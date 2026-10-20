import {
  Children,
  cloneElement,
  createRef,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import gsap from 'gsap'

const Card = forwardRef(({ customClass, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={`card ${customClass ?? ''} ${props.className ?? ''}`.trim()}
  />
))
Card.displayName = 'Card'

function getPosition(index, cardDistance, verticalDistance, total) {
  return {
    x: index * cardDistance - ((total - 1) * cardDistance) / 2,
    y: -(index * verticalDistance) + ((total - 1) * verticalDistance) / 2,
    z: -index * cardDistance * 1.5,
    zIndex: total - index,
  }
}

function setCardTransform(element, position, skewAmount) {
  gsap.set(element, {
    x: position.x,
    y: position.y,
    z: position.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skewAmount,
    transformOrigin: 'center center',
    zIndex: position.zIndex,
    force3D: true,
  })
}

/**
 * Auto-rotating 3D card stack recovered from the bundle (`rx`).
 */
export default function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children,
}) {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        }

  const childrenArray = useMemo(() => Children.toArray(children), [children])
  const refs = useMemo(
    () => childrenArray.map(() => createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childrenArray.length],
  )
  const order = useRef(Array.from({ length: childrenArray.length }, (_, index) => index))
  const timeline = useRef(null)
  const interval = useRef(null)
  const container = useRef(null)

  useEffect(() => {
    const total = refs.length
    refs.forEach((ref, index) => {
      if (ref.current) setCardTransform(ref.current, getPosition(index, cardDistance, verticalDistance, total), skewAmount)
    })

    const swap = () => {
      if (order.current.length < 2) return

      const [front, ...rest] = order.current
      const frontCard = refs[front]?.current
      if (!frontCard) return

      const tl = gsap.timeline()
      timeline.current = tl

      tl.to(frontCard, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease,
      })
      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`)

      rest.forEach((index, positionIndex) => {
        const element = refs[index]?.current
        if (!element) return
        const position = getPosition(positionIndex, cardDistance, verticalDistance, refs.length)
        tl.set(element, { zIndex: position.zIndex }, 'promote')
        tl.to(
          element,
          {
            x: position.x,
            y: position.y,
            z: position.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${positionIndex * 0.15}`,
        )
      })

      const returnPosition = getPosition(refs.length - 1, cardDistance, verticalDistance, refs.length)
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`)
      tl.call(
        () => {
          gsap.set(frontCard, { zIndex: returnPosition.zIndex })
        },
        undefined,
        'return',
      )
      tl.to(
        frontCard,
        {
          x: returnPosition.x,
          y: returnPosition.y,
          z: returnPosition.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        'return',
      )
      tl.call(() => {
        order.current = [...rest, front]
      })
    }

    swap()
    interval.current = window.setInterval(swap, delay)

    if (pauseOnHover) {
      const node = container.current
      const pause = () => {
        timeline.current?.pause()
        window.clearInterval(interval.current)
      }
      const resume = () => {
        timeline.current?.play()
        interval.current = window.setInterval(swap, delay)
      }
      node?.addEventListener('mouseenter', pause)
      node?.addEventListener('mouseleave', resume)

      return () => {
        node?.removeEventListener('mouseenter', pause)
        node?.removeEventListener('mouseleave', resume)
        window.clearInterval(interval.current)
      }
    }

    return () => window.clearInterval(interval.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing])

  const cards = childrenArray.map((child, index) => {
    if (!isValidElement(child)) return child

    return cloneElement(child, {
      key: index,
      ref: refs[index],
      style: { width, height, ...(child.props.style ?? {}) },
      onClick: (event) => {
        child.props.onClick?.(event)
        onCardClick?.(index)
      },
    })
  })

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {cards}
    </div>
  )
}

export { Card }
