import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import { useFavorite } from "../../utils/useFavorite";
import ButtonFavorite from "../ButtonFavorites/ButtonFavorites";

function DetailRecipe({ receta, setReceta}) {
  const { lang } = useLanguage();
  const { toggleFavorite } = useFavorite(null, setReceta);

  const data = receta?.content?.[lang];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 w-full relative">

            <img
              src={receta?.image}
              alt={data?.title}
              className="w-full h-full object-cover"
            />

            <ButtonFavorite 
            isFavorite={receta.isFavorite}
            onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(receta);
              }}
            />
          </div>

          <div className="md:w-1/2 w-full p-6 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900">{data?.title}</h1>

            <div className="flex gap-4 text-gray-500 text-sm">
              <span>⏱ {receta?.cookingTime} min</span>
              <span>👥 {receta?.servings}</span>
              <span>🥗 {receta?.dietary?.type}</span>
            </div>

            {receta?.dietary?.isGlutenFree && (
              <span className="inline-block bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full w-fit">
                {texts[lang].gluten}
              </span>
            )}

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
            {data?.instructions?.length > 0 ? (
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                {data.instructions.map((step, i) => (
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
