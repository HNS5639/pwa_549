import { useLanguage } from "../../context/LanguageContext";

function LanguageButton() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="border-l border-black pl-4"
    >
      {lang === "es" ? "EN" : "ES"}
    </button>
  );
}

export default LanguageButton;