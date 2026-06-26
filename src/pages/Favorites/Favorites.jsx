import { useRef, useState, useCallback, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { filtrosRecetas } from "../../utils/filtrado";
import { getRecetas } from "../../service/api";
import PagePrincipal from "../../Components/pagePrincipal/PagePrincipal";
import { useInfiniteScroll } from "../../utils/useInfiniteScroll";
import { texts } from "../../const/texts";
import { useNavigate } from "react-router";
import { getRecetasFavoritas, getFavoritosIds } from "../../service/favorite";


function Favorites() {
  const [recetario, setRecetario] = useState([]);
  const { lang } = useLanguage();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const [filtros, setFiltros] = useState({
    titulo: ""
  });
  const [favIds, setFavIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavIds = async () => {
        const respuestaBackend = await getFavoritosIds();
        setFavIds(respuestaBackend.data || []);
    };
    fetchFavIds();
  }, []);

  useEffect(() => {
    let ignore = false;
    const fetchRecetas = async () => {
      setLoading(true);

      const data = await getRecetasFavoritas({
        page,
        limit: 9,
        lang: lang
      });
      const recetasNuevas = data.data || [];
      const totalPages = data.totalPages;

      if (ignore) return;

      if (data.length === 0) {
        setHasMore(false);
      } else {
        if (page === 1) {
          setRecetario(recetasNuevas);
        } else {
          setRecetario((prev) => {
            const recetasFiltradas = recetasNuevas.filter(
              (recetaNueva) =>
                !prev.some((recetaPrevia) => recetaPrevia.idReceta === recetaNueva.idReceta)
            );
            return [...prev, ...recetasFiltradas];
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
  }, [page, lang]);

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
      favIds={favIds}
      setFavIds={setFavIds}
    />
  );
}

export default Favorites;