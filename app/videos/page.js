
import VideoGallery from '../../components/VideoGallery';

export const metadata = {
    title: 'Vídeos | Road Panda 92',
    description: 'Assista às nossas séries originais e vídeos exclusivos sobre cultura automóvel.',
};

export default function VideosPage() {
    return (
        <div className="min-h-screen pt-20">
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                    Vídeos
                </h1>
                <p className="text-neutral-500 text-lg md:text-xl font-medium max-w-2xl mx-auto uppercase tracking-widest">
                    Acompanhe as nossas séries originais diretamente do YouTube.
                </p>
            </div>
            
            <VideoGallery limit={24} />
            
            <section className="py-20 bg-white dark:bg-[#121212]">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl font-bold mb-6 italic">Gosta do nosso conteúdo?</h3>
                    <a 
                        href="https://www.youtube.com/@roadpanda92?sub_confirmation=1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-[var(--color-accent)] text-white px-10 py-5 rounded-full text-lg font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl"
                    >
                        Subscrever no YouTube
                    </a>
                </div>
            </section>
        </div>
    );
}
