"use client";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { useProducts } from "@/hooks/useProducts";

export default function Page() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {isLoading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>Error loading products.</p>
      ) : (
        <>
          <SectionCards products={products} />
          <DataTable data={products} />
        </>
      )}
    </div>
  );
}
