"use client";

export const dynamic = 'force-dynamic';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import { products, categories } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categoria');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'Todas');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [sortBy, setSortBy] = useState('name-asc');

  const maxPrice = Math.max(...products.map(p => p.price));

  useEffect(() => {
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Catálogo de Produtos</h1>
          <p className="text-gray-600">Encontre os melhores eletrônicos para você</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal size={20} />
                <h2 className="font-bold text-lg">Filtros</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block font-semibold">Categoria</Label>
                  <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="Todas" id="cat-all" />
                      <Label htmlFor="cat-all" className="cursor-pointer">Todas</Label>
                    </div>
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={category} id={`cat-${category}`} />
                        <Label htmlFor={`cat-${category}`} className="cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3 block font-semibold">Faixa de Preço</Label>
                  <div className="space-y-4">
                    <Slider
                      min={0}
                      max={maxPrice}
                      step={100}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>R$ {priceRange[0].toLocaleString('pt-BR')}</span>
                      <span>R$ {priceRange[1].toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white p-4 rounded-lg border mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border">
                <p className="text-gray-500">Nenhum produto encontrado com os filtros selecionados.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageContent />
    </Suspense>
  );
}

