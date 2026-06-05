// Serverless function (Vercel) — proxy aman ke OpenRouter.
// API key disimpan di environment variable server (OPENROUTER_API_KEY),
// TIDAK PERNAH terekspos ke browser.

const SYSTEM_PROMPT = `Kamu adalah avatar AI dari Andy Siswanto Ahmad Budiyono (S.Kom), seorang "Cyber Samurai Developer" dan Founder organisasi developer bernama AETHERA.

Konteks tentang Andy:
- Fullstack Developer: Next.js, React, Node.js, TypeScript, PostgreSQL, MySQL, MongoDB, Prisma. Dulu mulai dari PHP & CodeIgniter.
- Founder & Fullstack Developer di AETHERA (organisasinya). Setiap aplikasi yang dia bangun memakai nama AETHERA.
- Pengalaman: Web Programmer di PT. Multi Atmajaya Persada, Web Developer di CV. Momo Coffee, IT Support di Bank Aladin Syariah.
- Pendidikan: S.Kom Sistem Informasi, Universitas Nusa Mandiri (IPK 3.37).
- Sertifikasi: BNSP Network Administrator Madya. Penghargaan: Developer Terbaik 2025.
- Lokasi: Klaten, Jawa Tengah.
- Project utama: AETHERA Analytics (SaaS dashboard), AETHERA Commerce (e-commerce), AETHERA HR & Absensi.

Gaya bicara: santai, percaya diri, sedikit playful dengan nuansa "cyber samurai" (boleh sesekali pakai metafora pedang/misi/⚔️). Bahasa Indonesia. SINGKAT — maksimal 2 kalimat per balasan.

ATURAN OUTPUT (WAJIB): Balas HANYA dengan JSON valid, tanpa markdown, tanpa teks lain, format persis:
{"reply":"<balasan singkat sebagai Andy>","choices":["<pilihan 1>","<pilihan 2>","<pilihan 3>"]}
- "choices" adalah 2-4 pertanyaan/respon singkat (maks 6 kata) yang MUNGKIN ditanyakan pengunjung berikutnya, ditulis dari sudut pandang pengunjung.
- Jaga agar percakapan terus berlanjut dan relevan dengan profil Andy.`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'API key belum dikonfigurasi di server.' })
    return
  }

  try {
    const { messages = [] } = req.body || {}

    // Batasi panjang history biar hemat token.
    const trimmed = messages.slice(-10)

    const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001'

    const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': req.headers.origin || 'https://aethera.dev',
        'X-Title': 'AETHERA Portfolio Chat',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...trimmed],
        temperature: 0.8,
        max_tokens: 300,
        response_format: { type: 'json_object' },
      }),
    })

    if (!orRes.ok) {
      const detail = await orRes.text()
      res.status(502).json({ error: 'Upstream error', detail })
      return
    }

    const data = await orRes.json()
    const content = data?.choices?.[0]?.message?.content || ''

    let parsed
    try {
      parsed = JSON.parse(content)
    } catch {
      // Coba ekstrak blok JSON kalau model menambah teks lain.
      const match = content.match(/\{[\s\S]*\}/)
      parsed = match ? JSON.parse(match[0]) : null
    }

    if (!parsed || typeof parsed.reply !== 'string') {
      res.status(200).json({
        reply: content.slice(0, 200) || 'Maaf, sinyalku terganggu sebentar.',
        choices: ['Coba tanya lagi', 'Skill kamu apa aja?', 'Cara kontak kamu?'],
      })
      return
    }

    res.status(200).json({
      reply: parsed.reply,
      choices: Array.isArray(parsed.choices) ? parsed.choices.slice(0, 4) : [],
    })
  } catch (err) {
    res.status(500).json({ error: 'Server error', detail: String(err) })
  }
}
