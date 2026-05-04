import { useState, useEffect, useRef, useCallback } from "react";
import { filtrosRecetas } from "../../utils/filtrado";
import { useLanguage } from "../../context/LanguageContext";
import PagePrincipal from "../../components/pagePrincipal/pagePrincipal";
import { useInfiniteScroll } from "../../utils/useInfiniteScroll";
//recetario de muestra (para pruebas, tiene 100 recetas)
//import { recetario } from "../../../recetas_reales";

//conexion con api
import { getRecetas } from "../../service/api";

function Home() {
  //prueba sroll infinito
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const [filtros, setFiltros] = useState({
    titulo: "",
    ingredientes: "",
    type: "",
    tiempo: "",
    porciones: "",
    glutenFree: "",
  });

  const [recetario, setRecetario] = useState([]);

  useEffect(() => {
    let ignore = false;
    const fetchRecetas = async () => {
      setLoading(true);

      const data = await getRecetas({
        page,
        limit: 9,
        search: filtros.titulo,
      });

      if (ignore) return;

      if (data.length === 0) {
        setHasMore(false);
      } else {
        if (page === 1) {
          setRecetario(data);
        } else {
          setRecetario((prev) => {
            const nuevasRecetas = data.filter(
              (recetaNueva) => !prev.some((recetaPrevia) => recetaPrevia.id === recetaNueva.id)
            );
            return [...prev, ...nuevasRecetas];
          });
        }
      }

      setLoading(false);
    };

    fetchRecetas();

return () => {
      ignore = true;
    };

  }, [page, filtros.titulo]);

  
  const handleIntersect = useCallback(() => {
    setLoading(true);
    setPage((prev) => prev + 1);
  }, []);

  useInfiniteScroll(loaderRef, handleIntersect, {
    loading,
    hasMore,
  });


  const { lang } = useLanguage();

  const recetarioFiltrado = filtrosRecetas(
  recetario,
  {
    ...filtros,
    titulo: "", // esto lo maneja la API
  },
  lang
);

  return (
    <PagePrincipal
      filtros={filtros}
      setFiltros={setFiltros}
      recetario={recetarioFiltrado}
      setRecetario={setRecetario}
      loaderRef={loaderRef}
      loading={loading}
    />
  );
}
export default Home;
