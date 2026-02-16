
'use client';

import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Últimas', href: '/latest' },
        { label: 'Ensaios', href: '/category/reviews' },
        { label: 'Notícias', href: '/category/news' },
        { label: 'Vídeos', href: '/category/videos' },
        { label: 'Opinião', href: '/category/opinion' },
        { label: 'Clássicos', href: '/category/classics' },
    ];

    // Logic: 
    // Home + Top = Transparent
    // Home + Scrolled = Charcoal Green (Solid)
    // Other Pages = Charcoal Green (Solid)

    let headerClass = 'transition-all duration-300 py-4';

    if (isScrolled) {
        headerClass += ' header-controlled-bg py-2';
    } else {
        headerClass += ' header-controlled-bg py-4';
    }

    const textColorClass = '';

    return (
        <header className={`fixed w-full top-0 z-50 ${headerClass}`}>
            <div className={`container mx-auto px-4 flex items-center justify-between ${textColorClass} transition-colors duration-300`}>

                {/* Mobile Menu Icon (Placeholder) */}
                <button className="md:hidden">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>

                {/* Logo */}
                <Link href="/" className="relative group flex items-center justify-center">
                    <img src="/logo.png" alt="Road Panda 92" className="h-10 md:h-12 w-auto object-contain" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8 text-sm font-bold tracking-widest uppercase">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className="hover:text-[var(--color-accent)] transition-colors relative group">
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* Search / Social Icons */}
                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    <button className="hover:text-[var(--color-accent)] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                    <Link href="#newsletter" className="hidden md:block bg-[var(--color-accent)] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
                        Subscrever
                    </Link>
                </div>
            </div>
        </header>
    );
}
