export const normalizeImageUrl = (url) => {
    if (!url) return null;
    if (process.env.NODE_ENV === 'development') {
        return url.replace('http://127.0.0.1:8000', 'http://localhost:8000');
    }
    return url;
};

export const CATEGORY_COLORS = {
    'encontros-3g': '#ea580c',        // Dark Orange
    'viagem-atlantica': '#dc2626',     // Red
    'maquinas-intemporais': '#0284c7', // Blue
    'historias-iconicas': '#059669',   // Green
    'videos': '#7c3aed',               // Violet
    'artigo': '#475569',    // Slate
    'featured': '#ca8a04',            // Gold
    'copiloto': '#0f766e',            // Darker Teal for white text contrast
    'default': '#c44536'              // Terracotta
};

export const getCategoryColor = (slug) => {
    return CATEGORY_COLORS[slug] || CATEGORY_COLORS['default'];
};
