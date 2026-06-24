import axiosInstance from "./axiosInstance";

export const getFavoritosIds = async () => {
  try {
    const response = await axiosInstance.get(`/favoritos/ids`);
    return response.data;
  } catch (error) {
    console.error("Error en getFavoritosIds:", error);
    return [];
  }
};

export const toggleFavorito = async (idReceta) => {
  try {
    const response = await axiosInstance.post(`/favoritos/toggle`, { idReceta });
    return response.data;
  } catch (error) {
    console.error("Error en toggleFavorito:", error);
    throw new Error(error.response?.data?.error || 'Error al modificar favoritos');
  }
};

export const getRecetasFavoritas = async ({ page = 1, limit = 9, lang = "es" }) => {
  try {
    const response = await axiosInstance.get(`/favoritos?page=${page}&limit=${limit}&lang=${lang}`);
    return response.data;
  } catch (error) {
    console.error("Error en getRecetasFavoritas:", error);
    return [];
  }
  
};