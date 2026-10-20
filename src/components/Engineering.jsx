import { motion } from 'framer-motion'
import SplitText from './SplitText'
import Tilt from './Tilt'
import { useReveal } from '../hooks/useReveal'
import { principles } from '../data/site'

/**
 * Engineering philosophy bento grid recovered from the bundle (`ov`).
 */
export default function Engineering() {
  const [ref, visible] = useReveal()

  return (
    <section
      ref={ref}
      id="engineering"
      className={`engineering-section scroll-reveal ${visible ? 'visible' : ''}`}
      aria-label="Engineering principles"
    >
      <motion.div
        className="engineering-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section-label">
          <span className="section-label-line" />
          Engineering Philosophy
        </div>
        <h2 className="section-title">
          <SplitText text="How we build better software." animateBy="words" delay={55} tag="span" />
        </h2>
      </motion.div>

      <div className="bento-grid">
        {principles.map((item, index) => (
          <motion.div
            key={index}
            className={`bento-cell ${item.wide ? 'bento-wide' : ''}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Tilt className="bento-tilt" rotateAmplitude={5} scaleOnHover={1.015}>
              <div className="pillar-card" data-cursor="hover">
                <div className="pillar-card-accent" aria-hidden="true" />
                <div className="pillar-num">{item.num}</div>
                <h3 className="pillar-title">{item.title}</h3>
                <p className="pillar-desc">{item.desc}</p>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
