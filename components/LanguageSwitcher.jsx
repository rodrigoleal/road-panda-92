'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const locales = ['pt-PT', 'en-US', 'es-ES', 'it-IT'];

const languages = {
  'pt-PT': { label: 'Português', flag: '🇵🇹', code: 'PT' },
  'en-US': { label: 'English', flag: '🇬🇧', code: 'EN' },
  'es-ES': { label: 'Español', flag: '🇪🇸', code: 'ES' },
  'it-IT': { label: 'Italiano', flag: '🇮🇹', code: 'IT' }
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const redirectedPathname = (locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    if (locales.includes(segments[1])) {
        segments[1] = locale;
        return segments.join('/');
    }
    return `/${locale}${pathname}`;
  };

  const activeLocale = locales.find(l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`) || 'pt-PT';
  const currentLang = languages[activeLocale];

  return (
    <div className="relative" ref={dropdownRef} translate="no">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 hover:text-[var(--color-accent)] transition-colors py-2 opacity-90 hover:opacity-100 group px-2"
        aria-label="Mudar idioma"
      >
        <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-white/5 px-2 py-1.5 rounded-lg border border-neutral-200 dark:border-white/10 group-hover:border-[var(--color-accent)]/30 transition-all">
          <span className="text-base leading-none select-none">{currentLang.flag}</span>
          <span className="text-xs font-bold uppercase tracking-widest leading-none translate-y-px">{currentLang.code}</span>
          <svg 
            className={`w-3 h-3 text-neutral-400 group-hover:text-[var(--color-accent)] transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      <div 
        className={`absolute right-2 mt-2 w-[220px] bg-white dark:bg-[#1C2120] border border-neutral-200 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transform transition-all duration-300 origin-top-right z-[1000]
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}
      >
        <div className="p-2 space-y-1">
          {locales.map((locale) => {
            const isActive = activeLocale === locale;
            const lang = languages[locale];
            return (
              <Link
                key={locale}
                href={redirectedPathname(locale)}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold tracking-wide group
                  ${isActive ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5 opacity-85 hover:opacity-100'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg leading-none scale-110 select-none">{lang.flag}</span>
                  <span translate="no">{lang.label}</span>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
