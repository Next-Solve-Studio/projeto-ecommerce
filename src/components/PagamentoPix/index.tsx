"use client";

import { CheckCircle2, ChevronLeft, Copy, Loader2, QrCode } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { finalizarPedido } from "@/actions/checkout";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/CartProvider";
import { StepperCheckout } from "../ui/stepper-checkout";

export default function PixPaymentPageComponent() {
  const router = useRouter();
  const { getTotal, items, clearCart } = useCart();
  const [copied, setCopied] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [realPixCode, setRealPixCode] = useState<string | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const subtotal = getTotal();
  const shippingData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("shippingData") || '{"shippingCost":0}')
      : { shippingCost: 0 };
  const total = subtotal + shippingData.shippingCost;

  const pixCodeFallback =
    "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913Loja de Eletr6008SAO PAULO62070503***63041A2B";

  useEffect(() => {
    const formDataRaw = localStorage.getItem("checkoutFormData");
    const enderecoRaw = localStorage.getItem("enderecoData");
    const shippingRaw = localStorage.getItem("shippingData");

    if (!formDataRaw || !enderecoRaw || items.length === 0) return;

    // Evita criar pedido duplicado se já criou
    const existingOrderId = localStorage.getItem("currentOrderId");
    if (existingOrderId) {
      setOrderId(existingOrderId);
      const existingPixCode = localStorage.getItem("currentPixCode");
      if (existingPixCode) setRealPixCode(existingPixCode);
      return;
    }

    const formData = JSON.parse(formDataRaw);
    const enderecoData = JSON.parse(enderecoRaw);
    const { shippingType, shippingCost } = shippingRaw
      ? JSON.parse(shippingRaw)
      : { shippingType: "standard", shippingCost: 0 };

    setIsCreatingOrder(true);

    finalizarPedido({
      formData,
      enderecoData,
      cartItems: items,
      paymentMethod: "PIX",
      shippingCost,
      shippingType,
    })
      .then(({ orderId, pixCode }) => {
        setOrderId(orderId);
        if (pixCode) setRealPixCode(pixCode);
        // Salva pra não criar duplicado se recarregar
        localStorage.setItem("currentOrderId", orderId);
        if (pixCode) localStorage.setItem("currentPixCode", pixCode);
      })
      .catch(() => {
        toast.error("Erro ao criar pedido. Tente novamente.");
      })
      .finally(() => setIsCreatingOrder(false));
  }, [items]);

  const handleCopy = () => {
    navigator.clipboard.writeText(realPixCode ?? pixCodeFallback);
    setCopied(true);
    toast.success("Código Pix copiado!");
    setTimeout(() => setCopied(false), 3000);
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    clearCart();
    localStorage.removeItem("checkoutFormData");
    localStorage.removeItem("enderecoData");
    localStorage.removeItem("shippingData");
    localStorage.removeItem("currentOrderId");
    localStorage.removeItem("currentPixCode");
    setTimeout(() => {
      router.push(`/finalizacao?method=Pix&orderId=${orderId ?? ""}`);
    }, 2000);
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
          <h1 className="text-3xl font-bold mb-8 mt-6">Pagamento no Pix</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 md:p-8 rounded shadow-md">
                <div className="flex flex-col items-center justify-center py-6 space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Pague com Pix</h2>
                    <p className="text-gray-500">
                      Use o aplicativo do seu banco para pagar.
                    </p>
                  </div>

                  {isCreatingOrder && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Gerando seu pedido...</span>
                    </div>
                  )}

                  <div className="p-4 bg-[#F5FCFF] border border-gray-300 rounded flex flex-col items-center justify-center w-64 h-64 shadow-sm">
                    <QrCode
                      className="w-48 h-48 text-gray-800"
                      strokeWidth={1}
                    />
                  </div>

                  <div className="w-full max-w-md space-y-2">
                    <p className="text-sm font-semibold text-gray-700">
                      Código Copia e Cola:
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={realPixCode ?? pixCodeFallback}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded !bg-[#EEF9FF] text-gray-700 font-mono text-sm truncate"
                      />
                      <Button
                        variant="outline"
                        onClick={handleCopy}
                        className="flex-shrink-0"
                      >
                        {copied ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                        ) : (
                          <Copy className="w-4 h-4 mr-2" />
                        )}
                        {copied ? "Copiado" : "Copiar"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-amber-600 bg-amber-50 px-4 py-3 rounded-full font-medium">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Aguardando pagamento...
                  </div>

                  <div className="pt-6 w-full border-t border-gray-300/50 mt-6">
                    <Button
                      size="lg"
                      className="w-full bg-black hover:bg-gray-800 rounded text-white h-14 text-lg"
                      onClick={handleConfirm}
                      disabled={isConfirming || isCreatingOrder || !orderId}
                    >
                      {isConfirming ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        "Confirmar Pagamento (Simulação)"
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
