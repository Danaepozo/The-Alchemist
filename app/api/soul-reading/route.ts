import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { answers, name, email, lang = 'en' } = await req.json()

    const isSpanish = lang === 'es'

    const prompt = isSpanish
      ? `Eres el oráculo integrador de The Alchemist Miami — una fusión de la sabiduría de Bella Vargas (sanadora holística, Maestra de Reiki, especialista en Medicina Ancestral) y el Dr. Michael J. Meighen (Medicina de Precisión, Medicina Funcional, Optimización Hormonal, Terapia de Péptidos).

Basándote en esta Evaluación del Alma, crea una "Lectura del Alma" profundamente personal para ${name || 'esta persona'}:

RESPUESTAS DE LA EVALUACIÓN:
${JSON.stringify(answers, null, 2)}

Crea una Lectura del Alma con estas secciones. Escríbela completamente en español:

**Tu Estado Actual**
2-3 oraciones sobre lo que sus respuestas revelan holísticamente — el patrón más visible en este momento.

**Lo que Bella Ve**
Lectura espiritual/energética — lo que Bella observaría en la energía de esta persona, patrones del sistema nervioso, cuerpo emocional e influencias ancestrales. Íntimo, preciso, visionario.

**Lo que el Dr. Meighen Ve**
Perspectiva clínica — qué marcadores de medicina funcional podrían explicar sus síntomas físicos, qué patrones hormonales o celulares podrían estar en juego. Específico y basado en evidencia.

**Tu Camino Recomendado**
Los servicios y protocolos específicos de The Alchemist que les servirían mejor, con una breve explicación del porqué. Personalizado para su perfil.

**Tu Primera Alquimia**
Una invitación personalizada para comenzar con la sesión First Alchemy ($199) — que se sienta como una invitación sagrada, no como una venta. Cálida y precisa.

**Un Mensaje para Tu Alma**
Una oración final poética y poderosa escrita directamente para esta persona — transformadora y profunda.

Escríbelo en español. Hazlo sentir como una lectura privada — íntima, precisa, sin usar encabezados con ##. Usa **texto en negrita** para los títulos de sección.`
      : `You are the integrative oracle of The Alchemist Miami — a fusion of the wisdom of Bella Vargas (holistic healer, Reiki Master, Ancestral Medicine specialist) and Dr. Michael J. Meighen (Precision Medicine, Functional Medicine, Hormone Optimization, Peptide Therapy).

Based on this Soul Assessment, create a deeply personal "Soul Reading" for ${name || 'this person'}:

ASSESSMENT ANSWERS:
${JSON.stringify(answers, null, 2)}

Create a Soul Reading with these sections. Write it entirely in English:

**Your Current State**
2-3 sentences about what their answers reveal holistically — the most visible pattern right now.

**Bella Sees**
Spiritual/energetic reading — what Bella would observe in this person's energy, nervous system patterns, emotional body, and ancestral influences. Intimate, precise, visionary.

**Dr. Meighen Sees**
Clinical perspective — what functional medicine markers might explain their physical symptoms, what hormonal or cellular patterns could be at play. Specific and evidence-based.

**Your Recommended Path**
The specific services and protocols from The Alchemist that would serve them best, with a brief explanation why. Personalized to their profile.

**Your First Alchemy**
A personalized invitation to begin with The First Alchemy session ($199) — make it feel like a sacred invitation, not a sales pitch. Warm and precise.

**A Message for Your Soul**
A poetic, powerful closing sentence written directly to this person — transformational and deep.

Write it entirely in English. Make it feel like a private reading — intimate and precise. Do NOT use ## headers. Use **bold text** for section titles.`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1400,
      messages: [{ role: 'user', content: prompt }],
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

        await resend.emails.send({
          from: 'The Alchemist <onboarding@resend.dev>',
          to: email,
          subject: emailSubject,
          html: `
            <div style="background:#000;color:#F0E8D8;font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:2rem;">
              <div style="text-align:center;margin-bottom:2rem;">
                <div style="font-size:2rem;color:#C9963C;margin-bottom:0.5rem;">☿</div>
                <h1 style="color:#C9963C;font-size:1.8rem;font-weight:300;letter-spacing:0.2em;margin:0;">THE ALCHEMIST</h1>
                <p style="color:rgba(240,232,216,0.4);font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;margin-top:0.5rem;">
                  ${isSpanish ? 'Lectura del Alma' : 'Soul Reading'}${name ? ` · ${name}` : ''}
                </p>
              </div>
              <div style="background:rgba(201,150,60,0.06);border:1px solid rgba(201,150,60,0.25);padding:2rem;border-radius:4px;white-space:pre-wrap;line-height:1.9;font-size:0.92rem;">
                ${soulReading.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong style="color:#C9963C;">$1</strong>')}
              </div>
              <div style="text-align:center;margin-top:2.5rem;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://thealchemist.miami'}/booking"
                   style="background:linear-gradient(135deg,#C9963C,#E4B85A);color:#000;padding:0.875rem 2rem;text-decoration:none;border-radius:2px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;font-size:0.82rem;display:inline-block;">
                  ${emailBtn}
                </a>
              </div>
              <p style="text-align:center;margin-top:2rem;color:rgba(240,232,216,0.25);font-size:0.75rem;letter-spacing:0.08em;">
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
