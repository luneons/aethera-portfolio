import { useRef, useState, useLayoutEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import {
  FiLayout,
  FiServer,
  FiDatabase,
  FiTool,
  FiUsers,
} from 'react-icons/fi'
import { GiKatana } from 'react-icons/gi'
import TechIcon from './TechIcon'
import { profile } from '../data/profile'
import { skillCategories } from '../data/skills'

const icons = {
  layout: FiLayout,
  server: FiServer,
  database: FiDatabase,
  tools: FiTool,
  users: FiUsers,
}

// Rata-rata level kategori → dipakai sebagai "power rating".
const avg = (arr) =>
  Math.round(arr.reduce((s, x) => s + x.level, 0) / arr.length)

export default function Skills() {
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)
  const heroAnchorRef = useRef(null)
  const nodeRefs = useRef([])
  const [active, setActive] = useState(0)
  const [lines, setLines] = useState([])
  const [box, setBox] = useState({ w: 0, h: 0 })

  const registerNode = useCallback((i, el) => {
    nodeRefs.current[i] = el
  }, [])

  // Hitung koordinat garis dari anchor foto hero ke tiap node.
  const measure = useCallback(() => {
    const wrap = wrapperRef.current
    const anchor = heroAnchorRef.current
    if (!wrap || !anchor) return
    const wr = wrap.getBoundingClientRect()
    const ar = anchor.getBoundingClientRect()
    const start = {
      x: ar.left - wr.left + ar.width / 2,
      y: ar.top - wr.top + ar.height / 2,
    }
    const next = skillCategories.map((_, i) => {
      const el = nodeRefs.current[i]
      if (!el) return null
      const r = el.getBoundingClientRect()
      const end = {
        x: r.left - wr.left,
        y: r.top - wr.top + r.height / 2,
      }
      // Cubic bezier melengkung ke luar.
      const midX = (start.x + end.x) / 2
      const d = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`
      return { d, end }
    })
    setLines(next.filter(Boolean))
    setBox({ w: wr.width, h: wr.height })
  }, [])

  // Ukur ulang saat resize / layout berubah.
  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(() => measure())
    if (wrapperRef.current) ro.observe(wrapperRef.current)
    window.addEventListener('resize', measure)
    const t = setTimeout(measure, 300) // setelah font/gambar load
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      clearTimeout(t)
    }
  }, [measure])

  // Scroll-driven: section tinggi, isi sticky. Progress → index kategori aktif.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n = skillCategories.length
    const idx = Math.min(n - 1, Math.floor(v * n * 0.999))
    if (idx !== active && idx >= 0) setActive(idx)
  })

  const cat = skillCategories[active]
  const ActiveIcon = icons[cat.icon] || FiLayout
  const power = avg(cat.skills)

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative"
      style={{ height: `${skillCategories.length * 70}vh` }}
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-16">
        <div className="absolute left-0 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-crimson/10 blur-[130px]" />
        <div className="absolute right-0 top-1/4 -z-10 h-80 w-80 rounded-full bg-neon/5 blur-[130px]" />
        <span className="pointer-events-none absolute left-1/2 top-8 -z-10 -translate-x-1/2 select-none font-display text-[12rem] font-bold leading-none text-crimson/[0.03]">
          技
        </span>

        <div className="mx-auto w-full max-w-4xl px-6">
          <div className="mb-4 text-center">
            <span data-connect className="chip mb-2 border-crimson/40 text-crimson">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-crimson animate-pulse-glow" />
              Hero Select
            </span>
            <h2 className="font-display text-xl font-bold uppercase tracking-tight sm:text-2xl">
              <span className="gradient-text">Skill Loadout</span>
            </h2>
            <p className="mx-auto mt-1 max-w-xl text-[11px] text-gray-500">
              Scroll untuk menelusuri tiap cabang keahlian sang hero ⚔
            </p>
          </div>

          {/* Wrapper relatif untuk overlay SVG */}
          <div
            ref={wrapperRef}
            className="relative grid items-stretch gap-4 lg:grid-cols-[0.8fr_1.2fr]"
          >
            <ConnectorOverlay lines={lines} box={box} active={active} />
            <HeroPanel power={power} heroAnchorRef={heroAnchorRef} cat={cat} />
            <SkillTree
              active={active}
              setActive={setActive}
              cat={cat}
              ActiveIcon={ActiveIcon}
              power={power}
              registerNode={registerNode}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// === Overlay SVG: garis memancar dari foto hero ke tiap node ===
function ConnectorOverlay({ lines, box, active }) {
  if (!box.w) return null
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
      width={box.w}
      height={box.h}
      viewBox={`0 0 ${box.w} ${box.h}`}
      fill="none"
    >
      <defs>
        <linearGradient id="link-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#dc143c" />
          <stop offset="1" stopColor="#00d4ff" />
        </linearGradient>
      </defs>
      {lines.map((ln, i) => {
        const isActive = i === active
        return (
          <g key={i}>
            {/* Garis dasar (semua node) — draw-in sekali */}
            <motion.path
              d={ln.d}
              stroke={isActive ? 'url(#link-grad)' : 'rgba(107,114,128,0.35)'}
              strokeWidth={isActive ? 2.5 : 1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: isActive ? 1 : 0.5 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: 'easeInOut' }}
            />
            {/* Aliran energi pada garis aktif */}
            {isActive && (
              <path
                d={ln.d}
                stroke="#fff"
                strokeWidth={2.5}
                strokeDasharray="6 22"
                className="skill-link-flow"
                style={{ filter: 'drop-shadow(0 0 6px rgba(220,20,60,1))' }}
              />
            )}
            {/* Titik di ujung node */}
            <motion.circle
              cx={ln.end.x}
              cy={ln.end.y}
              r={isActive ? 4 : 2.5}
              fill={isActive ? '#dc143c' : 'rgba(107,114,128,0.6)'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.12 }}
              style={isActive ? { filter: 'drop-shadow(0 0 5px #dc143c)' } : undefined}
            />
          </g>
        )
      })}
    </svg>
  )
}

// === Panel hero terpilih (kiri) — gambar berganti sesuai kategori aktif ===
function HeroPanel({ power, heroAnchorRef, cat }) {
  const img = cat.image || '/profile.webp'
  return (
    <div className="metal-card clip-corner relative z-10 flex flex-col overflow-hidden">
      <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-crimson to-transparent" />

      <div className="relative h-full min-h-[13rem] w-full overflow-hidden">
        {/* Gambar kategori aktif dengan crossfade */}
        <AnimatePresence mode="popLayout">
          <motion.img
            key={img}
            src={img}
            alt={cat.title}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-base-900/30 to-transparent" />
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan-line bg-gradient-to-r from-transparent via-crimson to-transparent" />
        <span className="pointer-events-none absolute right-3 top-3 font-display text-6xl font-bold leading-none text-crimson/20">
          侍
        </span>

        <div className="absolute left-3 top-3 flex flex-col items-center border border-crimson/50 bg-black/60 px-2.5 py-1 backdrop-blur">
          <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400">LV</span>
          <span className="font-display text-xl font-bold text-crimson">99</span>
        </div>

        {/* Anchor titik pancar garis — tengah-kanan foto */}
        <span
          ref={heroAnchorRef}
          className="absolute right-0 top-1/2 z-20 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-crimson shadow-glow-crimson" />
          <span className="absolute h-4 w-4 animate-ping rounded-full bg-crimson/40" />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-crimson">
            {cat.title} Loadout
          </p>
          <h3 className="font-display text-xl font-bold uppercase leading-tight text-white">
            {profile.shortName}
          </h3>
          <p className="flex items-center gap-1.5 text-sm text-neon">
            <GiKatana className="-rotate-45" /> Cyber Samurai · Fullstack
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
              Power
            </span>
            <div className="h-1.5 flex-1 overflow-hidden bg-white/10">
              <motion.div
                key={power}
                className="h-full bg-gradient-to-r from-crimson to-neon"
                initial={{ width: 0 }}
                animate={{ width: `${power}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
            <span className="font-mono text-xs font-bold text-neon">{power}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// === Skill tree (kanan): node kategori + detail skill aktif ===
function SkillTree({ active, setActive, cat, ActiveIcon, power, registerNode }) {
  const [page, setPage] = useState(0)
  const PER_PAGE = 5
  const totalPages = Math.ceil(cat.skills.length / PER_PAGE)
  const paged = cat.skills.slice(page * PER_PAGE, (page + 1) * PER_PAGE)

  // Reset page ketika kategori berubah.
  const prevCat = useRef(cat.title)
  if (prevCat.current !== cat.title) {
    prevCat.current = cat.title
    if (page !== 0) setPage(0)
  }

  return (
    <div className="metal-card clip-corner relative z-10 flex flex-col p-3 sm:p-4">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson to-transparent" />

      <div className="relative">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Skill Branches
        </p>
        <div className="flex flex-col gap-1">
          {skillCategories.map((c, i) => {
            const Icon = icons[c.icon] || FiLayout
            const isActive = i === active
            return (
              <button
                key={c.title}
                ref={(el) => registerNode(i, el)}
                onClick={() => setActive(i)}
                className={`group relative flex items-center gap-2.5 border px-2 py-1.5 text-left transition-all duration-300 ${
                  isActive
                    ? 'border-crimson/60 bg-crimson/10 shadow-glow-crimson'
                    : 'border-steel/40 bg-black/30 hover:border-crimson/40'
                }`}
                style={{ clipPath: 'polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px))' }}
              >
                <span
                  className={`relative flex h-7 w-7 shrink-0 items-center justify-center border transition-colors ${
                    isActive
                      ? 'border-crimson bg-crimson/20 text-crimson'
                      : 'border-steel/50 bg-black/40 text-gray-400 group-hover:text-crimson'
                  }`}
                >
                  <Icon size={14} />
                  {isActive && (
                    <motion.span
                      layoutId="skill-node-glow"
                      className="absolute inset-0 -z-10 bg-crimson/30 blur-md"
                    />
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span className={`block truncate font-display text-xs font-bold uppercase tracking-wide ${isActive ? 'text-white' : 'text-gray-300'}`}>
                    {c.title}
                  </span>
                  <span className="block truncate font-mono text-[9px] text-gray-500">
                    {c.description}
                  </span>
                </span>

                <span className={`font-mono text-[10px] ${isActive ? 'text-crimson' : 'text-gray-600'}`}>
                  {isActive ? '◆' : `0${i + 1}`}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-3 border-t border-steel/40 pt-3">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-white">
            <ActiveIcon className="text-crimson" />
            <span className="truncate">{cat.title}</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="chip border-neon/40 text-neon">AVG {power}</span>
            {totalPages > 1 && (
              <span className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="border border-steel/50 bg-black/40 p-1 text-gray-400 transition-colors hover:border-crimson/50 hover:text-crimson disabled:opacity-30"
                >
                  <FiLayout size={0} className="hidden" />
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
                </button>
                <span className="font-mono text-[10px] text-gray-500">{page + 1}/{totalPages}</span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="border border-steel/50 bg-black/40 p-1 text-gray-400 transition-colors hover:border-crimson/50 hover:text-crimson disabled:opacity-30"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg>
                </button>
              </span>
            )}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={`${cat.title}-${page}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[164px] space-y-1.5"
          >
            {paged.map((s, i) => (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="mb-0.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs text-gray-200">
                    <TechIcon name={s.name} size={13} className="text-neon" />
                    {s.name}
                  </span>
                  <span className="font-mono text-[11px] text-gray-500">{s.level}</span>
                </div>
                <div className="relative h-1.5 w-full overflow-hidden bg-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-crimson via-red-500 to-neon"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.level}%` }}
                    transition={{ duration: 0.7, delay: i * 0.06, ease: 'easeOut' }}
                  />
                  <span className="pointer-events-none absolute inset-0 flex justify-between px-[10%]">
                    {[...Array(4)].map((_, k) => (
                      <span key={k} className="h-full w-px bg-black/40" />
                    ))}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  )
}
