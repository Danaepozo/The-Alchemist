import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkStudioCode } from '@/lib/alchemist/studio-access'

export const maxDuration = 20

// Sends a branded "thank you — please leave us a review" email with the Google review link.
// Gated by the Studio passcode. Set GOOGLE_REVIEW_URL in Netlify (from your Google Business Profile).
export async function POST(req: NextRequest) {
  let code = '', name = '', email = '', lang = 'es'
  try {
    const b = await req.json()
    code = b.code; name = String(b.name || ''); email = String(b.email || ''); lang = b.lang === 'en' ? 'en' : 'es'
  } catch { /* ignore */ }

  if (!checkStudioCode(code)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })

  const reviewUrl = process.env.GOOGLE_REVIEW_URL || ''
  if (!reviewUrl) return NextResponse.json({ error: 'no-review-url' }, { status: 400 })
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: 'no-resend' }, { status: 400 })

  const isEs = lang !== 'en'
  const first = (name || '').split(' ')[0]
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Alchemized BioHealing <hola@alchemizedbiohealing.com>',
      to: email,
      subject: isEs ? `✨ ${first ? first + ', g' : 'G'}racias por tu visita — ¿nos dejas una reseña?` : `✨ ${first ? first + ', t' : 'T'}hank you for visiting — would you leave us a review?`,
      html: `<div style="background:#000;color:#F0E8D8;font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:2.4rem 2rem;text-align:center;">
        <div style="font-size:1.4rem;color:#C9963C;letter-spacing:.2em;">✦ ALCHEMIZED</div>
        <p style="color:rgba(240,232,216,0.5);font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;margin:.4rem 0 2rem;">BioHealing Institute</p>
        <p style="font-size:1.05rem;line-height:1.8;">${isEs ? `${first ? first + ',' : ''} fue un honor recibirte. 🌿<br>Tu experiencia inspira a otros a comenzar su propio viaje.` : `${first ? first + ',' : ''} it was an honor to host you. 🌿<br>Your experience inspires others to begin their own journey.`}</p>
        <p style="font-size:1.05rem;line-height:1.8;margin-bottom:2rem;">${isEs ? '¿Nos regalas <strong>2 minutos</strong> para dejar una reseña?' : 'Would you gift us <strong>2 minutes</strong> to leave a review?'}</p>
        <a href="${reviewUrl}" style="background:linear-gradient(135deg,#C9963C,#E4B85A);color:#000;padding:1rem 2.4rem;text-decoration:none;border-radius:3px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.8rem;display:inline-block;">${isEs ? '⭐ Dejar mi reseña' : '⭐ Leave my review'}</a>
        <p style="color:rgba(240,232,216,0.3);font-size:.7rem;margin-top:2.4rem;">Alchemized BioHealing Institute · Miami · Where science meets soul</p>
      </div>`,
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('review email error:', e)
    return NextResponse.json({ error: 'send-failed' }, { status: 500 })
  }
}
