import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import { BotonAccion } from "../Button/BotonAction";

function Filter({ filtros, setFiltros }) {
  const { lang } = useLanguage();

  return (
    <div className="sticky top-28 bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-4">
      
      {/* Título */}
      <h2 className="text-xl font-semibold border-b pb-2">
        {texts[lang].filters}
      </h2>

      {/* Buscar por título */}
      <input
        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        type="text"
        value={filtros.titulo}
        placeholder={texts[lang].placeHolder.titulo}
        onChange={(e) =>
          setFiltros({
            ...filtros,
            titulo: e.target.value,
          })
        }
      />

      {/* Buscar por ingredientes */}
      <input
        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        type="text"
        value={filtros.ingredientes}
        placeholder={texts[lang].placeHolder.ingredientes}
        onChange={(e) =>
          setFiltros({
            ...filtros,
            ingredientes: e.target.value,
          })
        }
      />

      {/* Tipo */}
      <select
        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        value={filtros.type}
        onChange={(e) =>
          setFiltros({
            ...filtros,
            type: e.target.value,
          })
        }
      >
        <option value="">{texts[lang].placeHolder.todo}</option>
        <option value="vegano">{texts[lang].placeHolder.vegano}</option>
        <option value="Vegetariano">
          {texts[lang].placeHolder.vegetariano}
        </option>
        <option value="carne_roja">
          {texts[lang].placeHolder.carneRoja}
        </option>
        <option value="carne_blanca">
          {texts[lang].placeHolder.carneBlanca}
        </option>
      </select>

      {/* Tiempo */}
      <input
        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        type="number"
        min={0}
        value={filtros.tiempo}
        placeholder={texts[lang].placeHolder.tiempo}
        onChange={(e) =>
          setFiltros({
            ...filtros,
            tiempo: e.target.value,
          })
        }
      />

      {/* Porciones */}
      <input
        className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        type="number"
        min={0}
        value={filtros.porciones}
        placeholder={texts[lang].placeHolder.porciones}
        onChange={(e) =>
          setFiltros({
            ...filtros,
            porciones: e.target.value,
          })
        }
      />

      {/* Botón limpiar */}
      <div className="pt-2">
        <BotonAccion
          texto={texts[lang].placeHolder.limpiar}
          onClick={() =>
            setFiltros({
              titulo: "",
              ingredientes: "",
              type: "",
              tiempo: "",
              porciones: "",
              glutenFree: "",
            })
          }
        />
      </div>
    </div>
  );
}

export default Filter;