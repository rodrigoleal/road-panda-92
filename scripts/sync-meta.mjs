import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env.translate") });

const { WP_URL, WP_USER, WP_APP_PASSWORD } = process.env;

const WP_HEADERS = {
  Authorization: `Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString("base64")}`,
  "Content-Type": "application/json",
};

async function getPtPostsWithTranslations() {
  const query = `
    query GetPtPosts {
      posts(first: 100, where: { language: PT }) {
        nodes {
          databaseId
          title
          translations {
             databaseId
             language { code }
          }
          featuredImage {
            node { databaseId }
          }
          categories {
            nodes {
              databaseId
              translations {
                databaseId
                language { code }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  
  const json = await res.json();
  return json.data.posts.nodes;
}

async function updateTranslation(postId, featuredImageId, categoryIds) {
  const payload = {};
  if (featuredImageId) payload.featured_media = featuredImageId;
  if (categoryIds && categoryIds.length > 0) payload.categories = categoryIds;

  if (Object.keys(payload).length === 0) return;

  const res = await fetch(`${WP_URL}/posts/${postId}`, {
    method: "POST", // WP REST API Uses POST with ID to update
    headers: WP_HEADERS,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`Erro ao atualizar post ${postId}: ${res.statusText}`);
  } else {
    console.log(`✅ Artigo ${postId} sincronizado com Imagem de Destaque e Categoria Traduzida.`);
  }
}

async function run() {
  console.log("🚀 A iniciar a Sincronização de Imagens e Categorias...");
  const posts = await getPtPostsWithTranslations();
  
  for (const ptPost of posts) {
     const imgId = ptPost.featuredImage?.node?.databaseId;
     
     // Mapa de categorias traduzidas por língua
     const catsByLang = { EN: [], ES: [], IT: [] };
     if (ptPost.categories?.nodes) {
         for (const cat of ptPost.categories.nodes) {
             if (cat.translations) {
                 for (const trans of cat.translations) {
                     if (['EN','ES','IT'].includes(trans.language.code)) {
                         catsByLang[trans.language.code].push(trans.databaseId);
                     }
                 }
             }
         }
     }

     if (ptPost.translations && ptPost.translations.length > 0) {
         console.log(`\n============================`);
         console.log(`🔄 A sincronizar reboque de: "${ptPost.title}"`);
         for (const postTrans of ptPost.translations) {
             const langCode = postTrans.language.code;
             const targetCats = catsByLang[langCode];
             await updateTranslation(postTrans.databaseId, imgId, targetCats);
         }
     }
  }
  console.log("\n🎇 Sincronização Perfeita Concluída!");
}

run();
