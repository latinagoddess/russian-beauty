import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
// EmailTemplate is imported but not used, so I'll comment it out.
// If you plan to use it later, uncomment and integrate it.
// import { EmailTemplate } from "@/components/EmailTemplate";

export const dynamic = "force-dynamic"; // Ensures this route is not cached

const resend = new Resend(process.env.RESEND_API_KEY);

// Define allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  "https://slavic-goddess.com",
  "https://www.slavic-goddess.com",
];

/**
 * Generates CORS headers based on the request origin.
 * @param origin The origin from the request headers.
 * @returns An object containing CORS headers.
 */
function getCorsHeaders(origin: string | null) {
  const isAllowed = origin && allowedOrigins.includes(origin);
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };
}

/**
 * Handles OPTIONS requests for CORS preflight.
 */
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  const headers = getCorsHeaders(origin);
  return new NextResponse(null, { status: 204, headers });
}

/**
 * Handles POST requests to send an email with booking details.
 */
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const headers = getCorsHeaders(origin); // Get CORS headers early

  try {
    const body = await request.json();

    // Destructure the expected fields from the request body
    const { name, email, number, age, callType, city, date, rate } = body;

    // Validate essential fields (optional but recommended)
    if (!name || !email || !date) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields: name, email, date" }),
        { status: 400, headers }
      );
    }

    // Construct the HTML content using inline styles
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: 20px auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; background-color: #ffffff;">
          <h2 style="color: #0056b3; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 20px;">New Booking Request Received!</h2>
          <p style="margin: 8px 0;">
            <strong style="display: inline-block; min-width: 100px; color: #555;">Name:</strong> ${name}
          </p>
          <p style="margin: 8px 0;">
            <strong style="display: inline-block; min-width: 100px; color: #555;">Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
          </p>
          <p style="margin: 8px 0;">
            <strong style="display: inline-block; min-width: 100px; color: #555;">Phone:</strong> <a href="tel:${number}" style="color: #007bff; text-decoration: none;">${number}</a>
          </p>
          <p style="margin: 8px 0;">
            <strong style="display: inline-block; min-width: 100px; color: #555;">Age:</strong> ${age || 'N/A'}
          </p>
          <p style="margin: 8px 0;">
            <strong style="display: inline-block; min-width: 100px; color: #555;">Call Type:</strong> ${callType || 'N/A'}
          </p>
          <p style="margin: 8px 0;">
            <strong style="display: inline-block; min-width: 100px; color: #555;">City:</strong> ${city || 'N/A'}
          </p>
          <p style="margin: 8px 0;">
            <strong style="display: inline-block; min-width: 100px; color: #555;">Date:</strong> ${date}
          </p>
          <p style="margin: 8px 0;">
            <strong style="display: inline-block; min-width: 100px; color: #555;">Rate:</strong> ${rate || 'N/A'}
          </p>
          <br>
          <p style="font-size: 0.9em; color: #777;">This is an automated notification from your booking form.</p>
        </div>
      </div>
    `;

    // Send the email using Resend
    const { data, error } = await resend.emails.send({ // Destructuring data and error directly
      from: "Slavic Goddess <noreply@slavic-goddess.com>",
      to: ["europeanmodel@outlook.com"],
      subject: "New Appointment Request for Slavic Goddess!",
      html: htmlContent,
    });

    // Check for Resend specific errors
    if (error) {
      console.error("Resend Email Error:", error);
      return new NextResponse(
        JSON.stringify({
          error: "Failed to send email via Resend",
          details: error.message || "Unknown Resend error",
        }),
        { status: 500, headers }
      );
    }

    // Log the Resend response for debugging
    console.log("Resend Email Sent Data:", data);

    // Return a success response
    return new NextResponse(JSON.stringify({ message: "Email sent successfully!", data }), {
      status: 200,
      headers,
    });

  } catch (error: any) {
    // Log the error for server-side debugging
    console.error("Error in POST /api/send-email:", error);

    // Return an error response
    return new NextResponse(
      JSON.stringify({
        error: "Failed to process request or send email",
        details: error?.message || "Unknown error occurred.",
        ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
      }),
      {
        status: 500,
        headers,
      }
    );
  }
}