import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userName,
      userEmail,
      userPhone,
      restaurantName,
      plan,
      billingCycle,
      amount,
      paymentMethod,
      transactionId,
      isTrial = false
    } = body;

    // Validate required fields
    if (!userName || !userEmail || !plan || amount === undefined) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('📧 Payment Notification API called', {
      hasResendKey: !!process.env.RESEND_API_KEY,
      userName,
      userEmail,
      plan,
      amount
    });

    // Email content - Admin notification
    const adminEmailSubject = isTrial 
      ? `🎉 اشتراک جدید: ${plan.toUpperCase()} - ${userName} (Trial)`
      : `🎉 اشتراک جدید: ${plan.toUpperCase()} - ${userName}`;
    
    const adminEmailContent = `
${isTrial ? '🎁 دوره آزمایشی 14 روزه - اشتراک جدید!' : '🎉 پرداخت موفق - اشتراک جدید!'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 اطلاعات کاربر
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

نام: ${userName}
ایمیل: ${userEmail}
تلفن: ${userPhone || 'ندارد'}
نام رستوران/کافه: ${restaurantName || 'ندارد'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💳 اطلاعات ${isTrial ? 'دوره آزمایشی' : 'پرداخت'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

پلن انتخابی: ${plan.toUpperCase()}
دوره پرداخت: ${billingCycle}
${isTrial ? '' : `مبلغ: $${amount}`}
روش پرداخت: ${paymentMethod || (isTrial ? 'Free Trial' : 'Online Payment')}
شماره تراکنش: ${transactionId || 'N/A'}
تاریخ: ${new Date().toLocaleString('fa-IR')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

این ایمیل به صورت خودکار از سیستم AKAF Digital Menu ارسال شده است.

با تشکر،
AKAF Team
    `.trim();

    // Welcome email for user
    const userWelcomeSubject = isTrial
      ? `🎉 خوش آمدید به AKAF Digital Menu! - دوره آزمایشی شما فعال شد`
      : `🎉 خوش آمدید به AKAF Digital Menu! - اشتراک شما فعال شد`;
    
    const welcomeEmailContent = `
خوش آمدید ${userName} عزیز! 🎉

از اینکه AKAF Digital Menu را انتخاب کردید، سپاسگزاریم!

${isTrial 
  ? `دوره آزمایشی 14 روزه شما برای پلن ${plan.toUpperCase()} فعال شده است.\n\nتیم ما در حال آماده‌سازی پنل کاربری شماست. به زودی ایمیلی حاوی لینک ورود به پنل و مشخصات کاربری برای شما ارسال خواهد شد.\n\nدوره آزمایشی شما از زمان فعال‌سازی پنل آغاز خواهد شد.`
  : `اشتراک ${plan.toUpperCase()} شما با موفقیت فعال شد.\n\nبه زودی ایمیلی حاوی لینک ورود به پنل و مشخصات کاربری برای شما ارسال خواهد شد.`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
حالا می‌توانید:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ منوی دیجیتال خود را ایجاد کنید
✓ محصولات و دسته‌بندی‌ها را مدیریت کنید
✓ سفارش‌ها را دریافت کنید
✓ گزارش‌های فروش را مشاهده کنید

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
در صورت نیاز به کمک:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 ایمیل: info@akafco.com
📱 واتساپ: +989124433347
☎️ تلفن: +981732204298

با تشکر،
تیم AKAF
    `.trim();

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Send notification to admin
      const adminResult = await resend.emails.send({
        from: 'AKAF Notifications <contact@akafco.com>',
        to: ['af1112@gmail.com', 'marketingsolution1112@gmail.com'],
        subject: adminEmailSubject,
        text: adminEmailContent,
        replyTo: userEmail,
      });

      console.log('✅ Admin notification sent:', adminResult);

      // Send welcome email to user
      try {
        const welcomeResult = await resend.emails.send({
          from: 'AKAF Digital Menu <contact@akafco.com>',
          to: [userEmail],
          subject: userWelcomeSubject,
          text: welcomeEmailContent,
          replyTo: 'info@akafco.com',
        });

        console.log('✅ Welcome email sent:', welcomeResult);
      } catch (welcomeError) {
        console.error('⚠️ Welcome email failed (non-critical):', welcomeError);
        // Continue even if welcome email fails
      }

      return NextResponse.json(
        { 
          message: 'Payment notification sent successfully',
          adminNotification: true,
          welcomeEmail: true
        },
        { status: 200 }
      );
    } else {
      console.error('❌ RESEND_API_KEY is not configured.');
      return NextResponse.json(
        { message: 'Email service is not configured.' },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Payment notification error:', error);
    return NextResponse.json(
      { message: 'Error sending notification', error: error.message },
      { status: 500 }
    );
  }
}

