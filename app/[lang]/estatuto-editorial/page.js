import { getDictionary } from '@/lib/dictionary';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return {
        title: `${dict.pages.editorialStatus.title} | Road Panda 92`,
        description: dict.pages.editorialStatus.items[0].substring(0, 160),
    };
}

export default async function EstatutoEditorialPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const { editorialStatus } = dict.pages;

    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-3xl text-[var(--foreground)]">
                <div className="text-center mb-16">
                    <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-xs mb-4 block">
                        Road Panda 92
                    </span>
                    <h1 className="text-5xl font-black mb-6">
                        {editorialStatus.title}
                    </h1>
                </div>

                <div className="prose prose-lg dark:prose-invert mx-auto">
                    <ol className="space-y-4 list-decimal list-inside pl-4 marker:font-bold">
                        {editorialStatus.items.map((item, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                    </ol>
                </div>
            </div>
        </main>
    );
}
