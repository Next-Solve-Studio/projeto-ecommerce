"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { CreditCard, Loader2, QrCode } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function CreditCardPaymentPage() {
  const router = useRouter();
  const { getTotal, items } = useCart();
  const [isConfirming, setIsConfirming] = useState(false);

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

  const subtotal = getTotal();
  const total = subtotal;

  const onSubmit = (data: CreditCardFormData) => {
    setIsConfirming(true);
    setTimeout(() => {
      router.push(
        `/finalizacao?method=${encodeURIComponent("Cartão de Crédito")}&installments=${encodeURIComponent(data.installments)}`,
      );
    }, 2000);
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
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-8">Pagamento</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 md:p-8 rounded-lg border shadow-sm">
                {/* Payment Methods Tabs */}
                <div className="flex space-x-4 border-b pb-4 mb-6">
                  <Link
                    href="/checkout/pix"
                    className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-black transition-colors"
                  >
                    <QrCode className="w-5 h-5" />
                    Pix
                  </Link>
                  <Link
                    href="/checkout/cartao"
                    className="flex items-center gap-2 px-4 py-2 border-b-2 border-black font-semibold text-black"
                  >
                    <CreditCard className="w-5 h-5" />
                    Cartão de Crédito
                  </Link>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6 max-w-lg mx-auto py-4"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input
                        id="cardNumber"
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
                        className="uppercase"
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

                    <div className="space-y-2">
                      <Label htmlFor="installments">Parcelamento</Label>
                      <Select
                        onValueChange={(val) =>
                          setValue("installments", val, {
                            shouldValidate: true,
                          })
                        }
                        defaultValue="1"
                      >
                        <SelectTrigger>
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
                            2x de R${" "}
                            {(total / 2).toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            sem juros
                          </SelectItem>
                          <SelectItem value="3">
                            3x de R${" "}
                            {(total / 3).toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            sem juros
                          </SelectItem>
                          <SelectItem value="4">
                            4x de R${" "}
                            {(total / 4).toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            sem juros
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.installments && (
                        <p className="text-red-500 text-sm">
                          {errors.installments.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 w-full border-t">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-black hover:bg-gray-800 text-white h-14 text-lg"
                      disabled={isConfirming}
                    >
                      {isConfirming ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        "Finalizar Compra"
                      )}
                    </Button>
                  </div>
                </form>
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
                  <div className="flex justify-between font-bold text-xl pt-2">
                    <span>Total</span>
                    <span>
                      R${" "}
                      {total.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => router.push("/entrega")}
                  >
                    Voltar para Entrega
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
