'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const locales = ['pt-PT', 'en-US', 'es-ES', 'it-IT'];

const labels = {
  'pt-PT': 'Português',
  'en-US': 'English',
  'es-ES': 'Español',
  'it-IT': 'Italiano'
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

  return (
    <div className="relative" ref={dropdownRef} translate="no">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors py-2 opacity-80 hover:opacity-100"
        aria-label="Mudar idioma"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs font-bold uppercase tracking-widest" translate="no">{activeLocale.split('-')[0]}</span>
      </button>

      {/* Dropdown Menu */}
      <div 
        className={`absolute right-0 mt-5 w-[200px] bg-white dark:bg-[#1C2120] border border-neutral-200 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transform transition-all duration-300 origin-top-right z-[1000]
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}
      >
        <div className="p-3 space-y-1">
          {locales.map((locale) => {
            const isActive = activeLocale === locale;
            return (
              <Link
                key={locale}
                href={redirectedPathname(locale)}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-sm font-bold tracking-wide group
                  ${isActive ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5 opacity-80 hover:opacity-100'}`}
              >
                <span translate="no">{labels[locale]}</span>
                <span translate="no" className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-lg transition-colors ${isActive ? 'bg-[var(--color-accent)] text-white shadow-md shadow-red-900/20' : 'bg-neutral-200 text-neutral-600 dark:bg-white/10 dark:text-neutral-400 group-hover:bg-[var(--color-accent)] group-hover:text-white'}`}>
                  {locale.split('-')[0]}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
