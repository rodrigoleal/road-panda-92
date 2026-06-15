const fs = require('fs');
const path = require('path');

const ptDesc = "Todo o clássico tem dois destinos: a estrada ou o esquecimento. A Garage existe para inclinar a balança para o lado certo. Aqui não há fichas frias, só histórias de carros que foram alguém, à procura de quem os volte a pôr a andar.";
const enDesc = "Every classic has two destinies: the road or oblivion. Garage exists to tip the balance to the right side. Here there are no cold spec sheets, only stories of cars that were someone's, looking for someone to get them running again.";
const esDesc = "Todo clásico tiene dos destinos: la carretera o el olvido. Garage existe para inclinar la balanza hacia el lado correcto. Aquí no hay frías fichas técnicas, solo historias de coches que fueron de alguien, buscando a quien vuelva a ponerlos en marcha.";
const itDesc = "Ogni classico ha due destini: la strada o l'oblio. Garage esiste per far pendere la bilancia dalla parte giusta. Qui non ci sono fredde schede tecniche, ma solo storie di auto che sono appartenute a qualcuno, alla ricerca di chi le rimetta in moto.";

// 1. generate-dicts.js
const dictsJsPath = path.join(__dirname, '../generate-dicts.js');
if (fs.existsSync(dictsJsPath)) {
    let content = fs.readFileSync(dictsJsPath, 'utf8');
    
    // keys videos -> garage
    content = content.replace(/videos: 'Vídeos',/g, "garage: 'Garage',");
    content = content.replace(/videos: 'Videos',/g, "garage: 'Garage',");
    content = content.replace(/videos: 'Video',/g, "garage: 'Garage',");
    
    // in categories
    content = content.replace(/'videos': \{/g, "'garage': {");
    
    content = content.replace(/videos: \{/g, "garage: {");
    
    content = content.replace(/title: 'Vídeos'/g, "title: 'Garage'");
    content = content.replace(/title: 'Videos'/g, "title: 'Garage'");
    content = content.replace(/title: 'Video'/g, "title: 'Garage'");
    
    // descriptions
    content = content.replace(/description: 'Assista às nossas últimas reportagens em vídeo, ensaios e documentários sobre a cultura automóvel.'/g, `description: '${ptDesc}'`);
    content = content.replace(/description: 'Watch our latest video reports, reviews, and documentaries on car culture.'/g, `description: '${enDesc}'`);
    content = content.replace(/description: 'Mira nuestros últimos reportajes en vídeo, pruebas y documentales sobre la cultura del automóvil.'/g, `description: '${esDesc}'`);
    content = content.replace(/description: 'Mira nossos últimos reportagens en vídeo, ensaios e documentários sobre a cultura automóvel.'/g, `description: '${esDesc}'`);
    content = content.replace(/description: 'Guarda i nostri ultimi reportage video, prove e documentari sulla cultura dell\\'auto.'/g, `description: '${itDesc}'`);
    content = content.replace(/description: 'Guarda i nossos últimos reportagens vídeo, ensaios e documentários sobre a cultura automobilística.'/g, `description: '${itDesc}'`);

    fs.writeFileSync(dictsJsPath, content);
}

// 2. Dictionaries JSON
const langs = [
    { code: 'pt-PT', desc: ptDesc },
    { code: 'en-US', desc: enDesc },
    { code: 'es-ES', desc: esDesc },
    { code: 'it-IT', desc: itDesc }
];

langs.forEach(lang => {
    const jsonPath = path.join(__dirname, `../dictionaries/${lang.code}.json`);
    if (fs.existsSync(jsonPath)) {
        let content = fs.readFileSync(jsonPath, 'utf8');
        
        // global replacements for exact known strings
        content = content.replace(/"videos": "Vídeos"/g, `"garage": "Garage"`);
        content = content.replace(/"videos": "Videos"/g, `"garage": "Garage"`);
        content = content.replace(/"videos": "Video"/g, `"garage": "Garage"`);
        
        content = content.replace(/"videos": \{/g, `"garage": {`);
        
        content = content.replace(/"title": "Vídeos"/g, `"title": "Garage"`);
        content = content.replace(/"title": "Videos"/g, `"title": "Garage"`);
        content = content.replace(/"title": "Video"/g, `"title": "Garage"`);
        
        const ptOldDesc = "Assista às nossas últimas reportagens em vídeo, ensaios e documentários sobre a cultura automóvel.";
        const enOldDesc = "Watch our latest video reports, reviews, and documentaries on car culture.";
        const esOldDesc = "Mira nuestros últimos reportajes en vídeo, pruebas y documentales sobre la cultura del automóvil.";
        const esOldDesc2 = "Mira nossos últimos reportagens en vídeo, ensaios e documentários sobre a cultura automóvel.";
        const itOldDesc = "Guarda i nostri ultimi reportage video, prove e documentari sulla cultura dell'auto.";
        const itOldDesc2 = "Guarda i nossos últimos reportagens vídeo, ensaios e documentários sobre a cultura automobilística.";

        content = content.replace(`"description": "${ptOldDesc}"`, `"description": "${lang.desc}"`);
        content = content.replace(`"description": "${enOldDesc}"`, `"description": "${lang.desc}"`);
        content = content.replace(`"description": "${esOldDesc}"`, `"description": "${lang.desc}"`);
        content = content.replace(`"description": "${esOldDesc2}"`, `"description": "${lang.desc}"`);
        content = content.replace(`"description": "${itOldDesc}"`, `"description": "${lang.desc}"`);
        content = content.replace(`"description": "${itOldDesc2}"`, `"description": "${lang.desc}"`);
        
        fs.writeFileSync(jsonPath, content);
    }
});

// 3. Components
const filesToUpdate = [
    'components/Header.jsx',
    'components/Footer.jsx',
    'components/InfiniteFeed.jsx',
    'app/[lang]/category/[slug]/page.js',
    'app/[lang]/page.js',
    'app/[lang]/garage/page.js' // It was videos/page.js
];

filesToUpdate.forEach(relPath => {
    const fullPath = path.join(__dirname, '..', relPath);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Custom replacements per file based on previous grep results
        if (relPath === 'app/[lang]/category/[slug]/page.js') {
            content = content.replace(/'videos': 'Vídeos',/g, "'garage': 'Garage',");
        }
        
        if (relPath === 'app/[lang]/page.js') {
            content = content.replace(/data\?\.videos\?\.nodes/g, "data?.garage?.nodes");
            content = content.replace(/categorizedPosts\.videos/g, "categorizedPosts.garage");
            content = content.replace(/videos: data\?\.garage\?/g, "garage: data?.garage?");
        }
        
        if (relPath === 'app/[lang]/garage/page.js') {
            content = content.replace(/VideosPage/g, "GaragePage");
            content = content.replace(/getLocalizedSlug\('videos',/g, "getLocalizedSlug('garage',");
            content = content.replace(/dict\.pages\.videos/g, "dict.pages.garage");
            content = content.replace(/title: 'Vídeos \|/g, "title: 'Garage |");
            content = content.replace(/\| Road Panda 92',/g, "| Road Panda 92',");
            content = content.replace(/description: 'Assista às nossas séries originais e vídeos exclusivos sobre cultura automóvel.'/g, `description: '${ptDesc}'`);
            content = content.replace(/categoryName \?\? 'Vídeos'/g, "categoryName ?? 'Garage'");
            content = content.replace(/name \|\| 'Vídeos'/g, "name || 'Garage'");
        }

        if (relPath === 'components/Header.jsx' || relPath === 'components/Footer.jsx') {
            content = content.replace(/dict\?\.nav\?\.videos/g, "dict?.nav?.garage");
            content = content.replace(/\|\| 'Vídeos'/g, "|| 'Garage'");
            content = content.replace(/\/\$\{lang\}\/videos/g, "/${lang}/garage");
        }
        
        if (relPath === 'components/InfiniteFeed.jsx') {
            content = content.replace(/categorizedPosts\.videos/g, "categorizedPosts.garage");
            content = content.replace(/dict\?\.components\?\.categories\?\.\['videos'\]/g, "dict?.components?.categories?.['garage']");
            content = content.replace(/\|\| 'Vídeos'/g, "|| 'Garage'");
            content = content.replace(/, 'videos'\)/g, ", 'garage')");
        }
        
        fs.writeFileSync(fullPath, content);
    }
});

console.log("Files updated");
