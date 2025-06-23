// app/api/tx/request/route.ts
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as z from 'zod';

const Body = z.object({
  email : z.string().email(),
  amount: z.number().positive(),
  note  : z.string().optional(),
});

// Load Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const data = Body.parse(await req.json());
    console.log('[Resend] Parsed request:', data);

    // Compose email
    const toEmail = data.email;
    const amount = data.amount;
    const note = data.note || '';
    const bankDetails = `
      <br /><br />
      <b>Eleganza Bank details:</b><br />
      Account Name: Eleganza Bank<br />
      Account Number: 111122223333<br />
      Bank Name: Eleganza Bank<br />
      (You can customize these details!)
    `;

    // Compose subject & body
    const subject = 'Eleganza Bank Payment Request';
    const html = `
      <strong>You have received a payment request!</strong><br>
      <ul>
        <li>Amount: <b>${amount} USD</b></li>
        ${note ? `<li>Note: ${note}</li>` : ''}
      </ul>
      ${bankDetails}
      <br>
      <i>This is an automated request from Eleganza Bank.</i>
    `;

    // Send email
    const result = await resend.emails.send({
      from: 'Eleganza Bank <noreply@eleganza-bank.resend.dev>', // For dev/test, use .resend.dev
      to: toEmail,
      subject,
      html,
      // Optionally add text as fallback:
      text: `You have received a payment request for ${amount} USD.${note ? `\nNote: ${note}` : ''}`,
    });

    // Debug: log the result
    console.log('[Resend] Email send result:', result);

    if (result.error) {
      console.error('[Resend] Error sending email:', result.error);
      return NextResponse.json({ error: 'Failed to send email', details: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[Resend] Handler error:', err);
    return NextResponse.json({ error: (err as any)?.message ?? 'Unknown error' }, { status: 400 });
  }
}
