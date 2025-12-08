'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/routing';
import { useState, useEffect, useRef } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'fa', name: 'فارسی', flag: 'FA' },
  { code: 'ar', name: 'العربية', flag: 'AR' }
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      >
        <span className="lang-current-flag">{languages.find(l => l.code === locale)?.flag || 'EN'}</span>
        <svg className={`lang-chevron ${isOpen ? 'open' : ''}`} width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* این قسمت مهم: position absolute + زیر هم */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-20 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={pathname}
              locale={lang.code}
              className={`block px-4 py-2 text-sm hover:bg-gray-100 text-center ${locale === lang.code ? 'font-bold bg-gray-50' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {lang.flag}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}