'use client';

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body className="bg-neutral-900 text-white flex items-center justify-center min-h-screen">
                <div className="p-8 max-w-2xl">
                    <h2 className="text-3xl font-bold text-red-500 mb-4">Erro Crítico (Global)</h2>
                    <pre className="bg-black p-4 rounded text-red-300 overflow-auto mb-6 text-xs">
                        {error.message}
                    </pre>
                    <button
                        onClick={() => reset()}
                        className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-neutral-200"
                    >
                        Recarregar
                    </button>
                </div>
            </body>
        </html>
    );
}
