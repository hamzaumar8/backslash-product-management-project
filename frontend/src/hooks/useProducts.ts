import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../store/auth";

const fetchProducts = async (token: string | null) => {
  if (!token) return [];
  const response = await axios.get("http://localhost:8000/api/products", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useProducts = () => {
  const { token } = useAuthStore();
  return useQuery(["products"], () => fetchProducts(token), {
    enabled: !!token,
  });
};
