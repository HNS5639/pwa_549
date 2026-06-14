import { useRef, useState, useCallback, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { filtrosRecetas } from "../../utils/filtrado";
import { getRecetas } from "../../service/api";
import PagePrincipal from "../../Components/pagePrincipal/PagePrincipal";
import { useInfiniteScroll } from "../../utils/useInfiniteScroll";
import { texts } from "../../const/texts";

function Favorites() {
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
        // isFavorite: true,
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
                !prev.some((recetaPrevia) => recetaPrevia.id === recetaNueva.id)
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
    if (loading || !hasMore) return;
    setPage((prev) => prev + 1);
  }, [loading, hasMore]);

  useInfiniteScroll(loaderRef, handleIntersect, {
    loading,
    hasMore,
  });

  const removeFavorite = true;
  const favoritosFiltrado = filtrosRecetas(
  recetario,
  {
    ...filtros
  },
  lang
);
useEffect(() => {
  setPage(1);
  setHasMore(true);
}, [filtros]);

  if (!loading && favoritosFiltrado.length === 0) {
    const idiomaActual = texts[lang] || texts["es"];

    return (
      <div className="flex justify-center items-center w-full py-10 px-4">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full flex flex-col items-center text-center gap-4">
          
          <div className="text-5xl font-bold">🙁</div>
  
          <p className="text-sm font-medium leading-relaxed max-w-[320px]">
            {idiomaActual.sinFavoritos}
          </p>
        </div>
      </div>
    );
  }

  return (
    <PagePrincipal
      filtros={filtros}
      setFiltros={setFiltros}
      recetario={favoritosFiltrado}
      setRecetario={setRecetario}
      loaderRef={loaderRef}
      loading={loading}
      removeFavorite={removeFavorite}
    />
  );
}

export default Favorites;