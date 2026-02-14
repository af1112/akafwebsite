'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer>
      <div className="container">
        <p>
          © {t('year')} - {t('rights')}
        </p>
      </div>
    </footer>
  );
}


