import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import SignupForm from '@/components/SignupForm';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SignupPage' });

  return {
    title: t('title'),
    description: t('subtitle')
  };
}

export default async function SignupPage() {
  return (
    <section className="signup-page">
      <div className="container">
        <div className="signup-container">
          <div className="signup-header">
            <h1>Create Your Account</h1>
            <p>Start your free trial today</p>
          </div>
          <SignupForm />
        </div>
      </div>
    </section>
  );
}


