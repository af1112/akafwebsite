'use client';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/routing';
import { useState, useEffect, useRef } from 'react';

const languages = [
  { code: 'en', name: 'English', dir: 'ltr', font: 'sans-serif' },
  { code: 'fa', name: 'فارسی', dir: 'rtl', font: 'IranYekan' },
  { code: 'ar', name: 'العربية', dir: 'rtl', font: 'NotoSansArabic' }
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find(l => l.code === locale) || languages[0];
  const isRtl = locale === 'fa' || locale === 'ar';

  return (
    <div className="language-switcher" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`language-btn ${isOpen ? 'active' : ''}`}
        aria-label="Change Language"
        title={currentLang.name}
      >
        <img
          src="/icons/globe.svg"
          alt="Change Language"
          width={20}
          height={20}
          style={{ opacity: isOpen ? 1 : 0.7, width: '20px', height: '20px', transition: 'opacity 0.2s' }}
        />
      </button>

      {isOpen && (
        <div
          className="language-dropdown"
          style={isRtl ? { left: 0 } : { right: 0 }}
        >
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={pathname}
              locale={lang.code}
              className={`language-item ${locale === lang.code ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
              style={{ fontFamily: lang.font }}
              dir={lang.dir}
            >
              <span>{lang.name}</span>
              {locale === lang.code && (
                <div className="language-dot"></div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
