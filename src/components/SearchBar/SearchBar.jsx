import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import { BotonAccion } from "../Button/BotonAction";

function SearchBar({ filtros, setFiltros }) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  const limpiarFiltros = () => {
    setFiltros({
      titulo: "",
      ingredientes: "",
      type: "",
      tiempo: "",
      porciones: "",
      glutenFree: "",
    });
  };

  return (
    <div className="w-full">
      {/* Barra principal */}
      <div className="bg-[#d8d6c8] rounded-full px-6 py-3 flex items-center gap-4">
        
        {/* Botón menú */}
        <button onClick={() => setOpen(!open)}>
          {open ? "✖" : "☰"}
        </button>

        {/* Búsqueda por título */}
        <input
          type="text"
          value={filtros.titulo}
          placeholder={texts[lang].placeHolder.titulo}
          className="flex-1 bg-transparent outline-none"
          onChange={(e) =>
            setFiltros({
              ...filtros,
              titulo: e.target.value,
            })
          }
        />

        {/* Botón buscar */}
        <button>
          🔍
        </button>
      </div>

      {/* Filtros avanzados */}
      {open && (
        <div className="mt-4 bg-white p-4 rounded-xl shadow-md space-y-3">

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
            className="w-full border p-2 rounded"
          />

          <select
            value={filtros.type}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                type: e.target.value,
              })
            }
            className="w-full border p-2 rounded"
          >
            <option value="">
              {texts[lang].placeHolder.todo}
            </option>

            <option value="vegano">
              {texts[lang].placeHolder.vegano}
            </option>

            <option value="Vegetariano">
              {texts[lang].placeHolder.vegetariano}
            </option>
          </select>

          <input
            type="number"
            value={filtros.tiempo}
            placeholder={texts[lang].placeHolder.tiempo}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                tiempo: e.target.value,
              })
            }
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            value={filtros.porciones}
            placeholder={texts[lang].placeHolder.porciones}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                porciones: e.target.value,
              })
            }
            className="w-full border p-2 rounded"
          />

          <BotonAccion
            texto={texts[lang].placeHolder.limpiar}
            onClick={limpiarFiltros}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;