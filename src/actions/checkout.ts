"use server";

import { prisma } from "@/lib/prisma";

// Dados pessoais
export type CheckoutFormData = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
};

// Dados de endereço
export type EnderecoFormData = {
  cep: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export type CartItemInput = {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
  selectedVariants?: Record<string, string>;
};

type FinalizarPedidoInput = {
  formData: CheckoutFormData;
  enderecoData: EnderecoFormData;
  cartItems: CartItemInput[];
  paymentMethod: "PIX" | "CREDIT_CARD";
  shippingCost: number;
  shippingType: string;
};

function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `PED-${ts}-${rand}`;
}

function generatePixCode(total: number, orderNumber: string): string {
  const valor = total.toFixed(2);
  const len = valor.length.toString().padStart(2, "0");
  return `00020126580014BR.GOV.BCB.PIX013600020126${orderNumber}5204000053039865${len}${valor}5802BR5913LojaVirtual6009FORTALEZA6304ABCD`;
}

export async function finalizarPedido(input: FinalizarPedidoInput) {
  const {
    formData,
    enderecoData,
    cartItems,
    paymentMethod,
    shippingCost,
    shippingType,
  } = input;

  const user = await prisma.user.upsert({
    where: { email: formData.email },
    update: { name: formData.nome, phone: formData.telefone },
    create: {
      name: formData.nome,
      email: formData.email,
      cpf: formData.cpf.replace(/\D/g, ""),
      phone: formData.telefone,
    },
  });

  const address = await prisma.address.create({
    data: {
      userId: user.id,
      cep: enderecoData.cep.replace(/\D/g, ""),
      street: enderecoData.endereco,
      number: enderecoData.numero,
      complement: enderecoData.complemento ?? null,
      neighborhood: enderecoData.bairro,
      city: enderecoData.cidade,
      state: enderecoData.estado.toUpperCase(),
    },
  });

  const itemsTotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const totalAmount = itemsTotal + shippingCost;

  const orderNumber = generateOrderNumber();
  const pixCode =
    paymentMethod === "PIX" ? generatePixCode(totalAmount, orderNumber) : null;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId: user.id,
      addressId: address.id,
      totalAmount,
      shippingCost,
      shippingType,
      paymentMethod,
      pixCode,
      items: {
        create: cartItems.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          variantInfo: item.selectedVariants
            ? Object.entries(item.selectedVariants)
                .map(([k, v]) => `${k}: ${v}`)
                .join(", ")
            : null,
          quantity: item.quantity,
          unitPrice: item.product.price,
        })),
      },
    },
    include: { items: true, address: true, user: true },
  });

  return {
    orderId: order.id,
    orderNumber: order.orderNumber,
    pixCode: order.pixCode,
    total: order.totalAmount,
  };
}

export async function getOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, address: true, user: true },
  });
}

export async function getOrdersByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      orders: {
        include: { items: true, address: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  return user?.orders ?? [];
}
