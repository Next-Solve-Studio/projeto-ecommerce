"use client";

import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { products } from "@/data/products";
import { useCart } from "@/providers/CartProvider";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

      <div className="container mx-auto px-4 py-8">
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft size={20} />
          Voltar para produtos
        </Link>

        <div className="bg-white rounded-lg border p-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-black"
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
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
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
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="border-t border-b py-6">
                <p className="text-4xl font-bold">
                  R${" "}
                  {product.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
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
                  <span className="text-gray-600">Frete Grátis</span>
                  <span className="font-semibold">Para todo Brasil</span>
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
      </div>
    </div>
  );
}
