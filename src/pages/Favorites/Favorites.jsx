import React, { useState } from "react";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import { recetario } from "../../../recetas_reales";
import { texts } from "../../const/texts"
import { useLanguage } from "../../context/LanguageContext";
import { filtrosRecetas } from "../../utils/filtrado";
import Filter from "../../components/Filters/Filters";

function Favorites(){
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

    return(
        <div>
            <Header
                filtros={filtros}
                setFiltros={setFiltros}
                titulo={texts[lang].favorites}
            />
            <div>
            <Filter filtros={filtros} setFiltros={setFiltros}/>
            </div>
        <section>
        {favoritosFiltrado.length === 0 ? (
          <p>{texts[lang].sinFavoritos}</p>
        ) : (
          favoritosFiltrado.map((receta) => <Card key={receta.id} receta={receta} />)
        )}
      </section>
      </div>
    )
}
export default Favorites;