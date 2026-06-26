/*
cambios al implementar axios
* fetch te obliga a preguntar si salió todo bien (por eso el el if (!res.ok)). 
  Con axios si el backend devuelve un error (400, 500, etc.), va directo al bloque catch.

* fetch te obliga a transformar la respuesta con el res.json()
  axios ya lo hace y guarda el resultado en response.data

* Cuando hacés un POST, axios agarra el objeto de Javascript y lo convierte a JSON, no hace falta el JSON.stringify()

* No necesito armar los hader manuales, lo hago desde el interceptor en axiosInstance

* Como en el interceptor ya tengo las rutas, solo uso relativas

*/

import axiosInstance from "./axiosInstance";

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
    const res = await axiosInstance.get(`/recetas${query}`);
    return res.data;
  } catch (error) {
    console.error("Error trayendo recetas:", error);
    return { data: [], totalPages: 1 };
  }
};

export const getRecetaById = async (id, lang = 'es') => {
  try {
    const res = await axiosInstance.get(`/recetas/${id}?lang=${lang}`);
    return res.data.data;
  } catch (error) {
    console.error("Error trayendo receta por ID:", error);
    return null;
  }
};

// Función para CREAR receta (POST)
export const createReceta = async (recetaData, lang = 'es') => {
  try {
    const res = await axiosInstance.post(`/recetas`, recetaData);
    return res.data;
  } catch (error) {
    console.error("Error en createReceta:", error);
    throw new Error(error.response?.data?.error || 'Error al crear receta');
  }
};

// Función para EDITAR receta (PUT)
export const updateReceta = async (idReceta, recetaData) => {
  try {
    const res = await axiosInstance.put(`/recetas/${idReceta}`, recetaData);
    return await res.data;
  } catch (error) {
    console.error("Error en updateReceta:", error);
    throw new Error(error.response?.data?.error || 'Error al editar receta');
  }
};