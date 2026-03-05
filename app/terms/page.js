export const metadata = {
    title: 'Termos de Utilização | Road Panda 92',
    description: 'Termos de Utilização da Road Panda 92.',
};

export default function TermsOfUsePage() {
    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-3xl text-[var(--foreground)]">
                <div className="text-center mb-16">
                    <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-xs mb-4 block">
                        Road Panda 92
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-6">
                        Termos de Utilização
                    </h1>
                </div>

                <div className="prose prose-lg dark:prose-invert mx-auto">
                    <h2 className="mt-12 text-2xl font-bold">1. Identificação do Responsável</h2>
                    <p>O presente site é operado por:<br />
                        <strong>SINGELO E CRISTALINO UNIPESSOAL LDA</strong><br />
                        NIF: 514762144<br />
                        Morada: Rua Jorge Bento, Número 34, 4450 Leça da Palmeira, Portugal<br />
                        Email: roadpanda92@gmail.com</p>

                    <h2 className="mt-12 text-2xl font-bold">2. Objeto e Âmbito</h2>
                    <p>Os presentes Termos de Utilização regulam o acesso e a utilização do site www.roadpanda92.com, enquanto plataforma digital de conteúdos editoriais, informativos e institucionais, incluindo artigos, notícias, crónicas, imagens, vídeos e outros conteúdos publicados.<br />
                        Ao aceder e utilizar o site, o utilizador aceita estes Termos de Utilização.</p>

                    <h2 className="mt-12 text-2xl font-bold">3. Acesso ao Site</h2>
                    <p>3.1. O acesso ao site é gratuito e não requer registo prévio, salvo funcionalidades específicas que o possam exigir.<br />
                        3.2. O responsável reserva-se o direito de suspender, limitar ou interromper o acesso ao site, temporária ou definitivamente, por razões técnicas, legais ou editoriais.</p>

                    <h2 className="mt-12 text-2xl font-bold">4. Conteúdos Editorais</h2>
                    <p>4.1. Os conteúdos publicados refletem uma abordagem editorial própria, de natureza informativa, cultural e opinativa.<br />
                        4.2. A informação disponibilizada tem caráter informativo e editorial, não constituindo aconselhamento técnico, jurídico ou profissional.<br />
                        4.3. Apesar do cuidado na produção e verificação dos conteúdos, não é garantida a inexistência de erros, omissões ou desatualizações.</p>

                    <h2 className="mt-12 text-2xl font-bold">5. Direitos de Autor e Propriedade Intelectual</h2>
                    <p>5.1. Todos os conteúdos presentes no site, incluindo textos, imagens, vídeos, ilustrações, design gráfico e logótipos, são propriedade da Road Panda 92 ou utilizados com autorização dos respetivos titulares, estando protegidos por direitos de autor.<br />
                        5.2. É permitida a partilha de excertos dos conteúdos, desde que:</p>
                    <ul>
                        <li>seja indicada a fonte</li>
                        <li>seja incluído link para o artigo original</li>
                        <li>não haja alteração do sentido do conteúdo</li>
                    </ul>
                    <p>5.3. A reprodução total ou parcial para fins comerciais, sem autorização prévia, é proibida.</p>

                    <h2 className="mt-12 text-2xl font-bold">6. Comentários e Interação (quando aplicável)</h2>
                    <p>6.1. Caso o site disponibilize áreas de comentários ou interação, o utilizador compromete-se a utilizar essas funcionalidades de forma responsável, respeitosa e legal.<br />
                        6.2. Não são permitidos comentários que:</p>
                    <ul>
                        <li>sejam ofensivos, discriminatórios ou difamatórios</li>
                        <li>contenham discurso de ódio ou incitação à violência</li>
                        <li>violem direitos de terceiros</li>
                        <li>tenham caráter promocional não autorizado</li>
                    </ul>
                    <p>6.3. O responsável pelo site reserva-se o direito de moderar, editar ou remover comentários que violem estes Termos.</p>

                    <h2 className="mt-12 text-2xl font-bold">7. Ligações para Sites de Terceiros</h2>
                    <p>7.1. O site pode conter ligações para sites externos.<br />
                        7.2. A SINGELO E CRISTALINO UNIPESSOAL LDA não é responsável pelo conteúdo, políticas ou práticas desses sites de terceiros.</p>

                    <h2 className="mt-12 text-2xl font-bold">8. Responsabilidade</h2>
                    <p>8.1. O utilizador reconhece que a utilização do site é feita por sua conta e risco.<br />
                        8.2. O responsável pelo site não pode ser responsabilizado por danos resultantes da utilização ou impossibilidade de utilização do site, salvo nos casos legalmente previstos.</p>

                    <h2 className="mt-12 text-2xl font-bold">9. Proteção de Dados Pessoais</h2>
                    <p>O tratamento de dados pessoais efetuado no âmbito da utilização do site encontra-se regulado pela Política de Privacidade, disponível no site.</p>

                    <h2 className="mt-12 text-2xl font-bold">10. Alterações aos Termos de Utilização</h2>
                    <p>Os presentes Termos de Utilização podem ser alterados a qualquer momento.<br />
                        As alterações serão publicadas no site www.roadpanda92.com e produzem efeitos a partir da data da sua publicação.</p>

                    <h2 className="mt-12 text-2xl font-bold">11. Lei Aplicável</h2>
                    <p>Os presentes Termos de Utilização são regidos pela lei portuguesa.</p>
                </div>
            </div>
        </main>
    );
}
