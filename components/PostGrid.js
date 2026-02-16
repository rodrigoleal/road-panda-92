import Link from 'next/link';
import Image from 'next/image';

export default function PostGrid({ posts }) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-serif font-bold mb-8 border-b border-zinc-200 pb-2">Latest Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <article key={post.id} className="group">
                        <Link href={`/${post.slug}`}>
                            <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-sm bg-zinc-100">
                                {post.featuredImage?.node?.sourceUrl ? (
                                    <Image
                                        src={post.featuredImage.node.sourceUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-400">No Image</div>
                                )}
                            </div>
                            <div className="mb-2">
                                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                                    {post.categories?.nodes[0]?.name || 'News'}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-red-700 transition-colors">
                                {post.title}
                            </h3>
                            <div className="text-zinc-600 text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}
