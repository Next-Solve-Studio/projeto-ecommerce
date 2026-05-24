"use client";

import {
  ChevronDown,
  HeadphonesIcon,
  Heart,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories, products } from "@/data/products";
import { useCart } from "@/providers/CartProvider";
import logoImg from "../../public/Horizontal_Lockup_on_Blue_Background-removebg-preview.png";
import { Input } from "./ui/input";

export function Header() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const desktopSuggestionRef = useRef<HTMLDivElement>(null);
  const mobileSuggestionRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isOutsideDesktop =
        desktopSuggestionRef.current && !desktopSuggestionRef.current.contains(target);
      const isOutsideMobile =
        mobileSuggestionRef.current && !mobileSuggestionRef.current.contains(target);

      if (isOutsideDesktop && isOutsideMobile) {
        setShowSuggestions(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      const exactCategory = categories.find(
        (c) => c.toLowerCase() === query.toLowerCase(),
      );
      const exactProduct = products.find(
        (p) => p.name.toLowerCase() === query.toLowerCase(),
      );

      if (exactCategory) {
        router.push(`/produtos?categoria=${encodeURIComponent(exactCategory)}`);
      } else if (exactProduct) {
        router.push(`/produtos/${exactProduct.id}`);
      } else {
        router.push(`/busca/${encodeURIComponent(query)}`);
      }

      setShowSuggestions(false);
      setSearchQuery("");
    }
  };

  const handleSelectProduct = (productId: string) => {
    router.push(`/produtos/${productId}`);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const handleSelectCategory = (categoryName: string) => {
    router.push(`/produtos?categoria=${encodeURIComponent(categoryName)}`);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const filteredProducts =
    searchQuery.length >= 2
      ? products.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

  const filteredCategories =
    searchQuery.length >= 2
      ? categories.filter((c) =>
          c.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

  return (
    <header
      id="header"
      className="sticky top-0 z-50 w-full bg-white pb-0 mb-0 border-none"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4 md:gap-6">
          <Link href="/" className="shrink-0 flex items-center">
            <Image
              src={logoImg}
              alt="ElectronicSolve Store"
              width={120}
              height={40}
              className="h-10 object-contain"
            />
          </Link>

          <div
            className="flex-1 max-w-2xl hidden md:block relative"
            ref={desktopSuggestionRef}
          >
            <form onSubmit={handleSearch} className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Buscar produtos ou categorias..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="pl-10 h-10 w-full bg-gray-50 border-gray-200 focus:bg-white text-black transition-colors"
              />
            </form>

            {showSuggestions &&
              searchQuery.length >= 2 &&
              (filteredProducts.length > 0 ||
                filteredCategories.length > 0) && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-50">
                  {filteredCategories.length > 0 && (
                    <div className="border-b border-gray-100 last:border-0">
                      <div className="px-3 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                        Categorias
                      </div>
                      <ul>
                        {filteredCategories.map((category) => (
                          <li key={category}>
                            <button
                              type="button"
                              onClick={() => handleSelectCategory(category)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors text-sm text-black"
                            >
                              {category}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {filteredProducts.length > 0 && (
                    <div className="border-b border-gray-100 last:border-0">
                      <div className="px-3 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                        Produtos
                      </div>
                      <ul>
                        {filteredProducts.slice(0, 5).map((product) => (
                          <li key={product.id}>
                            <button
                              type="button"
                              onClick={() => handleSelectProduct(product.id)}
                              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors text-left"
                            >
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-8 h-8 object-cover rounded"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  R${" "}
                                  {product.price.toFixed(2).replace(".", ",")}
                                </div>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
          </div>

          <div className="flex items-center gap-1 md:gap-3 shrink-0">
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="group flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md transition-colors text-white hover:text-black"
              >
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white transition-colors">
                  <User size={18} />
                </div>
                <div className="hidden lg:flex items-center gap-1">
                  <span className="text-sm font-medium">Minha Conta</span>
                  <ChevronDown
                    size={14}
                    className="text-white group-hover:text-black transition-colors"
                  />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50">
                  <Link
                    href="/conta"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Central Minha Conta
                  </Link>
                  <Link
                    href="/pedidos"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Meus pedidos
                  </Link>
                  <Link
                    href="/dados"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Meus dados
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/atendimento"
              className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-md transition-colors text-white hover:text-black"
              title="Atendimento"
            >
              <HeadphonesIcon size={20} />
            </Link>

            <Link
              href="/favoritos"
              className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-md transition-colors text-white hover:text-black"
              title="Favoritos"
            >
              <Heart size={20} />
            </Link>

            <Link
              href="/carrinho"
              className="relative flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-all ml-1"
            >
              <ShoppingCart size={20} />
              <span className="hidden lg:inline text-sm font-medium">
                Carrinho
              </span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-0 mb-0" ref={mobileSuggestionRef}>
          <form onSubmit={handleSearch} className="relative">
            <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors z-10 cursor-pointer" title="Buscar">
              <Search size={20} />
            </button>
            <Input
              type="text"
              placeholder="Buscar produtos ou categorias..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="pl-10 h-10 w-full bg-gray-50 border-gray-200 focus:bg-white text-black transition-colors"
            />
          </form>
          {showSuggestions &&
            searchQuery.length >= 2 &&
            (filteredProducts.length > 0 || filteredCategories.length > 0) && (
              <div className="absolute left-4 right-4 mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-50">
                {filteredCategories.length > 0 && (
                  <div className="border-b border-gray-100 last:border-0">
                    <div className="px-3 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                      Categorias
                    </div>
                    <ul>
                      {filteredCategories.map((category) => (
                        <li key={category}>
                          <button
                            type="button"
                            onClick={() => handleSelectCategory(category)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors text-sm text-black"
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {filteredProducts.length > 0 && (
                  <div className="border-b border-gray-100 last:border-0">
                    <div className="px-3 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                      Produtos
                    </div>
                    <ul>
                      {filteredProducts.slice(0, 5).map((product) => (
                        <li key={product.id}>
                          <button
                            type="button"
                            onClick={() => handleSelectProduct(product.id)}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors text-left"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                R$ {product.price.toFixed(2).replace(".", ",")}
                              </div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </header>
  );
}
