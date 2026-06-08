"use client";

import { Truck, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/providers/CartProvider";
import { StepperCheckout } from "@/components/ui/stepper-checkout";
import { frete, frete_express } from "@/data/products";

const schema = yup.object().shape({
  cep: yup.string().required("CEP é obrigatório"),
  endereco: yup.string().required("Endereço é obrigatório"),
  numero: yup.string().required("Número é obrigatório"),
  complemento: yup.string().optional(),
  bairro: yup.string().required("Bairro é obrigatório"),
  cidade: yup.string().required("Cidade é obrigatória"),
  estado: yup
    .string()
    .required("Estado é obrigatório")
    .length(2, "Apenas a sigla (ex: SP)"),
});

type DeliveryFormData = yup.InferType<typeof schema>;

export default function DeliveryPageComponent() {
  const router = useRouter();
  const { getTotal, items } = useCart();
  const [shippingType, setShippingType] = useState("standard");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const inputClassName = "!bg-[#EEF9FF] !rounded border border-gray-300";
  const shippingCost = shippingType === "express" ? frete_express : frete;
  const subtotal = getTotal();
  const total = subtotal + shippingCost;

  const onSubmit = (data: DeliveryFormData) => {
    // Navigate to default payment method (Pix)
    console.log("Endereço:", data, "Frete:", shippingType);
    router.push("/checkout/pix");
  };

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <StepperCheckout currentStep={3} />
      <div className="pb-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-8">Opções de Entrega</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 md:p-8 rounded shadow-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Endereço */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-300/50 pb-2">
                      Endereço de Entrega
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="space-y-2 md:col-span-4">
                        <Label htmlFor="cep">CEP</Label>
                        <Input
                          id="cep"
                          className={inputClassName}
                          placeholder="00000-000"
                          {...register("cep")}
                        />
                        {errors.cep && (
                          <p className="text-red-500 text-sm">
                            {errors.cep.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-8">
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input
                          id="endereco"
                          className={inputClassName}
                          placeholder="Rua, Avenida, etc."
                          {...register("endereco")}
                        />
                        {errors.endereco && (
                          <p className="text-red-500 text-sm">
                            {errors.endereco.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-3">
                        <Label htmlFor="numero">Número</Label>
                        <Input
                          id="numero"
                          className={inputClassName}
                          placeholder="123"
                          {...register("numero")}
                        />
                        {errors.numero && (
                          <p className="text-red-500 text-sm">
                            {errors.numero.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-9">
                        <Label htmlFor="complemento">
                          Complemento{" "}
                          <span className="text-gray-400 font-normal">
                            (Opcional)
                          </span>
                        </Label>
                        <Input
                          id="complemento"
                          className={inputClassName}
                          placeholder="Apto, Bloco, etc."
                          {...register("complemento")}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-5">
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input
                          id="bairro"
                          className={inputClassName}
                          placeholder="Centro"
                          {...register("bairro")}
                        />
                        {errors.bairro && (
                          <p className="text-red-500 text-sm">
                            {errors.bairro.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-5">
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input
                          id="cidade"
                          className={inputClassName}
                          placeholder="São Paulo"
                          {...register("cidade")}
                        />
                        {errors.cidade && (
                          <p className="text-red-500 text-sm">
                            {errors.cidade.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="estado">Estado</Label>
                        <Input
                          id="estado"
                          className={`${inputClassName} uppercase`}
                          placeholder="SP"
                          maxLength={2}
                          {...register("estado")}
                        />
                        {errors.estado && (
                          <p className="text-red-500 text-sm">
                            {errors.estado.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mb-6 border-b border-gray-300/50 pb-2">
                    Escolha o tipo de entrega
                  </h2>

                  <RadioGroup
                    value={shippingType}
                    onValueChange={setShippingType}
                    className="space-y-4"
                  >
                    <Label
                      htmlFor="standard"
                      className={`flex items-start space-x-3 border-2 shadow-md p-4 rounded cursor-pointer transition-colors ${shippingType === "standard" ? "border-[#0597F2] bg-[#F5FCFF]" : "border-gray-300 hover:bg-gray-50"}`}
                    >
                      <RadioGroupItem
                        value="standard"
                        id="standard"
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="text-base font-semibold flex items-center gap-2">
                          <Truck className="w-5 h-5" />
                          Entrega Padrão
                        </div>
                        <p className="text-gray-500 text-sm mt-1">
                          Receba em até 7 dias úteis.
                        </p>
                      </div>
                      <div className={`font-semibold ${frete === 0 ? "text-green-600" : ""}`}>
                        {frete === 0 ? "Grátis" : `R$ ${frete.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                      </div>
                    </Label>

                    <Label
                      htmlFor="express"
                      className={`flex items-start space-x-3 border-2 shadow-md p-4 rounded cursor-pointer transition-colors ${shippingType === "express" ? "border-[#0597F2] bg-[#F5FCFF]" : "border-gray-300 hover:bg-gray-50"}`}
                    >
                      <RadioGroupItem
                        value="express"
                        id="express"
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="text-base font-semibold flex items-center gap-2">
                          <Zap className="w-5 h-5 text-yellow-500" />
                          Entrega Expressa
                        </div>
                        <p className="text-gray-500 text-sm mt-1">
                          Receba em até 2 dias úteis.
                        </p>
                      </div>
                      <div className="font-semibold">
                        R$ {frete_express.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                    </Label>
                  </RadioGroup>

                  <div className="pt-8 flex items-right justify-end">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-black hover:bg-gray-800 text-white px-8"
                    >
                      Ir para o Pagamento
                    </Button>
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
                </div>
                <div className="border-t border-gray-300/50 pt-4 space-y-3">
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
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-300/50 mt-2">
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
