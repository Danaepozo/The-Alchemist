import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export const maxDuration = 30

// Emails the Deep Soul Profile that Lyra generated, and captures the lead.
export async function POST(req: NextRequest) {
  try {
    const { name, email, profile, lang = 'es', shareWithBella = false } = await req.json()
    if (!email || !profile) {
      return NextResponse.json({ error: 'Email and profile are required.' }, { status: 400 })
    }
    const isSpanish = lang !== 'en'

    // 1) Save the lead + profile (best-effort) — record consent / appointment intent
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
        const { data } = await supabase
          .from('clients')
          .upsert({ name: name || 'Anonymous', email }, { onConflict: 'email' })
          .select('id').single()
        await supabase.from('assessments').insert({
          client_id: data?.id,
          answers: { source: 'lyra', wants_appointment: !!shareWithBella, consented_to_share: !!shareWithBella },
          soul_reading: String(profile),
        })
      } catch (e) { console.error('Lyra email DB error (non-fatal):', e) }
    }

    // 2) Send the email (best-effort)
    let emailed = false
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const formatted = String(profile)
          .replace(/\n/g, '<br>')
          .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#C9963C;">$1</strong>')
        await resend.emails.send({
          from: 'Lyra · Alchemized <onboarding@resend.dev>',
          to: email,
          subject: isSpanish ? '🌙 Tu Perfil Profundo del Alma — Lyra' : '🌙 Your Deep Soul Profile — Lyra',
          html: `<div style="background:#000;color:#F0E8D8;font-family:Georgia,serif;max-width:620px;margin:0 auto;padding:2.5rem 2rem;">
            <div style="text-align:center;margin-bottom:2.5rem;padding-bottom:1.5rem;border-bottom:1px solid rgba(201,150,60,0.2);">
              <div style="font-size:1.5rem;color:#C9963C;">✧ ⋆ ˚ ☾ ˚ ⋆ ✧</div>
              <h1 style="color:#C9963C;font-size:1.5rem;font-weight:300;letter-spacing:0.25em;margin:0.6rem 0 0;font-family:Georgia,serif;">LYRA</h1>
              <p style="color:rgba(240,232,216,0.4);font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;margin:0.5rem 0 0;">${isSpanish ? 'Tu Perfil del Alma' : 'Your Soul Profile'}${name ? ` · ${name}` : ''}</p>
            </div>
            <div style="background:rgba(224,96,144,0.05);border:1px solid rgba(201,150,60,0.18);padding:2rem;border-radius:4px;line-height:2;font-size:0.92rem;">${formatted}</div>
            <div style="text-align:center;margin-top:2.5rem;">
              <a href="https://the-alchemist-danae.netlify.app/booking" style="background:linear-gradient(135deg,#C9963C,#E4B85A);color:#000;padding:0.9rem 2rem;text-decoration:none;border-radius:2px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;font-size:0.78rem;display:inline-block;">
                ${isSpanish ? 'Continúa con Bella' : 'Continue with Bella'}
              </a>
            </div>
            <p style="text-align:center;margin-top:2rem;color:rgba(240,232,216,0.25);font-size:0.7rem;letter-spacing:0.08em;">Alchemized BioHealing Institute · Miami · Where science meets soul</p>
          </div>`,
        })
        emailed = true
      } catch (e) { console.error('Lyra email send error (non-fatal):', e) }
    }

    // 3) WITH the person's consent → send a copy to Bella so they can work together
    let sharedWithBella = false
    if (shareWithBella && process.env.RESEND_API_KEY && process.env.BELLA_NOTIFY_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const formatted = String(profile)
          .replace(/\n/g, '<br>')
          .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#C9963C;">$1</strong>')
        await resend.emails.send({
          from: 'Lyra · Alchemized <onboarding@resend.dev>',
          to: process.env.BELLA_NOTIFY_EMAIL,
          replyTo: email,
          subject: `💛 ${name || 'Una persona'} quiere una cita — Perfil del Alma (Lyra)`,
          html: `<div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;color:#1a1a1a;">
            <h2 style="color:#C9963C;margin:0 0 .5rem;">Nueva solicitud de cita desde Lyra</h2>
            <p><strong>${name || 'Sin nombre'}</strong> autorizó compartir su Perfil del Alma contigo para trabajarlo juntas.</p>
            <p>Email de contacto: <a href="mailto:${email}">${email}</a></p>
            <hr style="border:none;border-top:1px solid #e0d4b8;margin:1rem 0;"/>
            <div style="line-height:1.8;">${formatted}</div>
            <p style="color:#888;font-size:12px;margin-top:24px;">Compartido CON el consentimiento de la persona · Alchemized BioHealing Institute</p>
          </div>`,
        })
        sharedWithBella = true
      } catch (e) { console.error('Lyra Bella-copy error (non-fatal):', e) }
    }

    return NextResponse.json({ ok: true, emailed, sharedWithBella })
  } catch (e) {
    console.error('Lyra email error:', e)
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 })
  }
}
