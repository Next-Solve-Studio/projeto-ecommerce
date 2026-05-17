interface DetalheProdutoComponentProps {
  id: string;
}

export default function DetalheProdutoComponent({
  id,
}: DetalheProdutoComponentProps) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <h1>DetalheProdutoComponent</h1>
      <p>ID enviado: {id}</p>
    </div>
  );
}
