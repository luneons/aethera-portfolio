import { getFallbackResponse } from '../data/chatPersona'

// Mengirim history percakapan ke /api/chat (proxy OpenRouter).
// Jika gagal (mis. dev tanpa serverless, atau API error), pakai fallback scripted.
export async function sendChat(messages, lastChoice) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()
    if (data?.error || typeof data.reply !== 'string') {
      throw new Error(data?.error || 'Invalid response')
    }

    return {
      reply: data.reply,
      choices: data.choices?.length
        ? data.choices
        : getFallbackResponse(lastChoice).choices,
      source: 'ai',
    }
  } catch {
    const fb = getFallbackResponse(lastChoice)
    return { ...fb, source: 'fallback' }
  }
}
