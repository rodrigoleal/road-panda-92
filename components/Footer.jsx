
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
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
                setMessage('Obrigado por subscrever!');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.error || 'Algo correu mal.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Erro de conexão.');
        }
    };

    return (
        <footer className="bg-[#1C2120] text-[#E3E5E5] pt-20 pb-10 border-t-4 border-[var(--color-accent)] mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">

                {/* Branding */}
                <div className="lg:col-span-3">
                    <Link href="/" className="block mb-6">
                        <img src="/logo.png" alt="Road Panda 92" className="h-14 w-auto object-contain brightness-0 invert" />
                    </Link>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                        Jornalismo automóvel sem compromissos. Histórias diretamente do asfalto para o seu ecrã.
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
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Secções</h3>
                    <ul className="space-y-2 font-medium text-neutral-400 text-base">
                        <li><Link href="/latest" className="hover:text-white transition-colors">Últimas</Link></li>
                        <li><Link href="/category/reviews" className="hover:text-white transition-colors">Ensaios</Link></li>
                        <li><Link href="/category/news" className="hover:text-white transition-colors">Notícias</Link></li>
                        <li><Link href="/videos" className="hover:text-white transition-colors">Vídeos</Link></li>
                        <li><Link href="/category/opinion" className="hover:text-white transition-colors">Opinião</Link></li>
                        <li><Link href="/category/classics" className="hover:text-white transition-colors">Clássicos</Link></li>
                    </ul>
                </div>

                {/* OUTROS */}
                <div className="lg:col-span-2">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Outros</h3>
                    <ul className="space-y-2 font-medium text-neutral-400 text-base">
                        <li><Link href="/about" className="hover:text-white transition-colors">Quem somos</Link></li>
                        <li><Link href="/estatuto-editorial" className="hover:text-white transition-colors">Estatuto Editorial</Link></li>
                        <li><Link href="/ficha-tecnica" className="hover:text-white transition-colors">Ficha Técnica</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contactos</Link></li>
                        <li><a href="https://open.spotify.com/show/1NS8NiCNdROB8BDXIWYYdl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-[var(--color-detail)] flex items-center gap-2">Podcast Copiloto <span className="text-[10px]">↗</span></a></li>
                    </ul>
                </div>

                {/* LEGAL LINKS */}
                <div className="lg:col-span-2 lg:pt-11 mt-6 lg:mt-0">
                    <ul className="space-y-2 font-medium text-neutral-400 text-base">
                        <li><Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
                        <li><Link href="/cookies" className="hover:text-white transition-colors">Política de Cookies</Link></li>
                        <li><Link href="/terms" className="hover:text-white transition-colors">Termos de Utilização</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="lg:col-span-3 mt-6 lg:mt-0" id="newsletter">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-detail)] mb-6">Newsletter</h3>
                    <p className="text-neutral-400 text-xs mb-4">Receba as últimas histórias automóveis na sua caixa de entrada semanalmente.</p>
                    <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
                        <input
                            type="email"
                            placeholder="O seu email principal..."
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
                            {status === 'loading' ? 'A enviar...' : (status === 'success' ? 'Subscrito!' : 'Subscrever')}
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
                <p>&copy; {currentYear} Road Panda 92 Media. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
