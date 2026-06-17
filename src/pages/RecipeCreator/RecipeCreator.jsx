import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";
import FormFields from "../../Components/FormFields/FormFields";
import { BotonAccion } from "../../Components/Button/BotonAction";

function RecipeCreator() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const t = texts[lang] || texts["es"];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cookingTime: "",
    servings: "",
    type: "carne_blanca",
    isGlutenFree: false,
    ingredients: "",
    instructions: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox"
        ? checked
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    alert(lang === "es" ? "Receta guardada (consola)" : "Recipe saved (console)");
    navigate("/");
  };

  return (
    <div className="container mx-auto py-12 px-4">

      <div className="-mt-12 md:-mt-20 mb-6 flex justify-center">
        <img
          src="https://i.ibb.co/wrdt6KjK/gorro-404.png"
          alt="Gorro de cocina"
          className="w-52 md:w-72 drop-shadow-xl"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-3xl border border-gray-100 space-y-8"
      >
        <FormFields
          formData={formData}
          handleChange={handleChange}
          t={t}
        />

        <div className="pt-8 border-t border-gray-100 flex justify-end">
          <BotonAccion 
            texto={texts[lang].placeHolder.save}
            tipo="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg"
          />
        </div>
      </form>

    </div>
  );
}

export default RecipeCreator;