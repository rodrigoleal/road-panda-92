import { getClient } from '../../lib/apollo-client';
import { GET_MORE_POSTS } from '../../lib/queries';
import PostGrid from '../../components/PostGrid';
import AdRotatorClient from '../../components/AdRotatorClient';
import { GET_ALL_ADS } from '../../lib/queries';
import { normalizeImageUrl } from '../../lib/utils';

export const revalidate = 600;

export const metadata = {
    title: 'Últimas | Road Panda 92',
    description: 'As últimas histórias, notícias e ensaios do Road Panda 92.',
};

export default async function LatestPage() {
    const client = getClient();
    const [dataResponse, adsResponse] = await Promise.all([
        client.query({
            query: GET_MORE_POSTS,
            variables: { first: 20 },
        }),
        client.query({ query: GET_ALL_ADS })
    ]);

    const data = dataResponse.data;
    const rawAds = adsResponse.data?.ads?.nodes || [];

    const allAds = rawAds.map(adNode => ({
        id: adNode.id,
        title: adNode.title,
        position: adNode.placement,
        linkUrl: adNode.linkUrl,
        imageUrl: normalizeImageUrl(adNode.featuredImage?.node?.sourceUrl)
    }));

    const latestTopAds = allAds.filter(ad => ad.position === 'latest-top');

    const posts = data?.posts?.nodes || [];

    return (
        <main className="min-h-screen pt-20 pb-20">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-[var(--foreground)] mb-6 tracking-tighter">
                        Últimas Histórias
                    </h1>
                    <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto mb-6"></div>
                    <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
                        Explore todo o nosso conteúdo, organizado cronologicamente.
                        Das últimas novidades aos ensaios aprofundados.
                    </p>
                </div>

                {latestTopAds.length > 0 && (
                    <div className="mb-16">
                        <AdRotatorClient activeAds={latestTopAds} />
                    </div>
                )}

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
