"use client";
import { DataTable } from "@/components/data-table";
import { useProducts } from "@/hooks/useProducts";

export default function Page() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <DataTable data={products} />
    </div>
  );
}
