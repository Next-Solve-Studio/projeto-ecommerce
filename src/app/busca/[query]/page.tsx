import SearchPageComponent from "@/components/SearchPage";
import { products } from "@/data/products";

export default async function SearchPage({
  params,
}: {
  params: Promise<{ query: string }>;
}) {
  const { query } = await params;

  const decodedQuery = query ? decodeURIComponent(query) : "";

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(decodedQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(decodedQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(decodedQuery.toLowerCase()),
  );

  return (
    <SearchPageComponent
      decodedQuery={decodedQuery}
      filteredProducts={filteredProducts}
    />
  );
}
