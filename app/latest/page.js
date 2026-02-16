import { getClient } from '../../lib/apollo-client';
import { GET_MORE_POSTS } from '../../lib/queries';
import PostGrid from '../../components/PostGrid';

export const revalidate = 600;

export const metadata = {
    title: 'Últimas | Road Panda 92',
    description: 'As últimas histórias, notícias e ensaios do Road Panda 92.',
};

export default async function LatestPage() {
    const client = getClient();
    const { data } = await client.query({
        query: GET_MORE_POSTS,
        variables: { first: 20 },
    });

    const posts = data?.posts?.nodes || [];

    return (
        <main className="min-h-screen pt-20 pb-20">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <span className="inline-block text-[var(--color-accent)] font-bold tracking-[0.2em] uppercase text-xs mb-4 px-3 py-1 bg-red-50 rounded-full">
                        Arquivo
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-[var(--foreground)] mb-6 tracking-tighter">
                        Últimas Histórias
                    </h1>
                    <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto mb-6"></div>
                    <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
                        Explore todo o nosso conteúdo, organizado cronologicamente.
                        Das últimas novidades aos ensaios aprofundados.
                    </p>
                </div>

                {posts.length > 0 ? (
                    <PostGrid posts={posts} showHeader={false} />
                ) : (
                    <div className="text-center py-20 text-neutral-500">
                        <h3 className="text-2xl font-bold mb-2">Sem histórias ainda.</h3>
                        <p>Esta estrada ainda está por explorar.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
