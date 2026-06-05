import { useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Certificates from './components/Certificates'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import DigitalRain from './components/DigitalRain'
import BackToTop from './components/BackToTop'
import EntranceGate from './components/EntranceGate'
import MusicPlayer from './components/MusicPlayer'

export default function App() {
  const [entered, setEntered] = useState(false)
  const musicRef = useRef(null)

  const handleGateOpen = () => {
    setEntered(true)
    // Play musik setelah gate terbuka (user sudah berinteraksi jadi browser mengizinkan).
    setTimeout(() => musicRef.current?.play(), 400)
  }

  return (
    <>
      <EntranceGate onOpen={handleGateOpen} />

      <div className={`relative min-h-screen overflow-x-clip transition-opacity duration-700 ${entered ? 'opacity-100' : 'opacity-0'}`}>
        {/* Digital rain global di paling belakang */}
        <div className="pointer-events-none fixed inset-0 -z-30 opacity-60">
          <DigitalRain opacity={0.1} />
        </div>
        <CursorGlow />
        {entered && <CustomCursor />}
        <ScrollProgress />
        <MusicPlayer ref={musicRef} />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Certificates />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  )
}
