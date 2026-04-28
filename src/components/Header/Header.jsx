// Header.jsx

import LogoButton from "../LogoButton/LogoButton";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import LanguageButton from "../LanguageButton/LanguageButton";
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";

function Header({ filtros, setFiltros, titulo }) {
  const { lang } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black px-8 py-4 bg-[#feaf0d]">
      {/* Fila principal */}
      <div className="flex items-center justify-between gap-6">
        {/* Logo + Home */}
        <LogoButton />

        {/* Texto central que ocupa el centro */}
        <div className="flex-1 max-w-4xl">
          <p className="text-2xl font-light">{titulo || texts[lang].home}</p>
        </div>

        {/* Acciones derecha */}
        <div className="flex items-center gap-6">
          <FavoriteButton />
          <LanguageButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
