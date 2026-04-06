const fs = require('fs');
let file = 'app/[lang]/category/[slug]/page.js';
let content = fs.readFileSync(file, 'utf8');

// replace variables: { slug: querySlug, lang: wpLang }
content = content.replace(
    /variables:\s*\{\s*slug:\s*querySlug,\s*lang:\s*wpLang\s*\}/g,
    'variables: { slug: getLocalizedSlug(querySlug, wpLang), lang: wpLang }'
);
// Make sure getLocalizedSlug is imported
if (!content.includes('getLocalizedSlug')) {
    content = content.replace(
        "import { normalizeImageUrl } from '../../../../lib/utils';",
        "import { normalizeImageUrl, getLocalizedSlug } from '../../../../lib/utils';"
    );
}

fs.writeFileSync(file, content, 'utf8');

let file2 = 'app/[lang]/[slug]/page.js';
let content2 = fs.readFileSync(file2, 'utf8');

// In related post query, primaryCategorySlug must be fetched from localized base.
// But primaryCategorySlug is already localized (e.g. maquinas-intemporais-en)
// The GraphQL query expects exactly that. So GET_RELATED_POSTS_BY_CATEGORY is already correct with primaryCategorySlug
// But the link should use getBaseSlug(primaryCategorySlug)!
if (!content2.includes('getBaseSlug')) {
    content2 = content2.replace(
        "import { normalizeImageUrl, formatLocalizedDate, getCategoryColor } from '../../../../lib/utils';",
        "import { normalizeImageUrl, formatLocalizedDate, getCategoryColor, getBaseSlug } from '../../../../lib/utils';"
    );
}

content2 = content2.replace(
    /\/\$\{primaryCategorySlug\}/g,
    '/${getBaseSlug(primaryCategorySlug)}'
);

fs.writeFileSync(file2, content2, 'utf8');

console.log('Fixed pages!');
