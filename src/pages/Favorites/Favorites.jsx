import { useState } from "react";
//import { recetario } from "../../../recetas_reales";
import { useLanguage } from "../../context/LanguageContext";
import { filtrosRecetas } from "../../utils/filtrado";
import { useEffect } from "react";
import { getRecetas } from "../../service/api";
import PagePrincipal from "../../components/pagePrincipal/pagePrincipal";

function Favorites() {
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
  const favoritos = recetario.filter((receta) => receta.isFavorite === true);
  const favoritosFiltrado = filtrosRecetas(favoritos, filtros, lang);

  return (
    <PagePrincipal
      filtros={filtros}
      setFiltros={setFiltros}
      recetario={favoritosFiltrado}
      setRecetario={setRecetario}
    />
  );
}
export default Favorites;
