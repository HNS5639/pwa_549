import { useState, useEffect, useRef, useCallback } from "react";
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
    titulo: ""
  });

  const [recetario, setRecetario] = useState([]);

  const { lang } = useLanguage();

  useEffect(() => {
    const fetchFavIds = async () => {
      if (isAuthenticated) {
        const respuestaBackend = await getFavoritosIds();

        setFavIds(respuestaBackend.data || []);

      } else {
        setFavIds([]);
      }
    };
    fetchFavIds();
  }, [isAuthenticated]);

  useEffect(() => {
    setPage(1);
  }, [filtros.titulo]);

  useEffect(() => {
    let ignore = false;
    const fetchRecetas = async () => {
      setLoading(true);

      const respuesta = await getRecetas({
        page,
        limit: 9,
        lang: lang,
        search: filtros.titulo
      });

      if (ignore) return;

      const listRecetas = Array.isArray(respuesta.data) ? respuesta.data : [];
      const totalPages = respuesta.totalPages || 1;

      if (listRecetas.length === 0) {
        setHasMore(false);
        if (page === 1) {
          setRecetario([]); 
        }
      } else {
        if (page === 1) {
          setRecetario(listRecetas);
        } else {
          setRecetario((prev) => {
            const nuevasRecetas = listRecetas.filter(
              (recetaNueva) =>
                !prev.some(
                  (recetaPrevia) => recetaPrevia.idReceta === recetaNueva.idReceta,
                ),
            );
            return [...prev, ...nuevasRecetas];
          });
        }
      }
      setLoading(false);
      if (page >= totalPages) {
        setHasMore(false); // Apaga el scroll si llegamos al final
      } else {
        setHasMore(true);  // Lo mantiene encendido
      }
    };

    fetchRecetas();

    return () => {
      ignore = true;
    };
  }, [page, filtros.titulo, lang]);

  const handleIntersect = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const removeFavorite = false;

  useInfiniteScroll(loaderRef, handleIntersect, {
    loading,
    hasMore,
  });


  useEffect(() => {
    let enPausa = false;

    const handleScroll = () => {
      if (enPausa) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        if (!loading && hasMore) {
          setPage((prev) => prev + 1);

          enPausa = true;
          setTimeout(() => { enPausa = false }, 1000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <PagePrincipal
      filtros={filtros}
      setFiltros={setFiltros}
      recetario={recetario}
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
