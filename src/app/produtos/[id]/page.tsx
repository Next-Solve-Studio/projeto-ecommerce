import DetalheProdutoComponent from "@/components/Produtos/DetalheProduto";
import { products } from "@/data/products";

export default async function DetalheProduto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Para futuras implementações...
  // const produto = await getProduto(id)
  const product = products.find((p) => p.id === id);

  return <DetalheProdutoComponent product={product} />;
}
