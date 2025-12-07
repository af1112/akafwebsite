'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/routing';
import { useState, useEffect, useRef } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: 'EN', nativeName: 'English' },
  { code: 'fa', name: 'فارسی', flag: 'FA', nativeName: 'فارسی' },
  { code: 'ar', name: 'العربية', flag: 'AR', nativeName: 'العربية' }
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="language-switcher-dropdown" ref={dropdownRef}>
      <button
        className="lang-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="lang-current-flag">{currentLanguage.flag}</span>
        <svg 
          className={`lang-chevron ${isOpen ? 'open' : ''}`}
          width="10" 
          height="10" 
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={pathname}
              locale={lang.code}
              className={`lang-dropdown-item ${locale === lang.code ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="lang-flag">{lang.flag}</span>
              {locale === lang.code && (
                <svg className="lang-check" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


