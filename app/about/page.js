export const metadata = {
    title: 'Sobre Nós | Road Panda 92',
    description: 'A Road Panda 92 é uma plataforma editorial independente dedicada à cultura automóvel.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-3xl text-[var(--foreground)]">
                <div className="text-center mb-16">
                    <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-xs mb-4 block">
                        Road Panda 92
                    </span>
                    <h1 className="text-5xl font-black mb-6">
                        Sobre Nós
                    </h1>
                </div>

                <div className="prose prose-lg dark:prose-invert mx-auto">
                    <h2>Quem somos</h2>
                    <p>
                        A Road Panda 92 é uma plataforma editorial independente dedicada à cultura automóvel, à memória e às histórias humanas que se constroem em torno dos carros.
                    </p>
                    <p>
                        Não falamos apenas de máquinas.<br />
                        Falamos de pessoas, de percursos, de escolhas e de tudo aquilo que faz com que um automóvel deixe de ser apenas um objecto e passe a ter significado.
                    </p>
                    <p>
                        A Road Panda 92 nasce de uma relação pessoal com o automóvel — construída ao longo dos anos, na estrada, nas garagens, nos encontros improvisados e nas conversas que não cabem em fichas técnicas. É desse lugar vivido que partem os nossos conteúdos.
                    </p>

                    <h2 className="mt-12">Uma abordagem editorial própria</h2>
                    <p>
                        A nossa linha editorial cruza jornalismo cultural automóvel, crónica contemporânea e observação do quotidiano.<br />
                        Damos contexto histórico quando ele importa, mas nunca escrevemos apenas para explicar — escrevemos para reconhecer.
                    </p>
                    <p>Distinguimos claramente:</p>
                    <ul>
                        <li>conteúdos editoriais</li>
                        <li>opinião</li>
                        <li>parcerias ou conteúdos com enquadramento comercial</li>
                    </ul>
                    <p>
                        Acreditamos que a credibilidade constrói-se com transparência, coerência e respeito por quem lê.
                    </p>

                    <h2 className="mt-12">Sobre o que escrevemos</h2>
                    <p>Na Road Panda 92, falamos de:</p>
                    <ul>
                        <li>carros clássicos e contemporâneos com valor cultural</li>
                        <li>histórias reais de pessoas e dos seus automóveis</li>
                        <li>fiabilidade, longevidade e uso quotidiano</li>
                        <li>memória geracional, identidade e herança automóvel</li>
                        <li>cultura automóvel para lá do hype e das tendências passageiras</li>
                    </ul>
                    <p>
                        Não seguimos modas. Observamo-las.<br />
                        Não celebramos números por si só. Procuramos significado.
                    </p>

                    <h2 className="mt-12">Presença digital</h2>
                    <p>A Road Panda 92 desenvolve conteúdos editoriais para:</p>
                    <ul>
                        <li>plataforma online</li>
                        <li>Instagram</li>
                        <li>vídeo curto e formato documental</li>
                        <li>projectos audiovisuais e editoriais especiais</li>
                    </ul>
                    <p>
                        Cada formato existe para servir a história — não o contrário.
                    </p>

                    <h2 className="mt-12">Um projecto em construção</h2>
                    <p>
                        A Road Panda 92 é um projecto em crescimento contínuo, construído com tempo, consistência e intenção.<br />
                        Não pretende ser tudo para todos, mas ser relevante para quem se revê numa cultura automóvel feita de experiências reais.
                    </p>
                    <p>
                        Porque há histórias que não se contam depressa.<br />
                        Vivem-se.
                    </p>
                </div>
            </div>
        </main>
    );
}
