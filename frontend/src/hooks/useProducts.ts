import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios.config";

const fetchProducts = async () => {
  const response = await axios.get("/api/products");
  return response.data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    // staleTime: 1000 * 60 * 5,
  });
};
