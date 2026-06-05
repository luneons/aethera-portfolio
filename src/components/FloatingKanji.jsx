import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Kumpulan kanji bertema teknologi / samurai.
const KANJI = [
  '侍', '武', '士', '道', '刀', '影', '龍', '雷',
  '技', '術', '創', '造', '未', '来', '電', '網',
  '忍', '戦', '魂', '鋼', '光', '闇', '速', '匠',
]

// Kanji yang melayang & berputar pelan di background. Posisi & timing acak tapi stabil.
export default function FloatingKanji({ count = 14 }) {
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const seed = (i * 9301 + 49297) % 233280
      const rnd = (n) => ((seed * (n + 1)) % 100) / 100
      return {
        char: KANJI[i % KANJI.length],
        left: rnd(1) * 100,
        top: rnd(2) * 100,
        size: 1.5 + rnd(3) * 3.5, // rem
        duration: 14 + rnd(4) * 16,
        delay: rnd(5) * -20,
        drift: 30 + rnd(6) * 60,
        rotate: rnd(7) > 0.5 ? 18 : -18,
        accent: rnd(8) > 0.7,
      }
    })
  }, [count])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {items.map((it, i) => (
        <motion.span
          key={i}
          className={`absolute select-none font-display font-bold ${
            it.accent ? 'text-neon/[0.07]' : 'text-crimson/[0.07]'
          }`}
          style={{
            left: `${it.left}%`,
            top: `${it.top}%`,
            fontSize: `${it.size}rem`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -it.drift, 0],
            x: [0, it.drift * 0.4, 0],
            rotate: [0, it.rotate, 0],
            opacity: [0, 1, 0.6, 1, 0],
          }}
          transition={{
            duration: it.duration,
            delay: it.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {it.char}
        </motion.span>
      ))}
    </div>
  )
}
