import { getDictionary } from '@/lib/dictionary';
import Link from 'next/link';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return {
        title: `${dict.pages.technicalInfo.title} | Road Panda 92`,
        description: `${dict.pages.technicalInfo.title} da versão digital da Road Panda 92.`,
    };
}

export default async function FichaTecnicaPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const { technicalInfo } = dict.pages;

    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-3xl text-[var(--foreground)]">
                <div className="text-center mb-16">
                    <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-xs mb-4 block">
                        Road Panda 92
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">
                        {technicalInfo.title}
                    </h1>
                </div>

                <div className="prose prose-lg dark:prose-invert mx-auto card-controlled-bg border p-8 md:p-12 rounded-2xl shadow-sm">
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 md:items-center">
                            <span className="font-bold text-neutral-600 dark:text-neutral-400">{technicalInfo.labels.title}</span>
                            <span className="font-bold text-[var(--foreground)]">Road Panda 92</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 md:items-center">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">{technicalInfo.labels.holder}</span>
                            <span className="font-bold text-[var(--foreground)]">Rui Santa Rita</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 md:items-center">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">{technicalInfo.labels.owner}</span>
                            <span className="font-bold text-[var(--foreground)]">Rui Santa Rita</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 md:items-center">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">{technicalInfo.labels.director}</span>
                            <span className="font-bold text-[var(--foreground)]">Rui Santa Rita</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 md:items-start">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">{technicalInfo.labels.headquarters}</span>
                            <span className="font-bold text-[var(--foreground)] text-right">
                                Rua Jorge Bento, Número 34<br/>
                                4450 Leça da Palmeira<br/>
                                Portugal
                            </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 md:items-center">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">{technicalInfo.labels.contactEmail}</span>
                            <span className="font-bold text-[var(--foreground)]">
                                <a href="mailto:roadpanda92@gmail.com" className="hover:text-[var(--color-accent)] transition-colors">
                                    roadpanda92@gmail.com
                                </a>
                            </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 md:items-center">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">{technicalInfo.labels.platform}</span>
                            <span className="font-bold text-[var(--foreground)]">
                                <a href="https://www.roadpanda92.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">
                                    www.roadpanda92.com
                                </a>
                            </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 md:items-start">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">{technicalInfo.labels.periodicity}</span>
                            <span className="font-bold text-[var(--foreground)] sm:text-right sm:max-w-xs">
                                {technicalInfo.values.periodicity}
                            </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between pt-2 md:items-center">
                            <span className="font-bold text-neutral-500 dark:text-neutral-400">{technicalInfo.labels.ercNumber}</span>
                            <span className="font-bold text-[var(--foreground)]">128210</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

