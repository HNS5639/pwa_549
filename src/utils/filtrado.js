export function filtrosRecetas(recetario, filtros, lang) {
  //return del filter
  return recetario.filter((receta) => {
    // Filtro por Titulo
    const coincideTitulo = receta.content[lang].title
      .toLowerCase()
      .includes(filtros.titulo.toLowerCase());

    // filtro por Ingrediente
    const coincideIngrediente = receta.content[lang].ingredients.some(
      (ingredient) =>
        ingredient.toLowerCase().includes(filtros.ingredientes.toLowerCase()),
    );

    // filtro por tipo  (si está vacío, trae todos)
    const coincideTipo =
      filtros.type === "" || receta.dietary.type === filtros.type;

    // Filtro por tirmpo
    const coincideTiempo =
      filtros.tiempo === "" || receta.cookingTime <= filtros.tiempo;

    // Filtro por porciones
    const coincidePorciones =
      filtros.porciones === "" || receta.servings >= filtros.porciones;

    // Filtro por gluten (si está vacío, trae todos)
    const coincideGluten =
      filtros.glutenFree === "" || receta.dietary.isGlutenFree === filtros.glutenFree;

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
