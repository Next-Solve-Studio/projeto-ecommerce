import { prisma } from "@/lib/prisma";
import { getAdminUser, createJsonResponse } from "@/lib/admin";

export async function GET() {
  await getAdminUser();

  const orders = await prisma.order.findMany({
    include: {
      user: true,
      address: true,
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return createJsonResponse({ orders });
}

export async function PATCH(req: Request) {
  await getAdminUser();

  const body = await req.json();
  const { id, status } = body;

  if (!id || !status) {
    return createJsonResponse({ error: "Order id and status are required" }, 400);
  }

  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });

  return createJsonResponse({ order });
}
