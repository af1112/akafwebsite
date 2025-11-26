'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';

export default function AnnouncementBar() {
  const t = useTranslations('Announcement');

  return (
    <div className="announcement-bar">
      <div className="container announcement-content">
        <span className="announcement-text">{t('message')}</span>
        <Link href="/pricing" className="announcement-link">
          {t('cta')}
        </Link>
      </div>
    </div>
  );
}
