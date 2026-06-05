import { useEffect, useRef } from 'react'

// Digital rain karakter Jepang (katakana) ala Matrix, tipis & crimson/neon.
// Pakai canvas agar performa ringan. Otomatis berhenti jika reduced-motion.
const GLYPHS =
  'アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレオコソトノホモヨロabcdef0123456789{}<>/'

export default function DigitalRain({ opacity = 0.12 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const fontSize = 16
    let columns = Math.floor(width / fontSize)
    let drops = Array(columns).fill(0).map(() => Math.random() * -50)

    const resize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      columns = Math.floor(width / fontSize)
      drops = Array(columns).fill(0).map(() => Math.random() * -50)
    }
    window.addEventListener('resize', resize)

    let raf = 0
    let last = 0
    const speed = 55 // ms per frame — pelan biar tidak ramai

    const draw = (t) => {
      raf = requestAnimationFrame(draw)
      if (t - last < speed) return
      last = t

      // Trail fade
      ctx.fillStyle = 'rgba(5,5,5,0.12)'
      ctx.fillRect(0, 0, width, height)
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Karakter terdepan lebih terang (neon), sisanya crimson.
        if (Math.random() > 0.975) {
          ctx.fillStyle = `rgba(0,212,255,${opacity * 3})`
        } else {
          ctx.fillStyle = `rgba(220,20,60,${opacity * 2})`
        }
        if (y > 0) ctx.fillText(char, x, y)

        if (y > height && Math.random() > 0.975) drops[i] = 0
        drops[i] += 1
      }
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [opacity])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  )
}
