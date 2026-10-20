import { motion } from 'framer-motion'
import SplitText from './SplitText'
import Tilt from './Tilt'
import { useReveal } from '../hooks/useReveal'
import { techStack } from '../data/site'

/**
 * Technology stack grid recovered from the bundle (`mv`).
 */
export default function TechStack() {
  const [ref, visible] = useReveal()

  return (
    <section
      ref={ref}
      id="tech"
      className={`tech-section scroll-reveal ${visible ? 'visible' : ''}`}
      aria-label="Technology stack"
    >
      <div className="tech-header">
        <div>
          <div className="section-label">
            <span className="section-label-line" />
            Our Stack
          </div>
          <h2 className="section-title">
            <SplitText text="Technology expertise." animateBy="words" delay={60} tag="span" />
          </h2>
        </div>
        <p className="tech-header-desc">
          We choose the right technology for each problem — not the most familiar one. Thirty-plus
          battle-tested tools across five core disciplines.
        </p>
      </div>

      <div className="tech-grid" role="list">
        {techStack.map((category, categoryIndex) => (
          <Tilt
            key={category.key}
            className="tech-category-card"
            rotateAmplitude={4}
            scaleOnHover={1.015}
          >
            <div className="tech-category" role="listitem" data-cursor="hover">
              <div className="tech-category-header">
                <div
                  className="tech-category-dot"
                  style={{ background: category.color }}
                  aria-hidden="true"
                />
                <span className="tech-category-name">{category.name}</span>
              </div>

              <div className="tech-pills" role="list">
                {category.techs.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="tech-pill"
                    role="listitem"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.5,
                      delay: categoryIndex * 0.07 + index * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{
                      color: category.color,
                      borderColor: `${category.color}50`,
                      background: `${category.color}12`,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  )
}
