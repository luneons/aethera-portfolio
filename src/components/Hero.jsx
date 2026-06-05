import { motion } from 'framer-motion'
import { useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { FiDownload, FiMail } from 'react-icons/fi'
import { HiArrowDown } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import { GiKatana } from 'react-icons/gi'
import ParticlesBackground from './ParticlesBackground'
import FloatingKanji from './FloatingKanji'
import VerticalTextRibbons from './VerticalTextRibbons'
import PhotoChat from './PhotoChat'
import TypingText from './TypingText'
import { profile, stats } from '../data/profile'

export default function Hero() {
  const [chatOpen, setChatOpen] = useState(false)
  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <ParticlesBackground />
      <FloatingKanji count={14} />
      <VerticalTextRibbons />
      <div className="absolute inset-0 -z-20 grid-glow opacity-40" />
      <div className="absolute left-1/2 top-1/3 -z-20 h-72 w-72 -translate-x-1/2 rounded-full bg-crimson/20 blur-[120px]" />
      <div className="absolute bottom-10 right-10 -z-20 h-72 w-72 rounded-full bg-neon/10 blur-[120px]" />
      {/* Kanji watermark — 侍 (samurai) */}
      <span className="pointer-events-none absolute right-2 top-1/2 -z-10 -translate-y-1/2 select-none font-display text-[18rem] font-bold leading-none text-crimson/[0.04] animate-flicker sm:text-[26rem]">
        侍
      </span>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.3fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="chip mb-5 border-crimson/40 text-crimson"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-crimson animate-pulse-glow" />
            Fullstack Developer
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-sm text-neon"
          >
            {profile.heroGreeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-white text-glitch sm:text-5xl lg:text-6xl"
          >
            {profile.shortName}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-3 font-display text-xl font-semibold sm:text-2xl"
          >
            <TypingText words={profile.roles} className="gradient-text" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 max-w-xl text-balance text-gray-400"
          >
            {profile.heroLine}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button onClick={() => go('projects')} className="btn-primary">
              Lihat Portfolio
            </button>
            <a
              href={profile.cvFile}
              download
              className="btn-ghost"
            >
              <FiDownload /> Download CV
            </a>
            <button onClick={() => go('contact')} className="btn-ghost">
              <FiMail /> Hubungi Saya
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 grid max-w-md grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold text-white">
                  {s.value}
                </p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Profile frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto"
        >
          <Tilt
            glareEnable
            glareMaxOpacity={0.15}
            glareColor="#dc143c"
            glarePosition="all"
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            className="animate-float"
          >
            <div
              className="relative h-64 w-64 sm:h-72 sm:w-72"
              onMouseEnter={() => setChatOpen(true)}
            >
              <PhotoChat open={chatOpen} onClose={() => setChatOpen(false)} />

              {/* Frame foto (di-clip) */}
              <div className="metal-card clip-corner relative h-full w-full overflow-hidden p-1.5 shadow-glow-crimson">
                <div className="clip-corner flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-base-700 to-base-900">
                  <img
                    src="/profile.jpg"
                    alt="Andy Siswanto A.B"
                    className="clip-corner h-full w-full object-cover"
                  />
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan-line bg-gradient-to-r from-transparent via-crimson to-transparent" />
                </div>
              </div>

              {/* corner brackets (di luar clip) */}
              <span className="pointer-events-none absolute -left-1 -top-1 h-6 w-6 border-l-2 border-t-2 border-crimson" />
              <span className="pointer-events-none absolute -bottom-1 -right-1 h-6 w-6 border-b-2 border-r-2 border-crimson" />

              {/* Badge (di luar clip, jadi tidak kepotong) */}
              <span className="absolute -right-3 -top-3 z-10 chip border-crimson/50 bg-base-800 text-crimson shadow-glow-crimson">
                <GiKatana className="mr-1 -rotate-45" /> Fullstack Dev
              </span>
              <a
                href={`https://wa.me/${profile.contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="absolute -bottom-3 -left-3 z-10 flex items-center gap-1.5 chip border-emerald-400/40 bg-base-800 text-emerald-400 shadow-glow"
              >
                <FaWhatsapp /> Online
              </a>

              {/* Hint: arahkan kursor untuk ngobrol */}
              {!chatOpen && (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-crimson"
                >
                  ⚔ Arahkan kursor untuk ngobrol
                </motion.span>
              )}
            </div>
          </Tilt>
        </motion.div>
      </div>

      <button
        onClick={() => go('about')}
        aria-label="Scroll ke bawah"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 hover:text-neon"
      >
        <HiArrowDown className="animate-bounce" size={24} />
      </button>
    </section>
  )
}
