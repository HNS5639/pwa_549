import Card from "../../components/Card/Card";
import { useState, useEffect } from "react";
import { BotonAccion } from "../../components/Button/BotonAction";
import Filter from "../../components/Filters/Filters";
import { filtrosRecetas } from "../../utils/filtrado";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router";
import { texts } from "../../const/texts";
//recetario de muestra (para pruebas, tiene 100 recetas)
//import { recetario } from "../../../recetas_reales";

//conexion con api
import { getRecetas } from "../../service/api";

function Home() {
  //lógica de prueba
  const [recetario, setRecetario] = useState([]);

  useEffect(() => {
    const cargarRecetas = async () => {
      const data = await getRecetas();
      setRecetario(data);
    };
    cargarRecetas();
  }, []);

  const { lang } = useLanguage();
  const [limite, setLimite] = useState(10); // Mostramos solo 10 recetas al principio
  const [filtros, setFiltros] = useState({
    titulo: "",
    ingredientes: "",
    type: "",
    tiempo: "",
    porciones: "",
    glutenFree: "",
  });
  const recetarioFiltrado = filtrosRecetas(recetario, filtros, lang);
  return (
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
      <aside className="w-1/4">
        <Filter filtros={filtros} setFiltros={setFiltros} />
      </aside>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recetarioFiltrado.length === 0 ? (
          <p>{texts[lang].noReceta}</p>
        ) : (
          recetarioFiltrado.slice(0, limite).map((receta) => (
            <Link to={`/details/${receta.id}`} key={receta.id}>
              <Card receta={receta} />
            </Link>
          ))
        )}
        <div className="flex justify-center mt-6">
          {limite < recetarioFiltrado.length && (
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
export default Home;
