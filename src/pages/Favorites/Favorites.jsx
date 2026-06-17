import { useRef, useState, useCallback, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { filtrosRecetas } from "../../utils/filtrado";
import { getRecetas } from "../../service/api";
import PagePrincipal from "../../Components/pagePrincipal/PagePrincipal";
import { useInfiniteScroll } from "../../utils/useInfiniteScroll";
import { texts } from "../../const/texts";
import { useAuth } from "../../context/AuthContext";
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
    titulo: "",
    ingredientes: "",
    type: "",
    tiempo: "",
    porciones: "",
    glutenFree: "",
  });
  const [favIds, setFavIds] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavIds = async () => {
      if (isAuthenticated) {
        const ids = await getFavoritosIds();
        setFavIds(ids.data || []);
      }
    };
    fetchFavIds();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let ignore = false;
    const fetchRecetas = async () => {
      setLoading(true);

      const data = await getRecetasFavoritas({
        page,
        limit: 9,
        lang: lang
      });

      const recetasNuevas = data.data || [];

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
    };

    fetchRecetas();

    return () => {
      ignore = true;
    };
  }, [page, isAuthenticated, lang]);

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

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm border border-orange-100">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Acceso restringido</h2>
          <p className="text-gray-600 mb-6">Debes iniciar sesión para ver tus recetas favoritas.</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition"
          >
            Ir al Login
          </button>
        </div>
      </div>
    );
  }

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