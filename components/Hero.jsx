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
    
    const [posts, setPosts] = useState(latestPosts || []);
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
                
                {/* 1. Left Column: Últimas */}
                <div className="w-full lg:w-1/4 flex flex-col">
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

                {/* 2. Center Column: Main Feature */}
                <div className="w-full lg:w-2/3">
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mb-6 group">
                        <Link href={`/${mainFeature.slug}`}>
                            <Image
                                src={normalizeImageUrl(mainFeature.featuredImage?.node?.sourceUrl) || '/placeholder.jpg'}
                                alt={mainFeature.title}
                                fill
                                priority
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Category Tag (Filters out 'featured') */}
                            {(() => {
                                const category = mainFeature.categories?.nodes?.find(cat => cat.slug !== 'featured');
                                if (!category) return null;
                                return (
                                    <span 
                                        className="absolute top-4 left-4 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded shadow-lg tracking-widest z-10"
                                        style={{ backgroundColor: getCategoryColor(category.slug) }}
                                    >
                                        {category.name}
                                    </span>
                                );
                            })()}
                        </Link>
                    </div>
                    
                    <div className="text-center md:text-left px-2">
                         <Link href={`/${mainFeature.slug}`} className="group block">
                            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4 hover:text-[var(--color-accent)] transition-colors tracking-tighter uppercase">
                                {mainFeature.title}
                            </h2>
                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
                                <span className="w-10 h-0.5 bg-[var(--color-accent)]"></span>
                                Ler História &rarr;
                            </div>
                         </Link>
                    </div>
                </div>

                {/* 3. Right Column: Ad Placement */}
                {ads.length > 0 && (
                    <div className="hidden lg:block lg:w-1/4">
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
