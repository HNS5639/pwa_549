import { useLanguage } from "../../context/LanguageContext";
import Title from "../Title/Title";

function Card({ receta }) {
  const { lang } = useLanguage();

  return (
    <div className="bg-[#c7cbca] rounded-[20px] p-8 w-full max-w-[240px] min-h-[350px] flex flex-col items-center">

      {/* Imagen principal */}
      <img
        src={receta.image}
        alt={receta.content[lang].title}
        className="w-[200px] h-[105px] object-cover"
      />

      {/* Título */}
      <div className="mt-2">
        <Title text={receta.content[lang].title} />
      </div>

      {/* Info extra */}
      <div className="mt-4 flex gap-6 text-sm">
        <small>{receta.cookingTime} min</small>
        <small>{receta.servings} porciones</small>
      </div>





    </div>
  );
}

export default Card;