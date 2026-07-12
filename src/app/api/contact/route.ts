import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // 1. Honeypot check: If the hidden honeypot field is filled out, we assume it is spam
    if (honeypot) {
      console.warn("Spam detected via honeypot field.");
      // Return a fake success response to spam bots to prevent them from retrying
      return NextResponse.json(
        { success: true, message: "Message dispatched successfully (silent catch)." },
        { status: 200 }
      );
    }

    // 2. Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: name, email, or message." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address format." },
        { status: 400 }
      );
    }

    // 3. Simulate processing delay (600ms) representing SMTP / service delivery (e.g. Resend)
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Console logging on the local dev server
    console.log(`[API Contact Message Recieved]:
Name: ${name}
Email: ${email}
Message: ${message}
    `);

    // 4. Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been processed successfully! Yash will get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred while processing your message." },
      { status: 500 }
    );
  }
}
