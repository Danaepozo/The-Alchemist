import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'
import { checkStudioCode } from '@/lib/alchemist/studio-access'

export const maxDuration = 20

// Generates a UNIQUE, single-use Lyra invite link that expires in 24h.
// Gated by the Studio passcode — only Bella/Danae can create invites.
export async function POST(req: NextRequest) {
  let code = '', label = '', hours = 24
  try {
    const b = await req.json()
    code = b.code; label = String(b.label || ''); hours = Number(b.hours) > 0 ? Number(b.hours) : 24
  } catch { /* ignore */ }

  if (!checkStudioCode(code)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'no-db' }, { status: 500 })
  }

  const token = `${randomUUID()}${randomUUID()}`.replace(/-/g, '')
  const expiresAt = new Date(Date.now() + hours * 3600 * 1000).toISOString()

  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    const { error } = await supabase.from('lyra_invites').insert({ token, label: label || null, expires_at: expiresAt })
    if (error) throw error
    const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin
    return NextResponse.json({ ok: true, url: `${origin}/lyra?invite=${token}`, token, expiresAt })
  } catch (e) {
    console.error('lyra invite create error:', e)
    return NextResponse.json({ error: 'create-failed' }, { status: 500 })
  }
}
