import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import Filter from "../Filters/Filters";
import Card from "../Card/Card";
import { BotonAccion } from "../Button/BotonAction";
import { useState } from "react";
import CookingLoader from "../Loader/CookingLoader";

function PagePrincipal({
  filtros,
  setFiltros,
  recetario,
  setRecetario,
  loaderRef,
  loading,
  removeFavorite,
  favIds = [],
  setFavIds
}) {
  const { lang } = useLanguage();
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 pr-15 pl-15 bg-gray-100 min-h-screen">
      <button
        className="md:hidden mb-4 bg-white p-3 rounded-xl shadow"
        onClick={() => setOpenFilters(!openFilters)}
      >
        🔍 {texts[lang].Filter}
      </button>
      <aside
        className={`
          ${openFilters ? "block" : "hidden"} 
          md:block 
          w-full md:w-1/6 
          bg-white md:bg-transparent 
          p-4 md:p-0 
          rounded-xl md:rounded-none 
          shadow md:shadow-none
            `}
      >
        <Filter filtros={filtros} setFiltros={setFiltros} />
      </aside>
      <section className="w-full md:w-5/6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {recetario.length === 0 ? (
          <CookingLoader />
        ) : (
          recetario.map((receta) => (
            <Card
              receta={receta}
              setRecetario={setRecetario}
              key={receta.idReceta}
              removeFavorite={removeFavorite}
              isFavorite={favIds.some(id => String(id) === String(receta.idReceta))} 
              setFavIds={setFavIds}
            />
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
