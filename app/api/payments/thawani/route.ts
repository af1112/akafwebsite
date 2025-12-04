import { NextResponse } from 'next/server';
import { createThawaniSession } from '@/lib/payments/thawani';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local file manually with override
const envPath = resolve(process.cwd(), '.env.local');
const dotenvResult = config({ path: envPath, override: true });

export async function POST(request: Request) {
  try {
    // بررسی کلیدها - با لاگ کامل
    const secretKey = process.env.THAWANI_SECRET_KEY;
    const publishableKey = process.env.THAWANI_PUBLISHABLE_KEY;
    
    // لاگ کامل برای دیباگ
    console.log('=== Thawani API Route Debug ===');
    console.log('Dotenv result:', {
      error: dotenvResult?.error?.message,
      parsed: dotenvResult?.parsed ? Object.keys(dotenvResult.parsed) : null
    });
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      cwd: process.cwd(),
      envPath: envPath,
      hasSecretKey: !!secretKey,
      hasPublishableKey: !!publishableKey,
      secretKeyValue: secretKey || 'MISSING',
      publishableKeyValue: publishableKey || 'MISSING',
      secretKeyPreview: secretKey ? `${secretKey.substring(0, 5)}...${secretKey.substring(secretKey.length - 3)}` : 'MISSING',
      publishableKeyPreview: publishableKey ? `${publishableKey.substring(0, 5)}...${publishableKey.substring(publishableKey.length - 3)}` : 'MISSING',
      allThawaniKeys: Object.keys(process.env).filter(key => key.includes('THAWANI'))
    });
    
    if (!secretKey || !publishableKey) {
      console.error('❌ Thawani keys missing!', {
        hasSecretKey: !!secretKey,
        hasPublishableKey: !!publishableKey,
        allEnvKeys: Object.keys(process.env).filter(key => key.includes('THAWANI'))
      });
      return NextResponse.json(
        { 
          message: 'Thawani API keys are not configured. Please check your .env.local file.',
          debug: process.env.NODE_ENV === 'development' ? {
            hasSecretKey: !!secretKey,
            hasPublishableKey: !!publishableKey,
            allThawaniKeys: Object.keys(process.env).filter(key => key.includes('THAWANI'))
          } : undefined
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerId,
      plan,
      amount
    }: {
      customerName: string;
      customerEmail: string;
      customerId: string;
      plan: string;
      amount: number;
    } = body;

    if (!customerEmail || !plan || !amount) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const successUrl =
      body.successUrl ||
      process.env.THAWANI_SUCCESS_URL ||
      `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`;

    const cancelUrl =
      body.cancelUrl ||
      process.env.THAWANI_CANCEL_URL ||
      `${process.env.NEXT_PUBLIC_BASE_URL}/signup?status=cancelled`;

    // تبدیل USD به OMR (Thawani فقط OMR می‌پذیرد)
    // نرخ تبدیل: 1 USD = 0.385 OMR (تقریبی - می‌توانید از API نرخ ارز استفاده کنید)
    const USD_TO_OMR_RATE = parseFloat(process.env.USD_TO_OMR_RATE || '0.385');
    const amountInUSD = amount; // مبلغ ورودی به دلار
    const amountInOMR = amountInUSD * USD_TO_OMR_RATE; // تبدیل به ریال عمان
    
    console.log('Currency conversion:', {
      amountInUSD,
      USD_TO_OMR_RATE,
      amountInOMR,
      amountInOMR_rounded: Math.round(amountInOMR * 1000) / 1000
    });

    // محاسبه مبلغ به بایسه (دقیقاً مطابق با PHP)
    // OMR به بایسه: 1 OMR = 1000 baisa
    const amount_in_baisa = Math.round(amountInOMR * 1000);
    
    const products = [
      {
        name: `${plan} plan - ${customerName || 'Restaurant'}`,
        quantity: 1,
        unit_amount: amount_in_baisa
      }
    ];
    
    console.log('Payment details:', {
      plan,
      amountInUSD,
      amountInOMR: Math.round(amountInOMR * 1000) / 1000,
      amountInBaisa: amount_in_baisa
    });

    const session = await createThawaniSession({
      products,
      customerId: customerId || customerEmail,
      successUrl,
      cancelUrl,
      clientReferenceId: `${plan}-${Date.now()}`
    });

    return NextResponse.json({
      paymentUrl: session.paymentUrl,
      sessionId: session.sessionId
    });
  } catch (error: any) {
    console.error('Thawani payment error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // پیغام خطای دقیق‌تر
    let errorMessage = 'Unable to initiate payment';
    if (error.message?.includes('keys')) {
      errorMessage = 'Thawani API keys are missing. Please check your .env.local file.';
    } else if (error.message?.includes('session')) {
      errorMessage = `Thawani API error: ${error.message}`;
    } else {
      errorMessage = error.message || 'Unable to initiate payment';
    }
    
    return NextResponse.json(
      { 
        message: errorMessage,
        debug: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}


      clientReferenceId: `${plan}-${Date.now()}`
    });

    return NextResponse.json({
      paymentUrl: session.paymentUrl,
      sessionId: session.sessionId
    });
  } catch (error: any) {
    console.error('Thawani payment error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // پیغام خطای دقیق‌تر
    let errorMessage = 'Unable to initiate payment';
    if (error.message?.includes('keys')) {
      errorMessage = 'Thawani API keys are missing. Please check your .env.local file.';
    } else if (error.message?.includes('session')) {
      errorMessage = `Thawani API error: ${error.message}`;
    } else {
      errorMessage = error.message || 'Unable to initiate payment';
    }
    
    return NextResponse.json(
      { 
        message: errorMessage,
        debug: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}


      clientReferenceId: `${plan}-${Date.now()}`
    });

    return NextResponse.json({
      paymentUrl: session.paymentUrl,
      sessionId: session.sessionId
    });
  } catch (error: any) {
    console.error('Thawani payment error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // پیغام خطای دقیق‌تر
    let errorMessage = 'Unable to initiate payment';
    if (error.message?.includes('keys')) {
      errorMessage = 'Thawani API keys are missing. Please check your .env.local file.';
    } else if (error.message?.includes('session')) {
      errorMessage = `Thawani API error: ${error.message}`;
    } else {
      errorMessage = error.message || 'Unable to initiate payment';
    }
    
    return NextResponse.json(
      { 
        message: errorMessage,
        debug: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

