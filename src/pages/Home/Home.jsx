import { useState } from "react";

import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import Filter from "../../components/Filters/Filters";
import { BotonAccion } from "../../components/Button/BotonAction";
import { texts } from "../../const/texts";

import { filtrosRecetas } from "../../utils/filtrado";
import { useLanguage } from "../../context/LanguageContext";

// recetario de muestra
import { recetario } from "../../../recetas_reales";

function Home() {
  const { lang } = useLanguage();

  const [limite, setLimite] = useState(10);

  const [filtros, setFiltros] = useState({
    titulo: "",
    ingredientes: "",
    type: "",
    tiempo: "",
    porciones: "",
    glutenFree: "",
  });

  const recetarioFiltrado = filtrosRecetas(
    recetario,
    filtros,
    lang
  );

  return (
    <>
      {/* Nuevo Header */}
      <Header
        filtros={filtros}
        setFiltros={setFiltros}
        titulo={texts[lang].home}
      />

      {/* Contenido principal */}
      <main className="px-8 py-6 flex gap-6">
        {/* Filters a la izquierda */}
        <aside className="w-64 flex-shrink-0">
          <Filter filtros={filtros} setFiltros={setFiltros} />
        </aside>

        {/* Recetas */}
        <section className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recetarioFiltrado.length === 0 ? (
            <p>No hay recetas pendientes.</p>
          ) : (
            recetarioFiltrado
              .slice(0, limite)
              .map((receta) => (
                <Card
                  key={receta.id}
                  receta={receta}
                />
              ))
          )}

          {limite < recetarioFiltrado.length && (
            <div>
              <BotonAccion
                texto="Cargar más"
                onClick={() => setLimite(limite + 10)}
              />
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Home;