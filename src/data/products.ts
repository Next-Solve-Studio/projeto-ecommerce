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
    salesCount: 1450,
    rating: 4.8,
    description: "Cadeira ergonômica com espuma de alta densidade.",
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
    salesCount: 3200,
    rating: 4.9,
    description: "Teclado mecânico com switches vermelhos e iluminação RGB.",
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
    salesCount: 5120,
    rating: 4.7,
    description: "Sensor óptico de 20K DPI e switches ópticos.",
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
    salesCount: 890,
    rating: 4.6,
    description: "Monitor Ultrawide 144Hz 1ms IPS.",
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
    salesCount: 2300,
    rating: 4.8,
    description: "Áudio surround 7.1 e microfone Blue VO!CE.",
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
    salesCount: 1100,
    rating: 4.7,
    description: "Gabinete mid-tower com vidro temperado.",
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
    salesCount: 650,
    rating: 4.9,
    description: "NVIDIA GeForce RTX 4070 12GB GDDR6X.",
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
    salesCount: 1800,
    rating: 4.8,
    description: "Microfone condensador USB.",
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
    salesCount: 12500,
    rating: 4.9,
    description: "O mais avançado iPhone já criado. Chip A17 Pro.",
    category: "Smartphones",
    images: ["https://m.media-amazon.com/images/I/416MG51rNgL._AC_SX679_.jpg"],
    tags: ["ofertas", "populares"],
  },
  {
    id: "2",
    name: 'MacBook Pro 16" M3 Max',
    price: 25999.0,
    salesCount: 310,
    rating: 5.0,
    description: "Desempenho revolucionário com chip M3 Max.",
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
    salesCount: 1420,
    rating: 4.8,
    description: "Poder absoluto em suas mãos.",
    category: "Tablets",
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800"],
    tags: ["ofertas"],
  },
  {
    id: "4",
    name: "AirPods Pro 2ª Geração",
    price: 1899.0,
    oldPrice: 2199.0,
    discountPercentage: 13,
    salesCount: 8900,
    rating: 4.9,
    description: "Cancelamento ativo de ruído aprimorado.",
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
    salesCount: 4500,
    rating: 4.7,
    description: "Monitoramento avançado de saúde.",
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
    salesCount: 2100,
    rating: 4.6,
    description: "Teclado retroiluminado com trackpad integrado.",
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
    salesCount: 5600,
    rating: 4.8,
    description: "Câmera de 200MP e S Pen integrada.",
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
    salesCount: 1200,
    rating: 4.7,
    description: "Notebook premium com tela OLED.",
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
    salesCount: 1800,
    rating: 4.8,
    description: 'Tela Dynamic AMOLED 2X de 12.4".',
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
    salesCount: 3400,
    rating: 4.9,
    description: "Melhor cancelamento de ruído da categoria.",
    category: "Fones de Ouvido",
    images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800"],
    tags: ["ofertas", "populares"],
  },
  {
    id: "11",
    name: "Garmin Fenix 7 Pro",
    price: 5999.0,
    salesCount: 800,
    rating: 4.9,
    description: "Smartwatch multiesportivo com GPS.",
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
    description: "Mouse ergonômico premium.",
    category: "Acessórios",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800",
    ],
    tags: ["ofertas"],
  },
];
