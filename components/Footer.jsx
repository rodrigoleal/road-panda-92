
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer({ dict, lang = 'pt-PT' }) {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null); // 'loading', 'success', 'error'
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage(dict?.footer?.statusSuccess || 'Obrigado por subscrever!');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.error || dict?.footer?.statusError || 'Algo correu mal.');
            }
        } catch (error) {
            setStatus('error');
            setMessage(dict?.footer?.statusError || 'Erro de conexão.');
        }
    };

    return (
        <footer className="bg-[#1C2120] text-[#E3E5E5] pt-20 pb-10 border-t-4 border-[var(--color-accent)] mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">

                {/* Branding */}
                <div className="lg:col-span-3">
                    <Link href={`/${lang}`} className="block mb-6">
                        <img src="/logo.png" alt="Road Panda 92" className="h-14 w-auto object-contain brightness-0 invert" />
                    </Link>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                        {dict?.footer?.description || 'Jornalismo automóvel sem compromissos. Histórias diretamente do asfalto para o seu ecrã.'}
                    </p>
                    <div className="flex space-x-4 flex-wrap">
                        {/* Social Links */}
                        <a href="https://www.instagram.com/roadpanda92" target="_blank" rel="noopener noreferrer" className="text-[var(--color-detail)] hover:text-white transition-colors text-xs uppercase font-bold tracking-widest mb-2">Instagram</a>
                        <a href="https://www.facebook.com/share/1awmpWymbn/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-detail)] hover:text-white transition-colors text-xs uppercase font-bold tracking-widest mb-2">Facebook</a>
                        <a href="https://open.spotify.com/show/1NS8NiCNdROB8BDXIWYYdl?si=baED7fPzTZC-95ZHLARE3Q" target="_blank" rel="noopener noreferrer" className="text-[var(--color-detail)] hover:text-white transition-colors text-xs uppercase font-bold tracking-widest mb-2">Spotify</a>
                        <a href="https://youtube.com/@roadpanda92?si=kyxLSfwGxutEjJ5x" target="_blank" rel="noopener noreferrer" className="text-[var(--color-detail)] hover:text-white transition-colors text-xs uppercase font-bold tracking-widest mb-2">YouTube</a>
                    </div>
                </div>

                {/* SECÇÕES */}
                <div className="lg:col-span-2">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">{dict?.footer?.sections || 'Secções'}</h3>
                    <ul className="space-y-2 font-medium text-neutral-400 text-base">
                        <li><Link href={`/${lang}/latest`} className="hover:text-white transition-colors">{dict?.nav?.latest || 'Últimas'}</Link></li>
                        <li><Link href={`/${lang}/category/maquinas-intemporais`} className="hover:text-white transition-colors">{dict?.nav?.intemporais || 'Máquinas Intemporais'}</Link></li>
                        <li><Link href={`/${lang}/category/viagem-atlantica`} className="hover:text-white transition-colors">{dict?.nav?.atlantica || 'Viagem Atlântica'}</Link></li>
                        <li><Link href={`/${lang}/garage`} className="hover:text-white transition-colors">{dict?.nav?.garage || 'Garage'}</Link></li>
                        <li><Link href={`/${lang}/category/historias-iconicas`} className="hover:text-white transition-colors">{dict?.nav?.iconicas || 'Histórias Icónicas'}</Link></li>
                        <li><Link href={`/${lang}/category/encontros-3g`} className="hover:text-white transition-colors">{dict?.nav?.encontros || 'Encontros 3G'}</Link></li>
                        <li><Link href={`/${lang}/category/copiloto`} className="hover:text-white transition-colors">{dict?.nav?.copiloto || 'Copiloto'}</Link></li>
                    </ul>
                </div>

                {/* OUTROS */}
                <div className="lg:col-span-2">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">{dict?.footer?.others || 'Outros'}</h3>
                    <ul className="space-y-2 font-medium text-neutral-400 text-base">
                        <li><Link href={`/${lang}/about`} className="hover:text-white transition-colors">{dict?.footer?.about || 'Quem somos'}</Link></li>
                        <li><Link href={`/${lang}/estatuto-editorial`} className="hover:text-white transition-colors">{dict?.footer?.editorial || 'Estatuto Editorial'}</Link></li>
                        <li><Link href={`/${lang}/ficha-tecnica`} className="hover:text-white transition-colors">{dict?.footer?.ficha || 'Ficha Técnica'}</Link></li>
                        <li><Link href={`/${lang}/contact`} className="hover:text-white transition-colors">{dict?.footer?.contact || 'Contactos'}</Link></li>
                        <li><a href="https://open.spotify.com/show/1NS8NiCNdROB8BDXIWYYdl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-[var(--color-detail)] flex items-center gap-2">Podcast Copiloto <span className="text-[10px]">↗</span></a></li>
                    </ul>
                </div>

                {/* LEGAL LINKS */}
                <div className="lg:col-span-2 lg:pt-11 mt-6 lg:mt-0">
                    <ul className="space-y-2 font-medium text-neutral-400 text-base">
                        <li><Link href={`/${lang}/privacy`} className="hover:text-white transition-colors">{dict?.footer?.privacy || 'Política de Privacidade'}</Link></li>
                        <li><Link href={`/${lang}/cookies`} className="hover:text-white transition-colors">{dict?.footer?.cookies || 'Política de Cookies'}</Link></li>
                        <li><Link href={`/${lang}/terms`} className="hover:text-white transition-colors">{dict?.footer?.terms || 'Termos de Utilização'}</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="lg:col-span-3 mt-6 lg:mt-0" id="newsletter">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-detail)] mb-6">Newsletter</h3>
                    <p className="text-neutral-400 text-xs mb-4">
                        {dict?.footer?.newsletterDesc || 'Receba as últimas histórias automóveis na sua caixa de entrada semanalmente.'}
                    </p>
                    <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
                        <input
                            type="email"
                            placeholder={dict?.footer?.emailPlaceholder || 'O seu email principal...'}
                            className="bg-white/10 border border-white/10 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[var(--color-accent)] focus:bg-white/20 transition-all rounded-xl placeholder-neutral-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                            required
                        />
                        <button
                            type="submit"
                            className={`bg-[var(--color-accent)] text-white px-4 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black active:scale-95 transition-all rounded-xl shadow-xl shadow-red-900/10 ${status === 'loading' ? 'opacity-50 cursor-wait' : ''}`}
                            disabled={status === 'loading' || status === 'success'}
                        >
                            {status === 'loading' ? (dict?.footer?.statusLoading || 'A enviar...') : (status === 'success' ? (dict?.footer?.statusSuccess || 'Subscrito!') : (dict?.footer?.subscribe || 'Subscrever'))}
                        </button>
                        {message && (
                            <p className={`text-xs mt-2 ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </p>
                        )}
                    </form>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-8 border-t border-[var(--color-secondary)] text-center text-xs text-neutral-500 uppercase tracking-widest">
                <p>&copy; {currentYear} Road Panda 92 Media. {dict?.footer?.rights || 'Todos os direitos reservados'}.</p>
            </div>
        </footer>
    );
}
