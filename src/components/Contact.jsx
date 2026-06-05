import { useState } from 'react'
import { FiMail, FiMapPin, FiCopy, FiCheck, FiDownload } from 'react-icons/fi'
import { FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { profile } from '../data/profile'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const { contact } = profile

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const socials = [
    { icon: FaGithub, href: contact.github, label: 'GitHub' },
    { icon: FaLinkedin, href: contact.linkedin, label: 'LinkedIn' },
    {
      icon: FaWhatsapp,
      href: `https://wa.me/${contact.whatsapp}`,
      label: 'WhatsApp',
    },
  ]

  return (
    <section id="contact" className="relative py-24">
      <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/10 blur-[140px]" />
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          label="Contact"
          title="Mari Berkolaborasi"
          subtitle="Punya project website atau sistem digital? Mari diskusi."
        />

        <Reveal>
          <div className="glass-strong rounded-3xl p-8 sm:p-10">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-display text-xl font-semibold text-white">
                  Hubungi Saya
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  Saya membantu bisnis, perusahaan, dan individu membangun
                  sistem berbasis web yang efisien, terstruktur, dan
                  profesional.
                </p>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={copyEmail}
                    className="glass flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:border-electric/50"
                  >
                    <span className="inline-flex rounded-lg bg-gradient-to-br from-electric/20 to-violet/20 p-2.5 text-neon">
                      <FiMail size={18} />
                    </span>
                    <span className="flex-1 truncate text-sm text-gray-300">
                      {contact.email}
                    </span>
                    {copied ? (
                      <FiCheck className="text-green-400" />
                    ) : (
                      <FiCopy className="text-gray-500" />
                    )}
                  </button>

                  <div className="glass flex items-center gap-3 rounded-xl p-3">
                    <span className="inline-flex rounded-lg bg-gradient-to-br from-electric/20 to-violet/20 p-2.5 text-neon">
                      <FiMapPin size={18} />
                    </span>
                    <span className="text-sm text-gray-300">
                      {profile.location}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="glass inline-flex rounded-xl p-3 text-gray-300 transition-all hover:scale-110 hover:border-electric/50 hover:text-neon"
                    >
                      <s.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center gap-3 rounded-2xl bg-gradient-to-br from-electric/10 to-violet/10 p-6">
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary w-full"
                >
                  <FaWhatsapp size={18} /> Chat WhatsApp
                </a>
                <a href={`mailto:${contact.email}`} className="btn-ghost w-full">
                  <FiMail size={18} /> Kirim Email
                </a>
                <a href={profile.cvFile} download className="btn-ghost w-full">
                  <FiDownload size={18} /> Download CV
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
