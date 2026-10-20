import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SplitText from './SplitText'
import Tilt from './Tilt'
import { useReveal } from '../hooks/useReveal'
import { aboutChapters } from '../data/site'

/**
 * Scroll-driven story section recovered from the bundle (`iv`).
 */
export default function About({ onNavigate }) {
  const [active, setActive] = useState(0)
  const [sectionRef, visible] = useReveal()
  const blocks = useRef([])

  useEffect(() => {
    const observers = []
    blocks.current.forEach((block, index) => {
      if (!block) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index)
        },
        { threshold: 0.45, rootMargin: '-5% 0px -45% 0px' },
      )
      observer.observe(block)
      observers.push(observer)
    })
    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  const chapter = aboutChapters[active]

  return (
    <section
      ref={sectionRef}
      className={`about-section scroll-reveal ${visible ? 'visible' : ''}`}
      id="about"
      aria-label="About Astruxio"
    >
      <div className="about-inner">
        <div className="about-left">
          <div className="section-label">
            <span className="section-label-line" />
            About Astruxio
          </div>

          <motion.div
            key={`num-${active}`}
            className="about-big-number"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            {chapter.num}
          </motion.div>

          <div className="about-progress" aria-hidden="true">
            {aboutChapters.map((_, index) => (
              <div
                key={index}
                className={`about-progress-stem ${index <= active ? 'active' : ''}`}
              />
            ))}
          </div>

          <motion.div
            key={`sub-${active}`}
            className="about-left-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {chapter.sub}
          </motion.div>

          <button
            className="btn-primary"
            style={{ marginTop: 40 }}
            onClick={() => onNavigate?.('ziya')}
            id="explore-work-btn"
            data-cursor="hover"
          >
            <span>Explore Our Work</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2 7H12M12 7L8 3M12 7L8 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="about-right">
          {aboutChapters.map((item, index) => (
            <div
              key={index}
              ref={(node) => {
                blocks.current[index] = node
              }}
              className={`about-story-block ${active === index ? 'active' : ''}`}
            >
              <h2 className="about-story-heading">
                <SplitText
                  text={item.heading}
                  className="about-story-headline-text"
                  delay={50}
                  animateBy="words"
                  stepDuration={0.4}
                  direction="bottom"
                  tag="span"
                />
              </h2>
              <p className="about-story-body">{item.body}</p>
              <div className="about-pillars">
                {item.pillars.map((pillar, pillarIndex) => (
                  <Tilt key={pillarIndex} className="about-pillar-tilt" rotateAmplitude={5}>
                    <div className="about-pillar">
                      <div className="about-pillar-title">{pillar.label}</div>
                      <div className="about-pillar-desc">{pillar.desc}</div>
                    </div>
                  </Tilt>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
