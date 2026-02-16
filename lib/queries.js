
import { gql } from 'graphql-tag';

export const HOMEPAGE_QUERY = gql`
  query HomepageQuery {
    heroSettings: posts(first: 7, where: { categoryName: "featured" }) {
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
    latestPosts: posts(first: 6, where: { notIn: [ "featured" ] }) {
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
