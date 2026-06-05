import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { FiAward, FiX, FiEye, FiShield } from 'react-icons/fi'
import { GiLaurelCrown, GiKatana } from 'react-icons/gi'
import { certificates } from '../data/experience'

export default function Certificates() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <section id="certificate" ref={sectionRef} className="relative overflow-hidden py-28">
      <div className="absolute left-1/2 top-1/3 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-crimson/10 blur-[140px]" />
      <span className="pointer-events-none absolute right-6 top-10 -z-10 select-none font-display text-[10rem] font-bold leading-none text-crimson/[0.03]">
        誉
      </span>

      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">
          <span className="chip mb-2 border-crimson/40 text-crimson">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-crimson animate-pulse-glow" />
            Hall of Honor
          </span>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
            <span className="gradient-text">Sertifikasi & Penghargaan</span>
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs text-gray-500">
            Lencana kehormatan yang memvalidasi keahlian dan kontribusi sang samurai
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {certificates.map((cert, i) => (
            <HonorCard
              key={cert.title}
              cert={cert}
              index={i}
              progress={p}
              onOpen={() => setActive(cert)}
            />
          ))}
        </div>
      </div>

      <CertificateModal active={active} onClose={() => setActive(null)} />
    </section>
  )
}

// Ikon utama per kartu: award (kiri) pakai mahkota, sertifikat (kanan) pakai perisai.
const cardIcon = [GiLaurelCrown, FiShield]

// === Kartu kehormatan — masuk dari sisi luar mengikuti scroll ===
function HonorCard({ cert, index, progress, onOpen }) {
  const fromLeft = index === 0
  // Range scroll dibikin staggered per kartu.
  const range = fromLeft ? [0.05, 0.45] : [0.15, 0.55]
  const x = useTransform(progress, range, [fromLeft ? '-130%' : '130%', '0%'])
  const rotate = useTransform(progress, range, [fromLeft ? -14 : 14, 0])
  const opacity = useTransform(progress, [range[0], range[0] + 0.12], [0, 1])

  const Icon = cardIcon[index] || FiAward

  return (
    <motion.div style={{ x, rotate, opacity }}>
      <Tilt
        tiltMaxAngleX={7}
        tiltMaxAngleY={7}
        glareEnable
        glareMaxOpacity={0.16}
        glareColor="#dc143c"
        glarePosition="all"
        className="h-full"
      >
        <button
          onClick={onOpen}
          className="metal-card clip-corner group relative flex h-full w-full flex-col overflow-hidden p-6 text-left shadow-mission transition-all duration-300 hover:shadow-glow-crimson"
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson to-transparent" />
          {/* Scan line on hover */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan-line bg-gradient-to-r from-transparent via-crimson to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          {/* Glow blob */}
          <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-crimson/15 blur-2xl" />

          {/* Header */}
          <div className="relative z-10 mb-4 flex items-center justify-between border-b border-steel/40 pb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-crimson">
              {fromLeft ? 'AWARD-01' : 'CERT-02'}
            </span>
            <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-neon">
              <GiKatana className="-rotate-45" /> {cert.year}
            </span>
          </div>

          {/* Icon besar */}
          <div className="relative z-10 mb-4 flex justify-center">
            <span className="relative inline-flex items-center justify-center border border-crimson/40 bg-black/40 p-5 text-crimson shadow-glow-crimson">
              <Icon size={42} />
              <span className="absolute inset-0 -z-10 animate-pulse-glow bg-crimson/20 blur-md" />
            </span>
          </div>

          <h3 className="relative z-10 text-center font-display text-lg font-bold uppercase tracking-wide text-white transition-colors group-hover:text-crimson">
            {cert.title}
          </h3>
          <p className="relative z-10 mt-1 text-center text-sm text-neon">
            {cert.qualification}
          </p>
          <p className="relative z-10 mt-1 text-center text-xs text-gray-500">
            {cert.field} · {cert.validity}
          </p>

          <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-2">
            {cert.badges.map((b) => (
              <span key={b} className="chip border-crimson/30 text-crimson">
                {b}
              </span>
            ))}
          </div>

          <span className="relative z-10 mt-5 inline-flex items-center justify-center gap-2 self-center font-mono text-[11px] uppercase tracking-widest text-crimson opacity-0 transition-opacity group-hover:opacity-100">
            <FiEye /> Lihat Preview
          </span>
        </button>
      </Tilt>
    </motion.div>
  )
}

// === Modal preview sertifikat ===
function CertificateModal({ active, onClose }) {
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

            {active.preview ? (
              <img
                src={active.preview}
                alt={`Preview ${active.title}`}
                className="w-full"
              />
            ) : (
              <div className="flex flex-col items-center py-6 text-center">
                <span className="mb-4 inline-flex border border-crimson/40 bg-black/40 p-5 text-crimson shadow-glow-crimson">
                  <FiAward size={48} />
                </span>
                <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">
                  {active.title}
                </h3>
                <p className="mt-1 text-neon">{active.qualification}</p>
                <p className="mt-2 text-sm text-gray-400">
                  {active.field} · {active.year}
                </p>
                <p className="mt-4 max-w-xs font-mono text-[11px] text-gray-500">
                  File scan sertifikat dapat ditambahkan ke folder
                  public/certificates/ dan dihubungkan pada data certificates.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
