import { getDictionary } from '@/lib/dictionary';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return {
        title: `${dict.pages.cookies.title} | Road Panda 92`,
        description: `${dict.pages.cookies.title} da Road Panda 92.`,
    };
}

export default async function CookiesPolicyPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const { cookies } = dict.pages;

    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-3xl text-[var(--foreground)]">
                <div className="text-center mb-16">
                    <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-xs mb-4 block">
                        Road Panda 92
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">
                        {cookies.title}
                    </h1>
                </div>

                <div className="prose prose-lg dark:prose-invert mx-auto">
                    {cookies.sections.map((section, index) => (
                        <div key={index} className="mt-12">
                            <h2 className="text-2xl font-bold">{section.title}</h2>
                            <p className="whitespace-pre-line">{section.content}</p>
                            
                            {section.list && (
                                <ul className="mt-4">
                                    {section.list.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}

                            {section.subsections && section.subsections.map((sub, si) => (
                                <div key={si} className="mt-8 pl-4 border-l-2 border-[var(--color-accent)]/20">
                                    <h3 className="text-xl font-bold">{sub.title}</h3>
                                    <p>{sub.content}</p>
                                </div>
                            ))}

                            {section.footer && (
                                <p className="mt-4 italic">{section.footer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
