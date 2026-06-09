import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkStudioCode } from '@/lib/alchemist/studio-access'

export const maxDuration = 30

// Private records inbox. Returns recent profiles (bio-age + Lyra) ONLY to a valid passcode.
// Data never leaves the server unless the code matches; the public/anon key cannot read these tables (RLS).
export async function POST(req: NextRequest) {
  let code = ''
  try { code = (await req.json())?.code } catch { /* ignore */ }
  if (!checkStudioCode(code)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ entries: [] })
  }
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    const { data: rows } = await supabase
      .from('assessments')
      .select('id, client_id, answers, soul_reading, created_at')
      .order('created_at', { ascending: false })
      .limit(100)

    const ids = Array.from(new Set((rows || []).map(r => r.client_id).filter(Boolean)))
    const nameByClient: Record<string, { name: string; email: string }> = {}
    if (ids.length) {
      const { data: clients } = await supabase.from('clients').select('id, name, email').in('id', ids)
      for (const c of clients || []) nameByClient[c.id] = { name: c.name, email: c.email }
    }

    const entries = (rows || []).map(r => {
      const a = (r.answers || {}) as Record<string, unknown>
      const source = String(a.source || 'other')
      const who = (r.client_id && nameByClient[r.client_id]) || { name: 'Anónimo', email: '' }
      return {
        id: r.id,
        created_at: r.created_at,
        source,
        name: who.name || 'Anónimo',
        email: who.email || '',
        // bio-age summary
        bioAge: typeof a.bioAge === 'number' ? a.bioAge : null,
        chronoAge: typeof a.chronoAge === 'number' ? a.chronoAge : null,
        wantsAppointment: !!a.wants_appointment,
        consented: !!a.consented_to_share,
        // the private content
        clientReport: r.soul_reading || '',
        briefing: String(a.doctor_briefing || a.bella_briefing || ''),
        detail: String(a.detail || ''),
      }
    })
    return NextResponse.json({ entries })
  } catch (e) {
    console.error('studio list error:', e)
    return NextResponse.json({ entries: [] })
  }
}
