import Image from 'next/image';

export default function GuestAuthor({ author }) {
    if (!author) return null;

    return (
        <div className="bg-zinc-50 border-l-4 border-red-700 p-8 my-12 max-w-3xl mx-auto flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="relative w-20 h-20 flex-shrink-0">
                {author.avatar?.url ? (
                    <Image
                        src={author.avatar.url}
                        alt={author.name}
                        fill
                        className="rounded-full object-cover border-2 border-zinc-200"
                    />
                ) : (
                    <div className="w-full h-full bg-zinc-200 rounded-full flex items-center justify-center text-xl font-bold text-zinc-400">
                        {author.name?.charAt(0)}
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-xl font-bold font-serif mb-2">{author.name}</h3>
                <p className="text-zinc-600 italic">
                    {author.description || `Guest contributor at Road Panda 92. Passionate about automotive culture and engineering.`}
                </p>
            </div>
        </div>
    );
}
