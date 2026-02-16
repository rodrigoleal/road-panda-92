export const metadata = {
    title: 'Sobre Nós | Road Panda 92',
    description: 'Conheça a equipa e a missão do Road Panda 92.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 text-center">
                <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-xs mb-4 block">
                    Road Panda 92
                </span>
                <h1 className="text-5xl font-black text-[var(--foreground)] mb-6">
                    Sobre Nós
                </h1>
                <p className="text-xl text-neutral-500 max-w-2xl mx-auto mb-12">
                    Jornalismo automóvel independente, focado na cultura, na história e na emoção de conduzir.
                </p>
                <div className="p-8 bg-neutral-50 rounded-xl max-w-3xl mx-auto border border-neutral-100">
                    <p className="text-neutral-400 italic">
                        Esta página está em construção. A nossa história completa estará disponível em breve.
                    </p>
                </div>
            </div>
        </main>
    );
}
