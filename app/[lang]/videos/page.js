
import VideoGallery from '../../../components/VideoGallery';
import PostGrid from '../../../components/PostGrid';
import AdRotatorClient from '../../../components/AdRotatorClient';
import { getClient } from '../../../lib/apollo-client';
import { GET_POSTS_BY_CATEGORY, GET_ALL_ADS } from '../../../lib/queries';
import { normalizeImageUrl, getLocalizedSlug } from '../../../lib/utils';
import { getDictionary } from '../../../lib/dictionary';

export const metadata = {
    title: 'Vídeos | Road Panda 92',
    description: 'Assista às nossas séries originais e vídeos exclusivos sobre cultura automóvel.',
};

export default async function VideosPage(props) {
    const params = await props.params;
    const { lang } = params;
    const dict = await getDictionary(lang);
    const wpLang = lang.split('-')[0].toUpperCase();
    const slug = getLocalizedSlug('videos', wpLang);
    const client = getClient();

    const [dataResponse, adsResponse] = await Promise.all([
        client.query({
            query: GET_POSTS_BY_CATEGORY,
            variables: { slug, lang: wpLang },
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

    const videoTopAds = allAds.filter(ad => ad.position === 'video-top');
    const posts = data?.posts?.nodes || [];
    const categoryName = data?.categories?.nodes[0]?.name || 'Vídeos';
    const description = data?.categories?.nodes[0]?.description;

    return (
        <main className="min-h-screen pt-20">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-[var(--foreground)] mb-6 tracking-tighter !normal-case">
                        {categoryName}
                    </h1>
                    <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto mb-6"></div>
                    {description ? (
                        <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
                            {description}
                        </p>
                    ) : (
                        <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
                            {dict.pages.category.explore.replace('{0}', categoryName)}
                        </p>
                    )}
                </div>

                {videoTopAds.length > 0 && (
                    <div className="mb-16">
                        <AdRotatorClient activeAds={videoTopAds} />
                    </div>
                )}

                {posts.length > 0 && (
                    <div className="mb-24">
                        <PostGrid posts={posts} showHeader={false} lang={lang} dict={dict} />
                    </div>
                )}
            </div>
            
            <div className="border-t border-[var(--color-secondary)] pt-12">
                <VideoGallery limit={24} dict={dict} lang={lang} />
            </div>
            
            <section className="py-24 bg-[var(--color-secondary)] border-t border-neutral-100 dark:border-white/5 transition-colors duration-500">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl md:text-3xl font-black mb-8 italic text-[var(--foreground)] tracking-tight">
                        {dict.pages.videos.likeContent}
                    </h3>
                    <a 
                        href="https://www.youtube.com/@roadpanda92?sub_confirmation=1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-[var(--color-accent)] text-white px-10 py-5 rounded-full text-lg font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-[0_20px_50px_rgba(227,24,55,0.3)]"
                    >
                        {dict.pages.videos.subscribe}
                    </a>
                </div>
            </section>
        </main>
    );
}
