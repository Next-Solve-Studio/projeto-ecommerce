"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepperCheckout } from "@/components/ui/stepper-checkout";
import { frete } from "@/data/products";
import { useCart } from "@/providers/CartProvider";

const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  telefone: yup.string().required("Telefone é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
});

type CheckoutFormData = yup.InferType<typeof schema>;

export default function CheckoutComponent({ id }: { id?: string }) {
  const router = useRouter();
  const { getTotal, items } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const inputClassName = "!bg-[#EEF9FF] !rounded border border-gray-300";

  const onSubmit = (data: CheckoutFormData) => {
    localStorage.setItem("checkoutFormData", JSON.stringify(data));
    router.push("/entrega");
  };

  const subtotal = getTotal();
  const total = subtotal + frete;

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <div className="container mx-auto px-4 max-w-6xl pt-4 pb-2">
        <Link href="/carrinho">
          <Button
            variant="ghost"
            className="bg-transparent border-none text-gray-500 hover:bg-transparent hover:underline px-0 font-normal"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar ao carrinho
          </Button>
        </Link>
      </div>
      <StepperCheckout currentStep={2} />
      <div className="pb-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 mt-6">Dados Pessoais</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 md:p-8 rounded shadow-md">
                <form
                  id="checkout-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Dados Pessoais */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-300/50 pb-2">
                      Confira seus dados pessoais
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="nome">Nome Completo</Label>
                        <Input
                          id="nome"
                          className={inputClassName}
                          placeholder="João da Silva"
                          {...register("nome")}
                        />
                        {errors.nome && (
                          <p className="text-red-500 text-sm">
                            {errors.nome.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          className={inputClassName}
                          type="email"
                          placeholder="joao@exemplo.com"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          className={inputClassName}
                          placeholder="(11) 99999-9999"
                          {...register("telefone")}
                        />
                        {errors.telefone && (
                          <p className="text-red-500 text-sm">
                            {errors.telefone.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          className={inputClassName}
                          placeholder="000.000.000-00"
                          {...register("cpf")}
                        />
                        {errors.cpf && (
                          <p className="text-red-500 text-sm">
                            {errors.cpf.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#F5FCFF] rounded-lg border-gray-300 border-2 px-4 py-1 mt-6">
                    <span className="text-gray-700 text-sm">
                      Dados incorretos?
                    </span>
                    <Link href="/conta">
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-white border-gray-300 border-2 font-bold rounded w-full sm:w-auto hover:underline"
                      >
                        Altere seus dados no perfil
                      </Button>
                    </Link>
                  </div>
                </form>
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
                  {items.length > 3 && (
                    <p className="text-sm text-gray-500">
                      e mais {items.length - 3} item(ns)...
                    </p>
                  )}
                </div>
                <div className="border-t border-gray-300/50 pt-4 space-y-2">
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
                        frete === 0 ? "text-green-600 font-semibold" : ""
                      }
                    >
                      {frete === 0
                        ? "Grátis"
                        : `R$ ${frete.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total</span>
                    <span>
                      R${" "}
                      {total.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <Button
                  type="submit"
                  form="checkout-form"
                  size="lg"
                  className="w-full mt-6 bg-black hover:bg-gray-800 rounded text-white"
                >
                  Ir para a Entrega
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
