interface CheckoutComponentProps {
  id: string;
}

export default function CheckoutComponent({ id }: CheckoutComponentProps) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <h1>CheckoutComponent</h1>
      <p>ID enviado: {id}</p>
    </div>
  );
}

