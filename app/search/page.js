import { getClient } from '../../lib/apollo-client';
import { SEARCH_POSTS_QUERY } from '../../lib/queries';
import PostGrid from '../../components/PostGrid';

export default async function SearchPage({ searchParams }) {
    const params = await searchParams;
    const q = params?.q || '';
    
    let searchResults = [];

    if (q) {
        const client = getClient();
        try {
            const { data } = await client.query({
                query: SEARCH_POSTS_QUERY,
                variables: { search: q },
            });
            searchResults = data?.posts?.nodes || [];
        } catch (error) {
            console.error("Search error:", error);
        }
    }

    return (
        <div className="min-h-screen pt-32 pb-16">
            <div className="container mx-auto px-4">
                <header className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[var(--foreground)] mb-4">
                        Resultados da Pesquisa
                    </h1>
                    <p className="text-lg text-neutral-500 font-medium">
                        {q ? (
                            <>
                                Para o termo: <span className="text-[var(--color-accent)] font-bold">"{q}"</span>
                            </>
                        ) : (
                            "Por favor, introduza um termo para pesquisar."
                        )}
                    </p>
                </header>

                {searchResults.length > 0 ? (
                    <PostGrid posts={searchResults} />
                ) : (
                    q && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <h2 className="text-2xl font-bold mb-2">Sem resultados encontrados</h2>
                            <p className="text-neutral-500">Tente pesquisar com outras palavras-chave.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
