"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import { useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { useAuthStore } from "@/store/auth";

export default function Page() {
  const { token } = useAuthStore();
  const { data: products, isLoading, error } = useProducts();
  const router = useRouter();

  console.log("products", products, token);
  // const handleLogout = () => {
  //   setToken(null);
  //   localStorage.removeItem("token");
  //   router.push("/login");
  // };

  // if (!token) {
  //   router.push("/login");
  //   return null;
  // }

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <DataTable data={products} />
    </div>
  );
}
