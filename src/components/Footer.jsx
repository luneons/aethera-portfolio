import { profile } from '../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-gray-500">
          © {year} <span className="gradient-text font-semibold">{profile.brand}</span>{' '}
          — {profile.shortName}. Fullstack Developer.
        </p>
        <p className="font-mono text-xs text-gray-600">
          Dibuat dengan React, Vite & Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
