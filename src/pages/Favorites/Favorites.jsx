import { useRef, useState, useCallback } from "react";
//import { recetario } from "../../../recetas_reales";
import { useLanguage } from "../../context/LanguageContext";
import { filtrosRecetas } from "../../utils/filtrado";
import { useEffect } from "react";
import { getRecetas } from "../../service/api";
import PagePrincipal from "../../Components/pagePrincipal/pagePrincipal";
import { useInfiniteScroll } from "../../utils/useInfiniteScroll";

function Favorites() {
  //lógica de prueba
  const [recetario, setRecetario] = useState([]);
  const { lang } = useLanguage();
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

  useEffect(() => {
    let ignore = false;
    const fetchRecetas = async () => {
      setLoading(true);

      const data = await getRecetas({
        page,
        limit: 9,
        search: filtros.titulo,
        isFavorite: true,
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
              (recetaNueva) =>
                !prev.some(
                  (recetaPrevia) => recetaPrevia.id === recetaNueva.id,
                ),
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

  const favoritosFiltrado = filtrosRecetas(recetario, filtros, lang);

  return (
    <PagePrincipal
      filtros={filtros}
      setFiltros={setFiltros}
      recetario={favoritosFiltrado}
      setRecetario={setRecetario}
      loaderRef={loaderRef}
      loading={loading}
    />
  );
}
export default Favorites;
