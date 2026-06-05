import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GiKatana } from 'react-icons/gi'

// Gerbang masuk Cyber Samurai. Dua panel pintu (kiri/kanan) yang tertutup,
// pengunjung klik "Enter" → pintu terbuka → callback onOpen dipanggil → musik play.
export default function EntranceGate({ onOpen }) {
  const [phase, setPhase] = useState('closed') // closed → opening → done
  const [visible, setVisible] = useState(true)

  const enter = () => {
    setPhase('opening')
    setTimeout(() => {
      setVisible(false)
      onOpen?.()
    }, 1400) // durasi animasi pintu terbuka
  }

  if (!visible) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Panel kiri */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-base-900 border-r border-crimson/30"
            animate={phase === 'opening' ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Dekorasi panel kiri */}
            <div className="absolute inset-0 grid-glow opacity-30" />
            <span className="pointer-events-none absolute bottom-10 left-6 font-display text-[12rem] font-bold leading-none text-crimson/[0.06]">
              侍
            </span>
            {/* Garis tepi */}
            <span className="absolute right-0 top-[15%] h-[70%] w-px bg-gradient-to-b from-transparent via-crimson/50 to-transparent" />
          </motion.div>

          {/* Panel kanan */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-base-900 border-l border-crimson/30"
            animate={phase === 'opening' ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-0 grid-glow opacity-30" />
            <span className="pointer-events-none absolute bottom-10 right-6 font-display text-[12rem] font-bold leading-none text-neon/[0.05]">
              武
            </span>
            <span className="absolute left-0 top-[15%] h-[70%] w-px bg-gradient-to-b from-transparent via-crimson/50 to-transparent" />
          </motion.div>

          {/* Konten tengah (di atas kedua panel) */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
            animate={phase === 'opening' ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo/monogram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
                <GiKatana className="-rotate-45 text-crimson" size={36} />
                AETHERA
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-crimson">
                Cyber Samurai Developer
              </span>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              className="h-px w-48 origin-left bg-gradient-to-r from-crimson via-red-500 to-neon shadow-glow-crimson"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-xs text-gray-500"
            >
              システム準備完了
            </motion.p>

            {/* Tombol Enter */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              onClick={enter}
              className="btn-primary mt-2 px-10 py-3 text-sm"
            >
              <GiKatana className="-rotate-45" /> 入る ・ ENTER
            </motion.button>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
              className="font-mono text-[10px] uppercase tracking-widest text-gray-600"
            >
              ▸ Klik untuk memasuki arena
            </motion.span>
          </motion.div>

          {/* Corner decorations */}
          <span className="pointer-events-none absolute left-4 top-4 h-10 w-10 border-l-2 border-t-2 border-crimson/50" />
          <span className="pointer-events-none absolute right-4 top-4 h-10 w-10 border-r-2 border-t-2 border-crimson/50" />
          <span className="pointer-events-none absolute bottom-4 left-4 h-10 w-10 border-b-2 border-l-2 border-crimson/50" />
          <span className="pointer-events-none absolute bottom-4 right-4 h-10 w-10 border-b-2 border-r-2 border-crimson/50" />

          {/* Scan line across the gate */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan-line bg-gradient-to-r from-transparent via-crimson to-transparent opacity-60" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
