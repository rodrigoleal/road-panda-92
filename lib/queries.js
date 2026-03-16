
import { gql } from 'graphql-tag';

export const HOMEPAGE_QUERY = gql`
  query HomepageQuery {
    heroSettings: posts(first: 1, where: { categoryName: "destaque-principal" }) {
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
    scrollHighlights: posts(first: 10, where: { categoryName: "destaque-scroll" }) {
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
    latestPosts: posts(first: 13) {
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
    seriesVideos: posts(first: 5, where: { categoryName: "series" }) {
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
  }
`;

export const SEARCH_POSTS_QUERY = gql`
  query SearchPosts($search: String!) {
    posts(where: { search: $search }, first: 20) {
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
    }
  }
`;

export const GET_MORE_POSTS = gql`
  query MorePosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
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
  query PostsByCategory($slug: String!) {
    posts(where: { categoryName: $slug }, first: 20) {
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
