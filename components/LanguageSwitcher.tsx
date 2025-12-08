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

  // Close dropdown when clicking outside — درست شده: cleanup کامل
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };  // ← درست شده: return کامل — ارور runtime حل می‌شه
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
        <div className="language-dropdown">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={pathname}
              locale={lang.code}
              className={`language-option ${currentLanguage.code === lang.code ? 'selected' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span 
                className="language-flag text-sm font-semibold"
                title={lang.name}   // ← این خط اضافه شد: tooltip با نام زبان
              >
                {lang.flag}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}