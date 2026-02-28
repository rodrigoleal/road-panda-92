// Using native fetch (Node 18+)

const QUERY = `
  query GetPost {
    posts(first: 1) {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;

async function main() {
    console.log('Fetching from Local GraphQL...');

    try {
        const response = await fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: QUERY }),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const json = await response.json();
        const post = json.data?.posts?.nodes[0];

        if (!post) {
            console.log('No posts found.');
            return;
        }

        console.log('--- Post Data ---');
        console.log('Title:', post.title);
        console.log('Featured Image URL:', post.featuredImage?.node?.sourceUrl || 'None');
        console.log('Author Avatar URL:', post.author?.node?.avatar?.url || 'None');

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

main();
