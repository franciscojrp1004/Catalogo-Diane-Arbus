export interface CatalogPageData {
    id: number;
    image: string;
    title: string;
    description: string;
}

// ✨ LISTA MESTRA DE CONTEÚDO ✨
// Título, Descrição e Imagem (Imgur) para todas as páginas.
// A ordem aqui define o ID (1 a 37).
interface PageContent {
    title: string;
    description: string;
    image: string;
}

const pageContent: PageContent[] = [
    // 1. Diane Arbus (Capa) - 0.png
    {
        title: "Diane Arbus",
        description: "",
        image: "https://i.imgur.com/W2DxUxM.png"
    },
    // 2. Arbus em 1971 - 1.png
    {
        title: "Arbus em 1971, ano da sua morte. c Eva Rubinstein",
        description: `Ao contrário da maioria das pessoas, que "passam a vida a temer ter uma experiência traumática", os "anormais" que interessavam a Diane Arbus "nasceram com o seu trauma. Já passaram o seu teste na vida. São aristocratas". Embora fosse assim que Arbus explicava a sua atração pelos artistas do parque de diversões, podemos imaginá-la a usar uma linguagem semelhante para descrever pessoas de estatura invulgarmente grande ou pequena, nudistas, pessoas com deficiências de desenvolvimento, transformistas e muitos outros que aparecem regularmente nos seus retratos.

        Normalmente, Arbus dava aos seus retratados a oportunidade de se apresentarem como bem entendessem. A partir de 1962, ela utilizou câmaras de médio formato que eram seguras à cintura - olhava para baixo para o visor, de modo a que nada se interpusesse entre o seu rosto e o do sujeito. A intimidade deste tipo de encontro fotográfico poderia inspirar a confiança e a autoconfiança que vemos em figuras como na postura de Naked Man Being a Woman, New York City (1968) ou Burlesque Comedienne in Her Dressing Room, Atlantic City, New Jersey (1963). Noutras ocasiões, Arbus parece revelar uma precariedade escondida sob a superfície da vida na corrente cultural dominante. As suas imagens daqueles que detêm poder social ou que simplesmente parecem ser seguros, como o patriótico Boy with a Straw Hat Waiting to March in a Pro-War Parade, New York City (1967), são muitas vezes subtilmente inquietantes.`,
        image: "https://i.imgur.com/jCNZnsN.png"
    },
    // 3. Comediante - 2.png
    {
        title: "Comediante do Burlesco no Seu Camarim, Atlantic City, NJ, 1963",
        description: `O interesse de Arbus pelas experiências de pessoas de todo o espetro social pode ter emergido da sua própria infância. Cresceu no seio de uma família abastada e sentiu-se protegida dos efeitos da Grande Depressão. Esta experiência de privilégio era angustiante: "era como ser uma princesa num filme repugnante... e o reino era tão humilhante".2 Talvez porque Arbus acreditava que não tinha sido suficientemente testada pela adversidade, procurou-a no mundo que a rodeava. Este investimento pessoal no tema escolhido, contudo, não levou Arbus a editorializar ou a fazer juízos de valor. Normalmente, evitava cortar as suas fotografias para dar ênfase e, em vez disso, imprimia o negativo completo, uma escolha registada por margens pretas irregulares que rodeavam a imagem. "Para mim, o objeto da fotografia é sempre mais importante do que a fotografia", afirmou. "E mais complicado.`,
        image: "https://i.imgur.com/ONmtrYI.png"
    },
    // 4. Homem Nu - 3.png
    {
        title: "Um Homem Nú a Ser uma Mulher, N.Y.C., 1968",
        description: `Uma das pedras de toque na criatividade de Arbus foi August Sander, que produziu centenas de retratos fotográficos documentando os cidadãos — e a estrutura social — da Alemanha de Weimar. Arbus inspirou-se na linguagem visual das imagens francas e cuidadosamente compostas de Sander, cujos sujeitos habitam com força o seu lugar na sociedade. Sander realçava frequentemente algum sinal da vocação do retratado, como os materiais de um pedreiro ou a roda de um oleiro, sugerindo que a identidade é um facto social que pode ser evidenciado pela auto-apresentação de um indivíduo. As fotografias de Arbus parecem mais ambíguas e são extraordinariamente sensíveis àquilo a que ela chamou "o fosso entre intenção e efeito": a distinção entre o que tentamos comunicar sobre nós próprios e o que é percepcionado pelos outros.`,
        image: "https://i.imgur.com/iCVWvEq.png"
    },
    // 5. Rapaz com Chapéu - 4.png
    {
        title: "Rapaz com um Chapéu de Palha à Espera de Desfilar numa Marcha Pró-guerra, N.Y.C., 1967",
        description: `Embora Arbus fosse cética em relação aos elogios populares e se sentisse ambivalente em relação à exposição do seu trabalho, acabou por ocupar uma posição central no mundo da arte no final da década de 1960. Isto deveu-se em parte ao apoio de John Szarkowski, na altura diretor do Departamento de Fotografia do MoMA, que a apresentou juntamente com Lee Friedlander e Garry Winogrand na influente exposição New Documents de 1967. A descrição que Szarkowski faz do conteúdo da exposição pode servir para descrever o projeto de Arbus em particular: "uma nova geração de fotógrafos redireccionou a abordagem documental para fins mais pessoais.... O seu trabalho revela uma simpatia — quase um afeto — pelas imperfeições e fragilidades da sociedade. Gostam do mundo real, apesar dos seus terrores, como a fonte de toda a maravilha, fascínio e valor".`,
        image: "https://i.imgur.com/B0tvwPq.png"
    },
    // 6. Gémeos - 5.png
    {
        title: "Gémeos Idênticos, Roselle, NJ, 1967",
        description: `Em 1971, Arbus suicidou-se. As suas fotografias, no entanto, continuam a exercer uma influência poderosa. Durante décadas, artistas como Nan Goldin, Judith Joy Ross e Deana Lawson foram alimentados pela atração inquieta de Arbus pelo desconhecido e pela sua recusa em oferecer julgamentos ou respostas fáceis. Como a própria Arbus afirmou, "Uma fotografia é um segredo sobre um segredo. Quanto mais ela nos diz, menos sabemos".`,
        image: "https://i.imgur.com/NcTlK4k.png"
    },
    // 7. Criança com Granada - 6.png
    {
        title: "Criança com um Brinquedo Granada de Mão no Central Park, N.Y.C., 1962",
        description: `Nascida em 1923, Diane Arbus era conhecida como Diane Nemerov, tendo sido criada em Nova Iorque no seio de uma família judia abastada. Desde cedo, Arbus dedicou-se às artes e raramente passava tempo com o lado paterno da família. Como uma criança que cresceu rodeada de riqueza e sucesso, Arbus recordou mais tarde a sua educação, que identificou como tendo desenvolvido um sentido de irrealidade, que era tudo o que conseguia sentir. Arbus descreveu uma vez a sua carreira como a sua busca contínua de tudo o que é real, e isso é evidente na sua exploração da identidade e na fotografia de figuras da sociedade consideradas "tabu".`,
        image: "https://i.imgur.com/bxDPXp6.png"
    },
    // 8. Homem Jovem - 7.png
    {
        title: "Homem Jovem com Rolos de Cabelo em Casa na West 20th Street, N.Y.C., 1966",
        description: `A sua família era proprietária de uma cadeia de lojas e o seu futuro marido, Allan Arbus, trabalhava no departamento de arte. Os dois conheceram-se quando Allan tinha 19 anos e quando Diane fez 18 anos, casou com ele.`,
        image: "https://i.imgur.com/hNiTl47.png"
    },
    // 9. Gigante Judeu - 8.png
    {
        title: "Gigante Judeu em Casa com os Seus Pais no Bronx, N.Y.C., 1970",
        description: `Produtos de luxo criados para quem aprecia o refinamento. Qualidade premium e exclusividade em cada item da nossa coleção especial.`,
        image: "https://i.imgur.com/SP4Uj8g.png"
    },
    // 10. Anão Mexicano - 9.png
    {
        title: "Anão Mexicano no Seu Quarto de Hotel, N.Y.C., 1970",
        description: `Os dois estiveram casados durante cerca de 19 anos e tiveram dois filhos juntos, após esse período se separaram e divorciaram para perseguir os seus próprios interesses. Allan continuou a apoiar Diane no departamento de fotografia e emocionalmente, até à sua morte. Diane cresceu com irmãos, um dos quais, Howard Nemerov, que mais tarde se tornou vencedor do Prémio Pulitzer e poeta laureado dos EUA. A irmã de Diane, Renée Sparkia, também se dedicou à arte e tornou-se designer e escultora, enquanto o pai, David Nemerov, se tornou pintor após a sua reforma.`,
        image: "https://i.imgur.com/EofCspI.png"
    },
    // 11 (User item 09) - 10.png
    {
        title: "Sem Título (6), 1970-71",
        description: "",
        image: "https://i.imgur.com/9KUKI6p.png"
    },
    // 12 (User item 10) - 11.png
    {
        title: "Jack Dracula num Bar, New London, Conn., 1961",
        description: `Diane Arbus foi encorajada pelo pai a dedicar-se à pintura, uma vez que o pai via talento para a literatura e para a arte, desde muito cedo na infância de Diane. Arbus estudou arte no liceu e, mais tarde, renunciou às suas ambições de ir para a faculdade e de se dedicar à arte, uma vez que queria desesperadamente casar com Allen. Mais tarde, Arbus contou que desprezava a pintura porque estava sempre a ser elogiada pelo seu trabalho, e foi a atenção que a levou a concluir que não valia a pena prosseguir.`,
        image: "https://i.imgur.com/20KwYp8.png"
    },
    // 13 - 12.png
    {
        title: "Mulher com Máscara de Pássaro, N.Y.C., 1967",
        description: "",
        image: "https://i.imgur.com/jKUvBdT.png"
    },
    // 14 - 13.png
    {
        title: "Homem e um Rapaz num Banco do Central Park, N.Y.C., 1962",
        description: `Os recém-casados visitaram a galeria de Alfred Stieglitz em 1941, onde Diane foi exposta às obras de Paul Strand, Eugène Atget e Mathew Brady, o que inspirou os dois a fundarem mais tarde o seu próprio estúdio de fotografia comercial. Durante a Segunda Guerra Mundial, Allan assumiu um papel de fotógrafo militar enquanto Diane estava grávida da sua filha, Doon. O estúdio de Arbus contribuiu para campanhas de revistas de moda como a Harper's Bazaar e a Vogue, e até converteram a casa de banho do seu apartamento em Manhattan numa sala escura. Durante os 10 anos seguintes o casal dirigiu o seu empreendimento comercial com Allan atrás da câmara e Diane atrás do brainstorming, dos adereços e da concetualização.`,
        image: "https://i.imgur.com/530g2NG.png"
    },
    // 15 - 14.png
    {
        title: "Mulher Porto-Riquenha com uma Marca de Beleza, N.Y.C., 1965",
        description: `Em 1954, Diane deu à luz a sua segunda filha, Amy, e na década de 1950 estava completamente esgotada pela sua carreira comercial.`,
        image: "https://i.imgur.com/9FwI253.png"
    },
    // 16 - 15.png
    {
        title: "Rapariga com Capuz Pontiagudo e Mochila Escolar Branca no Passeio, N.Y.C., 1957",
        description: `O casal estava exausto com as exigências, o stress e as limitações da produção de imagens estritamente para a moda, o que afectou o seu casamento. Diane desejava seguir a sua carreira de artista, enquanto Allan ansiava por uma carreira de ator. Durante este período Diane sofreu de vários episódios depressivos e, em 1956, Diane deixou o seu emprego na fotografia comercial enquanto Allan continuou a dirigir o estúdio Diane & Allan Arbus e a seguir a sua carreira no teatro.`,
        image: "https://i.imgur.com/axScfi9.png"
    },
    // 17 - 16.png
    {
        title: "Stripper Blaze Star, 1964",
        description: `Foi então que Diane Arbus saiu para as ruas de Nova Iorque com a sua câmara para fotografar tudo o que via. As suas fotografias foram mais tarde expostas no Museu de Arte Moderna em 1967.`,
        image: "https://i.imgur.com/yuUsecA.png"
    },
    // 18 - 17.png
    {
        title: "Homem Reformado e a sua Mulher em Casa, uma Manhã num Campo de Nudismo, N.J., 1963",
        description: `Em 1959, Arbus recebeu o seu primeiro trabalho para a revista Esquire, que incluía retratos de um artista de espetáculo conhecido como Jungle Creep, de um cadáver desconhecido, de uma socialite e de um excêntrico de Skid Row, o que englobava um ensaio fotográfico sobre a cidade de Nova Iorque. Entre as décadas de 1950 e 1960, Arbus utilizou uma câmara de 35 milímetros e baseou-se na iluminação natural para fotografar a preto e branco as suas imagens de rua. Influenciada pelos fotógrafos de rua populares da sua época, Arbus também se sentia atraída por efeitos visuais como texturas granuladas e imagens desfocadas que perturbavam a estética visual dominante da fotografia. A fotografia de Arbus ganhou popularidade entre os editores de revistas, especialmente após a publicação do seu primeiro ensaio fotográfico. Desde então, Arbus publicou mais de 250 imagens em mais de uma dúzia de revistas diferentes. Também fotografou de forma recreativa e coleccionou muitas fotografias publicadas, que foram encomendadas mas não escolhidas.`,
        image: "https://i.imgur.com/vHpogOc.png"
    },
    // 19 - 18.png
    {
        title: "Uma Família no seu Relvado a um Domingo em Westchester, NY, 1968",
        description: "",
        image: "https://i.imgur.com/wbFjMxK.png"
    },
    // 20 - 19.png
    {
        title: "O Rei e a Rainha de um Baile de Idosos, N.Y.C., 1970",
        description: `Arbus também trabalhou em muitas encomendas privadas para celebridades e famílias em Manhattan, tendo fotografado algumas das suas melhores peças em 1970. Foi durante este período que Arbus começou a obter um reconhecimento significativo do sector das belas-artes pelo seu trabalho jornalístico, que mostrava o seu estilo como mais uma artista do que uma simples fotógrafa de revista. Na sua primeira exposição no MoMa, em 1967, o trabalho de Arbus atraiu mais atenção do que os trabalhos de Garry Winogrand e Lee Friedlander e foi considerado pela revista New York como "ousado e revelador", para além de demonstrar uma "visão generosa e cristalina de um poeta" (Newsweek). Muitas publicações sobre Arbus e o seu trabalho foram criadas a título póstumo, a primeira em 1972 com o nome Aperture e mais tarde em 2003 com o lançamento de Diane Arbus Revelations.`,
        image: "https://i.imgur.com/UkIJJ32.png"
    },
    // 21 - 20.png
    {
        title: "A Debutante do Ano de 1938 em Casa, Boston, Massachusetts, 1966",
        description: "",
        image: "https://i.imgur.com/AEbJgQF.png"
    },
    // 22 - 21.png
    {
        title: "Amigos Anões Russos numa Sala de Estar na 100th St., N.Y.C., 1963",
        description: "",
        image: "https://i.imgur.com/cLIKeOK.png"
    },
    // 23 - 22.png
    {
        title: "Engolidor de Espadas Albino num Parque de Diversões, Maryland, 1970",
        description: "",
        image: "https://i.imgur.com/KHH5hE9.png"
    },
    // 24 - 23.png
    {
        title: "Homem Tatuado num Parque de Diversões, Maryland, 1970",
        description: `O estilo fotográfico de Diane Arbus era conhecido por ser ousado, arriscado e profundo. O seu trabalho mostrava a vida das personalidades da cidade de Nova Iorque, enquanto explorava as temáticas relacionadas com o estatuto social, a identidade, a liberdade sexual e o dinheiro. As suas fotografias apresentavam um elemento de procura de emoção, que foi descrito por Arbus como um ato que considerava "maroto". Arbus considerava a sua prática "perversa" devido aos modelos e personalidades que captava. Arbus expandiu a sua prática fotografando cenas de salões de dança, museus de cera e espaços de habitação altamente carenciados, o que a motivou e fez com que procurasse ir a sítios onde nunca tinha estado.`,
        image: "https://i.imgur.com/IeaQB0r.png"
    },
    // 25 - 24.png
    {
        title: "Mia Villiers-Farrow numa Cama, 1964",
        description: `Uma influência fundamental no estilo de Arbus foi o fotógrafo August Sander, cujo trabalho de retrato e identidade captou as estruturas sociais de Weimar, na Alemanha.`,
        image: "https://i.imgur.com/gwveNjB.png"
    },
    // 26 - 25.png
    {
        title: "Três Imitadores de Mulher, N.Y.C., 1962",
        description: `Arbus estudou a sua linguagem visual e a abordagem à composição, o que contribuiu para as suas concepções de identidade como facto social e o impacto da auto-apresentação. A sua fotografia assumiu uma natureza ambígua e foi sensível ao espaço entre a intenção e o efeito. A fotografia de Arbus era visualmente comunicativa e deixava os espectadores a refletir sobre a noção de perceção e a forma como as pessoas tentam comunicar através das suas identidades visuais.`,
        image: "https://i.imgur.com/qnFs4PQ.png"
    },
    // 27 - 26.png
    {
        title: "Sem Título (22), 1970-71",
        description: `Arbus estudou com Lisette Model em 1958, depois de ter abandonado um workshop dirigido por Alexey Brodovitch. Model tornou-se a amiga e mentora mais próxima de Arbus, ajudando-a a desenvolver o seu objeto de estudo e a compreender o "proibido" que Arbus explorava frequentemente no seu trabalho. Em 1959 Arbus foi também orientada por Marvin Israel, que se tornou uma grande inspiração para a sua prática. Israel incentivou Arbus a desenvolver as suas ideias e aconselhou-a sobre as imagens com mais impacto que ajudaram a definir a sua carreira. Israel também promoveu a fotografia de Arbus através da revista Harper's Bazaar na década de 1960.`,
        image: "https://i.imgur.com/6Jq8PwS.png"
    },
    // 28 - 27.png
    {
        title: "Mulher Mascarada numa Cadeira de Rodas, Pensilvânia, 1970",
        description: `Arbus afirmava frequentemente que possuía um medo que era inerente à sua carreira fotográfica como artista e à atenção que esta atraía, tanto na sequência da publicação e elogio do seu trabalho, como no seu processo. Descreveu a fotografia como uma aventura, que era movida pelo medo, o que foi mais tarde referido pela sua biógrafa Patricia Bosworth, que afirmou que o medo era o que a fazia sentir e que destruía a sua depressão. A fotografia ajudou Arbus a vencer os seus medos, um a um, e a desenvolver a coragem que não tinha aprendido na sua infância. Guiada tanto pelo medo como pela curiosidade, Arbus viu-se na companhia das pessoas que fotografou no Hubert's Freak Museum, em clubes noturnos gay e em Coney Island.`,
        image: "https://i.imgur.com/AFJQ8pX.png"
    },
    // 29 - 28.png
    {
        title: "Mulher com Véu na 5ª Avenida, N.Y.C., 1968",
        description: `Encarava a sua prática como uma forma contemporânea de antropologia, o que era certamente um pensamento muito avançado para a sua prática artística na altura.`,
        image: "https://i.imgur.com/3i9akpW.png"
    },
    // 30 - 29.png
    {
        title: "Mulher na Rua com os Olhos Fechados, N.Y.C., 1956",
        description: `Esta mudança de pensamento e a atração gradual por aquilo que temia impulsionaram a sua prática, e Arbus tornou-se mais hábil nas suas técnicas de construção de relações. Arbus utilizava a sua curiosidade para aprender com os seus modelos, que a descreviam como igualmente fascinante, com a capacidade de hipnotizar as pessoas para as confortar. Os interesses de Arbus em filosofia, mitologia e religião também alimentaram as suas relações e ligações com pessoas de todos os cantos da cidade, que expressavam pontos de vista muito diferentes do seu mundo interior. Em 1962, Arbus afastou-se das texturas granuladas e ficou obcecada com a procura de clareza nas suas imagens através de detalhes brilhantes.`,
        image: "https://i.imgur.com/fKVDqGB.png"
    },
    // 31 - 30.png
    {
        title: "Duas Raparigas em Fatos de Banho a Condizer, Coney Island, NY, 1971",
        description: "",
        image: "https://i.imgur.com/O8ltfV3.png"
    },
    // 32 - 31.png
    {
        title: "Trigémeos no seu Quarto, N.J., 1963",
        description: "",
        image: "https://i.imgur.com/4gSCLeK.png"
    },
    // 33 - 32.png
    {
        title: "Senhora num Autocarro, N.Y.C., 1957",
        description: "",
        image: "https://i.imgur.com/Kjc1Zuh.png"
    },
    // 34 - 33.png
    {
        title: "Motorista de Táxi ao Volante com Dois Passageiros, N.Y.C., 1956",
        description: `Diane Arbus sofria de depressão intensa, à qual, infelizmente, sucumbiu a 26 de julho de 1971, quando se suicidou. Arbus foi encontrada no seu apartamento por Marvin Israel com as palavras "última ceia" escritas no seu diário para essa data. No mesmo ano foi selecionada para representar os Estados Unidos na Bienal de Veneza em 1972, sendo a primeira fotógrafa americana a ser homenageada na Bienal.`,
        image: "https://i.imgur.com/I3cbecn.png"
    },
    // 35 - 34.png
    {
        title: "Homem de Chapéu, Calções, Meias e Sapatos, Coney Island, NY,1960",
        description: `Um ano após a sua morte, o trabalho de Arbus foi incluído numa grande retrospetiva no Museu de Arte Moderna que esteve em digressão pelos Estados Unidos e Canadá até 1975. A sua exposição inaugural em Nova Iorque atraiu multidões que admiravam os elementos formais do seu trabalho e a demonstração de humanidade. As suas imagens também foram objeto de críticas mistas por parte de alguns que consideravam o seu trabalho anti-humanista, como se pode ver nas críticas de Susan Sontag aos seus temas, que ela considerava "repulsivos".`,
        image: "https://i.imgur.com/pr7RqiN.png"
    },
    // 36 - 35.png
    {
        title: "Mulher com Luvas Brancas e um Livro de Bolso, N.Y.C., 1956",
        description: `O Metropolitan Museum of Art adquiriu a coleção de Diane Arbus ao património de Diane Arbus em 2007, que incluía folhas de contacto únicas, negativos, documentos pessoais e mais de 7.500 rolos de filme. Uma retrospetiva europeia da fotografia de Arbus foi exibida no Jeu de Paume, em Paris, em 2011, e em 2016, o Met Breuer realizou uma exposição histórica do seu trabalho, que incluía fotografias nunca antes vistas do início da sua carreira.`,
        image: "https://i.imgur.com/Zc52v8k.png"
    },
    // 37 - 36.png
    {
        title: "Miúdo com Casaco com Capuz Apontando uma Arma, N.Y.C., 1957",
        description: `Em 2018, o Smithsonian American Art Museum também organizou uma exposição intitulada Diane Arbus: A Box of ten photographs, que mostrava os aspectos fundamentais do legado póstumo de Arbus. Atualmente, as fotografias de Diane Arbus estão armazenadas em muitas colecções na América, Canadá e Europa, incluindo o Moderna Museet, o Centre Pompidou, a Tate Gallery e o Whitney Museum of American Art. Em 2006, Diane Arbus foi também a inspiração para o filme Fur, que teve Nicole Kidman no papel de Diane Arbus.`,
        image: "https://i.imgur.com/ewwIp1f.png"
    }
];

// O SISTEMA AUTOMÁTICO 🤖
export const catalogPages: CatalogPageData[] = pageContent.map((content, index) => ({
    id: index + 1,
    image: content.image,
    title: content.title,
    description: content.description
}));
