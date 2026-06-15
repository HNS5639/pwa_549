export function filtrosRecetas(recetario, filtros, lang) {
  return recetario.filter((receta) => {
    const traduccion = receta.traducciones?.find(t => t.lang === lang) || receta.traducciones?.[0];

    if (!traduccion) return false;

    const coincideTitulo = traduccion.title
      .toLowerCase()
      .includes(filtros.titulo.toLowerCase());

    const coincideIngrediente = traduccion.ingredients.some(
      (ingredient) =>
        ingredient.toLowerCase().includes(filtros.ingredientes.toLowerCase())
    );

    const coincideTipo =
      filtros.type === "" || receta.type === filtros.type;

    const coincideTiempo =
      filtros.tiempo === "" || receta.cookingTime <= filtros.tiempo;

    const coincidePorciones =
      filtros.porciones === "" || receta.servings >= filtros.porciones;

    const coincideGluten =
      filtros.glutenFree === "" || receta.isGlutenFree === filtros.glutenFree;

    return (
      coincideTitulo &&
      coincideIngrediente &&
      coincideTipo &&
      coincideTiempo &&
      coincidePorciones &&
      coincideGluten
    );
  });
}