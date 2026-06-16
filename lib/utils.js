import { format } from 'date-fns';
import { pt, enUS, es, it } from 'date-fns/locale';

export const normalizeImageUrl = (url) => {
    if (!url) return null;
    if (process.env.NODE_ENV === 'development') {
        return url.replace('http://127.0.0.1:8000', 'http://localhost:8000');
    }
    return url;
};

export const replaceContentUrls = (content) => {
    if (!content) return content;
    
    // We want to replace the backend URL with a relative path
    // so that the Next.js rewrite rule can proxy the request.
    const backendUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL 
        ? process.env.NEXT_PUBLIC_WORDPRESS_API_URL.replace('/graphql', '') 
        : 'http://35.188.192.145';
        
    const escapedUrl = backendUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedUrl, 'g');
    
    let updatedContent = content.replace(regex, '');
    
    // Also strip localhost/127.0.0.1 just in case production db has local URLs
    updatedContent = updatedContent.replace(/http:\/\/127\.0\.0\.1:8000/g, '');
    updatedContent = updatedContent.replace(/http:\/\/localhost:8000/g, '');
    // Also strip the hardcoded IP just in case
    updatedContent = updatedContent.replace(/http:\/\/35\.188\.192\.145/g, '');
    
    return updatedContent;
};

export const CATEGORY_COLORS = {
    'encontros-3g': '#ea580c',        // Dark Orange
    'viagem-atlantica': '#dc2626',     // Red
    'maquinas-intemporais': '#0284c7', // Blue
    'historias-iconicas': '#059669',   // Green
    'garage': '#7c3aed',               // Violet
    'artigo': '#475569',    // Slate
    'featured': '#ca8a04',            // Gold
    'copiloto': '#0f766e',            // Darker Teal for white text contrast
    'default': '#c44536'              // Terracotta
};

export const getCategoryColor = (slug) => {
    if (!slug) return CATEGORY_COLORS['default'];
    return CATEGORY_COLORS[getBaseSlug(slug)] || CATEGORY_COLORS['default'];
};

export const getBaseSlug = (slug) => {
    if (!slug) return '';
    return slug.replace(/-(pt|en|es|it)$/i, '');
};

export const getLocalizedSlug = (slug, langCode) => {
    const lang = langCode.toLowerCase().split('-')[0];
    const baseSlug = getBaseSlug(slug);
    if (lang === 'pt') return baseSlug;
    return `${baseSlug}-${lang}`;
};

const locales = {
    'pt-PT': pt,
    'en-US': enUS,
    'es-ES': es,
    'it-IT': it
};

export const formatLocalizedDate = (dateString, lang = 'pt-PT') => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const locale = locales[lang] || pt;
    
    if (lang === 'en-US') {
        return format(date, "MMMM d, yyyy", { locale });
    }
    return format(date, "d 'de' MMMM, yyyy", { locale });
};
