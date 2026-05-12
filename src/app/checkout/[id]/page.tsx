import CheckoutComponent from "@/components/Checkout";

export default async function Checkout({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Para futuras implementações...
  // const checkout = await getCheckout(id)

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <CheckoutComponent id={id} />
    </div>
  );
}
