import { getDictionary } from '@/lib/dictionary';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return {
        title: `${dict.pages.about.title} | Road Panda 92`,
        description: dict.pages.about.whoWeAre.p1,
    };
}

export default async function AboutPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const { about } = dict.pages;

    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-3xl text-[var(--foreground)]">
                <div className="text-center mb-16">
                    <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-xs mb-4 block">
                        Road Panda 92
                    </span>
                    <h1 className="text-5xl font-black mb-6">
                        {about.title}
                    </h1>
                </div>

                <div className="prose prose-lg dark:prose-invert mx-auto">
                    <h2>{about.whoWeAre.title}</h2>
                    <p>{about.whoWeAre.p1}</p>
                    <p>{about.whoWeAre.p2}</p>
                    <p>{about.whoWeAre.p3}</p>

                    <h2 className="mt-12">{about.approach.title}</h2>
                    <p>{about.approach.p1}</p>
                    <p>{about.approach.distinguish}</p>
                    <ul>
                        {about.approach.items.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                    <p>{about.approach.transparency}</p>

                    <h2 className="mt-12">{about.topics.title}</h2>
                    <p>{about.topics.intro}</p>
                    <ul>
                        {about.topics.items.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                    <p>{about.topics.summary}</p>

                    <h2 className="mt-12">{about.presence.title}</h2>
                    <p>{about.presence.intro}</p>
                    <ul>
                        {about.presence.items.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                    <p>{about.presence.footer}</p>

                    <h2 className="mt-12">{about.project.title}</h2>
                    <p>{about.project.p1}</p>
                    <p>{about.project.footer}</p>
                </div>
            </div>
        </main>
    );
}
