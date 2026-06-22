"use client";

import { CreditCard, Home, Package, Truck } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  size: string;
  color: string;
  unitPrice: number;
  totalPrice: number;
};

type Address = {
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
};

type Order = {
  id: string;
  orderCode: string;
  date: string;
  status: string;
  deliveryType: string;
  paymentMethod: string;
  total: number;
  items: OrderItem[];
  address: Address;
  subtotal: number;
  shippingCost: number;
};

{/* Mock de dados para pedidos */}
const orders: Order[] = [
  {
    id: "1",
    orderCode: "PED-MQOOIHYT-CMD",
    date: "1 de jun. de 2026, 11:48",
    status: "Em produção",
    deliveryType: "Entrega em domicílio",
    paymentMethod: "PIX",
    total: 47.4,
    items: [
      {
        id: "item-1",
        name: "Suporte para notebook",
        quantity: 1,
        size: "Único",
        color: "Branca",
        unitPrice: 34.9,
        totalPrice: 34.9,
      },
    ],
    address: {
      street: "Rua das Flores, 123",
      complement: "Apto 4B",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      cep: "01234-567",
    },
    subtotal: 32.4,
    shippingCost: 15.0,
  },
];

function OrderCard({ order }: { order: Order }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-4">
        <div>
          <p className="font-bold text-slate-800">Pedido {order.orderCode}</p>
          <p className="text-sm text-slate-500">{order.date}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
            {order.status}
          </span>
          <Button variant="outline" size="sm">
            Confirmar entrega
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-3">
        <div className="bg-blue-50/50 p-4">
          <p className="text-xs font-bold uppercase text-slate-500">Entrega</p>
          <p className="font-bold text-slate-800">{order.deliveryType}</p>
        </div>
        <div className="bg-blue-50/50 p-4">
          <p className="text-xs font-bold uppercase text-slate-500">Pagamento</p>
          <p className="font-bold text-slate-800">{order.paymentMethod}</p>
        </div>
        <div className="bg-blue-50/50 p-4">
          <p className="text-xs font-bold uppercase text-slate-500">Total</p>
          <p className="font-bold text-blue-600">
            {order.total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Package size={16} className="text-slate-500" />
            <h3 className="text-sm font-bold uppercase text-slate-500">
              Itens do Pedido
            </h3>
          </div>
          <ul className="space-y-4">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-slate-800">{item.name}</p>
                  <p className="text-sm text-slate-500">
                    {item.quantity}x • {item.size} • {item.color} •{" "}
                    {item.unitPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
                <p className="font-bold text-slate-800">
                  {item.totalPrice.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-blue-50/50 p-6">
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <Truck size={16} className="text-slate-500" />
              <h4 className="text-sm font-bold uppercase text-slate-500">
                Informações de Entrega
              </h4>
            </div>
            <p className="text-sm text-slate-600">
              <span className="font-bold text-slate-800">Endereço:</span> {order.address.street}
              <br />
              <span className="font-bold text-slate-800">Complemento:</span> {order.address.complement}
              <br />
              <span className="font-bold text-slate-800">Bairro:</span> {order.address.neighborhood}
              <br />
              <span className="font-bold text-slate-800">Cidade/UF:</span> {order.address.city}/{order.address.state}
              <br />
              <span className="font-bold text-slate-800">CEP:</span> {order.address.cep}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPageComponent() {
  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase text-slate-500">MEUS PEDIDOS</p>
          <h1 className="text-4xl font-bold text-slate-900">Histórico de compras</h1>
          <p className="mt-2 text-slate-600">
            Aqui você vê todos os pedidos realizados e pode confirmar entrega quando o pedido chegar.
          </p>
        </div>
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
