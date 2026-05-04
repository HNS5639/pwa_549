import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import Filter from "../Filters/Filters";
import Card from "../Card/Card";
import { BotonAccion } from "../Button/BotonAction";

function PagePrincipal({ filtros, setFiltros, recetario, setRecetario }) {
  const [limite, setLimite] = useState(10);
  const { lang } = useLanguage();
  return (
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
      <aside className="w-1/4">
        <Filter filtros={filtros} setFiltros={setFiltros} />
      </aside>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recetario.length === 0 ? (
          <p>{texts[lang].noReceta}</p>
        ) : (
          recetario
            .slice(0, limite)
            .map((receta) => (
              <Card receta={receta} setRecetario={setRecetario} key={receta.id}/>
            ))
        )}
        <div className="flex justify-center mt-6">
          {limite < recetario.length && (
            <BotonAccion
              texto="Cargar más"
              onClick={() => setLimite(limite + 10)}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default PagePrincipal;
