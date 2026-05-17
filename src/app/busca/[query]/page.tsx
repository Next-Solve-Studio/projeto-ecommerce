"use client";

import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Header } from '@/components/Header';

export default function SearchPage() {
  const params = useParams();
  const query = params?.query as string;
  
  const decodedQuery = query ? decodeURIComponent(query) : '';
  
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(decodedQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(decodedQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(decodedQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-64px)]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resultados da Busca</h1>
        <p className="text-gray-600">
          Você buscou por: <span className="font-semibold text-black">"{decodedQuery}"</span>
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Não encontramos nenhum produto que corresponda a "{decodedQuery}". 
            Tente buscar com palavras-chave diferentes ou mais genéricas.
          </p>
        </div>
      )}
      </div>
    </div>
  );
}