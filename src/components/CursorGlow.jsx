import { useEffect, useRef, useState } from 'react'

// Spotlight glow yang mengikuti kursor mouse. Dinonaktifkan di perangkat sentuh.
export default function CursorGlow() {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer) return
    setEnabled(true)

    let frame = 0
    const move = (e) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate(${e.clientX - 250}px, ${
            e.clientY - 250
          }px)`
        }
      })
    }
    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(frame)
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] rounded-full opacity-60 blur-3xl transition-transform duration-200 ease-out"
      style={{
        background:
          'radial-gradient(circle, rgba(220,20,60,0.18) 0%, rgba(0,212,255,0.08) 35%, transparent 70%)',
      }}
    />
  )
}
