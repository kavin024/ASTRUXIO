import { motion } from 'framer-motion'
import Magnetic from './Magnetic'
import SplitText from './SplitText'
import Threads from './Threads'
import { useReveal } from '../hooks/useReveal'

/**
 * Closing CTA + footer recovered from the bundle (`xb`).
 */
export default function CTA({ onModal, onContact }) {
  const [ctaRef, ctaVisible] = useReveal()
  const [footerRef, footerVisible] = useReveal()

  return (
    <>
      <section
        ref={ctaRef}
        id="contact"
        className={`cta-section scroll-reveal ${ctaVisible ? 'visible' : ''}`}
        aria-label="Call to action"
      >
        <div className="cta-threads-bg" aria-hidden="true">
          <Threads color={[0.79, 0.52, 0.23]} amplitude={1.2} distance={0.3} enableMouseInteraction />
        </div>

        <div className="cta-content">
          <motion.span
            className="cta-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Ready to build?
          </motion.span>

          <motion.h2
            className="cta-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <SplitText
              text="Let's build something remarkable together."
              animateBy="words"
              delay={60}
              stepDuration={0.45}
              direction="bottom"
              className="cta-headline-text"
              tag="span"
            />
          </motion.h2>

          <motion.p
            className="cta-subtitle"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            Whether you're starting from scratch or scaling an existing product, we're ready to
            bring precision engineering to your vision.
          </motion.p>

          <motion.div
            className="cta-actions"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnetic padding={60} magnetStrength={3}>
              <button
                className="btn-primary btn-large"
                onClick={onContact}
                id="footer-cta-btn"
                data-cursor="hover"
              >
                <span>Start a Project</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 8H13.5M13.5 8L9 3.5M13.5 8L9 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Magnetic>

            <Magnetic padding={40} magnetStrength={3}>
              <a href="mailto:info@astruxio.in" className="btn-secondary" data-cursor="hover">
                Email Us
              </a>
            </Magnetic>
          </motion.div>

          <motion.a
            href="mailto:info@astruxio.in"
            className="cta-email"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            info@astruxio.in
          </motion.a>
        </div>
      </section>

      <footer
        ref={footerRef}
        className={`site-footer scroll-reveal ${footerVisible ? 'visible' : ''}`}
        role="contentinfo"
      >
        <div className="footer-wordmark-wrap">
          <motion.div
            className="footer-wordmark"
            aria-label="Astruxio"
            whileHover={{ letterSpacing: '0.18em' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            ASTRUXIO
          </motion.div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} Astruxio Systems. All rights reserved.
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <button onClick={() => onModal('privacy')}>Privacy Policy</button>
            <button onClick={() => onModal('terms')}>Terms of Service</button>
            <button onClick={onContact}>Contact Us</button>
          </nav>
        </div>
      </footer>
    </>
  )
}
