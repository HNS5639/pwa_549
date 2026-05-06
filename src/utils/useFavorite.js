import { updateFavorite } from "../service/api";

export function useFavorite(setRecetario, setRecetaIndividual, removeFavorite = false) {
  const toggleFavorite = async (receta) => {
    const nuevoValor = !receta.isFavorite;

    await updateFavorite(receta, nuevoValor);

    if (setRecetario) {
      setRecetario((prev) => {
        if (removeFavorite && !nuevoValor) {
          return prev.filter((r) => r.id !== receta.id);
        }

        return prev.map((r) =>
          r.id === receta.id ? { ...r, isFavorite: nuevoValor } : r
        );
      });
    }

    if (setRecetaIndividual) {
      setRecetaIndividual((prev) => ({
        ...prev,
        isFavorite: nuevoValor,
      }));
    }
  };

  return { toggleFavorite };
}