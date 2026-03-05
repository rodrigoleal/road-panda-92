'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Check if the user has already consented
        const hasConsented = localStorage.getItem('roadpanda_cookie_consent');
        if (!hasConsented) {
            setIsVisible(true);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('roadpanda_cookie_consent', 'all');
        setIsVisible(false);
    };

    const handleManageOptions = () => {
        // Can open a more detailed modal later, for now expand the view or accept essentials
        setIsExpanded(!isExpanded);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-neutral-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header / Logo */}
                <div className="relative pt-8 pb-4 px-6 text-center border-b border-neutral-100 dark:border-neutral-800">
                    {/* Close button (optional, usually these force an answer, but we add it just in case, could just hide the modal) */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>

                    <img src="/logo.png" alt="Road Panda 92" className="h-12 w-auto mx-auto mb-4 dark:invert" />

                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                        A Road Panda 92 solicita o seu consentimento para usar os seus dados pessoais para:
                    </h2>
                </div>

                {/* Content Area - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">

                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </div>
                        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 pt-1">
                            Publicidade e conteúdos personalizados, medição de publicidade e conteúdos, estudos de audiência e desenvolvimento de serviços
                        </p>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 pt-1">
                            Armazenar e/ou aceder a informações num dispositivo
                        </p>
                    </div>

                    {/* Expandable "Saiba mais" section */}
                    <div className="">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-4 w-full text-left"
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                <svg className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                            <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Saiba mais</span>
                        </button>

                        <div className={`mt-4 text-xs text-neutral-500 dark:text-neutral-400 space-y-3 leading-relaxed transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <p>
                                Os seus dados pessoais vão ser tratados, e as informações do seu dispositivo (cookies, identificadores únicos e outros dados do dispositivo) podem ser armazenadas, acedidas e partilhadas com os nossos parceiros ou usadas especificamente por este site.
                            </p>
                            <p>
                                Alguns fornecedores podem tratar os seus dados pessoais com base no interesse legítimo, ao qual se pode opor gerindo as opções abaixo. Procure um link na parte inferior desta página ou no menu do site para gerir ou revogar o consentimento nas definições de privacidade e cookies.
                            </p>
                            <p>
                                Consulte a nossa <Link href="/privacy" className="underline hover:text-neutral-700 dark:hover:text-neutral-200">Política de Privacidade</Link> para mais informações.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="border-t border-neutral-100 dark:border-neutral-800 p-6 flex flex-col sm:flex-row gap-4 bg-neutral-50 dark:bg-neutral-900/50">
                    <button
                        onClick={handleManageOptions}
                        className="flex-1 py-3 px-6 rounded-full font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md text-center"
                    >
                        Gerir opções
                    </button>
                    <button
                        onClick={handleAcceptAll}
                        className="flex-1 py-3 px-6 rounded-full font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md text-center"
                    >
                        Consentir
                    </button>
                </div>
            </div>
        </div>
    );
}
