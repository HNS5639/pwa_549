import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import Filter from "../Filters/Filters";
import Card from "../Card/Card";
import { BotonAccion } from "../Button/BotonAction";

function PagePrincipal({ filtros, setFiltros, recetario, setRecetario, loaderRef, loading }) {

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
            .map((receta) => (
              <Card receta={receta} setRecetario={setRecetario} key={receta.id}/>
            ))
        )}
        {recetario.length > 0 && (
          <div className="flex justify-center mt-6" ref={loaderRef}>
          {loading && <p>{texts[lang].noReceta}</p>}
        </div>
        )}
      </section>
    </div>
  );
}

export default PagePrincipal;
