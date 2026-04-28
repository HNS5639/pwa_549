import { useLanguage } from "../../context/LanguageContext";
import Title from "../Title/Title";

function Card({ receta }) {
  const { lang } = useLanguage();
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <div className="relative">
        <img
          className="w-full h48 object-cover"
          src={receta.image}
          alt={receta.content[lang].title}
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
          <img
            className="w-6 h-6"
            src={
              receta.isFavorite ? "src/assets/react.svg" : "src/assets/vite.svg"
            }
          />
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <Title text={receta.content[lang].title} />
        <small>⏱ {receta.cookingTime}</small>
        <small>👥 {receta.servings}</small>
        {receta.dietary.isGlutenFree && (
          <span className="text-green-600 text-xs font-semibold">
            Sin gluten
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 line-clamp-3">{receta.content[lang].description}</p>
    </div>
  );
}

export default Card;
