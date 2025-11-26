import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('📩 Contact API called', {
      hasResendKey: !!process.env.RESEND_API_KEY,
      fromEmail: 'contact@akafco.com',
      toEmails: ['info@akafco.com', 'af1112@gmail.com'],
      subject,
    });

    // Email content
    const emailContent = `
New Contact Form Submission from akafco.com

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}

---
This message was sent from the contact form on akafco.com
Reply to: ${email}
    `.trim();

    // Option 1: Using Resend (Recommended for Next.js)
    // Install: npm install resend
    // Get API key from: https://resend.com
    // Add to .env.local: RESEND_API_KEY=your_api_key
    
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const resendResult = await resend.emails.send({
        from: 'AKAF Contact <contact@akafco.com>', // uses your verified domain
        to: ['info@akafco.com', 'af1112@gmail.com'],
        subject: `Contact Form: ${subject}`,
        text: emailContent,
        replyTo: email,
      });

      console.log('✅ Resend email send result:', resendResult);
    } else {
      // SMTP / Nodemailer path has been disabled to avoid extra dependencies.
      // We rely only on Resend. If RESEND_API_KEY is missing, return an error.
      console.error('❌ RESEND_API_KEY is not configured. Unable to send contact form email.');
      return NextResponse.json(
        { message: 'Email service is not configured on the server.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Error sending message', error: error.message },
      { status: 500 }
    );
  }
}

