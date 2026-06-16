'use client';

import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Header({ dict, lang = 'pt-PT' }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const pathname = usePathname();
    const router = useRouter();
    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/${lang}/search?q=${encodeURIComponent(searchTerm.trim())}`);
            setIsMenuOpen(false);
            setSearchTerm('');
        }
    };

    const navItems = [
        { label: dict?.nav?.latest || 'Últimas', href: `/${lang}/latest` },
        { label: dict?.nav?.intemporais || 'Máquinas Intemporais', href: `/${lang}/category/maquinas-intemporais` },
        { label: dict?.nav?.atlantica || 'Viagem Atlântica', href: `/${lang}/category/viagem-atlantica` },
        { label: dict?.nav?.garage || 'Garage', href: `/${lang}/garage`, isHighlight: true },
        { label: dict?.nav?.iconicas || 'Histórias Icónicas', href: `/${lang}/category/historias-iconicas` },
        { label: dict?.nav?.encontros || 'Encontros 3G', href: `/${lang}/category/encontros-3g` },
        { label: dict?.nav?.copiloto || 'Copiloto', href: `/${lang}/category/copiloto` },
    ];

    let headerClass = 'transition-all duration-300 py-4';
    if (isScrolled) {
        headerClass += ' header-controlled-bg py-2';
    } else {
        headerClass += ' header-controlled-bg py-4';
    }

    return (
        <>
        <header className={`fixed w-full top-0 z-50 ${headerClass}`}>
            <div className={`container mx-auto px-4 flex items-center justify-between transition-colors duration-300`}>
                
                {/* Global Hamburger Menu Icon */}
                <button className="flex-shrink-0 mr-4 hover:text-[var(--color-accent)] transition-colors" onClick={() => setIsMenuOpen(true)}>
                    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>

                {/* Logo (Fixed size, won't shrink) */}
                <div className="flex-shrink-0 mr-auto xl:mr-8 transition-transform hover:scale-105">
                    <Link href={`/${lang}`} className="relative group flex items-center justify-center">
                        <img src="/logo.png" alt="Road Panda 92" className="h-10 md:h-12 w-auto object-contain dynamic-logo transition-[filter] duration-300 min-w-[120px]" />
                    </Link>
                </div>

                {/* Desktop Nav (Center aligned, hidden on smaller screens to prevent cramping) */}
                <nav className="hidden xl:flex flex-1 justify-center space-x-5 2xl:space-x-8 text-xs 2xl:text-sm font-black tracking-widest uppercase items-center shrink px-4">
                    {navItems.map((item) => {
                        if (item.isHighlight) {
                            return (
                                <Link key={item.href} href={item.href} className="bg-[var(--foreground)] text-[var(--background)] px-4 py-1.5 rounded flex items-center justify-center hover:opacity-80 transition-opacity whitespace-nowrap">
                                    {item.label}
                                </Link>
                            );
                        }
                        return (
                            <Link key={item.href} href={item.href} className="hover:text-[var(--color-accent)] transition-colors relative group whitespace-nowrap">
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[var(--color-accent)] transition-all group-hover:w-full"></span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Side Options (Fixed size, won't shrink) */}
                <div className="flex items-center space-x-3 md:space-x-4 flex-shrink-0 ml-auto xl:ml-0">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    {/* Search Icon */}
                    <button className="hover:text-[var(--color-accent)] transition-colors" onClick={() => setIsMenuOpen(true)}>
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </div>
            </div>
        </header>

        {/* Sidebar Overlay */}
        {isMenuOpen && (
            <div 
                className="fixed inset-0 bg-black/60 z-[100] transition-opacity backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
            />
        )}

        {/* Sidebar Menu */}
        <div className={`fixed top-0 left-0 h-full w-80 max-w-full header-controlled-bg z-[110] transform transition-transform duration-300 ease-in-out shadow-2xl border-r border-[var(--color-secondary)] ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col h-full p-6">
                <div className="flex justify-between items-center mb-8">
                    <img src="/logo.png" alt="Road Panda 92" className="h-8 w-auto object-contain dynamic-logo" />
                    <button onClick={() => setIsMenuOpen(false)} className="hover:text-[var(--color-accent)] transition-colors p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <form onSubmit={handleSearch} className="mb-8 px-1">
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder={dict?.nav?.searchPlaceholder || 'Pesquisar artigos...'} 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[var(--color-secondary)] border-2 border-transparent focus:border-[var(--color-accent)] rounded-xl py-3.5 pl-5 pr-12 text-[15px] focus:outline-none transition-all duration-300 font-bold text-[var(--foreground)] placeholder-[var(--foreground)]/60 shadow-sm focus:shadow-md"
                        />
                        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[var(--color-accent)] transition-all duration-300 transform group-focus-within:scale-110">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </div>
                </form>

                <nav className="flex flex-col space-y-4">
                    <span className="text-xs font-black uppercase tracking-widest opacity-40 mb-2 border-b border-[var(--color-secondary)] pb-2 text-[var(--foreground)]">{dict?.footer?.sections || 'Navegação'}</span>
                    {navItems.map((item) => {
                        if (item.isHighlight) {
                            return (
                                <Link key={item.href} href={item.href} className="text-lg font-bold bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded self-start hover:opacity-80 transition-opacity flex items-center">
                                    {item.label}
                                </Link>
                            );
                        }
                        return (
                            <Link key={item.href} href={item.href} className="text-lg font-bold hover:text-[var(--color-accent)] transition-colors flex items-center text-[var(--foreground)]">
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-[var(--color-secondary)] flex flex-col gap-4">
                    <a
                        href="https://www.youtube.com/@roadpanda92"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-[#FF0000] text-white px-5 py-3 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:scale-[1.02]"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        {dict?.footer?.subscribe || 'Subscrever no YouTube'}
                    </a>
                    <p className="text-xs opacity-40 font-medium text-[var(--foreground)] text-center">© {new Date().getFullYear()} Road Panda 92</p>
                </div>
            </div>
        </div>
        </>
    );
}
