import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import {
  FiX,
  FiCheckCircle,
  FiTarget,
  FiZap,
  FiChevronRight,
} from 'react-icons/fi'
import { GiKatana } from 'react-icons/gi'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TechIcon from './TechIcon'
import FloatingKanji from './FloatingKanji'
import { projects, projectCategories } from '../data/projects'

const rankColor = {
  S: 'text-crimson border-crimson/60',
  A: 'text-neon border-neon/50',
  B: 'text-metallic border-steel/60',
}

const statusColor = {
  DEPLOYED: 'text-emerald-400',
  ARCHIVED: 'text-metallic',
}

export default function Projects() {
  const [filter, setFilter] = useState('Semua')
  const [active, setActive] = useState(null)
  const sectionRef = useRef(null)

  const filtered = useMemo(
    () =>
      filter === 'Semua'
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  )

  // Scroll hijack: section tinggi, isi sticky, translateX terikat scroll vertikal.
  const CARD_W = 340 // lebar card + gap
  const totalScroll = filtered.length * CARD_W
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalScroll + (typeof window !== 'undefined' ? window.innerWidth * 0.6 : 600)])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ height: `${Math.max(150, filtered.length * 40)}vh` }}
    >
      <div className="sticky top-0 overflow-hidden py-16">
        <div className="absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-crimson/10 blur-[130px]" />
        <FloatingKanji count={8} />
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            label="Mission Log"
            title="Mission Archive"
            subtitle="Setiap project adalah misi yang diselesaikan. Scroll untuk menjelajahi file misi."
            connectThreshold="0.72"
          />

          {/* Filter */}
          <Reveal className="mb-8 flex flex-wrap justify-center gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`clip-corner px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  filter === cat
                    ? 'bg-gradient-to-r from-crimson to-blood text-white shadow-glow'
                    : 'metal-card text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </Reveal>
        </div>

        {/* Horizontal card track — bergerak ke kiri sesuai scroll */}
        <motion.div
          style={{ x }}
          className="flex gap-5 pl-6 sm:pl-[calc((100vw-72rem)/2+1.5rem)]"
        >
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="w-[300px] flex-shrink-0 sm:w-[320px]"
            >
              <MissionCard project={p} onOpen={() => setActive(p)} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <MissionModal active={active} onClose={() => setActive(null)} />
    </section>
  )
}

function MissionCard({ project: p, onOpen }) {
  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      glareEnable
      glareMaxOpacity={0.18}
      glareColor="#dc143c"
      glarePosition="all"
      className="h-full"
    >
      <button
        onClick={onOpen}
        className="metal-card clip-corner group relative flex h-full w-full flex-col overflow-hidden p-5 text-left transition-all duration-300 hover:shadow-mission"
      >
        {/* Scan line on hover */}
        <span className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="absolute inset-x-0 top-0 h-px animate-scan-line bg-gradient-to-r from-transparent via-crimson to-transparent" />
        </span>
        {/* Katana slash sweep */}
        <span className="pointer-events-none absolute -inset-1 z-0 overflow-hidden">
          <span className="absolute left-0 top-1/2 h-px w-[140%] -translate-x-full bg-gradient-to-r from-transparent via-crimson to-transparent opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-80" />
        </span>

        {/* Header bar — codename + rank */}
        <div className="relative z-10 mb-4 flex items-center justify-between border-b border-steel/40 pb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-crimson">
            {p.codename}
          </span>
          <span
            className={`flex h-6 w-6 items-center justify-center border font-mono text-xs font-bold ${
              rankColor[p.rank] || rankColor.B
            }`}
            title={`Rank ${p.rank}`}
          >
            {p.rank}
          </span>
        </div>

        <div className="relative z-10 mb-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-crimson transition-transform group-hover:scale-110">
            <GiKatana size={22} className="-rotate-45" />
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                p.status === 'DEPLOYED' ? 'bg-emerald-400' : 'bg-metallic'
              } animate-pulse-glow`}
            />
            <span className={statusColor[p.status] || 'text-metallic'}>
              {p.status}
            </span>
          </span>
        </div>

        <span className="relative z-10 mb-2 self-start chip border-crimson/30 text-gray-400">
          {p.category}
        </span>
        <h3 className="relative z-10 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors group-hover:text-crimson">
          {p.title}
        </h3>
        <p className="relative z-10 mt-2 line-clamp-3 text-sm text-gray-400">
          {p.description}
        </p>

        <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 border border-steel/40 bg-black/40 px-2 py-0.5 text-xs text-gray-400"
            >
              <TechIcon name={t} size={12} className="text-neon" />
              {t}
            </span>
          ))}
        </div>

        <div className="relative z-10 mt-4 flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-crimson opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Buka Misi <FiChevronRight className="transition-transform group-hover:translate-x-1" />
        </div>
      </button>
    </Tilt>
  )
}

function MissionModal({ active, onClose }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="metal-card clip-corner relative w-full max-w-lg p-8 shadow-mission"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson to-transparent" />
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="absolute right-4 top-4 p-1.5 text-gray-400 hover:text-crimson"
            >
              <FiX size={20} />
            </button>

            <div className="mb-4 flex items-center justify-between border-b border-steel/40 pb-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-crimson">
                {active.codename}
              </span>
              <span
                className={`flex h-7 w-7 items-center justify-center border font-mono text-sm font-bold ${
                  rankColor[active.rank] || rankColor.B
                }`}
              >
                {active.rank}
              </span>
            </div>

            <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-gray-500">
              <FiTarget className="text-crimson" />
              {active.type}
            </div>

            <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
              {active.title}
            </h3>
            <p className="mt-2 text-sm text-gray-400">{active.description}</p>

            <h4 className="mt-6 mb-2 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-crimson">
              <FiZap /> Mission Objectives
            </h4>
            <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {active.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-gray-300"
                >
                  <FiCheckCircle className="mt-0.5 shrink-0 text-neon" size={14} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <h4 className="mt-6 mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-crimson">
              Arsenal
            </h4>
            <div className="flex flex-wrap gap-2">
              {active.stack.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 border border-crimson/30 bg-black/40 px-3 py-1 text-xs uppercase tracking-wider text-neon"
                >
                  <TechIcon name={t} size={14} />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
