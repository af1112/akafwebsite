import { NextResponse } from 'next/server';

// Rate Limiting - استفاده از Map ساده (در production از Redis استفاده کنید)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const limit = 5; // حداکثر 5 درخواست
  const window = 3600000; // 1 ساعت (به میلی‌ثانیه)
  
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + window });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}

// تابع اعتبارسنجی Cloudflare Turnstile
async function verifyTurnstile(token: string, secretKey: string, ip: string): Promise<boolean> {
  if (!token || !secretKey) {
    return false;
  }
  
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
    });
    
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, turnstileToken } = body;

    // دریافت IP کاربر
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 
               request.headers.get('x-real-ip') || 
               'unknown';

    // بررسی Rate Limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // بررسی Cloudflare Turnstile CAPTCHA
    const turnstileSecret = process.env.CLOUDFLARE_TURNSTILE_SECRET || '';
    if (turnstileSecret && (!turnstileToken || !(await verifyTurnstile(turnstileToken, turnstileSecret, ip)))) {
      return NextResponse.json(
        { message: 'CAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

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
