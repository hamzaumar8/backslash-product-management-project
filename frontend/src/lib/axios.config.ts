import Axios, { AxiosError, AxiosInstance } from "axios";
import { useAuthStore } from "@/store/auth";
import { API_BASE_URL } from "@/constants";
import Cookies from "js-cookie";

const axios: AxiosInstance = Axios.create({
  baseURL: API_BASE_URL,
  headers: { "X-Requested-With": "XMLHttpRequest", Accept: "application/json" },
  withCredentials: true,
  withXSRFToken: true,
});

// Request Interceptor: Attach Authorization Token
axios.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle Errors
axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { setToken, removeUser } = useAuthStore.getState();

    if (error.response) {
      if (error.response.status === 401) {
        console.log("Unauthorized: Logging out...");
        setToken(null);
        removeUser();
        return Promise.reject(new Error("Unauthorized: Please log in again."));
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
