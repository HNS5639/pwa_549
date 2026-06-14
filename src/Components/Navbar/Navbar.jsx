import { Link } from "react-router-dom";
import { Routes } from "../../const/routes";
import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";

const Navbar = () => {
  const { lang, toggleLanguage } = useLanguage();

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
        {/* 
        <div className="flex-2 max-w-md flex justify-center items-center">
          <span className="text-xl font-bold text-gray-800">
            {texts[lang].recipeBook}
          </span>
        </div>
        */}
        <div className="flex-1 flex justify-end items-center gap-6 text-gray-600 font-bold text-sm">
          <Link to={Routes.login}>👤</Link>

          <Link to={Routes.favorites}>❤️</Link>
          {/* Al final, le saque el texto (con traduccion y todo) para que queden esos iconos magicos, no quiero usar otra libreria*/}

          <button
            onClick={() => toggleLanguage(lang === "es" ? "en" : "es")}
            className="flex items-center gap-1 hover:text-orange-500 transition-colors uppercase"
          >
            {lang} ▼
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
