

import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';

export default function Hero({ featuredPosts }) {
    const mainFeature = featuredPosts?.[0];
    const subFeatures = featuredPosts?.slice(1, 3);
    const bottomFeatures = featuredPosts?.slice(3, 7);

    // Fallback if no featured posts exist (prevents broken header on fresh install)
    if (!mainFeature) {
        return (
            <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center bg-[var(--color-secondary)] overflow-hidden border-b-4 border-[var(--color-accent)]">
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <span className="inline-block bg-[var(--color-accent)] text-white text-xs font-bold uppercase px-4 py-1.5 mb-6 tracking-widest rounded-full">
                        Bem-vindo ao Road Panda 92
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                        O seu motor de cultura automóvel.
                    </h1>
                    <p className="text-xl text-neutral-300 mb-8 font-light max-w-2xl mx-auto">
                        Para ver conteúdo aqui, crie um post no WordPress e adicione a categoria <strong>"Featured"</strong>.
                    </p>
                    <Link href="/latest" className="inline-block bg-[var(--color-accent)] text-white px-8 py-3 text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20">
                        Ver Últimas Notícias
                    </Link>
                </div>
            </section>
        );
    }

    const hasSubFeatures = subFeatures && subFeatures.length > 0;
    const hasBottomFeatures = bottomFeatures && bottomFeatures.length > 0;

    const renderCard = (post, isSmall = false) => (
        <div key={post.id} className="flex flex-col group h-full card-controlled-bg rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border">
            <Link href={`/${post.slug}`} className="block w-full aspect-video overflow-hidden mb-4 relative shadow-md group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <img
                    src={post.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            </Link>
            <div className="flex flex-col flex-grow p-4">
                {post.categories?.nodes?.[0]?.name && (
                    <span className="text-[10px] font-bold text-[var(--color-accent)] uppercase mb-2 tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
                        {post.categories.nodes[0].name}
                    </span>
                )}
                <Link href={`/${post.slug}`}>
                    <h2 className={`${isSmall ? 'text-lg' : 'text-xl'} font-bold text-[var(--foreground)] leading-snug mb-3 group-hover:text-[var(--color-accent)] transition-colors`}>
                        {post.title}
                    </h2>
                </Link>
                <div className="text-neutral-500 text-sm line-clamp-2 mb-4 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: post.excerpt }} />

                <div className="mt-auto text-[10px] text-neutral-400 font-bold uppercase tracking-wider border-t border-neutral-100 pt-3">
                    {formatDistanceToNow(new Date(post.date), { locale: pt, addSuffix: true })}
                </div>
            </div>
        </div>
    );

    return (
        <section className="container mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[var(--foreground)] relative">
                    Notícias
                    <span className="absolute -bottom-5 left-0 w-24 h-1 bg-[var(--color-accent)]"></span>
                </h1>
                <Link href="/latest" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[var(--color-accent)] transition-colors">
                    Ver Todas <span className="text-[var(--color-accent)] text-lg">→</span>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-16">
                {/* Main Feature (Left) */}
                <div className={`w-full ${hasSubFeatures ? 'md:w-2/3' : 'w-full'} relative group h-[500px] md:h-[550px] overflow-hidden rounded-2xl shadow-lg`}>
                    <Link href={`/${mainFeature.slug}`} className="block w-full h-full relative z-0">
                        <img
                            src={mainFeature.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
                            alt={mainFeature.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />

                        <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-4xl z-10">
                            {mainFeature.categories?.nodes?.[0]?.name && (
                                <span className="inline-block bg-[var(--color-accent)] text-white text-[10px] font-bold uppercase px-3 py-1.5 mb-4 rounded-full tracking-widest shadow-md">
                                    {mainFeature.categories.nodes[0].name}
                                </span>
                            )}
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-none mb-6 group-hover:text-neutral-200 transition-colors drop-shadow-lg tracking-tight">
                                {mainFeature.title}
                            </h1>
                            <div className="text-white/80 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-[var(--color-accent)]"></span>
                                {formatDistanceToNow(new Date(mainFeature.date), { locale: pt, addSuffix: true })}
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Sub Features (Right) */}
                {hasSubFeatures && (
                    <div className="w-full md:w-1/3 flex flex-col gap-6 h-auto md:h-[550px]">
                        {subFeatures.map((post) => (
                            <div key={post.id} className="relative group h-[250px] md:h-1/2 overflow-hidden rounded-2xl flex-1 shadow-md">
                                <Link href={`/${post.slug}`} className="block w-full h-full">
                                    <img
                                        src={post.featuredImage?.node?.sourceUrl || '/placeholder.jpg'}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:bg-black/80" />

                                    <div className="absolute bottom-0 left-0 p-6 md:p-8 z-10 w-full">
                                        {post.categories?.nodes?.[0]?.name && (
                                            <span className="inline-block text-white/90 text-[10px] font-bold uppercase mb-2 tracking-widest flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_5px_var(--color-accent)]"></span>
                                                {post.categories.nodes[0].name}
                                            </span>
                                        )}
                                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2 group-hover:text-[var(--color-accent)] transition-colors drop-shadow-md">
                                            {post.title}
                                        </h2>
                                        <div className="text-white/60 text-[10px] font-bold uppercase tracking-wider">
                                            {formatDistanceToNow(new Date(post.date), { locale: pt, addSuffix: true })}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Features */}
            {hasBottomFeatures && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {bottomFeatures.map((post) => renderCard(post))}
                </div>
            )}
        </section>
    );
}
