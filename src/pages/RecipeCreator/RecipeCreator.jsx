import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";
import FormFields from "../../Components/FormFields/FormFields";
import { BotonAccion } from "../../Components/Button/BotonAction";
import { createReceta } from "./../../service/api";

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
    instruction: ""
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const arrIngredients = formData.ingredients
        .split('\n')
        .filter(item => item.trim() !== "");

      const arrInstructions = formData.instruction
        .split('\n')
        .filter(item => item.trim() !== "");

      const otroIdioma = lang === 'es' ? 'en' : 'es';

      const dataAEnviar = {
        // urlImagen: "",
        cookingTime: Number(formData.cookingTime),
        servings: Number(formData.servings),
        isGlutenFree: formData.isGlutenFree,
        type: formData.type,
        traducciones: [
          // Idioma principal (el que el usuario eligió)
          {
            lang: lang, 
            title: formData.title,
            description: formData.description,
            ingredients: arrIngredients,
            instruction: arrInstructions
          },
          // Idioma clon para que no se rompa la app al cambiar el lenguaje
          {
            lang: otroIdioma,
            title: `${formData.title} (Pending translation)`,
            description: formData.description,
            ingredients: arrIngredients.map(i => `(TR) ${i}`),
            instruction: arrInstructions.map(i => `(TR) ${i}`)
          }
        ]
      };

      await createReceta(dataAEnviar);
      
      alert(lang === "es" ? "¡Receta creada con éxito!" : "Recipe created successfully!");
      navigate("/");
      
    } catch (error) {
      console.error(error);
      alert("Error al guardar: " + error.message);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">

      {/* <div className="-mt-12 md:-mt-20 mb-6 flex justify-center">
        <img
          src="https://i.ibb.co/wrdt6KjK/gorro-404.png"
          alt="Gorro de cocina"
          className="w-52 md:w-72 drop-shadow-xl"
        />
      </div> */}

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