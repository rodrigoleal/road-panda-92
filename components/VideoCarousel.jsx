
'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function VideoCarousel({ videos }) {
    if (!videos || videos.length === 0) return null;

    // Simplified carousel logic for MVP (could use swiper or similar)
    // For now, let's just do a horizontal scroll container

    return (
        <section className="py-20 bg-neutral-900 text-white overflow-hidden">
            <div className="container mx-auto px-4 mb-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white border-l-4 border-[var(--color-accent)] pl-4">
                    Original Series
                </h2>
            </div>

            <div className="relative">
                <div className="flex overflow-x-auto space-x-6 pb-8 pl-[max(1rem,calc((100vw-1280px)/2))] scrollbar-hide snap-x">
                    {videos.map((video) => (
                        <Link key={video.id} href={`/${video.slug}`} className="snap-start shrink-0 relative w-[80vw] md:w-[600px] group block">
                            <div className="aspect-video bg-neutral-800 rounded-lg overflow-hidden relative shadow-2xl">
                                <img
                                    src={video.featuredImage?.node?.sourceUrl || '/placeholder_video.jpg'}
                                    alt={video.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black via-black/80 to-transparent">
                                    <h3 className="text-2xl font-bold font-serif text-white">{video.title}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
