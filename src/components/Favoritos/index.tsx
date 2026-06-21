"use client";

import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/CartProvider";
import { toastAddedToCart } from "@/components/ui/toast-sonner";
import { getProductPriceWithVariants, products } from "@/data/products";
import type { Product } from "@/data/products";

const FAVORITES_STORAGE_KEY = "@ProjetoEcommerce:favorites";
const FAVORITES_TTL_MS = 24 * 60 * 60 * 1000;

function loadFavoriteIds() {
  if (typeof window === "undefined") {
    return [] as string[];
  }

  const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
  if (!raw) {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(raw) as { ids?: string[]; expiresAt?: number };
    if (
      parsed?.expiresAt &&
      parsed.expiresAt > Date.now() &&
      Array.isArray(parsed.ids)
    ) {
      return parsed.ids;
    }
  } catch {}

  localStorage.removeItem(FAVORITES_STORAGE_KEY);
  return [] as string[];
}

function saveFavoriteIds(ids: string[]) {
  localStorage.setItem(
    FAVORITES_STORAGE_KEY,
    JSON.stringify({ ids, expiresAt: Date.now() + FAVORITES_TTL_MS }),
  );
}

export default function FavoritesPageComponent() {
  const { addToCart } = useCart();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(loadFavoriteIds());
  }, []);

  const favoriteProducts: Product[] = products.filter((product) =>
    favoriteIds.includes(product.id),
  );

  const handleRemoveFavorite = (productId: string) => {
    const updatedFavorites = favoriteIds.filter((id) => id !== productId);
    saveFavoriteIds(updatedFavorites);
    setFavoriteIds(updatedFavorites);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    toastAddedToCart(1, product.name);
  };

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <div className="mx-auto max-w-[1100px] px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold">Meus Favoritos</h1>
          </div>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Nenhum favorito ainda</h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-6">
              Você ainda não adicionou produtos aos favoritos. Navegue pelos
              detalhes dos produtos e clique no coração para salvá-los.
            </p>
            <Link href="/produtos">
              <Button className="bg-black text-white hover:bg-gray-800 h-12 px-8">
                Ver produtos
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col transform transition-transform duration-200 hover:-translate-y-1"
                style={{ maxWidth: 360 }}
              >
                <Link href={`/produtos/${product.id}`} className="group block">
                  <div className="h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <Link href={`/produtos/${product.id}`} className="hover:text-blue-600">
                    <h3 className="font-semibold text-base text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="mt-3 text-gray-900 text-lg font-bold">
                    R${" "}
                    {product.price.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 h-11 gap-2 bg-black text-white hover:bg-gray-800"
                    >
                      <ShoppingCart size={16} />
                      Adicionar
                    </Button>
                    <button
                      type="button"
                      onClick={() => handleRemoveFavorite(product.id)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-red-500 hover:bg-red-50 transition-colors"
                      aria-label="Remover dos favoritos"
                    >
                      <Heart size={20} className="fill-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
