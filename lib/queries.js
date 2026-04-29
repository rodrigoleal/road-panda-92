
import { gql } from 'graphql-tag';

export const getHomepageQuery = (wpLang) => {
  const sfx = wpLang === 'PT' ? '' : '-' + wpLang.toLowerCase();
  return gql`
  query HomepageQuery($lang: LanguageCodeFilterEnum) {
    heroSettings: posts(first: 1, where: { categoryName: "destaque-principal${sfx}", language: $lang }) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
    scrollHighlights: posts(first: 10, where: { categoryName: "destaque-scroll${sfx}", language: $lang }) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
    latestPosts: posts(first: 13, where: { language: $lang }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
    seriesVideos: posts(first: 5, where: { categoryName: "series${sfx}", language: $lang }) {
       nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    encontros3g: posts(first: 3, where: { categoryName: "encontros-3g${sfx}", language: $lang }) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
    maquinasIntemporais: posts(first: 3, where: { categoryName: "maquinas-intemporais${sfx}", language: $lang }) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
    viagemAtlantica: posts(first: 3, where: { categoryName: "viagem-atlantica${sfx}", language: $lang }) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
    historiasIconicas: posts(first: 3, where: { categoryName: "historias-iconicas${sfx}", language: $lang }) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
    videos: posts(first: 3, where: { categoryName: "videos${sfx}", language: $lang }) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
    copiloto: posts(first: 3, where: { categoryName: "copiloto${sfx}", language: $lang }) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;
};

export const SEARCH_POSTS_QUERY = gql`
  query SearchPosts($search: String!, $lang: LanguageCodeFilterEnum) {
    posts(where: { search: $search, language: $lang }, first: 20) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
            nodes {
                name
                slug
            }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      content
      date
      slug
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
          caption
          description
        }
      }
      author {
        node {
          name
          description
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      translations {
        slug
        language {
          code
        }
      }
    }
  }
`;

export const GET_MORE_POSTS = gql`
  query MorePosts($first: Int!, $after: String, $lang: LanguageCodeFilterEnum) {
    posts(first: $first, after: $after, where: { language: $lang }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
            nodes {
                name
                slug
            }
        }
      }
    }
  }
`;

export const GET_POSTS_BY_CATEGORY = gql`
  query PostsByCategory($slug: String!, $lang: LanguageCodeFilterEnum) {
    posts(where: { categoryName: $slug, language: $lang }, first: 20) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
            nodes {
                name
                slug
            }
        }
      }
    }
    categories(where: { slug: [$slug] }) {
      nodes {
        name
        description
        translations {
          name
          description
          slug
          language {
            code
          }
        }
      }
    }
  }
`;

export const GET_ALL_ADS = gql`
  query GetAllAds {
    ads(first: 100) {
      nodes {
        id
        title
        status
        placement
        linkUrl
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_RELATED_POSTS_BY_CATEGORY = gql`
  query RelatedPostsByCategory($categorySlug: String!, $notIn: [ID!], $lang: LanguageCodeFilterEnum) {
    posts(where: { categoryName: $categorySlug, notIn: $notIn, language: $lang }, first: 3) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
            nodes {
                name
                slug
            }
        }
      }
    }
  }
`;
