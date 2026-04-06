import { getDictionary } from '@/lib/dictionary';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return {
        title: `${dict.pages.contact.title} | Road Panda 92`,
        description: dict.pages.contact.subtitle,
    };
}

export default async function ContactPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const { contact } = dict.pages;

    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 text-center">
                <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-xs mb-4 block">
                    {contact.tag}
                </span>
                <h1 className="text-5xl font-black text-[var(--foreground)] mb-6">
                    {contact.title}
                </h1>
                <p className="text-xl text-neutral-500 max-w-2xl mx-auto mb-12">
                    {contact.subtitle}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="p-8 bg-white dark:bg-neutral-900 shadow-lg rounded-xl border-t-4 border-[var(--color-accent)]">
                        <h3 className="text-xl font-bold mb-4">{contact.general}</h3>
                        <a href="mailto:geral@roadpanda92.com" className="text-[var(--color-accent)] font-bold text-lg hover:underline">
                            geral@roadpanda92.com
                        </a>
                    </div>
                    <div className="p-8 bg-white dark:bg-neutral-900 shadow-lg rounded-xl border-t-4 border-[var(--color-detail)]">
                        <h3 className="text-xl font-bold mb-4">{contact.editorial}</h3>
                        <a href="mailto:editorial@roadpanda92.com" className="text-[var(--color-detail)] font-bold text-lg hover:underline">
                            editorial@roadpanda92.com
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
