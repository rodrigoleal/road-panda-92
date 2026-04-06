const query = `
  query Test {
    categories(where: { slug: "maquinas-intemporais" }) {
      nodes {
        name
        translations {
          name
          description
          language { code }
        }
      }
    }
  }
`;

fetch('http://localhost:8000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(console.error);
