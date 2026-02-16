const { format } = require('date-fns');
const dompurify = require('isomorphic-dompurify');

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

async function debugRender() {
    console.log(`fetching post...`);
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: QUERY,
                variables: { slug: SLUG }
            })
        });

        const json = await res.json();
        const post = json.data?.post;

        if (!post) {
            console.error("Post NOT FOUND");
            return;
        }

        console.log("Post found. Testing formatting...");

        // 1. Test Date Format
        try {
            console.log("Date from API:", post.date);
            const date = new Date(post.date);
            console.log("Date Object:", date.toString());
            const formatted = format(date, "d 'de' MMMM, yyyy");
            console.log("Formatted Date:", formatted);
        } catch (e) {
            console.error("DATE FORMAT ERROR:", e);
        }

        // 2. Test Content Sanitization
        try {
            console.log("Sanitizing content...");
            const sanitized = dompurify.sanitize(post.content);
            console.log("Sanitized length:", sanitized.length);
        } catch (e) {
            console.error("DOMPURIFY ERROR:", e);
        }

        // 3. Test Metadata logic
        try {
            const metaTitle = `${post.title} | Road Panda 92`;
            const metaDesc = post.excerpt?.replace(/<[^>]*>/g, '') || '';
            console.log("Meta Title:", metaTitle);
            console.log("Meta Desc:", metaDesc);
        } catch (e) {
            console.error("METADATA ERROR:", e);
        }

        console.log("Render simulated successfully.");

    } catch (error) {
        console.error("Fetch failed:", error);
    }
}

debugRender();
