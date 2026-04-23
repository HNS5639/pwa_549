import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("es");

  // carga desde localStorage al iniciar
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLang(savedLang);
  }, []);

  // guardar cuando cambia
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "es" ? "en" : "es"));
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// hook para usarlo fácil
export function useLanguage() {
  return useContext(LanguageContext);
}
