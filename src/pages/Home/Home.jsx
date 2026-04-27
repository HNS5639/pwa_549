import Card from "../../components/Card/Card";
import { useState, useEffect } from "react";
import { BotonAccion } from "../../components/Button/BotonAction";
import Filter from "../../components/Filters/Filters";
import { filtrosRecetas } from "../../utils/filtrado";
import { useLanguage } from "../../context/LanguageContext";
//recetario de muestra
//import { recetario } from "../../../recetas_reales";

//conexion con api
//import { getRecetas } from "../../service/api";

function Home() {
  //lógica de prueba
  const [recetario, setRecetario] = useState([]);

  useEffect(() => {
    fetch("https://69eaaa7715c7e2d51269f707.mockapi.io/recetarioApi/v1/recetario")
      .then((res) => res.json())
      .then((data) => setRecetario(data));
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
  //const recetarioFiltrado = getRecetas();
  return (
    <>
      <div>
        <Filter filtros={filtros} setFiltros={setFiltros} />
      </div>
      <section>
        {recetarioFiltrado.length === 0 ? (
          <p>No hay recetas pendientes.</p>
        ) : (
          recetarioFiltrado
            .slice(0, limite)
            .map((receta) => <Card key={receta.id} receta={receta} />)
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
    </>
  );
}
export default Home;
