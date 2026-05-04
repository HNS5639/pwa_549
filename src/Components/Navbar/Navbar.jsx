import { texts } from "../../const/texts";
import { useNavigate } from "react-router";
import { Routes } from "../../const/routes";
import { useLanguage } from "../../context/LanguageContext";

function Navbar() {
  const navigate = useNavigate();
  const { lang, toggleLanguage } = useLanguage();

  return (
    <nav>
      {/* Botón idioma */}
      <button onClick={toggleLanguage}>
        {lang === "es" ? "EN" : "ES"}
      </button>

      {/* Navegación */}
      <button onClick={() => navigate(Routes.home)}>
        {texts[lang].home}
      </button>

      <button onClick={() => navigate(Routes.favorites)}>
        {texts[lang].favorites}
      </button>
    </nav>
  );
}

export default Navbar;