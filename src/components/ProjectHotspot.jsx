import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import CardSwap, { Card } from './CardSwap'
import Tilt from './Tilt'
import { useReveal } from '../hooks/useReveal'
import { asset } from '../lib/asset'
import { hotspotCapabilities, hotspotMetrics } from '../data/site'

const heroImage = asset('assets/Hotspot-1-DCjhMPZA.png')
const galleryOne = asset('assets/Hotspot-2-B2BXDtOr.png')
const galleryTwo = asset('assets/Hotspot-3-BsXrKTyQ.png')

function getCardSize(width) {
  if (width <= 480) return { cW: 300, cH: 280, cD: 18, vD: 28 }
  if (width <= 640) return { cW: 340, cH: 300, cD: 26, vD: 36 }
  return { cW: 420, cH: 340, cD: 36, vD: 44 }
}

/**
 * Hotspot Dindigul product page, recovered from the bundle (`fx`).
 */
export default function ProjectHotspot({ onNavigate }) {
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
      <section ref={heroRef} className="pp-hero pp-hero--hotspot">
        <div className="pp-hero-inner">
          <motion.div
            className="pp-hero-left"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pp-eyebrow">
              <button
                className="pp-back-btn pp-back-btn--light"
                onClick={() => onNavigate('home')}
              >
                <ChevronLeft size={13} /> Astruxio
              </button>
              <span className="pp-eyebrow-tag">PRODUCT · 02 / 02</span>
            </div>

            <h1 className="pp-hero-title pp-hero-title--cream">
              Hotspot<span className="accent">Dindigul</span>
            </h1>

            <p className="pp-hero-desc pp-hero-desc--muted">
              A full-stack e-commerce platform for premium menswear. Features local delivery
              management, Razorpay-powered secure checkout, real-time order tracking, and a powerful
              admin dashboard — built for modern retail.
            </p>

            <div className="pp-hero-actions">
              <motion.button
                className="pp-cta-primary pp-cta-primary--amber"
                onClick={() =>
                  window.open('https://hotspotdindigul.in', '_blank', 'noopener,noreferrer')
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Visit Live Site</span>
                <ArrowRight size={14} />
              </motion.button>
              <button className="pp-cta-ghost pp-cta-ghost--light" onClick={() => onNavigate('ziya')}>
                ← ZiyaMaktab
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
            <div className="pp-hero-img-frame pp-hero-img-frame--dark">
              <img src={heroImage} alt="HotspotDindigul E-Commerce" className="pp-hero-img" />
            </div>
          </motion.div>
        </div>
      </section>

      <div ref={metricsRef} className="pp-metrics pp-metrics--dark">
        {hotspotMetrics.map((metric, index) => (
          <motion.div
            key={index}
            className="pp-metric pp-metric--dark"
            initial={{ opacity: 0, y: 20 }}
            animate={metricsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.55 }}
          >
            <span className="pp-metric-val">{metric.val}</span>
            <span className="pp-metric-lbl">{metric.label}</span>
          </motion.div>
        ))}
      </div>

      <section ref={galleryRef} className="pp-gallery">
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
            Built for modern
            <br />
            <span className="accent">retail.</span>
          </h2>
        </motion.div>

        <div className={`pp-gallery-grid scroll-reveal ${galleryVisible ? 'visible' : ''}`}>
          <Tilt rotateAmplitude={4} scaleOnHover={1.02} className="pp-gallery-card">
            <img src={galleryOne} alt="Hotspot Premium Catalogue" className="pp-gallery-img" />
            <div className="pp-gallery-overlay">
              <h3>Premium Quality</h3>
              <p>
                High-quality menswear with categorized browsing for a conversion-optimized
                experience.
              </p>
            </div>
          </Tilt>

          <Tilt rotateAmplitude={4} scaleOnHover={1.02} className="pp-gallery-card">
            <img src={galleryTwo} alt="Hotspot Order Tracking" className="pp-gallery-img" />
            <div className="pp-gallery-overlay">
              <h3>Order Tracking</h3>
              <p>Real-time order status from placement to doorstep delivery.</p>
            </div>
          </Tilt>
        </div>
      </section>

      <section ref={capabilitiesRef} className="pp-capabilities pp-capabilities--dark">
        <motion.div
          className="pp-section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={capabilitiesVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label section-label--light">
            <span className="section-label-line section-label-line--amber" />
            Platform Capabilities
          </div>
          <h2 className="section-title section-title--cream">
            A complete retail
            <br />
            <span className="accent">ecosystem.</span>
          </h2>
        </motion.div>

        <div className={`pp-bento scroll-reveal ${capabilitiesVisible ? 'visible' : ''}`}>
          {hotspotCapabilities.map((capability, index) => {
            const Icon = capability.icon
            return (
              <motion.div
                key={capability.num}
                className="pp-bento-card pp-bento-card--dark"
                initial={{ opacity: 0, y: 16 }}
                animate={capabilitiesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
              >
                <div className="pp-bento-icon">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <span className="pp-bento-num">{capability.num}</span>
                <h3 className="pp-bento-title pp-bento-title--cream">{capability.title}</h3>
                <p className="pp-bento-desc pp-bento-desc--muted">{capability.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section ref={swapRef} className="pp-swap-section pp-swap-section--light">
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
            <h2 className="section-title">
              Every feature
              <br />
              <span className="accent">purpose-built.</span>
            </h2>
            <p className="pp-swap-body pp-swap-body--dark">
              From a conversion-optimized storefront to a real-time admin dashboard — every feature
              is engineered to drive growth and deliver a premium retail experience.
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
                    <div className="product-swap-label">01 / Shopping</div>
                    <div className="product-swap-title">
                      Product
                      <br />
                      <span className="accent">Catalog</span>
                    </div>
                    <div className="product-swap-desc">
                      Seamless browsing with dynamic categories, wishlist capabilities, and fast
                      product search.
                    </div>
                  </div>
                  <div className="product-swap-bottom">
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">100%</div>
                      <div className="product-swap-stat-lbl">Mobile Ready</div>
                    </div>
                    <div className="product-swap-divider" />
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">&lt;2s</div>
                      <div className="product-swap-stat-lbl">Load Time</div>
                    </div>
                    <div className="product-swap-divider" />
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">High</div>
                      <div className="product-swap-stat-lbl">Conversion</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="product-swap-card">
                  <div>
                    <div className="product-swap-label">02 / Checkout</div>
                    <div className="product-swap-title">
                      Secure
                      <br />
                      <span className="accent">Checkout</span>
                    </div>
                    <div className="product-swap-desc">
                      Integrated Razorpay payments and customized local delivery options for a
                      frictionless purchase.
                    </div>
                  </div>
                  <div className="product-swap-bottom">
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">Zero</div>
                      <div className="product-swap-stat-lbl">Friction</div>
                    </div>
                    <div className="product-swap-divider" />
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">Safe</div>
                      <div className="product-swap-stat-lbl">Transactions</div>
                    </div>
                    <div className="product-swap-divider" />
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">Auto</div>
                      <div className="product-swap-stat-lbl">Invoicing</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="product-swap-card">
                  <div>
                    <div className="product-swap-label">03 / Management</div>
                    <div className="product-swap-title">
                      Admin
                      <br />
                      <span className="accent">Dashboard</span>
                    </div>
                    <div className="product-swap-desc">
                      Comprehensive toolkit to manage inventory, fulfill orders, and update content
                      in real-time.
                    </div>
                  </div>
                  <div className="product-swap-bottom">
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">Instant</div>
                      <div className="product-swap-stat-lbl">Updates</div>
                    </div>
                    <div className="product-swap-divider" />
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">Live</div>
                      <div className="product-swap-stat-lbl">Analytics</div>
                    </div>
                    <div className="product-swap-divider" />
                    <div className="product-swap-stat">
                      <div className="product-swap-stat-val">Full</div>
                      <div className="product-swap-stat-lbl">Control</div>
                    </div>
                  </div>
                </div>
              </Card>
            </CardSwap>
          </motion.div>
        </div>
      </section>

      <div className="pp-cta pp-cta--dark">
        <motion.div
          className="pp-cta-content"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="pp-cta-eyebrow">Ready to elevate your retail?</span>
          <h2 className="pp-cta-title pp-cta-title--cream">
            Next-gen retail
            <br />
            <span className="accent">engineered for you.</span>
          </h2>
          <p className="pp-cta-sub pp-cta-sub--muted">
            Join the next generation of e-commerce platforms built for modern menswear retail in
            India.
          </p>
          <div className="pp-cta-actions">
            <motion.button
              className="pp-cta-primary pp-cta-primary--amber"
              onClick={() => {
                const desktop = document.querySelector('.desktop-cta')
                if (desktop) desktop.click()
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Request a Demo</span>
              <ArrowRight size={14} />
            </motion.button>
            <button className="pp-cta-ghost pp-cta-ghost--light" onClick={() => onNavigate('home')}>
              ← Return to Astruxio
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
