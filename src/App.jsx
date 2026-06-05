import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Certificates from './components/Certificates'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import DigitalRain from './components/DigitalRain'
import BackToTop from './components/BackToTop'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Digital rain global di paling belakang */}
      <div className="pointer-events-none fixed inset-0 -z-30 opacity-60">
        <DigitalRain opacity={0.1} />
      </div>
      <CursorGlow />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Certificates />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
