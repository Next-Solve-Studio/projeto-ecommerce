"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronLeft, Truck, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { buscarCep } from "@/actions/cep";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StepperCheckout } from "@/components/ui/stepper-checkout";
import { frete, frete_express } from "@/data/products";
import { useCart } from "@/providers/CartProvider";

const schema = yup.object().shape({
  cep: yup.string().required("CEP é obrigatório").length(9, "CEP incompleto"),
  endereco: yup
    .string()
    .required("Endereço é obrigatório")
    .max(70, "Máximo de 70 caracteres"),
  numero: yup
    .string()
    .required("Número é obrigatório")
    .max(5, "Máximo de 5 dígitos"),
  complemento: yup.string().max(40, "Máximo de 40 caracteres").optional(),
  bairro: yup
    .string()
    .required("Bairro é obrigatório")
    .max(12, "Máximo de 12 caracteres"),
  cidade: yup
    .string()
    .required("Cidade é obrigatória")
    .max(32, "Máximo de 32 caracteres"),
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
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCepBlur = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;
    const data = await buscarCep(cepLimpo);
    if (!("error" in data)) {
      setValue("endereco", data.endereco);
      setValue("bairro", data.bairro);
      setValue("cidade", data.cidade);
      setValue("estado", data.estado);
    }
  };

  const inputClassName = "!bg-[#EEF9FF] !rounded border border-gray-300";
  const shippingCost = shippingType === "express" ? frete_express : frete;
  const subtotal = getTotal();
  const total = subtotal + shippingCost;

  const cepRegister = register("cep");
  const enderecoRegister = register("endereco");
  const numeroRegister = register("numero");
  const complementoRegister = register("complemento");
  const bairroRegister = register("bairro");
  const cidadeRegister = register("cidade");
  const estadoRegister = register("estado");

  const onSubmit = (data: DeliveryFormData) => {
    //Pagamento via pix
    localStorage.setItem("enderecoData", JSON.stringify(data));
    localStorage.setItem(
      "shippingData",
      JSON.stringify({ shippingType, shippingCost }),
    );
    router.push("/checkout/pix");
  };

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <div className="container mx-auto px-4 max-w-6xl pt-4 pb-2">
        <Link href="/checkout">
          <Button
            variant="ghost"
            className="bg-transparent border-none text-gray-500 hover:bg-transparent hover:underline px-0 font-normal"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar aos dados pessoais
          </Button>
        </Link>
      </div>
      <StepperCheckout currentStep={3} />
      <div className="pb-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 mt-6">Opções de Entrega</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 md:p-8 rounded shadow-md">
                <form id="entrega-form" onSubmit={handleSubmit(onSubmit)}>
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
                          maxLength={9}
                          {...cepRegister}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length > 8) value = value.substring(0, 8);
                            if (value.length > 5) {
                              value =
                                value.substring(0, 5) +
                                "-" +
                                value.substring(5);
                            }
                            e.target.value = value;
                            cepRegister.onChange(e);
                          }}
                          onBlur={(e) => handleCepBlur(e.target.value)}
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
                          maxLength={70}
                          {...enderecoRegister}
                          onChange={(e) => {
                            e.target.value = e.target.value
                              .replace(/[^a-zA-Z0-9\s,À-ÿ]/g, "")
                              .substring(0, 70);
                            enderecoRegister.onChange(e);
                          }}
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
                          maxLength={5}
                          {...numeroRegister}
                          onChange={(e) => {
                            e.target.value = e.target.value
                              .replace(/\D/g, "")
                              .substring(0, 5);
                            numeroRegister.onChange(e);
                          }}
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
                          maxLength={40}
                          {...complementoRegister}
                          onChange={(e) => {
                            e.target.value = e.target.value
                              .replace(/[^a-zA-Z0-9\s,À-ÿ]/g, "")
                              .substring(0, 40);
                            complementoRegister.onChange(e);
                          }}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-5">
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input
                          id="bairro"
                          className={inputClassName}
                          placeholder="Centro"
                          maxLength={12}
                          {...bairroRegister}
                          onChange={(e) => {
                            e.target.value = e.target.value
                              .replace(/[^a-zA-Z\sÀ-ÿ]/g, "")
                              .substring(0, 12);
                            bairroRegister.onChange(e);
                          }}
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
                          maxLength={32}
                          {...cidadeRegister}
                          onChange={(e) => {
                            e.target.value = e.target.value
                              .replace(/[^a-zA-Z\sÀ-ÿ]/g, "")
                              .substring(0, 32);
                            cidadeRegister.onChange(e);
                          }}
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
                          {...estadoRegister}
                          onChange={(e) => {
                            e.target.value = e.target.value
                              .replace(/[^a-zA-Z]/g, "")
                              .toUpperCase()
                              .substring(0, 2);
                            estadoRegister.onChange(e);
                          }}
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
                        className="mt-1 bg-white border-2 border-gray-400 data-[state=checked]:border-[#0597F2] data-[state=checked]:text-[#0597F2]"
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
                      <div
                        className={`font-semibold ${frete === 0 ? "text-green-600" : ""}`}
                      >
                        {frete === 0
                          ? "Grátis"
                          : `R$ ${frete.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                      </div>
                    </Label>

                    <Label
                      htmlFor="express"
                      className={`flex items-start space-x-3 border-2 shadow-md p-4 rounded cursor-pointer transition-colors ${shippingType === "express" ? "border-[#0597F2] bg-[#F5FCFF]" : "border-gray-300 hover:bg-gray-50"}`}
                    >
                      <RadioGroupItem
                        value="express"
                        id="express"
                        className="mt-1 bg-white border-2 border-gray-400 data-[state=checked]:border-[#0597F2] data-[state=checked]:text-[#0597F2]"
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
                        R${" "}
                        {frete_express.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                    </Label>
                  </RadioGroup>
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
                  <Button
                    type="submit"
                    form="entrega-form"
                    size="lg"
                    className="w-full mt-6 bg-black hover:bg-gray-800 rounded text-white"
                  >
                    Ir para o Pagamento
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
