'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/routing';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fa', name: 'فارسی' },
  { code: 'ar', name: 'العربية' }
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="language-switcher">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={pathname}
          locale={lang.code}
          className={`lang-button ${locale === lang.code ? 'active' : ''}`}
        >
          {lang.name}
        </Link>
      ))}
    </div>
  );
}


