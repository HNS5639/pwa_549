import { useLanguage } from "../../context/LanguageContext";
import Title from "../Title/Title";
import { useNavigate } from "react-router";
import ButtonFavorite from "../ButtonFavorites/ButtonFavorites";

function Card({ receta, setRecetario }) {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  return (
    <div
      onClick={() => navigate(`/details/${receta.id}`)}
      className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 h-full"
    >
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={receta.image}
          alt={receta.content[lang].title}
        />
        <ButtonFavorite receta={receta} setRecetario={setRecetario} />
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <div className="w-5/6">
          <Title text={receta.content[lang].title} />
        </div>
        <div className="w-1/6 flex flex-col">
          <small>⏱ {receta.cookingTime}</small>
          <small>👥 {receta.servings}</small>
          {receta.dietary.isGlutenFree && (
            <span className="text-green-600 text-xs font-semibold">
              Sin gluten
            </span>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-600 line-clamp-3">
        {receta.content[lang].description}
      </p>
    </div>
  );
}

export default Card;
