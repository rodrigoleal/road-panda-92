// Native fetch in Node 18+
const API_URL = "http://35.188.192.145/graphql";
const SLUG = "a-ultima-valsa-analogica-por-que-a-ferrari-f355-berlinetta-e-e-sempre-sera-a-mais-bela-de-todas";

const QUERY = `
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

async function testQuery() {
    console.log(`Testing Post Query for slug: ${SLUG}`);
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: QUERY,
                variables: { slug: SLUG }
            })
        });

        if (!res.ok) {
            console.error(`Error: ${res.status} ${res.statusText}`);
            const text = await res.text();
            console.error(text);
            return;
        }

        const json = await res.json();
        console.log("Response:");
        console.log(JSON.stringify(json, null, 2));

        if (json.errors) {
            console.error("GraphQL Errors found!");
        }

    } catch (error) {
        console.error("Fetch failed:", error);
    }
}

testQuery();
