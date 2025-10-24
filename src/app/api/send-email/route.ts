import { NextRequest, NextResponse } from "next/server";
import { EmailTemplate } from "@/components/EmailTemplate";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

const allowedOrigins = [
  'http://localhost:3000',
  "https://slavic-goddess.com",
  "https://www.slavic-goddess.com",
];

function getCorsHeaders(origin: string | null) {
  const isAllowed = origin && allowedOrigins.includes(origin);
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  const headers = getCorsHeaders(origin);
  return new NextResponse(null, { status: 204, headers });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const headers = getCorsHeaders(origin);

  try {
    const body = await request.json();

    const data = await resend.emails.send({
      from: "Slavic Goddess <noreply@slavic-goddess.com>",
      to: ["europeanmodel@outlook.com"],
      subject: "New Appointment Request from Slavic Goddess!",
      text: "New Appointment Request Received!",
    });

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        error: "Failed to process request",
        details: error?.message || "Unknown error",
      }),
      {
        status: 500,
        headers,
      }
    );
  }
}