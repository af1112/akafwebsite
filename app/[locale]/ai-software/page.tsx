import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import RedirectPage from '@/components/RedirectPage';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AISoftwarePage' });

  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${locale}/products/digital-menu`,
      languages: {
        'en': '/en/products/digital-menu',
        'fa': '/fa/products/digital-menu',
        'ar': '/ar/products/digital-menu'
      }
    }
  };
}

export default function AISoftwareRedirect() {
  return <RedirectPage to="/products/digital-menu" />;
}
