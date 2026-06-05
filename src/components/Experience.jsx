import { FiBriefcase, FiCheckCircle } from 'react-icons/fi'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { experiences } from '../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          label="Experience"
          title="Perjalanan Karier"
          subtitle="Pengalaman membangun dan memelihara sistem web di berbagai perusahaan."
        />

        <div className="relative">
          {/* Garis timeline */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-electric via-violet to-transparent md:left-1/2" />

          <div className="space-y-10">
            {experiences.map((exp, i) => {
              const left = i % 2 === 0
              return (
                <Reveal key={exp.company} delay={i * 0.05}>
                  <div
                    className={`relative flex flex-col md:flex-row md:items-center ${
                      left ? '' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Titik */}
                    <span className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-electric/50 bg-base-800 text-neon shadow-glow md:left-1/2">
                      <FiBriefcase size={14} />
                    </span>

                    <div
                      className={`ml-12 md:ml-0 md:w-1/2 ${
                        left ? 'md:pr-12 md:text-right' : 'md:pl-12'
                      }`}
                    >
                      <div className="glass group rounded-2xl p-6 transition-all duration-300 hover:border-electric/50 hover:shadow-glow">
                        <span className="chip mb-3 border-electric/30 text-neon">
                          {exp.period}
                        </span>
                        <h3 className="font-display text-lg font-semibold text-white">
                          {exp.role}
                        </h3>
                        <p className="mb-3 text-sm font-medium text-violet">
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-400">
                          {exp.description}
                        </p>
                        <ul
                          className={`mt-4 space-y-1.5 ${
                            left ? 'md:flex md:flex-col md:items-end' : ''
                          }`}
                        >
                          {exp.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-start gap-2 text-sm text-gray-300"
                            >
                              <FiCheckCircle
                                className="mt-0.5 shrink-0 text-neon"
                                size={14}
                              />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
