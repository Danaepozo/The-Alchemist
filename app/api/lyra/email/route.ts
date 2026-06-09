import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import Anthropic from '@anthropic-ai/sdk'

const ai = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const BELLA_BRIEFING_PROMPT = `Eres la asistente de Holistic Bella. A partir del Perfil del Alma de una persona que quiere una cita, genera un BRIEFING ESTRATÉGICO PARA BELLA (no para la persona) — para que Bella llegue a la sesión sabiendo exactamente qué trabajar. Conciso, escaneable, cálido pero profesional, en español. Estructura con títulos en **negrita**:
**Tema central del alma** (la herida/lección que se repite)
**Patrones y defensas** (cómo se protege, qué evita)
**Lo que más necesita** (la necesidad profunda)
**Enfoque sugerido para la sesión** (por dónde empezar, con qué cuidado)
**Servicios de Bella recomendados** (retiro, IV therapy, coaching/mentoría, ceremonia, programa — los más afines)
**Señales de cautela** (si hay algo delicado/crisis, márcalo).
No diagnostiques patologías; es una guía intuitiva-estratégica.`

export const maxDuration = 45

// Emails the Deep Soul Profile that Lyra generated, and captures the lead.
export async function POST(req: NextRequest) {
  try {
    const { name, email, profile, lang = 'es', shareWithBella = false } = await req.json()
    if (!email || !profile) {
      return NextResponse.json({ error: 'Email and profile are required.' }, { status: 400 })
    }
    const isSpanish = lang !== 'en'

    // 1) WITH the person's consent → generate Bella's STRATEGIC briefing first, so we can store it privately
    let briefing = ''
    if (shareWithBella) {
      try {
        const r = await ai.messages.create({
          model: 'claude-sonnet-4-6', max_tokens: 1000, system: BELLA_BRIEFING_PROMPT,
          messages: [{ role: 'user', content: `Perfil del Alma de ${name || 'la persona'} (contacto: ${email || '—'}):\n\n${String(profile)}\n\nGenera el briefing estratégico para Bella.` }],
        })
        briefing = r.content.map(c => (c.type === 'text' ? c.text : '')).join('')
      } catch (e) { console.error('Lyra briefing gen error:', e) }
    }

    // 2) Save the lead + profile + briefing PRIVATELY (RLS-protected, server-only) — never exposed publicly
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
        const { data } = await supabase
          .from('clients')
          .upsert({ name: name || 'Anonymous', email }, { onConflict: 'email' })
          .select('id').single()
        await supabase.from('assessments').insert({
          client_id: data?.id,
          answers: { source: 'lyra', wants_appointment: !!shareWithBella, consented_to_share: !!shareWithBella, bella_briefing: briefing },
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

    // 3) WITH consent → NOTIFY Bella (notification only, NO soul content). The full briefing + profile
    //    live in the private Studio (RLS-protected DB), viewed behind login — never sent by email.
    let sharedWithBella = false
    if (shareWithBella && process.env.RESEND_API_KEY && process.env.BELLA_NOTIFY_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'Lyra · Alchemized <onboarding@resend.dev>',
          to: process.env.BELLA_NOTIFY_EMAIL,
          subject: `💛 ${name || 'Una persona'} quiere una cita contigo`,
          html: `<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
            <h2 style="color:#C9963C;margin:0 0 .5rem;">Nueva persona desde Lyra</h2>
            <p><strong>${name || 'Una persona'}</strong> completó su Perfil del Alma y <strong>autorizó compartir contigo</strong> para trabajarlo juntas${email ? ` (${email})` : ''}.</p>
            <p style="color:#555;">Tu briefing estratégico y el perfil completo te esperan en tu <strong>espacio privado</strong> (no se envían por correo, por confidencialidad).</p>
            <div style="text-align:center;margin:1.6rem 0;">
              <a href="https://the-alchemist-danae.netlify.app/studio" style="background:linear-gradient(135deg,#C9963C,#E4B85A);color:#000;padding:0.8rem 1.8rem;text-decoration:none;border-radius:3px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;font-size:0.76rem;">Abrir en Studio</a>
            </div>
            <p style="color:#999;font-size:11px;">Compartido con el consentimiento de la persona · Alchemized BioHealing Institute</p>
          </div>`,
        })
        sharedWithBella = true
      } catch (e) { console.error('Lyra Bella-notify error (non-fatal):', e) }
    }

    return NextResponse.json({ ok: true, emailed, sharedWithBella })
  } catch (e) {
    console.error('Lyra email error:', e)
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 })
  }
}
