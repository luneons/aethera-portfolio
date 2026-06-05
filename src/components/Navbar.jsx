import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { profile } from '../data/profile'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'certificate', label: 'Certificate' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 transition-all duration-300 ${
          scrolled
            ? 'glass-strong py-2.5 shadow-glow'
            : 'border border-transparent py-3'
        } mx-4 sm:mx-auto`}
      >
        <button
          onClick={() => go('home')}
          className="font-display text-lg font-bold tracking-tight text-white"
        >
          {profile.brand}
          <span className="gradient-text">.</span>
        </button>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => go(id)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-electric/40"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="glass rounded-xl p-2 text-white md:hidden"
        >
          {open ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong mx-4 mt-2 overflow-hidden rounded-2xl md:hidden"
          >
            <ul className="flex flex-col p-2">
              {links.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => go(id)}
                    className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                      active === id
                        ? 'bg-white/10 text-white'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
