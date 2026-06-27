import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../../const/routes";
import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { lang, toggleLanguage } = useLanguage();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex-1">
          <Link to={Routes.home} className="flex items-center gap-2">
            <span className="text-3xl font-light tracking-tighter text-gray-800">
              <span className="text-orange-500 font-bold">+</span>549
            </span>
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl text-gray-800 focus:outline-none"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>

        <div className="hidden md:flex flex-1 justify-end items-center gap-6 text-gray-600 font-bold text-sm">
          {isAuthenticated ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">

              {user?.rol === 'superUsuario' && (
                <Link to={Routes.adminUser}>
                  ⚙️ {texts[lang].adminUser}
                </Link>
              )}

              {(user?.rol === 'superUsuario' || user?.rol === 'administrador') && (
                <Link to={Routes.recipeCreator} 
                className="text-left hover:text-orange-500 py-2 border-b border-gray-100" 
                title={texts[lang].createRecipe}>
                  ➕ {texts[lang].create}
                </Link>
              )}

              <Link to={Routes.favorites} className="text-left hover:text-orange-500 py-2 border-b border-gray-100">
                ❤️ {texts[lang].favorites}
              </Link>

              <button onClick={handleLogout} className="text-left hover:text-orange-500 py-2 border-b border-gray-100">
                🚪 Logout
              </button>

            </div>
          )
            : (<Link to={Routes.login}>
              👤 Login
            </Link>
            )}

          <button
            onClick={() => toggleLanguage(lang === "es" ? "en" : "es")}
            className="flex items-center gap-1 text-left hover:text-orange-500 py-2 border-b border-gray-100"
          >
            🌐 {lang}
          </button>

        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg flex flex-col px-6 py-4 gap-4 text-gray-600 font-bold text-sm">
          {isAuthenticated ? (
            <>

              <Link to={Routes.favorites} onClick={closeMenu} className="text-left hover:text-orange-500 py-2 border-b border-gray-100">
                ❤️ {texts[lang].favorites}
              </Link>

              {(user?.rol === 'superUsuario' || user?.rol === 'administrador') && (
                <Link to={Routes.recipeCreator} onClick={closeMenu} className="text-left hover:text-orange-500 py-2 border-b border-gray-100">
                  ➕ Crear Receta
                </Link>
              )}

              {user?.rol === 'superUsuario' && (
                <Link to={Routes.adminUser} onClick={closeMenu} className="text-left hover:text-orange-500 py-2 border-b border-gray-100">
                  ⚙️ {texts[lang].adminUser}
                </Link>
              )}
              <button onClick={handleLogout} className="text-left hover:text-orange-500 py-2 border-b border-gray-100">
                🚪 Logout
              </button>
            </>
          ) : (
            <Link to={Routes.login} onClick={closeMenu} className="text-left hover:text-orange-500 py-2 border-b border-gray-100">
              👤 Login
            </Link>
          )}

          <button
            onClick={() => {
              toggleLanguage(lang === "es" ? "en" : "es");
              closeMenu();
            }}
            className="text-left hover:text-orange-500 py-2 border-b border-gray-100"
          >
            🌐 {lang}
          </button>
        </div>
      )}

    </header>
  );
};

export default Navbar;
