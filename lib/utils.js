export const normalizeImageUrl = (url) => {
    if (!url) return null;
    if (process.env.NODE_ENV === 'development') {
        return url.replace('http://127.0.0.1:8000', 'http://localhost:8000');
    }
    return url;
};
