import Reveal from './Reveal'

// Heading section dengan label kecil + judul gradient.
export default function SectionHeading({ label, title, subtitle }) {
  return (
    <Reveal className="mb-12 text-center">
      {label && (
        <span className="chip mb-4 border-electric/30 text-neon">
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-neon animate-pulse-glow" />
          {label}
        </span>
      )}
      <h2 className="section-title text-white">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-balance text-gray-400">
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
