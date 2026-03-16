import Image from 'next/image';

export default function ArticleHeader({ post }) {
    if (!post) return null;

    const photoCredits = post.featuredImage?.node?.caption || post.featuredImage?.node?.description;

    return (
        <header className="mb-8">
            {/* Category Label */}
            <div className="flex justify-center mb-4">
                <span className="bg-red-700 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">
                    {post.categories?.nodes[0]?.name || 'Story'}
                </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-center leading-tight text-zinc-900 mb-6 max-w-4xl mx-auto">
                {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center justify-center text-sm text-zinc-500 mb-8 space-x-4">
                {post.author?.node?.avatar?.url && (
                    <Image
                        src={post.author.node.avatar.url}
                        alt={post.author.node.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                )}
                <span className="font-bold text-zinc-900">{post.author?.node?.name}</span>
                <span>|</span>
                <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>|</span>
                <span>{post.readingTime || '5 min read'}</span>
            </div>

            {/* Featured Image */}
            {post.featuredImage?.node?.sourceUrl && (
                <div className="relative w-full aspect-video md:aspect-[21/9] rounded-sm overflow-hidden shadow-lg group">
                    <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {photoCredits && (
                        <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-sm text-neutral-600 px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center space-x-1 shadow-[2px_-2px_10px_rgba(0,0,0,0.1)] rounded-tr-md">
                            <span>&copy;</span>
                            <span dangerouslySetInnerHTML={{ __html: photoCredits.replace(/<[^>]*>?/gm, '') }} />
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
