import { NextRequest, NextResponse } from 'next/server'
import { checkLyraCode } from '@/lib/alchemist/lyra-access'

// Lightweight access-code check for the Lyra gate (no AI call).
export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()
    return NextResponse.json({ ok: checkLyraCode(code) })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
