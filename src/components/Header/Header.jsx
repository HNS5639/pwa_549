// Header.jsx

import LogoButton from "../LogoButton/LogoButton";
import SearchBar from "../SearchBar/SearchBar";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import LanguageButton from "../LanguageButton/LanguageButton";

function Header({ filtros, setFiltros }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black px-8 py-4 bg-[#feaf0d]">
      
      {/* Fila principal */}
      <div className="flex items-center justify-between gap-6">
        
        {/* Logo + Home */}
        <LogoButton />

        {/* SearchBar ocupa el centro */}
        <div className="flex-1 max-w-4xl">
          <SearchBar
            filtros={filtros}
            setFiltros={setFiltros}
          />
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