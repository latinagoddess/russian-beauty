import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resendApiKey = process.env.RESEND_API_KEY;
const configuredSenderEmail = "Slavic Goddess <noreply@slavic-goddess.com>";

const allowedOrigins = [
  "https://slavic-goddess.com",
  "https://www.slavic-goddess.com",
].filter(Boolean) as string[];

let resendInstance: Resend | null = resendApiKey ? new Resend(resendApiKey) : null;
if (!resendInstance) {
  console.error('RESEND_API_KEY not set. Email functionality disabled.');
}

function getCorsHeaders(origin: string | null): Headers {
  const headers = new Headers();
  const allowedOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  headers.set('Access-Control-Allow-Origin', allowedOrigin || '*');
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return headers;
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const headers = getCorsHeaders(origin);

  if (!resendInstance) {
    return NextResponse.json({ error: 'Email service is currently unavailable.' }, { status: 503, headers });
  }

  try {
    const body = await request.json();
    const userEmail: string = body?.email;

    if (!userEmail || typeof userEmail !== 'string' || !userEmail.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400, headers });
    }

    const { data, error } = await resendInstance.emails.send({
      from: configuredSenderEmail,
      to: [userEmail],
      subject: 'You\'re on the list! Welcome to my Diary 💖',
      html: `
        <div style="font-family: sans-serif; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: auto; background-color: #fff8f8;">
          <h1 style="color: #d17a93;">Thank you for subscribing, sweetie!</h1>
          <p>You'll now be the first to know about my upcoming travel dates and special announcements. I'll send updates every couple of weeks.</p>
          <p>If you're ready to book an enchanting experience, my booking form is waiting for you. I can't wait to meet you! 💌</p>
          <p style="text-align: center; margin-top: 30px;">
            <a href="https://slavic-goddess.com/booking-form/" style="background-color: #d17a93; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Book an Appointment
            </a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Could not send confirmation email.', details: error.message }, { status: 500, headers });
    }

    return NextResponse.json({ message: 'Subscription successful! Check your email for a confirmation.' }, { status: 200, headers });

  } catch (err: any) {
    console.error('POST /api/subscribe Error:', err);
    return NextResponse.json({ error: 'An internal error occurred.' }, { status: 500, headers });
  }
}