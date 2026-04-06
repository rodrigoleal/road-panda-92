import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Carregar variáveis de ambiente
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env.translate") });

const { WP_URL, WP_USER, WP_APP_PASSWORD, GEMINI_API_KEY } = process.env;

if (!WP_URL || !WP_USER || !WP_APP_PASSWORD || !GEMINI_API_KEY) {
  console.error("Faltam variáveis no .env.translate. Confirme as passwords e a API key.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

const WP_HEADERS = {
  Authorization: `Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString("base64")}`,
  "Content-Type": "application/json",
};

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "it", name: "Italian" },
];

async function translateContent(content, targetLang) {
  if (!content || content.trim() === "") return "";
  try {
    const prompt = `You are a professional automotive journalist and expert web publisher. 
Translate the following HTML content smoothly and naturally into ${targetLang}. 
CRITICAL: You MUST strictly preserve all HTML elements, class attributes, tags, images, newlines, and structure exactly as they are. DO NOT output markdown blocks or triple backticks. ONLY output the translated raw HTML string.
Content to translate:
${content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Remove if gemini wrapped it in markdown codeblocks
    if (text.startsWith("\`\`\`html")) {
        text = text.replace(/^\`\`\`html\n/, "").replace(/\n\`\`\`$/, "");
    } else if (text.startsWith("\`\`\`")) {
        text = text.replace(/^\`\`\`\n/, "").replace(/\n\`\`\`$/, "");
    }
    
    return text;
  } catch (error) {
    console.error(`Erro ao traduzir para ${targetLang}:`, error.message);
    return null;
  }
}

async function getPortuguesePosts() {
  console.log("A procurar artigos em Português no WordPress (via GraphQL)...");
  
  const query = `
    query GetPtPosts {
      posts(first: 100, where: { language: PT }) {
        nodes {
          databaseId
          title
          content
          excerpt
          translations {
             databaseId
             language { code }
          }
          featuredImage { node { databaseId } }
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
  
  if (!res.ok) throw new Error("GraphQL Error");
  
  const json = await res.json();
  const nodes = json.data?.posts?.nodes || [];
  
  return nodes.map(node => ({
    id: node.databaseId,
    title: { rendered: node.title },
    content: { rendered: node.content },
    excerpt: { rendered: node.excerpt },
    featuredImageId: node.featuredImage?.node?.databaseId,
    categories: node.categories?.nodes || [],
    translations: node.translations || []
  }));
}

async function createTranslation(ptPostId, title, content, excerpt, langCode) {
  const payload = {
    pt_post_id: ptPostId,
    title,
    content,
    excerpt,
    lang_code: langCode
  };

  const res = await fetch("http://localhost:8000/sync-translation-native.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`❌ Erro ao guardar artigo (${langCode}): HTTP ${res.status}`, errorBody);
    return false;
  }
  
  const result = await res.json();
  if (!result.success) {
      console.error(`❌ Erro Polylang/WP: ${result.error}`);
      return false;
  }
  
  return true;
}

async function main() {
  console.log("🚀 A INICIAR MOTOR DE TRADUÇÃO...");
  try {
    const posts = await getPortuguesePosts();
    console.log(`✅ Encontrados ${posts.length} artigos.\n`);

    for (const post of posts) {
      console.log(`\n===========================================`);
      console.log(`📖 A processar: ${post.title.rendered} (ID: ${post.id})`);
      
      const catsByLang = { EN: [], ES: [], IT: [] };
      for (const cat of post.categories) {
          if (cat.translations) {
              for (const trans of cat.translations) {
                  if (catsByLang[trans.language.code]) catsByLang[trans.language.code].push(trans.databaseId);
              }
          }
      }
      
      const existingLangs = post.translations.map(t => t.language.code.toLowerCase());

      for (const lang of LANGUAGES) {
        if (existingLangs.includes(lang.code.toLowerCase())) {
            console.log(`⏭️ Tradução para ${lang.name} já existe. A saltar...`);
            continue;
        }

        console.log(`\n⏳ A traduzir para ${lang.name}...`);
        
        const title = await translateContent(post.title.rendered, lang.name);
        const content = await translateContent(post.content.rendered, lang.name);
        const excerpt = post.excerpt?.rendered ? await translateContent(post.excerpt.rendered, lang.name) : "";

        if (title && content) {
            console.log(`✅ Tradução concluída. A enviar para o WordPress...`);
            const success = await createTranslation(post.id, title, content, excerpt, lang.code);
            if (success) {
                console.log(`🎉 Artigo em ${lang.name} publicado com sucesso!`);
            }
        }
        
        // Pausa de segurança anti-spam para a Google não bloquear (3 segundos)
        await new Promise(r => setTimeout(r, 3000));
      }
    }
    console.log("\n🚀 TODOS OS ARTIGOS FORAM TRADUZIDOS COM SUCESSO!");
  } catch (error) {
    console.error("🚨 Erro fatal:", error);
  }
}

main();
