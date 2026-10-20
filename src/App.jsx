import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Engineering from './components/Engineering'
import ServicesFAQ from './components/ServicesFAQ'
import Process from './components/Process'
import TechStack from './components/TechStack'
import CTA from './components/CTA'
import ProjectZiya from './components/ProjectZiya'
import ProjectHotspot from './components/ProjectHotspot'
import ContactModal from './components/ContactModal'
import LegalModal from './components/LegalModal'
import { useScrollProgress } from './hooks/useScrollProgress'
import { scrollToTop, setLenis } from './lib/smoothScroll'

/**
 * Root component recovered from the bundle (`px`).
 *
 * View routing is intentionally state-based, matching the original:
 * home | ziya | hotspot. There are no URL routes.
 */
export default function App() {
  const progressRef = useScrollProgress()
  const [modal, setModal] = useState(null)
  const [view, setView] = useState('home')

  useEffect(() => {
    // `lerp` (frame-rate independent) settles the scroll in ~100ms instead of the
    // original 1.2s duration, which read as input lag on every wheel tick.
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoRaf: false,
      anchors: false,
    })

    setLenis(lenis)

    let frame = 0
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  const navigate = (nextView) => {
    setView(nextView)
    scrollToTop()
  }

  const openContact = () => setModal('contact')

  return (
    <>
      <Preloader />
      <CustomCursor />
      <Nav onContact={openContact} currentView={view} onNavigate={navigate} />

      {view === 'home' ? (
        <main className="page" id="main-content">
          <Hero progressRef={progressRef} />
          <About onNavigate={navigate} />
          <ServicesFAQ />
          <Process />
          <TechStack />
          <Engineering />
          <CTA onModal={setModal} onContact={openContact} />
        </main>
      ) : (
        <main className="page" style={{ padding: 0 }} id="main-content">
          {view === 'ziya' && <ProjectZiya onNavigate={navigate} />}
          {view === 'hotspot' && <ProjectHotspot onNavigate={navigate} />}
          <CTA onModal={setModal} onContact={openContact} />
        </main>
      )}

      <LegalModal
        type={modal === 'privacy' || modal === 'terms' ? modal : null}
        onClose={() => setModal(null)}
      />
      <ContactModal open={modal === 'contact'} onClose={() => setModal(null)} />
    </>
  )
}
