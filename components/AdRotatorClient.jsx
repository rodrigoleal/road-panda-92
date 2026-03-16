'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdRotatorClient({ activeAds = [], orientation = 'horizontal' }) {
    if (!activeAds || activeAds.length === 0) return null;
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const isRotating = activeAds.length > 1;
    const intervalMs = 6000; // Default 6 seconds between rotation

    useEffect(() => {
        let interval;
        if (isRotating) {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % activeAds.length);
            }, intervalMs);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRotating, activeAds.length, intervalMs]);

    const heightClass = orientation === 'vertical' ? 'aspect-[3/4] h-auto lg:h-[600px]' : 'h-32 md:h-48';

    return (
        <div className="w-full flex justify-center py-6">
            <div className="flex flex-col items-center max-w-4xl w-full">
                <span className="text-[10px] text-neutral-400 font-bold tracking-[0.2em] mb-3 uppercase">
                    Publicidade
                </span>
                
                <div className={`relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded shadow-sm group ${heightClass}`}>
                   {activeAds.map((ad, index) => {
                       const isActive = index === currentIndex;
                       return (
                           <Link 
                               key={ad.id} 
                               href={ad.linkUrl || '#'} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className={`absolute inset-0 block w-full h-full transition-opacity duration-1000 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                           >
                               <Image
                                   src={ad.imageUrl}
                                   alt={ad.title || 'Anúncio'}
                                   fill
                                   className="object-cover transition-transform duration-700 group-hover:scale-105"
                                   sizes="(max-width: 1024px) 100vw, 1024px"
                               />
                           </Link>
                       )
                   })}
                </div>
            </div>
        </div>
    );
}
