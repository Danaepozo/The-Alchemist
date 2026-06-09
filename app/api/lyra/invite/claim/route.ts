import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'
import { LYRA_CODE } from '@/lib/alchemist/lyra-access'

export const maxDuration = 20

// Validates a Lyra invite link. Single-use + 24h expiry + non-forwardable:
// the first device to open it CLAIMS it (binds a secret); other devices opening
// the same link afterward are rejected. The legit device re-enters with its secret.
export async function POST(req: NextRequest) {
  let token = '', secret = ''
  try {
    const b = await req.json()
    token = String(b.token || ''); secret = String(b.secret || '')
  } catch { /* ignore */ }

  if (!token) return NextResponse.json({ ok: false, reason: 'missing' }, { status: 400 })
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ ok: false, reason: 'no-db' }, { status: 500 })
  }

  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    const { data: row } = await supabase
      .from('lyra_invites')
      .select('id, expires_at, claimed, claim_secret, revoked')
      .eq('token', token).single()

    if (!row || row.revoked) return NextResponse.json({ ok: false, reason: 'invalid' })
    if (new Date(row.expires_at).getTime() < Date.now()) return NextResponse.json({ ok: false, reason: 'expired' })

    // Already claimed → only the original device (matching secret) may re-enter.
    if (row.claimed) {
      if (secret && secret === row.claim_secret) {
        return NextResponse.json({ ok: true, code: LYRA_CODE, secret })
      }
      return NextResponse.json({ ok: false, reason: 'used' })
    }

    // First open → claim it and bind a secret to this device.
    const newSecret = randomUUID()
    const { error } = await supabase.from('lyra_invites')
      .update({ claimed: true, claimed_at: new Date().toISOString(), claim_secret: newSecret })
      .eq('id', row.id).eq('claimed', false)
    if (error) throw error
    return NextResponse.json({ ok: true, code: LYRA_CODE, secret: newSecret })
  } catch (e) {
    console.error('lyra invite claim error:', e)
    return NextResponse.json({ ok: false, reason: 'error' }, { status: 500 })
  }
}
