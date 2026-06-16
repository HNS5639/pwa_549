import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";
import FormFields from "../../Components/FormFields/FormFields";
import { BotonAccion } from "../../Components/Button/BotonAction";
import { getRecetaById } from "../../service/api";

function RecipeEditor() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams();

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
      if (!id) return;

      try {
        const data = await getRecetaById(id, lang);
        if (data && data !== "Not found") {
          // Obtenemos la traducción correspondiente al idioma actual
          const contenido = data.content?.[lang] || data.content?.["es"] || {};
          
          setFormData({
            title: contenido.title || "",
            description: contenido.description || "",
            cookingTime: data.cookingTime || "",
            servings: data.servings || "",
            type: data.dietary?.type || "carne_blanca",
            isGlutenFree: data.dietary?.isGlutenFree || false,
            ingredients: contenido.ingredients?.join("\n") || "",
            instructions: contenido.instructions?.join("\n") || ""
          });
        }
      } catch (error) {
        console.error("Error cargando receta para editar:", error);
      }
    };

    cargarDatosReceta();
  }, [id, lang]);

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

export default RecipeEditor
;