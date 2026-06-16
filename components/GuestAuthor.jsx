
import Image from 'next/image';
import { normalizeImageUrl, replaceContentUrls } from '../lib/utils';
// ...
export default function GuestAuthor({ author, dict }) {
    if (!author) return null;

    const { name, description, avatar } = author;
    const avatarUrl = normalizeImageUrl(avatar?.url) || '/placeholder_avatar.png';

    return (
        <div className="bg-white dark:bg-[#151918] rounded-2xl p-6 border border-neutral-100 dark:border-white/5 shadow-sm flex flex-col items-center text-center gap-4">
            <div className="relative w-28 h-28 rounded-full border-4 border-white dark:border-[#151918] shadow-md overflow-hidden ring-2 ring-[var(--color-accent)]/30">
                <Image
                    src={avatarUrl}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                    {dict?.pages?.single?.aboutAuthor || 'Sobre o Autor'}
                </span>
                <h3 className="text-xl font-black text-[var(--foreground)] leading-tight mb-3">
                    {name}
                </h3>
                {description && (
                    <div 
                        className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed" 
                        dangerouslySetInnerHTML={{ __html: replaceContentUrls(description) }} 
                    />
                )}
            </div>
        </div>
    );
}
