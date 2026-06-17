const BASE_URL = `${import.meta.env.VITE_API_URL}`;


const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); 
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const getFavoritosIds = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${BASE_URL}/favoritos/ids`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });
    
    if (!response.ok) throw new Error("Error al traer IDs de favoritos");
    return await response.json();
  } catch (error) {
    console.error("Error en getFavoritosIds:", error);
    return [];
  }
};

export const toggleFavorito = async (idReceta) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${BASE_URL}/favoritos/toggle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ idReceta })
    });

    if (!response.ok) throw new Error("Error al modificar favorito");
    return await response.json();
  } catch (error) {
    console.error("Error en toggleFavorito:", error);
    throw error;
  }
};

export const getRecetasFavoritas = async ({ page = 1, limit = 9, lang = "es" }) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${BASE_URL}/favoritos?page=${page}&limit=${limit}&lang=${lang}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    if (!response.ok) throw new Error("Error al traer lista de favoritos");
    return await response.json();
  } catch (error) {
    console.error("Error en getRecetasFavoritas:", error);
    return [];
  }
};