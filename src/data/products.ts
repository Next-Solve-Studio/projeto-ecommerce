export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discountPercentage?: number;
  salesCount: number;
  rating: number;
  description: string;
  category: string;
  images: string[];
  variants?: {
    type: string;
    options: string[];
  }[];
  featured?: boolean;
  tags?: string[];
}

export const categories = [
  "Smartphones",
  "Notebooks",
  "Tablets",
  "Acessórios",
  "Smartwatches",
  "Fones de Ouvido",
  "Setup Gamer",
];

export const products: Product[] = [
  // Setup Gamer
  {
    id: "g1",
    name: "Cadeira Gamer ThunderX3",
    price: 1299.0,
    oldPrice: 1599.0,
    discountPercentage: 18,
    salesCount: 750,
    rating: 4.8,
    description: `Cadeira Gamer ThunderX3 Profissional Ergonômica Reclinável
Potencialize seu setup com a Cadeira Gamer ThunderX3, a solução de próxima geração para gamers e usuários que buscam conforto e eficiência. Com ergonomia avançada e suporte de peso robusto, este produto é a escolha ideal para um desempenho ágil em jogos e multitarefas.

Conforto Otimizado com Arquitetura Premium
Experimente uma postura fluida e responsiva. A ThunderX3 possui uma arquitetura de alto desempenho que combina espuma de alta densidade e pistões resistentes para otimizar o peso. A construção firme garante a estabilidade necessária para os momentos mais exigentes, enquanto o couro sintético proporciona durabilidade.

Características:

- Marca: ThunderX3
- Modelo: TGC12

Especificações:

- Coleção de produtos: Cadeiras Gamer e Escritório
- Material principal: Couro sintético
- Espuma: Alta densidade
- Peso máximo suportado: 150 kg
- Ajustes: Encosto reclinável e braços ajustáveis`,
    category: "Setup Gamer",
    images: [
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800",
    ],
    tags: ["gamer", "populares"],
  },
  {
    id: "g2",
    name: "Teclado Mecânico HyperX",
    price: 599.0,
    salesCount: 15,
    rating: 3.2,
    description: `Teclado Mecânico HyperX Alloy Origins RGB Switches Red
Potencialize sua digitação com o Teclado Mecânico HyperX, a solução de próxima geração para gamers que buscam desempenho e precisão. Com switches mecânicos vermelhos e iluminação RGB vibrante, este teclado é a escolha ideal para um desempenho ágil em jogos competitivos.

Desempenho Otimizado com Resposta Tátil
Experimente uma performance fluida e responsiva. O Teclado HyperX possui uma arquitetura de alta resistência com corpo em alumínio aeronáutico que otimiza a durabilidade durante o uso intenso. A taxa de resposta superior garante a velocidade necessária para os momentos críticos, proporcionando acesso rápido a cada comando.

Características:

- Marca: HyperX
- Modelo: Alloy Origins

Especificações:

- Coleção de produtos: Periféricos Gamer
- Tipo de Teclado: Mecânico
- Switch: HyperX Red (Linear)
- Iluminação: RGB com efeitos dinâmicos
- Conexão: Cabo USB-C removível`,
    category: "Setup Gamer",
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800",
    ],
    tags: ["gamer"],
  },
  {
    id: "g3",
    name: "Mouse Gamer Razer DeathAdder",
    price: 349.0,
    oldPrice: 449.0,
    discountPercentage: 22,
    salesCount: 45,
    rating: 3.5,
    description: `Mouse Gamer Razer DeathAdder V2 Óptico 20K DPI
Potencialize seu rastreio com o Mouse Gamer Razer DeathAdder, a solução avançada para entusiastas que buscam desempenho absoluto. Com um sensor óptico de 20.000 DPI e switches ópticos imbatíveis, este mouse é a escolha ideal para um desempenho rápido e cliques cirúrgicos.

Desempenho Otimizado com Arquitetura Ergonômica
Experimente uma jogabilidade fluida e responsiva. O DeathAdder possui uma estrutura super leve e ergonômica que combina cliques táteis e deslizamento perfeito para otimizar sua mira. A tecnologia Razer Focus+ garante a precisão necessária para os momentos mais exigentes de eSports.

Características:

- Marca: Razer
- Modelo: DeathAdder V2

Especificações:

- Coleção de produtos: Mouses Competitivos
- Sensor: Óptico Razer Focus+
- Resolução Máxima: 20.000 DPI
- Switch: Óptico Razer
- Conectividade: Cabo Razer Speedflex`,
    category: "Setup Gamer",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/f/fe/1426-razer-deathadder-essential-raton-gaming-6400-dpi-negro.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20230607122556",
    ],
    tags: ["gamer", "ofertas"],
  },
  {
    id: "g4",
    name: 'Monitor Ultrawide 34" LG',
    price: 2499.0,
    salesCount: 120,
    rating: 3.8,
    description: `Monitor Gamer LG Ultrawide 34 Polegadas 144Hz 1ms IPS
Potencialize sua visão de jogo com o Monitor Ultrawide 34" LG, a solução imersiva para gamers e criadores de conteúdo que buscam campo de visão superior. Com tela IPS de alta fidelidade e taxa de atualização de 144Hz, este monitor é a escolha ideal para um desempenho ágil sem screen tearing.

Imagens Otimizadas com Arquitetura Ultrawide
Experimente imagens fluidas e cores vibrantes. O Monitor LG possui uma taxa de resposta de 1ms combinada com HDR10 para otimizar os detalhes escuros e claros. A proporção 21:9 garante o espaço extra de tela necessário para enxergar inimigos antes, enquanto os painéis IPS proporcionam precisão de cor de qualquer ângulo.

Características:

- Marca: LG
- Modelo: 34WP65C-B

Especificações:

- Coleção de produtos: Monitores Ultrawide Gamer
- Tamanho da Tela: 34 polegadas
- Tipo de Painel: IPS
- Taxa de Atualização: 144Hz
- Tempo de Resposta: 1ms (MBR)`,
    category: "Setup Gamer",
    images: [
      "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=800",
    ],
    tags: ["gamer", "populares"],
  },
  {
    id: "g5",
    name: "Headset Gamer Logitech G Pro",
    price: 799.0,
    oldPrice: 999.0,
    discountPercentage: 20,
    salesCount: 342,
    rating: 4.1,
    description: `Headset Gamer Logitech G Pro X 7.1 Surround Blue VO!CE
Potencialize sua comunicação e áudio com o Headset Gamer Logitech G Pro, a solução premium para quem busca desempenho acústico de nível profissional. Com drivers de 50mm e microfone com tecnologia Blue VO!CE, este headset é a escolha ideal para identificar cada passo no campo de batalha.

Áudio Otimizado com Isolamento e Conforto
Experimente uma qualidade sonora cristalina. O G Pro X possui uma arquitetura de áudio avançada que combina som surround 7.1 de última geração para otimizar sua noção espacial. As almofadas de memory foam garantem o isolamento necessário para os momentos mais tensos, enquanto a estrutura em aço proporciona durabilidade impecável.

Características:

- Marca: Logitech G
- Modelo: Pro X

Especificações:

- Coleção de produtos: Headsets Profissionais
- Áudio: Surround 7.1 com DTS Headphone:X 2.0
- Microfone: Removível com Blue VO!CE
- Transdutores: PRO-G 50 mm
- Material: Alumínio e Aço`,
    category: "Setup Gamer",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800",
    ],
    tags: ["gamer", "ofertas"],
  },
  {
    id: "g6",
    name: "Gabinete NZXT H510",
    price: 649.0,
    salesCount: 0,
    rating: 0.0,
    description: `Gabinete Gamer NZXT H510 Mid-Tower Vidro Temperado
Potencialize a estética e resfriamento do seu PC com o Gabinete NZXT H510, a solução elegante para gamers que buscam montagem limpa e excelente fluxo de ar. Com lateral em vidro temperado e design minimalista, este gabinete é a escolha ideal para exibir seus componentes com orgulho.

Espaço Otimizado com Gerenciamento de Cabos
Experimente uma montagem inteligente e organizada. O H510 possui uma barra de gerenciamento de cabos patenteada que facilita a organização e o roteamento interno. O painel I/O frontal moderno com USB-C garante a conectividade necessária para periféricos de última geração, mantendo a refrigeração sempre em alta.

Características:

- Marca: NZXT
- Modelo: H510

Especificações:

- Coleção de produtos: Gabinetes Mid-Tower
- Material: Aço SGCC e Vidro Temperado
- Suporte a Placa-mãe: Mini-ITX, MicroATX, ATX
- Portas frontais: USB 3.1 Tipo-C e USB 3.1 Tipo-A
- Filtros de Poeira: Em todas as entradas`,
    category: "Setup Gamer",
    images: [
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800",
    ],
    tags: ["gamer"],
  },
  {
    id: "g7",
    name: "Placa de Vídeo RTX 4070",
    price: 4599.0,
    oldPrice: 5199.0,
    discountPercentage: 11,
    salesCount: 46,
    rating: 5.0,
    description: `Placa de Vídeo NVIDIA GeForce RTX 4070 12GB GDDR6X
Potencialize seu PC com a Placa de Vídeo RTX 4070, a solução de próxima geração para entusiastas que buscam gráficos ultrarrealistas. Com 12GB de VRAM GDDR6X e tecnologias como Ray Tracing e DLSS 3, este componente é a escolha ideal para jogar em resolução 1440p com taxas de quadros absurdamente altas.

Desempenho Otimizado com Arquitetura Ada Lovelace
Experimente um salto geracional massivo em eficiência de energia. A RTX 4070 possui a arquitetura NVIDIA Ada Lovelace que combina multiprocessadores de streaming e Tensor Cores de 4ª geração para otimizar sua taxa de frames. O sistema de resfriamento triplo garante as temperaturas ideais necessárias para sessões intensas, enquanto a tecnologia Reflex impulsiona a resposta do sistema.

Características:

- Marca: NVIDIA / Parceiros (Asus, Gigabyte, MSI)
- Modelo: GeForce RTX 4070

Especificações:

- Coleção de produtos: GPUs Série RTX 40
- Memória VRAM: 12GB GDDR6X
- Barramento: 192-bit
- Núcleos CUDA: 5888
- Tecnologias Extras: Ray Tracing, DLSS 3 e NVIDIA Reflex`,
    category: "Setup Gamer",
    images: [
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800",
    ],
    tags: ["gamer", "ofertas"],
  },
  {
    id: "g8",
    name: "Microfone HyperX QuadCast",
    price: 899.0,
    salesCount: 890,
    rating: 4.4,
    description: `Microfone Condensador HyperX QuadCast USB com Iluminação Vermelha
Potencialize suas streams e gravações com o Microfone HyperX QuadCast, a solução profissional para criadores de conteúdo que buscam captação de voz cristalina. Com quatro padrões polares selecionáveis e base shock mount antivibração inclusa, este microfone é a escolha ideal para podcasts, narrações e jogos.

Qualidade de Voz Otimizada com Sensor Tap-to-Mute
Experimente uma transmissão livre de ruídos indesejados. O QuadCast possui um filtro pop interno para atenuar sons percussivos e um prático sensor de toque para silenciar o áudio instantaneamente. O controle de ganho acessível garante o ajuste de sensibilidade necessário para os momentos exatos da sua fala.

Características:

- Marca: HyperX
- Modelo: QuadCast

Especificações:

- Coleção de produtos: Áudio e Streaming
- Tipo de Microfone: Condensador USB
- Padrões Polares: Estéreo, Omnidirecional, Cardioide, Bidirecional
- Extras: Base Antivibração e Pop Filter interno
- Resposta de frequência: 20Hz a 20kHz`,
    category: "Setup Gamer",
    images: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800",
    ],
    tags: ["gamer", "populares"],
  },

  // Ofertas & Populares
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 8499.0,
    oldPrice: 9499.0,
    discountPercentage: 10,
    salesCount: 134,
    rating: 4.9,
    description: `Smartphone Apple iPhone 15 Pro Max 256GB Titânio
Potencialize sua vida digital com o iPhone 15 Pro Max, o smartphone de próxima geração para usuários que buscam desempenho de ponta e inovação fotográfica. Com uma construção premium em titânio e o revolucionário processador A17 Pro, este celular é a escolha ideal para captura de vídeos cinematográficos e jogos de alto nível portátil.

Desempenho Otimizado com Câmera Periscópio
Experimente uma interface absurdamente fluida e uma capacidade de zoom sem precedentes. O iPhone 15 Pro Max possui um sistema de câmera tripla de 48MP com zoom óptico de 5x para otimizar suas capturas à distância. O botão de Ação customizável garante a versatilidade necessária para atalhos diários, enquanto a entrada USB-C proporciona transferências de dados até 20x mais rápidas.

Características:

- Marca: Apple
- Modelo: iPhone 15 Pro Max

Especificações:

- Coleção de produtos: Smartphones Premium (iOS)
- Tela: 6,7 polegadas Super Retina XDR OLED 120Hz
- Processador: Chip A17 Pro
- Câmera Traseira: 48MP (Principal) + 12MP (Ultrawide) + 12MP (Telefoto 5x)
- Material: Titânio grau aeroespacial`,
    category: "Smartphones",
    images: ["https://m.media-amazon.com/images/I/416MG51rNgL._AC_SX679_.jpg"],
    tags: ["ofertas", "populares"],
  },
  {
    id: "2",
    name: 'MacBook Pro 16" M3 Max',
    price: 25999.0,
    salesCount: 1500,
    rating: 5.0,
    description: `Notebook Apple MacBook Pro 16" Chip M3 Max 36GB RAM 1TB SSD
Potencialize seu fluxo de trabalho criativo com o MacBook Pro 16", a estação de trabalho móvel definitiva para profissionais exigentes. Com o monumental chip M3 Max, que integra CPU de 14 núcleos e GPU de 30 núcleos, este notebook é a escolha ideal para renderização de vídeos pesados e simulações complexas.

Tela Otimizada com Liquid Retina XDR
Experimente a melhor qualidade visual disponível em um laptop. O MacBook Pro de 16 polegadas possui um display mini-LED deslumbrante que atinge 1600 nits de brilho de pico para otimizar trabalhos com cor e HDR. A bateria de longuíssima duração garante o tempo de tela necessário para trabalhar o dia todo longe da tomada, enquanto as portas Thunderbolt 4 proporcionam conexões avançadas.

Características:

- Marca: Apple
- Modelo: MacBook Pro 16 (Chip M3 Max)

Especificações:

- Coleção de produtos: Notebooks para Criadores Profissionais
- Processador: Chip Apple M3 Max
- Tela: 16.2" Liquid Retina XDR (3456 x 2234) ProMotion 120Hz
- Memória Unificada: 36GB
- Armazenamento: 1TB SSD`,
    category: "Notebooks",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
    ],
    tags: ["populares"],
  },
  {
    id: "3",
    name: 'iPad Pro 12.9" M2',
    price: 11999.0,
    oldPrice: 12999.0,
    discountPercentage: 7,
    salesCount: 180,
    rating: 4.5,
    description: `Tablet Apple iPad Pro 12.9" Chip M2 Wi-Fi 256GB
Potencialize suas ilustrações e produtividade com o iPad Pro de 12.9 polegadas, a prancheta digital mais avançada do mundo. Equipado com o superpoderoso chip M2, capaz de superar muitos computadores de mesa, este tablet é a escolha ideal para designers, editores de fotos e estudantes que buscam uma máquina multitarefa implacável.

Tela Deslumbrante com Tecnologia Mini-LED
Experimente um contraste infinito e cores reais. O iPad Pro 12.9 possui a aclamada tela Liquid Retina XDR que eleva a luminosidade local para otimizar qualquer conteúdo HDR ou arte digital. O suporte para Apple Pencil de 2ª geração com detecção de proximidade (Hover) garante a exatidão necessária para traços precisos, redefinindo o modo de criar.

Características:

- Marca: Apple
- Modelo: iPad Pro 12.9 polegadas (6ª Geração)

Especificações:

- Coleção de produtos: Tablets Profissionais
- Processador: Chip Apple M2
- Tela: 12.9" Liquid Retina XDR (Mini-LED) 120Hz ProMotion
- Conectividade: Wi-Fi 6E e Bluetooth 5.3
- Câmeras: Traseira 12MP + 10MP Ultrawide / Frontal 12MP TrueDepth`,
    category: "Tablets",
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800"],
    tags: ["ofertas"],
  },
  {
    id: "4",
    name: "AirPods Pro 2ª Geração",
    price: 129.0,
    oldPrice: 159.0,
    discountPercentage: 13,
    salesCount: 933,
    rating: 4.9,
    description: `Fone de Ouvido Apple AirPods Pro (2ª Geração) com Estojo MagSafe USB-C
Potencialize sua audição com os AirPods Pro de 2ª Geração, a solução compacta com a melhor qualidade de som in-ear da Apple. Com cancelamento de ruído até 2x mais potente e o avançado chip H2, estes fones são a escolha ideal para focar no seu trabalho ou mergulhar profundamente nas suas músicas favoritas.

Áudio Adaptativo Otimizado e Áudio Espacial
Experimente o silêncio verdadeiro e sons tridimensionais. Os AirPods Pro 2 possuem Áudio Espacial Personalizado para otimizar a direção do som como se você estivesse em um cinema. O modo Ambiente Transparente e o novo Áudio Adaptativo garantem a consciência necessária do ambiente externo, ajustando inteligentemente barulhos extremos antes de chegarem aos seus ouvidos.

Características:

- Marca: Apple
- Modelo: AirPods Pro 2ª Geração (USB-C)

Especificações:

- Coleção de produtos: Fones de Ouvido True Wireless (TWS)
- Processamento: Chip H2 de fone de ouvido Apple
- Autonomia: Até 6 horas de som com uma carga (até 30 horas com estojo)
- Sensores: Microfones duplos com filtragem espacial, sensor de toque e de pele
- Proteção: Resistência a suor, água e poeira (IP54)`,
    category: "Fones de Ouvido",
    images: [
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800",
    ],
    tags: ["ofertas", "populares"],
  },
  {
    id: "5",
    name: "Apple Watch Series 9",
    price: 3999.0,
    oldPrice: 4299.0,
    discountPercentage: 7,
    salesCount: 124,
    rating: 3.0,
    description: `Smartwatch Apple Watch Series 9 GPS Caixa de Alumínio 45mm
Potencialize sua rotina saudável com o Apple Watch Series 9, o relógio inteligente mais cobiçado que se tornou a extensão perfeita para usuários de iPhone. Com o chip S9 ultra-rápido e uma tela duas vezes mais brilhante, este smartwatch é a escolha ideal para acompanhamento de esportes, notificações rápidas e monitoramento avançado de sinais vitais.

Interação Otimizada com Gesto de Toque Duplo (Double Tap)
Experimente o controle sem tocar na tela. O Apple Watch 9 possui um algoritmo avançado que entende os gestos dos seus dedos, permitindo atender chamadas ou pausar alarmes usando uma só mão. Os sensores de temperatura, ECG e oxigênio no sangue garantem as medições diárias de saúde necessárias, enquanto o design elegante veste bem em qualquer ocasião.

Características:

- Marca: Apple
- Modelo: Watch Series 9 GPS

Especificações:

- Coleção de produtos: Smartwatches Premium
- Tela: Tela Retina OLED LTPO Sempre Ativa (até 2000 nits)
- Processador: SiP S9 de dois núcleos
- Saúde: App ECG, Monitoramento de Oxigênio no Sangue e Monitoramento de Ciclo
- Durabilidade: Resistente à água (50m) e poeira (IP6X)`,
    category: "Smartwatches",
    images: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800",
    ],
    tags: ["ofertas"],
  },
  {
    id: "6",
    name: "Magic Keyboard para iPad Pro",
    price: 2499.0,
    salesCount: 0,
    rating: 0.0,
    description: `Magic Keyboard Apple para iPad Pro 12.9 Polegadas - Teclado com Trackpad
Potencialize sua produtividade transformando seu iPad em um verdadeiro laptop com o Magic Keyboard. Com teclas retroiluminadas e um trackpad de vidro altamente responsivo, este teclado acoplável é a escolha ideal para digitar documentos longos, responder e-mails e aproveitar ao máximo o sistema iPadOS.

Design Magnético Flutuante e Ergonomia
Experimente o melhor ângulo de visão em qualquer mesa. O Magic Keyboard possui uma fixação magnética potente que deixa o iPad "flutuando" acima das teclas para otimizar seu pescoço e visão. O formato dobrável garante a proteção necessária da tela e traseira na mochila, além de entregar uma porta USB-C embutida dedicada exclusivamente para recarga do dispositivo.

Características:

- Marca: Apple
- Modelo: Magic Keyboard para iPad Pro 12.9"

Especificações:

- Coleção de produtos: Acessórios e Teclados para Tablets
- Conexão: Magnética via Smart Connector
- Extras: Porta USB-C para recarga Pass-Through
- Mecanismo das teclas: Tesoura, com curso de 1mm
- Iluminação: Retroiluminação LED sensível ao ambiente`,
    category: "Acessórios",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
    ],
    tags: ["populares"],
  },
  {
    id: "7",
    name: "Samsung Galaxy S24 Ultra",
    price: 7799.0,
    oldPrice: 8799.0,
    discountPercentage: 11,
    salesCount: 89,
    rating: 4.8,
    description: `Smartphone Samsung Galaxy S24 Ultra 512GB Titânio com Galaxy AI
Potencialize sua criatividade móvel com o Galaxy S24 Ultra, o ápice da tecnologia em smartphones Android turbinado por Inteligência Artificial nativa. Com um sensor fotográfico extraordinário de 200MP e a caneta S Pen embutida, este smartphone é a escolha ideal para produtividade, edição em tempo real e jogos ultra-realistas.

Inteligência Artificial Otimizada e Tela Plana
Experimente funcionalidades automáticas nunca vistas antes, como tradução de chamadas ao vivo e circule-para-pesquisar. O S24 Ultra possui uma nova estrutura de titânio, tela completamente plana e a exclusiva proteção de vidro Corning Gorilla Armor que minimiza reflexos. O poderoso Snapdragon 8 Gen 3 for Galaxy garante o máximo de desempenho necessário para que tudo rode instantaneamente.

Características:

- Marca: Samsung
- Modelo: Galaxy S24 Ultra

Especificações:

- Coleção de produtos: Smartphones Premium (Android)
- Tela: 6.8" Dynamic AMOLED 2X 120Hz (Plana)
- Processador: Qualcomm Snapdragon 8 Gen 3
- Câmeras: Traseira 200MP + 50MP + 12MP + 10MP / Frontal 12MP
- Diferenciais: S Pen Inclusa e Galaxy AI integrada`,
    category: "Smartphones",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800",
    ],
    tags: ["ofertas", "populares"],
  },
  {
    id: "8",
    name: "Dell XPS 15",
    price: 11999.0,
    salesCount: 150,
    rating: 3.9,
    description: `Notebook Premium Dell XPS 15 Intel Core i7 32GB RAM 1TB SSD OLED
Potencialize seu design e programação com o Dell XPS 15, um notebook luxuoso focado no equilíbrio perfeito entre poder de fogo e portabilidade. Equipado com uma tela OLED 3.5K e chassi de alumínio usinado, é a escolha ideal para editores de vídeo e usuários de Windows que buscam a mais alta estética e eficiência sem limitações de espaço.

Visualização Otimizada com Bordas Infinitas InfinityEdge
Experimente o preto perfeito e uma infinidade de cores no incrível display OLED. O XPS 15 possui bordas praticamente inexistentes que abrigam uma tela em proporção 16:10 para otimizar o uso vertical de aplicativos e planilhas. A placa de vídeo dedicada NVIDIA GeForce RTX 4050 garante a força de renderização necessária, acompanhado do conforto prolongado do teclado com fibra de carbono no descanso de pulso.

Características:

- Marca: Dell
- Modelo: XPS 15

Especificações:

- Coleção de produtos: Notebooks Premium e Corporativos
- Tela: 15.6" OLED 3.5K (3456 x 2160) Touchscreen
- Processador: Intel Core i7 (Série H)
- Memória: 32GB DDR5
- Placa de Vídeo: NVIDIA GeForce RTX 4050 6GB GDDR6`,
    category: "Notebooks",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
    ],
    tags: ["populares"],
  },
  {
    id: "9",
    name: "Samsung Galaxy Tab S9+",
    price: 5999.0,
    oldPrice: 6499.0,
    discountPercentage: 7,
    salesCount: 420,
    rating: 4.2,
    description: `Tablet Samsung Galaxy Tab S9+ Wi-Fi 512GB com S Pen Inclusa
Potencialize seu home office e entretenimento com o Galaxy Tab S9+, o tablet Android que define o mais alto patamar do mercado. Com certificação contra água (IP68) e um estonteante display Dynamic AMOLED 2X de 12,4 polegadas, este aparelho é a escolha ideal para consumir mídia de alta qualidade ou ilustrar como em uma tela profissional de pintura.

Criação Otimizada com S Pen Aperfeiçoada
Experimente uma fluidez ímpar nas suas anotações e desenhos. O Tab S9+ possui uma taxa de atualização de 120Hz que, associada ao processador Snapdragon 8 Gen 2, consegue otimizar qualquer tarefa paralela utilizando o modo Samsung DeX. A S Pen inclusa na caixa já resistente à água garante o nível de precisão necessário para artistas exigentes sem engasgos ou paradas não intencionais.

Características:

- Marca: Samsung
- Modelo: Galaxy Tab S9+

Especificações:

- Coleção de produtos: Tablets Premium Multimídia
- Tela: 12.4" Dynamic AMOLED 2X, 120Hz
- Processador: Snapdragon 8 Gen 2 for Galaxy
- Armazenamento/RAM: 512GB interno e 12GB de RAM
- Proteção: Certificação IP68 (Resistência a poeira e água)`,
    category: "Tablets",
    images: ["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800"],
    tags: ["ofertas"],
  },
  {
    id: "10",
    name: "Sony WH-1000XM5",
    price: 2499.0,
    oldPrice: 2799.0,
    discountPercentage: 10,
    salesCount: 420,
    rating: 4.9,
    description: `Headphone Bluetooth Sony WH-1000XM5 Cancelamento de Ruído Ativo
Potencialize sua concentração e momentos de paz com o headphone Sony WH-1000XM5, coroado repetidas vezes como o melhor cancelamento de ruído passivo e ativo do mundo. Com 8 microfones distribuídos e material ultra-confortável no arco, este fone sem fio é a escolha ideal para amantes de música, viajantes e trabalhadores de escritórios barulhentos.

Áudio High-Res Otimizado com Drivers de 30mm
Experimente cada detalhe da sua música favorita. O WH-1000XM5 possui drivers desenvolvidos do zero para proporcionar agudos naturais e graves controlados, otimizando seu perfil sonoro. A bateria gigantesca de 30 horas com carregamento rápido garante o tempo de reprodução contínuo necessário para não se preocupar com fios durante toda a semana útil de trabalho.

Características:

- Marca: Sony
- Modelo: WH-1000XM5

Especificações:

- Coleção de produtos: Fones de Ouvido Over-Ear Premium
- Cancelamento de Ruído: ANC líder da indústria com otimizador automático
- Bateria: Até 30 horas de reprodução contínua (com ANC)
- Conectividade: Bluetooth 5.2, Conexão multiponto e cabo 3.5mm
- Microfone: 4 microfones direcionais para chamadas cristalinas`,
    category: "Fones de Ouvido",
    images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800"],
    tags: ["ofertas", "populares"],
  },
  {
    id: "11",
    name: "Garmin Fenix 7 Pro",
    price: 5999.0,
    salesCount: 500,
    rating: 4.3,
    description: `Relógio Esportivo Garmin Fenix 7 Pro Solar GPS Multiesporte
Potencialize seu condicionamento físico extremo com o Garmin Fenix 7 Pro Solar, o relógio multiesportivo construído para suportar as piores condições ambientais que o ser humano pode enfrentar. Com bateria estendida via carregamento solar e uma lanterna LED embutida, este wearable é a escolha ideal para maratonistas, trilheiros de alta montanha e aventureiros outdoor.

Navegação Otimizada com GPS Multibanda
Experimente o mais alto nível de precisão de rotas do planeta. O Fenix 7 Pro possui mapas TopoActive baixáveis e conectividade com múltiplas redes de satélite para otimizar sua localização até mesmo nos desfiladeiros ou cidades de concreto. O monitoramento fisiológico constante de performance e hidratação garante a visão de recuperação necessária para maximizar seu preparo para as provas.

Características:

- Marca: Garmin
- Modelo: Fenix 7 Pro Sapphire Solar

Especificações:

- Coleção de produtos: Smartwatches de Aventura e Performance
- Lente e Corpo: Power Sapphire (vidro solar) com aro de titânio
- Duração da bateria: Até 22 dias no modo smartwatch (com energia solar)
- GPS: Multibanda (GPS, GLONASS e Galileo)
- Sensores: Frequência cardíaca (Gen 5), Oxímetro de pulso, altímetro, bússola`,
    category: "Smartwatches",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800",
    ],
    tags: ["populares"],
  },
  {
    id: "12",
    name: "Logitech MX Master 3S",
    price: 599.0,
    oldPrice: 699.0,
    discountPercentage: 14,
    salesCount: 7800,
    rating: 4.9,
    description: `Mouse Sem Fio Logitech MX Master 3S Ergonômico de Alta Precisão
Potencialize sua produtividade diária e conforto no escritório com o Logitech MX Master 3S, o mouse ergonômico mais reverenciado por profissionais e criativos de todas as áreas. Com cliques incrivelmente silenciosos e um sensor óptico que rastreia em qualquer superfície (inclusive vidro), este mouse é a escolha ideal para acelerar seu fluxo em telas múltiplas.

Navegação Otimizada com Roda de Rolagem MagSpeed
Experimente rolar mil linhas de código ou planilhas em um único segundo. O MX Master 3S possui a tecnologia eletromagnética MagSpeed para otimizar incrivelmente a leitura, parando exatamente onde você quer. O formato moldado perfeitamente para a mão e os botões laterais de polegar garantem a ergonomia necessária, aliviando o cansaço do punho e melhorando o rendimento ao final do dia.

Características:

- Marca: Logitech
- Modelo: MX Master 3S

Especificações:

- Coleção de produtos: Mouses Premium para Produtividade
- Rastreamento: Sensor Darkfield de 8.000 DPI (funciona em vidro)
- Rolagem: MagSpeed Eletromagnética e Scroll lateral de polegar
- Conectividade: Bluetooth e Receptor Logi Bolt (Conecta até 3 dispositivos simultaneamente)
- Bateria: Recarregável via USB-C com duração de até 70 dias`,
    category: "Acessórios",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800",
    ],
    tags: ["ofertas"],
  },
];
