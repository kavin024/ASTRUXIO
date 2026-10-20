import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, X } from 'lucide-react'
import { legalContent } from '../data/site'
import { getLenis } from '../lib/smoothScroll'

/**
 * Privacy / Terms modal recovered from the bundle (`Cb`).
 */
export default function LegalModal({ type, onClose }) {
  const overlayRef = useRef(null)
  const [tab, setTab] = useState(type ?? 'privacy')
  const [openItem, setOpenItem] = useState(0)

  useEffect(() => {
    if (type) setTab(type)
  }, [type])

  useEffect(() => {
    const lenis = getLenis()
    if (type) lenis?.stop()
    else lenis?.start()
    document.body.style.overflow = type ? 'hidden' : ''
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [type])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  if (!type) return null

  const content = legalContent[tab]
  const Icon = content.icon

  return (
    <motion.div
      ref={overlayRef}
      className="lm-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={(event) => {
        if (event.target === overlayRef.current) onClose()
      }}
    >
      <motion.div
        className="lm-panel"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="lm-header">
          <div className="lm-header-left">
            <div className="lm-icon">
              <Icon size={16} strokeWidth={1.5} />
            </div>
            <div>
              <span className="lm-meta">{content.label}</span>
              <h2 className="lm-title">{content.title}</h2>
            </div>
          </div>
          <button className="lm-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="lm-tabs">
          {['privacy', 'terms'].map((key) => (
            <button
              key={key}
              className={`lm-tab${tab === key ? ' lm-tab--on' : ''}`}
              onClick={() => {
                setTab(key)
                setOpenItem(0)
              }}
            >
              {key === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              {tab === key && (
                <motion.span
                  className="lm-tab-bar"
                  layoutId="lm-bar"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="lm-body" data-lenis-prevent>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {content.sections.map((section, index) => (
                <div
                  key={index}
                  className={`lm-item${openItem === index ? ' lm-item--open' : ''}`}
                >
                  <button
                    className="lm-item-btn"
                    onClick={() => setOpenItem(openItem === index ? null : index)}
                  >
                    <span className="lm-item-num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="lm-item-heading">{section.heading}</span>
                    <motion.span
                      className="lm-item-chevron"
                      animate={{ rotate: openItem === index ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown size={15} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openItem === index && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="lm-item-body">{section.body}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lm-footer">
          <span className="lm-footer-note">
            Questions? <a href="mailto:info@astruxio.in">info@astruxio.in</a>
          </span>
          <button className="lm-footer-close" onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
