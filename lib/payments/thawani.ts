import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local file manually
config({ path: resolve(process.cwd(), '.env.local') });

type ThawaniProduct = {
  name: string;
  quantity: number;
  unit_amount: number;
};

export async function createThawaniSession({
  products,
  customerId,
  successUrl,
  cancelUrl,
  clientReferenceId
}: {
  products: ThawaniProduct[];
  customerId: string;
  successUrl: string;
  cancelUrl: string;
  clientReferenceId: string;
}) {
  const secretKey = process.env.THAWANI_SECRET_KEY;
  const publishableKey = process.env.THAWANI_PUBLISHABLE_KEY;
  // بررسی دقیق‌تر: اگر 'true' یا '1' باشد، sandbox استفاده می‌شود
  const useSandbox = process.env.THAWANI_USE_SANDBOX === 'true' || process.env.THAWANI_USE_SANDBOX === '1';

  // لاگ برای دیباگ - بررسی اینکه کلیدها خوانده می‌شوند یا نه
  console.log('Thawani Keys Check:', {
    hasSecretKey: !!secretKey,
    hasPublishableKey: !!publishableKey,
    secretKeyLength: secretKey?.length || 0,
    publishableKeyLength: publishableKey?.length || 0,
    useSandbox: useSandbox
  });

  if (!secretKey || !publishableKey) {
    console.error('Thawani API keys are missing!', {
      THAWANI_SECRET_KEY: process.env.THAWANI_SECRET_KEY ? 'EXISTS' : 'MISSING',
      THAWANI_PUBLISHABLE_KEY: process.env.THAWANI_PUBLISHABLE_KEY ? 'EXISTS' : 'MISSING',
      allEnvKeys: Object.keys(process.env).filter(key => key.includes('THAWANI'))
    });
    throw new Error('Thawani API keys are missing');
  }

  const apiBase = useSandbox
    ? 'https://uatcheckout.thawani.om/api/v1'
    : 'https://checkout.thawani.om/api/v1';

  // ساخت داده‌ها دقیقاً مطابق با PHP
  const requestData = {
    client_reference_id: String(clientReferenceId), // تبدیل به string
    mode: 'payment',
    products: products.map((product) => ({
      name: product.name.slice(0, 40), // حداکثر 40 کاراکتر
      quantity: parseInt(String(product.quantity), 10), // تبدیل به int
      unit_amount: parseInt(String(product.unit_amount), 10) // تبدیل به int
    })),
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      customer_id: String(customerId),
      order_id: String(clientReferenceId) // اضافه کردن order_id به metadata
    }
  };

  // لاگ درخواست برای دیباگ
  console.log('Thawani API Request:', {
    endpoint: `${apiBase}/checkout/session`,
    requestData: requestData
  });

  const response = await fetch(`${apiBase}/checkout/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'thawani-api-key': secretKey
    },
    body: JSON.stringify(requestData)
  });

  const httpStatus = response.status;
  const data = await response.json();

  // لاگ پاسخ برای دیباگ
  console.log('Thawani API Response:', {
    status: httpStatus,
    data: data
  });

  // بررسی دقیقاً مطابق با PHP
  // در PHP: ($session['status'] === 200 || $session['status'] == 200) && 
  //         isset($session['data']['data']['session_id']) && 
  //         isset($session['data']['success']) && 
  //         ($session['data']['success'] === true || $session['data']['success'] == 1)
  
  if (
    (httpStatus === 200 || httpStatus == 200) &&
    data?.success === true &&
    data?.data?.session_id
  ) {
    const sessionId = data.data.session_id;
    return {
      sessionId: sessionId,
      paymentUrl: getThawaniPaymentUrl(sessionId, publishableKey, useSandbox)
    };
  } else {
    // ثبت لاگ خطا
    console.error('Thawani session creation failed:', {
      httpStatus: httpStatus,
      responseData: data,
      hasSuccess: !!data?.success,
      hasSessionId: !!data?.data?.session_id
    });
    
    // پیغام خطای دقیق‌تر
    let errorMessage = 'Failed to create Thawani session';
    if (data?.description) {
      errorMessage = data.description;
    } else if (data?.message) {
      errorMessage = data.message;
    } else if (data?.errors) {
      errorMessage = JSON.stringify(data.errors);
    } else if (httpStatus === 401) {
      errorMessage = 'Invalid Thawani API keys. Please check your credentials.';
    } else if (httpStatus === 400) {
      errorMessage = 'Invalid request to Thawani API. Please check the data.';
    }
    
    throw new Error(errorMessage);
  }
}

export function getThawaniPaymentUrl(
  sessionId: string,
  publishableKey: string,
  useSandbox = true
) {
  const checkoutBase = useSandbox
    ? 'https://uatcheckout.thawani.om'
    : 'https://checkout.thawani.om';

  return `${checkoutBase}/pay/${sessionId}?key=${publishableKey}`;
}


    ? 'https://uatcheckout.thawani.om'
    : 'https://checkout.thawani.om';

  return `${checkoutBase}/pay/${sessionId}?key=${publishableKey}`;
}


    ? 'https://uatcheckout.thawani.om'
    : 'https://checkout.thawani.om';

  return `${checkoutBase}/pay/${sessionId}?key=${publishableKey}`;
}

