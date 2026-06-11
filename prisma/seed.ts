import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { products, categories } from "../src/data/products";

const adapter = new PrismaPg({ 
  connectionString: process.env["DATABASE_URL"] 
});
const prisma = new PrismaClient({ adapter });
const variantPriceModifiers: Record<string, Record<string, number>> = {
  Iluminação: {
    RGB: 150,
    Branco: 40,
    "Mono Branco": 40,
    "Sem Iluminação": 0,
  },
  "Taxa de Atualização": {
    "165Hz": 300,
    "144Hz": 0,
    "240Hz": 550,
  },
  "Modo de Tela": {
    HDR: 240,
    Standard: 0,
  },
};

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

async function main() {

  for (const categoryName of categories) {
    await prisma.category.upsert({
      where: { slug: toSlug(categoryName) },
      update: {},
      create: {
        name: categoryName,
        slug: toSlug(categoryName),
      },
    });
  }
  console.log("Categorias criada");

  // 2. Produtos
  for (const product of products) {
    const category = await prisma.category.findUnique({
      where: { slug: toSlug(product.category) },
    });
    if (!category) {
      console.warn(`Categoria não encontrada: ${product.category}`);
      continue;
    }

    const slug = toSlug(product.name);

    const created = await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        id: product.id, 
        name: product.name,
        slug,
        description: product.description,
        price: product.price,
        oldPrice: product.oldPrice ?? null,
        discountPercentage: product.discountPercentage ?? null,
        salesCount: product.salesCount,
        rating: product.rating,
        stockQty: 100,
        imageUrl: product.images[0] ?? null,
        featured: product.featured ?? false,
        categoryId: category.id,
        images: {
          create: product.images.map((url, i) => ({
            imageUrl: url,
            isMain: i === 0,
          })),
        },
      },
    });

    // Variantes — só cria se não existirem
    if (product.variants && product.variants.length > 0) {
      const existingVariants = await prisma.productVariant.findMany({
        where: { productId: created.id },
      });

      if (existingVariants.length === 0) {
        for (const variant of product.variants) {
          await prisma.productVariant.create({
            data: {
              productId: created.id,
              type: variant.type,
              options: {
                create: variant.options.map((option) => ({
                  value: option,
                  priceExtra:
                    variantPriceModifiers[variant.type]?.[option] ?? 0,
                })),
              },
            },
          });
        }
      }
    }
  }

  console.log("Produtos e variante criado");
}

main()
  .catch((e) => {
    console.error("Erro no seed ", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());