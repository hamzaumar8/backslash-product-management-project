import { useProducts } from "@/hooks/useProducts";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/router";

export default function Products() {
  const { token, setToken } = useAuthStore();
  const { data: products, isLoading } = useProducts();
  const router = useRouter();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!token) {
    router.push("/login");
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2"
        >
          Logout
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-4">
          {products?.map((product: any) => (
            <li key={product.id} className="p-4 border rounded-lg my-2">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="text-green-500">${product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
