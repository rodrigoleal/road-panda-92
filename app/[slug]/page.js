import { getClient } from '../../lib/apollo-client';
import { GET_POST_BY_SLUG } from '../../lib/queries';
import GuestAuthor from '../../components/GuestAuthor';
import { format } from 'date-fns';
import Image from 'next/image';
import sanitizeHtml from 'sanitize-html';

export const revalidate = 600; // 10 minutes ISR

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const client = getClient();
    const { data } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });

    const post = data?.post;

    if (!post) return { title: 'Artigo Não Encontrado' };

    return {
      title: `${post.title} | Road Panda 92`,
      description: post.excerpt?.replace(/<[^>]*>/g, '') || '',
    };
  } catch (error) {
    console.error("Metadata Error:", error);
    return {
      title: 'Erro ao carregar artigo | Road Panda 92',
      description: 'Ocorreu um erro ao carregar os dados deste artigo.'
    };
  }
}

import { normalizeImageUrl } from '../../lib/utils';
import { GET_ALL_ADS } from '../../lib/queries';
import AdRotatorClient from '../../components/AdRotatorClient';

export default async function SinglePost({ params }) {
  try {
    const { slug } = await params;
    const client = getClient();
    
    // Fetch post and ads in parallel
    const [postResponse, adsResponse] = await Promise.all([
      client.query({ query: GET_POST_BY_SLUG, variables: { slug } }),
      client.query({ query: GET_ALL_ADS })
    ]);

    const post = postResponse.data?.post;
    const rawAds = adsResponse.data?.ads?.nodes || [];
    
    const allAds = rawAds.map(adNode => ({
        id: adNode.id,
        title: adNode.title,
        position: adNode.placement,
        linkUrl: adNode.linkUrl,
        imageUrl: normalizeImageUrl(adNode.featuredImage?.node?.sourceUrl)
    }));
    
    const topAds = allAds.filter(ad => ad.position === 'home-top');
    const sidebarAds = allAds.filter(ad => ad.position === 'article-sidebar');

    if (!post) {
      return (
        <div className="container mx-auto px-4 py-32 text-center text-neutral-900">
          <h1 className="text-4xl font-bold mb-4">404 - Artigo Não Encontrado</h1>
          <p className="text-neutral-500">A estrada termina aqui. Volte ao início.</p>
        </div>
      );
    }

    const sanitizedContent = sanitizeHtml(post.content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption', 'iframe', 'div', 'span']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        'img': ['src', 'alt', 'width', 'height', 'class', 'srcset'],
        'iframe': ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'referrerpolicy', 'loading'],
        'div': ['class', 'style'],
        'span': ['class', 'style'],
        '*': ['style', 'id']
      },
      allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
    });

    return (
      <article className="min-h-screen pb-20 pt-10">
        {/* Header */}
        <div className="text-[var(--foreground)] py-12 px-4 text-center">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-6 flex flex-wrap justify-center items-center gap-4 text-xs font-bold tracking-widest uppercase text-neutral-500">
              {post.categories?.nodes.map(cat => (
                <span key={cat.slug} className="text-[var(--color-accent)] bg-neutral-100 px-2 py-1 rounded-sm">{cat.name}</span>
              ))}
              <span>&bull;</span>
              <span>{format(new Date(post.date), "d 'de' MMMM, yyyy")}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-8 text-[var(--foreground)]">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-3">
              {post.author?.node?.avatar?.url && (
                <div className="relative w-10 h-10 rounded-full border-2 border-[var(--color-accent)] overflow-hidden">
                  <Image
                    src={normalizeImageUrl(post.author.node.avatar.url)}
                    alt={post.author.node.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-sm font-bold tracking-wide uppercase text-neutral-500">Por {post.author?.node?.name}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage?.node?.sourceUrl && (
          <div className="container mx-auto max-w-5xl mb-12 px-4">
            <div className="relative w-full h-auto aspect-video rounded-xl shadow-xl overflow-hidden group">
              <Image
                src={normalizeImageUrl(post.featuredImage.node.sourceUrl)}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              {/* Photo Credits Overlay */}
              {(post.featuredImage.node.caption || post.featuredImage.node.description) && (
                <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-sm text-neutral-600 px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center space-x-1 shadow-[2px_-2px_10px_rgba(0,0,0,0.1)] rounded-tr-md">
                   <span>&copy;</span>
                   <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.featuredImage.node.caption || post.featuredImage.node.description, { allowedTags: [] }) }} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-3/4">
                {topAds.length > 0 && <AdRotatorClient activeAds={topAds} />}

                <div
                    className="prose prose-xl md:prose-2xl mx-auto 
                    prose-headings:font-black prose-headings:text-[var(--foreground)] 
                    [&>*]:mb-6 [&_p]:mb-6 [&_li]:mb-4
                    prose-p:text-neutral-700 prose-p:leading-loose
                    prose-a:text-[var(--color-accent)] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-[var(--foreground)] prose-strong:font-black
                    prose-img:rounded-xl prose-img:shadow-lg
                    prose-blockquote:border-l-[var(--color-accent)] prose-blockquote:bg-neutral-50 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-neutral-600"
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />

                <GuestAuthor author={post.author?.node} />
            </div>
            
            <aside className="w-full lg:w-1/4 pt-8">
                <div className="sticky top-32">
                    {sidebarAds.length > 0 && <AdRotatorClient activeAds={sidebarAds} />}
                </div>
            </aside>
        </div>
      </article>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-32 text-center text-red-600">
        <h1 className="text-2xl font-bold mb-4">Erro ao carregar artigo</h1>
        <p className="mb-4">{error.message}</p>
        <pre className="text-left bg-neutral-100 p-4 rounded text-xs overflow-auto text-neutral-800">
          {error.stack}
        </pre>
      </div>
    );
  }
}
