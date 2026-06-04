"use client";

import {
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import Slider from "react-slick";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { products, type Product, SHIPPING_COST } from "@/data/products";
import { useCart } from "@/providers/CartProvider";

interface DetalheProdutoComponentProps {
  product?: Product;
}

export default function DetalheProdutoComponent({
  product,
}: DetalheProdutoComponentProps) {
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryModalIndex, setGalleryModalIndex] = useState(0);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const populares = products.filter((p) => p.tags?.includes("populares"));
  const popularesSlider = useRef<any>(null);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 5, slidesToScroll: 2 } },
      { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F2F3F4]">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <Link href="/produtos">
              <Button>Voltar para produtos</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const placeholderImage = "https://tiradentesinnovation.com/wp-content/uploads/2022/07/Picture-768x614.jpg";
  const originalImages = product.images.length > 0 ? product.images : [placeholderImage];
  const desiredProductImages = 6;
  const desiredPlaceholderImages = 6;
  const productGalleryImages = [
    ...originalImages.slice(0, desiredProductImages),
    ...Array(Math.max(0, desiredProductImages - originalImages.length)).fill(
      originalImages[0],
    ),
  ].slice(0, desiredProductImages);
  const galleryImages = [
    ...productGalleryImages,
    ...Array(desiredPlaceholderImages).fill(placeholderImage),
  ];
  const visibleGalleryImages = galleryImages.slice(0, 7);
  const hasMoreThanEightImages = galleryImages.length > 7;
  const remainingImagesCount = hasMoreThanEightImages
    ? galleryImages.length - 7
    : 0;

  const handleAddToCart = () => {
    if (product.variants) {
      const missingVariants = product.variants.filter(
        (v) => !selectedVariants[v.type],
      );
      if (missingVariants.length > 0) {
        toast.error(
          `Por favor, selecione: ${missingVariants.map((v) => v.type).join(", ")}`,
        );
        return;
      }
    }

    addToCart(product, quantity, selectedVariants);
    setShowAddedFeedback(true);
    toast.success(`${quantity}x ${product.name} adicionado ao carrinho!`);

    setTimeout(() => setShowAddedFeedback(false), 3000);
  };

  const handleVariantChange = (type: string, value: string) => {
    setSelectedVariants((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      {showAddedFeedback && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right">
          <Check size={24} />
          <span className="font-semibold">Produto adicionado ao carrinho!</span>
        </div>
      )}

      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-5xl max-h-[90vh]">
            <div className="flex items-center justify-between mb-4 text-white">
              <span className="text-sm bg-black/60 px-2 py-1 rounded-lg">
                Imagem {galleryModalIndex + 1} / {galleryImages.length}
              </span>
              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(false)}
                className="rounded-lg bg-black/60 p-2 text-white hover:bg-black"
              >
                <X size={20} />
              </button>
            </div>
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={galleryImages[galleryModalIndex]}
                alt={`${product.name} - ${galleryModalIndex + 1}`}
                className="mx-auto max-h-[80vh] w-auto max-w-full object-contain"
              />

              <button
                type="button"
                onClick={() => setGalleryModalIndex((prev) => Math.max(0, prev - 1))}
                disabled={galleryModalIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-lg bg-black/60 p-3 text-white enabled:hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={() => setGalleryModalIndex((prev) => Math.min(galleryImages.length - 1, prev + 1))}
                disabled={galleryModalIndex === galleryImages.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-black/60 p-3 text-white enabled:hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-[1252px] mx-auto px-4 py-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-600 mb-6 flex-wrap">
          <Link href="/" className="hover:text-black transition-colors">
            Página inicial
          </Link>
          <ChevronRight size={16} />
          <Link href={`/produtos?categoria=${encodeURIComponent(product.category)}`} className="hover:text-black transition-colors">
            {product.category}
          </Link>
          <ChevronRight size={16} />
          <span className="font-semibold text-black">
            {product.name}
          </span>
        </nav>

        <div className="bg-white rounded-[3px] shadow-sm p-8 mb-[15px]">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="flex gap-4">
              <div className="flex flex-col gap-4 shrink-0 w-[56px]">
                {visibleGalleryImages.map((image, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    onMouseEnter={() => setSelectedImage(index)}
                    className={`w-[56px] h-[56px] shrink-0 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedImage === index
                        ? "border-blue-600"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                {hasMoreThanEightImages && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(0);
                      setGalleryModalIndex(0);
                      setIsGalleryModalOpen(true);
                    }}
                    className="w-[56px] h-[56px] shrink-0 rounded-lg border-2 border-transparent bg-slate-300 text-blue-600 font-semibold transition-all hover:scale-105 hover:border-blue-500 flex items-center justify-center"
                  >
                    +{remainingImagesCount}
                  </button>
                )}
              </div>

              <div className="flex-1 h-[600px] max-h-[600px] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={galleryImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <button
                    type="button"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-3 rounded-full hover:bg-gray-100 transition-colors shrink-0"
                    title="Adicionar aos favoritos"
                  >
                    <Heart
                      size={28}
                      className={`transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}`}
                    />
                  </button>
                </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 mt-1">
                <span className="font-bold text-black">{product.rating}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    if (product.rating >= ratingValue) {
                      return <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />;
                    } else if (product.rating >= ratingValue - 0.5) {
                      return (
                        <div key={i} className="relative flex">
                          <Star size={16} className="text-gray-300" />
                          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                            <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                      );
                    }
                    return <Star key={i} size={16} className="text-gray-300" />;
                  })}
                </div>
                <span className="text-gray-400">•</span>
                <span>{product.salesCount} vendidos</span>
              </div>
              </div>

            <div className="py-2">
              {product.oldPrice && (
                <p className="text-sm text-gray-500 line-through mb-1">
                  R${" "}
                  {product.oldPrice.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              )}
              <div className="flex items-center gap-3">
                <p className="text-3xl font-bold">
                  R${" "}
                  {product.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                {product.discountPercentage && (
                  <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                    -{product.discountPercentage}%
                  </span>
                )}
              </div>
              </div>

              {product.variants &&
                product.variants.map((variant) => (
                  <div key={variant.type} className="space-y-3">
                    <Label className="text-lg font-semibold">
                      {variant.type}
                    </Label>
                    <RadioGroup
                      value={selectedVariants[variant.type] || ""}
                      onValueChange={(value) =>
                        handleVariantChange(variant.type, value)
                      }
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {variant.options.map((option) => (
                          <div key={option} className="relative">
                            <RadioGroupItem
                              value={option}
                              id={`${variant.type}-${option}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`${variant.type}-${option}`}
                              className="flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-black peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white hover:border-gray-400"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                ))}

              <div className="space-y-3">
                <Label className="text-lg font-semibold">Quantidade</Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="text-2xl font-bold w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full h-14 text-lg bg-black hover:bg-gray-800"
              >
                <ShoppingCart size={20} className="mr-2" />
                Adicionar ao Carrinho
              </Button>

              <div className="bg-gray-50 p-6 rounded-lg space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-600">Frete</span>
                  <span className="font-semibold">
                    R${" "}
                    {SHIPPING_COST.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}{" "}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Entrega</span>
                  <span className="font-semibold">Em até 7 dias úteis</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Garantia</span>
                  <span className="font-semibold">12 meses</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição do Produto */}
        <div className="bg-white rounded-[3px] shadow-sm mb-[15px] overflow-hidden">
          <button
            type="button"
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            className={`w-full flex items-center gap-3 px-8 py-4 border-b border-gray-100 transition-colors duration-300 text-left ${isDescriptionOpen ? "bg-[#F3F4F6]" : "bg-white hover:bg-gray-50"}`}
          >
            {isDescriptionOpen ? (
              <ChevronUp className="text-gray-600 shrink-0" size={24} />
            ) : (
              <ChevronDown className="text-gray-600 shrink-0" size={24} />
            )}
            <h2 className="text-xl font-bold text-gray-900">Descrição do produto</h2>
          </button>
          
          <div className={`grid transition-all duration-300 ease-in-out ${isDescriptionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden bg-white">
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos populares */}
        <section>
          <style>{`
            .slick-slide {
              height: auto;
              display: flex;
              justify-content: center;
              padding: 0 8px;
            }
            .slick-list {
              margin: 0 -8px;
            }
            .slick-slide > div {
              width: 100%;
              display: flex;
              justify-content: center;
            }
            .icon-destaque {
              color: #011C40;
            }
          `}</style>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <ChartNoAxesCombined className="icon-destaque" />
              Produtos populares
            </h2>
            <Link
              href="/produtos"
              className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline"
            >
              Ver todas <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-[22px_minmax(0,1fr)_22px] items-center gap-3 px-2">
            <button
              type="button"
              onClick={() => popularesSlider.current?.slickPrev()}
              className="w-[22px] h-[22px] rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:bg-zinc-800 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <div className="min-w-0">
              <Slider ref={popularesSlider} {...sliderSettings}>
                {populares.map((product) => (
                  <div key={product.id} className="pb-4">
                    <ProductCard product={product} />
                  </div>
                ))}
              </Slider>
            </div>
            <button
              type="button"
              onClick={() => popularesSlider.current?.slickNext()}
              className="w-[22px] h-[22px] rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:bg-zinc-800 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
