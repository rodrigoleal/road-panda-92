export const metadata = {
    title: 'Ficha Técnica | Road Panda 92',
    description: 'Ficha Técnica da versão digital da Road Panda 92.',
};

export default function FichaTecnicaPage() {
    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-3xl text-[var(--foreground)]">
                <div className="text-center mb-16">
                    <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-xs mb-4 block">
                        Road Panda 92
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">
                        Ficha Técnica
                    </h1>
                </div>

                <div className="prose prose-lg dark:prose-invert mx-auto card-controlled-bg border p-8 md:p-12 rounded-2xl shadow-sm">
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                            <span className="font-bold text-neutral-600 dark:text-neutral-400">Título</span>
                            <span className="font-bold text-[var(--foreground)]">Road Panda 92</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">Titular do Registo</span>
                            <span className="font-bold text-[var(--foreground)]">Rui Santa Rita</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">Proprietário</span>
                            <span className="font-bold text-[var(--foreground)]">Rui Santa Rita</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">Diretor</span>
                            <span className="font-bold text-[var(--foreground)]">Rui Santa Rita</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">Sede Editorial</span>
                            <span className="font-bold text-[var(--foreground)] text-right">
                                Rua Jorge Bento, Número 34<br/>
                                4450 Leça da Palmeira<br/>
                                Portugal
                            </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">Email de Contacto</span>
                            <span className="font-bold text-[var(--foreground)]">
                                <a href="mailto:roadpanda92@gmail.com" className="hover:text-[var(--color-accent)] transition-colors">
                                    roadpanda92@gmail.com
                                </a>
                            </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">Plataforma</span>
                            <span className="font-bold text-[var(--foreground)]">
                                <a href="https://www.roadpanda92.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">
                                    www.roadpanda92.com
                                </a>
                            </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">Periodicidade</span>
                            <span className="font-bold text-[var(--foreground)] sm:text-right sm:max-w-xs">
                                Conteúdos publicados de forma regular, sem periodicidade fixa.
                            </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between pt-2">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">Número de Registo na ERC</span>
                            <span className="font-bold text-[var(--foreground)]">[COLOCAR Nº]</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
