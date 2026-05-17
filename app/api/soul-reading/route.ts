import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { SOUL_READING_SYSTEM_PROMPT } from '@/lib/alchemist/soul-knowledge-base'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { answers, name, email, lang = 'en' } = await req.json()
    const isSpanish = lang === 'es'

    const userPrompt = isSpanish
      ? `Genera una Lectura del Alma profunda y clínica para ${name || 'esta persona'}.

RESPUESTAS DE LA EVALUACIÓN:
${Object.entries(answers).map(([k, v]) => `[${k}]: ${v}`).join('\n\n')}

Aplica TODOS los marcos de conocimiento relevantes que hayas recibido. Detecta patrones, heridas, dinámicas familiares, lecturas del cuerpo según biodescodificación, y el mapa chakral implícito en estas respuestas.

Estructura tu lectura así (usa **Texto en Negrita** para cada título, NO encabezados con ##):

**Tu Estado Actual**
Lo que sus respuestas revelan como el patrón central en este momento — el denominador común de todo lo que comparte.

**Lo que Bella Ve**
La lectura energética y espiritual profunda — constelaciones familiares, patrones ancestrales, cuerpo emocional, chakras bloqueados. Nombra los patrones específicos con precisión.

**Lo que el Dr. Meighen Ve**
La perspectiva clínica — qué marcadores funcionales o psicosomáticos probablemente están presentes, qué están diciendo los síntomas físicos según biodescodificación, qué patrones de estrés están afectando la biología.

**El Trabajo de la Sombra**
Qué material de sombra (Jung) se detecta claramente. Qué está siendo proyectado. Qué parte del yo oculto es, paradójicamente, la fuente de su mayor poder sin descubrir.

**El Sistema Familiar**
Qué dinámicas de constelaciones familiares (Hellinger) están operando. Qué lealtades inconscientes, exclusiones o patrones de repetición son visibles.

**Tu Camino de Sanación**
Los servicios, modalidades y prácticas específicas de The Alchemist que abordarían directamente este perfil. Concreto y personalizado.

**Tu Primera Alquimia**
Una invitación sagrada y personalizada para comenzar con la sesión First Alchemy ($199). Cálida, precisa, que se sienta como destino.

**Un Mensaje para Tu Alma**
Una frase final de transformación escrita directamente a esta persona — poderosa, poética, ganada.

Escríbelo completamente en español. Sé específico, no genérico. Cada frase debe tener peso.`
      : `Generate a deep, clinical Soul Reading for ${name || 'this person'}.

ASSESSMENT ANSWERS:
${Object.entries(answers).map(([k, v]) => `[${k}]: ${v}`).join('\n\n')}

Apply ALL relevant knowledge frameworks you have received. Detect patterns, wounds, family dynamics, body readings per biodescodificación, and the implicit chakra map in these answers.

Structure your reading as follows (use **Bold Text** for each title, NO ## headers):

**Your Current State**
What their answers reveal as the central pattern right now — the common denominator across everything they share.

**Bella Sees**
The deep energetic and spiritual reading — family constellations, ancestral patterns, emotional body, blocked chakras. Name specific patterns with precision.

**Dr. Meighen Sees**
The clinical perspective — what functional or psychosomatic markers are likely present, what the physical symptoms are saying per biodescodificación, what stress patterns are affecting their biology.

**Shadow Work**
What shadow material (Jung) is clearly detectable. What is being projected. What part of the hidden self is, paradoxically, the source of their greatest undiscovered power.

**The Family System**
What family constellation dynamics (Hellinger) are operating. What unconscious loyalties, exclusions, or repetition patterns are visible.

**Your Healing Path**
The specific services, modalities, and practices from The Alchemist that would directly address this profile. Concrete and personalized.

**Your First Alchemy**
A sacred, personalized invitation to begin with the First Alchemy session ($199). Warm, precise, feeling like destiny.

**A Message for Your Soul**
A final transformational sentence written directly to this person — powerful, poetic, earned.

Write it entirely in English. Be specific, not generic. Every sentence must carry weight.`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: SOUL_READING_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const soulReading = response.content[0].type === 'text' ? response.content[0].text : ''

    // Save to Supabase
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        )
        let clientId: string | undefined
        if (email) {
          const { data: clientData } = await supabase
            .from('clients')
            .upsert({ name: name || 'Anonymous', email }, { onConflict: 'email' })
            .select('id')
            .single()
          clientId = clientData?.id
        }
        await supabase.from('assessments').insert({
          client_id: clientId,
          answers,
          soul_reading: soulReading,
        })
      } catch (dbError) {
        console.error('DB save error (non-fatal):', dbError)
      }
    }

    // Send email
    if (process.env.RESEND_API_KEY && email) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const emailSubject = isSpanish
          ? '✨ Tu Lectura del Alma — The Alchemist Miami'
          : '✨ Your Soul Reading — The Alchemist Miami'
        const emailBtn = isSpanish
          ? 'Comienza Tu Primera Alquimia — $199'
          : 'Begin Your First Alchemy — $199'

        const formattedReading = soulReading
          .replace(/\n/g, '<br>')
          .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#C9963C;letter-spacing:0.05em;">$1</strong>')

        await resend.emails.send({
          from: 'The Alchemist <onboarding@resend.dev>',
          to: email,
          subject: emailSubject,
          html: `
            <div style="background:#000;color:#F0E8D8;font-family:Georgia,serif;max-width:620px;margin:0 auto;padding:2.5rem 2rem;">
              <div style="text-align:center;margin-bottom:2.5rem;padding-bottom:1.5rem;border-bottom:1px solid rgba(201,150,60,0.2);">
                <div style="font-size:1.8rem;color:#C9963C;margin-bottom:0.5rem;">☿</div>
                <h1 style="color:#C9963C;font-size:1.6rem;font-weight:300;letter-spacing:0.25em;margin:0;font-family:Georgia,serif;">THE ALCHEMIST</h1>
                <p style="color:rgba(240,232,216,0.35);font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;margin:0.5rem 0 0;">
                  ${isSpanish ? 'Lectura del Alma' : 'Soul Reading'}${name ? ` · ${name}` : ''}
                </p>
              </div>
              <div style="background:rgba(201,150,60,0.05);border:1px solid rgba(201,150,60,0.2);padding:2rem;border-radius:4px;line-height:1.95;font-size:0.9rem;">
                ${formattedReading}
              </div>
              <div style="text-align:center;margin-top:2.5rem;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://thealchemist.miami'}/booking"
                   style="background:linear-gradient(135deg,#C9963C,#E4B85A);color:#000;padding:0.9rem 2rem;text-decoration:none;border-radius:2px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;font-size:0.78rem;display:inline-block;">
                  ${emailBtn}
                </a>
              </div>
              <p style="text-align:center;margin-top:2rem;color:rgba(240,232,216,0.2);font-size:0.72rem;letter-spacing:0.08em;">
                The Alchemist Miami · thealchemist.miami
              </p>
            </div>
          `,
        })
      } catch (emailError) {
        console.error('Email send error (non-fatal):', emailError)
      }
    }

    return NextResponse.json({ soulReading })
  } catch (error) {
    console.error('Soul reading error:', error)
    return NextResponse.json({ error: 'Failed to generate reading' }, { status: 500 })
  }
}
