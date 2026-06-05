import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'

// Tombol musik global. Ekspos method play() lewat ref supaya gate bisa trigger play.
const MusicPlayer = forwardRef(function MusicPlayer(_, ref) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useImperativeHandle(ref, () => ({
    play: () => {
      const a = audioRef.current
      if (a) {
        a.volume = 0.4
        a.play().then(() => setPlaying(true)).catch(() => {})
      }
    },
  }))

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      a.volume = 0.4
      a.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/musik.mp3" loop preload="auto" />
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={toggle}
        aria-label={playing ? 'Matikan musik' : 'Nyalakan musik'}
        className="fixed right-6 top-20 z-50 flex h-10 w-10 items-center justify-center border border-steel/50 bg-base-800/80 text-gray-300 backdrop-blur transition-all hover:border-crimson/60 hover:text-crimson hover:shadow-glow-crimson"
        style={{ clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)' }}
      >
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.span key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <FiVolume2 size={18} />
            </motion.span>
          ) : (
            <motion.span key="off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <FiVolumeX size={18} />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Equalizer bars when playing */}
        {playing && (
          <span className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 gap-px">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-0.5 animate-pulse-glow bg-crimson"
                style={{
                  height: `${4 + (i % 2) * 3}px`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </span>
        )}
      </motion.button>
    </>
  )
})

export default MusicPlayer
