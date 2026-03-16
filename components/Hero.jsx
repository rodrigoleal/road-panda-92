'use client';

import Link from 'next/link';
import Image from 'next/image';
import { normalizeImageUrl, getCategoryColor } from '../lib/utils';
import { useState, useRef } from 'react';
import { getClient } from '../lib/apollo-client';
import { GET_MORE_POSTS } from '../lib/queries';
import AdRotatorClient from './AdRotatorClient';

export default function Hero({ featuredPosts, latestPosts, ads = [] }) {
    const mainFeature = featuredPosts?.[0];
    
    const [posts, setPosts] = useState((latestPosts || []).slice(0, 5));
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [endCursor, setEndCursor] = useState(null);
    const listRef = useRef(null);

    const loadMorePosts = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const client = getClient();
            const { data } = await client.query({
                query: GET_MORE_POSTS,
                variables: {
                    first: 5,
                    after: endCursor,
                }
            });

            const newPosts = data?.posts?.nodes || [];
            const uniqueNewPosts = newPosts.filter(
                newPost => !posts.find(p => p.id === newPost.id) && newPost.id !== mainFeature?.id
            );

            if (newPosts.length === 0) {
                setHasMore(false);
            } else {
                setPosts(prev => [...prev, ...uniqueNewPosts]);
                setEndCursor(data?.posts?.pageInfo?.endCursor);
                if (!data?.posts?.pageInfo?.hasNextPage) {
                    setHasMore(false);
                }
            }
        } catch (error) {
            console.error("Failed to load more posts", error);
        }
        setLoading(false);
    };

    const handleScroll = () => {
        if (!listRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 200) {
            loadMorePosts();
        }
    };

    if (!mainFeature) return null;

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* 1. Left Column: Últimas (Pushed to 2nd position on mobile) */}
                <div className="w-full lg:w-1/4 flex flex-col order-2 lg:order-1">
                    <h2 className="text-xl font-black uppercase tracking-tight mb-6 border-b-2 border-[var(--color-accent)] pb-2 inline-block self-start">
                        Últimas
                    </h2>
                    
                    <div 
                        ref={listRef}
                        onScroll={handleScroll}
                        className="flex-1 overflow-y-auto max-h-[500px] lg:max-h-[600px] pr-4 custom-scrollbar space-y-2"
                    >
                        {posts.map((post) => (
                            <Link key={post.id} href={`/${post.slug}`} className="group block border-b border-neutral-200/50 dark:border-neutral-800/50 pt-2 pb-6 last:border-0 transition-colors">
                                <h3 className="text-[15px] font-black leading-tight group-hover:text-[var(--color-accent)] transition-colors mb-2 uppercase tracking-tight">
                                    {post.title}
                                </h3>
                                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-70 transition-opacity">
                                    <span>{post.author?.node?.name || 'Road Panda'}</span>
                                </div>
                            </Link>
                        ))}
                        
                        {loading && <div className="py-4 text-center text-xs font-bold animate-pulse">A carregar...</div>}
                    </div>
                </div>

                {/* 2. Center Column: Main Feature (Pushed to 1st position on mobile) */}
                <div className="w-full lg:w-2/3 order-1 lg:order-2">
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group">
                        <Link href={`/${mainFeature.slug}`}>
                            <Image
                                src={normalizeImageUrl(mainFeature.featuredImage?.node?.sourceUrl) || '/placeholder.jpg'}
                                alt={mainFeature.title}
                                fill
                                priority
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1C2120]/90 via-[#1C2120]/20 to-transparent pointer-events-none" />

                            {/* Category Tag */}
                            {(() => {
                                const internalSlugs = ['featured', 'destaque-principal', 'destaque-scroll'];
                                const category = mainFeature.categories?.nodes?.find(cat => !internalSlugs.includes(cat.slug));
                                if (!category) return null;
                                return (
                                    <span 
                                        className="absolute top-6 left-6 text-white text-[10px] font-bold uppercase px-4 py-2 rounded shadow-lg tracking-[0.2em] z-20"
                                        style={{ backgroundColor: getCategoryColor(category.slug) }}
                                    >
                                        {category.name}
                                    </span>
                                );
                            })()}

                            {/* Title Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 z-20 flex flex-col justify-end">
                                <h2 className="text-xl md:text-4xl lg:text-5xl font-black leading-[1.1] text-white mb-2 transition-all duration-500 group-hover:-translate-y-2 tracking-tighter">
                                    {mainFeature.title}
                                </h2>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* 3. Right Column: Ad Placement (Always last) */}
                {ads.length > 0 && (
                    <div className="hidden lg:block lg:w-1/4 order-3">
                        <div className="sticky top-24">
                           <AdRotatorClient activeAds={ads} orientation="vertical" />
                        </div>
                    </div>
                )}

            </div>
            
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: var(--color-accent);
                    border-radius: 10px;
                }
            `}</style>
        </section>
    );
}
