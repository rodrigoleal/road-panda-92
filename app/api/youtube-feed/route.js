
import { NextResponse } from 'next/server';

export async function GET() {
    const CHANNEL_ID = 'UCPFwrodcA_HyomT-0ud-xSA';
    const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

    try {
        const response = await fetch(RSS_URL, { next: { revalidate: 3600 } }); // Cache for 1 hour
        if (!response.ok) throw new Error('Failed to fetch YouTube RSS');
        
        const xmlText = await response.text();

        // Simple regex-based parsing to avoid heavy XML dependencies
        // We need: title, videoId, published
        const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
        const videoIdRegex = /<yt:videoId>(.*?)<\/yt:videoId>/;
        const titleRegex = /<title>(.*?)<\/title>/;
        const publishedRegex = /<published>(.*?)<\/published>/;

        const videos = [];
        let match;

        while ((match = entryRegex.exec(xmlText)) !== null) {
            const entry = match[1];
            const videoId = entry.match(videoIdRegex)?.[1];
            const title = entry.match(titleRegex)?.[1];
            const published = entry.match(publishedRegex)?.[1];

            if (videoId && title) {
                videos.push({
                    id: videoId,
                    title: decodeHtmlEntities(title),
                    published,
                    thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
                });
            }
        }

        return NextResponse.json(videos.slice(0, 15));
    } catch (error) {
        console.error('YouTube Proxy Error:', error);
        return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
    }
}

function decodeHtmlEntities(text) {
    return text.replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&#039;/g, "'");
}
