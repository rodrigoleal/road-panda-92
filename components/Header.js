import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-black text-white py-4 border-b border-zinc-800">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3">
                    {/* Logo Placeholder - replaced with actual logo later */}
                    <div className="relative w-10 h-10">
                        <div className="absolute inset-0 bg-red-700 rounded-full flex items-center justify-center font-bold text-lg">RP</div>
                    </div>
                    <span className="text-xl font-serif font-bold tracking-wider">ROAD PANDA 92</span>
                </Link>
                <nav>
                    <ul className="flex space-x-6 text-sm font-medium uppercase tracking-wide text-zinc-400">
                        <li><Link href="/" className="hover:text-red-600 transition-colors">Home</Link></li>
                        <li><Link href="/category/reviews" className="hover:text-red-600 transition-colors">Reviews</Link></li>
                        <li><Link href="/category/news" className="hover:text-red-600 transition-colors">News</Link></li>
                        <li><Link href="/category/stories" className="hover:text-red-600 transition-colors">Stories</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
