export default function VideoCarousel() {
    return (
        <section className="bg-zinc-900 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-2xl font-serif font-bold">Original Series</h2>
                    <button className="text-sm font-bold text-red-500 hover:text-red-400 uppercase tracking-wider">View All</button>
                </div>

                {/* Carousel Placeholder */}
                <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex-shrink-0 w-80 group cursor-pointer">
                            <div className="relative aspect-video bg-zinc-800 rounded-sm mb-3 overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors">
                                        <svg className="w-4 h-4 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg leading-tight group-hover:text-zinc-300">
                                Panda Garage: Ep. {item} - Restoring the Classic
                            </h3>
                            <p className="text-xs text-zinc-500 mt-1">12:34 • 2 days ago</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
