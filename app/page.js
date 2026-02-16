
import { getClient } from '../lib/apollo-client';
import { HOMEPAGE_QUERY } from '../lib/queries';
import Hero from '../components/Hero';
import PostGrid from '../components/PostGrid';
import VideoCarousel from '../components/VideoCarousel';

export const revalidate = 600;

export default async function Home() {
  const client = getClient();
  const { data } = await client.query({
    query: HOMEPAGE_QUERY,
  });

  // Hero now expects an array of 3 posts
  const heroPosts = data?.heroSettings?.nodes || [];
  const latestPosts = data?.latestPosts?.nodes || [];
  const seriesVideos = data?.seriesVideos?.nodes || [];

  return (
    <div className="min-h-screen">
      <Hero featuredPosts={heroPosts} />
      {/* <PostGrid posts={latestPosts} /> */}
      <VideoCarousel videos={seriesVideos} />
    </div>
  );
}
