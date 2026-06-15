import { useParams } from "react-router"; // o react-router-dom
import { useState, useEffect } from "react";
import { getRecetaById } from "../../service/api";
import  DetailRecipe  from "../../Components/DetailRecipe/DetailRecipe";
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";
import NotFound from "../NotFound/NotFound"; // ¡Importamos el componente de tu compañero!

function Details() {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    const cargarReceta = async () => {
      setLoading(true);
      setError(false);
      
      try {
        const data = await getRecetaById(id, lang);
        
        if (!data || data === "Not found") {
          setError(true);
        } else {
          setReceta(data);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    cargarReceta();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">{texts[lang].noReceta}</p>; 
  }

  if (error || !receta) {
    return <NotFound />;
  }

  return <DetailRecipe receta={receta} setReceta={setReceta} />;
}

export default Details;