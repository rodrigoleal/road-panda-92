
import { getClient } from '../../lib/apollo-client';
import { GET_POST_BY_SLUG } from '../../lib/queries';
import GuestAuthor from '../../components/GuestAuthor';
import AdUnit from '../../components/AdUnit';
import { format } from 'date-fns';
// import dompurify from 'isomorphic-dompurify';

// ...

// const sanitizedContent = dompurify.sanitize(post.content);
// Temporary bypass to check if dompurify is crashing the server
const sanitizedContent = post.content;

// ...

return (
  <article className="min-h-screen pb-20 pt-10">
    {/* Header */}
    <div className="text-[var(--foreground)] py-12 px-4 text-center">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap justify-center items-center gap-4 text-xs font-bold tracking-widest uppercase text-neutral-500">
          {post.categories?.nodes.map(cat => (
            <span key={cat.slug} className="text-[var(--color-accent)] bg-neutral-100 px-2 py-1 rounded-sm">{cat.name}</span>
          ))}
          <span>&bull;</span>
          <span>{format(new Date(post.date), "d 'de' MMMM, yyyy")}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black leading-tight mb-8 text-[var(--foreground)]">
          {post.title}
        </h1>
        <div className="flex items-center justify-center space-x-3">
          {post.author?.node?.avatar?.url && (
            <img src={post.author.node.avatar.url} alt={post.author.node.name} className="w-10 h-10 rounded-full border-2 border-[var(--color-accent)]" />
          )}
          <span className="text-sm font-bold tracking-wide uppercase text-neutral-500">Por {post.author?.node?.name}</span>
        </div>
      </div>
    </div>

    {/* Featured Image */}
    {post.featuredImage?.node?.sourceUrl && (
      <div className="container mx-auto max-w-5xl mb-12 px-4">
        <img
          src={post.featuredImage.node.sourceUrl}
          alt={post.title}
          className="w-full h-auto rounded-xl shadow-xl"
        />
      </div>
    )}

    {/* Content Body */}
    <div className="container mx-auto max-w-3xl px-4">
      <AdUnit id="top-of-content" className="mb-8" />

      <div
        className="prose prose-xl md:prose-2xl mx-auto 
            prose-headings:font-black prose-headings:text-[var(--foreground)] 
            [&>*]:mb-6 [&_p]:mb-6 [&_li]:mb-4
            prose-p:text-neutral-700 prose-p:leading-loose
            prose-a:text-[var(--color-accent)] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[var(--foreground)] prose-strong:font-black
            prose-img:rounded-xl prose-img:shadow-lg
            prose-blockquote:border-l-[var(--color-accent)] prose-blockquote:bg-neutral-50 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-neutral-600"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      <AdUnit id="bottom-of-content" className="mt-12" />

      <GuestAuthor author={post.author?.node} />
    </div>
  </article>
);
  } catch (error) {
  return (
    <div className="container mx-auto px-4 py-32 text-center text-red-600">
      <h1 className="text-2xl font-bold mb-4">Erro ao carregar artigo</h1>
      <p className="mb-4">{error.message}</p>
      <pre className="text-left bg-neutral-100 p-4 rounded text-xs overflow-auto text-neutral-800">
        {error.stack}
      </pre>
    </div>
  );
}
}
