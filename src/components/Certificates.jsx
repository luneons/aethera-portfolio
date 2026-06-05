import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { FiAward, FiX, FiEye } from 'react-icons/fi'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { certificates } from '../data/experience'

export default function Certificates() {
  const [active, setActive] = useState(null)

  return (
    <section id="certificate" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          label="Certificate"
          title="Sertifikasi & Penghargaan"
          subtitle="Sertifikat kompetensi dan penghargaan yang memvalidasi keahlian serta kontribusi."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {certificates.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.1}>
              <Tilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                glareEnable
                glareMaxOpacity={0.12}
                glareColor="#22d3ee"
                className="h-full"
              >
                <div className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-electric/50 hover:shadow-glow">
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-electric/10 blur-2xl transition-opacity group-hover:opacity-100" />
                  <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-electric/20 to-violet/20 p-3 text-neon">
                    <FiAward size={24} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-violet">{cert.field}</p>
                  <p className="mt-1 text-sm text-gray-400">
                    {cert.qualification} · {cert.year}
                  </p>
                  <p className="text-xs text-gray-500">{cert.validity}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {cert.badges.map((b) => (
                      <span
                        key={b}
                        className="chip border-electric/30 text-neon"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActive(cert)}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-neon hover:text-white"
                  >
                    <FiEye /> Lihat Preview
                  </button>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-lg rounded-2xl p-8"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Tutup"
                className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <FiX size={20} />
              </button>

              {active.preview ? (
                <img
                  src={active.preview}
                  alt={`Preview ${active.title}`}
                  className="w-full rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center py-8 text-center">
                  <span className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-electric/20 to-violet/20 p-5 text-neon shadow-glow">
                    <FiAward size={48} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {active.title}
                  </h3>
                  <p className="mt-1 text-violet">{active.qualification}</p>
                  <p className="mt-2 text-sm text-gray-400">
                    {active.field} · {active.year}
                  </p>
                  <p className="mt-4 max-w-xs text-xs text-gray-500">
                    File scan sertifikat dapat ditambahkan ke folder
                    public/certificates/ dan dihubungkan pada data certificates.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
