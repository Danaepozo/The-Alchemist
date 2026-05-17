import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File
    if (!file) return NextResponse.json({ error: 'No image provided' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    const mediaType = (file.type || 'image/jpeg') as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64 },
            },
            {
              type: 'text',
              text: `You are a medical lab results extraction system. Analyze this lab report image and extract ALL lab values.

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation, just JSON):

{
  "panel_name": "descriptive name of the panel or test type",
  "test_date": "YYYY-MM-DD or empty string if not found",
  "lab_values": [
    {
      "marker": "exact marker name as shown",
      "value": "numeric value as string",
      "unit": "unit as shown (ng/dL, mg/L, etc)",
      "reference_range": "reference range as shown (e.g. 264-916) or empty string",
      "flag": "H if high, L if low, N if normal, empty string if not indicated"
    }
  ],
  "notes": "any relevant notes, patient name, ordering physician, lab name, or other context found in the document"
}

Extract every single marker visible. If multiple panels are present, combine them all into lab_values. Determine flags from: explicit H/L/A markers in the report, values outside reference range, or asterisks. If a value is clearly abnormal based on the reference range shown, set the appropriate flag.`,
            },
          ],
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    // Strip markdown code blocks if present
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const parsed = JSON.parse(cleaned)

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Lab parse error:', err)
    return NextResponse.json({ error: 'Failed to parse lab results' }, { status: 500 })
  }
}
