// Native fetch used

async function testQuery(lang) {
  const query = `
    query TestLang {
      posts(first: 5, where: { language: ${lang} }) {
        nodes {
          id
          title
          slug
          language {
            code
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const json = await res.json();
    console.log(`--- Result for ${lang} ---`);
    console.log(JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('Error fetching:', err);
  }
}

async function run() {
  await testQuery('PT');
  await testQuery('EN');
  await testQuery('EN_US');
}

run();
