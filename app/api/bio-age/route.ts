import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { BIOAGE_SYSTEM_PROMPT } from '@/lib/alchemist/bioage-knowledge'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
export const maxDuration = 60

function sse(o: unknown) { return new TextEncoder().encode(JSON.stringify(o) + '\n') }

export async function POST(req: NextRequest) {
  let answers = '', chronoAge = 0, bioAge = 0, name = '', email = '', lang = 'es'
  try {
    const b = await req.json()
    answers = String(b.answers || ''); chronoAge = Number(b.chronoAge) || 0; bioAge = Number(b.bioAge) || 0
    name = String(b.name || ''); email = String(b.email || ''); lang = b.lang === 'en' ? 'en' : 'es'
  } catch {
    return new Response(sse({ type: 'error', error: 'Invalid request.' }), { status: 400 })
  }
  const isSpanish = lang !== 'en'

  const clientPrompt = `Genera el REPORTE PARA EL CLIENTE${name ? ' de ' + name : ''}.
Edad cronológica: ${chronoAge}. Edad biológica estimada: ${bioAge}.
Diferencia: ${bioAge - chronoAge} años.
Respuestas del test:
${answers}
Sigue EXACTAMENTE las reglas del CLIENT REPORT. Responde en ${isSpanish ? 'español' : 'inglés'}.`

  const readable = new ReadableStream({
    async start(controller) {
      let clientReport = ''
      try {
        const stream = client.messages.stream({
          model: 'claude-sonnet-4-6', max_tokens: 1700, system: BIOAGE_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: clientPrompt }],
        })
        for await (const e of stream) {
          if (e.type === 'content_block_delta' && (e.delta as any).type === 'text_delta') {
            const t = (e.delta as any).text; clientReport += t; controller.enqueue(sse({ type: 'delta', text: t }))
          } else controller.enqueue(sse({ type: 'ping' }))
        }

        // Doctor briefing (not streamed — emailed to the doctor)
        let doctorBrief = ''
        try {
          const d = await client.messages.create({
            model: 'claude-sonnet-4-6', max_tokens: 1200, system: BIOAGE_SYSTEM_PROMPT,
            messages: [{ role: 'user', content: `Genera el DOCTOR BRIEFING para el Dr. Meighen sobre ${name || 'esta persona'} (contacto: ${email || '—'}).
Edad cronológica: ${chronoAge}. Edad biológica estimada: ${bioAge} (${bioAge - chronoAge >= 0 ? '+' : ''}${bioAge - chronoAge} años).
Respuestas del test:
${answers}
Sigue EXACTAMENTE las reglas del DOCTOR BRIEFING. Responde en ${isSpanish ? 'español' : 'inglés'}.` }],
          })
          doctorBrief = d.content.map(c => (c.type === 'text' ? c.text : '')).join('')
        } catch (e) { console.error('bio-age doctor brief error:', e) }

        // Save lead (best-effort)
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && email) {
          try {
            const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
            const { data } = await supabase.from('clients').upsert({ name: name || 'Anonymous', email }, { onConflict: 'email' }).select('id').single()
            await supabase.from('assessments').insert({ client_id: data?.id, answers: { source: 'bio-age', chronoAge, bioAge, detail: answers, doctor_briefing: doctorBrief }, soul_reading: clientReport })
          } catch (e) { console.error('bio-age DB error:', e) }
        }

        // Emails (best-effort): client gets their report, doctor gets the briefing
        if (process.env.RESEND_API_KEY) {
          const resend = new Resend(process.env.RESEND_API_KEY)
          const fmt = (s: string) => s.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong style="color:#C9963C;">$1</strong>')
          if (email) {
            try {
              await resend.emails.send({
                from: 'Alchemized Longevity <onboarding@resend.dev>', to: email,
                subject: isSpanish ? `🧬 Tu Edad Biológica: ${bioAge} años — Alchemized` : `🧬 Your Biological Age: ${bioAge} — Alchemized`,
                html: `<div style="background:#000;color:#F0E8D8;font-family:Georgia,serif;max-width:620px;margin:0 auto;padding:2.2rem 2rem;">
                  <div style="text-align:center;margin-bottom:1.6rem;padding-bottom:1.2rem;border-bottom:1px solid rgba(61,200,152,0.25);">
                    <h1 style="color:#3DC898;font-size:1.3rem;font-weight:300;letter-spacing:0.18em;margin:0;">ALCHEMIZED · LONGEVITY</h1>
                    <p style="color:#E4B85A;font-size:2rem;margin:0.6rem 0 0;font-family:Georgia,serif;">${isSpanish ? 'Edad biológica' : 'Biological age'}: ${bioAge}</p>
                    <p style="color:rgba(240,232,216,0.4);font-size:0.75rem;margin:0.2rem 0 0;">${isSpanish ? 'cronológica' : 'chronological'}: ${chronoAge}${name ? ' · ' + name : ''}</p>
                  </div>
                  <div style="background:rgba(61,200,152,0.05);border:1px solid rgba(201,150,60,0.18);padding:1.8rem;border-radius:4px;line-height:1.9;font-size:0.9rem;">${fmt(clientReport)}</div>
                  <div style="text-align:center;margin-top:2rem;"><a href="https://the-alchemist-danae.netlify.app/booking" style="background:linear-gradient(135deg,#3DC898,#C9963C);color:#06201a;padding:0.9rem 2rem;text-decoration:none;border-radius:2px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;font-size:0.78rem;">${isSpanish ? 'Agenda con el Dr. Meighen' : 'Book with Dr. Meighen'}</a></div>
                </div>`,
              })
            } catch (e) { console.error('bio-age client email error:', e) }
          }
          // PRIVACY: the doctor gets only a NOTIFICATION (no clinical detail). The full
          // pre-appointment profile lives in the private Studio (RLS-protected DB), viewed behind login.
          const doctorTo = process.env.DOCTOR_EMAIL || process.env.BELLA_NOTIFY_EMAIL
          if (doctorTo) {
            try {
              await resend.emails.send({
                from: 'Alchemized Longevity <onboarding@resend.dev>', to: doctorTo,
                subject: `🧬 Nuevo perfil pre-cita — ${name || 'sin nombre'}`,
                html: `<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
                  <h2 style="color:#3DC898;margin:0 0 .5rem;">Nuevo perfil de longevidad</h2>
                  <p><strong>${name || 'Una persona'}</strong> completó la evaluación de edad biológica${email ? ` (${email})` : ''}.</p>
                  <p style="color:#555;">El perfil completo y el briefing clínico te esperan en tu <strong>espacio privado</strong> (no se envían por correo, por confidencialidad médica).</p>
                  <div style="text-align:center;margin:1.6rem 0;">
                    <a href="https://the-alchemist-danae.netlify.app/studio" style="background:linear-gradient(135deg,#3DC898,#C9963C);color:#06201a;padding:0.8rem 1.8rem;text-decoration:none;border-radius:3px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;font-size:0.76rem;">Abrir en Studio</a>
                  </div>
                  <p style="color:#999;font-size:11px;">Aviso confidencial · sin datos clínicos · Alchemized BioHealing Institute</p>
                </div>`,
              })
            } catch (e) { console.error('bio-age doctor email error:', e) }
          }
        }

        controller.enqueue(sse({ type: 'done' }))
      } catch (e) {
        console.error('bio-age error:', e)
        controller.enqueue(sse({ type: 'error', error: 'No se pudo generar el reporte.' }))
      }
      controller.close()
    },
  })

  return new Response(readable, { headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' } })
}
