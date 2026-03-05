
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
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                {/* Branding */}
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="block mb-6">
                        <img src="/logo.png" alt="Road Panda 92" className="h-14 w-auto object-contain" />
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

                {/* Navigation Columns */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-detail)] mb-6">Editorial</h3>
                    <ul className="space-y-3 text-sm font-medium">
                        <li><Link href="/latest" className="hover:text-[var(--color-accent)] transition-colors">Últimas Notícias</Link></li>
                        <li><Link href="/category/reviews" className="hover:text-[var(--color-accent)] transition-colors">Ensaios e Testes</Link></li>
                        <li><Link href="/category/news" className="hover:text-[var(--color-accent)] transition-colors">Notícias</Link></li>
                        <li><Link href="/category/videos" className="hover:text-[var(--color-accent)] transition-colors">Vídeos</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Outros</h3>
                    <ul className="space-y-3 font-medium text-neutral-400 text-base">
                        <li><Link href="/about" className="hover:text-white transition-colors">Quem somos</Link></li>
                        <li><Link href="/estatuto-editorial" className="hover:text-white transition-colors">Estatuto Editorial</Link></li>
                        <li><Link href="/ficha-tecnica" className="hover:text-white transition-colors">Ficha Técnica</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contactos</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div id="newsletter">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-detail)] mb-6">Newsletter</h3>
                    <p className="text-neutral-400 text-xs mb-4">Receba as últimas histórias automóveis na sua caixa de entrada semanalmente.</p>
                    <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
                        <input
                            type="email"
                            placeholder="O seu email"
                            className="bg-[var(--color-secondary)] border border-[var(--color-secondary)] text-white px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors rounded-lg placeholder-neutral-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                            required
                        />
                        <button
                            type="submit"
                            className={`bg-[var(--color-accent)] text-white px-4 py-3 text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-colors rounded-lg shadow-lg shadow-red-900/20 ${status === 'loading' ? 'opacity-50 cursor-wait' : ''}`}
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

            <div className="container mx-auto px-4 pt-8 border-t border-[var(--color-secondary)] text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 uppercase tracking-widest">
                <p>&copy; {currentYear} Road Panda 92 Media. Todos os direitos reservados.</p>
                <div className="flex flex-col space-y-2 mt-6 md:mt-0 text-left md:text-right font-medium text-neutral-400 text-base">
                    <Link href="/privacy" className="hover:text-white hover:underline transition-all">Política de Privacidade</Link>
                    <Link href="/cookies" className="hover:text-white hover:underline transition-all">Política de Cookies</Link>
                    <Link href="/terms" className="hover:text-white hover:underline transition-all">Termos de Utilização</Link>
                </div>
            </div>
        </footer>
    );
}
