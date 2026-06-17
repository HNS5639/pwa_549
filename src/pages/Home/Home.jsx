import { useState, useEffect, useRef, useCallback } from "react";
import { filtrosRecetas } from "../../utils/filtrado";
import { useLanguage } from "../../context/LanguageContext";
import PagePrincipal from "../../Components/pagePrincipal/PagePrincipal";
import { useInfiniteScroll } from "../../utils/useInfiniteScroll";
import { getFavoritosIds } from "../../service/favorite";
import { useAuth } from "../../context/AuthContext";

//conexion con api
import { getRecetas } from "../../service/api";

function Home() {
  //prueba sroll infinito
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const [favIds, setFavIds] = useState([]);
  const { isAuthenticated } = useAuth();

  const [filtros, setFiltros] = useState({
    titulo: "",
    ingredientes: "",
    type: "",
    tiempo: "",
    porciones: "",
    glutenFree: "",
  });

  const [recetario, setRecetario] = useState([]);

  const { lang } = useLanguage();

  useEffect(() => {
    const fetchFavIds = async () => {
      if (isAuthenticated) {
        const ids = await getFavoritosIds();
        setFavIds(ids.data || []);
      } else {
        setFavIds([]);
      }
    };
    fetchFavIds();
  }, [isAuthenticated]);

  useEffect(() => {
    let ignore = false;
    const fetchRecetas = async () => {
      setLoading(true);

      const data = await getRecetas({
        page,
        limit: 9,
        search: filtros.titulo,
        lang: lang
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
  }, [page, filtros.titulo, lang]);

  const handleIntersect = useCallback(() => {
    setLoading(true);
    setPage((prev) => prev + 1);
  }, []);

  useInfiniteScroll(loaderRef, handleIntersect, {
    loading,
    hasMore,
  });

  const removeFavorite = false;
  const recetarioFiltrado = filtrosRecetas(
    recetario,
    {
      ...filtros
    },
    lang,
  );
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [filtros]);

  return (
    <PagePrincipal
      filtros={filtros}
      setFiltros={setFiltros}
      recetario={recetarioFiltrado}
      setRecetario={setRecetario}
      loaderRef={loaderRef}
      loading={loading}
      removeFavorite={removeFavorite}
      favIds={favIds}
      setFavIds={setFavIds}
    />
  );
}
export default Home;
