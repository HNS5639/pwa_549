import { useLanguage } from "../../context/LanguageContext";
import Title from "../Title/Title";

function Card({ receta }) {
  const { lang } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      
      {/* Imagen principal */}
      <div className="relative">
        <img
          src={receta.image}
          alt={receta.content[lang].title}
          className="w-full h-52 object-cover"
        />

        {/* Icono favorito */}
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow">
          {receta.isFavorite ? (
            <img
              src="src/assets/react.svg"
              alt="Favorito"
              className="w-6 h-6"
            />
          ) : (
            <img
              src="src/assets/vite.svg"
              alt="No favorito"
              className="w-6 h-6"
            />
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col gap-3">

        {/* Título */}
        <div>
          <Title text={receta.content[lang].title} />
        </div>

        {/* Datos rápidos */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <small>⏱ {receta.cookingTime} min</small>
          <small>👥 {receta.servings}</small>

          {receta.dietary?.isGlutenFree && (
            <small className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              Libre de gluten
            </small>
          )}
        </div>

       
      </div>
    </div>
  );
}

export default Card;