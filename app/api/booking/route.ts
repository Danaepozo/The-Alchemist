import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { service, practitioner, date, time, name, email, phone, notes } = body

    if (!service || !practitioner || !date || !time || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let bookingId = `BK-${Date.now()}`

    // Save to Supabase if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        )
        const { data: clientData } = await supabase
          .from('clients')
          .upsert({ name, email, phone }, { onConflict: 'email' })
          .select('id')
          .single()

        const { data: bookingData } = await supabase
          .from('bookings')
          .insert({ client_id: clientData?.id, service, practitioner, date, time, notes })
          .select('id')
          .single()

        if (bookingData?.id) bookingId = bookingData.id
      } catch (dbError) {
        console.error('DB save error (non-fatal):', dbError)
      }
    }

    // Send confirmation emails
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://alchemizedbiohealing.com'

      // Client confirmation
      await resend.emails.send({
        from: 'Alchemized BioHealing Institute <hola@alchemizedbiohealing.com>',
        to: email,
        subject: '✨ Your session is confirmed — Alchemized BioHealing Institute',
        html: `
          <div style="background:#000;color:#F0E8D8;font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:2rem;">
            <h1 style="color:#C9963C;font-size:1.6rem;text-align:center;letter-spacing:0.15em;">ALCHEMIZED BIOHEALING</h1>
            <h2 style="text-align:center;font-weight:300;margin-bottom:2rem;">Your Session is Confirmed</h2>
            <div style="background:rgba(201,150,60,0.08);border:1px solid rgba(201,150,60,0.3);padding:1.5rem;border-radius:4px;margin-bottom:1.5rem;">
              <p><strong style="color:#C9963C;">Name:</strong> ${name}</p>
              <p><strong style="color:#C9963C;">Service:</strong> ${service}</p>
              <p><strong style="color:#C9963C;">Practitioner:</strong> ${practitioner}</p>
              <p><strong style="color:#C9963C;">Date:</strong> ${date}</p>
              <p><strong style="color:#C9963C;">Time:</strong> ${time}</p>
              ${notes ? `<p><strong style="color:#C9963C;">Notes:</strong> ${notes}</p>` : ''}
              <p><strong style="color:#C9963C;">Booking ID:</strong> ${bookingId}</p>
            </div>
            <p style="color:rgba(240,232,216,0.7);line-height:1.8;">We look forward to your alchemy. If you need to reschedule, please reply to this email.</p>
            <div style="text-align:center;margin-top:2rem;">
              <p style="color:rgba(240,232,216,0.4);font-size:0.8rem;">Alchemized BioHealing Institute · ${baseUrl}</p>
            </div>
          </div>
        `,
      }).catch(e => console.error('Client email error:', e))

      // Practitioner notification
      const practitionerEmail = practitioner.toLowerCase().includes('bella')
        ? process.env.ADMIN_EMAIL
        : process.env.DOCTOR_EMAIL

      if (practitionerEmail) {
        await resend.emails.send({
          from: 'Alchemized BioHealing Bookings <hola@alchemizedbiohealing.com>',
          to: practitionerEmail,
          subject: `New booking: ${service} — ${name}`,
          html: `
            <div style="font-family:sans-serif;padding:1rem;">
              <h2>New Booking</h2>
              <p><strong>Client:</strong> ${name} (${email}${phone ? ` · ${phone}` : ''})</p>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Date:</strong> ${date} at ${time}</p>
              ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
              <p><strong>Booking ID:</strong> ${bookingId}</p>
            </div>
          `,
        }).catch(e => console.error('Practitioner email error:', e))
      }
    }

    return NextResponse.json({ success: true, bookingId })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
