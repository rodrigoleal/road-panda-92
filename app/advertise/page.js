export const metadata = {
    title: 'Publicidade | Road Panda 92',
    description: 'Anuncie no Road Panda 92 e alcance uma audiência apaixonada por automóveis.',
};

export default function AdvertisePage() {
    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 text-center">
                <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-xs mb-4 block">
                    Parcerias
                </span>
                <h1 className="text-5xl font-black text-[var(--foreground)] mb-6">
                    Publicidade
                </h1>
                <p className="text-xl text-neutral-500 max-w-2xl mx-auto mb-12">
                    Conecte a sua marca a uma audiência qualificada e apaixonada por cultura automóvel.
                </p>
                <div className="p-8 bg-neutral-50 rounded-xl max-w-3xl mx-auto border border-neutral-100">
                    <p className="text-neutral-400 italic">
                        Para solicitar o nosso Media Kit, envie um email para <a href="mailto:comercial@roadpanda92.com" className="text-[var(--color-accent)] font-bold hover:underline">comercial@roadpanda92.com</a>.
                    </p>
                </div>
            </div>
        </main>
    );
}
