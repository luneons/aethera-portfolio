# Andy Siswanto A.B — Web Programmer Portfolio

Website portfolio personal interaktif bertema dark futuristic, dibangun dengan
React + Vite + Tailwind CSS, animasi Framer Motion, background partikel
tsParticles, dan kartu 3D React Parallax Tilt.

## Tech Stack

- React 18 + Vite 5
- Tailwind CSS 3
- Framer Motion (scroll reveal & animasi)
- tsParticles (background partikel interaktif)
- React Parallax Tilt (hover card 3D)
- React Icons

## Menjalankan Secara Lokal

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build produksi ke folder dist/
npm run preview  # preview hasil build
```

## Struktur

```
public/                 # CV, favicon, og-image (aset statis)
src/
  components/           # Navbar, Hero, About, Skills, Experience,
                        # Education, Certificates, Projects, Contact,
                        # Footer, ParticlesBackground, CursorGlow, dll.
  data/                 # Konten yang mudah diedit
    profile.js          # nama, role, bio, kontak, link CV
    skills.js           # daftar skill & badge teknologi
    experience.js       # pengalaman kerja, pendidikan, sertifikasi
    projects.js         # daftar project + kategori filter
  App.jsx
  main.jsx
  index.css
```

## Cara Mengedit Konten

Semua teks utama berada di folder `src/data/`. Cukup ubah file di sana:

- Kontak (email, WhatsApp, GitHub, LinkedIn): `src/data/profile.js`
- Skill & progress bar: `src/data/skills.js`
- Pengalaman, pendidikan, sertifikat: `src/data/experience.js`
- Project & filter kategori: `src/data/projects.js`

### Foto profil

Letakkan `profile.jpg` di folder `public/`, lalu pada `src/components/Hero.jsx`
ganti inisial `AS` dengan `<img src="/profile.jpg" alt="Andy Siswanto" />`.

### CV

File CV berada di `public/BARU CV ANDY.pdf` dan terhubung melalui
`profile.cvFile` di `src/data/profile.js`.

### Preview Sertifikat

Letakkan scan sertifikat di `public/certificates/`, lalu isi field `preview`
pada data certificates di `src/data/experience.js`.

## Deploy ke Vercel

1. Push project ke GitHub.
2. Import repository di [vercel.com](https://vercel.com).
3. Framework terdeteksi otomatis sebagai Vite (`vercel.json` sudah disediakan).
4. Deploy.

## Catatan Privasi

Sesuai PRD, data sensitif (KTP, KK, alamat lengkap, agama, status pernikahan,
nomor identitas, data keluarga) tidak ditampilkan di website.
