
import Image from 'next/image';

export default function GuestAuthor({ author }) {
    if (!author) return null;

    const { name, description, avatar } = author;
    const avatarUrl = avatar?.url || '/placeholder_avatar.png';

    return (
        <div className="bg-neutral-50 border border-neutral-200 p-8 my-10 flex flex-col md:flex-row items-center md:items-start gap-6 rounded-lg">
            <div className="shrink-0">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--color-accent)]">
                    <img
                        src={avatarUrl}
                        alt={name}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
            <div className="text-center md:text-left">
                <h3 className="text-xl font-serif font-bold text-neutral-900 mb-2">About the Author</h3>
                <div className="font-bold text-lg text-[var(--color-accent)] mb-3">{name}</div>
                <div className="text-neutral-600 leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: description || '' }} />
            </div>
        </div>
    );
}
