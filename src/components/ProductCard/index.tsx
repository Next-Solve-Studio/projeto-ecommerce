"use client";

import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { useCart } from "@/providers/CartProvider";
import { Button } from "../ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const hasDiscount = product.oldPrice && product.discountPercentage;

  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all w-full max-w-[230px] h-[366px] flex flex-col mx-auto">
      <Link href={`/produtos/${product.id}`} className="block flex-shrink-0">
        <div className="h-[180px] w-full overflow-hidden bg-gray-50 flex items-center justify-center p-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-3 flex flex-col flex-grow justify-between">
        <div className="space-y-1">
          <Link href={`/produtos/${product.id}`} className="block">
            <h3 className="font-medium text-sm text-gray-900 leading-tight line-clamp-2 h-[40px] hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center text-xs text-gray-500 gap-2">
            <div className="flex items-center text-yellow-500">
              <Star size={12} className="fill-current mr-1" />
              <span className="font-medium">{product.rating.toFixed(1)}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>{product.salesCount.toLocaleString("pt-BR")} vendidos</span>
          </div>
        </div>

        <div className="mt-2 space-y-1">
          {hasDiscount ? (
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 line-through">
                R${" "}
                {product.oldPrice?.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900 leading-none">
                  R${" "}
                  {product.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <span className="text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                  -{product.discountPercentage}%
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-end h-[36px]">
              <span className="text-lg font-bold text-gray-900 leading-none">
                R${" "}
                {product.price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full mt-3 h-8 text-xs bg-black hover:bg-gray-800 transition-colors"
        >
          <ShoppingCart size={14} className="mr-2" />
          Adicionar
        </Button>
      </div>
    </div>
  );
}
