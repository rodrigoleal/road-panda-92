
'use client';

import { useEffect, useState } from 'react';

// This would typically come from an env var or config file context
const ADS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true';

export default function AdUnit({ id, format = 'auto', className = '' }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Delay ad loading or checking logic
        if (ADS_ENABLED) {
            setIsVisible(true);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <div id={id} className={`ad-unit bg-neutral-100 border border-dashed border-neutral-300 flex items-center justify-center p-4 text-xs text-neutral-400 uppercase tracking-widest ${className}`}>
            ADVERTISEMENT ({id})
        </div>
    );
}
