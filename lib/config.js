export const config = {
    features: {
        ads: {
            enabled: process.env.NEXT_PUBLIC_ENABLE_ADS === 'true', // Toggle via env var
            slots: {
                sidebar: true,
                in_article: true,
            }
        }
    }
};
