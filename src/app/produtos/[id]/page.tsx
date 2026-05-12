import DetalheProdutoComponent from "@/components/Produtos/DetalheProduto";

export default async function DetalheProduto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Para futuras implementações...
  // const produto = await getProduto(id)

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <DetalheProdutoComponent id={id} />
    </div>
  );
}
