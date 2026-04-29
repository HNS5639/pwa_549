import LogoButton from "../LogoButton/LogoButton";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import LanguageButton from "../LanguageButton/LanguageButton";

import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";

import { useLocation } from "react-router-dom";

function Header() {
  const { lang } = useLanguage();
  const location = useLocation();

  let headerTitle = texts[lang].home;

  if (location.pathname === "/favorites") {
    headerTitle = texts[lang].favorites;
  }

  if (location.pathname === "/home") {
    headerTitle = texts[lang].home;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black px-8 py-4 bg-[#feaf0d]">
      <div className="flex items-center justify-between gap-6">
        <LogoButton />

        <div className="flex-1 max-w-4xl">
          <p className="text-2xl font-light">
            {headerTitle}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <FavoriteButton />
          <LanguageButton />
        </div>
      </div>
    </header>
  );
}

export default Header;