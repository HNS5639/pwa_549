import React, { useState } from "react";
import Card from "../../components/Card/Card";
import { recetario } from "../../../recetas_reales";
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";
import { filtrosRecetas } from "../../utils/filtrado";
import Filter from "../../components/Filters/Filters";

function Favorites() {
  const { lang } = useLanguage();
  

  const [filtros, setFiltros] = useState({
    titulo: "",
    ingredientes: "",
    type: "",
    tiempo: "",
    porciones: "",
    glutenFree: "",
  });

  const favoritos = recetario.filter(
    (receta) => receta.isFavorite === true
  );

  const favoritosFiltrado = filtrosRecetas(
    favoritos,
    filtros,
    lang
  );

  return (
    <main className="px-8 py-6 flex gap-6">
      
      {/* Filtros a la izquierda */}
      <aside className="w-64 flex-shrink-0">
        <Filter
          filtros={filtros}
          setFiltros={setFiltros}
        />
      </aside>

      {/* Cards de favoritos */}
      <section className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoritosFiltrado.length === 0 ? (
          <p className="text-gray-600">
            {texts[lang].sinFavoritos}
          </p>
        ) : (
          favoritosFiltrado.map((receta) => (
            <Card
              key={receta.id}
              receta={receta}
            />
          ))
        )}
      </section>

    </main>
  );
}

export default Favorites;