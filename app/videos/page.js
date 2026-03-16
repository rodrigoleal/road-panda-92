
import VideoGallery from '../../components/VideoGallery';

export const metadata = {
    title: 'Vídeos | Road Panda 92',
    description: 'Assista às nossas séries originais e vídeos exclusivos sobre cultura automóvel.',
};

export default function VideosPage() {
    return (
        <div className="min-h-screen pt-20">
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-[var(--foreground)]">
                    Vídeos
                </h1>
                <div className="w-20 h-1 bg-[var(--color-accent)] mx-auto mb-8"></div>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-2xl font-medium max-w-3xl mx-auto tracking-tight">
                    Explore todas as histórias, ensaios e notícias sobre Vídeos.
                </p>
            </div>
            
            <VideoGallery limit={24} />
            
            <section className="py-24 bg-[var(--color-secondary)] border-t border-neutral-100 dark:border-white/5 transition-colors duration-500">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl md:text-3xl font-black mb-8 italic text-[var(--foreground)] tracking-tight">
                        Gosta do nosso conteúdo?
                    </h3>
                    <a 
                        href="https://www.youtube.com/@roadpanda92?sub_confirmation=1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-[var(--color-accent)] text-white px-10 py-5 rounded-full text-lg font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-[0_20px_50px_rgba(227,24,55,0.3)]"
                    >
                        Subscrever no YouTube
                    </a>
                </div>
            </section>
        </div>
    );
}
