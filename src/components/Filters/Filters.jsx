import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import { BotonAccion } from "../Button/BotonAction";

function Filter({ filtros, setFiltros }) {
  //miro el lenguaje actual
  const { lang } = useLanguage();

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex-col gap-4">
      <h2 className="font-bold text-lg">{texts[lang].filters}</h2>
      <div className="p-2">
        <input
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
      </div>

      <div className="p-2">
        <input
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
      </div>

      <div className="p-2">
        <select
          className="border rounded-lg p-2"
          value={filtros.type}
          onChange={(e) => setFiltros({ ...filtros, type: e.target.value })}
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
      </div>

      <div className="p-2">
        <input
          className="border rounded-lg p-2"
          type="number"
          min={0}
          value={filtros.tiempo}
          placeholder={texts[lang].placeHolder.tiempo}
          onChange={(e) => setFiltros({ ...filtros, tiempo: e.target.value })}
        />
      </div>

      <div className="p-2">
        <input
          className="border rounded-lg p-2"
          type="number"
          min={0}
          value={filtros.porciones}
          placeholder={texts[lang].placeHolder.porciones}
          onChange={(e) =>
            setFiltros({ ...filtros, porciones: e.target.value })
          }
        />
      </div>

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
  );
}

export default Filter;
