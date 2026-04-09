const fs = require('fs');

const langs = [
  {
    code: 'pt-PT',
    dict: {
      nav: {
        latest: 'Últimas',
        intemporais: 'Máquinas Intemporais',
        atlantica: 'Viagem Atlântica',
        videos: 'Vídeos',
        iconicas: 'Histórias Icónicas',
        encontros: 'Encontros 3G',
        copiloto: 'Copiloto',
        searchPlaceholder: 'Pesquisar artigos...'
      },
      footer: {
        description: 'Jornalismo automóvel sem compromissos. Histórias diretamente do asfalto para o seu ecrã.',
        newsletterDesc: 'Receba as últimas histórias automóveis na sua caixa de entrada semanalmente.',
        emailPlaceholder: 'O seu email principal...',
        statusLoading: 'A enviar...',
        statusSuccess: 'Subscrito!',
        statusError: 'Algo correu mal.',
        about: 'Quem somos',
        editorial: 'Estatuto Editorial',
        ficha: 'Ficha Técnica',
        contact: 'Contactos',
        privacy: 'Política de Privacidade',
        cookies: 'Política de Cookies',
        terms: 'Termos de Utilização',
        subscribe: 'Subscrever',
        rights: 'Todos os direitos reservados',
        sections: 'Secções',
        others: 'Outros'
      },
      pages: {
        latest: {
          title: 'Últimas Histórias',
          subtitle: 'Explore todo o nosso conteúdo, organizado cronologicamente. Das últimas novidades aos ensaios aprofundados.',
          noStories: 'Sem histórias ainda.',
          roadUnexplored: 'Esta estrada ainda está por explorar.'
        },
        videos: {
          galleryPrefix: 'Histórias em ',
          galleryHighlight: 'Movimento',
          likeContent: 'Gosta do nosso conteúdo?',
          subscribe: 'Subscrever no YouTube',
          viewAll: 'Ver Tudo',
          youtubeChannel: 'Canal YouTube',
          loadingGallery: 'A carregar Galeria...'
        },
        search: {
          title: 'Resultados da Pesquisa',
          forTerm: 'Para o termo:',
          enterTerm: 'Por favor, introduza um termo para pesquisar.',
          noResults: 'Sem resultados encontrados',
          tryOther: 'Tente pesquisar com outras palavras-chave.'
        },
        category: {
          explore: 'Explore todas as histórias, ensaios e notícias sobre',
          noStories: 'Sem histórias ainda.',
          roadUnexplored: 'Esta estrada ainda está por explorar.'
        },
        single: {
          notFound: 'Artigo Não Encontrado',
          by: 'Por',
          relatedTitle: 'Artigos Relacionados',
          viewMore: 'Veja mais artigos nesta categoria →'
        },
        about: {
          title: 'Sobre Nós',
          whoWeAre: {
            title: 'Quem somos',
            p1: 'A Road Panda 92 é uma plataforma editorial independente dedicada à cultura automóvel, à memória e às histórias humanas que se constroem em torno dos carros.',
            p2: 'Não falamos apenas de máquinas. Falamos de pessoas, de percursos, de escolhas e de tudo aquilo que faz com que um automóvel deixe de ser apenas um objecto e passe a ter significado.',
            p3: 'A Road Panda 92 nasce de uma relação pessoal com o automóvel — construída ao longo dos anos, na estrada, nas garagens, nos encontros improvisados e nas conversas que não cabem em fichas técnicas. É desse lugar vivido que partem os nossos conteúdos.'
          },
          approach: {
            title: 'Uma abordagem editorial própria',
            p1: 'A nossa linha editorial cruza jornalismo cultural automóvel, crónica contemporânea e observação do quotidiano. Damos contexto histórico quando ele importa, mas nunca escrevemos apenas para explicar — escrevemos para reconhecer.',
            distinguish: 'Distinguimos claramente:',
            items: [
              'conteúdos editoriais',
              'opinião',
              'parcerias ou conteúdos com enquadramento comercial'
            ],
            transparency: 'Acreditamos que a credibilidade constrói-se com transparência, coerência e respeito por quem lê.'
          },
          topics: {
            title: 'Sobre o que escrevemos',
            intro: 'Na Road Panda 92, falamos de:',
            items: [
              'carros clássicos e contemporâneos com valor cultural',
              'histórias reais de pessoas e dos seus automóveis',
              'fiabilidade, longevidade e uso quotidiano',
              'memória geracional, identidade e herança automóvel',
              'cultura automóvel para lá do hype e das tendências passageiras'
            ],
            summary: 'Não seguimos modas. Observamo-las. No celebramos números por si só. Procuramos significado.'
          },
          presence: {
            title: 'Presença digital',
            intro: 'A Road Panda 92 desenvolve conteúdos editoriais para:',
            items: [
              'plataforma online',
              'Instagram',
              'vídeo curto e formato documental',
              'projectos audiovisuais e editoriais especiais'
            ],
            footer: 'Cada formato existe para servir a história — não o contrário.'
          },
          project: {
            title: 'Um projecto em construção',
            p1: 'A Road Panda 92 é um projecto em crescimento contínuo, construído com tempo, consistência e intenção. Não pretende ser tudo para todos, mas ser relevante para quem se revê numa cultura automóvel feita de experiências reais.',
            footer: 'Porque há histórias que não se contam depressa. Vivem-se.'
          }
        },
        editorialStatus: {
          title: 'Estatuto Editorial',
          items: [
            'A Road Panda 92 é um órgão de informação de natureza editorial online, especializado em cultura automóvel, história e memória automobilística, cujo objetivo fundamental é assegurar a todos os leitores o direito a uma informação de qualidade nas áreas acima mencionadas.',
            'A Road Panda 92 respeita a Constituição da República Portuguesa e todas as leis portuguesas aplicáveis, nomeadamente as que se enquadram nos direitos, obrigações e deveres previstos na Lei de Imprensa, bem como os princípios éticos e deontológicos que regem a atividade informativa e editorial em Portugal.',
            'A Road Panda 92 distingue, de forma clara e criteriosa, os conteúdos de carácter informativo, opinativo e publicitário, reservando-se o direito de ordenar, interpretar e relacionar os factos, acontecimentos e contextos, no exercício da sua autonomia editorial.',
            'A Road Panda 92 rege-se por critérios editoriais de rigor, isenção e independência, assegurando uma abordagem responsável, contextualizada e plural aos temas tratados.',
            'A Road Panda 92 compromete-se a respeitar o sigilo das suas fontes de informação, não admitindo, em qualquer circunstância, a violação desse princípio, salvo nos casos expressamente previstos na lei.',
            'A Road Panda 92 assume o direito de emitir opinião própria, nomeadamente em editoriais e textos de análise, sempre no respeito integral pela legislação em vigor.',
            'A Road Panda 92 tem um âmbito de difusão nacional, garantindo a sua projeção e acesso internacional através da Internet, enquanto plataforma editorial digital.',
            'A Road Panda 92 cumpre as orientações definidas no presente Estatuto Editorial, bem como aquelas emanadas pela sua Direção.'
          ]
        },
        technicalInfo: {
          title: 'Ficha Técnica',
          labels: {
            title: 'Título',
            holder: 'Titular do Registo',
            owner: 'Proprietário',
            director: 'Diretor',
            headquarters: 'Sede Editorial',
            contactEmail: 'Email de Contacto',
            platform: 'Plataforma',
            periodicity: 'Periodicidade',
            ercNumber: 'Número de Registo na ERC'
          },
          values: {
            periodicity: 'Conteúdos publicados de forma regular, sem periodicidade fixa.'
          }
        },
        contact: {
          title: 'Contacto',
          tag: 'Fale Connosco',
          subtitle: 'Dúvidas, sugestões ou press releases? Estamos à escuta.',
          general: 'Geral',
          editorial: 'Editorial'
        },
        privacy: {
          title: 'Política de Privacidade',
          sections: [
            {
              title: '1. Responsável pelo Tratamento de Dados',
              content: 'O responsável pelo tratamento dos dados pessoais recolhidos através do site www.roadpanda92.com é:\nSINGELO E CRISTALINO UNIPESSOAL LDA\nNIF: 514762144\nMorada: Rua Jorge Bento, Número 34, 4450 Leça da Palmeira, Portugal\nEmail: roadpanda92@gmail.com'
            },
            {
              title: '2. Âmbito da Política',
              content: 'A presente Política de Privacidade aplica-se à utilização do site www.roadpanda92.com, enquanto plataforma de conteúdos editoriais, informativos e institucionais, incluindo artigos, notícias, formulários de contacto e outros meios de interação com os utilizadores.'
            },
            {
              title: '3. Dados Pessoais Recolhidos',
              content: 'No âmbito da utilização do site, podem ser recolhidos os seguintes dados pessoais:',
              list: [
                'Nome (quando fornecido voluntariamente)',
                'Endereço de email',
                'Número de telefone (quando aplicável)',
                'Conteúdo das mensagens enviadas através de formulários',
                'Endereço IP',
                'Dados técnicos de navegação (browser, sistema operativo, páginas visitadas, data e hora de acesso)'
              ]
            },
            {
              title: '4. Finalidades do Tratamento',
              content: 'Os dados pessoais recolhidos são tratados para as seguintes finalidades:',
              list: [
                'Gestão e resposta a pedidos de contacto ou esclarecimento',
                'Comunicação com os utilizadores',
                'Envio de newsletters ou comunicações editoriais, quando autorizado',
                'Análise estatística e melhoria do desempenho do site',
                'Garantia da segurança e funcionamento técnico da plataforma',
                'Cumprimento de obrigações legais'
              ]
            },
            {
              title: '5. Fundamentos Legais do Tratamento',
              content: 'O tratamento dos dados pessoais baseia-se nos seguintes fundamentos legais:',
              list: [
                'Consentimento do titular dos dados, quando aplicável',
                'Execução de diligências prévias a pedido do titular',
                'Interesse legítimo do responsável pelo tratamento (nomeadamente para fins editoriais e analíticos)',
                'Cumprimento de obrigações legais'
              ]
            },
            {
              title: '6. Conservação dos Dados',
              content: 'Os dados pessoais serão conservados apenas pelo período necessário às finalidades para as quais foram recolhidos, nomeadamente:',
              list: [
                'Dados de contacto: até 12 meses após a última interação',
                'Dados para envio de newsletters: até retirada do consentimento',
                'Dados técnicos e estatísticos: pelo período necessário à análise e melhoria do site',
                'Dados necessários para cumprimento de obrigações legais: pelo prazo legalmente exigido'
              ]
            },
            {
              title: '7. Partilha de Dados com Terceiros',
              content: 'Os dados pessoais poderão ser partilhados apenas quando necessário com:',
              list: [
                'Prestadores de serviços técnicos (alojamento, email, analytics)',
                'Entidades legais ou autoridades, quando exigido por lei'
              ],
              footer: 'Os dados pessoais não são vendidos, cedidos ou utilizados para fins comerciais não autorizados.'
            },
            {
              title: '8. Direitos do Titular dos Dados',
              content: 'Nos termos do RGPD, o titular dos dados tem direito a:',
              list: [
                'Acesso aos seus dados pessoais',
                'Retificação de dados inexatos ou incompletos',
                'Apagamento dos dados (“direito a ser esquecido”), quando aplicável',
                'Limitação do tratamento',
                'Oposição ao tratamento',
                'Portabilidade dos dados',
                'Retirada do consentimento, quando o tratamento se basear no consentimento'
              ],
              footer: 'O exercício destes direitos pode ser efetuado através de pedido escrito para o email indicado no ponto 1.'
            },
            {
              title: '9. Segurança dos Dados',
              content: 'A SINGELO E CRISTALINO UNIPESSOAL LDA adota medidas técnicas e organizativas adequadas para proteger os dados pessoais contra acesso não autorizado, perda, destruição ou divulgação indevida.'
            },
            {
              title: '10. Cookies',
              content: 'O site utiliza cookies para garantir o seu correto funcionamento e para fins estatísticos.\nPara mais informações sobre o uso de cookies e a forma de os gerir, o utilizador deve consultar a Política de Cookies disponível no site.'
            },
            {
              title: '11. Alterações à Política de Privacidade',
              content: 'A presente Política de Privacidade pode ser atualizada a qualquer momento.\nQuaisquer alterações serão publicadas no site www.roadpanda92.com.'
            },
            {
              title: '12. Autoridade de Controlo',
              content: 'Sem prejuízo de qualquer outro recurso administrativo ou judicial, o titular dos dados tem o direito de apresentar reclamação junto da:\nComissão Nacional de Proteção de Dados (CNPD)\nhttps://www.cnpd.pt'
            }
          ]
        },
        cookies: {
          title: 'Política de Cookies',
          sections: [
            {
              title: '1. O que são Cookies',
              content: 'Cookies são pequenos ficheiros de texto armazenados no seu dispositivo (computador, tablet ou smartphone) quando visita um website. Estes ficheiros permitem reconhecer o dispositivo do utilizador e melhorar a experiênica de navegação.'
            },
            {
              title: '2. Para que servem os Cookies',
              content: 'O site www.roadpanda92.com utiliza cookies para:',
              list: [
                'Assegurar o correto funcionamento do site',
                'Memorizar preferências do utilizador',
                'Analisar estatísticas de utilização do site',
                'Melhorar a experiência de navegação e os conteúdos disponibilizados'
              ]
            },
            {
              title: '3. Tipos de Cookies Utilizados',
              subsections: [
                {
                  title: '3.1 Cookies Estritamente Necessários',
                  content: 'Estes cookies são essenciais para o funcionamento do site e não podem ser desativados nos nossos sistemas. São normalmente definidos apenas em resposta a ações realizadas pelo utilizador, como definições de preferências de privacidade ou navegação segura.'
                },
                {
                  title: '3.2 Cookies de Desempenho e Estatísticos',
                  content: 'Estes cookies permitem recolher informações sobre a forma como os visitantes utilizam o site, como páginas visitadas, tempo de navegação ou origem do tráfego, ajudando a melhorar o desempenho e os conteúdos editoriais.\nA recolha destas informações é efetuada de forma agregada e, sempre que possível, anonimizada.'
                },
                {
                  title: '3.3 Cookies de Funcionalidade',
                  content: 'Estes cookies permitem ao site recordar escolhas efetuadas pelo utilizador, como preferências de idioma ou região, proporcionando uma experiência mais personalizada.'
                },
                {
                  title: '3.4 Cookies de Marketing (quando aplicável)',
                  content: 'Estes cookies podem ser utilizados para acompanhar os visitantes nos websites, com o objetivo de apresentar conteúdos ou comunicações relevantes.\nEstes cookies apenas serão utilizados mediante consentimento expresso do utilizador.'
                }
              ]
            },
            {
              title: '4. Gestão de Cookies e Consentimento',
              content: 'Ao aceder ao site, o utilizador é informado da utilização de cookies através de um banner de consentimento.\nO utilizador pode:',
              list: [
                'Aceitar todos os cookies',
                'Rejeitar cookies não essenciais',
                'Definir preferências de cookies a qualquer momento'
              ],
              footer: 'Os cookies não essenciais apenas serão ativados após consentimento explícito do utilizador.'
            },
            {
              title: '5. Como Gerir ou Desativar Cookies',
              content: 'O utilizador pode, a qualquer momento, configurar o seu navegador para aceitar, recusar ou eliminar cookies. No entanto, a desativação de cookies essenciais pode afetar o correto funcionamento do site.\nAs definições de cookies variam consoante o navegador utilizado.'
            },
            {
              title: '6. Cookies de Terceiros',
              content: 'O site pode utilizar cookies de terceiros, nomeadamente serviços de análise, métricas de desempenho ou ferramentas técnicas, os quais estão sujeitos às políticas de privacidade desses terceiros.'
            },
            {
              title: '7. Alterações à Política de Cookies',
              content: 'A Road Panda 92, operada pela SINGELO E CRISTALINO UNIPESSOAL LDA, reserva-se o direito de alterar a presente Política de Cookies a qualquer momento. As alterações serão publicadas no site www.roadpanda92.com.'
            },
            {
              title: '8. Contactos',
              content: 'Para qualquer questão relacionada com a utilização de cookies, o utilizador pode contactar-nos através do email:\nroadpanda92@gmail.com'
            }
          ]
        },
        terms: {
          title: 'Termos de Utilização',
          sections: [
            {
              title: '1. Identificação do Responsável',
              content: 'O presente site é operado por:\nSINGELO E CRISTALINO UNIPESSOAL LDA\nNIF: 514762144\nMorada: Rua Jorge Bento, Número 34, 4450 Leça da Palmeira, Portugal\nEmail: roadpanda92@gmail.com'
            },
            {
              title: '2. Objeto e Âmbito',
              content: 'Os presentes Termos de Utilização regulam o acesso e a utilização do site www.roadpanda92.com, enquanto plataforma digital de conteúdos editoriais, informativos e institucionais, incluindo artigos, notícias, crónicas, imagens, vídeos e outros conteúdos publicados.\nAo aceder e utilizar o site, o utilizador aceita estes Termos de Utilização.'
            },
            {
              title: '3. Acesso ao Site',
              content: '3.1. O acesso ao site é gratuito e não requer registo prévio, salvo funcionalidades específicas que o possam exigir.\n3.2. O responsável reserva-se o direito de suspender, limitar ou interromper o acesso ao site, temporária ou definitivamente, por razões técnicas, legais ou editorais.'
            },
            {
              title: '4. Conteúdos Editorais',
              content: '4.1. Os conteúdos publicados refletem uma abordagem editorial própria, de natureza informativa, cultural e opinativa.\n4.2. A informação disponibilizada tem caráter informativo e editorial, não constituindo aconselhamento técnico, jurídico ou profissional.\n4.3. Apesar do cuidado na produção e verificação dos conteúdos, não é garantida a inexistência de erros, omissões ou desatualizações.'
            },
            {
              title: '5. Direitos de Autor e Propriedade Intelectual',
              content: '5.1. Todos os conteúdos presentes no site, incluindo textos, imagens, vídeos, ilustrações, design gráfico e logótipos, são propriedade da Road Panda 92 ou utilizados com autorização dos respetivos titulares, estando protegidos por direitos de autor.\n5.2. É permitida a partilha de excertos dos conteúdos, desde que:',
              list: [
                'seja indicada a fonte',
                'seja incluído link para o artigo original',
                'não haja alteração do sentido do conteúdo'
              ],
              footer: '5.3. A reprodução total ou parcial para fins comerciais, sem autorização prévia, é proibida.'
            },
            {
              title: '6. Comentários e Interação (quando aplicável)',
              content: '6.1. Caso o site disponibilize áreas de comentários ou interação, o utilizador compromete-se a utilizar essas funcionalidades de forma responsável, respeitosa e legal.\n6.2. Não são permitidos comentários que:',
              list: [
                'sejam ofensivos, discriminatórios ou difamatórios',
                'contenham discurso de ódio ou incitação à violência',
                'violem direitos de terceiros',
                'tenham caráter promocional não autorizado'
              ],
              footer: '6.3. O responsável pelo site reserva-se o direito de moderar, editar ou remover comentários que violem estes Termos.'
            },
            {
              title: '7. Ligações para Sites de Terceiros',
              content: '7.1. O site pode conter ligações para sites externos.\n7.2. A SINGELO E CRISTALINO UNIPESSOAL LDA não é responsável pelo conteúdo, políticas ou práticas desses sites de terceiros.'
            },
            {
              title: '8. Responsabilidade',
              content: '8.1. O utilizador reconhece que a utilização do site é feita por sua conta e risco.\n8.2. O responsável pelo site não pode ser responsabilizado por danos resultantes da utilização ou impossibilidade de utilização do site, salvo nos casos legalmente previstos.'
            },
            {
              title: '9. Proteção de Dados Pessoais',
              content: 'O tratamento de dados pessoais efetuado no âmbito da utilização do site encontra-se regulado pela Política de Privacidade, disponível no site.'
            },
            {
              title: '10. Alterações aos Termos de Utilização',
              content: 'Os presentes Termos de Utilização podem ser alterados a qualquer momento.\nAs alterações serão publicadas no site www.roadpanda92.com e produzem efeitos a partir da data da sua publicação.'
            },
            {
              title: '11. Lei Aplicável',
              content: 'Os presentes Termos de Utilização são regidos pela lei portuguesa.'
            }
          ]
        }
      },
      components: {
        postGrid: {
          latest: 'Últimas',
          viewArchive: 'Ver Arquivo',
          readStory: 'Ler História'
        },
        categories: {
          'encontros-3g': {
            title: 'Encontros 3G',
            description: 'A paixão automóvel que passa de geração em geração. Histórias de pais, filhos e os clássicos que os unem.'
          },
          'historias-iconicas': {
            title: 'Histórias Icónicas',
            description: 'Relatos fascinantes sobre o mundo automóvel, momentos históricos e figuras singulares que moldaram a indústria.'
          },
          'maquinas-intemporais': {
            title: 'Máquinas Intemporais',
            description: 'Carros que resistiram ao tempo e continuam a marcar presença no imaginário de várias gerações. Cada modelo é apresentado não apenas como máquina, mas como símbolo de uma época. Uma coleção de automóveis que nunca saíram verdadeiramente de cena.'
          },
          'viagem-atlantica': {
            title: 'Viagem Atlântica',
            description: 'As últimas novidades, tendências e desenvolvimentos do mundo automóvel com um olhar atento de ambos os lados do Atlântico.'
          },
          'copiloto': {
            title: 'Copiloto',
            description: 'Dicas práticas, guias e conselhos valiosos para melhorar a sua experiência ao volante e cuidar melhor da sua máquina.'
          },
          'videos': {
            title: 'Vídeos',
            description: 'Assista às nossas últimas reportagens em vídeo, ensaios e documentários sobre a cultura automóvel.'
          }
        },
        infiniteFeed: {
          latestStories: 'Últimas Histórias',
          viewAll: 'Ver Tudo',
          loadingTrack: 'A carregar pista...',
          endOfRoad: 'Fim da estrada. Não há mais artigos para carregar.'
        }
      }
    }
  },
  {
    code: 'en-US',
    dict: {
      nav: {
        latest: 'Latest',
        intemporais: 'Timeless Machines',
        atlantica: 'Atlantic Journey',
        videos: 'Videos',
        iconicas: 'Iconic Stories',
        encontros: '3G Meets',
        copiloto: 'Co-pilot',
        searchPlaceholder: 'Search articles...'
      },
      footer: {
        description: 'Uncompromising automotive journalism. Stories straight from the asphalt to your screen.',
        newsletterDesc: 'Get the latest automotive stories in your inbox every week.',
        emailPlaceholder: 'Your primary email...',
        statusLoading: 'Sending...',
        statusSuccess: 'Subscribed!',
        statusError: 'Something went wrong.',
        about: 'About Us',
        editorial: 'Editorial Status',
        ficha: 'Technical Info',
        contact: 'Contacts',
        privacy: 'Privacy Policy',
        cookies: 'Cookie Policy',
        terms: 'Terms of Use',
        subscribe: 'Subscribe',
        rights: 'All rights reserved',
        sections: 'Sections',
        others: 'Others'
      },
      pages: {
        latest: {
          title: 'Latest Stories',
          subtitle: 'Explore all our content, organized chronologically. From the latest news to in-depth reviews.',
          noStories: 'No stories yet.',
          roadUnexplored: 'This road is yet to be explored.'
        },
        videos: {
          galleryPrefix: 'Stories in ',
          galleryHighlight: 'Motion',
          likeContent: 'Like our content?',
          subscribe: 'Subscribe on YouTube',
          viewAll: 'View All',
          youtubeChannel: 'YouTube Channel',
          loadingGallery: 'Loading Gallery...'
        },
        search: {
          title: 'Search Results',
          forTerm: 'For the term:',
          enterTerm: 'Please enter a search term.',
          noResults: 'No results found',
          tryOther: 'Try searching with other keywords.'
        },
        category: {
          explore: 'Explore all stories, reviews, and news about',
          noStories: 'No stories yet.',
          roadUnexplored: 'This road is yet to be explored.'
        },
        single: {
          notFound: 'Article Not Found',
          by: 'By',
          relatedTitle: 'Related Articles',
          viewMore: 'View more articles in this category →'
        },
        about: {
          title: 'About Us',
          whoWeAre: {
            title: 'Who we are',
            p1: 'Road Panda 92 is an independent editorial platform dedicated to automotive culture, memory, and the human stories built around cars.',
            p2: 'We don\'t just talk about machines. We talk about people, journeys, choices, and everything that makes an automobile stop being just an object and take on meaning.',
            p3: 'Road Panda 92 stems from a personal relationship with the automobile — built over years, on the road, in garages, at improvised meetings, and in conversations that don\'t fit into technical sheets. Our content starts from this lived experience.'
          },
          approach: {
            title: 'A unique editorial approach',
            p1: 'Our editorial line crosses cultural automotive journalism, contemporary chronicle, and daily observation. We give historical context when it matters, but we never write just to explain — we write to recognize.',
            distinguish: 'We clearly distinguish between:',
            items: [
              'editorial content',
              'opinion',
              'partnerships or content with a commercial framework'
            ],
            transparency: 'We believe that credibility is built through transparency, consistency, and respect for the reader.'
          },
          topics: {
            title: 'What we write about',
            intro: 'At Road Panda 92, we talk about:',
            items: [
              'classic and contemporary cars with cultural value',
              'real stories of people and their cars',
              'reliability, longevity, and everyday use',
              'generational memory, identity, and automotive heritage',
              'automotive culture beyond the hype and passing trends'
            ],
            summary: 'We don\'t follow trends. We observe them. We don\'t celebrate numbers for their own sake. We search for meaning.'
          },
          presence: {
            title: 'Digital presence',
            intro: 'Road Panda 92 develops editorial content for:',
            items: [
              'online platform',
              'Instagram',
              'short-form video and documentary format',
              'special audiovisual and editorial projects'
            ],
            footer: 'Each format exists to serve the story — not the other way around.'
          },
          project: {
            title: 'A project in construction',
            p1: 'Road Panda 92 is a continuously growing project, built with time, consistency, and intention. It does not aim to be everything to everyone, but to be relevant to those who identify with an automotive culture made of real experiences.',
            footer: 'Because there are stories that aren\'t told quickly. They are lived.'
          }
        },
        editorialStatus: {
          title: 'Editorial Status',
          items: [
            'Road Panda 92 is an online editorial information outlet specializing in automotive culture, history, and memory, whose fundamental goal is to ensure all readers\' right to quality information in the aforementioned areas.',
            'Road Panda 92 respects the Constitution of the Portuguese Republic and all applicable Portuguese laws, particularly those falling within the rights, obligations, and duties provided in the Press Law, as well as the ethical and deontological principles governing informative and editorial activity in Portugal.',
            'Road Panda 92 clearly and thoughtfully distinguishes between informative, opinionated, and advertising content, reserving the right to order, interpret, and relate facts, events, and contexts in the exercise of its editorial autonomy.',
            'Road Panda 92 is governed by editorial criteria of rigor, impartiality, and independence, ensuring a responsible, contextualized, and plural approach to the topics treated.',
            'Road Panda 92 commits to respecting the confidentiality of its information sources, not admitting, under any circumstances, the violation of this principle, except in cases expressly provided for by law.',
            'Road Panda 92 assumes the right to express its own opinion, particularly in editorials and analytical texts, always in full compliance with current legislation.',
            'Road Panda 92 has a national scope of dissemination, ensuring its international projection and access through the Internet as a digital editorial platform.',
            'Road Panda 92 complies with the guidelines defined in this Editorial Status, as well as those issued by its Board.'
          ]
        },
        technicalInfo: {
          title: 'Technical Info',
          labels: {
            title: 'Title',
            holder: 'Registration Holder',
            owner: 'Owner',
            director: 'Director',
            headquarters: 'Editorial Headquarters',
            contactEmail: 'Contact Email',
            platform: 'Platform',
            periodicity: 'Periodicity',
            ercNumber: 'ERC Registration Number'
          },
          values: {
            periodicity: 'Content published regularly, without a fixed periodicity.'
          }
        },
        contact: {
          title: 'Contact',
          tag: 'Talk to Us',
          subtitle: 'Questions, suggestions, or press releases? We\'re listening.',
          general: 'General',
          editorial: 'Editorial'
        },
        privacy: {
          title: 'Privacy Policy',
          sections: [
            {
              title: '1. Data Controller',
              content: 'The controller of personal data collected through the website www.roadpanda92.com is:\nSINGELO E CRISTALINO UNIPESSOAL LDA\nTax ID (NIF): 514762144\nAddress: Rua Jorge Bento, Number 34, 4450 Leça da Palmeira, Portugal\nEmail: roadpanda92@gmail.com'
            },
            {
              title: '2. Scope of the Policy',
              content: 'This Privacy Policy applies to the use of the website www.roadpanda92.com as an editorial, informative, and institutional content platform, including articles, news, contact forms, and other means of interaction with users.'
            },
            {
              title: '3. Personal Data Collected',
              content: 'In the context of using the site, the following personal data may be collected:',
              list: [
                'Name (when provided voluntarily)',
                'Email address',
                'Phone number (when applicable)',
                'Content of messages sent through forms',
                'IP address',
                'Technical navigation data (browser, operating system, pages visited, date and time of access)'
              ]
            },
            {
              title: '4. Purposes of Processing',
              content: 'Personal data collected is processed for the following purposes:',
              list: [
                'Management and response to requests for contact or clarification',
                'Communication with users',
                'Sending newsletters or editorial communications, when authorized',
                'Statistical analysis and improvement of site performance',
                'Ensuring the security and technical operation of the platform',
                'Compliance with legal obligations'
              ]
            },
            {
              title: '5. Legal Basis for Processing',
              content: 'The processing of personal data is based on the following legal grounds:',
              list: [
                'Consent of the data subject, when applicable',
                'Execution of pre-contractual measures at the request of the subject',
                'Legitimate interest of the controller (namely for editorial and analytical purposes)',
                'Compliance with legal obligations'
              ]
            },
            {
              title: '6. Data Retention',
              content: 'Personal data will be stored only for the period necessary for the purposes for which they were collected, namely:',
              list: [
                'Contact data: up to 12 months after the last interaction',
                'Data for sending newsletters: until consent is withdrawn',
                'Technical and statistical data: for the period necessary for analysis and site improvement',
                'Data necessary for compliance with legal obligations: for the legally required period'
              ]
            },
            {
              title: '7. Data Sharing with Third Parties',
              content: 'Personal data may be shared only when necessary with:',
              list: [
                'Technical service providers (hosting, email, analytics)',
                'Legal entities or authorities, when required by law'
              ],
              footer: 'Personal data is not sold, transferred, or used for unauthorized commercial purposes.'
            },
            {
              title: '8. Rights of the Data Subject',
              content: 'Under the GDPR, the data subject has the right to:',
              list: [
                'Access their personal data',
                'Correction of inaccurate or incomplete data',
                'Erasure of data (\'right to be forgotten\'), when applicable',
                'Restriction of processing',
                'Objection to processing',
                'Data portability',
                'Withdrawal of consent, when processing is based on consent'
              ],
              footer: 'The exercise of these rights can be made through a written request to the email indicated in point 1.'
            },
            {
              title: '9. Data Security',
              content: 'SINGELO E CRISTALINO UNIPESSOAL LDA adopts appropriate technical and organizational measures to protect personal data against unauthorized access, loss, destruction, or improper disclosure.'
            },
            {
              title: '10. Cookies',
              content: 'The site uses cookies to ensure its correct operation and for statistical purposes.\nFor more information on the use of cookies and how to manage them, the user should consult the Cookie Policy available on the site.'
            },
            {
              title: '11. Changes to the Privacy Policy',
              content: 'This Privacy Policy may be updated at any time.\nAny changes will be published on the website www.roadpanda92.com.'
            },
            {
              title: '12. Supervisory Authority',
              content: 'Without prejudice to any other administrative or judicial remedy, the data subject has the right to lodge a complaint with:\nNational Data Protection Commission (CNPD)\nhttps://www.cnpd.pt'
            }
          ]
        },
        cookies: {
          title: 'Cookie Policy',
          sections: [
            {
              title: '1. What are Cookies',
              content: 'Cookies are small text files stored on your device (computer, tablet, or smartphone) when you visit a website. These files allow the user\'s device to be recognized and improve the navigation experience.'
            },
            {
              title: '2. What are Cookies for',
              content: 'The website www.roadpanda92.com uses cookies to:',
              list: [
                'Ensure the site\'s correct operation',
                'Remember user preferences',
                'Analyze site usage statistics',
                'Improve the navigation experience and the content provided'
              ]
            },
            {
              title: '3. Types of Cookies Used',
              subsections: [
                {
                  title: '3.1 Strictly Necessary Cookies',
                  content: 'These cookies are essential for the site\'s operation and cannot be disabled in our systems. They are usually only set in response to actions performed by the user, such as privacy preference settings or secure navigation.'
                },
                {
                  title: '3.2 Performance and Statistical Cookies',
                  content: 'These cookies allow for collecting information about how visitors use the site, such as pages visited, browsing time, or traffic source, helping to improve performance and editorial content.\nThe collection of this information is carried out in an aggregated and, whenever possible, anonymized manner.'
                },
                {
                  title: '3.3 Functionality Cookies',
                  content: 'These cookies allow the site to remember choices made by the user, such as language or region preferences, providing a more personalized experience.'
                },
                {
                  title: '3.4 Marketing Cookies (when applicable)',
                  content: 'These cookies can be used to track visitors on websites with the aim of presenting relevant content or communications.\nThese cookies will only be used based on the user\'s express consent.'
                }
              ]
            },
            {
              title: '4. Cookie Management and Consent',
              content: 'When accessing the site, the user is informed of the use of cookies through a consent banner.\nThe user can:',
              list: [
                'Accept all cookies',
                'Reject non-essential cookies',
                'Set cookie preferences at any time'
              ],
              footer: 'Non-essential cookies will only be activated after the user\'s explicit consent.'
            },
            {
              title: '5. How to Manage or Disable Cookies',
              content: 'The user can, at any time, configure their browser to accept, refuse, or delete cookies. However, disabling essential cookies may affect the site\'s correct operation.\nCookie settings vary depending on the browser used.'
            },
            {
              title: '6. Third-Party Cookies',
              content: 'The site may use third-party cookies, namely analysis services, performance metrics, or technical tools, which are subject to those third parties\' privacy policies.'
            },
            {
              title: '7. Changes to the Cookie Policy',
              content: 'Road Panda 92, operated by SINGELO E CRISTALINO UNIPESSOAL LDA, reserves the right to change this Cookie Policy at any time. Changes will be published on the website www.roadpanda92.com.'
            },
            {
              title: '8. Contacts',
              content: 'For any questions related to the use of cookies, the user can contact us via email:\nroadpanda92@gmail.com'
            }
          ]
        },
        terms: {
          title: 'Terms of Use',
          sections: [
            {
              title: '1. Identification of the Responsible Party',
              content: 'This site is operated by:\nSINGELO E CRISTALINO UNIPESSOAL LDA\nTax ID (NIF): 514762144\nAddress: Rua Jorge Bento, Number 34, 4450 Leça da Palmeira, Portugal\nEmail: roadpanda92@gmail.com'
            },
            {
              title: '2. Object and Scope',
              content: 'These Terms of Use govern the access and use of the website www.roadpanda92.com as a digital platform for editorial, informative, and institutional content, including articles, news, chronicles, images, videos, and other published content.\nBy accessing and using the site, the user accepts these Terms of Use.'
            },
            {
              title: '3. Access to the Site',
              content: '3.1. Access to the site is free and does not require prior registration, except for specific features that may require it.\n3.2. The party responsible reserves the right to suspend, limit, or interrupt access to the site, temporarily or permanently, for technical, legal, or editorial reasons.'
            },
            {
              title: '4. Editorial Content',
              content: '4.1. Published content reflects its own editorial approach, of an informative, cultural, and opinionated nature.\n4.2. The information provided is informative and editorial in character, not constituting technical, legal, or professional advice.\n4.3. Despite the care in producing and verifying content, the absence of errors, omissions, or outdated information is not guaranteed.'
            },
            {
              title: '5. Copyright and Intellectual Property',
              content: '5.1. All content on the site, including text, images, videos, illustrations, graphic design, and logos, is the property of Road Panda 92 or used with authorization from the respective owners, and is protected by copyright.\n5.2. Sharing excerpts of content is permitted, provided that:',
              list: [
                'the source is indicated',
                'a link to the original article is included',
                'the meaning of the content is not altered'
              ],
              footer: '5.3. Full or partial reproduction for commercial purposes, without prior authorization, is prohibited.'
            },
            {
              title: '6. Comments and Interaction (when applicable)',
              content: '6.1. If the site provides comment or interaction areas, the user commits to using these features responsibly, respectfully, and legally.\n6.2. Comments are not permitted that:',
              list: [
                'are offensive, discriminatory, or defamatory',
                'contain hate speech or incitement to violence',
                'violate third-party rights',
                'have an unauthorized promotional character'
              ],
              footer: '6.3. The party responsible for the site reserves the right to moderate, edit, or remove comments that violate these Terms.'
            },
            {
              title: '7. Links to Third-Party Sites',
              content: '7.1. The site may contain links to external sites.\n7.2. SINGELO E CRISTALINO UNIPESSOAL LDA is not responsible for the content, policies, or practices of those third-party sites.'
            },
            {
              title: '8. Responsibility',
              content: '8.1. The user acknowledges that the use of the site is at their own risk.\n8.2. The party responsible for the site cannot be held liable for damages resulting from the use or inability to use the site, except in cases legally provided.'
            },
            {
              title: '9. Protection of Personal Data',
              content: 'The processing of personal data carried out in the context of site use is regulated by the Privacy Policy, available on the site.'
            },
            {
              title: '10. Changes to Terms of Use',
              content: 'These Terms of Use may be changed at any time.\nChanges will be published on the website www.roadpanda92.com and take effect from the date of their publication.'
            },
            {
              title: '11. Applicable Law',
              content: 'These Terms of Use are governed by Portuguese law.'
            }
          ]
        }
      },
      components: {
        postGrid: {
          latest: 'Latest',
          viewArchive: 'View Archive',
          readStory: 'Read Story'
        },
        categories: {
          'encontros-3g': {
            title: '3G Meetings',
            description: 'The automotive passion passed down from generation to generation. Stories of parents, children, and the classics that unite them.'
          },
          'historias-iconicas': {
            title: 'Iconic Stories',
            description: 'Fascinating tales about the automotive world, historical moments, and unique figures who shaped the industry.'
          },
          'maquinas-intemporais': {
            title: 'Timeless Machines',
            description: 'Cars that have stood the test of time and continue to be present in the imagination of several generations. Each model is presented not just as a machine, but as a symbol of an era. A collection of automobiles that never truly left the scene.'
          },
          'viagem-atlantica': {
            title: 'Atlantic Journey',
            description: 'The latest news, trends, and developments in the automotive world with a close look from both sides of the Atlantic.'
          },
          'copiloto': {
            title: 'Co-pilot',
            description: 'Practical tips, guides, and valuable advice to improve your driving experience and take better care of your machine.'
          },
          'videos': {
            title: 'Videos',
            description: 'Watch our latest video reports, test drives, and documentaries about car culture.'
          }
        },
        infiniteFeed: {
          latestStories: 'Latest Stories',
          viewAll: 'View All',
          loadingTrack: 'Loading track...',
          endOfRoad: 'End of the road. No more articles to load.'
        }
      }
    }
  },
  {
    code: 'es-ES',
    dict: {
      nav: {
        latest: 'Últimas',
        intemporais: 'Máquinas Atemporales',
        atlantica: 'Viaje Atlántico',
        videos: 'Videos',
        iconicas: 'Historias Icónicas',
        encontros: 'Encuentros 3G',
        copiloto: 'Copiloto',
        searchPlaceholder: 'Buscar artículos...'
      },
      footer: {
        description: 'Periodismo automotriz sin concesiones. Historias directamente del asfalto a tu pantalla.',
        newsletterDesc: 'Recibe las últimas historias automotrices en tu bandeja de entrada semanalmente.',
        emailPlaceholder: 'Tu correo principal...',
        statusLoading: 'Enviando...',
        statusSuccess: '¡Suscrito!',
        statusError: 'Algo salió mal.',
        about: 'Quiénes somos',
        editorial: 'Estatus Editorial',
        ficha: 'Ficha Técnica',
        contact: 'Contactos',
        privacy: 'Política de Privacidad',
        cookies: 'Política de Cookies',
        terms: 'Términos de Uso',
        subscribe: 'Suscribirse',
        rights: 'Todos los derechos reservados',
        sections: 'Secciones',
        others: 'Otros'
      },
      pages: {
        latest: {
          title: 'Últimas Historias',
          subtitle: 'Explora todo nuestro contenido, organizado cronológicamente. Desde las últimas novedades hasta reseñas exhaustivas.',
          noStories: 'Aún no hay historias.',
          roadUnexplored: 'Este camino está aún por explorar.'
        },
        videos: {
          galleryPrefix: 'Historias en ',
          galleryHighlight: 'Movimiento',
          likeContent: '¿Te gusta nuestro contenido?',
          subscribe: 'Suscribirse en YouTube',
          viewAll: 'Ver Todo',
          youtubeChannel: 'Canal YouTube',
          loadingGallery: 'Cargando Galería...'
        },
        search: {
          title: 'Resultados de la Búsqueda',
          forTerm: 'Para el término:',
          enterTerm: 'Por favor, introduce un término para buscar.',
          noResults: 'No se encontraron resultados',
          tryOther: 'Prueba buscando con otras palabras clave.'
        },
        category: {
          explore: 'Explora todas las historias, reseñas y noticias sobre',
          noStories: 'Aún no hay historias.',
          roadUnexplored: 'Este camino está aún por explorar.'
        },
        single: {
          notFound: 'Artículo No Encontrado',
          by: 'Por',
          relatedTitle: 'Artículos Relacionados',
          viewMore: 'Ver más artículos en esta categoría →'
        },
        about: {
          title: 'Sobre Nosotros',
          whoWeAre: {
            title: 'Quiénes somos',
            p1: 'Road Panda 92 es una plataforma editorial independiente dedicada a la cultura del automóvil, la memoria y las historias humanas que se construyen en torno a los coches.',
            p2: 'No hablamos solo de máquinas. Hablamos de personas, de recorridos, de elecciones y de todo aquello que hace que un automóvil deje de ser solo un objeto y pase a tener significado.',
            p3: 'Road Panda 92 nace de una relación personal con el automóvil — construida a lo largo de los años, en la carretera, en los garajes, en los encuentros improvisados y en las conversaciones que no caben en fichas técnicas. De ese lugar vivido parten nuestros contenidos.'
          },
          approach: {
            title: 'Un enfoque editorial propio',
            p1: 'Nuestra línea editorial cruza el periodismo cultural del automóvil, la crónica contemporánea y la observación de lo cotidiano. Damos contexto histórico cuando importa, mas nunca escrevemos apenas para explicar — escrevemos para reconhecer.',
            distinguish: 'Distinguimos claramente entre:',
            items: [
              'contenidos editoriales',
              'opinión',
              'alianzas o contenidos con marco comercial'
            ],
            transparency: 'Creemos que la credibilidad se construye con transparencia, coherencia y respeto por quien lee.'
          },
          topics: {
            title: 'Sobre lo que escribimos',
            intro: 'En Road Panda 92, hablamos de:',
            items: [
              'coches clásicos y contemporáneos con valor cultural',
              'historias reales de personas y sus coches',
              'fiabilidad, longevidad y uso cotidiano',
              'memoria generacional, identidad y herencia automotriz',
              'cultura del automóvil más allá del bombo publicitario y las tendencias pasajeras'
            ],
            summary: 'No seguimos modas. Las observamos. No celebramos los números por sí solos. Buscamos el significado.'
          },
          presence: {
            title: 'Presencia digital',
            intro: 'Road Panda 92 desarrolla contenidos editoriales para:',
            items: [
              'plataforma online',
              'Instagram',
              'vídeo corto e formato documental',
              'proyectos audiovisuales y editoriales especiales'
            ],
            footer: 'Cada formato existe para servir a la historia — no al revés.'
          },
          project: {
            title: 'Un proyecto em construção',
            p1: 'Road Panda 92 es un proyecto en crecimiento continuo, construido con tiempo, consistencia e intención. No pretende ser todo para todos, sino ser relevante para quien se reconoce en una cultura del automóvil hecha de experiencias reales.',
            footer: 'Porque hay historias que no se cuentan rápido. Se viven.'
          }
        },
        editorialStatus: {
          title: 'Estatus Editorial',
          items: [
            'Road Panda 92 es un órgano de información de naturaleza editorial en línea, especializado en cultura del automóvil, historia y memoria automovilística, cuyo objetivo fundamental es asegurar a todos los lectores el derecho a una información de calidad en las áreas mencionadas anteriormente.',
            'Road Panda 92 respeta la Constitución da República Portuguesa e todas as leis portuguesas aplicáveis, en particular aquelas que se encuadran en los direitos, obrigações e deveres previstos na Lei de Imprensa, bem como os princípios éticos e deontológicos que regem a atividade informativa e editorial em Portugal.',
            'Road Panda 92 distingue, de forma clara e criteriosa, o conteúdo de carácter informativo, opinativo e publicitário, reservando-se o direito de ordenar, interpretar e relacionar os factos, eventos e contextos, no exercício da sua autonomia editorial.',
            'Road Panda 92 se rige por critérios editoriais de rigor, imparcialidade e independência, garantizando uma abordagem responsável, contextualizada e plural aos temas tratados.',
            'Road Panda 92 compromete-se a respeitar o sigilo das suas fontes de informação, não admitindo, em qualquer circunstância, a violação desse princípio, salvo nos casos expressamente previstos na lei.',
            'Road Panda 92 assume o direito de emitir opinião própria, nomeadamente em editoriais e textos de análise, sempre no respeito integral pela legislação em vigor.',
            'Road Panda 92 tem um âmbito de difusão nacional, garantindo a sua projeção e acesso internacional através da Internet, enquanto plataforma editorial digital.',
            'Road Panda 92 cumpre as orientações definidas no presente Estatuto Editorial, bem como aquelas emanadas pela sua Direção.'
          ]
        },
        technicalInfo: {
          title: 'Ficha Técnica',
          labels: {
            title: 'Título',
            holder: 'Titular de Registro',
            owner: 'Propietario',
            director: 'Director',
            headquarters: 'Sede Editorial',
            contactEmail: 'Correo de Contacto',
            platform: 'Plataforma',
            periodicity: 'Periodicidad',
            ercNumber: 'Número de Registro en la ERC'
          },
          values: {
            periodicity: 'Contenidos publicados de forma regular, sin periodicidad fija.'
          }
        },
        contact: {
          title: 'Contacto',
          tag: 'Hable con Nosotros',
          subtitle: '¿Dudas, sugerencias o comunicados de prensa? Estamos escuchando.',
          general: 'General',
          editorial: 'Editorial'
        },
        privacy: {
          title: 'Política de Privacidad',
          sections: [
            {
              title: '1. Responsable del Tratamiento de Datos',
              content: 'El responsable del tratamiento de los datos personales recogidos a través del sitio www.roadpanda92.com es:\nSINGELO E CRISTALINO UNIPESSOAL LDA\nNIF: 514762144\nDirección: Rua Jorge Bento, Número 34, 4450 Leça da Palmeira, Portugal\nEmail: roadpanda92@gmail.com'
            },
            {
              title: '2. Âmbito da Política',
              content: 'La presente Política de Privacidad se aplica al uso del sitio www.roadpanda92.com, como plataforma de contenidos editoriales, informativos e institucionales, incluindo artículos, noticias, formularios de contacto e outros medios de interacción con os utilizadores.'
            },
            {
              title: '3. Dados Pessoais Recolhidos',
              content: 'En el marco del uso del sitio, se podem recolher os seguintes dados pessoais:',
              list: [
                'Nombre (cuando se proporciona voluntariamente)',
                'Endereço de email',
                'Número de telefone (quando aplicável)',
                'Contenido de los mensajes enviados a través de formularios',
                'Endereço IP',
                'Dados técnicos de navegação (navegador, sistema operativo, páginas visitadas, fecha y hora de acceso)'
              ]
            },
            {
              title: '4. Finalidades do Tratamento',
              content: 'Los datos personales recolhidos são tratados para as seguintes finalidades:',
              list: [
                'Gestión y resposta a pedidos de contacto o aclaración',
                'Comunicación con os utilizadores',
                'Envio de boletines o comunicações editoriais, quando autorizado',
                'Análisis estatístico e melhoria do desempenho do site',
                'Garantía da segurança e funcionamento técnico da plataforma',
                'Cumprimento de obrigações legais'
              ]
            },
            {
              title: '5. Fundamentos Legais do Tratamento',
              content: 'El tratamento dos dados pessoais baseia-se nos seguintes fundamentos legais:',
              list: [
                'Consentimiento do titular dos dados, quando aplicável',
                'Execução de diligências prévias a pedido do titular',
                'Interesse legítimo do responsável pelo tratamento (nomeadamente para fins editoriais e analíticos)',
                'Cumprimento de obrigações legais'
              ]
            },
            {
              title: '6. Conservação dos Dados',
              content: 'Los datos pessoais serão conservados apenas pelo período necessário às finalidades para as quais foram recolhidos, nomeadamente:',
              list: [
                'Dados de contacto: até 12 meses após a última interação',
                'Dados para envio de boletines: até retirada do consentimento',
                'Dados técnicos e estatísticos: pelo período necessário à análise e melhoria do site',
                'Dados necessários para cumprimento de obrigações legais: pelo prazo legalmente exigido'
              ]
            },
            {
              title: '7. Partilha de Dados com Terceiros',
              content: 'Os dados pessoais poderão ser partilhados apenas quando necessário com:',
              list: [
                'Prestadores de serviços técnicos (alojamento, email, analytics)',
                'Entidades legais ou autoridades, quando exigido por lei'
              ],
              footer: 'Los datos pessoais não são vendidos, cedidos ou utilizados para fins comerciais não autorizados.'
            },
            {
              title: '8. Direitos do Titular dos Dados',
              content: 'En términos del RGPD, o titular dos dados tem direito a:',
              list: [
                'Acesso aos seus dados pessoais',
                'Retificação de dados inexatos ou incompletos',
                'Apagamento dos dados (“direito ao olvido”), quando aplicável',
                'Limitação do tratamento',
                'Oposição ao tratamento',
                'Portabilidade dos dados',
                'Retirada do consentimento, quando o tratamento se basear no consentimento'
              ],
              footer: 'El ejercicio de estes direitos pode ser efetuado através de pedido escrita para o email indicado no ponto 1.'
            },
            {
              title: '9. Segurança dos Dados',
              content: 'A SINGELO E CRISTALINO UNIPESSOAL LDA adota medidas técnicas e organizativas adequadas para proteger os dados pessoais contra acesso não autorizado, perda, destruição ou divulgação indevida.'
            },
            {
              title: '10. Cookies',
              content: 'El sitio utiliza cookies para garantir o seu correto funcionamento e para fins estatísticos.\nPara mais informações sobre o uso de cookies e a forma de os gerir, o utilizador deve consultar a Política de Cookies disponível no site.'
            },
            {
              title: '11. Alterações à Política de Privacidade',
              content: 'La presente Política de Privacidade pode ser atualizada a qualquer momento.\nQuaisquer alterações serão publicadas no site www.roadpanda92.com.'
            },
            {
              title: '12. Autoridade de Controlo',
              content: 'Sin prejuízo de qualquer outro recurso administrativo ou judicial, o titular dos dados tem o direito de apresentar reclamação junto da:\nComissão Nacional de Proteção de Dados (CNPD)\nhttps://www.cnpd.pt'
            }
          ]
        },
        cookies: {
          title: 'Política de Cookies',
          sections: [
            {
              title: '1. Qué son las Cookies',
              content: 'Las cookies son pequeños arquivos de texto almacenados en su dispositivo (computador, tableta o smartphone) quando visita um website. Estes ficheiros permitem reconhecer o dispositivo do utilizador e melhorar a experiênica de navegação.'
            },
            {
              title: '2. Para qué servem os Cookies',
              content: 'El sitio www.roadpanda92.com utiliza cookies para:',
              list: [
                'Assegurar o correto funcionamento do site',
                'Memorizar preferências do utilizador',
                'Analisar estatísticas de utilização do site',
                'Melhorar a experiência de navegação e os conteúdos disponibilizados'
              ]
            },
            {
              title: '3. Tipos de Cookies Utilizados',
              subsections: [
                {
                  title: '3.1 Cookies Estritamente Necessários',
                  content: 'Estes cookies são essenciais para o funcionamento do site e não podem ser desativados nos nossos sistemas. São normalmente definidos apenas em resposta a ações realizadas pelo utilizador, como definições de preferências de privacidade ou navegação segura.'
                },
                {
                  title: '3.2 Cookies de Rendimento e Estatística',
                  content: 'Estes cookies permitem recolher informações sobre a forma como os visitantes utilizam o site, como páginas visitadas, tempo de navegação ou origem do tráfego, ajudando a melhorar o desempenho e os conteúdos editoriais.\nA recolha destas informações é efetuada de forma agregada e, sempre que possível, anonimizada.'
                },
                {
                  title: '3.3 Cookies de Funcionalidade',
                  content: 'Estes cookies permitem ao site recordar escolhas efetuadas pelo utilizador, como preferências de idioma ou região, proporcionando uma experiência mais personalizada.'
                },
                {
                  title: '3.4 Cookies de Marketing (quando sea aplicable)',
                  content: 'Estes cookies podem ser utilizados para acompanhar os visitantes nos websites, com o objetivo de apresentar conteúdos ou comunicações relevantes.\nEstes cookies apenas serão utilizados mediante consentimento expresso do utilizador.'
                }
              ]
            },
            {
              title: '4. Gestão de Cookies e Consentimento',
              content: 'Ao aceder ao site, o utilizador é informado da utilização de cookies através de um banner de consentimento.\nEl utilizador pode:',
              list: [
                'Aceitar todas as cookies',
                'Rejeitar cookies não essenciais',
                'Definir preferências de cookies a qualquer momento'
              ],
              footer: 'Os cookies não essenciais apenas serão ativados após consentimento explícito do utilizador.'
            },
            {
              title: '5. Como Gerir ou Desativar Cookies',
              content: 'El utilizador pode, a qualquer momento, configurar o seu navegador para aceitar, recusar ou eliminar cookies. No entanto, a desativação de cookies essenciais pode afetar o correto funcionamento do site.\nAs definições de cookies variam consoante o navegador utilizado.'
            },
            {
              title: '6. Cookies de Terceiros',
              content: 'O site pode utilizar cookies de terceiros, nomeadamente serviços de análise, métricas de desempenho ou ferramentas técnicas, os quais estão sujeitos às políticas de privacidade desses terceiros.'
            },
            {
              title: '7. Alterações à Política de Cookies',
              content: 'A Road Panda 92, operada pela SINGELO E CRISTALINO UNIPESSOAL LDA, reserva-se o direito de alterar a presente Política de Cookies a qualquer momento. As alterações serão publicadas no site www.roadpanda92.com.'
            },
            {
              title: '8. Contactos',
              content: 'Para qualquer questão relacionada com a utilização de cookies, o utilizador pode contactar-nos através do email:\nroadpanda92@gmail.com'
            }
          ]
        },
        terms: {
          title: 'Términos de Uso',
          sections: [
            {
              title: '1. Identificação do Responsável',
              content: 'O presente site é operado por:\nSINGELO E CRISTALINO UNIPESSOAL LDA\nNIF: 514762144\nMorada: Rua Jorge Bento, Número 34, 4450 Leça da Palmeira, Portugal\nEmail: roadpanda92@gmail.com'
            },
            {
              title: '2. Objeto e Âmbito',
              content: 'Os presentes Termos de Utilização regulam o acesso e a utilização do site www.roadpanda92.com, enquanto plataforma digital de conteúdos editoriais, informativos e institucionais, incluindo artigos, notícias, crónicas, imagens, vídeos e outros conteúdos publicados.\nAo aceder e utilizar o site, o utilizador aceita estes Termos de Utilização.'
            },
            {
              title: '3. Acesso ao Site',
              content: '3.1. O acesso ao site é gratuito e não requer registo prévio, salvo funcionalidades específicas que o possam exigir.\n3.2. O responsável reserva-se o direito de suspender, limitar ou interromper o acesso ao site, temporária ou definitivamente, por razões técnicas, legais ou editorais.'
            },
            {
              title: '4. Conteúdos Editorais',
              content: '4.1. Os conteúdos publicados refletem uma abordagem editorial própria, de natureza informativa, cultural e opinativa.\n4.2. A informação disponibilizada tem caráter informativo e editorial, não constituindo aconselhamento técnico, jurídico ou profissional.\n4.3. Apesar do cuidado na produção e verificação dos conteúdos, não é garantida a inexistência de erros, omissões ou desatualizações.'
            },
            {
              title: '5. Direitos de Autor e Propriedade Intelectual',
              content: '5.1. Todos os conteúdos presentes no site, incluindo textos, imagens, vídeos, ilustrações, design gráfico e logótipos, são propriedade da Road Panda 92 ou utilizados com autorização dos respetivos titulares, estando protegidos por direitos de autor.\n5.2. É permitida a partilha de excertos dos conteúdos, desde que:',
              list: [
                'seja indicada a fonte',
                'seja incluído link para o artigo original',
                'não haja alteração do sentido do conteúdo'
              ],
              footer: '5.3. A reprodução total ou parcial para fins comerciais, sem autorização prévia, é proibida.'
            },
            {
              title: '6. Comentários e Interação (quando sea aplicable)',
              content: '6.1. Caso o site disponibilize áreas de comentários ou interação, o utilizador compromete-se a utilizar essas funcionalidades de forma responsável, respeitosa e legal.\n6.2. Não são permitidos comentários que:',
              list: [
                'sejam ofensivos, discriminatórios ou difamatórios',
                'contenham discurso de ódio ou incitação à violência',
                'violem direitos de terceiros',
                'tenham caráter promocional não autorizado'
              ],
              footer: '6.3. O responsável pelo site reserva-se o direito de moderar, editar ou remover comentários que violem estes Termos.'
            },
            {
              title: '7. Ligações para Sites de Terceiros',
              content: '7.1. O site pode conter ligações para sites externos.\n7.2. A SINGELO E CRISTALINO UNIPESSOAL LDA não é responsável pelo conteúdo, políticas ou práticas desses sites de terceiros.'
            },
            {
              title: '8. Responsabilidade',
              content: '8.1. El utilizador reconhece que a utilização do site é feita por sua conta e risco.\n8.2. O responsável pelo site não pode ser responsabilizado por danos resultantes da utilização ou impossibilidade de utilização do site, salvo nos casos legalmente previstos.'
            },
            {
              title: '9. Proteção de Dados Pessoais',
              content: 'O tratamento de dados pessoais efetuado no âmbito da utilização do site encontra-se regulado pela Política de Privacidade, disponível no site.'
            },
            {
              title: '10. Alterações aos Termos de Utilização',
              content: 'Os presentes Termos de Utilização podem ser alterados a qualquer momento.\nAs alterações serão publicadas no site www.roadpanda92.com e produzem efeitos a partir da data da sua publicação.'
            },
            {
              title: '11. Lei Aplicável',
              content: 'Os presentes Termos de Utilização são regidos pela lei portuguesa.'
            }
          ]
        }
      },
      components: {
        postGrid: {
          latest: 'Últimas',
          viewArchive: 'Ver Arquivo',
          readStory: 'Leer Historia'
        },
        categories: {
          'encontros-3g': {
            title: 'Encuentros 3G',
            description: 'La pasión automotriz que passa de geração em geração. Histórias de pais, filhos e os clássicos que os unem.'
          },
          'historias-iconicas': {
            title: 'Historias Icónicas',
            description: 'Relatos fascinantes sobre el mundo automóvel, momentos históricos e figuras singulares que moldaram a indústria.'
          },
          'maquinas-intemporais': {
            title: 'Máquinas Atemporales',
            description: 'Coches que han resistido el paso del tiempo y continúan marcando presencia en el imaginario de varias generaciones. Cada modelo se apresenta não apenas como máquina, mas como símbolo de uma época. Uma coleção de automóveis que nunca saíram verdadeiramente de cena.'
          },
          'viagem-atlantica': {
            title: 'Viaje Atlántico',
            description: 'Las últimas novidades, tendências e desenvolvimentos do mundo automóvel com um olhar atento de ambos os lados do Atlântico.'
          },
          'copiloto': {
            title: 'Copiloto',
            description: 'Consejos prácticos, guías e conselhos valiosos para melhorar a sua experiência ao volante e cuidar melhor da sua máquina.'
          },
          'videos': {
            title: 'Vídeos',
            description: 'Mira nossos últimos reportagens em vídeo, ensaios e documentários sobre a cultura automóvel.'
          }
        },
        infiniteFeed: {
          latestStories: 'Últimas Historias',
          viewAll: 'Ver Tudo',
          loadingTrack: 'A carregar pista...',
          endOfRoad: 'Fim da estrada. Não há mais artigos para carregar.'
        }
      }
    }
  },
  {
    code: 'it-IT',
    dict: {
      nav: {
        latest: 'Ultime',
        intemporais: 'Macchine Senza Tempo',
        atlantica: 'Viaggio Atlantico',
        videos: 'Video',
        iconicas: 'Storie Iconiche',
        encontros: 'Incontri 3G',
        copiloto: 'Copilota',
        searchPlaceholder: 'Cerca articoli...'
      },
      footer: {
        description: 'Giornalismo automobilistico senza compromessi. Storie direttamente dall\'asfalto al tuo schermo.',
        newsletterDesc: 'Ricevi le ultime storie automobilistiche nella tua casella di posta ogni settimana.',
        emailPlaceholder: 'La tua email principale...',
        statusLoading: 'Invio in corso...',
        statusSuccess: 'Iscritto!',
        statusError: 'Qualcosa è andato storto.',
        about: 'Chi siamo',
        editorial: 'Status Editoriale',
        ficha: 'Scheda Tecnica',
        contact: 'Contatti',
        privacy: 'Privacy Policy',
        cookies: 'Cookie Policy',
        terms: 'Termini di Utilizzo',
        subscribe: 'Iscriviti',
        rights: 'Tutti i diritti riservati',
        sections: 'Sezioni',
        others: 'Altri'
      },
      pages: {
        latest: {
          title: 'Ultime Storie',
          subtitle: 'Esplora tutti i nostri contenuti, organizzati cronologicamente. Dalle ultime novità alle recensioni approfondite.',
          noStories: 'Nessuna storia ancora.',
          roadUnexplored: 'Questa strada è ancora da esplorare.'
        },
        videos: {
          galleryPrefix: 'Storie in ',
          galleryHighlight: 'Movimento',
          likeContent: 'Ti piacciono i nostri contenuti?',
          subscribe: 'Iscriviti su YouTube',
          viewAll: 'Vedi Tutto',
          youtubeChannel: 'Canale YouTube',
          loadingGallery: 'Caricamento Galleria...'
        },
        search: {
          title: 'Risultati della Ricerca',
          forTerm: 'Per il termine:',
          enterTerm: 'Si prega di inserire un termine per la ricerca.',
          noResults: 'Nessun risultato trovato',
          tryOther: 'Prova a cercare con altre parole chiave.'
        },
        category: {
          explore: 'Esplora tutte le storie, le recensioni e le notizie su',
          noStories: 'Nessuna storia ancora.',
          roadUnexplored: 'Questa strada è ancora da esplorare.'
        },
        single: {
          notFound: 'Articolo Non Trovato',
          by: 'Di',
          relatedTitle: 'Articoli Correlati',
          viewMore: 'Guarda altri articoli in questa categoria →'
        },
        about: {
          title: 'Chi Siamo',
          whoWeAre: {
            title: 'Chi siamo',
            p1: 'Road Panda 92 è una piattaforma editoriale indipendente dedicata alla cultura automobilistica, alla memoria e alle storie umane che nascono attorno alle auto.',
            p2: 'Non parliamo solo di macchine. Parliamo di persone, di percorsi, di scelte e di tutto ciò che fa sì che un\'automobile smetta di essere solo un oggetto e inizi ad avere un significato.',
            p3: 'Road Panda 92 nasce da un rapporto personale con l\'automobile — costruito negli anni, sulla strada, nei garage, negli incontri improvvisati e nelle conversazioni che non trovano posto nelle schede tecniche. I nostri contenuti partono da questa esperienza vissuta.'
          },
          approach: {
            title: 'Un approccio editoriale proprio',
            p1: 'La nostra linea editoriale incrocia giornalismo culturale automobilistico, cronaca contemporanea e osservazione del quotidiano. Forniamo contesto storico quando è importante, ma non scriviamo mai solo per spiegare — scriviamo per riconoscere.',
            distinguish: 'Distinguiamo chiaramente tra:',
            items: [
              'contenuti editoriali',
              'opinione',
              'partnership o contenuti con inquadramento comercial'
            ],
            transparency: 'Crediamo che la credibilità si costruisca con trasparenza, coerenza e rispetto per chi legge.'
          },
          topics: {
            title: 'Di cosa scriviamo',
            intro: 'Su Road Panda 92, parliamo di:',
            items: [
              'auto classiche e contemporanee con valore culturale',
              'storie reali di persone e dei loro automobili',
              'affidabilità, longevità e uso quotidiano',
              'memoria gerazionale, identità e eredità automobilistica',
              'cultura automobilistica oltre l\'hype e le tendenze passeggere'
            ],
            summary: 'Non seguiamo le mode. Le osserviamo. Non celebriamo i numeri di per sé. Cerchiamo il significato.'
          },
          presence: {
            title: 'Presenza digitale',
            intro: 'Road Panda 92 desenvolve conteúdos editoriais para:',
            items: [
              'plataforma online',
              'Instagram',
              'video brevi e formato documentaristico',
              'progetti audiovisivi ed editoriali speciali'
            ],
            footer: 'Ogni formato esiste per servire a história — não o contrário.'
          },
          project: {
            title: 'Un projeto em construção',
            p1: 'Road Panda 92 è um projecto em continua crescita, costruito con tempo, costanza e intenzione. Non pretende di essere tutto per tutti, ma di essere rilevante per chi si riconosce in una cultura automobilistica fatta di esperienze reali.',
            footer: 'Perché ci sono storie che não se contam in fretta. Si vivono.'
          }
        },
        editorialStatus: {
          title: 'Status Editoriale',
          items: [
            'Road Panda 92 è um órgão de informação de natureza editoriale online, especializado em cultura automobilística, história e memória automobilística, cujo objetivo fundamental é assegurar a todos os leitores o direito a uma informação de qualidade nas áreas acima mencionadas.',
            'Road Panda 92 respeita a Constituição da República Portuguesa e todas as leis portuguesas aplicáveis, nomeadamente as que se enquadram nos direitos, obrigações e deveres previstos na Lei de Imprensa, bem como os princípios éticos e deontológicos que regem a atividade informativa e editorial em Portugal.',
            'Road Panda 92 distingue, de forma clara e criteriosa, os conteúdos de carácter informativo, opinativo e publicitário, reservando-se o direito de ordenar, interpretar e relacionar os factos, acontecimentos e contextos, no exercício da sua autonomia editorial.',
            'Road Panda 92 rege-se por critérios editoriais de rigor, isenção e independência, assegurando uma abordagem responsável, contextualizada e plural aos temas tratados.',
            'Road Panda 92 compromete-se a respeitar o sigilo das suas fontes de informação, não admitindo, em qualquer circunstância, a violação desse princípio, salvo nos casos expressamente previstos na lei.',
            'Road Panda 92 assume o direito de emitir opinião própria, nomeadamente em editoriais e textos de análise, sempre no respeito integral pela legislação em vigor.',
            'Road Panda 92 tem um âmbito de difusão nacional, garantindo a sua projeção e acesso internacional através da Internet, enquanto plataforma editorial digital.',
            'Road Panda 92 cumpre as orientações definidas no presente Estatuto Editorial, bem como aquelas emanadas pela sua Direção.'
          ]
        },
        technicalInfo: {
          title: 'Scheda Tecnica',
          labels: {
            title: 'Titolo',
            holder: 'Titolare della Registrazione',
            owner: 'Proprietario',
            director: 'Direttore',
            headquarters: 'Sede Editoriale',
            contactEmail: 'Email di Contatto',
            platform: 'Piattaforma',
            periodicity: 'Periodicità',
            ercNumber: 'Numero di Registrazione presso l\'ERC'
          },
          values: {
            periodicity: 'Contenuti pubblicati regolarmente, senza periodicità fissa.'
          }
        },
        contact: {
          title: 'Contatti',
          tag: 'Parla con Noi',
          subtitle: 'Domande, suggerimenti o comunicati stampa? Siamo in ascolto.',
          general: 'Generale',
          editorial: 'Editoriale'
        },
        privacy: {
          title: 'Privacy Policy',
          sections: [
            {
              title: '1. Titolare del Trattamento',
              content: 'O responsável pelo tratamento dos dados pessoais recolhidos através do site www.roadpanda92.com é:\nSINGELO E CRISTALINO UNIPESSOAL LDA\nNIF: 514762144\nMorada: Rua Jorge Bento, Número 34, 4450 Leça da Palmeira, Portugal\nEmail: roadpanda92@gmail.com'
            },
            {
              title: '2. Âmbito da Política',
              content: 'A presente Política de Privacidade aplica-se à utilização do site www.roadpanda92.com, enquanto plataforma de conteúdos editoriais, informativos e institucionais, incluindo artigos, notícias, formulários de contacto e outros meios de interação com os utilizadores.'
            },
            {
              title: '3. Dados Pessoais Raccolti',
              content: 'In terms dell\'utilizzo del sito, podem ser recolhidos os seguintes dados pessoais:',
              list: [
                'Nome (quando fornecido voluntariamente)',
                'Indirizzo email',
                'Numero di telefono (ove applicable)',
                'Contenuto dei messaggi inviati tramite moduli',
                'Indirizzo IP',
                'Dados técnicos de navegação (browser, sistema operativo, páginas visitadas, data e hora de acesso)'
              ]
            },
            {
              title: '4. Finalità del Trattamento',
              content: 'Os dados pessoais recolhidos são tratados para as seguintes finalidades:',
              list: [
                'Gestão e resposta a pedidos de contacto ou esclarecimento',
                'Comunicazione con os utilizadores',
                'Envio de newsletter o comunicações editoriais, quando autorizado',
                'Analisi estatística e melhoria do desempenho do site',
                'Garantia da segurança e funcionamento técnico da plataforma',
                'Adempimento di obblighi legali'
              ]
            },
            {
              title: '5. Basi Legali del Trattamento',
              content: 'Il tratamento dos dados pessoais baseia-se nos seguintes fondamenti legali:',
              list: [
                'Consenso dell\'interessato, ove applicabile',
                'Execução de diligências prévias a pedido do titular',
                'Interesse legítimo do responsável pelo tratamento (nomeadamente para fins editoriais e analíticos)',
                'Adempimento di obblighi legali'
              ]
            },
            {
              title: '6. Conservazione dei Dati',
              content: 'Os dados pessoais serão conservados apenas pelo período necessário às finalidades para as quais foram recolhidos, nomeadamente:',
              list: [
                'Dados de contacto: até 12 meses após a última interação',
                'Dados para o envio de newsletter: fino alla revoca do consentimento',
                'Dados técnicos e estatísticos: pelo período necessário à análise e melhoria do site',
                'Dados necessários para l\'adempimento di obblighi legali: pelo prazo legalmente exigido'
              ]
            },
            {
              title: '7. Condivisione dei Dati con Terzi',
              content: 'I dati personali poderão ser condivisi com terzi solo quando necessário:',
              list: [
                'Prestadores de serviços técnicos (alojamento, email, analytics)',
                'Entidades legais ou autoridades, quando exigido por lei'
              ],
              footer: 'I dati personali não vengono venduti, ceduti o utilizzati per finalità commerciali não autorizadas.'
            },
            {
              title: '8. Diritti dell\'Interessato',
              content: 'En termos do RGPD, l\'interessato ha il direito de:',
              list: [
                'Acesso aos seus dados pessoais',
                'Retificação de dados inexatos ou incompletos',
                'Cancellazione dei dati (“direito all\'oblio”), ove applicabile',
                'Limitação do tratamento',
                'Oposição ao tratamento',
                'Portabilidade dos dados',
                'Revoca do consentimento, quando o tratamento se basear no consentimento'
              ],
              footer: 'L\'esercizio di questi direitos pode ser efetuado tramite richiesta scritta all\'email indicada ao ponto 1.'
            },
            {
              title: '9. Segurança dos Dados',
              content: 'A SINGELO E CRISTALINO UNIPESSOAL LDA adota medidas técnicas e organizativas adequadas para proteger os dados pessoais contra acesso não autorizado, perda, destruição ou divulgação indevida.'
            },
            {
              title: '10. Cookie',
              content: 'O site utiliza i cookie per garantirne o corretto funcionamento e para fins estatísticos.\nPara mais informações sobre o uso de cookies e su como gerirli, o utilizador deve consultar a Política de Cookies disponível no site.'
            },
            {
              title: '11. Modifiche alla Privacy Policy',
              content: 'La presente Privacy Policy pode ser atualizada a qualquer momento.\nEventuais modifiche serão publicadas sul site www.roadpanda92.com.'
            },
            {
              title: '12. Autorità di Controllo',
              content: 'Fatto salvo ogni altro ricorso administrativo ou judicial, l\'interessato ha o direito de proporre reclamo alla:\nComissão Nacional de Proteção de Dados (CNPD)\nhttps://www.cnpd.pt'
            }
          ]
        },
        cookies: {
          title: 'Cookie Policy',
          sections: [
            {
              title: '1. Cosa sono i Cookie',
              content: 'I cookie sono piccoli file di testo memorizzati sul tuo dispositivo (computer, tablet o smartphone) quando visiti un sito web. Questi file permettono di riconoscere il dispositivo dell\'utente e migliorare l\'esperienza di navigazione.'
            },
            {
              title: '2. A cosa servono i Cookie',
              content: 'O site www.roadpanda92.com utiliza i cookie per:',
              list: [
                'Assegurar o correto funcionamento do site',
                'Memorizar preferências do utilizador',
                'Analisar estatísticas de utilização do site',
                'Melhorar a experiência de navegação e os conteúdos disponibilizados'
              ]
            },
            {
              title: '3. Tipi di Cookie Utilizzati',
              subsections: [
                {
                  title: '3.1 Cookie Strettamente Necessari',
                  content: 'Estes cookies são essenciais para o funcionamento do site e não podem ser desativados nos nossos sistemas. Di solito vengono impostati solo in resposta ad ações realizadas pelo utilizador, como definições de preferências de privacidade ou navegação segura.'
                },
                {
                  title: '3.2 Cookie di Prestazione e Statistica',
                  content: 'Estes cookies permitem recolher informações sobre a forma como os visitantes utilizam o site, como páginas visitadas, tempo de navegação ou origem do tráfego, ajudando a melhorar o desempenho e os conteúdos editoriais.\nA recolha destas informações é efetuada de forma agregada e, quando possível, anonimizada.'
                },
                {
                  title: '3.3 Cookie di Funzionalità',
                  content: 'Estes cookies permitem ao site recordar escolhas efetuadas pelo utilizador, como preferências de idioma ou região, proporcionando uma experiência mais personalizada.'
                },
                {
                  title: '3.4 Cookie di Marketing (ove applicabile)',
                  content: 'Estes cookies podem ser utilizados para acompanhar os visitantes nos websites, com o objetivo de apresentar conteúdos ou comunicações relevantes.\nEstes cookies serão utilizados apenas mediante consentimento expresso do utilizador.'
                }
              ]
            },
            {
              title: '4. Gestão dei Cookie e Consenso',
              content: 'Accedendo al site, o utilizador é informado da utilização de cookies através de um banner de consentimento.\nL\'utente pode:',
              list: [
                'Aceitar todos os cookies',
                'Rejeitar cookies não essenciais',
                'Definir preferências de cookies a qualquer momento'
              ],
              footer: 'I cookie não essenciais serão ativados apenas após consentimento explícito do utilizador.'
            },
            {
              title: '5. Come Gestire o Disattivare i Cookie',
              content: 'L\'utente pode, a qualquer momento, configurar o seu navegador para aceitar, recusar ou eliminar cookies. No entanto, a desativação de cookies essenciais pode afetar o correto funcionamento do site.\nAs definições de cookies variam consoante o navegador utilizado.'
            },
            {
              title: '6. Cookie di Terze Parti',
              content: 'O site pode utilizar cookies de terceiros, nomeadamente serviços de análise, métricas de desempenho ou ferramentas técnicas, os quais estão sujeitos às políticas de privacidade desses terceiros.'
            },
            {
              title: '7. Modifiche alla Cookie Policy',
              content: 'A Road Panda 92, operada pela SINGELO E CRISTALINO UNIPESSOAL LDA, reserva-se o direito de mudar a presente Cookie Policy a qualquer momento. As alterações serão publicadas no site www.roadpanda92.com.'
            },
            {
              title: '8. Contatti',
              content: 'Per qualquer questão relacionada com a utilização de cookies, o utilizador pode contactar-nos através do email:\nroadpanda92@gmail.com'
            }
          ]
        },
        terms: {
          title: 'Termini di Utilizzo',
          sections: [
            {
              title: '1. Identificação do Responsável',
              content: 'Il presente site è gestito da:\nSINGELO E CRISTALINO UNIPESSOAL LDA\nNIF: 514762144\nMorada: Rua Jorge Bento, Número 34, 4450 Leça da Palmeira, Portugal\nEmail: roadpanda92@gmail.com'
            },
            {
              title: '2. Oggetto e Ambito',
              content: 'I presenti Termini di Utilizzo regulam o acesso e a utilização do site www.roadpanda92.com, enquanto plataforma digital de conteúdos editoriais, informativos e institucionais, incluindo artigos, notícias, crónicas, imagens, vídeos e outros conteúdos publicados.\nAccedendo e utilizando o site, o utilizador aceita estes Termini di Utilizzo.'
            },
            {
              title: '3. Acesso ao Site',
              content: '3.1. O acesso ao site é gratuito e não requer registo prévio, salvo funcionalidades específicas que o possam exigir.\n3.2. O responsável reserva-se o direito de suspender, limitar ou interromper o acesso ao site, temporariamente ou definitivamente, por razões técnicas, legais ou editorais.'
            },
            {
              title: '4. Conteúdos Editorais',
              content: '4.1. Os conteúdos publicados refletem uma abordagem editorial própria, de natureza informativa, cultural e opinativa.\n4.2. As informações fornecidas têm caráter informativo ed editoriale, não constituindo aconselhamento técnico, jurídico ou profissional.\n4.3. Apesar do cuidado na produção e verificação dos conteúdos, não é garantida a inexistência de erros, omissões ou mancanças de atualização.'
            },
            {
              title: '5. Diritto d\'Autore e Proprietà Intellettuale',
              content: '5.1. Todos os conteúdos presentes no site, incluindo textos, imagens, vídeos, ilustrações, design gráfico e logótipos, são propriedade da Road Panda 92 ou utilizados com autorização dos respetivos titulares, e são protegidos pelo direito d\'autor.\n5.2. È consentita a partilha de excertos dos conteúdos, desde que:',
              list: [
                'seja indicada a fonte',
                'seja incluído o link para o artigo original',
                'não haja alteração do sentido do conteúdo'
              ],
              footer: '5.3. A reprodução total ou parcial para fins comerciais, sem autorização prévia, é proibida.'
            },
            {
              title: '6. Comentários e Interação (ove applicabile)',
              content: '6.1. Caso o site disponibilize áreas de comentário ou interação, o utilizador compromete-se a utilizar essas funcionalidades de forma responsável, respeitosa e legal.\n6.2. Não são permitidos comentários que:',
              list: [
                'sejam ofensivos, discriminatórios ou difamatórios',
                'contenham incitação ao ódio ou à violência',
                'violino os direitos de terceiros',
                'abbiano caráter promocional não autorizado'
              ],
              footer: '6.3. O responsável pelo site reserva-se o direito de moderar, editar ou remover comentários que violem estes Termos.'
            },
            {
              title: '7. Ligações para Sites de Terceiros',
              content: '7.1. O site pode conter ligações para sites externos.\n7.2. A SINGELO E CRISTALINO UNIPESSOAL LDA não é responsável pelo conteúdo, políticas ou práticas desses sites de terceiros.'
            },
            {
              title: '8. Responsabilidade',
              content: '8.1. L\'utente reconhece que a utilização do site é feita por sua conta e risco.\n8.2. O responsável pelo site não pode ser responsabilizado por danos resultantes da utilização ou impossibilidade de utilização do site, salvo nos casos legalmente previstos.'
            },
            {
              title: '9. Proteção de Dados Pessoais',
              content: 'O tratamento de dados pessoais efetuado no âmbito da utilização do site encontra-se regulado pela Privacy Policy, disponível no site.'
            },
            {
              title: '10. Alterações aos Termos de Utilização',
              content: 'I presenti Termini di Utilizzo podem ser alterados a qualquer momento.\nAs alterações serão publicadas no site www.roadpanda92.com e produziram efeitos a partir da data de sua publicação.'
            },
            {
              title: '11. Lei Aplicável',
              content: 'Os presentes Termos de Utilização são regidos pela lei portuguesa.'
            }
          ]
        }
      },
      components: {
        postGrid: {
          latest: 'Ultime',
          viewArchive: 'Vedi Archivio',
          readStory: 'Leggi Storia'
        },
        categories: {
          'encontros-3g': {
            title: 'Incontri 3G',
            description: 'La passione automobilistica tramandata di generazione in generazione. Storie di padri, figli e i classici che li uniscono.'
          },
          'historias-iconicas': {
            title: 'Storie Iconiche',
            description: 'Racconti affascinanti sul mundo dell\'automobile, momentos históricos e figuras singulares que hanno plasmato l\'industria.'
          },
          'maquinas-intemporais': {
            title: 'Macchine Senza Tempo',
            description: 'Auto che hanno resistito alla prova del tempo e continuam a marcar presença no imaginário de mais gerações. Ogni modelo è apresentado não apenas como macchina, mas como símbolo de uma época. Uma coleção de automobili che não sono mai uscite veramente di scena.'
          },
          'viagem-atlantica': {
            title: 'Viaggio Atlantico',
            description: 'As últimas novidades, tendências e desenvolvimentos no mundo dell\'automobile com uno sguardo attento de ambos os lados do Atlântico.'
          },
          'copiloto': {
            title: 'Copilota',
            description: 'Conselhos práticos, guias e sugestões valiosas para melhorar a sua experiência de guia e cuidar melhor da sua auto ao melhor.'
          },
          'videos': {
            title: 'Video',
            description: 'Guarda i nossos últimos reportagens vídeo, ensaios e documentários sobre a cultura automobilística.'
          }
        },
        infiniteFeed: {
          latestStories: 'Ultime Storie',
          viewAll: 'Vedi Tutto',
          loadingTrack: 'Caricamento pista...',
          endOfRoad: 'Fim do percurso. Não ci sono mais artigos por carregar.'
        }
      }
    }
  }
];

langs.forEach(l => {
  if (!fs.existsSync('./dictionaries')) {
    fs.mkdirSync('./dictionaries');
  }
  fs.writeFileSync(
    `./dictionaries/${l.code}.json`, 
    JSON.stringify(l.dict, null, 2)
  );
});
console.log('Dictionaries synced with JSON files!');
