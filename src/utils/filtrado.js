export function filtrosRecetas(recetario, filtros, lang) {
  return recetario.filter((receta) => {
    const traduccion = receta.traducciones?.find(t => t.lang === lang) || receta.traducciones?.[0];

    if (!traduccion) return false;

    const tituloFiltro = filtros.titulo || "";
    const tituloReceta = traduccion.title || "";
    const coincideTitulo = tituloReceta
      .toLowerCase()
      .includes(tituloFiltro.toLowerCase());

    const ingredienteFiltro = filtros.ingredientes || "";
    const listaIngredientes = traduccion.ingredients || [];
    const coincideIngrediente = listaIngredientes.some(
      (ingredient) =>
        (ingredient || "").toLowerCase().includes(ingredienteFiltro.toLowerCase())
    );

    const coincideTipo =
      !filtros.type || filtros.type === "" || receta.type === filtros.type;

    const coincideTiempo =
      !filtros.tiempo || filtros.tiempo === "" || receta.cookingTime <= filtros.tiempo;

    const coincidePorciones =
      !filtros.porciones || filtros.porciones === "" || receta.servings >= filtros.porciones;

    const coincideGluten =
      filtros.glutenFree === undefined || filtros.glutenFree === "" || receta.isGlutenFree === filtros.glutenFree;

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