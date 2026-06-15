import { useLanguage } from "../../context/LanguageContext";
import Title from "../Title/Title";
import { useNavigate } from "react-router";
import ButtonFavorite from "../ButtonFavorites/ButtonFavorites";
import { updateFavorite } from "../../service/api";
import { texts } from "../../const/texts";
import { useFavorite } from "../../utils/useFavorite";

function Card({ receta, setRecetario, removeFavorite }) {
  const { toggleFavorite } = useFavorite(setRecetario, null, removeFavorite);
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const traduccion = receta.traducciones?.[0];
  if (!traduccion) return null;

  const title = traduccion.title;
  const description = traduccion.description;
  const cookingTime = receta.cookingTime;
  const type = receta.type;
  const isGlutenFree = receta.isGlutenFree;
  const imagen = receta.urlImagen;
  const serving = receta.serving;

  return (
    <div
      onClick={() => navigate(`/details/${receta.idReceta}`)}
      className="cursor-pointer bg-white rounded-4xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full max-h-100 group"
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={imagen}
          alt={title}
        />
        <ButtonFavorite onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(receta);
        }} isFavorite={isGlutenFree} />
      </div>

      <div className="p-5 flex flex-col flex-1">

        <div className="flex justify-between items-start gap-2 mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-500 leading-tight">
              {title}
            </h3>
          </div>

          <div className="flex flex-col items-end text-gray-500 font-medium shrink-0">
            <span className="text-[11px] flex items-center gap-1">
              ⏱ {cookingTime}
            </span>
            <span className="text-[11px] flex items-center gap-1">
              👥 {serving}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>

        {isGlutenFree && (
          <div className="mt-auto">
            <span className="inline-block bg-green-50 text-green-600 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              {texts[lang].gluten}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;