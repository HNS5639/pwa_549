import { useState } from "react";

import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import { BotonAccion } from "../../components/Button/BotonAction";

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
      />

      {/* Contenido principal */}
      <main className="px-8 py-6">
        <section className="space-y-6">
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