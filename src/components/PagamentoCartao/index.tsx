"use client";

import { ChevronLeft, CreditCard, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { finalizarPedido } from "@/actions/checkout";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/CartProvider";
import { StepperCheckout } from "../ui/stepper-checkout";

export default function CreditCardPaymentPageComponent() {
  const router = useRouter();
  const { getTotal, items, clearCart } = useCart();
  const [isConfirming, setIsConfirming] = useState(false);
  const [cardData, setCardData] = useState<any>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const subtotal = getTotal();
  const shippingData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("shippingData") || '{"shippingCost":0}')
      : { shippingCost: 0 };
  const total = subtotal + shippingData.shippingCost;

  useEffect(() => {
    const data = localStorage.getItem("creditCardData");
    if (data) {
      setCardData(JSON.parse(data));
    } else {
      router.push("/pagamento");
    }
  }, [router]);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      const formDataRaw = localStorage.getItem("checkoutFormData");
      const enderecoRaw = localStorage.getItem("enderecoData");
      const shippingRaw = localStorage.getItem("shippingData");

      if (!formDataRaw || !enderecoRaw || items.length === 0) throw new Error();

      const formData = JSON.parse(formDataRaw);
      const enderecoData = JSON.parse(enderecoRaw);
      const { shippingType, shippingCost } = shippingRaw
        ? JSON.parse(shippingRaw)
        : { shippingType: "standard", shippingCost: 0 };

      const response = await finalizarPedido({
        formData,
        enderecoData,
        cartItems: items,
        paymentMethod: "CREDIT_CARD",
        shippingCost,
        shippingType,
      });

      clearCart();
      localStorage.removeItem("checkoutFormData");
      localStorage.removeItem("enderecoData");
      localStorage.removeItem("shippingData");
      localStorage.removeItem("creditCardData");

      router.push(
        `/finalizacao?method=${encodeURIComponent("Cartão de Crédito")}&installments=${encodeURIComponent(cardData?.installments ?? 1)}&orderId=${response.orderId}`,
      );
    } catch (error) {
      toast.error("Erro ao processar pagamento. Tente novamente.");
      setIsConfirming(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <div className="container mx-auto px-4 max-w-6xl pt-4 pb-2">
        <Link href="/pagamento">
          <Button
            variant="ghost"
            className="bg-transparent border-none text-gray-500 hover:bg-transparent hover:underline px-0 font-normal"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar para o Pagamento
          </Button>
        </Link>
      </div>
      <StepperCheckout currentStep={4} />
      <div className="pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 mt-6">Pagamento no Cartão</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 md:p-8 rounded shadow-md">
                <div className="flex flex-col items-center justify-center py-6 space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Confirmação de Pagamento</h2>
                    <p className="text-gray-500">
                      Revise as informações abaixo e confirme a transação.
                    </p>
                  </div>

                  {cardData && (
                    <div className="w-full max-w-md p-6 bg-[#F5FCFF] border border-gray-300 rounded shadow-sm space-y-4">
                      <div className="flex items-center justify-between text-gray-700">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-[#0597F2]" />
                          <span className="font-semibold">Cartão Final</span>
                        </div>
                        <span className="font-mono text-lg">{cardData.cardNumber.slice(-4)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-gray-700">
                        <span className="text-sm">Titular</span>
                        <span className="font-medium">{cardData.cardName}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-gray-700 border-t border-gray-300/50 pt-4">
                        <span className="text-sm">Parcelas</span>
                        <span className="font-medium">{cardData.installments}x</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col items-center gap-3 w-full max-w-md mt-4">
                    <div className="flex w-full justify-center items-center gap-3 text-amber-600 bg-amber-50 px-4 py-3 rounded-full font-medium">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Aguardando pagamento...
                    </div>
                    
                    <div className="flex w-full justify-center items-center gap-3 text-green-600 bg-green-50 px-4 py-3 rounded-full font-medium">
                      <ShieldCheck className="w-5 h-5" />
                      Ambiente Seguro e Criptografado
                    </div>
                  </div>

                  <div className="pt-6 w-full border-t border-gray-300/50 max-w-md mx-auto mt-6">
                    <Button
                      onClick={handleConfirm}
                      size="lg"
                      className="w-full bg-black hover:bg-gray-800 rounded text-white h-14 text-lg"
                      disabled={isConfirming}
                    >
                      {isConfirming ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        "Confirmar Pagamento"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded sticky top-24 shadow-md">
                <h3 className="text-xl font-bold mb-4">Resumo do Pedido</h3>
                <div className="space-y-4 mb-6">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-semibold line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-gray-500">Qtd: {item.quantity}</p>
                        <p className="font-medium">
                          R${" "}
                          {(item.product.price * item.quantity).toLocaleString(
                            "pt-BR",
                            { minimumFractionDigits: 2 },
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-300/50 pt-4 space-y-3">
                  <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-gray-300/50">
                    <span>Total</span>
                    <span>
                      R${" "}
                      {total.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
