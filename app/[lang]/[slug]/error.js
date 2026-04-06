'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error('Page Error Boundary caught:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-neutral-900 text-white">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Algo correu mal (Error Boundary)</h2>
            <div className="bg-black/50 p-4 rounded mb-6 max-w-2xl overflow-auto border border-red-900/50">
                <p className="font-mono text-xs text-red-300 whitespace-pre-wrap">
                    {error.message}
                </p>
                {error.stack && (
                    <p className="font-mono text-[10px] text-neutral-500 mt-2 whitespace-pre-wrap border-t border-white/10 pt-2">
                        {error.stack}
                    </p>
                )}
            </div>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-[var(--color-accent)] rounded hover:bg-red-700 transition-colors font-bold"
            >
                Tentar Novamente
            </button>
        </div>
    );
}
