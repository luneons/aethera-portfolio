import { useEffect, useRef, useState } from 'react'

// Cursor Cyber Samurai: titik inti + reticle ring yang mengikuti dengan delay.
// Membesar saat hover ke elemen interaktif. Dinonaktifkan di perangkat sentuh.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.body.classList.add('cursor-none')

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: mouse.x, y: mouse.y }
    let raf = 0
    let angle = 0

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`
      }
    }

    // Ring mengejar posisi mouse dengan easing + rotasi terus-menerus.
    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.18
      ring.y += (mouse.y - ring.y) * 0.18
      angle = (angle + 1.2) % 360
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) rotate(${angle}deg)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const setHover = (v) => () =>
      ringRef.current?.classList.toggle('cursor-active', v)
    const setDown = (v) => () =>
      ringRef.current?.classList.toggle('cursor-down', v)

    const interactiveSel = 'a, button, [role="button"], input, textarea, select, label'
    const over = (e) => {
      if (e.target.closest?.(interactiveSel)) setHover(true)()
    }
    const out = (e) => {
      if (e.target.closest?.(interactiveSel)) setHover(false)()
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', over)
    window.addEventListener('pointerout', out)
    window.addEventListener('pointerdown', setDown(true))
    window.addEventListener('pointerup', setDown(false))

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerout', out)
      window.removeEventListener('pointerdown', setDown(true))
      window.removeEventListener('pointerup', setDown(false))
      document.body.classList.remove('cursor-none')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      {/* Titik inti */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-crimson shadow-glow-crimson"
      />
      {/* Reticle ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[99] h-9 w-9"
      >
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="#dc143c"
            strokeWidth="1.5"
            strokeDasharray="18 12"
            opacity="0.9"
          />
          {/* crosshair ticks */}
          <line x1="20" y1="1" x2="20" y2="7" stroke="#00d4ff" strokeWidth="1.5" />
          <line x1="20" y1="33" x2="20" y2="39" stroke="#00d4ff" strokeWidth="1.5" />
          <line x1="1" y1="20" x2="7" y2="20" stroke="#00d4ff" strokeWidth="1.5" />
          <line x1="33" y1="20" x2="39" y2="20" stroke="#00d4ff" strokeWidth="1.5" />
        </svg>
      </div>
    </>
  )
}
