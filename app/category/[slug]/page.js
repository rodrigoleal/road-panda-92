
import { getClient } from '../../../lib/apollo-client';
import { GET_POSTS_BY_CATEGORY } from '../../../lib/queries';
import PostGrid from '../../../components/PostGrid';

export const revalidate = 600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  // Simple metadata for now, ideally fetch category name
  return {
    title: `Category: ${slug} | Road Panda 92`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  // Handle slug mismatches (URL -> DB)
  const slugMapping = {
    'classics': 'classicos',
    'history': 'historia' // Potential future case
  };

  const querySlug = slugMapping[slug] || slug;

  const client = getClient();
  const { data } = await client.query({
    query: GET_POSTS_BY_CATEGORY,
    variables: { slug: querySlug },
  });

  // Manual mapping for category display names
  const categoryDisplayMapping = {
    'reviews': 'Ensaios',
    'news': 'Notícias',
    'videos': 'Vídeos',
    'opinion': 'Opinião',
    'classics': 'Clássicos',
    'classicos': 'Clássicos',
    'dailydriver': 'Dia-a-Dia'
  };

  const dbName = data?.categories?.nodes[0]?.name || slug;
  const categoryName = categoryDisplayMapping[slug] || categoryDisplayMapping[querySlug] || dbName;
  const posts = data?.posts?.nodes || [];
  const description = data?.categories?.nodes[0]?.description;

  return (
    <main className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block text-[var(--color-accent)] font-bold tracking-[0.2em] uppercase text-xs mb-4 px-3 py-1 bg-red-50 rounded-full">
            Categoria
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-[var(--foreground)] mb-6 tracking-tighter capitalize">
            {categoryName}
          </h1>
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto mb-6"></div>
          {description ? (
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
              {description}
            </p>
          ) : (
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
              Explore todas as histórias, ensaios e notícias sobre {categoryName}.
            </p>
          )}
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
