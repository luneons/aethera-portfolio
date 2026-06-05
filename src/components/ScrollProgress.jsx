import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'

// Indikator scroll progress ala HUD: bar di atas + persentase melingkar.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  // Smoothing biar bar-nya tidak patah-patah.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  })
  const [percent, setPercent] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setPercent(Math.round(v * 100))
  })

  // Lingkaran progress (SVG stroke-dashoffset).
  const R = 18
  const C = 2 * Math.PI * R
  const offset = C - (percent / 100) * C

  return (
    <>
      {/* Indikator persentase melingkar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: percent > 2 ? 1 : 0, scale: percent > 2 ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 left-6 z-[90] flex h-14 w-14 items-center justify-center"
        aria-hidden="true"
      >
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={R}
            fill="none"
            stroke="rgba(58,63,71,0.5)"
            strokeWidth="2.5"
          />
          <circle
            cx="22"
            cy="22"
            r={R}
            fill="none"
            stroke="#dc143c"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.1s linear', filter: 'drop-shadow(0 0 4px rgba(220,20,60,0.8))' }}
          />
        </svg>
        <span className="font-mono text-xs font-bold text-white">
          {percent}
          <span className="text-crimson">%</span>
        </span>
      </motion.div>
    </>
  )
}
