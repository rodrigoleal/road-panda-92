
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function VideoGallery() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const res = await fetch('/api/youtube-feed');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setVideos(data);
                }
            } catch (error) {
                console.error('Failed to load videos', error);
            } finally {
                setLoading(false);
            }
        }
        fetchVideos();
    }, []);

    if (loading) {
        return (
            <div className="py-20 bg-[#121212] flex items-center justify-center">
                <div className="animate-pulse text-white font-bold tracking-widest uppercase">Carregando Galeria...</div>
            </div>
        );
    }

    if (videos.length === 0) return null;

    return (
        <section className="py-24 bg-[#121212] text-white overflow-hidden relative border-y border-white/5">
            <div className="container mx-auto px-4 mb-12 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="w-12 h-1 bg-[var(--color-accent)]"></span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                        Original <span className="text-[var(--color-accent)]">Series</span>
                    </h2>
                </div>
                <a 
                    href="https://www.youtube.com/@roadpanda92" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#E3E5E5]/50 hover:text-white transition-colors"
                >
                    Ver Canal <span className="text-lg">↗</span>
                </a>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <div 
                            key={video.id} 
                            className="group cursor-pointer"
                            onClick={() => setSelectedVideo(video)}
                        >
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] border border-white/5">
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                                
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-all duration-500 shadow-2xl">
                                        <svg className="w-6 h-6 text-white ml-1 fill-current" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Title on Thumbnail for Mobile */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent">
                                    <h3 className="text-lg font-bold leading-tight group-hover:text-white transition-colors line-clamp-2">
                                        {video.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox / Video Modal */}
            {selectedVideo && (
                <div 
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-300"
                    onClick={() => setSelectedVideo(null)}
                >
                    <button 
                        className="absolute top-6 right-6 text-white hover:text-[var(--color-accent)] transition-colors p-2 z-[1010]"
                        onClick={(e) => { e.stopPropagation(); setSelectedVideo(null); }}
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div 
                        className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                            title={selectedVideo.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
