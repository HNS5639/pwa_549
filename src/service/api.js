import { GetLocalStorage } from "./localStorage";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const BASE_URL = `${API_URL}/recetas`;

export const getRecetas = async ({
  page = 1,
  limit = 9,
  lang = 'es',
  search = '',
  type = '',
  tiempo = '',
  porciones = ''
} = {}) => {

  let query = `?lang=${lang}&page=${page}&limit=${limit}`;

  if (search) query += `&search=${encodeURIComponent(search)}`;
  if (type) query += `&type=${encodeURIComponent(type)}`;
  if (tiempo) query += `&tiempo=${encodeURIComponent(tiempo)}`;
  if (porciones) query += `&porciones=${encodeURIComponent(porciones)}`;

  try {
    const res = await fetch(`${BASE_URL}${query}`);
    if (!res.ok) return { data: [], totalPages: 1 };
    return await res.json();
  } catch (error) {
    console.error("Error trayendo recetas:", error);
    return { data: [], totalPages: 1 };
  }
};

export const getRecetaById = async (id, lang = 'es') => {
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

// Función para CREAR receta (POST)
export const createReceta = async (recetaData, lang = 'es') => {
  try {
    const token = GetLocalStorage("accessToken");
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(recetaData)
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Error al crear la receta");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en createReceta:", error);
    throw error;
  }
};

// Función para EDITAR receta (PUT)
export const updateReceta = async (idReceta, recetaData) => {
  try {
    const token = GetLocalStorage("accessToken");
    const res = await fetch(`${BASE_URL}/${idReceta}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(recetaData)
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Error al actualizar la receta");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en updateReceta:", error);
    throw error;
  }
};