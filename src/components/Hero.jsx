import { Suspense, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import SplitText from './SplitText'
import { MarqueeTicker } from './Marquee'
import HeroScene from './HeroScene'
import Silk from './Silk'
import { heroStats, tickerItems } from '../data/site'
import { scrollToTarget } from '../lib/smoothScroll'

const revealVariants = {
  hidden: { y: 40, opacity: 0 },
  show: (index) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.6 + index * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
}

/**
 * Hero section recovered from the bundle (`$_`).
 */
export default function Hero({ progressRef }) {
  const wordmark = useRef(null)

  useEffect(() => {
    const node = wordmark.current
    if (!node) return

    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      // The wordmark sits at the bottom of the hero; past that it is hidden.
      if (y > window.innerHeight * 1.5) return
      gsap.set(node, { y: y * 0.3, force3D: true })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="hero" id="home" aria-label="Hero">
      <div className="hero-silk-bg" aria-hidden="true">
        <Suspense fallback={null}>
          <Silk speed={3} scale={1.4} color="#E8D5B7" noiseIntensity={1.2} rotation={0.2} />
        </Suspense>
      </div>

      <div className="hero-inner">
        <div className="hero-left">
          <motion.div
            className="hero-eyebrow"
            custom={0}
            variants={revealVariants}
            initial="hidden"
            animate="show"
          >
            <span className="hero-eyebrow-line" />
            ASTRUXIO · EST. 2026
          </motion.div>

          <h1 className="hero-headline" aria-label="Engineering the future">
            <SplitText
              text="ENGINEERING"
              className="hero-hl-line"
              delay={60}
              stepDuration={0.5}
              direction="bottom"
              tag="span"
            />
            <span className="hero-hl-flex">
              <SplitText
                text="THE"
                className="hero-hl-line accent"
                delay={60}
                stepDuration={0.5}
                direction="bottom"
                tag="span"
              />
              <SplitText
                text="FUTURE."
                className="hero-hl-line serif"
                delay={60}
                stepDuration={0.5}
                direction="bottom"
                tag="span"
              />
            </span>
          </h1>

          <motion.p
            className="hero-desc"
            custom={1}
            variants={revealVariants}
            initial="hidden"
            animate="show"
          >
            Astruxio is a premier software engineering firm building custom-first platforms,
            AI-integrated systems, and cloud-native solutions engineered for boundless scale.
          </motion.p>

          <motion.div
            className="hero-actions"
            custom={2}
            variants={revealVariants}
            initial="hidden"
            animate="show"
          >
            <button
              className="btn-primary"
              data-cursor="hover"
              id="hero-cta"
              onClick={() => {
                const desktop = document.querySelector('.desktop-cta')
                if (desktop) desktop.click()
                else document.querySelector('.mobile-menu-btn')?.click()
              }}
            >
              <span>Start a Project</span>
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

            <button
              className="btn-ghost"
              onClick={() => scrollToTarget('#about')}
            >
              Learn More
            </button>
          </motion.div>

          <motion.div
            className="hero-stats"
            custom={3}
            variants={revealVariants}
            initial="hidden"
            animate="show"
          >
            {heroStats.map((stat, index) => (
              <div className="hero-stat-pill" key={index}>
                <span className="hero-stat-val">{stat.val}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="hero-right" aria-hidden="true">
          <HeroScene progressRef={progressRef} />
        </div>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        aria-hidden="true"
      >
        <div className="hero-scroll-line" />
        <span className="hero-scroll-label">Scroll</span>
      </motion.div>

      <div className="hero-wordmark-row" aria-hidden="true">
        <div ref={wordmark} className="hero-wordmark-large">
          ASTRUXIO
        </div>
      </div>

      <div className="hero-ticker" aria-hidden="true">
        <MarqueeTicker
          texts={[tickerItems.join('  ·  ')]}
          velocity={60}
          className="hero-ticker-item"
          numCopies={4}
        />
      </div>
    </section>
  )
}
