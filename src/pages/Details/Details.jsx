import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getRecetaById } from "../../service/api";
import DetailRecipe from "../../Components/DetailRecipe/DetailRecipe.";
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";

function Details() {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const cargarReceta = async () => {
      const data = await getRecetaById(id);
      setReceta(data);
    };
    cargarReceta();
  }, [id]);

  return (
    <>
      {receta ? (
        <DetailRecipe receta={receta} setReceta={setReceta}/>
      ) : (
        <p className="text-center mt-10">{texts[lang].error}</p>
      )}
    </>
  );
}

export default Details;
