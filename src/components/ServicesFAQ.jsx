import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplitText from './SplitText'
import Tilt from './Tilt'
import { useReveal } from '../hooks/useReveal'
import { faqs, serviceColors, services } from '../data/site'

/**
 * Services accordion + FAQ, recovered from the bundled `uv` component.
 */
export default function ServicesFAQ() {
  const [servicesRef, servicesVisible] = useReveal()
  const [faqRef, faqVisible] = useReveal()
  const [openService, setOpenService] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <section
        ref={servicesRef}
        id="services"
        className={`services-section scroll-reveal ${servicesVisible ? 'visible' : ''}`}
        aria-label="Services"
      >
        <div className="services-header">
          <div className="services-header-left">
            <div className="section-label">
              <span className="section-label-line" />
              What We Do
            </div>
            <h2 className="section-title">
              <SplitText
                text="Full-stack engineering"
                className="services-headline"
                animateBy="words"
                delay={50}
                tag="span"
              />
              <br />
              <SplitText
                text="capability."
                className="services-headline accent"
                animateBy="words"
                delay={50}
                tag="span"
              />
            </h2>
          </div>
          <p className="services-desc">
            Six core engineering disciplines, executed by one unified team. No handoffs. No silos.
            No compromises on quality.
          </p>
        </div>

        <div className="services-list" role="list">
          {services.map((service, index) => {
            const open = openService === index
            const Icon = service.icon
            const panelId = `service-panel-${index}`

            return (
              <div className={`service-row ${open ? 'open' : ''}`} role="listitem" key={index}>
                <button
                  className="service-row-header"
                  onClick={() => setOpenService(open ? null : index)}
                  data-cursor="hover"
                  aria-expanded={open}
                  aria-controls={panelId}
                >
                  <span className="service-row-num">{service.num}</span>
                  <div
                    className="service-row-icon-wrap"
                    style={{ color: serviceColors[index] }}
                    aria-hidden="true"
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                  <span className="service-row-title">{service.title}</span>
                  <div className="service-row-toggle" aria-hidden="true">
                    <motion.div
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path
                          d="M6.5 1.5V11.5M1.5 6.5H11.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      id={panelId}
                      className="service-row-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="service-row-inner">
                        <p className="service-row-desc">{service.desc}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      <section
        ref={faqRef}
        id="faq"
        className={`faq-section scroll-reveal ${faqVisible ? 'visible' : ''}`}
        aria-label="Frequently asked questions"
      >
        <div className="faq-inner">
          <div className="faq-header">
            <div className="section-label">
              <span className="section-label-line" />
              FAQ
            </div>
            <h2 className="section-title">
              Common
              <br />
              <span className="accent">questions.</span>
            </h2>
            <p className="faq-header-desc">
              Everything you need to know before we start building together.
            </p>
          </div>

          <div className="faq-list" role="list">
            {faqs.map((faq, index) => {
              const open = openFaq === index
              const panelId = `faq-panel-${index}`

              return (
                <Tilt key={index} rotateAmplitude={2} scaleOnHover={1.005}>
                  <div className={`faq-item ${open ? 'open' : ''}`} role="listitem">
                    <button
                      className="faq-question"
                      onClick={() => setOpenFaq(open ? null : index)}
                      aria-expanded={open}
                      aria-controls={panelId}
                    >
                      <span className="faq-q-text">{faq.q}</span>
                      <motion.span
                        className="faq-toggle"
                        animate={{ rotate: open ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                      >
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path
                            d="M5.5 0.5V10.5M0.5 5.5H10.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {open && (
                        <motion.div
                          id={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p className="faq-answer">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Tilt>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
