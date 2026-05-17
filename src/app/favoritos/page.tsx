import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <Heart size={48} className="text-gray-400" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Meus Favoritos</h1>
      <p className="text-gray-600 max-w-md mb-8">
        Você ainda não adicionou nenhum produto aos favoritos. Explore nossa loja e salve os itens que você mais gosta!
      </p>
      <Link href="/produtos">
        <Button className="bg-black text-white hover:bg-gray-800 h-12 px-8">
          Explorar Produtos
        </Button>
      </Link>
    </div>
  );
}
