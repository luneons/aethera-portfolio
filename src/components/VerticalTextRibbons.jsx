import { motion } from 'framer-motion'

// Pita teks Jepang vertikal yang bergerak naik/turun pelan di sisi layar.
const PHRASES = [
  'サイバー・サムライ・デベロッパー',
  'コードは我が刀 ・ システムは戦場',
  'フルスタック・エンジニア・アエテラ',
  'デジタル世界を切り開く者',
]

function Ribbon({ text, side, duration, direction }) {
  return (
    <div
      className={`pointer-events-none absolute top-0 hidden h-full overflow-hidden lg:block ${
        side === 'left' ? 'left-3' : 'right-3'
      }`}
      style={{ writingMode: 'vertical-rl' }}
    >
      <motion.div
        className="font-mono text-xs uppercase tracking-[0.5em] text-crimson/15"
        initial={{ y: direction === 'up' ? '0%' : '-50%' }}
        animate={{ y: direction === 'up' ? '-50%' : '0%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {/* Digandakan agar loop mulus */}
        <span>{text}　{text}　</span>
        <span>{text}　{text}　</span>
      </motion.div>
    </div>
  )
}

export default function VerticalTextRibbons() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <Ribbon text={PHRASES[0]} side="left" duration={40} direction="up" />
      <Ribbon text={PHRASES[1]} side="right" duration={55} direction="down" />
    </div>
  )
}
