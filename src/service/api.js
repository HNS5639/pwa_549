const URL = "https://69eaaa7715c7e2d51269f707.mockapi.io/recetarioApi/v1/recetario";

export const getRecetas = async () => {
  const res = await fetch(URL);
  return res.json();
};