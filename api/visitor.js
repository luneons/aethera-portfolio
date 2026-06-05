// Visitor counter menggunakan counterapi.dev (gratis, tanpa setup).
// Counter ID unik per site — ganti 'aethera-portfolio' jika perlu.
const COUNTER_ID = 'aethera-portfolio'
const COUNTER_URL = `https://api.counterapi.dev/v1/${COUNTER_ID}/visits/up`

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const r = await fetch(COUNTER_URL)
    const data = await r.json()
    return res.status(200).json({ count: data?.count ?? null })
  } catch {
    return res.status(200).json({ count: null })
  }
}
