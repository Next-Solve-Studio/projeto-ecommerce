"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Smartphone, Laptop, Tablet, Headphones, Watch, Usb, Gamepad } from 'lucide-react';
import Slider from 'react-slick';
import { products, categories } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Header } from '@/components/Header';

import banner1 from '../imports/1.png';
import banner2 from '../imports/2.png';
import banner3 from '../imports/3.png';

const categoryIcons = {
  "Smartphones": Smartphone,
  "Notebooks": Laptop,
  "Tablets": Tablet,
  "Acessórios": Usb,
  "Smartwatches": Watch,
  "Fones de Ouvido": Headphones,
  "Setup Gamer": Gamepad
};

function CustomNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", alignItems: "center", justifyItems: "center", background: "#000", borderRadius: "50%", width: "32px", height: "32px", right: "-10px", zIndex: 10 }}
      onClick={onClick}
    />
  );
}

function CustomPrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", alignItems: "center", justifyItems: "center", background: "#000", borderRadius: "50%", width: "32px", height: "32px", left: "-10px", zIndex: 10 }}
      onClick={onClick}
    />
  );
}

export default function HomePage() {
  const ofertas = products.filter(p => p.tags?.includes('ofertas'));
  const populares = products.filter(p => p.tags?.includes('populares'));
  const gamer = products.filter(p => p.tags?.includes('gamer'));

  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
    dotsClass: "slick-dots !bottom-4",
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 5, slidesToScroll: 2 } },
      { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ]
  };

  return (
    <div className="min-h-screen bg-[#F2F3F4] pb-20 overflow-hidden">
      <Header />
      <style>{`
        .slick-prev:before, .slick-next:before {
          font-size: 20px;
          line-height: 1;
          opacity: 1;
          color: white;
        }
        .slick-slide {
          height: auto;
          display: flex;
          justify-content: center;
          padding: 0 8px; /* Adds space between slides without breaking slick math */
        }
        .slick-list {
          margin: 0 -8px; /* Counteracts the padding on slides */
        }
        .slick-slide > div {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .banner-slider .slick-slide {
          padding: 0 !important;
        }
        .banner-slider .slick-list {
          margin: 0 !important;
        }
        .banner-slider .slick-dots {
          bottom: 20px;
        }
        .banner-slider .slick-dots li {
          margin: 0 4px;
        }
        .banner-slider .slick-dots li button:before {
          font-size: 16px;
          color: white;
          opacity: 0.5;
        }
        .banner-slider .slick-dots li.slick-active button:before {
          color: white;
          opacity: 1;
        }
      `}</style>
      
      {/* Banner Slider */}
      <section className="w-full mb-8 relative">
        <Slider {...bannerSettings} className="banner-slider">
          <div className="relative w-full h-[450px] outline-none">
            <Image src={banner1} alt="Banner 1" fill className="object-cover" />
          </div>
          <div className="relative w-full h-[450px] outline-none">
            <Image src={banner2} alt="Banner 2" fill className="object-cover" />
          </div>
          <div className="relative w-full h-[450px] outline-none">
            <Image src={banner3} alt="Banner 3" fill className="object-cover" />
          </div>
        </Slider>
      </section>

      {/* Categorias */}
      <section className="container mx-auto px-4 mb-16 max-w-[1400px]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {Object.entries(categoryIcons).map(([name, Icon]) => (
            <Link
              key={name}
              href={`/produtos?categoria=${encodeURIComponent(name)}`}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-gray-300 gap-3"
            >
              <Icon size={32} className="text-gray-700" />
              <span className="text-sm font-medium text-center text-gray-900">{name}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-16 max-w-[1400px]">
        {/* Ofertas em destaque */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Ofertas em destaque</h2>
            <Link href="/produtos" className="text-sm font-medium text-blue-600 hover:underline">Ver todas</Link>
          </div>
          <div className="px-2">
            <Slider {...sliderSettings}>
              {ofertas.map((product) => (
                <div key={product.id} className="pb-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Produtos populares */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Produtos populares</h2>
            <Link href="/produtos" className="text-sm font-medium text-blue-600 hover:underline">Ver todos</Link>
          </div>
          <div className="px-2">
            <Slider {...sliderSettings}>
              {populares.map((product) => (
                <div key={product.id} className="pb-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Monte seu Setup Gamer */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Monte seu Setup Gamer</h2>
            <Link href="/produtos?categoria=Setup%20Gamer" className="text-sm font-medium text-blue-600 hover:underline">Explorar Setup</Link>
          </div>
          <div className="px-2">
            <Slider {...sliderSettings}>
              {gamer.map((product) => (
                <div key={product.id} className="pb-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>
    </div>
  );
}
