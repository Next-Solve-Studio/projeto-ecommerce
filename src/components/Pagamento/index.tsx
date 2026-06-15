"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronLeft, CreditCard, QrCode } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepperCheckout } from "@/components/ui/stepper-checkout";
import { useCart } from "@/providers/CartProvider";

const schema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("Número do cartão é obrigatório")
    .matches(/^[0-9\s]{19}$/, "Formato inválido. Use 0000 0000 0000 0000"),
  cardName: yup.string().required("Nome é obrigatório"),
  expiry: yup
    .string()
    .required("Validade é obrigatória")
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Use MM/AA"),
  cvv: yup
    .string()
    .required("CVV é obrigatório")
    .matches(/^[0-9]{3,4}$/, "CVV inválido"),
  installments: yup.string().required("Selecione as parcelas"),
});

type CreditCardFormData = yup.InferType<typeof schema>;

export default function PagamentoPageComponent() {
  const router = useRouter();
  const { getTotal, items } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [shippingCost, setShippingCost] = useState(0);
  const [cardFunction, setCardFunction] = useState("credito");

  useEffect(() => {
    const shippingRaw = localStorage.getItem("shippingData");
    if (shippingRaw) {
      try {
        const { shippingCost } = JSON.parse(shippingRaw);
        setShippingCost(shippingCost);
      } catch (error) {
        console.error("Erro ao carregar os dados de frete:", error);
      }
    }
  }, []);

  const subtotal = getTotal();
  const total = subtotal + shippingCost;

  const inputClassName = "!bg-[#EEF9FF] !rounded border border-gray-300";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreditCardFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      installments: "1",
    },
  });

  const onSubmit = (data?: CreditCardFormData) => {
    if (paymentMethod === "pix") {
      router.push("/pagamento/pix");
    } else if (paymentMethod === "cartao") {
      if (data) {
        localStorage.setItem("creditCardData", JSON.stringify(data));
      }
      router.push("/pagamento/cartao");
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{4})/g, "$1 ").trim();
    if (value.length > 19) value = value.substring(0, 19);
    setValue("cardNumber", value, { shouldValidate: true });
    e.target.value = value;
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setValue("expiry", value, { shouldValidate: true });
    e.target.value = value;
  };

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <div className="container mx-auto px-4 max-w-6xl pt-4 pb-2">
        <Link href="/entrega">
          <Button
            variant="ghost"
            className="bg-transparent border-none text-gray-500 hover:bg-transparent hover:underline px-0 font-normal"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar para Entrega
          </Button>
        </Link>
      </div>
      <StepperCheckout currentStep={4} />
      <div className="pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 mt-6">Opções de Pagamento</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 md:p-8 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4 border-b border-gray-300/50 pb-2">
                  Escolha o método de pagamento
                </h2>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-2 mb-8"
                >
                  <Label
                    htmlFor="pix"
                    className={`flex items-center space-x-3 border-2 shadow-md p-4 rounded cursor-pointer transition-colors ${paymentMethod === "pix" ? "border-[#0597F2] bg-[#F5FCFF]" : "border-gray-300 hover:bg-gray-50"}`}
                  >
                    <RadioGroupItem value="pix" id="pix" className="mt-1 bg-white border-2 border-gray-400 data-[state=checked]:border-[#0597F2] data-[state=checked]:text-[#0597F2]"/>
                    <QrCode className="w-5 h-5 text-gray-700" />
                    <span className="font-medium text-base">Pix</span>
                  </Label>

                  <Label
                    htmlFor="cartao"
                    className={`flex items-center space-x-3 border-2 shadow-md p-4 rounded cursor-pointer transition-colors ${paymentMethod === "cartao" ? "border-[#0597F2] bg-[#F5FCFF]" : "border-gray-300 hover:bg-gray-50"}`}
                  >
                    <RadioGroupItem value="cartao" id="cartao" className="mt-1 bg-white border-2 border-gray-400 data-[state=checked]:border-[#0597F2] data-[state=checked]:text-[#0597F2]"/>
                    <CreditCard className="w-5 h-5 text-gray-700" />
                    <span className="font-medium text-base">Cartão de Crédito</span>
                  </Label>
                </RadioGroup>

                {paymentMethod === "cartao" && (
                  <div className="mt-6 border-t border-gray-300/50 pt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h3 className="text-lg font-semibold mb-4">Dados do Cartão</h3>
                    <form id="payment-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Número do Cartão</Label>
                          <Input
                            id="cardNumber"
                            className={inputClassName}
                            placeholder="0000 0000 0000 0000"
                            {...register("cardNumber")}
                            onChange={(e) => {
                              register("cardNumber").onChange(e);
                              handleCardNumberChange(e);
                            }}
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-sm">
                              {errors.cardNumber.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nome Impresso no Cartão</Label>
                          <Input
                            id="cardName"
                            placeholder="JOAO M SILVA"
                            className={`${inputClassName} uppercase`}
                            {...register("cardName")}
                          />
                          {errors.cardName && (
                            <p className="text-red-500 text-sm">
                              {errors.cardName.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Validade</Label>
                            <Input
                              id="expiry"
                              className={inputClassName}
                              placeholder="MM/AA"
                              {...register("expiry")}
                              onChange={(e) => {
                                register("expiry").onChange(e);
                                handleExpiryChange(e);
                              }}
                            />
                            {errors.expiry && (
                              <p className="text-red-500 text-sm">
                                {errors.expiry.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              className={inputClassName}
                              placeholder="123"
                              maxLength={4}
                              {...register("cvv")}
                            />
                            {errors.cvv && (
                              <p className="text-red-500 text-sm">
                                {errors.cvv.message}
                              </p>
                            )}
                          </div>
                        </div>

                  <div className="space-y-4 mt-2">
                    <Label>Forma de pagamento no Cartão</Label>
                    <RadioGroup
                      value={cardFunction}
                      onValueChange={setCardFunction}
                      className="flex space-x-4"
                    >
                      <Label
                        htmlFor="debito"
                        className={`flex-1 flex items-center space-x-3 border-2 shadow-md p-4 rounded cursor-pointer transition-colors ${cardFunction === "debito" ? "border-[#0597F2] bg-[#F5FCFF]" : "border-gray-300 hover:bg-gray-50"}`}
                      >
                        <RadioGroupItem value="debito" id="debito" className="mt-1 bg-white border-2 border-gray-400 data-[state=checked]:border-[#0597F2] data-[state=checked]:text-[#0597F2]"/>
                        <span className="font-medium text-base">Débito</span>
                      </Label>

                      <Label
                        htmlFor="credito"
                        className={`flex-1 flex items-center space-x-3 border-2 shadow-md p-4 rounded cursor-pointer transition-colors ${cardFunction === "credito" ? "border-[#0597F2] bg-[#F5FCFF]" : "border-gray-300 hover:bg-gray-50"}`}
                      >
                        <RadioGroupItem value="credito" id="credito" className="mt-1 bg-white border-2 border-gray-400 data-[state=checked]:border-[#0597F2] data-[state=checked]:text-[#0597F2]"/>
                        <span className="font-medium text-base">Crédito</span>
                      </Label>
                    </RadioGroup>
                  </div>

                  {cardFunction === "credito" && (
                    <div className="space-y-2 mt-4 animate-in fade-in duration-300">
                      <Label htmlFor="installments">Parcelamento</Label>
                      <Select
                        onValueChange={(val) =>
                          setValue("installments", val, {
                            shouldValidate: true,
                          })
                        }
                        defaultValue="1"
                      >
                        <SelectTrigger className={inputClassName}>
                          <SelectValue placeholder="Selecione as parcelas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">
                            1x de R${" "}
                            {total.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            sem juros
                          </SelectItem>
                          <SelectItem value="2">
                            2x de R$ {((total) / 2).toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })} sem juros
                          </SelectItem>
                          <SelectItem value="3">
                            3x de R$ {((total) / 3).toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })} sem juros
                          </SelectItem>
                          <SelectItem value="4">
                            4x de R$ {((total) / 4).toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })} sem juros
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.installments && (
                        <p className="text-red-500 text-sm">
                          {errors.installments.message}
                        </p>
                      )}
                    </div>
                  )}
                      </div>
                    </form>
                  </div>
                )}
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
                  <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-gray-300/50">
                    <span>Total</span>
                    <span>
                      R${" "}
                      {total.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <Button
                    type={paymentMethod === "cartao" ? "submit" : "button"}
                    form={paymentMethod === "cartao" ? "payment-form" : undefined}
                    onClick={paymentMethod === "cartao" ? undefined : () => onSubmit()}
                    size="lg"
                    className="w-full mt-6 bg-black hover:bg-gray-800 rounded text-white"
                  >
                    Avançar para Confirmação
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
