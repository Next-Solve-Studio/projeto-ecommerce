"use client";

import { Truck, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/providers/CartProvider";

export default function DeliveryPage() {
  const router = useRouter();
  const { getTotal, items } = useCart();
  const [shippingType, setShippingType] = useState("standard");

  const shippingCost = shippingType === "express" ? 35.9 : 0;
  const subtotal = getTotal();
  const total = subtotal + shippingCost;

  const handleNext = () => {
    // Navigate to default payment method (Pix)
    router.push("/checkout/pix");
  };

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-8">Opções de Entrega</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 md:p-8 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-6">
                  Escolha o tipo de entrega
                </h2>

                <RadioGroup
                  value={shippingType}
                  onValueChange={setShippingType}
                  className="space-y-4"
                >
                  {/* Standard Shipping */}
                  <div
                    className={`flex items-start space-x-3 border p-4 rounded-lg cursor-pointer transition-colors ${shippingType === "standard" ? "border-black bg-gray-50" : "hover:bg-gray-50"}`}
                    onClick={() => setShippingType("standard")}
                  >
                    <RadioGroupItem
                      value="standard"
                      id="standard"
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="standard"
                        className="text-base font-semibold cursor-pointer flex items-center gap-2"
                      >
                        <Truck className="w-5 h-5" />
                        Entrega Padrão
                      </Label>
                      <p className="text-gray-500 text-sm mt-1">
                        Receba em até 7 dias úteis.
                      </p>
                    </div>
                    <div className="font-semibold text-green-600">Grátis</div>
                  </div>

                  {/* Express Shipping */}
                  <div
                    className={`flex items-start space-x-3 border p-4 rounded-lg cursor-pointer transition-colors ${shippingType === "express" ? "border-black bg-gray-50" : "hover:bg-gray-50"}`}
                    onClick={() => setShippingType("express")}
                  >
                    <RadioGroupItem
                      value="express"
                      id="express"
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="express"
                        className="text-base font-semibold cursor-pointer flex items-center gap-2"
                      >
                        <Zap className="w-5 h-5 text-yellow-500" />
                        Entrega Expressa
                      </Label>
                      <p className="text-gray-500 text-sm mt-1">
                        Receba em até 2 dias úteis.
                      </p>
                    </div>
                    <div className="font-semibold">R$ 35,90</div>
                  </div>
                </RadioGroup>

                <div className="pt-8 flex justify-between items-center">
                  <Button
                    variant="ghost"
                    onClick={() => router.push("/checkout")}
                  >
                    Voltar
                  </Button>
                  <Button
                    size="lg"
                    className="bg-black hover:bg-gray-800 text-white px-8"
                    onClick={handleNext}
                  >
                    Ir para o Pagamento
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg border sticky top-24 shadow-sm">
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
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>
                      R${" "}
                      {subtotal.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span
                      className={
                        shippingCost === 0 ? "text-green-600 font-semibold" : ""
                      }
                    >
                      {shippingCost === 0
                        ? "Grátis"
                        : `R$ ${shippingCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
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
