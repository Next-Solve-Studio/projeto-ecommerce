"use client";

import {
  ChevronDown,
  HeadphonesIcon,
  Heart,
  LogOut,
  Package,
  Search,
  Shield,
  ShieldUser,
  ShoppingCart,
  User,
  UserCog,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
import { categories, products } from "@/data/products";
import { useCart } from "@/providers/CartProvider";
import { toastLogout } from "../ui/toast-sonner";
import { Button } from "../ui/button";
import logoImg from "../../../public/Logo/LogoCompleta-ElectronicSolve_Store.png";
import { Input } from "../ui/input";

export function Header() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { data: session, status } = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const desktopSuggestionRef = useRef<HTMLDivElement>(null);
  const mobileSuggestionRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isOutsideDesktop =
        desktopSuggestionRef.current &&
        !desktopSuggestionRef.current.contains(target);
      const isOutsideMobile =
        mobileSuggestionRef.current &&
        !mobileSuggestionRef.current.contains(target);

      if (isOutsideDesktop && isOutsideMobile) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(false);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

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
    <>
      {isHome && (
        <div
          className={`w-full transition-all duration-300 ${isScrolled ? "h-14" : "h-20"}`}
        />
      )}
      <header
        id="header"
        className={`z-50 w-full bg-white pb-0 mb-0 border-none transition-all duration-300 ${
          isHome ? "fixed top-0 left-0 shadow-sm" : "relative"
        }`}
      >
        <div className="container mx-auto px-4">
          <div
            className={`flex items-center justify-between gap-4 md:gap-6 transition-all duration-300 ${isHome && isScrolled ? "h-14" : "h-20"}`}
          >
            <Link href="/" className="shrink-0 flex items-center">
              <Image
                src={logoImg}
                alt="ElectronicSolve Store"
                width={120}
                height={40}
                className="h-10 object-contain"
                loading="eager"
              />
            </Link>

            <div
              className="flex-1 max-w-2xl hidden md:block relative"
              ref={desktopSuggestionRef}
            >
              <form onSubmit={handleSearch} className="relative group">
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gray-500 hover:text-white group-focus-within:hover:text-black transition-colors z-10 cursor-pointer"
                  title="Buscar"
                >
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
                  className={`pl-10 h-10 w-full border-none placeholder:text-gray-300 focus:placeholder:text-gray-500 transition-all duration-300 header-search-input focus:!bg-white focus:!text-black ${
                    isHome && isScrolled
                      ? "!bg-[#011C40] text-white"
                      : "text-white"
                  }`}
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
              {status === "loading" && (
                <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200" />
              )}

              {status === "unauthenticated" && (
                <Link
                  href="/login"
                  className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-md transition-colors text-white hover:text-black"
                  title="Entrar"
                >
                  <User size={18} />
                </Link>
              )}

              {status === "authenticated" && (
                <div className="hidden md:flex items-center gap-2">
                  {session?.user?.role === "ADMIN" && (
                    <Link href="/admin">
                      <Button variant="outline" size="sm">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin
                      </Button>
                    </Link>
                  )}

                  <Select
                    value=""
                    onValueChange={(val) => {
                      if (val === "conta") router.push("/conta");
                      if (val === "pedidos") router.push("/pedidos");
                    }}
                  >
                    <SelectTrigger className="group h-9 w-auto gap-2 border-none bg-transparent px-3 text-sm font-medium text-white shadow-sm hover:bg-gray-100 hover:!text-white data-[state=open]:bg-gray-100 data-[state=open]:!text-black focus:ring-0 transition-colors">
                      <User className="h-4 w-4 shrink-0 text-white group-hover:text-white group-data-[state=open]:text-black transition-colors" />
                      <SelectValue
                        placeholder={session.user.name || "Minha Conta"}
                      />
                    </SelectTrigger>
                    <SelectContent align="end">
                      <SelectItem
                        value="conta"
                        className="group cursor-pointer"
                      >
                        <div className="flex items-center">
                          <UserCog className="mr-2 h-4 w-4" />
                          Perfil
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="pedidos"
                        className="group cursor-pointer"
                      >
                        <div className="flex items-center">
                          <Package className="mr-2 h-4 w-4" />
                          Meus pedidos
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      toastLogout();
                      setTimeout(async () => {
                        await signOut({ callbackUrl: "/" });
                      }, 2000);
                    }}
                    className="hover:bg-gray-100 hover:!text-black transition-colors text-white"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              )}

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
            <form onSubmit={handleSearch} className="relative group">
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-gray-500 hover:text-white group-focus-within:hover:text-black transition-colors z-10 cursor-pointer"
                title="Buscar"
              >
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
                className={`pl-10 h-10 w-full border-none placeholder:text-gray-300 focus:placeholder:text-gray-500 transition-all duration-300 header-search-input focus:!bg-white focus:!text-black ${
                  isHome && isScrolled
                    ? "!bg-[#011C40] text-white"
                    : "text-white"
                }`}
              />
            </form>
            {showSuggestions &&
              searchQuery.length >= 2 &&
              (filteredProducts.length > 0 ||
                filteredCategories.length > 0) && (
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
        </div>
      </header>
    </>
  );
}
