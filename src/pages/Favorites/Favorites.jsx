import React, { useState } from "react";
import Card from "../../components/Card/Card";
//import { recetario } from "../../../recetas_reales";
import { texts } from "../../const/texts"
import { useLanguage } from "../../context/LanguageContext";
import { filtrosRecetas } from "../../utils/filtrado";
import Filter from "../../components/Filters/Filters";
import { Link } from "react-router";
import { BotonAccion } from "../../components/Button/BotonAction";
import { useEffect } from "react";
import { getRecetas } from "../../service/api";

function Favorites(){

  //lógica de prueba
  const [recetario, setRecetario] = useState([]);

  useEffect(() => {
    const cargarRecetas = async () => {
      const data = await getRecetas();
      setRecetario(data);
    };
    cargarRecetas();
  }, []);
    const { lang } = useLanguage();
    const [filtros, setFiltros] = useState({
    titulo: "",
    ingredientes: "",
    type: "",
    tiempo: "",
    porciones: "",
    glutenFree: "",
  });
    const favoritos = recetario.filter((receta)=>receta.isFavorite===true);
    const favoritosFiltrado = filtrosRecetas(favoritos, filtros, lang);
    const [limite, setLimite] = useState(10);

    return(
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
      <aside className="w-1/4">
        <Filter filtros={filtros} setFiltros={setFiltros} />
      </aside>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoritosFiltrado.length === 0 ? (
          <p>{texts[lang].noReceta}</p>
        ) : (
          favoritosFiltrado.slice(0, limite).map((receta) => (
            <Link to={`/details/${receta.id}`} key={receta.id}>
              <Card receta={receta} />
            </Link>
          ))
        )}
        <div className="flex justify-center mt-6">
          {limite < favoritosFiltrado.length && (
            <BotonAccion
              texto="Cargar más"
              onClick={() => setLimite(limite + 10)}
            />
          )}
        </div>
      </section>
    </div>
    )
}
export default Favorites;