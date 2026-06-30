import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { luminaReply, type ChatMsg } from '@/lib/alchemist/lumina-brain'

export const maxDuration = 30

// ── WhatsApp Cloud API (Meta) bridge for Lumina ──────────────────────────────
// GET  → webhook verification handshake (Meta calls this once when you set the webhook).
// POST → an inbound WhatsApp message → Lumina replies → we send it back via the Graph API.
//
// Required Netlify env vars:
//   WHATSAPP_VERIFY_TOKEN   — any secret string you choose; paste the same one in Meta.
//   WHATSAPP_TOKEN          — the permanent access token from your Meta app (System User token).
//   WHATSAPP_PHONE_NUMBER_ID— the Phone Number ID of your WhatsApp Business number.
//   (NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY — reused, for conversation memory.)

const GRAPH = 'https://graph.facebook.com/v21.0'

function supa() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function sendWhatsApp(to: string, body: string) {
  const token = process.env.WHATSAPP_TOKEN
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID
  if (!token || !phoneId) {
    console.error('WhatsApp send skipped: missing WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID')
    return
  }
  const res = await fetch(`${GRAPH}/${phoneId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body: body.slice(0, 4000) } }),
  })
  if (!res.ok) console.error('WhatsApp send error:', res.status, await res.text().catch(() => ''))
}

// GET — Meta webhook verification
export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams
  const mode = p.get('hub.mode')
  const token = p.get('hub.verify_token')
  const challenge = p.get('hub.challenge')
  if (mode === 'subscribe' && token && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge ?? '', { status: 200 })
  }
  return new Response('Forbidden', { status: 403 })
}

// POST — inbound message
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const value = body?.entry?.[0]?.changes?.[0]?.value
    const msg = value?.messages?.[0]

    // Ignore delivery/read status callbacks and non-text events — ack with 200 so Meta stops retrying.
    if (!msg || msg.type !== 'text') return NextResponse.json({ ok: true })

    const from: string = msg.from
    const msgId: string = msg.id
    const text: string = msg.text?.body ?? ''
    if (!from || !text.trim()) return NextResponse.json({ ok: true })

    const db = supa()
    let history: ChatMsg[] = []

    // Load short conversation history + de-duplicate (Meta can re-deliver the same message).
    if (db) {
      const { data } = await db.from('wa_threads').select('messages,last_msg_id').eq('phone', from).maybeSingle()
      if (data?.last_msg_id === msgId) return NextResponse.json({ ok: true }) // already handled
      history = Array.isArray(data?.messages) ? (data!.messages as ChatMsg[]) : []
    }

    const convo: ChatMsg[] = [...history, { role: 'user' as const, content: text }].slice(-12)
    const reply = await luminaReply(convo, { whatsapp: true })

    await sendWhatsApp(from, reply || 'Estoy aquí contigo. ¿Cómo te sientes hoy?')

    // Persist the updated thread (server-only; RLS protected).
    if (db) {
      const updated = [...convo, { role: 'assistant' as const, content: reply }].slice(-12)
      await db.from('wa_threads').upsert(
        { phone: from, messages: updated, last_msg_id: msgId, updated_at: new Date().toISOString() },
        { onConflict: 'phone' },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('WhatsApp webhook error:', e)
    // Always 200 so Meta does not hammer retries on a transient error.
    return NextResponse.json({ ok: true })
  }
}
