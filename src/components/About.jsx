import { FiMapPin, FiBriefcase, FiCode, FiAward } from 'react-icons/fi'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TechIcon from './TechIcon'
import { profile } from '../data/profile'
import { techBadges } from '../data/skills'

const highlights = [
  { icon: FiCode, title: 'Fullstack Dev', desc: 'Next.js, React, Node.js & TypeScript' },
  { icon: FiBriefcase, title: '4+ Tahun', desc: 'Pengalaman pengembangan web' },
  { icon: FiAward, title: 'Best Developer', desc: 'Penghargaan Developer Terbaik 2025' },
  { icon: FiMapPin, title: profile.location.split(',')[0], desc: 'Jawa Tengah, Indonesia' },
]

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="About Me"
          title="Mengenal Saya Lebih Dekat"
        />

        <div className="grid items-start gap-10 md:grid-cols-2">
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <p className="leading-relaxed text-gray-300">{profile.about}</p>
              <p className="mt-4 leading-relaxed text-gray-400">
                {profile.aboutSummary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {techBadges.map((t) => (
                  <span key={t} className="chip inline-flex items-center gap-1.5">
                    <TechIcon name={t} size={14} className="text-neon" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.1}>
                <div className="glass group h-full rounded-2xl p-5 transition-all duration-300 hover:border-electric/50 hover:shadow-glow">
                  <div className="mb-3 inline-flex rounded-xl bg-gradient-to-br from-electric/20 to-violet/20 p-3 text-neon transition-transform group-hover:scale-110">
                    <h.icon size={22} />
                  </div>
                  <h3 className="font-display font-semibold text-white">
                    {h.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">{h.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
