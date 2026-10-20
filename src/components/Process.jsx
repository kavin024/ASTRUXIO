import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SplitText from './SplitText'
import { useReveal } from '../hooks/useReveal'
import { processSteps } from '../data/site'

/**
 * Seven-step process timeline recovered from the bundle (`fv`).
 */
export default function Process() {
  const [ref, visible] = useReveal()
  const items = useRef([])

  useEffect(() => {
    if (!visible) return
    const timers = []
    items.current.forEach((item, index) => {
      if (!item) return
      timers.push(window.setTimeout(() => item.classList.add('active'), 80 + index * 110))
    })
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [visible])

  return (
    <section ref={ref} id="process" className="process-section" aria-label="Engineering process">
      <motion.div
        className="process-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section-label">
          <span className="section-label-line" />
          How We Work
        </div>
        <h2 className="section-title">
          <SplitText text="From idea to production." animateBy="words" delay={50} tag="span" />
        </h2>
        <p className="process-desc">
          Seven clearly defined phases. One accountable team. Nothing falls through the cracks —
          from the first discovery call to ongoing post-launch support.
        </p>
      </motion.div>

      <div className="process-timeline" role="list">
        {processSteps.map((step, index) => {
          const Icon = step.icon
          return (
            <div
              key={index}
              ref={(node) => {
                items.current[index] = node
              }}
              className="process-timeline-item"
              role="listitem"
            >
              <div className="process-timeline-marker" aria-hidden="true">
                <Icon size={15} strokeWidth={1.5} />
              </div>
              <div className="process-timeline-content">
                <div className="process-timeline-left">
                  <span className="process-timeline-num">{step.num}</span>
                  <span className="process-timeline-title">{step.label}</span>
                </div>
                <p className="process-timeline-sub">{step.sub}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
