import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Magnetic from './Magnetic'
import { navLinks } from '../data/site'
import { getLenis, scrollToTarget } from '../lib/smoothScroll'

/**
 * Fixed navigation + full-screen mobile menu, recovered from the bundle (`Rf`).
 */
export default function Nav({ onContact, currentView = 'home', onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const lenis = getLenis()
    if (mobileOpen) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const handleLogo = (event) => {
    event.preventDefault()
    onNavigate?.('home')
    setMobileOpen(false)
  }

  const handleLink = (event, id) => {
    event.preventDefault()
    setMobileOpen(false)

    if (id === 'work' && onNavigate) {
      onNavigate('ziya')
      return
    }

    if (currentView !== 'home' && onNavigate) {
      onNavigate('home')
      window.setTimeout(() => scrollToTarget(`#${id}`), 160)
      return
    }

    scrollToTarget(`#${id}`)
  }

  return (
    <>
      <nav
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <motion.a
          href="#home"
          onClick={handleLogo}
          className="nav-logo"
          aria-label="Astruxio home"
          whileHover={{ color: 'var(--amber)' }}
          transition={{ duration: 0.2 }}
        >
          ASTRUXIO
        </motion.a>

        <ul className="nav-links" role="list">
          {navLinks.map((link) => (
            <li key={link.id}>
              <motion.a
                href={`#${link.id}`}
                onClick={(event) => handleLink(event, link.id)}
                whileHover={{ color: 'var(--ink)' }}
                transition={{ duration: 0.15 }}
              >
                {link.label}
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Magnetic padding={30} magnetStrength={3} wrapperClassName="desktop-cta-wrap">
            <button
              className="nav-cta desktop-cta"
              onClick={onContact}
              aria-label="Get a project quote"
            >
              Get a Quote
            </button>
          </Magnetic>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line
                x1="2"
                y1="7"
                x2="20"
                y2="7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="2"
                y1="15"
                x2="14"
                y2="15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            className="nav-fullscreen open"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              className="nav-fullscreen-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={22} />
            </button>

            {navLinks.map((link, index) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) => handleLink(event, link.id)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.button
              className="nav-fullscreen-cta"
              onClick={() => {
                onContact?.()
                setMobileOpen(false)
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Start a Project →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
