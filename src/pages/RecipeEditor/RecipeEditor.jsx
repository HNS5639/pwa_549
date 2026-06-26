import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";
import FormFields from "../../Components/FormFields/FormFields";
import { BotonAccion } from "../../Components/Button/BotonAction";
import { getRecetaById, updateReceta } from "../../service/api";
import { Routes } from "../../const/routes";


const getFormDataFromRecipe = (data, lang) => {
  const traduccionBackend = data?.traducciones?.[0];
  const title = traduccionBackend?.title;
  const description = traduccionBackend?.description;
  const rawIngredients = traduccionBackend?.ingredients;
  const ingredients = Array.isArray(rawIngredients) ? rawIngredients.join("\n") : rawIngredients;
  const rawInstructions = traduccionBackend?.instruction;
  const instructions = Array.isArray(rawInstructions) ? rawInstructions.join("\n") : rawInstructions;

  return {
    title,
    description,
    cookingTime: data?.cookingTime || data?.tiempoCoccion || "", 
    servings: data?.servings || data?.porciones || "",          
    type: data?.type || data?.tipoDieta || data?.categoria || "carne_blanca",
    isGlutenFree: Boolean(data?.isGlutenFree ?? data?.libreGluten),
    ingredients,
    instruction,
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
    instruction: ""
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

      await updateReceta(id, dataAEnviar);
      
      alert(lang === "es" ? "¡Receta editada con éxito!" : "Recipe edited successfully!");
      navigate("/");
      
    } catch (error) {
      console.error(error);
      alert("Error al guardar: " + error.message);
    }
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
export default RecipeEditor;