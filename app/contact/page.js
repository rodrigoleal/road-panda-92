export const metadata = {
    title: 'Contacto | Road Panda 92',
    description: 'Entre em contacto com a equipa do Road Panda 92.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 text-center">
                <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-xs mb-4 block">
                    Fale Connosco
                </span>
                <h1 className="text-5xl font-black text-[var(--foreground)] mb-6">
                    Contacto
                </h1>
                <p className="text-xl text-neutral-500 max-w-2xl mx-auto mb-12">
                    Dúvidas, sugestões ou press releases? Estamos à escuta.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="p-8 bg-white shadow-lg rounded-xl border-t-4 border-[var(--color-accent)]">
                        <h3 className="text-xl font-bold mb-4">Geral</h3>
                        <a href="mailto:geral@roadpanda92.com" className="text-[var(--color-accent)] font-bold text-lg hover:underline">
                            geral@roadpanda92.com
                        </a>
                    </div>
                    <div className="p-8 bg-white shadow-lg rounded-xl border-t-4 border-[var(--color-detail)]">
                        <h3 className="text-xl font-bold mb-4">Editorial</h3>
                        <a href="mailto:editorial@roadpanda92.com" className="text-[var(--color-detail)] font-bold text-lg hover:underline">
                            editorial@roadpanda92.com
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
