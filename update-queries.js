const fs = require('fs');

let content = fs.readFileSync('lib/queries.js', 'utf8');

// Convert HOMEPAGE_QUERY to a function getHomepageQuery
content = content.replace(/export const HOMEPAGE_QUERY = gql`([\s\S]*?)`;/g, (match, queryBody) => {
    let newBody = queryBody.replace(/categoryName: "([^"]+)"/g, 'categoryName: "$1${sfx}"');
    return `export const getHomepageQuery = (wpLang) => {\n  const sfx = wpLang === 'PT' ? '' : \\\`-\\\${wpLang.toLowerCase()}\\\`;\n  return gql\`${newBody}\`;\n};`;
});

fs.writeFileSync('lib/queries.js', content, 'utf8');
console.log('Queries updated!');
