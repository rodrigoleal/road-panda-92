const fs = require('fs');

function processComponent(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Make sure getBaseSlug is imported from lib/utils
    if (content.includes('lib/utils') && !content.includes('getBaseSlug')) {
        content = content.replace(/(import\s+\{.*)getCategoryColor(.*\}\s+from\s+.*?lib\/utils['"];)/, '$1getCategoryColor, getBaseSlug$2');
        if (!content.includes('getBaseSlug')) { // if getCategoryColor wasn't there
           content = content.replace(/(import\s+\{.*)normalizeImageUrl(.*\}\s+from\s+.*?lib\/utils['"];)/, '$1normalizeImageUrl, getBaseSlug$2');
        }
    }

    // Replace category links
    // href={`/${lang}/category/${cat.slug}`}
    // href={`/${lang}/category/${category.slug}`}
    content = content.replace(/href=\{`\/\$\{lang\}\/category\/\$\{([a-zA-Z0-9_]+)\.slug\}`\}/g, 'href={`/${lang}/category/${getBaseSlug($1.slug)}`}');

    fs.writeFileSync(file, content, 'utf8');
}

processComponent('components/Hero.jsx');
processComponent('components/PostGrid.jsx');
processComponent('components/InfiniteFeed.jsx');

console.log('Fixed components!');
