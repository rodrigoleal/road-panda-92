export const metadata = {
    title: 'Carreiras | Road Panda 92',
    description: 'Junte-se à equipa do Road Panda 92.',
};

export default function CareersPage() {
    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 text-center">
                <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-xs mb-4 block">
                    Junte-se a Nós
                </span>
                <h1 className="text-5xl font-black text-[var(--foreground)] mb-6">
                    Carreiras
                </h1>
                <p className="text-xl text-neutral-500 max-w-2xl mx-auto mb-12">
                    Estamos sempre à procura de novos talentos para contar as melhores histórias.
                </p>
                <div className="p-8 bg-neutral-50 rounded-xl max-w-3xl mx-auto border border-neutral-100">
                    <p className="text-neutral-400 italic">
                        Não temos vagas abertas no momento. Contudo, estamos sempre abertos a receber portfólios em <a href="mailto:carreiras@roadpanda92.com" className="text-[var(--color-accent)] font-bold hover:underline">carreiras@roadpanda92.com</a>.
                    </p>
                </div>
            </div>
        </main>
    );
}
