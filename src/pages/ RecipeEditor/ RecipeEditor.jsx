import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";
import FormFields from "../../Components/FormFields/FormFields";
import { BotonAccion } from "../../Components/Button/BotonAction";
import { getRecetaById } from "../../service/api";
import { Routes } from "../../const/routes";

const getFormDataFromRecipe = (data, lang) => {
  const content = data?.content?.[lang] || data?.content?.es || {};

  return {
    title: content.title || "",
    description: content.description || "",
    cookingTime: data?.cookingTime || "",
    servings: data?.servings || "",
    type: data?.dietary?.type || "carne_blanca",
    isGlutenFree: Boolean(data?.dietary?.isGlutenFree),
    ingredients: Array.isArray(content.ingredients)
      ? content.ingredients.join("\n")
      : "",
    instructions: Array.isArray(content.instructions)
      ? content.instructions.join("\n")
      : "",
  };
};

function RecipeEditor() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const cargarDatosReceta = async () => {
      if (!id) {
        navigate(Routes.home);
        return;
      }

      try {
        setLoading(true);
        const data = await getRecetaById(id, lang);
        if (data && data !== "Not found") {
          setFormData(getFormDataFromRecipe(data, lang));
        } else {
          navigate(Routes.home);
        }
      } catch (error) {
        console.error("Error cargando receta para editar:", error);
        navigate(Routes.home);
      } finally {
        setLoading(false);
      }
    };

    cargarDatosReceta();
  }, [id, lang, navigate]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
      </div>
    );
  }

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
        aria-busy={loading}
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

export default RecipeEditor
;