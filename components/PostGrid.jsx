
import Link from 'next/link';
import Image from 'next/image';
import { normalizeImageUrl, getCategoryColor, getBaseSlug, formatLocalizedDate } from '../lib/utils';
import { getDisplayCategory } from '../lib/categoryUtils';

export default function PostGrid({ posts, showHeader = true, lang = 'pt-PT', dict, uniform = false }) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="py-16 border-t border-[var(--color-secondary)]">
            <div className="container mx-auto px-4">

                {/* Section Header with Double Lines */}
                {showHeader && (
                    <div className="flex justify-between items-end mb-12 border-b-4 border-double border-[var(--color-secondary)] pb-4">
                        <h2 className="text-4xl font-black text-[var(--foreground)] pl-2 border-l-8 border-[var(--color-accent)]">
                            {dict?.components?.postGrid?.latest || 'Últimas'}
                        </h2>
                        <Link href={`/${lang}/latest`} className="text-[var(--color-detail)] hover:text-[var(--color-accent)] font-bold uppercase tracking-widest text-xs transition-colors mb-1">
                            {dict?.components?.postGrid?.viewArchive || 'Ver Arquivo \u2192'}
                        </Link>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => {
                        const imageUrl = normalizeImageUrl(post.featuredImage?.node?.sourceUrl) || '/placeholder_thumb.jpg';
                        const category = post.categories?.nodes[0]?.name;

                        // First item is larger (2 columns wide) unless uniform mode is on
                        const isLarge = !uniform && index === 0;

                        return (
                            <article key={post.id} className={`group flex flex-col h-full card-controlled-bg border shadow-sm hover:shadow-xl hover:shadow-[var(--color-accent)]/10 transition-all duration-300 rounded-xl overflow-hidden ${isLarge ? 'md:col-span-2 md:flex-row' : ''}`}>
                                <Link href={`/${lang}/${post.slug}`} className={`block overflow-hidden relative ${isLarge ? 'w-full md:w-1/2 aspect-video md:aspect-auto' : 'aspect-[3/2]'}`}>
                                    <Image
                                        src={imageUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    {(() => {
                                        const displayCategory = getDisplayCategory(post.categories);
                                        if (!displayCategory) return null;
                                        return (
                                            <span 
                                                className="absolute top-4 left-4 text-white text-[10px] font-bold uppercase px-3 py-1 tracking-wider shadow-sm rounded-md"
                                                style={{ backgroundColor: getCategoryColor(displayCategory.slug) }}
                                            >
                                                {displayCategory.name}
                                            </span>
                                        );
                                    })()}
                                </Link>

                                <div className={`p-6 flex flex-col ${isLarge ? 'w-full md:w-1/2 justify-center p-8 md:p-12' : 'flex-1'}`}>
                                    <div className="text-[10px] text-[var(--color-detail)] mb-3 font-bold uppercase tracking-widest flex items-center gap-2">
                                        <span className="capitalize">{formatLocalizedDate(post.date, lang)}</span>
                                    </div>
                                    <h3 className={`${isLarge ? 'text-3xl md:text-4xl' : 'text-xl'} font-bold text-[var(--foreground)] mb-3 leading-tight group-hover:text-[var(--color-accent)] transition-colors`}>
                                        <Link href={`/${lang}/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h3>
                                    {post.excerpt && (
                                        <div className="text-neutral-400 line-clamp-3 mb-6 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                                    )}
                                    <div className="mt-auto">
                                        <Link href={`/${lang}/${post.slug}`} className="inline-flex items-center text-[var(--foreground)] font-bold text-xs uppercase tracking-widest hover:text-[var(--color-accent)] transition-colors group/link">
                                            {dict?.components?.postGrid?.readStory || 'Ler História'} <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform text-[var(--color-accent)]">&rarr;</span>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
