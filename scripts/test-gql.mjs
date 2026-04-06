const query = `
  query GetPtPosts {
    posts(first: 1, where: { language: PT }) {
      nodes {
        databaseId
        featuredImage { node { databaseId } }
        categories { nodes { databaseId translations { databaseId language { code } } } }
      }
    }
  }
`;
fetch('http://localhost:8000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
}).then(r => r.json()).then(d => console.log(JSON.stringify(d, null, 2)));
