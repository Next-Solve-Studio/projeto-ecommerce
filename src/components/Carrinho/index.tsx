"use client";

import { Minus, Plus, ShoppingBag, ShoppingBasket, Trash2 } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { StepperCheckout } from "@/components/ui/stepper-checkout";
import { useCart } from "@/providers/CartProvider";

export default function CarrinhoComponent() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();

  const subtotal = getTotal();
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F2F3F4]">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center space-y-4">
            <ShoppingBag size={64} className="mx-auto text-gray-300" />
            <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
            <p className="text-gray-600">
              Adicione produtos para começar suas compras
            </p>
            <Link href="/produtos">
              <Button className="bg-black hover:bg-gray-800 hover:underline">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <StepperCheckout currentStep={1} />
      <div className="max-w-[1404px] mx-auto px-4 pb-8 pt-0">
        <h1 className="text-4xl font-bold mb-8">Carrinho de Compras</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <section className="w-full lg:w-[1116px] bg-white rounded shadow-sm p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <ShoppingBasket className="w-6 h-6" />
                <h2 className="text-2xl font-semibold">Produto</h2>
              </div>
              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 hover:bg-transparent bg-transparent border-none p-0 font-medium"
              >
                <Trash2 size={18} className="mr-2" />
                REMOVER TODOS OS PRODUTOS
              </Button>
            </div>
            
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${JSON.stringify(item.selectedVariants)}`}
                  className="flex gap-6 pb-6 border-b border-gray-400/30 last:border-0 last:pb-0"
                >
                  <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <Link
                        href={`/produtos/${item.product.id}`}
                        className="hover:underline"
                      >
                        <h3 className="text-xl font-semibold">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600">
                        {item.product.category}
                      </p>

                      {item.selectedVariants &&
                        Object.keys(item.selectedVariants).length > 0 && (
                          <div className="mt-2 space-y-1">
                            {Object.entries(item.selectedVariants).map(
                              ([type, value]) => (
                                <p key={type} className="text-sm text-gray-600">
                                  {type}:{" "}
                                  <span className="font-medium">{value}</span>
                                </p>
                              ),
                            )}
                          </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          <Plus size={16} />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold">
                          R${" "}
                          {(item.product.price * item.quantity).toLocaleString(
                            "pt-BR",
                            { minimumFractionDigits: 2 },
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          R${" "}
                          {item.product.price.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}{" "}
                          cada
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Remover
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full lg:w-[356px] flex-shrink-0 bg-white p-6 rounded shadow-sm sticky top-24 space-y-4 h-fit">
            <h2 className="text-2xl font-bold mb-4">Resumo do Pedido</h2>

              <div className="space-y-3 pb-4 border-b border-gray-400/30">
                <div className="flex justify-between text-gray-600">
                  <span>
                    Subtotal (
                    {items.reduce((sum, item) => sum + item.quantity, 0)} itens)
                  </span>
                  <span>
                    R${" "}
                    {subtotal.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span className="text-green-600 font-semibold">Grátis</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold pt-2">
                <span>Total</span>
                <span>
                  R${" "}
                  {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>

              <Link href="/checkout" className="block">
                <Button className="w-full h-12 bg-black hover:bg-gray-800 text-lg">
                  Finalizar Compra
                </Button>
              </Link>

              <Link href="/produtos">
                <Button variant="outline" className="w-full hover:underline">
                  Continuar Comprando
                </Button>
              </Link>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
                <p className="font-semibold mb-1">Frete Grátis!</p>
                <p>Entrega em até 7 dias úteis para todo o Brasil.</p>
              </div>
          </section>
        </div>
      </div>
    </div>
  );
}
