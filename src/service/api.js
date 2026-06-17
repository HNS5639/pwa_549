const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const BASE_URL = `${API_URL}/recetas`;

export const getRecetas = async ({ page = 1, limit = 9, lang = 'es'} = {}) => {
  let query = `?lang=${lang}`; 

  try {
    const res = await fetch(`${BASE_URL}${query}`);
    if (!res.ok) {
      return []; 
    }
    
    const responseJson = await res.json();
    return responseJson.data || []; 
  } catch (error) {
    console.error("Error trayendo recetas:", error);
    return [];
  }
};

export const getRecetaById = async ( id, lang = 'es' ) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}?lang=${lang}`);
    if (!res.ok) throw new Error("No se encontró la receta");
    
    const responseJson = await res.json();
    
    return responseJson.data || responseJson; 
  } catch (error) {
    console.error("Error trayendo receta por ID:", error);
    return null;
  }
};

// Dejo esto comentado para luego diseñarlo es para el 
// manejo de los favoritos y los usuarios 
export const updateFavorite = async (receta, isFavorite) => {
  console.warn("updateFavorite está temporalmente deshabilitado hasta migrar la tabla N:M");
};