import { useEffect, useState } from 'react'
import { FiEye } from 'react-icons/fi'
import { profile } from '../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()
  const [visitors, setVisitors] = useState(null)

  useEffect(() => {
    fetch('/api/visitor')
      .then((r) => r.json())
      .then((d) => {
        if (d.count) setVisitors(d.count)
      })
      .catch(() => {})
  }, [])

  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-gray-500">
          © {year} <span className="gradient-text font-semibold">{profile.brand}</span>{' '}
          — {profile.shortName}. Fullstack Developer.
        </p>
        <div className="flex items-center gap-4">
          {visitors && (
            <span className="flex items-center gap-1.5 font-mono text-xs text-gray-500">
              <FiEye size={13} className="text-crimson" />
              <span className="text-white">{visitors.toLocaleString()}</span> pengunjung
            </span>
          )}
          <p className="font-mono text-xs text-gray-600">
            React + Vite + Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
