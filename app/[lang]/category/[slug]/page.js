
import { getClient } from '../../../../lib/apollo-client';
import { GET_POSTS_BY_CATEGORY } from '../../../../lib/queries';
import PostGrid from '../../../../components/PostGrid';
import AdRotatorClient from '../../../../components/AdRotatorClient';
import { GET_ALL_ADS } from '../../../../lib/queries';
import { normalizeImageUrl, getLocalizedSlug, getBaseSlug } from '../../../../lib/utils';
import { getDictionary } from '../../../../lib/dictionary';
import { replaceContentUrls } from '../../../../lib/utils';
import ArticleTranslationsSetter from '../../../../components/ArticleTranslationsSetter';

export const revalidate = 600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  // Simple metadata for now, ideally fetch category name
  return {
    title: `Category: ${slug} | Road Panda 92`,
  };
}

export default async function CategoryPage(props) {
  const params = await props.params;
  const { slug, lang } = params;
  const dict = await getDictionary(lang);
  const wpLang = lang.split('-')[0].toUpperCase();

  // Handle slug mismatches (URL -> DB)
  const slugMapping = {
    'classics': 'encontros-3g',
    'classicos': 'encontros-3g',
    'history': 'historia',
    'reviews': 'maquinas-intemporais',
    'ensaios': 'maquinas-intemporais',
    'news': 'viagem-atlantica',
    'noticias': 'viagem-atlantica',
    'opinion': 'historias-iconicas',
    'opiniao': 'historias-iconicas'
  };

  const querySlug = slugMapping[getBaseSlug(slug)] || slug;

  const client = getClient();
  const [dataResponse, adsResponse] = await Promise.all([
    client.query({
      query: GET_POSTS_BY_CATEGORY,
      variables: { slug: getLocalizedSlug(querySlug, wpLang), lang: wpLang },
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

  const categoryTopAds = allAds.filter(ad => ad.position === 'category-top');

  // Manual mapping for category display names
  const categoryDisplayMapping = {
    'maquinas-intemporais': 'Máquinas Intemporais',
    'viagem-atlantica': 'Viagem Atlântica',
    'garage': 'Garage',
    'historias-iconicas': 'Histórias Icónicas',
    'encontros-3g': 'Encontros 3G',
    'copiloto': 'Copiloto',
    'dailydriver': 'Dia-a-Dia'
  };

  const wpCategory = data?.categories?.nodes[0];
  const wpTranslation = wpCategory?.translations?.find(t => t.language.code.toUpperCase() === wpLang);
  
  const dbName = wpCategory?.name || slug;
  
  const dictCategory = dict?.components?.categories?.[getBaseSlug(querySlug)] || dict?.components?.categories?.[getBaseSlug(slug)];
  
  // Get text from WP (either the matched translation node or the node itself)
  const wpName = wpTranslation?.name || wpCategory?.name;
  const wpDesc = wpTranslation?.description || wpCategory?.description;
  
  // Priority: 1. WP Custom Value 2. Local Dictionary 3. Display Mapping / DB Name
  const categoryName = wpName || dictCategory?.title || categoryDisplayMapping[getBaseSlug(slug)] || categoryDisplayMapping[getBaseSlug(querySlug)] || dbName;
  const posts = data?.posts?.nodes || [];
  
  // Priority: 1. WP Custom Value 2. Local Dictionary
  const description = wpDesc && wpDesc.trim() !== '' ? wpDesc : dictCategory?.description;

  return (
    <main className="min-h-screen pt-20 pb-20">
      <ArticleTranslationsSetter translations={wpCategory?.translations} />
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-[var(--foreground)] mb-6 tracking-tighter capitalize">
            {categoryName}
          </h1>
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto mb-6"></div>
          {description ? (
            <div 
              className="text-xl text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed prose prose-neutral dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: replaceContentUrls(description) }}
            />
          ) : (
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
              {dict.pages.category.explore.replace('{0}', categoryName)}
            </p>
          )}
        </div>

        {categoryTopAds.length > 0 && (
          <div className="mb-16">
            <AdRotatorClient activeAds={categoryTopAds} />
          </div>
        )}

        {posts.length > 0 ? (
          <PostGrid posts={posts} showHeader={false} lang={lang} dict={dict} />
        ) : (
          <div className="text-center py-20 text-neutral-500">
            <h3 className="text-2xl font-bold mb-2">{dict.pages.category.noStories}</h3>
            <p>{dict.pages.category.roadUnexplored}</p>
          </div>
        )}
      </div>
    </main>
  );
}
