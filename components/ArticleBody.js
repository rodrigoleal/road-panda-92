import DOMPurify from 'isomorphic-dompurify';
import AdUnit from './AdUnit';

export default function ArticleBody({ content }) {
    // Inject Ads logic could go here, e.g. splitting content
    // For now, simpler implementation

    const cleanContent = DOMPurify.sanitize(content);

    return (
        <div className="article-body max-w-3xl mx-auto">
            {/* Top Ad */}
            <AdUnit id="ad-article-top" />

            <div
                className="prose prose-lg prose-red font-serif text-zinc-800 marker:text-red-700 max-w-none"
                dangerouslySetInnerHTML={{ __html: cleanContent }}
            />

            {/* Bottom Ad */}
            <AdUnit id="ad-article-bottom" className="mt-12" />
        </div>
    );
}
