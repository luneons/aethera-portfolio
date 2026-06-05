import { FiBookOpen } from 'react-icons/fi'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { education } from '../data/experience'

export default function Education() {
  return (
    <section id="education" className="relative py-24">
      <div className="absolute right-0 top-1/3 -z-10 h-72 w-72 rounded-full bg-cyan/10 blur-[120px]" />
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          label="Education"
          title="Riwayat Pendidikan"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, i) => (
            <Reveal key={edu.institution} delay={i * 0.1}>
              <div className="glass group h-full rounded-2xl p-6 transition-all duration-300 hover:border-electric/50 hover:shadow-glow">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <span className="inline-flex rounded-xl bg-gradient-to-br from-electric/20 to-violet/20 p-3 text-neon">
                    <FiBookOpen size={22} />
                  </span>
                  <span className="chip border-electric/30 text-neon">
                    {edu.period}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {edu.institution}
                </h3>
                <p className="text-sm font-medium text-violet">
                  {edu.program} · {edu.degree}
                </p>
                {edu.gpa && (
                  <p className="mt-1 text-sm text-gray-400">IPK: {edu.gpa}</p>
                )}
                {edu.description && (
                  <p className="mt-3 text-sm text-gray-400">
                    {edu.description}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
