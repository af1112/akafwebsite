'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/routing';
import { useState, useEffect, useRef } from 'react';

const languages = [
  { code: 'en', flag: 'EN' },
  { code: 'fa', flag: 'FA' },
  { code: 'ar', flag: 'AR' }
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

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:bg-white/10 rounded-md transition"
      >
        <span>{languages.find(l => l.code === locale)?.flag || 'EN'}</span>
        <svg className={`w-3 h-3 transition ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-16 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={pathname}
              locale={lang.code}
              className={`block px-4 py-3 text-sm font-medium text-center hover:bg-gray-100 transition ${
                locale === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-800'
              }`}
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