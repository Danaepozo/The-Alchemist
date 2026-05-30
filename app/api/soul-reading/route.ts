import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { SOUL_READING_SYSTEM_PROMPT } from '@/lib/alchemist/soul-knowledge-base'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { answers, tags, name, email, lang = 'en' } = await req.json()
    const isSpanish = lang === 'es'

    // Detect addiction patterns from tags
    const addictionTags = (tags as string[]).filter((t: string) => t.startsWith('addiction_'))
    const hasAddictions = addictionTags.length > 0
    const addictionTypes = addictionTags.map((t: string) => t.replace('addiction_', ''))

    const prompt = isSpanish
      ? `Eres el analista del alma de Alchemized BioHealing Institute — el más preciso, compasivo y brutalmente honesto del mundo.

Tienes acceso al siguiente perfil de ${name || 'esta persona'} basado en sus respuestas:

RESPUESTAS:
${answers}

PERFIL PSICOLÓGICO DETECTADO (interno — no revelar las etiquetas):
${(tags as string[]).join(', ')}

${hasAddictions ? `PATRONES DE ADICCIÓN DETECTADOS: ${addictionTypes.join(', ')} — incorpora esto en la lectura con precisión y compasión.` : ''}

Genera una Lectura del Alma que parezca que conoces a esta persona de toda la vida. Debes escribir como el más brillante psicoanalista que jamás ha existido — que ve todo, que no juzga nada, y que tiene el valor de decir la verdad con amor.

REGLAS ABSOLUTAS:
- NUNCA menciones nombres de frameworks, teorías o autores (sin "constelaciones familiares", sin "sombra", sin "Jung", sin "apego ansioso", sin "biodescodificación")
- Escribe como si simplemente VES lo que está pasando — no como si lo diagnosticas
- Usa segunda persona íntima ("Tú llevas...", "Lo que sientes es...", "El patrón que vive en ti...")
- Sé específico/a — no genérico. Nombra el patrón real.
- Que cada frase toque el alma — que se reconozcan a sí mismos en cada línea
- No uses bullets ni listas — párrafos fluidos como una conversación profunda
- Usa **texto en negrita** para los títulos de sección — sin ##

Estructura (títulos poderosos, inesperados, nunca clínicos):

**Lo que realmente cargas**
El patrón central que se ve en TODO lo que respondieron. Lo que viven sin nombrarlo.

**Lo que tu cuerpo lleva diciendo**
Lectura de los síntomas físicos como mensajes — sin jerga médica. Conectar el síntoma con la emoción no dicha.

**Lo que aprendiste que era el amor**
La herida de apego y cómo moldea todas sus relaciones adultas. Nombrar el ciclo sin nombrarlo como ciclo.

**Lo que haces cuando duele**
${hasAddictions ? `Nombrar directamente los patrones de adicción/escape (${addictionTypes.join(', ')}) con compasión total — el por qué detrás del qué.` : 'Los mecanismos de defensa y formas de escape — con compasión, no juicio.'}

**Lo que viene de antes de ti**
Los patrones que heredaron — sin mencionar constelaciones. Simplemente: "Hay algo en tu familia que..."

**Lo que más necesitas y no te permites pedir**
La necesidad más profunda debajo de todo — con frases que los hagan llorar de reconocimiento.

**Lo que eres capaz de ser**
La versión sanada — el potencial real que ven en sus respuestas. No positivo por defecto — ganado.

**Lo que Alchemized BioHealing puede hacer por ti**
Una invitación específica y personalizada. SIEMPRE recomienda por nombre UN paquete o membresía concreta que encaje con esta persona, eligiendo entre: el "Stress Relief & High Frequency Package" (entrada), la "Loving Myself Membership", la "Soulmates Dates Membership", la "My Sacred Family Wellness Membership", o la membresía fundadora "Inner Alchemy". Explica en una frase por qué ese es su primer paso. Sin sonar a ventas — como un siguiente paso natural.

**Un mensaje para tu alma**
Una sola oración final. La más poderosa del documento. Que se la tatúen en el corazón.

Escríbelo completamente en español. Longitud: profundo, no largo. Cada párrafo debe ganar su lugar.`

      : `You are Alchemized BioHealing Institute's soul analyst — the most precise, compassionate, and brutally honest profiler in the world.

You have access to the following profile of ${name || 'this person'} based on their responses:

ANSWERS:
${answers}

DETECTED PSYCHOLOGICAL PROFILE (internal — never reveal these labels):
${(tags as string[]).join(', ')}

${hasAddictions ? `DETECTED ADDICTION/ESCAPE PATTERNS: ${addictionTypes.join(', ')} — incorporate this into the reading with precision and full compassion.` : ''}

Generate a Soul Reading that feels like you have known this person their entire life. Write as the most brilliant soul analyst who has ever existed — one who sees everything, judges nothing, and has the courage to speak the truth with love.

ABSOLUTE RULES:
- NEVER mention framework names, theories, or authors (no "family constellations," no "shadow," no "Jung," no "anxious attachment," no "biodescodification")
- Write as if you simply SEE what is happening — not as if you're diagnosing it
- Use intimate second person ("You carry...", "What you feel is...", "The pattern that lives in you...")
- Be specific — not generic. Name the actual pattern.
- Make every sentence touch the soul — they should recognize themselves in every line
- No bullets or lists — flowing paragraphs like a deep conversation
- Use **bold text** for section titles — no ##

Structure (powerful, unexpected section titles — never clinical):

**What You're Actually Carrying**
The central pattern that shows up across everything they answered. What they've been living without naming it.

**What Your Body Has Been Saying**
Reading the physical symptoms as messages — no medical jargon. Connect symptom to unspoken emotion.

**What You Learned That Love Was**
The attachment wound and how it shapes every adult relationship. Name the cycle without calling it a cycle.

**What You Do When It Hurts**
${hasAddictions ? `Directly name the addiction/escape patterns (${addictionTypes.join(', ')}) with total compassion — the why behind the what.` : 'The defense mechanisms and escape routes — with compassion, not judgment.'}

**What Came Before You**
The inherited patterns — without naming frameworks. Simply: "There is something in your family that..."

**What You Need Most and Won't Let Yourself Ask For**
The deepest need underneath everything — with sentences that make them cry with recognition.

**What You Are Capable Of**
The healed version — the real potential visible in their answers. Not positive by default — earned.

**What Alchemized BioHealing Can Do For You**
A specific, personalized invitation. ALWAYS recommend ONE concrete package or membership by name that fits this person, choosing from: the "Stress Relief & High Frequency Package" (entry), the "Loving Myself Membership", the "Soulmates Dates Membership", the "My Sacred Family Wellness Membership", or the "Inner Alchemy" founding membership. Say in one sentence why it is their first step. No sales tone — a natural next step.

**A Message for Your Soul**
One final sentence. The most powerful in the document. The one they'll carry for years.

Write entirely in English. Length: deep, not long. Every paragraph must earn its place.`

    const lengthNote = '\n\n[LENGTH: keep each section to 2-4 tight sentences and COMPLETE all sections through the final "A Message for Your Soul". The whole reading must stay under ~550 words so it finishes within the time limit.]'
    const enc = (o: unknown) => new TextEncoder().encode(JSON.stringify(o) + '\n')

    const readable = new ReadableStream({
      async start(controller) {
        let soulReading = ''
        try {
          const stream = client.messages.stream({
            model: 'claude-sonnet-4-6',
            max_tokens: 1700,
            system: SOUL_READING_SYSTEM_PROMPT,
            messages: [{ role: 'user', content: prompt + lengthNote }],
          })
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && (event.delta as any).type === 'text_delta') {
              const t = (event.delta as any).text
              soulReading += t
              controller.enqueue(enc({ type: 'delta', text: t }))
            } else {
              controller.enqueue(enc({ type: 'ping' }))
            }
          }

          // Persist (best-effort, after the full reading)
          if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
            try {
              const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
              let clientId: string | undefined
              if (email) {
                const { data: clientData } = await supabase
                  .from('clients')
                  .upsert({ name: name || 'Anonymous', email }, { onConflict: 'email' })
                  .select('id').single()
                clientId = clientData?.id
              }
              await supabase.from('assessments').insert({ client_id: clientId, answers: { formatted: answers, tags }, soul_reading: soulReading })
            } catch (e) { console.error('DB error (non-fatal):', e) }
          }

          // Email (best-effort)
          if (process.env.RESEND_API_KEY && email) {
            try {
              const resend = new Resend(process.env.RESEND_API_KEY)
              const formatted = soulReading
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#C9963C;">$1</strong>')

              await resend.emails.send({
                from: 'The Alchemist <onboarding@resend.dev>',
                to: email,
                subject: isSpanish ? '✨ Tu Lectura del Alma — Alchemized BioHealing Institute' : '✨ Your Soul Reading — Alchemized BioHealing Institute',
                html: `<div style="background:#000;color:#F0E8D8;font-family:Georgia,serif;max-width:620px;margin:0 auto;padding:2.5rem 2rem;">
            <div style="text-align:center;margin-bottom:2.5rem;padding-bottom:1.5rem;border-bottom:1px solid rgba(201,150,60,0.2);">
              <div style="font-size:1.8rem;color:#C9963C;">☿</div>
              <h1 style="color:#C9963C;font-size:1.5rem;font-weight:300;letter-spacing:0.2em;margin:0.5rem 0 0;font-family:Georgia,serif;">ALCHEMIZED BIOHEALING</h1>
              <p style="color:rgba(240,232,216,0.3);font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;margin:0.5rem 0 0;">${isSpanish ? 'Lectura del Alma' : 'Soul Reading'}${name ? ` · ${name}` : ''}</p>
            </div>
            <div style="background:rgba(201,150,60,0.04);border:1px solid rgba(201,150,60,0.18);padding:2rem;border-radius:4px;line-height:2;font-size:0.9rem;">${formatted}</div>
            <div style="text-align:center;margin-top:2.5rem;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://thealchemist.miami'}/booking" style="background:linear-gradient(135deg,#C9963C,#E4B85A);color:#000;padding:0.9rem 2rem;text-decoration:none;border-radius:2px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;font-size:0.78rem;display:inline-block;">
                ${isSpanish ? 'Comienza Tu Viaje' : 'Begin Your Journey'}
              </a>
            </div>
            <p style="text-align:center;margin-top:2rem;color:rgba(240,232,216,0.2);font-size:0.72rem;letter-spacing:0.08em;">Alchemized BioHealing Institute · thealchemist.miami</p>
          </div>`,
              })
            } catch (e) { console.error('Email error (non-fatal):', e) }
          }

          controller.enqueue(enc({ type: 'done' }))
        } catch (e) {
          console.error('Soul reading error:', e)
          controller.enqueue(enc({ type: 'error', error: 'Failed to generate reading' }))
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' },
    })
  } catch (error) {
    console.error('Soul reading error:', error)
    return NextResponse.json({ error: 'Failed to generate reading' }, { status: 500 })
  }
}
