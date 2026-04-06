import { getClient } from '../../../lib/apollo-client';
import { SEARCH_POSTS_QUERY } from '../../../lib/queries';
import PostGrid from '../../../components/PostGrid';
import { getDictionary } from '../../../lib/dictionary';

export default async function SearchPage(props) {
    const searchParams = await props.searchParams;
    const params = await props.params;
    const { lang } = params;
    const dict = await getDictionary(lang);
    const wpLang = lang.split('-')[0].toUpperCase();
    const q = searchParams?.q || '';
    
    let searchResults = [];

    if (q) {
        const client = getClient();
        try {
            const { data } = await client.query({
                query: SEARCH_POSTS_QUERY,
                variables: { search: q, lang: wpLang },
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
                        {dict.pages.search.title}
                    </h1>
                    <p className="text-lg text-neutral-500 font-medium">
                        {q ? (
                            <>
                                {dict.pages.search.forTerm} <span className="text-[var(--color-accent)] font-bold">"{q}"</span>
                            </>
                        ) : (
                            dict.pages.search.enterTerm
                        )}
                    </p>
                </header>

                {searchResults.length > 0 ? (
                    <PostGrid posts={searchResults} lang={lang} dict={dict} />
                ) : (
                    q && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <h2 className="text-2xl font-bold mb-2">{dict.pages.search.noResults}</h2>
                            <p className="text-neutral-500">{dict.pages.search.tryOther}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
