import { useState, useEffect } from "react";
import { filtrosRecetas } from "../../utils/filtrado";
import { useLanguage } from "../../context/LanguageContext";
import PagePrincipal from "../../components/pagePrincipal/pagePrincipal";
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
    <PagePrincipal filtros={filtros} setFiltros={setFiltros} recetario={recetarioFiltrado} setRecetario={setRecetario}/>
  );
}
export default Home;
