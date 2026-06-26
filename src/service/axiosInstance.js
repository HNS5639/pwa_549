import axios from "axios";
import { GetLocalStorage, SetLocalStorage } from "./localStorage";

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = GetLocalStorage("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = GetLocalStorage("refreshToken");
        
        if (!refreshToken) {
          throw new Error("No hay token de refresco disponible");
        }

        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken: refreshToken
        });

        const newAccessToken = response.data.accessToken;

        SetLocalStorage("accessToken", newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);

      } catch (refreshError) {
        console.error("La sesión expiró por completo:", refreshError);
        
        SetLocalStorage("user", "");
        SetLocalStorage("accessToken", "");
        SetLocalStorage("refreshToken", "");
        
        window.location.href = "/login"; 
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;