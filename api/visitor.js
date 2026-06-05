// Serverless visitor counter — pakai Vercel KV jika tersedia, fallback ke header count.
// Untuk setup Vercel KV: vercel.com/dashboard → Storage → Create KV → hubungkan ke project.
// Environment variable KV_REST_API_URL dan KV_REST_API_TOKEN akan terisi otomatis.

const KV_KEY = 'visitor_count'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Coba pakai Vercel KV (Redis) jika tersedia.
  const kvUrl = process.env.KV_REST_API_URL
  const kvToken = process.env.KV_REST_API_TOKEN

  if (kvUrl && kvToken) {
    try {
      // Increment counter
      const incrRes = await fetch(`${kvUrl}/incr/${KV_KEY}`, {
        headers: { Authorization: `Bearer ${kvToken}` },
      })
      const data = await incrRes.json()
      const count = data?.result || 0
      return res.status(200).json({ count })
    } catch (e) {
      return res.status(200).json({ count: null, error: 'KV error' })
    }
  }

  // Fallback: tanpa KV, return pesan untuk setup.
  return res.status(200).json({
    count: null,
    message: 'Visitor counter requires Vercel KV. Set up at vercel.com/dashboard > Storage.',
  })
}
