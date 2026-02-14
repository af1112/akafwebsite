'use client';

import { useState, useEffect } from 'react';

type Props = {
  amount: string;
  currency?: string;
  description?: string;
  onSuccess?: () => void;
};

export default function PayPalButton({ amount, currency = 'USD', description, onSuccess }: Props) {
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [PayPalComponent, setPayPalComponent] = useState<any>(null);
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  useEffect(() => {
    // فقط اگر PayPal Client ID وجود داشت، پکیج را لود کن
    if (clientId) {
      import('@paypal/react-paypal-js')
        .then((module) => {
          setPayPalComponent({
            PayPalScriptProvider: module.PayPalScriptProvider,
            PayPalButtons: module.PayPalButtons
          });
          setPaypalLoaded(true);
        })
        .catch(() => {
          // اگر پکیج نصب نشده، خطا نده
          console.warn('PayPal package not installed. Skipping PayPal integration.');
        });
    }
  }, [clientId]);

  if (!clientId || !paypalLoaded || !PayPalComponent) {
    return (
      <div className="paypal-placeholder">
        <p>PayPal integration will be available after setup</p>
      </div>
    );
  }

  const { PayPalScriptProvider, PayPalButtons } = PayPalComponent;

  return (
    <div className="paypal-wrapper">
      <PayPalScriptProvider options={{ clientId, currency }}>
        <PayPalButtons
          style={{ layout: 'horizontal', shape: 'pill', label: 'pay' }}
          createOrder={(_data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount,
                    currency_code: currency
                  },
                  description
                }
              ]
            });
          }}
          onApprove={(_data: any, actions: any) => {
            return actions.order?.capture().then(() => {
              onSuccess?.();
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

