
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
                    <div className="flex space-x-4">
                        {/* Social Icons Placeholders */}
                        {['Twitter', 'Instagram', 'YouTube'].map(social => (
                            <a key={social} href="#" className="text-[var(--color-detail)] hover:text-white transition-colors text-xs uppercase font-bold tracking-widest">{social}</a>
                        ))}
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
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-detail)] mb-6">Recursos</h3>
                    <ul className="space-y-3 text-sm font-medium">
                        <li><Link href="/about" className="hover:text-[var(--color-accent)] transition-colors">Sobre Nós</Link></li>
                        <li><Link href="/contact" className="hover:text-[var(--color-accent)] transition-colors">Contacto</Link></li>
                        <li><Link href="/advertise" className="hover:text-[var(--color-accent)] transition-colors">Publicidade</Link></li>
                        <li><Link href="/careers" className="hover:text-[var(--color-accent)] transition-colors">Carreiras</Link></li>
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
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidade</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Termos de Serviço</Link>
                </div>
            </div>
        </footer>
    );
}
