import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(req: NextRequest) {
  const supabase = getSupabase()
  const acknowledged = req.nextUrl.searchParams.get('acknowledged') === 'true'

  const query = supabase
    .from('orion_alerts')
    .select('*, orion_patients(full_name), orion_protocols(protocol_name)')
    .order('severity', { ascending: true })
    .order('created_at', { ascending: false })

  if (!acknowledged) query.eq('acknowledged', false)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase()
  const body = await req.json()

  const { data, error } = await supabase
    .from('orion_alerts')
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const supabase = getSupabase()
  const { id, ...updates } = await req.json()

  const { data, error } = await supabase
    .from('orion_alerts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
