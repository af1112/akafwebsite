import { Metadata } from 'next';
import { Link } from '@/routing';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Payment Successful',
    description: 'Thank you for your payment'
  };
}

export default async function ThankYouPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const search = await searchParams;

  return (
    <section className="thank-you-page">
      <div className="container">
        <div className="thank-you-content">
          <div className="success-icon">✅</div>
          <h1>Payment Successful!</h1>
          <p className="success-message">
            Thank you for your payment. Your account has been activated.
          </p>
          
          {search.session_id && (
            <div className="payment-details">
              <p>
                <strong>Session ID:</strong> {search.session_id as string}
              </p>
            </div>
          )}

          <div className="next-steps">
            <h2>What&apos;s Next?</h2>
            <ul>
              <li>Check your email for account details</li>
              <li>Login to your dashboard</li>
              <li>Start setting up your digital menu</li>
            </ul>
          </div>

          <div className="action-buttons">
            <Link href="/login" className="btn btn-primary">
              Go to Login
            </Link>
            <Link href="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

