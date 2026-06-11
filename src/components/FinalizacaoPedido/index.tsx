"use client";

export const dynamic = "force-dynamic";

import { CheckCircle2, CreditCard, Package, Truck, User } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { getOrderById } from "@/actions/checkout";

function FinalizacaoPageComponentContent() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get("method") || "Pix";
  const installments = searchParams.get("installments") || "1";
  const orderId = searchParams.get("orderId");

  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId)
        .then(setOrderData)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white p-8 md:p-12 rounded-lg border shadow-sm text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold mb-2">Pedido Confirmado!</h1>
            <p className="text-gray-500 mb-8">
              Obrigado por comprar conosco. Seu pedido foi recebido e está sendo
              processado.
            </p>

            <div className="inline-block bg-gray-50 border px-6 py-3 rounded-lg mb-8">
              <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                Número do Pedido
              </p>
              <p className="text-2xl font-bold font-mono text-black">
                {loading
                  ? "Carregando..."
                  : orderData?.orderNumber
                  ? `#${orderData.orderNumber}`
                  : "#UX-12345"}
              </p>
            </div>

            <div className="text-left bg-gray-50 rounded-lg p-6 mb-8 border space-y-6">
              <div className="flex items-center gap-2 mb-4 border-b pb-2">
                <Package className="w-5 h-5 text-gray-400" />
                <h3 className="font-semibold text-lg">Status</h3>
              </div>
              <p className="text-green-700 font-semibold bg-green-100 inline-block px-3 py-1 rounded-full text-sm">
                Aprovado / Processando
              </p>

              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t mt-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <h4 className="font-semibold">Itens Comprados</h4>
                  </div>
                  <div className="space-y-1 mb-4">
                    {orderData?.items && orderData.items.length > 0 ? (
                      orderData.items.map((item: any, idx: number) => (
                        <p key={idx} className="text-sm text-gray-600 line-clamp-1">
                          {item.quantity}x {item.productName}
                          {item.variantInfo && (
                            <span className="text-gray-400"> ({item.variantInfo})</span>
                          )}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600">
                        Notebook e Smartphone (Exemplo)
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <h4 className="font-semibold">Dados do Cliente</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    {orderData?.user?.name ?? "João da Silva"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {orderData?.user?.email ?? "joao@exemplo.com"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {orderData?.user?.phone ?? "(11) 99999-9999"}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-gray-400" />
                    <h4 className="font-semibold">Endereço de Entrega</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {orderData?.address ? (
                      <>
                        {orderData.address.street}, {orderData.address.number}
                        {orderData.address.complement && ` - ${orderData.address.complement}`}
                        <br />
                        {orderData.address.neighborhood} - {orderData.address.city}, {orderData.address.state}
                        <br />
                        CEP: {orderData.address.cep}
                      </>
                    ) : (
                      <>
                        Rua Exemplo, 123
                        <br />
                        Centro - São Paulo, SP
                        <br />
                        CEP: 00000-000
                      </>
                    )}
                  </p>

                  <div className="flex items-center gap-2 mb-2 border-t pt-4">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <h4 className="font-semibold">Pagamento</h4>
                  </div>
                  <p className="text-sm text-gray-600">{paymentMethod}</p>
                  {paymentMethod === "Cartão de Crédito" && (
                    <p className="text-sm text-gray-600">
                      {installments}x sem juros
                    </p>
                  )}
                  <p className="text-sm font-bold mt-1 text-black">
                    Total: R${" "}
                    {orderData?.totalAmount
                      ? orderData.totalAmount.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })
                      : "1.299,00"}
                  </p>
                </div>
              </div>
            </div>

            <Link href="/">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8"
              >
                Voltar para a Loja
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FinalizacaoPageComponent() {
  return (
    <Suspense fallback={null}>
      <FinalizacaoPageComponentContent />
    </Suspense>
  );
}