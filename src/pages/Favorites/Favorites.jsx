import { useLanguage } from "../../context/LanguageContext";

const Favorites = () => {
  const { lang } = useLanguage();

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <div className="flex-1 flex justify-center items-center p-10">
        
        <div 
          className="w-full max-w-md rounded-[40px] p-12 flex flex-col items-center text-center shadow-2xl"
          style={{ backgroundColor: '#e91e63' }} 
        >
          <div className="text-white text-7xl mb-6">🔍</div>

          <h2 className="text-white text-2xl font-bold tracking-[0.2em] mb-4 uppercase">
            {lang === "es" ? "Aviso" : "Notice"}
          </h2>

          <p className="text-white text-base font-medium leading-relaxed">
            {lang === "es" 
              ? "No se ha podido encontrar ninguna receta que coincida con lo que buscaste." 
              : "No favorite recipes found matching your search."}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Favorites;