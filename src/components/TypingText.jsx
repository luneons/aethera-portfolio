import { useEffect, useState } from 'react'

// Typing animation yang berputar melalui daftar kata.
export default function TypingText({ words, className = '' }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1600)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1),
          )
        },
        deleting ? 45 : 90,
      )
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words])

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-0.5 animate-pulse-glow bg-neon align-middle" style={{ height: '1em' }} />
    </span>
  )
}
