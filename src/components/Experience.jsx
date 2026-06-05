import { useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion'
import { FiBriefcase, FiCheckCircle, FiChevronRight } from 'react-icons/fi'
import { GiKatana } from 'react-icons/gi'
import SectionHeading from './SectionHeading'
import { experiences } from '../data/experience'

export default function Experience() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n = experiences.length
    const idx = Math.min(n - 1, Math.floor(v * n * 0.999))
    if (idx !== active && idx >= 0) setActive(idx)
  })

  const exp = experiences[active]

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative"
      style={{ height: `${experiences.length * 80}vh` }}
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-16">
        <div className="absolute left-0 top-1/2 -z-10 h-80 w-80 -translate-y-1/2 rounded-full bg-crimson/10 blur-[130px]" />
        <div className="absolute right-1/4 bottom-10 -z-10 h-64 w-64 rounded-full bg-neon/5 blur-[120px]" />

        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="mb-6 text-center">
            <span data-connect className="chip mb-2 border-crimson/40 text-crimson">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-crimson animate-pulse-glow" />
              Battle Chronicle
            </span>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
              <span className="gradient-text">Perjalanan Karier</span>
            </h2>
            <p className="mx-auto mt-1.5 max-w-xl text-[11px] text-gray-500">
              Scroll untuk menelusuri jejak pertempuran dari misi ke misi
            </p>
          </div>

          <div className="grid items-stretch gap-6 lg:grid-cols-[150px_1fr]">
            {/* Timeline rail di kiri */}
            <TimelineRail
              active={active}
              setActive={setActive}
              smoothProgress={smoothProgress}
            />

            {/* Card pengalaman aktif */}
            <ExperienceCard exp={exp} />
          </div>
        </div>
      </div>
    </section>
  )
}

// === Timeline rail vertikal interaktif ===
function TimelineRail({ active, setActive, smoothProgress }) {
  return (
    <div className="relative flex flex-col justify-between self-stretch py-2 pl-4">
      {/* Track background — sejajar dengan tengah node (kiri) */}
      <div className="absolute bottom-2 top-2 left-8 w-px bg-steel/30" />
      {/* Track progress crimson */}
      <motion.div
        className="absolute top-2 left-8 w-0.5 origin-top bg-gradient-to-b from-crimson to-neon shadow-glow-crimson"
        style={{ scaleY: smoothProgress, bottom: '0.5rem' }}
      />

      {/* Nodes */}
      {experiences.map((exp, i) => {
        const isActive = i === active
        const isPast = i < active
        return (
          <button
            key={exp.company}
            onClick={() => setActive(i)}
            className="group relative z-10 flex items-center gap-3 py-2"
          >
            <span
              className={`relative flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300 ${
                isActive
                  ? 'border-crimson bg-crimson/20 text-crimson shadow-glow-crimson scale-110'
                  : isPast
                    ? 'border-crimson/40 bg-base-800 text-crimson'
                    : 'border-steel/50 bg-base-800 text-gray-500 group-hover:border-crimson/40'
              }`}
              style={{ clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)' }}
            >
              <FiBriefcase size={14} />
              {isActive && (
                <motion.span
                  layoutId="exp-node-glow"
                  className="absolute inset-0 -z-10 bg-crimson/30 blur-md"
                />
              )}
            </span>

            {/* Mini label di samping node */}
            <span
              className={`hidden whitespace-nowrap text-left font-mono text-[10px] uppercase tracking-widest transition-colors lg:block ${
                isActive ? 'text-crimson' : 'text-gray-600'
              }`}
            >
              {exp.period.split('—')[0].trim()}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// === Card pengalaman aktif — dengan crossfade ===
function ExperienceCard({ exp }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={exp.company}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="metal-card clip-corner relative min-h-[280px] p-6 shadow-mission"
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson to-transparent" />

        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-4 border-b border-steel/40 pb-4">
          <div>
            <span className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-crimson">
              <GiKatana className="-rotate-45" /> Mission Log
            </span>
            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">
              {exp.role}
            </h3>
            <p className="mt-1 text-sm font-medium text-neon">
              {exp.company}
            </p>
          </div>
          <span className="chip border-crimson/30 text-crimson">
            {exp.period}
          </span>
        </div>

        {/* Deskripsi */}
        <p className="mb-5 text-sm leading-relaxed text-gray-400">
          {exp.description}
        </p>

        {/* Highlights */}
        <div>
          <p className="mb-2.5 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-crimson">
            <FiChevronRight /> Completed Objectives
          </p>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {exp.highlights.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="flex items-start gap-2 text-sm text-gray-300"
              >
                <FiCheckCircle
                  className="mt-0.5 shrink-0 text-neon"
                  size={14}
                />
                <span>{h}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Scan line deco */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px animate-scan-line bg-gradient-to-r from-transparent via-crimson/30 to-transparent" />
      </motion.div>
    </AnimatePresence>
  )
}
