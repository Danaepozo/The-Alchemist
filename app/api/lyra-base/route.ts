import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { LYRA_SYSTEM_PROMPT } from '@/lib/alchemist/lyra-knowledge-base'
import { checkLyraCode } from '@/lib/alchemist/lyra-access'

// LYRA BASE — usa el prompt congelado (línea base, sin las mejoras de la versión de trabajo).
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export const maxDuration = 60

function sse(o: unknown) { return new TextEncoder().encode(JSON.stringify(o) + '\n') }

export async function POST(req: NextRequest) {
  let messages: { role: string; content: string }[] = []
  let code: unknown = ''
  try {
    const body = await req.json()
    messages = body.messages || []
    code = body.code
  } catch {
    return new Response(sse({ type: 'error', error: 'Invalid request.' }), { status: 400 })
  }
  if (!checkLyraCode(code)) {
    return new Response(sse({ type: 'error', error: 'unauthorized' }), { status: 401 })
  }
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(sse({ type: 'error', error: 'A message is required.' }), { status: 400 })
  }

  const readable = new ReadableStream({
    async start(controller) {
      try {
        const stream = client.messages.stream({
          model: 'claude-sonnet-4-6',
          max_tokens: 4000,
          system: LYRA_SYSTEM_PROMPT,
          messages: messages.slice(-20).map(m => ({
            role: m.role === 'assistant' ? 'assistant' as const : 'user' as const,
            content: String(m.content || ''),
          })),
        })
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && (event.delta as any).type === 'text_delta') {
            controller.enqueue(sse({ type: 'delta', text: (event.delta as any).text }))
          } else {
            controller.enqueue(sse({ type: 'ping' }))
          }
        }
        controller.enqueue(sse({ type: 'done' }))
        controller.close()
      } catch (err) {
        console.error('lyra-base route error:', err)
        controller.enqueue(sse({ type: 'error', error: 'Lyra could not respond right now.' }))
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' },
  })
}
