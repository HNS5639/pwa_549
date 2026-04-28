import { useLanguage } from "../../context/LanguageContext";
import Title from "../Title/Title";

function Card({ receta }) {
  const { lang } = useLanguage();

  return (
    <>
      <div>
        <img src={receta.image} alt={receta.content[lang].title} />
        <div>
          {receta.isFavorite ? (
            <img src="src\assets\react.svg" />
          ) : (
            <img src="src\assets\vite.svg" />
          )}
        </div>
      </div>
      <div>
        <Title text={receta.content[lang].title} />
        <small>"relojito" {receta.cookingTime}</small>
        <small>"personitas" {receta.servings}</small>
        {receta.dietary.isGlutenFree && "libre de gluten"}
      </div>
      <div>{receta.content[lang].description}</div>
    </>
  );
}

export default Card;