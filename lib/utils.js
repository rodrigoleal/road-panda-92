export const normalizeImageUrl = (url) => {
    if (!url) return null;
    if (process.env.NODE_ENV === 'development') {
        return url.replace('http://127.0.0.1:8000', 'http://localhost:8000');
    }
    return url;
};

export const CATEGORY_COLORS = {
    'classicos': '#ea580c', // Dark Orange
    'noticias': '#dc2626',  // Red
    'ensaios': '#0284c7',   // Blue
    'opiniao': '#059669',   // Green
    'videos': '#7c3aed',    // Violet
    'artigo': '#475569',    // Slate
    'featured': '#ca8a04',  // Gold
    'default': '#c44536'    // Terracotta
};

export const getCategoryColor = (slug) => {
    return CATEGORY_COLORS[slug] || CATEGORY_COLORS['default'];
};
