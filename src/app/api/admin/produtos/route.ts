import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser, createJsonResponse } from "@/lib/admin";

export async function GET() {
  await getAdminUser();

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });

  return createJsonResponse({ products });
}

export async function POST(req: NextRequest) {
  await getAdminUser();

  const body = await req.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug: body.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, ""),
      price: Number(body.price),
      stockQty: Number(body.stockQty),
      description: body.description || "",
      imageUrl: body.imageUrl || "",
      featured: Boolean(body.featured),
      category: {
        connectOrCreate: {
          where: { name: body.category ?? "Eletrônicos" },
          create: { name: body.category ?? "Eletrônicos", slug: (body.category ?? "Eletrônicos").toLowerCase().replace(/\s+/g, "-") },
        },
      },
    },
  });

  return createJsonResponse({ product }, 201);
}

export async function PUT(req: NextRequest) {
  await getAdminUser();

  const id = req.nextUrl.searchParams.get("id");
  const body = await req.json();

  if (!id) {
    return createJsonResponse({ error: "Product id is required" }, 400);
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      price: Number(body.price),
      stockQty: Number(body.stockQty),
      description: body.description || "",
      imageUrl: body.imageUrl || "",
      featured: Boolean(body.featured),
      category: {
        connectOrCreate: {
          where: { name: body.category ?? "Eletrônicos" },
          create: { name: body.category ?? "Eletrônicos", slug: (body.category ?? "Eletrônicos").toLowerCase().replace(/\s+/g, "-") },
        },
      },
    },
    include: { category: true },
  });

  return createJsonResponse({ product });
}

export async function DELETE(req: NextRequest) {
  await getAdminUser();

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return createJsonResponse({ error: "Product id is required" }, 400);
  }

  await prisma.product.delete({ where: { id } });
  return createJsonResponse({ success: true });
}
