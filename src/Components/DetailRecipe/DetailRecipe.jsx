import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import { useFavorite } from "../../utils/useFavorite";
import ButtonFavorite from "../ButtonFavorites/ButtonFavorites";
import { BotonAccion } from "../Button/BotonAction";
import { toggleFavorito, getFavoritosIds } from "../../service/favorite";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { deleteReceta } from "../../service/api";
import { useNavigate } from "react-router";

function DetailRecipe({ receta, setReceta, onEdit, editButtonText, removeFavorite }) {
  const { lang } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const data = receta?.traducciones?.[0];
  const [isFavoriteDetail, setIsFavoriteDetail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSiEsFavorito = async () => {
      if (isAuthenticated && receta?.idReceta) {
        try {
          const respuesta = await getFavoritosIds();
          const ids = respuesta.data || [];
          const yaEsFav = ids.some(id => String(id) === String(receta.idReceta));
          setIsFavoriteDetail(yaEsFav);
        } catch (error) {
          console.error("Error al verificar favoritos en detalle", error);
        }
      }
    };

    checkSiEsFavorito();
  }, [isAuthenticated, receta?.idReceta]);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleFavorito(receta.idReceta);
      setIsFavoriteDetail(prev => !prev);

    } catch (error) {
      console.error("No se pudo actualizar el favorito", error);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(`¿${texts[lang].confirmDelete} ${receta.idReceta}?`);

    if (confirm) {
      try {
        await deleteReceta(receta.idReceta);
        alert("Receta eliminada con éxito");
        navigate('/');
      } catch (error) {
        console.error("Error al eliminar: ", error);
        alert("Hubo un error al eliminar la receta");
      }
    }
  }

  if (!receta) return <p className="text-center p-6">Cargando receta...</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 w-full relative">

            <img
              src={receta?.urlImagen}
              alt={data?.title}
              className="w-full h-full object-cover"
            />

            {isAuthenticated &&
              <ButtonFavorite
                onClick={handleToggleFavorite}
                isFavorite={isFavoriteDetail}
              />}
          </div>

          <div className="md:w-1/2 w-full p-6 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900">{data?.title}</h1>

            <div className="flex gap-4 text-gray-500 text-sm">
              <span>⏱ {receta?.cookingTime} min</span>
              <span>👥 {receta?.servings}</span>
              <span>🥗 {receta?.type}</span>
            </div>

            <div className="flex items-center gap-4">
              {receta?.isGlutenFree && (
                <span className="inline-block bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full w-fit">
                  {texts[lang].gluten}
                </span>
              )}

              {isAuthenticated && onEdit && (user?.rol === 'superUsuario' || user?.rol === 'administrador') && (
                  <div className="flex items-center justify-end gap-3 mt-4">
                    <BotonAccion
                      texto={editButtonText}
                      onClick={onEdit}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
                    />
                    <BotonAccion
                      texto={texts[lang].delete}
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
                    />
                  </div>
              )}
            </div>

            <div>
              <h2 className="font-semibold text-lg mb-2">{texts[lang].placeHolder.ingredientes}</h2>
              {data?.ingredients?.length > 0 ? (
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {data.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">{texts[lang].error}</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t">
          <div className="mb-6">
            <h2 className="font-semibold text-xl mb-2">{texts[lang].description}</h2>
            <p className="text-gray-600 leading-relaxed">
              {data?.description || "Sin descripción disponible"}
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-2">{texts[lang].preparation}</h2>
            {data?.instruction?.length > 0 ? (
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                {data.instruction.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-400">{texts[lang].noInfo}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailRecipe;