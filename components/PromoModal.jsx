'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Anton } from 'next/font/google';

const anton = Anton({ 
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

export default function PromoModal() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Verifica se é a home page (ex: '/', '/pt', '/en', etc)
        const isHomePage = pathname === '/' || /^\/[a-zA-Z-]+\/?$/.test(pathname);
        
        if (isHomePage) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
            <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
                {/* Botão de Fechar */}
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-neutral-800 dark:text-neutral-200 transition-colors"
                    aria-label="Fechar modal"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                {/* Esquerda - QR Code */}
                <div className="w-full md:w-5/12 bg-neutral-100 dark:bg-neutral-800 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-700">
                    <div className="w-48 h-48 md:w-full md:h-auto md:aspect-square relative rounded-xl overflow-hidden shadow-lg bg-white p-2">
                        <img 
                            src="/qrcode.png" 
                            alt="QR Code" 
                            className="w-full h-full object-contain mix-blend-multiply"
                        />
                    </div>
                </div>

                {/* Direita - Conteúdo */}
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-2">
                        Conhecer a coleção
                    </p>
                    <h2 className={`${anton.className} text-6xl md:text-7xl uppercase leading-none text-neutral-900 dark:text-white mb-6 tracking-wide`}>
                        HIDDEN<br/>LEGENDS
                    </h2>
                    
                    <div className="w-16 h-1 bg-[var(--color-accent)] mx-auto mb-8"></div>
                    
                    <a 
                        href="https://shop.roadpanda92.com/HIDDEN-LEGENDS/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleClose}
                        className="bg-[#E63946] hover:bg-[#D62828] text-white px-8 py-4 font-bold uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-3 w-full"
                    >
                        Coleção <span>→</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
