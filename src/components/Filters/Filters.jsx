import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import { BotonAccion } from "../Button/BotonAction";

function Filter({ filtros, setFiltros }) {
  //miro el lenguaje actual
  const { lang } = useLanguage();

  /*  const [filtros, setFiltros] = useState({
    titulo: "",
    ingredientes: "",
    type: "",
    tiempo: "",
    porciones: "",
    glutenFree: "",
  });  */

  return (
    <div>
      <input
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

      <input
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

      <select
        value={filtros.type}

        onChange={(e) => setFiltros({ ...filtros, type: e.target.value })}
      >
        <option value="">{texts[lang].placeHolder.todo}</option>
        <option value="vegano">{texts[lang].placeHolder.vegano}</option>
        <option value="Vegetariano">
          {texts[lang].placeHolder.vegetariano}
        </option>
        <option value="carne_roja">{texts[lang].placeHolder.carneRoja}</option>
        <option value="carne_blanca">
          {texts[lang].placeHolder.carneBlanca}
        </option>
      </select>

      <input
        type="number"
        value={filtros.tiempo}
        placeholder={texts[lang].placeHolder.tiempo}
        onChange={(e) => setFiltros({ ...filtros, tiempo: e.target.value })}
      />

      <input
        type="number"
        value={filtros.porciones}
        placeholder={texts[lang].placeHolder.porciones}
        onChange={(e) => setFiltros({ ...filtros, porciones: e.target.value })}
      />

      

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
