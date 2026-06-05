import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

// Background partikel interaktif yang ringan (slim bundle).
export default function ParticlesBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      background: { color: { value: 'transparent' } },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 160, links: { opacity: 0.35 } },
        },
      },
      particles: {
        color: { value: ['#dc143c', '#8b0000', '#00d4ff'] },
        links: {
          color: '#dc143c',
          distance: 150,
          enable: true,
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: 'none',
          outModes: { default: 'out' },
        },
        number: { value: 55, density: { enable: true, area: 900 } },
        opacity: { value: 0.4 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
      },
    }),
    [],
  )

  if (!ready) return null

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 -z-10 h-full w-full"
    />
  )
}
