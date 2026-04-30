const URL = "https://69eaaa7715c7e2d51269f707.mockapi.io/recetarioApi/v1/recetario";

export const getRecetas = async () => {
  const res = await fetch(URL);
  return res.json();
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