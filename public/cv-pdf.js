/* Generate PDF CV langsung di browser (teks asli = ATS friendly + foto ter-embed). */
(function () {
  const ACCENT = [177, 18, 47]
  const INK = [26, 26, 26]
  const MUTED = [90, 90, 90]
  const MX = 16 // margin kiri (mm)
  const MR = 16 // margin kanan
  let doc, y, pageW, pageH, contentW

  function setStatus(t) {
    const el = document.getElementById('status')
    if (el) el.textContent = t
  }

  // Muat foto profil → dataURL (agar bisa di-embed ke PDF).
  function loadPhoto() {
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = function () {
        try {
          const size = 240
          const c = document.createElement('canvas')
          c.width = size
          c.height = size
          const ctx = c.getContext('2d')
          // crop kotak dari atas-tengah
          const s = Math.min(img.width, img.height)
          const sx = (img.width - s) / 2
          const sy = 0
          ctx.drawImage(img, sx, sy, s, s, 0, 0, size, size)
          resolve(c.toDataURL('image/jpeg', 0.92))
        } catch (e) {
          resolve(null)
        }
      }
      img.onerror = () => resolve(null)
      img.src = '/profile.jpg'
    })
  }

  function checkBreak(needed) {
    if (y + needed > pageH - 14) {
      doc.addPage()
      y = 16
    }
  }

  function heading(text) {
    checkBreak(12)
    y += 2
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(...ACCENT)
    doc.text(text.toUpperCase(), MX, y)
    y += 1.5
    doc.setDrawColor(210, 210, 210)
    doc.setLineWidth(0.3)
    doc.line(MX, y, pageW - MR, y)
    y += 4.5
  }

  function para(text, color) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(...(color || INK))
    const lines = doc.splitTextToSize(text, contentW)
    lines.forEach((ln) => {
      checkBreak(5)
      doc.text(ln, MX, y)
      y += 4.6
    })
  }

  function bullet(text) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(...INK)
    const lines = doc.splitTextToSize(text, contentW - 5)
    lines.forEach((ln, i) => {
      checkBreak(5)
      if (i === 0) {
        doc.setTextColor(...ACCENT)
        doc.text('•', MX + 1, y)
        doc.setTextColor(...INK)
      }
      doc.text(ln, MX + 5, y)
      y += 4.6
    })
  }

  function jobHead(title, sub, date) {
    checkBreak(7)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(...INK)
    doc.text(title + ' — ', MX, y)
    const tw = doc.getTextWidth(title + ' — ')
    doc.setTextColor(...ACCENT)
    doc.text(sub, MX + tw, y)
    // tanggal rata kanan
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...MUTED)
    doc.text(date, pageW - MR, y, { align: 'right' })
    y += 5
  }

  async function build() {
    const { jsPDF } = window.jspdf
    doc = new jsPDF({ unit: 'mm', format: 'a4' })
    pageW = doc.internal.pageSize.getWidth()
    pageH = doc.internal.pageSize.getHeight()
    contentW = pageW - MX - MR
    y = 16

    const photo = await loadPhoto()

    // === Header ===
    const photoSize = 26
    if (photo) {
      doc.setFillColor(...ACCENT)
      doc.rect(MX - 0.6, y - 0.6, photoSize + 1.2, photoSize + 1.2, 'F')
      doc.addImage(photo, 'JPEG', MX, y, photoSize, photoSize)
    }
    const tx = photo ? MX + photoSize + 6 : MX
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor(...INK)
    doc.text('Andy Siswanto Ahmad Budiyono, S.Kom', tx, y + 6)
    doc.setFontSize(11)
    doc.setTextColor(...ACCENT)
    doc.text('Fullstack Developer · Next.js / React / Node.js', tx, y + 12)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...MUTED)
    doc.text('Klaten, Jawa Tengah  |  luneonss@gmail.com  |  +62 812-9315-9011', tx, y + 18)
    doc.text('github.com/luneons  |  linkedin.com/in/andy-siswanto-71a983215', tx, y + 22.5)

    y = Math.max(y + photoSize, y + 26) + 4
    doc.setDrawColor(...ACCENT)
    doc.setLineWidth(0.6)
    doc.line(MX, y, pageW - MR, y)
    y += 7

    // === Ringkasan ===
    heading('Ringkasan Profil')
    para(
      'Fullstack Developer dengan 4+ tahun pengalaman membangun aplikasi web end-to-end menggunakan Next.js, React, Node.js, dan TypeScript. Berawal dari PHP/CodeIgniter dan berkembang ke ekosistem JavaScript modern. Berpengalaman merancang antarmuka interaktif, membangun REST/GraphQL API, mengelola database relasional maupun NoSQL, serta deployment ke cloud dengan praktik CI/CD. Pendiri AETHERA, organisasi developer yang berfokus pada produk digital yang scalable dan maintainable.',
    )

    // === Keahlian ===
    heading('Keahlian Teknis')
    const skills = [
      ['Frontend', 'React, Next.js, TypeScript, Tailwind CSS, Redux'],
      ['Backend', 'Node.js, Express.js, REST & GraphQL API, PHP, CodeIgniter'],
      ['Database', 'PostgreSQL, MySQL, MongoDB, Prisma ORM'],
      ['DevOps', 'Git & GitHub, Docker, Vercel, CI/CD Pipeline'],
      ['Soft Skill', 'Komunikasi, Teamwork, Problem Solving, Manajemen Waktu'],
    ]
    skills.forEach(([cat, val]) => {
      checkBreak(5)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9.5)
      doc.setTextColor(...INK)
      doc.text(cat + ':', MX, y)
      const w = doc.getTextWidth(cat + ': ')
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...MUTED)
      const lines = doc.splitTextToSize(val, contentW - w - 2)
      doc.text(lines[0], MX + w + 1, y)
      y += 4.6
      for (let i = 1; i < lines.length; i++) {
        doc.text(lines[i], MX + w + 1, y)
        y += 4.6
      }
    })

    // === Pengalaman ===
    heading('Pengalaman Kerja')
    const jobs = [
      {
        title: 'Fullstack Engineer',
        sub: 'PT. Zero One',
        date: 'Jan 2026 – Sekarang',
        points: [
          'Membangun dan mengembangkan aplikasi web fullstack modern menggunakan Next.js, React, Node.js, dan TypeScript.',
          'Merancang arsitektur API dan integrasi database untuk produk dan klien perusahaan.',
          'Kolaborasi tim dalam pengembangan produk digital serta menerapkan best practice CI/CD.',
        ],
      },
      {
        title: 'Founder & Fullstack Developer',
        sub: 'AETHERA',
        date: 'Mei 2026 – Sekarang',
        points: [
          'Mendirikan dan memimpin AETHERA, organisasi developer yang membangun produk digital modern (SaaS, e-commerce, sistem manajemen berbasis web).',
          'Merancang arsitektur dan membangun produk fullstack end-to-end dengan Next.js, React, Node.js, dan TypeScript.',
          'Mengelola project, deployment, dan infrastruktur cloud termasuk pipeline CI/CD.',
        ],
      },
      {
        title: 'Web Programmer',
        sub: 'PT. Multi Atmajaya Persada',
        date: 'Jan 2024 – Mei 2025',
        points: [
          'Mengelola dan mengembangkan website perusahaan berbasis framework CodeIgniter.',
          'Membangun program internal dan dashboard admin untuk mempermudah pekerjaan antar divisi.',
          'Mengintegrasikan komponen modern berbasis React untuk meningkatkan pengalaman pengguna.',
        ],
      },
      {
        title: 'IT Support',
        sub: 'PT. Bank Aladin Syariah Tbk',
        date: 'Sep 2021 – Des 2021',
        points: [
          'Mendukung kebutuhan teknis dan operasional IT, serta troubleshooting perangkat dan sistem.',
          'Memperoleh pengalaman kerja di lingkungan perusahaan finansial.',
        ],
      },
    ]
    jobs.forEach((j) => {
      jobHead(j.title, j.sub, j.date)
      j.points.forEach(bullet)
      y += 2
    })

    // === Pendidikan ===
    heading('Pendidikan')
    jobHead('Universitas Nusa Mandiri', 'S1 Sistem Informasi (S.Kom)', '2018 – 2024')
    para('IPK 3.37. Fokus pada pemrograman, database, analisis sistem, web programming, dan manajemen proyek sistem informasi.', MUTED)

    // === Sertifikasi ===
    heading('Sertifikasi & Penghargaan')
    bullet('Developer Terbaik 2025 — Best Developer of the Year, atas kontribusi dan kualitas pengembangan.')
    bullet('Sertifikat Kompetensi BNSP — Network Administrator Madya, Administrasi Jaringan (2023).')

    return doc
  }

  window.downloadPDF = async function () {
    const btn = document.getElementById('dl')
    btn.disabled = true
    setStatus('Membuat PDF...')
    try {
      const d = await build()
      d.save('CV - Andy Siswanto Ahmad Budiyono.pdf')
      setStatus('PDF berhasil diunduh!')
    } catch (e) {
      console.error(e)
      setStatus('Gagal membuat PDF. Coba lagi.')
    } finally {
      btn.disabled = false
    }
  }
})()
