"use client";

import { Search, SlidersHorizontal, Check, Star } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { categories, products } from "@/data/products";

function ProdutosComponentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("categoria");
  const buscaParam = searchParams.get("busca");

  const [searchQuery, setSearchQuery] = useState(buscaParam || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam || "Todas",
  );
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [sortBy, setSortBy] = useState("name-asc");

  const maxPrice = Math.max(...products.map((p) => p.price));

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "Todas") {
      router.push("/produtos");
    } else {
      router.push(`/produtos?categoria=${encodeURIComponent(category)}`);
    }
  };

  useEffect(() => {
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (buscaParam !== null && buscaParam !== searchQuery) {
      setSearchQuery(buscaParam);
    }
  }, [buscaParam]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todas" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = selectedRatings.length === 0 || selectedRatings.some((r) =>
      r === 5 ? product.rating === 5 : product.rating >= r && product.rating < r + 1
    );

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-[#F2F3F4] text-black">
      <Header />
      <div className="max-w-[1250px] w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-black">Catálogo de Produtos</h1>
          <p className="text-gray-800">
            Encontre os melhores eletrônicos para você
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-48 space-y-6">
            <div className="py-2">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal size={20} />
                <h2 className="font-bold text-lg text-[#202020]">Filtros</h2>
              </div>

              <hr className="my-4 border-gray-300" />

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block font-semibold text-[#202020]">Categoria</Label>
                  <div className="flex flex-col">
                    <div 
                      className="flex items-center space-x-2 mb-2 cursor-pointer"
                      onClick={() => handleCategoryChange("Todas")}
                    >
                      <div className="w-[13px] h-[13px] bg-white border border-gray-400 rounded-[1px] flex items-center justify-center shrink-0">
                        {selectedCategory === "Todas" && <Check size={10} strokeWidth={4} className="text-blue-600" />}
                      </div>
                      <Label className="cursor-pointer text-[#202020] pointer-events-none">
                        Todas
                      </Label>
                    </div>
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2 mb-2 cursor-pointer"
                        onClick={() => handleCategoryChange(category)}
                      >
                        <div className="w-[13px] h-[13px] bg-white border border-gray-400 rounded-[1px] flex items-center justify-center shrink-0">
                          {selectedCategory === category && <Check size={10} strokeWidth={4} className="text-blue-600" />}
                        </div>
                        <Label className="cursor-pointer text-[#202020] pointer-events-none">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="my-6 border-gray-300" />

                <div>
                  <Label className="mb-3 block font-semibold text-[#202020]">Avaliação</Label>
                  <div className="flex flex-col">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div
                        key={rating}
                        className="flex items-center space-x-2 mb-2 cursor-pointer"
                        onClick={() => {
                          setSelectedRatings((prev) =>
                            prev.includes(rating)
                              ? prev.filter((r) => r !== rating)
                              : [...prev, rating]
                          );
                        }}
                      >
                        <div className="w-[13px] h-[13px] bg-white border border-gray-400 rounded-[1px] flex items-center justify-center shrink-0">
                          {selectedRatings.includes(rating) && <Check size={10} strokeWidth={4} className="text-blue-600" />}
                        </div>
                        <div className="flex items-center cursor-pointer pointer-events-none">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="my-6 border-gray-300" />

                <div>
                  <Label className="mb-3 block font-semibold text-[#202020]">
                    Faixa de Preço
                  </Label>
                  <div className="space-y-4">
                    <Slider
                      min={0}
                      max={maxPrice}
                      step={100}
                      value={priceRange}
                      onValueChange={(value) =>
                        setPriceRange(value as [number, number])
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>R$ {priceRange[0].toLocaleString("pt-BR")}</span>
                      <span>R$ {priceRange[1].toLocaleString("pt-BR")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-[#EDEDED] p-2 rounded-[2px] mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    type="text"
                    placeholder="Buscar por nome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
                    <SelectItem value="price-asc">Menor Preço</SelectItem>
                    <SelectItem value="price-desc">Maior Preço</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-4 text-sm text-gray-600">
              {filteredProducts.length} produto(s) encontrado(s)
            </div>

            {filteredProducts.length > 0 ? (
              <div className="flex flex-wrap gap-[10px]">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="w-[190px]">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border">
                <p className="text-gray-500">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ProdutosComponent() {
  return (
    <Suspense fallback={null}>
      <ProdutosComponentContent />
    </Suspense>
  );
}
