import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import {
  FiMapPin,
  FiUser,
  FiTerminal,
  FiAward,
  FiZap,
  FiBookOpen,
} from 'react-icons/fi'
import { GiKatana, GiHealthNormal } from 'react-icons/gi'
import SectionHeading from './SectionHeading'
import TechIcon from './TechIcon'
import { profile } from '../data/profile'
import { techBadges } from '../data/skills'
import { education } from '../data/experience'

// Atribut ala RPG character sheet.
const attributes = [
  { label: 'Frontend', value: 92 },
  { label: 'Backend', value: 88 },
  { label: 'Database', value: 85 },
  { label: 'DevOps', value: 80 },
  { label: 'Problem Solving', value: 90 },
]

// Data field bergaya dossier.
const dataFields = [
  { icon: FiUser, label: 'Class', value: 'Fullstack Developer' },
  { icon: GiKatana, label: 'Guild', value: 'AETHERA' },
  { icon: FiMapPin, label: 'Region', value: 'Klaten, Jawa Tengah' },
  { icon: FiAward, label: 'Title', value: 'Developer Terbaik 2025' },
]

// Card yang "terlempar" dari luar layar ke posisinya, terikat ke scroll.
// from: { x, y, rotate } posisi awal (offscreen). range: [start, end] progress.
function ThrowInCard({ children, progress, from, range = [0, 0.5], className = '' }) {
  // Unit harus konsisten ('%' string) agar interpolasi jalan.
  const x = useTransform(progress, range, [from.x ?? '0%', '0%'])
  const y = useTransform(progress, range, [from.y ?? '0%', '0%'])
  const rotate = useTransform(progress, range, [from.rotate ?? 0, 0])
  const opacity = useTransform(
    progress,
    [range[0], range[0] + (range[1] - range[0]) * 0.35],
    [0, 1],
  )
  return (
    <motion.div style={{ x, y, rotate, opacity }} className={className}>
      {children}
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.82', 'center 0.55'],
  })
  // Smoothing supaya lemparan terasa "berbobot" tapi tetap mengikuti scroll.
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  })

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden py-24">
      <div className="absolute right-0 top-1/4 -z-10 h-72 w-72 rounded-full bg-crimson/10 blur-[120px]" />
      <div className="absolute left-0 bottom-1/4 -z-10 h-64 w-64 rounded-full bg-neon/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading label="Dossier" title="Character Profile" />

        <div className="grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* === Panel kiri: Terminal bio + atribut — terlempar dari kiri === */}
          <ThrowInCard progress={p} from={{ x: '-120%', rotate: -8 }} range={[0, 0.55]}>
            <div className="metal-card clip-corner relative overflow-hidden p-0">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson to-transparent" />

              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-steel/40 bg-black/40 px-4 py-2.5">
                <FiTerminal className="text-crimson" />
                <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                  profile.exe — bio_log
                </span>
                <span className="ml-auto flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-crimson/70" />
                  <span className="h-2 w-2 rounded-full bg-neon/60" />
                  <span className="h-2 w-2 rounded-full bg-steel/70" />
                </span>
              </div>

              {/* Bio */}
              <div className="p-6">
                <p className="font-mono text-xs text-neon">
                  <span className="text-crimson">$</span> whoami
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-white">
                  {profile.shortName}
                </h3>
                <p className="mt-4 leading-relaxed text-gray-300">
                  {profile.about}
                </p>
                <p className="mt-3 leading-relaxed text-gray-500">
                  {profile.aboutSummary}
                </p>

                {/* Atribut / stat bars */}
                <div className="mt-6">
                  <p className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-crimson">
                    <FiZap /> Combat Stats
                  </p>
                  <div className="space-y-2.5">
                    {attributes.map((a, i) => (
                      <div key={a.label}>
                        <div className="mb-1 flex justify-between font-mono text-[11px] uppercase tracking-wider">
                          <span className="text-gray-300">{a.label}</span>
                          <span className="text-neon">{a.value}</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden bg-white/5">
                          <motion.div
                            className="h-full bg-gradient-to-r from-crimson to-neon"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${a.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ThrowInCard>

          {/* === Panel kanan: Data fields + arsenal === */}
          <div className="space-y-6">
            {/* Data dossier — terlempar dari kanan-atas */}
            <ThrowInCard progress={p} from={{ x: '120%', y: '-40%', rotate: 10 }} range={[0.1, 0.65]}>
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.12} glareColor="#dc143c">
                <div className="metal-card clip-corner p-5">
                  <p className="mb-4 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-crimson">
                    <GiHealthNormal /> ID Data
                  </p>
                  <ul className="space-y-3">
                    {dataFields.map((f) => (
                      <li key={f.label} className="flex items-center gap-3">
                        <span className="inline-flex border border-crimson/30 bg-black/40 p-2 text-crimson">
                          <f.icon size={16} />
                        </span>
                        <span className="flex flex-col">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                            {f.label}
                          </span>
                          <span className="text-sm font-medium text-white">
                            {f.value}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt>
            </ThrowInCard>

            {/* Arsenal / tech badges — terlempar dari kanan-bawah */}
            <ThrowInCard progress={p} from={{ x: '120%', y: '40%', rotate: -10 }} range={[0.25, 0.8]}>
              <div className="metal-card clip-corner p-5">
                <p className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-crimson">
                  <GiKatana className="-rotate-45" /> Arsenal
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {techBadges.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 border border-steel/40 bg-black/40 px-2 py-1 text-xs text-gray-300 transition-colors hover:border-crimson/50 hover:text-white"
                    >
                      <TechIcon name={t} size={12} className="text-neon" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </ThrowInCard>

            {/* Education / academy — terlempar dari bawah */}
            <ThrowInCard progress={p} from={{ y: '90%', rotate: 6 }} range={[0.4, 0.95]}>
              <div className="metal-card clip-corner p-5">
                <p className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-crimson">
                  <FiBookOpen /> Academy
                </p>
                {education.map((edu) => (
                  <div key={edu.institution} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center border border-crimson/30 bg-black/40 text-crimson">
                      <FiBookOpen size={16} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
                          {edu.institution}
                        </h4>
                        <span className="chip border-neon/30 text-neon">
                          {edu.period}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm font-medium text-neon">
                        {edu.program} · {edu.degree}
                      </p>
                      {edu.gpa && (
                        <p className="font-mono text-[11px] text-gray-500">
                          IPK {edu.gpa}
                        </p>
                      )}
                      <p className="mt-2 text-xs leading-relaxed text-gray-400">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ThrowInCard>
          </div>
        </div>
      </div>
    </section>
  )
}
