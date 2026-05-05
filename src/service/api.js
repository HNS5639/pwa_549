const URL = "https://69eaaa7715c7e2d51269f707.mockapi.io/recetarioApi/v1/recetario";

export const getRecetas = async ({
  page = 1,
  limit = 9,
  search = "",
  isFavorite = null,
} = {}) => {
  let query = `?page=${page}&limit=${limit}`;

  if(search){
    query += `&search=${search}`;
  }

  if(isFavorite !== null && isFavorite !== ""){
    query += `&isFavorite=${isFavorite}`
  }

  try {
    const res = await fetch(`${URL}${query}`);
    if (!res.ok) {
      return []; 
    }
    
    return await res.json();
  } catch (error) {
    // Si se corta internet o hay otro error, también devolvemos array vacío
    console.error("Error trayendo recetas:", error);
    return [];
  }
};

export const getRecetaById = async (id) => {
  const res = await fetch(`${URL}/${id}`);
  return res.json();
};

export const updateFavorite = async (receta, isFavorite) => {
  const res = await fetch(`${URL}/${receta.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...receta,
        isFavorite: isFavorite,
      }),
    }
  );

  return res.json();
};