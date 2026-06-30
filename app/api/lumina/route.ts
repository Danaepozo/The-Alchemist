import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { luminaReply, type ChatMsg } from '@/lib/alchemist/lumina-brain'

export async function POST(req: NextRequest) {
  try {
    const { messages, leadData } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Save lead if contact info provided
    if (leadData?.email && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
        await supabase.from('leads').upsert({
          email: leadData.email,
          phone: leadData.phone ?? null,
          source: 'lumina_chat',
          conversation: messages,
          status: 'new',
        }, { onConflict: 'email' })
      } catch (e) {
        console.error('Lead save error (non-fatal):', e)
      }
    }

    const reply = await luminaReply(messages as ChatMsg[])
    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Lumina API error:', error)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
