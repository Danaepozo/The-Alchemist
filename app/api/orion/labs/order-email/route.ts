import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const { patient, selected_tests, fasting, notes, order_date } = await req.json()

    if (!patient?.email) {
      return NextResponse.json({ error: 'Patient email not found' }, { status: 400 })
    }

    const hasFasting = fasting === true
    const formattedDate = new Date(order_date).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    const testRows = selected_tests.map((t: { name: string; fasting?: boolean; notes?: string; category?: string }) => `
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #1a1a1a; color: #F0E8D8; font-size: 13px;">
          ${t.name}${t.fasting ? ' <span style="color:#C9963C;font-size:11px;">(fasting)</span>' : ''}
        </td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #1a1a1a; color: rgba(240,232,216,0.4); font-size: 12px;">
          ${t.notes || ''}
        </td>
      </tr>`).join('')

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Lab Order — The Alchemist Miami</title></head>
<body style="margin:0;padding:0;background:#000;font-family:Georgia,serif;">
  <div style="max-width:680px;margin:0 auto;background:#0a0a0a;border:1px solid #1f1f1f;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0a0a0a 0%,#111 100%);padding:40px 40px 32px;border-bottom:1px solid #1f1f1f;">
      <div style="font-size:22px;font-weight:300;color:#C9963C;letter-spacing:0.2em;margin-bottom:4px;">☿ THE ALCHEMIST MIAMI</div>
      <div style="font-size:11px;color:rgba(240,232,216,0.3);letter-spacing:0.15em;">DR. MICHAEL J. MEIGHEN MD · FUNCTIONAL MEDICINE & LONGEVITY</div>
    </div>

    <!-- Patient Info -->
    <div style="padding:32px 40px 24px;border-bottom:1px solid #1a1a1a;">
      <div style="font-size:10px;color:rgba(240,232,216,0.3);letter-spacing:0.15em;margin-bottom:16px;">LAB ORDER</div>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:4px 0;color:rgba(240,232,216,0.4);font-size:12px;width:120px;">Patient</td>
          <td style="padding:4px 0;color:#F0E8D8;font-size:13px;font-weight:500;">${patient.full_name}</td>
        </tr>
        ${patient.date_of_birth ? `<tr>
          <td style="padding:4px 0;color:rgba(240,232,216,0.4);font-size:12px;">Date of Birth</td>
          <td style="padding:4px 0;color:#F0E8D8;font-size:13px;">${new Date(patient.date_of_birth + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
        </tr>` : ''}
        <tr>
          <td style="padding:4px 0;color:rgba(240,232,216,0.4);font-size:12px;">Order Date</td>
          <td style="padding:4px 0;color:#F0E8D8;font-size:13px;">${formattedDate}</td>
        </tr>
        <tr>
          <td style="padding:4px 0;color:rgba(240,232,216,0.4);font-size:12px;">Tests Ordered</td>
          <td style="padding:4px 0;color:#3DC898;font-size:13px;font-weight:500;">${selected_tests.length} tests</td>
        </tr>
      </table>
    </div>

    ${hasFasting ? `
    <!-- Fasting Warning -->
    <div style="margin:24px 40px 0;padding:16px 20px;background:rgba(201,150,60,0.08);border:1px solid rgba(201,150,60,0.25);border-radius:6px;">
      <div style="font-size:12px;color:#C9963C;font-weight:600;letter-spacing:0.08em;margin-bottom:6px;">⚠ FASTING REQUIRED FOR SOME TESTS</div>
      <div style="font-size:12px;color:rgba(240,232,216,0.6);line-height:1.6;">
        Please fast for <strong style="color:#F0E8D8;">10–12 hours</strong> before drawing. Water is allowed. Tests marked <span style="color:#C9963C;">(fasting)</span> require an empty stomach. Schedule your draw first thing in the morning when possible.
      </div>
    </div>` : ''}

    <!-- Tests Table -->
    <div style="padding:${hasFasting ? '24px' : '32px'} 40px 32px;">
      <div style="font-size:10px;color:rgba(240,232,216,0.3);letter-spacing:0.15em;margin-bottom:16px;">ORDERED TESTS</div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #1a1a1a;border-radius:6px;overflow:hidden;">
        <thead>
          <tr style="background:#111;">
            <th style="padding:10px 12px;text-align:left;font-size:10px;color:rgba(240,232,216,0.3);letter-spacing:0.1em;font-weight:400;border-bottom:1px solid #1a1a1a;">TEST NAME</th>
            <th style="padding:10px 12px;text-align:left;font-size:10px;color:rgba(240,232,216,0.3);letter-spacing:0.1em;font-weight:400;border-bottom:1px solid #1a1a1a;">NOTES</th>
          </tr>
        </thead>
        <tbody>
          ${testRows}
        </tbody>
      </table>
    </div>

    ${notes ? `
    <!-- Clinical Notes -->
    <div style="padding:0 40px 32px;">
      <div style="font-size:10px;color:rgba(240,232,216,0.3);letter-spacing:0.15em;margin-bottom:12px;">CLINICAL NOTES</div>
      <div style="padding:16px;background:#111;border:1px solid #1a1a1a;border-radius:6px;font-size:13px;color:rgba(240,232,216,0.7);line-height:1.6;">${notes}</div>
    </div>` : ''}

    <!-- Instructions -->
    <div style="padding:0 40px 40px;">
      <div style="font-size:10px;color:rgba(240,232,216,0.3);letter-spacing:0.15em;margin-bottom:12px;">INSTRUCTIONS</div>
      <div style="font-size:12px;color:rgba(240,232,216,0.5);line-height:1.8;">
        1. Present this email or a printed copy at the laboratory.<br>
        2. Any major lab accepts this order: LabCorp, Quest Diagnostics, or a hospital draw station.<br>
        3. Results will be sent directly to our office for ORION analysis.<br>
        4. If you have questions, contact our office before your appointment.
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:24px 40px;background:#050505;border-top:1px solid #1a1a1a;">
      <div style="font-size:11px;color:rgba(240,232,216,0.25);line-height:1.8;">
        The Alchemist Miami · Dr. Michael J. Meighen MD<br>
        Functional Medicine & Longevity · Miami, Florida<br>
        This lab order is valid for 90 days from the order date.
      </div>
    </div>

  </div>
</body>
</html>`

    const { data, error } = await resend.emails.send({
      from: 'The Alchemist Miami <orion@thealchemist.miami>',
      to: patient.email,
      subject: `Lab Order — ${selected_tests.length} tests requested · The Alchemist Miami`,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, email_id: data?.id })
  } catch (err) {
    console.error('Lab order email error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
