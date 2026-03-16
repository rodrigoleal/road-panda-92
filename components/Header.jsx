'use client';

import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
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
            router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            setIsMenuOpen(false);
            setSearchTerm('');
        }
    };

    const navItems = [
        { label: 'Últimas', href: '/latest' },
        { label: 'Ensaios', href: '/category/reviews' },
        { label: 'Notícias', href: '/category/news' },
        { label: 'Vídeos', href: '/category/videos' },
        { label: 'Opinião', href: '/category/opinion' },
        { label: 'Clássicos', href: '/category/classics' },
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
                
                {/* Mobile Hamburger Menu Icon */}
                <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>

                {/* Search Icon (Desktop) - Replaces Hamburger */}
                <button className="hidden md:block hover:text-[var(--color-accent)] transition-colors" onClick={() => setIsMenuOpen(true)}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>

                {/* Logo (Centered in visual flow) */}
                <div className="flex-1 flex justify-center md:justify-start md:ml-6">
                    <Link href="/" className="relative group flex items-center justify-center">
                        <img src="/logo.png" alt="Road Panda 92" className="h-10 md:h-12 w-auto object-contain dynamic-logo transition-[filter] duration-300" />
                    </Link>
                </div>

                {/* Desktop Nav (Center/Right aligned) */}
                <nav className="hidden md:flex space-x-6 lg:space-x-8 text-sm font-bold tracking-widest uppercase items-center mr-6">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className="hover:text-[var(--color-accent)] transition-colors relative group">
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* Right Side Options */}
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <button className="hidden md:block hover:text-[var(--color-accent)] transition-colors" onClick={() => setIsMenuOpen(true)}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                    <a href="https://www.youtube.com/@roadpanda92" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-2 bg-[#FF0000] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        Subscrever
                    </a>
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
        <div className={`fixed top-0 left-0 h-full w-80 max-w-full header-controlled-bg z-[110] transform transition-transform duration-300 ease-in-out shadow-2xl border-r border-neutral-200 dark:border-neutral-800 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col h-full p-6">
                <div className="flex justify-between items-center mb-8">
                    <img src="/logo.png" alt="Road Panda 92" className="h-8 w-auto object-contain dynamic-logo" />
                    <button onClick={() => setIsMenuOpen(false)} className="hover:text-[var(--color-accent)] transition-colors p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <form onSubmit={handleSearch} className="mb-8">
                    <div className="relative group p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                        <input 
                            type="text" 
                            placeholder="Pesquisar artigos..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white dark:bg-neutral-900 border-none rounded-xl py-4 pl-5 pr-12 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all duration-300 font-bold text-[var(--foreground)] placeholder-neutral-400 dark:placeholder-neutral-600 shadow-inner"
                        />
                        <button type="submit" className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-[var(--color-accent)] transition-all duration-300 transform group-focus-within:scale-110">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </div>
                </form>

                <nav className="flex flex-col space-y-4">
                    <span className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">Navegação</span>
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className="text-lg font-bold hover:text-[var(--color-accent)] transition-colors flex items-center">
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-neutral-200 dark:border-neutral-800">
                    <p className="text-xs text-neutral-500 font-medium">© {new Date().getFullYear()} Road Panda 92</p>
                </div>
            </div>
        </div>
        </>
    );
}
