import Link from 'next/link';

export default function Hero({ post }) {
    if (!post) return null;

    return (
        <section className="relative h-[60vh] min-h-[500px] w-full bg-zinc-900 text-white overflow-hidden">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

            {/* Content */}
            <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-20">
                <div className="max-w-3xl">
                    <span className="inline-block bg-red-700 text-white text-xs font-bold px-2 py-1 mb-4 uppercase tracking-wider">
                        Featured Story
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
                        <Link href={`/${post.slug}`} className="hover:text-red-500 transition-colors">
                            {post.title}
                        </Link>
                    </h1>
                    <div className="text-zinc-300 text-sm md:text-base mb-6 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt }} />

                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <span>{post.author?.node?.name || 'Road Panda Editor'}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Background Image (Mock if no image) */}
            {post.featuredImage?.node?.sourceUrl && (
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.featuredImage.node.sourceUrl})`, opacity: 0.7 }}
                />
            )}
        </section>
    );
}
