// Konfigurasi obrolan interaktif "foto yang ngomong".
// Pesan awal + pilihan ini tampil tanpa perlu AI (instan saat bubble dibuka).
export const chatPersona = {
  name: 'Andy',
  role: 'Cyber Samurai Developer',
  initial: {
    reply:
      'Yo. Aku Andy, Founder AETHERA. Kursor kamu udah masuk jangkauan pedangku ⚔️ Mau tanya apa?',
    choices: [
      'Ceritain soal AETHERA',
      'Skill kamu apa aja?',
      'Project paling keren?',
      'Gimana cara kontak kamu?',
    ],
  },
}

// Jawaban cadangan (offline / saat API gagal). Dipilih via kecocokan kata kunci.
const fallbackReplies = [
  {
    keywords: ['aethera', 'organisasi', 'brand'],
    reply:
      'AETHERA itu organisasi developer-ku. Setiap aplikasi yang kubangun pakai nama AETHERA — dari SaaS sampai sistem internal.',
    choices: ['Project AETHERA apa aja?', 'Skill kamu apa aja?', 'Cara kontak kamu?'],
  },
  {
    keywords: ['skill', 'tech', 'stack', 'bahasa', 'kuasai'],
    reply:
      'Fullstack: Next.js, React, Node.js, TypeScript, plus database PostgreSQL/MySQL/MongoDB. Dulu mulai dari PHP/CodeIgniter.',
    choices: ['Project paling keren?', 'Pengalaman kerja kamu?', 'Cara kontak kamu?'],
  },
  {
    keywords: ['project', 'portfolio', 'keren', 'misi'],
    reply:
      'Andalanku: AETHERA Analytics (SaaS dashboard) & AETHERA Commerce. Scroll ke Mission Archive buat buka file misinya.',
    choices: ['Skill kamu apa aja?', 'Pengalaman kerja kamu?', 'Cara kontak kamu?'],
  },
  {
    keywords: ['kontak', 'hubungi', 'email', 'whatsapp', 'wa'],
    reply:
      'Gampang. Klik tombol WhatsApp/Email di section Contact, atau download CV-ku. Mari diskusi project!',
    choices: ['Ceritain soal AETHERA', 'Project paling keren?', 'Skill kamu apa aja?'],
  },
  {
    keywords: ['pengalaman', 'kerja', 'karir', 'experience'],
    reply:
      'Aku pernah jadi Web Programmer di PT. Multi Atmajaya, Web Developer di Momo Coffee, dan IT Support di Bank Aladin. Sekarang fokus di AETHERA.',
    choices: ['Project paling keren?', 'Skill kamu apa aja?', 'Cara kontak kamu?'],
  },
]

const fallbackDefault = {
  reply:
    'Hmm, menarik. Tapi aku lebih jago cerita soal coding, project, dan AETHERA. Pilih topiknya 👇',
  choices: [
    'Ceritain soal AETHERA',
    'Skill kamu apa aja?',
    'Project paling keren?',
    'Cara kontak kamu?',
  ],
}

export function getFallbackResponse(choiceText) {
  const text = (choiceText || '').toLowerCase()
  const hit = fallbackReplies.find((f) =>
    f.keywords.some((k) => text.includes(k)),
  )
  return hit || fallbackDefault
}
