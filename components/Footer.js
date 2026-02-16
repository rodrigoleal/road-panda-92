import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-zinc-950 text-zinc-500 py-8 mt-12 border-t border-zinc-900">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-white font-serif font-bold text-lg">ROAD PANDA 92</h3>
                        <p className="text-xs mt-1">© {new Date().getFullYear()} Road Panda 92. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-6 text-sm">
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
