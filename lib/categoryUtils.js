// Central helper to determine if a category is "internal/system" and should be hidden
const INTERNAL_SLUGS_PATTERNS = [
    'destaque-principal',
    'destaque-scroll',
    'featured',
    'artigo',
    'uncategorized',
    'sem-categoria',
    'series',
];

export const isInternalCategory = (slug) => {
    if (!slug) return true;
    const base = slug.toLowerCase();
    return INTERNAL_SLUGS_PATTERNS.some(pattern => base === pattern || base.startsWith(pattern + '-'));
};

export const getDisplayCategory = (categories) => {
    if (!categories?.nodes?.length) return null;
    return categories.nodes.find(cat => !isInternalCategory(cat.slug)) || null;
};
