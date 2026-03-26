
import { getClient } from '../lib/apollo-client';
import { HOMEPAGE_QUERY, GET_ALL_ADS } from '../lib/queries';
import Hero from '../components/Hero';
import VideoGallery from '../components/VideoGallery';
import InfiniteFeed from '../components/InfiniteFeed';
import AdRotatorClient from '../components/AdRotatorClient';
import { normalizeImageUrl } from '../lib/utils';

export const revalidate = 600;

export default async function Home() {
  const client = getClient();
  const [homeResponse, adsResponse] = await Promise.all([
      client.query({ query: HOMEPAGE_QUERY }),
      client.query({ query: GET_ALL_ADS })
  ]);

  const data = homeResponse.data;
  const rawAds = adsResponse.data?.ads?.nodes || [];
  
  // Format the GraphQL Ads object into simpler ad objects for the client
  const allAds = rawAds.map(adNode => ({
      id: adNode.id,
      title: adNode.title,
      position: adNode.placement,
      linkUrl: adNode.linkUrl,
      imageUrl: normalizeImageUrl(adNode.featuredImage?.node?.sourceUrl)
  }));

  const homeTopAds = allAds.filter(ad => ad.position === 'home-top');
  const heroSidebarAds = allAds.filter(ad => ad.position === 'hero-sidebar');
  const infiniteAds = allAds.filter(ad => ad.position === 'infinite-feed');

  // Hero section Logic
  const manualHero = data?.heroSettings?.nodes || [];
  const scrollHighlights = data?.scrollHighlights?.nodes || [];
  const allLatest = data?.latestPosts?.nodes || [];
  const seriesVideos = data?.seriesVideos?.nodes || [];

  const categorizedPosts = {
    classicos: data?.encontros3g?.nodes || [],
    ensaios: data?.maquinasIntemporais?.nodes || [],
    noticias: data?.viagemAtlantica?.nodes || [],
    opiniao: data?.historiasIconicas?.nodes || [],
    videos: data?.videos?.nodes || [],
    copiloto: data?.copiloto?.nodes || []
  };

  const categorizedIds = [
    ...categorizedPosts.classicos.map(p => p.id),
    ...categorizedPosts.ensaios.map(p => p.id),
    ...categorizedPosts.noticias.map(p => p.id),
    ...categorizedPosts.opiniao.map(p => p.id),
    ...categorizedPosts.videos.map(p => p.id),
    ...categorizedPosts.copiloto.map(p => p.id)
  ];

  // Main feature: Prioritize manualHero[0], fallback to 1st of allLatest
  const mainFeature = manualHero[0] || allLatest[0];
  
  // Collect all excluded IDs for the lists
  const heroId = mainFeature?.id;
  const highlightIds = new Set(scrollHighlights.map(h => h.id));
  
  // Latest for sidebar: take first 5 from allLatest ensuring no conflict with mainFeature or scrollHighlights
  const sidebarLatest = allLatest
    .filter(p => p.id !== heroId && !highlightIds.has(p.id))
    .slice(0, 5);
  
  // Feed starts after the sidebar items and categorized sections
  const sidebarIds = new Set(sidebarLatest.map(p => p.id));
  const catIdsSet = new Set(categorizedIds);
  const feedInitialLatest = allLatest.filter(p => 
    p.id !== heroId && 
    !highlightIds.has(p.id) && 
    !sidebarIds.has(p.id) &&
    !catIdsSet.has(p.id)
  );

  const feedEndCursor = data?.latestPosts?.pageInfo?.endCursor;
  const feedHasNextInfo = data?.latestPosts?.pageInfo?.hasNextPage;


  return (
    <div className="min-h-screen">
      <Hero 
        featuredPosts={mainFeature ? [mainFeature] : []} 
        latestPosts={sidebarLatest} 
        ads={heroSidebarAds}
      />
      
      <InfiniteFeed 
          initialPosts={feedInitialLatest} 
          initialCursor={feedEndCursor} 
          initialHasNext={feedHasNextInfo}
          allAds={infiniteAds}
          excludedPostIds={[heroId, ...Array.from(highlightIds), ...sidebarLatest.map(p => p.id), ...categorizedIds]}
          manualHighlights={scrollHighlights}
          categorizedPosts={categorizedPosts}
      />

      <VideoGallery limit={3} />
    </div>
  );
}
