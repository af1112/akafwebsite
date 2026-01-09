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

  return (
    <div className="relative z-50" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
          ${isOpen 
            ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-2 ring-indigo-100' 
            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}
        `}
        aria-label="Change Language"
        title={currentLang.name}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute top-full mt-2 w-40 bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden transition-all duration-200 origin-top-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
          ${locale === 'fa' || locale === 'ar' ? 'left-0' : 'right-0'}
        `}
      >
        <div className="p-1.5">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={pathname}
              locale={lang.code}
              className={`
                flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors
                ${locale === lang.code 
                  ? 'bg-indigo-50 text-indigo-600 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
              `}
              onClick={() => setIsOpen(false)}
              style={{ fontFamily: lang.font }}
              dir={lang.dir}
            >
              <span>{lang.name}</span>
              {locale === lang.code && (
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
