import { useParams, useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { getRecetaById } from "../../service/api";
import  DetailRecipe  from "../../Components/DetailRecipe/DetailRecipe";
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";
import { Routes } from "../../const/routes";
import { BotonAccion } from "../../Components/Button/BotonAction";
import NotFound from "../NotFound/NotFound";
import { useAuth } from "../../context/AuthContext"; 
import { getFavoritosIds } from "../../service/favorite";
import CookingLoader from "../../Components/Loader/CookingLoader";


function Details() {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [favIds, setFavIds] = useState([]);


  const t = texts[lang] || texts["es"];

  useEffect(() => {
    const cargarReceta = async () => {
      setLoading(true);
      setError(false);
      
      try {
        const data = await getRecetaById(id, lang);
        
        if (!data || data === "Not found") {
          setError(true);
        } else {
          setReceta(data);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    cargarReceta();
  }, [id]);

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
    const removeFavorite = false;

  if (loading) {
    return <CookingLoader />; 
  }

  if (error || !receta) {
    return <NotFound />;
  }

  return (
    <DetailRecipe 
      receta={receta} 
      setReceta={setReceta} 
      onEdit={() => navigate(`${Routes.recipeEditor}/${id}`)}
      editButtonText={t.editRecipe}
      removeFavorite={removeFavorite}
      favIds={favIds}
      setFavIds={setFavIds}
    />
  );
}

export default Details;