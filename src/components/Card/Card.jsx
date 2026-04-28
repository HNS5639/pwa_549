import { useLanguage } from "../../context/LanguageContext";
import Title from "../Title/Title";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

function Card({ receta }) {
  const { lang } = useLanguage();
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 p-6 h-full">
      <div className="relative">
        <img
          className="w-full h48 object-cover"
          src={receta.image}
          alt={receta.content[lang].title}
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
          {receta.isFavorite ? (
            <HeartIcon className="w-6 h-6 text-red-500" />
          ) : (
            <HeartOutline className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <div className="w-5/6"><Title text={receta.content[lang].title} /></div>
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
