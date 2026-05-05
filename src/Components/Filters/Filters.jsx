import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import { BotonAccion } from "../Button/BotonAction";

function Filter({ filtros = {}, setFiltros }) {
  const { lang } = useLanguage();

  const inputStyle = "w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-pink-200 focus:bg-white transition-all placeholder:text-gray-400";

  return (
    <div className="bg-white p-6 rounded-[32px] shadow-sm flex flex-col gap-2 sticky top-4 border border-gray-100">
      <h2 className="font-bold text-xl text-gray-800 mb-4 px-2">
        {texts[lang].filters}
      </h2>

      <div className="px-2 pb-2">
        <input
          className={inputStyle}
          type="text"
          value={filtros.titulo || ""}
          placeholder={texts[lang].placeHolder.titulo}
          onChange={(e) => setFiltros({ ...filtros, titulo: e.target.value })}
        />
      </div>

      <div className="px-2 pb-2">
        <input
          className={inputStyle}
          type="text"
          value={filtros.ingredientes || ""}
          placeholder={texts[lang].placeHolder.ingredientes}
          onChange={(e) => setFiltros({ ...filtros, ingredientes: e.target.value })}
        />
      </div>

      <div className="px-2 pb-2">
        <select
          className={inputStyle}
          value={filtros.type || ""}
          onChange={(e) => setFiltros({ ...filtros, type: e.target.value })}
        >
          <option value="">{texts[lang].placeHolder.todo}</option>
          <option value="vegano">{texts[lang].placeHolder.vegano}</option>
          <option value="Vegetariano">{texts[lang].placeHolder.vegetariano}</option>
          <option value="carne_roja">{texts[lang].placeHolder.carneRoja}</option>
          <option value="carne_blanca">{texts[lang].placeHolder.carneBlanca}</option>
        </select>
      </div>

      <div className="flex gap-2 px-2 pb-4">
        <input
          className={inputStyle}
          type="number"
          min={0}
          value={filtros.tiempo || ""}
          placeholder={texts[lang].placeHolder.tiempo}
          onChange={(e) => setFiltros({ ...filtros, tiempo: e.target.value })}
        />
        <input
          className={inputStyle}
          type="number"
          min={0}
          value={filtros.porciones || ""}
          placeholder={texts[lang].placeHolder.porciones}
          onChange={(e) => setFiltros({ ...filtros, porciones: e.target.value })}
        />
      </div>

      <div className="px-2">
        <BotonAccion
          className="w-full bg-gray-800 text-white rounded-xl py-3 text-sm font-bold hover:bg-pink-600 transition-colors shadow-sm"
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