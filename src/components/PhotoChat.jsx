import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { GiKatana } from 'react-icons/gi'
import { chatPersona } from '../data/chatPersona'
import { sendChat } from '../lib/chatClient'

// Speech bubble interaktif yang muncul saat cursor masuk ke foto.
// Pengunjung membalas via pilihan tombol; AI melanjutkan obrolan.
export default function PhotoChat({ open, onClose }) {
  // history: untuk dikirim ke AI ({role, content})
  const [history, setHistory] = useState([])
  // turns: untuk ditampilkan ({ from: 'andy'|'you', text })
  const [turns, setTurns] = useState([])
  const [choices, setChoices] = useState([])
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const scrollRef = useRef(null)

  // Inisialisasi pesan pembuka sekali saat pertama dibuka.
  useEffect(() => {
    if (open && !started) {
      setStarted(true)
      setTurns([{ from: 'andy', text: chatPersona.initial.reply }])
      setChoices(chatPersona.initial.choices)
      setHistory([{ role: 'assistant', content: chatPersona.initial.reply }])
    }
  }, [open, started])

  // Auto-scroll ke bawah saat ada pesan baru.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e9, behavior: 'smooth' })
  }, [turns, loading])

  const pick = async (choice) => {
    if (loading) return
    const nextTurns = [...turns, { from: 'you', text: choice }]
    setTurns(nextTurns)
    setChoices([])
    setLoading(true)

    const nextHistory = [...history, { role: 'user', content: choice }]
    const result = await sendChat(nextHistory, choice)

    setTurns([...nextTurns, { from: 'andy', text: result.reply }])
    setChoices(result.choices || [])
    setHistory([
      ...nextHistory,
      { role: 'assistant', content: result.reply },
    ])
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="absolute left-1/2 top-0 z-30 w-72 -translate-x-1/2 -translate-y-[calc(100%+1rem)] sm:left-auto sm:right-0 sm:translate-x-0"
          onMouseLeave={onClose}
        >
          {/* Panel */}
          <div className="metal-card clip-corner relative overflow-hidden shadow-mission">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-steel/40 px-3 py-2">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-crimson">
                <GiKatana className="-rotate-45" /> {chatPersona.name} · ONLINE
              </span>
              <button
                onClick={onClose}
                aria-label="Tutup obrolan"
                className="text-gray-500 hover:text-crimson"
              >
                <FiX size={14} />
              </button>
            </div>

            {/* Pesan */}
            <div
              ref={scrollRef}
              className="max-h-56 space-y-2 overflow-y-auto px-3 py-3"
            >
              {turns.map((t, i) => (
                <div
                  key={i}
                  className={`flex ${
                    t.from === 'you' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span
                    className={`max-w-[85%] px-2.5 py-1.5 text-xs leading-relaxed ${
                      t.from === 'you'
                        ? 'bg-crimson/20 text-white'
                        : 'bg-white/[0.04] text-gray-200'
                    }`}
                  >
                    {t.text}
                  </span>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <span className="flex gap-1 bg-white/[0.04] px-3 py-2">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-crimson"
                        style={{ animationDelay: `${d * 0.2}s` }}
                      />
                    ))}
                  </span>
                </div>
              )}
            </div>

            {/* Pilihan jawaban */}
            {choices.length > 0 && !loading && (
              <div className="flex flex-wrap gap-1.5 border-t border-steel/40 p-2.5">
                {choices.map((c) => (
                  <button
                    key={c}
                    onClick={() => pick(c)}
                    className="border border-crimson/30 bg-black/40 px-2.5 py-1 text-[11px] text-neon transition-colors hover:border-crimson/70 hover:text-white"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ekor bubble menunjuk ke foto */}
          <span className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rotate-45 border-b border-r border-steel/50 bg-base-800 sm:left-auto sm:right-10" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
