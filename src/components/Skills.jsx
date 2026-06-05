import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import {
  FiLayout,
  FiServer,
  FiDatabase,
  FiTool,
  FiUsers,
} from 'react-icons/fi'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TechIcon from './TechIcon'
import { skillCategories } from '../data/skills'

const icons = {
  layout: FiLayout,
  server: FiServer,
  database: FiDatabase,
  tools: FiTool,
  users: FiUsers,
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="absolute left-0 top-1/2 -z-10 h-80 w-80 rounded-full bg-violet/10 blur-[120px]" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Skills"
          title="Keahlian & Teknologi"
          subtitle="Kombinasi keahlian teknis dan soft skill untuk membangun sistem web yang rapi dan fungsional."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = icons[cat.icon] || FiLayout
            return (
              <Reveal key={cat.title} delay={i * 0.08}>
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  glareEnable
                  glareMaxOpacity={0.1}
                  glareColor="#8b5cf6"
                  className="h-full"
                >
                  <div className="glass group h-full rounded-2xl p-6 transition-all duration-300 hover:border-electric/50 hover:shadow-glow">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="inline-flex rounded-xl bg-gradient-to-br from-electric/20 to-violet/20 p-3 text-neon">
                        <Icon size={22} />
                      </span>
                      <div>
                        <h3 className="font-display font-semibold text-white">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {cat.skills.map((s) => (
                        <li key={s.name}>
                          <div className="mb-1 flex justify-between text-sm">
                            <span className="inline-flex items-center gap-1.5 text-gray-300">
                              <TechIcon name={s.name} size={13} className="text-neon/70" />
                              {s.name}
                            </span>
                            <span className="text-gray-500">{s.level}%</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-neon to-violet"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${s.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tilt>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
