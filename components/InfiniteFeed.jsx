'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format, formatDistanceToNow } from 'date-fns';
import { pt, enUS, es, it } from 'date-fns/locale';
import { normalizeImageUrl, getCategoryColor, getBaseSlug, formatLocalizedDate } from '../lib/utils';
import { getDisplayCategory } from '../lib/categoryUtils';
import { getClient } from '../lib/apollo-client';
import { GET_MORE_POSTS } from '../lib/queries';
import AdRotatorClient from './AdRotatorClient';

export default function InfiniteFeed({ 
    initialPosts = [], 
    initialCursor, 
    initialHasNext = true, 
    allAds = [], 
    excludedPostIds = [], 
    manualHighlights = [],
    categorizedPosts = {},
    lang = 'pt-PT',
    dict
}) {
    const dateLocales = { 'pt-PT': pt, 'en-US': enUS, 'es-ES': es, 'it-IT': it };
    const dateLocale = dateLocales[lang] || pt;
    const [posts, setPosts] = useState(initialPosts);
    const [loading, setLoading] = useState(false);
    const [cursor, setCursor] = useState(initialCursor);
    const [hasMore, setHasMore] = useState(initialHasNext);
    const [highlightsPool] = useState(manualHighlights);
    const observerRef = useRef(null);

    const feedAds = allAds.filter(ad => ad.position === 'infinite-feed');

    const isFetchingRef = useRef(false);

    const loadMore = async () => {
        if (loading || !hasMore || isFetchingRef.current) return;
        
        isFetchingRef.current = true;
        setLoading(true);

        try {
            const client = getClient();
            const { data } = await client.query({
                query: GET_MORE_POSTS,
                variables: {
                    first: 12, 
                    after: cursor,
                    lang: lang.split('-')[0].toUpperCase(),
                }
            });

            const newPosts = data?.posts?.nodes || [];
            const pageInfo = data?.posts?.pageInfo;

            if (newPosts.length === 0) {
                setHasMore(false);
            } else {
                let uniqueNew = [];
                setPosts(prev => {
                    // Get all IDs that are currently visible or excluded
                    const currentIds = new Set([
                        ...prev.map(p => p.id),
                        ...excludedPostIds,
                        ...highlightsPool.map(h => h.id)
                    ]);
                    
                    // Filter new ones that aren't already there
                    const tempNewIds = new Set();
                    
                    for (const post of newPosts) {
                        if (!currentIds.has(post.id) && !tempNewIds.has(post.id)) {
                            uniqueNew.push(post);
                            tempNewIds.add(post.id);
                        }
                    }
                    
                    return [...prev, ...uniqueNew];
                });

                setCursor(pageInfo?.endCursor);
                if (!pageInfo?.hasNextPage) {
                    setHasMore(false);
                } else if (uniqueNew.length === 0) {
                    // If we got posts but all were already shown, load more immediately
                    isFetchingRef.current = false;
                    setLoading(false);
                    return loadMore();
                }
            }
        } catch (error) {
            console.error("Failed to fetch more posts", error);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && hasMore) {
                loadMore();
            }
        }, { threshold: 0.1, rootMargin: '400px' });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [loading, hasMore, cursor]);


    const renderGridCard = (post) => {
        const imageUrl = normalizeImageUrl(post.featuredImage?.node?.sourceUrl) || '/placeholder_thumb.jpg';
        const category = post.categories?.nodes[0]?.name;

        return (
            <article key={post.id} className="group flex flex-col h-full card-controlled-bg border shadow-sm hover:shadow-xl hover:shadow-[var(--color-accent)]/10 transition-all duration-300 rounded-xl overflow-hidden">
                <Link href={`/${lang}/${post.slug}`} className="block overflow-hidden relative aspect-[3/2]">
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

                <div className="p-6 flex flex-col flex-1">
                    <div className="text-[10px] text-[var(--color-detail)] mb-3 font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="capitalize">{formatLocalizedDate(post.date, lang)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 leading-tight group-hover:text-[var(--color-accent)] transition-colors">
                        <Link href={`/${lang}/${post.slug}`}>
                            {post.title}
                        </Link>
                    </h3>
                    <div className="mt-auto pt-4 border-t border-[var(--color-secondary)]">
                        <Link href={`/${lang}/${post.slug}`} className="inline-flex items-center text-[var(--foreground)] font-bold text-xs uppercase tracking-widest hover:text-[var(--color-accent)] transition-colors group/link">
                            {dict?.components?.postGrid?.readStory || 'Ler História'} <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform text-[var(--color-accent)]">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </article>
        );
    };

    const renderInvertedHighlight = (post) => {
        const imageUrl = normalizeImageUrl(post.featuredImage?.node?.sourceUrl) || '/placeholder_thumb.jpg';

        return (
            <section key={post.id} className="my-16 bg-[var(--foreground)] text-[var(--background)]">
                <div className="container mx-auto px-4 py-16 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
                            {(() => {
                                const displayCategory = getDisplayCategory(post.categories);
                                if (!displayCategory) return null;
                                return (
                                    <span 
                                        className="inline-block text-white text-[10px] font-bold uppercase px-3 py-1 tracking-wider shadow-sm rounded-md mb-6 self-start"
                                        style={{ backgroundColor: getCategoryColor(displayCategory.slug) }}
                                    >
                                        {displayCategory.name}
                                    </span>
                                );
                            })()}
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight hover:text-[var(--color-accent)] transition-colors">
                                <Link href={`/${lang}/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </h2>
                            {post.excerpt && (
                                <div className="text-lg opacity-80 mb-8 leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                            )}
                            <div className="flex items-center gap-6">
                                <Link href={`/${lang}/${post.slug}`} className="inline-flex items-center font-bold text-sm uppercase tracking-widest hover:text-[var(--color-accent)] transition-colors group/link">
                                    {dict?.components?.postGrid?.readStory || 'Ler História'} <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform text-[var(--color-accent)]">&rarr;</span>
                                </Link>
                                <span className="text-xs font-bold opacity-50 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-8 h-[2px] bg-[var(--color-accent)]"></span>
                                    {formatDistanceToNow(new Date(post.date), { locale: dateLocale, addSuffix: true })}
                                </span>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 order-1 lg:order-2">
                             <Link href={`/${lang}/${post.slug}`} className="block relative w-full rounded-2xl overflow-hidden shadow-2xl group min-h-[300px] md:min-h-[400px]">
                                <Image
                                    src={imageUrl}
                                    alt={post.title}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                             </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    };
    
    const renderCategorySection = (title, categoryPosts, slug) => {
        if (!categoryPosts || categoryPosts.length === 0) return null;
        
        return (
            <div key={`category-${slug}`} className="container mx-auto px-4 pt-16 pb-8 border-t border-[var(--color-secondary)]">
                <div className="flex justify-between items-end mb-12 border-b-4 border-double border-[var(--color-secondary)] pb-4">
                    <h2 className="text-4xl font-black text-[var(--foreground)] pl-2 border-l-8 border-[var(--color-accent)] uppercase tracking-tighter">
                        {title}
                    </h2>
                    <Link 
                        href={`/${lang}/category/${slug}`}
                        className="text-xs font-black uppercase tracking-widest text-[var(--color-accent)] hover:opacity-70 transition-opacity"
                    >
                        {dict?.components?.infiniteFeed?.viewAll || 'Ver Tudo'} →
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryPosts.map(post => renderGridCard(post))}
                </div>
            </div>
        );
    };
    
    // Chunking logic for rendering grid + highlight pattern
    const renderFeed = () => {
        const elements = [];
        const renderedIds = new Set();

        const filterNew = (sectionPosts) => {
            const result = [];
            for (const p of sectionPosts) {
                if (p && p.id && !renderedIds.has(p.id)) {
                    result.push(p);
                    renderedIds.add(p.id);
                }
            }
            return result;
        };

        const renderNextHighlight = () => {
            let highlightPost = null;
            while (manualHighlightIndex < highlightsPool.length && !highlightPost) {
                const potential = highlightsPool[manualHighlightIndex];
                if (!renderedIds.has(potential.id)) {
                    highlightPost = potential;
                    renderedIds.add(potential.id);
                }
                manualHighlightIndex++;
            }
            // Fallback to latest posts pool if needed
            if (!highlightPost) {
                while (postsIndex < posts.length && !highlightPost) {
                    const p = posts[postsIndex];
                    if (!renderedIds.has(p.id)) {
                        highlightPost = p;
                        renderedIds.add(p.id);
                    }
                    postsIndex++;
                }
            }
            if (highlightPost) return renderInvertedHighlight(highlightPost);
            return null;
        };

        let postsIndex = 0;
        let manualHighlightIndex = 0;
        let chunkCount = 0;

        // Add Categorized Sections with interleaved Highlights
        if (categorizedPosts.classicos?.length > 0) {
            const filtered = filterNew(categorizedPosts.classicos);
            if (filtered.length > 0) {
                elements.push(renderNextHighlight());
                elements.push(renderCategorySection(dict?.components?.categories?.['encontros-3g']?.title || 'Encontros 3G', filtered, 'encontros-3g'));
            }
        }
        if (categorizedPosts.opiniao?.length > 0) {
            const filtered = filterNew(categorizedPosts.opiniao);
            if (filtered.length > 0) {
                elements.push(renderNextHighlight());
                elements.push(renderCategorySection(dict?.components?.categories?.['historias-iconicas']?.title || 'Histórias Icónicas', filtered, 'historias-iconicas'));
            }
        }
        if (categorizedPosts.ensaios?.length > 0) {
            const filtered = filterNew(categorizedPosts.ensaios);
            if (filtered.length > 0) {
                elements.push(renderNextHighlight());
                elements.push(renderCategorySection(dict?.components?.categories?.['maquinas-intemporais']?.title || 'Máquinas Intemporais', filtered, 'maquinas-intemporais'));
            }
        }
        if (categorizedPosts.noticias?.length > 0) {
            const filtered = filterNew(categorizedPosts.noticias);
            if (filtered.length > 0) {
                elements.push(renderNextHighlight());
                elements.push(renderCategorySection(dict?.components?.categories?.['viagem-atlantica']?.title || 'Viagem Atlântica', filtered, 'viagem-atlantica'));
            }
        }
        if (categorizedPosts.garage?.length > 0) {
            const filtered = filterNew(categorizedPosts.garage);
            if (filtered.length > 0) {
                elements.push(renderNextHighlight());
                elements.push(renderCategorySection(dict?.components?.categories?.['garage']?.title || 'Garage', filtered, 'garage'));
            }
        }
        if (categorizedPosts.copiloto?.length > 0) {
            const filtered = filterNew(categorizedPosts.copiloto);
            if (filtered.length > 0) {
                elements.push(renderNextHighlight());
                elements.push(renderCategorySection(dict?.components?.categories?.['copiloto']?.title || 'Copiloto', filtered, 'copiloto'));
            }
        }

        while (postsIndex < posts.length || manualHighlightIndex < highlightsPool.length) {
            // Take next slice for grid
            const rawChunk = posts.slice(postsIndex, postsIndex + 12); // Slightly larger slice to account for filtering
            const gridPosts = [];
            let i = 0;
            while (gridPosts.length < 6 && i < rawChunk.length) {
                const p = rawChunk[i];
                if (!renderedIds.has(p.id)) {
                    gridPosts.push(p);
                    renderedIds.add(p.id);
                }
                i++;
                postsIndex++;
            }

            if (gridPosts.length > 0) {
                elements.push(
                    <div key={`chunk-${chunkCount}`} className="container mx-auto px-4 pt-16 pb-8 border-t border-[var(--color-secondary)]">
                        {chunkCount === 0 && (
                            <div className="flex justify-between items-end mb-12 border-b-4 border-double border-[var(--color-secondary)] pb-4">
                                <h2 className="text-4xl font-black text-[var(--foreground)] pl-2 border-l-8 border-[var(--color-accent)] uppercase tracking-tighter">
                                    {dict?.components?.infiniteFeed?.latestStories || 'Últimas Histórias'}
                                </h2>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {gridPosts.map(post => renderGridCard(post))}
                        </div>
                    </div>
                );
            }

            // Ads insertion
            if (chunkCount > 0 && feedAds.length > 0 && gridPosts.length > 0) {
                elements.push(
                    <div key={`ad-${chunkCount}`} className="container mx-auto px-4 mt-8 mb-4">
                        <AdRotatorClient activeAds={feedAds} />
                    </div>
                );
            }

            // Decide which highlight to show
            let highlightPost = null;
            if (manualHighlightIndex < highlightsPool.length) {
                const potential = highlightsPool[manualHighlightIndex];
                if (!renderedIds.has(potential.id)) {
                    highlightPost = potential;
                    renderedIds.add(potential.id);
                }
                manualHighlightIndex++;
            } else if (postsIndex < posts.length) {
                // Find next available post for highlight
                while (postsIndex < posts.length && !highlightPost) {
                    const p = posts[postsIndex];
                    if (!renderedIds.has(p.id)) {
                        highlightPost = p;
                        renderedIds.add(p.id);
                    }
                    postsIndex++;
                }
            }

            if (highlightPost) {
                elements.push(renderInvertedHighlight(highlightPost));
            }

            // Safety break to prevent infinite loop if no progress made
            if (gridPosts.length === 0 && !highlightPost && postsIndex >= posts.length && manualHighlightIndex >= highlightsPool.length) {
                break;
            }

            chunkCount++;
        }

        return elements;
    };

    return (
        <div className="pb-24">
            {renderFeed()}

            <div ref={observerRef} className="w-full py-12 flex justify-center mt-12">
                {loading && (
                    <div className="flex flex-col items-center opacity-50">
                        <svg className="animate-spin h-8 w-8 text-[var(--color-accent)] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-sm font-bold uppercase tracking-widest">{dict?.components?.infiniteFeed?.loadingTrack || 'A carregar pista...'}</span>
                    </div>
                )}
                {!hasMore && posts.length > 0 && (
                    <div className="text-sm font-bold opacity-30 uppercase tracking-widest text-center mt-8 border-t border-[var(--color-secondary)] pt-8 container mx-auto px-4">
                        {dict?.components?.infiniteFeed?.endOfRoad || 'Fim da estrada. Não há mais artigos para carregar.'}
                    </div>
                )}
            </div>
        </div>
    );
}
