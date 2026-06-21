"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function toggleFavorite(productId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Não autenticado" };

  const existing = await prisma.favorite.findUnique({
    where: { userId_productId: { userId: session.user.id, productId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return { favorited: false };
  }

  await prisma.favorite.create({
    data: { userId: session.user.id, productId },
  });
  return { favorited: true };
}

export async function getMyFavorites() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: { product: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function isFavorited(productId: string) {
  const session = await auth();
  if (!session?.user?.id) return false;

  const fav = await prisma.favorite.findUnique({
    where: { userId_productId: { userId: session.user.id, productId } },
  });
  return !!fav;
}