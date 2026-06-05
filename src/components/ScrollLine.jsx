import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const LINE_X = 52 // posisi X garis vertikal (px) — sejajar pusat lingkaran %

export default function ScrollLine() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.0001,
  })
  // Panjang garis dibatasi agar berhenti di lingkaran % (kiri bawah), tidak menembus.
  // calc: tinggi viewport dikurangi area lingkaran % (~76px dari bawah).
  const lineHeight = useTransform(
    smoothProgress,
    (v) => `calc((100% - 76px) * ${v})`,
  )

  // Konektor live: posisi Y (px dari atas viewport) tiap heading yang terlihat.
  const [connectors, setConnectors] = useState([])
  const rafRef = useRef(0)

  useEffect(() => {
    const update = () => {
      const els = document.querySelectorAll('[data-connect]')
      const vh = window.innerHeight
      const list = []
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect()
        const cy = r.top + r.height / 2
        // Threshold per-heading (fraksi tinggi viewport). Default 0.55.
        const th = parseFloat(el.getAttribute('data-connect')) || 0.55
        // Tampil saat heading naik melewati garis threshold-nya.
        if (cy > 60 && cy < vh * th) {
          const w = Math.max(0, r.left - LINE_X)
          list.push({ id: i, y: cy, w })
        }
      })
      setConnectors(list)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const t = setTimeout(update, 600)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      clearTimeout(t)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-10 hidden h-screen w-full lg:block"
      aria-hidden="true"
    >
      {/* Track abu */}
      <div
        className="absolute top-0 w-px -translate-x-1/2 bg-steel/20"
        style={{ left: LINE_X, height: 'calc(100% - 76px)' }}
      />

      {/* Garis merah vertikal — fokus turun mengikuti scroll */}
      <motion.div
        className="absolute top-0 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-crimson to-crimson/80"
        style={{ left: LINE_X, height: lineHeight }}
      >
        <span className="absolute -bottom-1 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-crimson/80 blur-md" />
        <span className="absolute -bottom-0.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-glow-crimson" />
      </motion.div>

      {/* Konektor horizontal: dari garis vertikal ke tiap heading yang terlihat */}
      {connectors.map((c) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute flex origin-left items-center"
          style={{ left: LINE_X, top: c.y, width: c.w }}
        >
          {/* Node di garis vertikal */}
          <span className="absolute -left-1 h-2.5 w-2.5 rounded-full bg-crimson shadow-glow-crimson" />
          {/* Garis horizontal menuju heading */}
          <span className="h-px w-full bg-gradient-to-r from-crimson via-crimson/70 to-crimson/30" />
          {/* Aura di ujung (dekat heading) */}
          <span className="absolute right-0 h-2 w-2 -translate-y-px rounded-full bg-crimson/80 blur-[2px]" />
        </motion.div>
      ))}
    </div>
  )
}
