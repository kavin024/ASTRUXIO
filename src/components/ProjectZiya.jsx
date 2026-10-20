import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import CardSwap, { Card } from './CardSwap'
import Tilt from './Tilt'
import { useReveal } from '../hooks/useReveal'
import { scrollToTarget } from '../lib/smoothScroll'
import { ziyaCapabilities, ziyaMetrics } from '../data/site'

const heroImage = '/assets/Ziya-1-Cn-7oOnA.jpeg'
const galleryOne = '/assets/Ziya-2-CpEUQkaM.png'
const galleryTwo = '/assets/Ziya-3-Bqkbg-zu.png'

function getCardSize(width) {
  if (width <= 480) return { cW: 300, cH: 280, cD: 18, vD: 28 }
  if (width <= 640) return { cW: 340, cH: 300, cD: 26, vD: 36 }
  return { cW: 420, cH: 340, cD: 36, vD: 44 }
}

/**
 * ZiyaMaktab product page, recovered from the bundle (`ox`).
 */
export default function ProjectZiya({ onNavigate }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  const [galleryRef, galleryVisible] = useReveal()
  const [capabilitiesRef, capabilitiesVisible] = useReveal()
  const [metricsRef, metricsVisible] = useReveal()
  const [swapRef, swapVisible] = useReveal()
  const lastWidth = useRef(window.innerWidth)
  const [cardSize, setCardSize] = useState(() => getCardSize(window.innerWidth))

  useEffect(() => {
    let timeout
    const onResize = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        const width = window.innerWidth
        if (width !== lastWidth.current) {
          lastWidth.current = width
          setCardSize(getCardSize(width))
        }
      }, 150)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="pp-page" id="work">
      <section ref={heroRef} className="pp-hero pp-hero--ziya">
        <div className="pp-hero-inner">
          <motion.div
            className="pp-hero-left"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pp-eyebrow">
              <button className="pp-back-btn" onClick={() => onNavigate('home')}>
                <ChevronLeft size={13} /> Astruxio
              </button>
              <span className="pp-eyebrow-tag">PRODUCT · 01 / 02</span>
            </div>

            <h1 className="pp-hero-title">
              Ziya<span className="accent">Maktab</span>
            </h1>

            <p className="pp-hero-desc">
              A mobile-first Islamic education management platform. Smart attendance, interactive
              syllabus tracking, Hifz and Tajweed milestones, and parent-teacher communication —
              unified in a single, elegant application.
            </p>

            <div className="pp-hero-actions">
              <motion.button
                className="pp-cta-primary"
                onClick={() => scrollToTarget('#ziya-gallery')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Explore Platform</span>
                <ArrowRight size={14} />
              </motion.button>
              <button className="pp-cta-ghost" onClick={() => onNavigate('hotspot')}>
                Next Product →
              </button>
            </div>
          </motion.div>

          <motion.div
            className="pp-hero-visual"
            style={{ y: heroY }}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pp-hero-img-frame">
              <img src={heroImage} alt="ZiyaMaktab Mobile Dashboard" className="pp-hero-img" />
            </div>
          </motion.div>
        </div>
      </section>

      <div ref={metricsRef} className="pp-metrics">
        {ziyaMetrics.map((metric, index) => (
          <motion.div
            key={index}
            className="pp-metric"
            initial={{ opacity: 0, y: 20 }}
            animate={metricsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.55 }}
          >
            <span className="pp-metric-val">{metric.val}</span>
            <span className="pp-metric-lbl">{metric.label}</span>
          </motion.div>
        ))}
      </div>

      <section ref={galleryRef} id="ziya-gallery" className="pp-gallery">
        <motion.div
          className="pp-section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={galleryVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">
            <span className="section-label-line" />
            Platform Screens
          </div>
          <h2 className="section-title">
            Built for every
            <br />
            <span className="accent">stakeholder.</span>
          </h2>
        </motion.div>

        <div className={`pp-gallery-grid scroll-reveal ${galleryVisible ? 'visible' : ''}`}>
          <Tilt rotateAmplitude={4} scaleOnHover={1.02} className="pp-gallery-card">
            <img src={galleryOne} alt="ZiyaMaktab Syllabus" className="pp-gallery-img" />
            <div className="pp-gallery-overlay">
              <h3>Smarter Syllabus</h3>
              <p>Monitor Hifz and Tajweed with real-time student insights.</p>
            </div>
          </Tilt>

          <Tilt rotateAmplitude={4} scaleOnHover={1.02} className="pp-gallery-card">
            <img src={galleryTwo} alt="ZiyaMaktab Parent Connect" className="pp-gallery-img" />
            <div className="pp-gallery-overlay">
              <h3>Connected Ecosystem</h3>
              <p>Parent-teacher communication with advanced analytics.</p>
            </div>
          </Tilt>
        </div>
      </section>

      <section ref={capabilitiesRef} className="pp-capabilities">
        <motion.div
          className="pp-section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={capabilitiesVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">
            <span className="section-label-line" />
            Platform Capabilities
          </div>
          <h2 className="section-title">
            A complete
            <br />
            <span className="accent">ecosystem.</span>
          </h2>
        </motion.div>

        <div className={`pp-bento scroll-reveal ${capabilitiesVisible ? 'visible' : ''}`}>
          {ziyaCapabilities.map((capability, index) => {
            const Icon = capability.icon
            return (
              <motion.div
                key={capability.num}
                className="pp-bento-card"
                initial={{ opacity: 0, y: 16 }}
                animate={capabilitiesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
              >
                <div className="pp-bento-icon">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <span className="pp-bento-num">{capability.num}</span>
                <h3 className="pp-bento-title">{capability.title}</h3>
                <p className="pp-bento-desc">{capability.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section ref={swapRef} className="pp-swap-section">
        <div className="pp-swap-inner">
          <motion.div
            className="pp-swap-text"
            initial={{ opacity: 0, x: -24 }}
            animate={swapVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label">
              <span className="section-label-line" />
              Feature Deep-Dive
            </div>
            <h2 className="section-title section-title--cream">
              Every detail
              <br />
              <span className="accent">considered.</span>
            </h2>
            <p className="pp-swap-body">
              From student enrollment to parent communication — each feature is purpose-built for
              the unique needs of Islamic educational institutions.
            </p>
          </motion.div>

          <motion.div
            className="pp-swap-cards"
            initial={{ opacity: 0, x: 24 }}
            animate={swapVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <CardSwap
              cardDistance={cardSize.cD}
              verticalDistance={cardSize.vD}
              delay={4000}
              pauseOnHover
              skewAmount={4}
              easing="elastic"
              width={cardSize.cW}
              height={cardSize.cH}
            >
              <Card>
                <div className="product-swap-card">
                  <div>
                    <div className="product-swap-label">01 / Administration</div>
                    <div className="product-swap-title">
                      Student
                      <br />
                      <span className="accent">Enrollment</span>
                    </div>
                    <div className="product-swap-desc">
                      Manage profiles, academic records, and attendance from one clean, secure
                      vault.
                    </div>
                  </div>
                  <div className="product-swap-bottom">
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">100%</div>
                      <div className="product-swap-stat-lbl">Data Secured</div>
                    </div>
                    <div className="product-swap-divider" />
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">&lt;5s</div>
                      <div className="product-swap-stat-lbl">Enroll Time</div>
                    </div>
                    <div className="product-swap-divider" />
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">Zero</div>
                      <div className="product-swap-stat-lbl">Paper Forms</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="product-swap-card">
                  <div>
                    <div className="product-swap-label">02 / Islamic Learning</div>
                    <div className="product-swap-title">
                      Hifz &amp;
                      <br />
                      <span className="accent">Tajweed</span>
                    </div>
                    <div className="product-swap-desc">
                      Structured Islamic curriculum tracking with milestone-based learning
                      progression.
                    </div>
                  </div>
                  <div className="product-swap-bottom">
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">30+</div>
                      <div className="product-swap-stat-lbl">Juz Supported</div>
                    </div>
                    <div className="product-swap-divider" />
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">Live</div>
                      <div className="product-swap-stat-lbl">Progress Feed</div>
                    </div>
                    <div className="product-swap-divider" />
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">Auto</div>
                      <div className="product-swap-stat-lbl">Milestones</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="product-swap-card">
                  <div>
                    <div className="product-swap-label">03 / Communication</div>
                    <div className="product-swap-title">
                      Parent
                      <br />
                      <span className="accent">Connect</span>
                    </div>
                    <div className="product-swap-desc">
                      Real-time push notifications keeping every parent informed and every teacher
                      empowered.
                    </div>
                  </div>
                  <div className="product-swap-bottom">
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">Instant</div>
                      <div className="product-swap-stat-lbl">Push Alerts</div>
                    </div>
                    <div className="product-swap-divider" />
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">2-Way</div>
                      <div className="product-swap-stat-lbl">Messaging</div>
                    </div>
                    <div className="product-swap-divider" />
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">24/7</div>
                      <div className="product-swap-stat-lbl">Broadcast</div>
                    </div>
                  </div>
                </div>
              </Card>
            </CardSwap>
          </motion.div>
        </div>
      </section>

      <div className="pp-cta">
        <motion.div
          className="pp-cta-content"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="pp-cta-eyebrow">Interested in ZiyaMaktab?</span>
          <h2 className="pp-cta-title">
            Transform your
            <br />
            <span className="accent">institution today.</span>
          </h2>
          <p className="pp-cta-sub">
            Join institutions already using ZiyaMaktab to modernize Islamic education management.
          </p>
          <div className="pp-cta-actions">
            <motion.button
              className="pp-cta-primary"
              onClick={() => onNavigate('home')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Contact Us</span>
              <ArrowRight size={14} />
            </motion.button>
            <button className="pp-cta-ghost" onClick={() => onNavigate('hotspot')}>
              View Hotspot Dindigul →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
