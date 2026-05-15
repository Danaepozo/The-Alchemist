import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { answers, name, email } = await req.json()

    const prompt = `You are an integrative wellness oracle combining the wisdom of Bella Vargas (holistic healer, Reiki Master, Ancestral Medicine specialist) and Dr. Michael J. Meighen (Precision Medicine, Functional Medicine, Hormone Optimization, Peptide Therapy).

Based on this Soul Assessment, create a deeply personal "Soul Reading" for ${name || 'this person'}:

ASSESSMENT ANSWERS:
${JSON.stringify(answers, null, 2)}

Create a Soul Reading with these sections:

1. **Your Current State** (2-3 sentences about what their answers reveal holistically)

2. **Bella Sees** (spiritual/energetic reading — what Bella would observe in this person's energy, nervous system patterns, emotional body, and ancestral influences)

3. **Dr. Meighen Sees** (clinical perspective — what functional medicine markers might explain their physical symptoms, what hormonal or cellular patterns could be at play)

4. **Your Recommended Path** (specific services and protocols from The Alchemist that would serve them best, with brief explanation why)

5. **Your First Alchemy** (a personalized invitation to begin with The First Alchemy session at $199 — make it feel like a sacred invitation, not a sales pitch)

6. **A Message for Your Soul** (a poetic, empowering closing sentence in their language — warm and transformational)

Respond in the same language the person wrote their answers in. Make it feel like a private reading, intimate and precise. Do NOT use markdown headers with ##, use bold text with ** for section titles instead.`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
    })

    const soulReading = response.content[0].type === 'text' ? response.content[0].text : ''

    // Save to Supabase if configured
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

    // Send email if configured
    if (process.env.RESEND_API_KEY && email) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'Lumina <onboarding@resend.dev>',
          to: email,
          subject: '✨ Your Soul Reading — The Alchemist Miami',
          html: `
            <div style="background:#000;color:#F0E8D8;font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:2rem;">
              <h1 style="color:#C9963C;font-size:2rem;text-align:center;margin-bottom:0.5rem;">☿ The Alchemist</h1>
              <h2 style="text-align:center;font-weight:300;color:#F0E8D8;margin-bottom:2rem;">Your Soul Reading</h2>
              <div style="background:rgba(201,150,60,0.08);border:1px solid rgba(201,150,60,0.3);padding:1.5rem;border-radius:4px;white-space:pre-wrap;line-height:1.8;">
                ${soulReading.replace(/\n/g, '<br>')}
              </div>
              <div style="text-align:center;margin-top:2rem;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://thealchemist.miami'}/booking" style="background:linear-gradient(135deg,#C9963C,#E4B85A);color:#000;padding:0.875rem 2rem;text-decoration:none;border-radius:2px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;font-size:0.85rem;">Begin Your First Alchemy — $199</a>
              </div>
              <p style="text-align:center;margin-top:2rem;color:rgba(240,232,216,0.4);font-size:0.8rem;">The Alchemist Miami · theAlchemist.miami</p>
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
