import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Building2,
  CircleCheckBig,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
  X,
} from 'lucide-react'
import { sendContactEmail } from '../lib/email'
import { getLenis } from '../lib/smoothScroll'

const emptyForm = { name: '', email: '', phone: '', company: '', message: '' }

/**
 * Contact modal recovered from the bundle (`Kb`).
 *
 * Deviation: ARIA dialog semantics were added, and delivery is stubbed unless
 * the operator supplies their own EmailJS credentials (see src/lib/email.js).
 */
export default function ContactModal({ open, onClose }) {
  const overlayRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const handleChange = (event) => {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('sending')
    try {
      await sendContactEmail({
        from_name: form.name,
        from_email: form.email,
        phone: form.phone || 'Not provided',
        company: form.company || 'Not provided',
        message: form.message,
      })
      setStatus('success')
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus('error')
    }
  }

  const closeAndReset = () => {
    onClose()
    setTimeout(() => {
      setStatus('idle')
      setForm(emptyForm)
    }, 400)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          className="cm-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Contact Us"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(event) => {
            if (event.target === overlayRef.current) closeAndReset()
          }}
        >
          <motion.div
            className="cm-panel"
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cm-left" aria-hidden="true">
              <div className="cm-left-bg" />
              <div className="cm-left-content">
                <span className="cm-brand-eyebrow">ASTRUXIO</span>
                <h2 className="cm-brand-heading">
                  Let's build
                  <br />
                  <span className="cm-brand-accent">something</span>
                  <br />
                  remarkable.
                </h2>
                <p className="cm-brand-body">
                  We respond within 24 hours. Every inquiry is reviewed by our engineering leads.
                </p>
                <a href="mailto:info@astruxio.in" className="cm-brand-email">
                  <Mail size={13} />
                  info@astruxio.in
                </a>
              </div>
            </div>

            <div className="cm-right" data-lenis-prevent>
              <button className="cm-close" onClick={closeAndReset} aria-label="Close">
                <X size={18} />
              </button>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    className="cm-success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="cm-success-icon">
                      <CircleCheckBig size={44} strokeWidth={1.5} />
                    </div>
                    <h3>Message Sent!</h3>
                    <p>
                      Thank you, <strong>{form.name}</strong>. We'll reply to{' '}
                      <strong>{form.email}</strong> within 24 hours.
                    </p>
                    <button className="cm-btn-submit" onClick={closeAndReset}>
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="cm-header">
                      <span className="cm-eyebrow">Start a Project</span>
                      <h2 className="cm-title">Contact Us</h2>
                    </div>

                    <form className="cm-form" onSubmit={handleSubmit} noValidate>
                      <div className="cm-row">
                        <div className="cm-field">
                          <label className="cm-label" htmlFor="cm-name">
                            <User size={12} /> Full Name <span>*</span>
                          </label>
                          <input
                            id="cm-name"
                            name="name"
                            type="text"
                            className="cm-input"
                            placeholder="John Smith"
                            value={form.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="cm-field">
                          <label className="cm-label" htmlFor="cm-email">
                            <Mail size={12} /> Email Address <span>*</span>
                          </label>
                          <input
                            id="cm-email"
                            name="email"
                            type="email"
                            className="cm-input"
                            placeholder="john@company.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="cm-row">
                        <div className="cm-field">
                          <label className="cm-label" htmlFor="cm-phone">
                            <Phone size={12} /> Mobile Number <span>*</span>
                          </label>
                          <input
                            id="cm-phone"
                            name="phone"
                            type="tel"
                            className="cm-input"
                            placeholder="+91 XXXXX-XXXXX"
                            value={form.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="cm-field">
                          <label className="cm-label" htmlFor="cm-company">
                            <Building2 size={12} /> Company{' '}
                            <span className="cm-optional">(optional)</span>
                          </label>
                          <input
                            id="cm-company"
                            name="company"
                            type="text"
                            className="cm-input"
                            placeholder="Acme Corp"
                            value={form.company}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="cm-field">
                        <label className="cm-label" htmlFor="cm-message">
                          <MessageSquare size={12} /> Project Brief <span>*</span>
                        </label>
                        <textarea
                          id="cm-message"
                          name="message"
                          className="cm-input cm-textarea"
                          placeholder="Tell us what you're building..."
                          rows={4}
                          value={form.message}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {status === 'error' && (
                        <p className="cm-error">
                          Something went wrong. Email us at info@astruxio.in
                        </p>
                      )}

                      <button
                        type="submit"
                        className={`cm-btn-submit${status === 'sending' ? ' cm-btn-submit--sending' : ''}`}
                        disabled={status === 'sending'}
                      >
                        {status === 'sending' ? (
                          <span className="cm-spinner" />
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send size={14} strokeWidth={2} />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
