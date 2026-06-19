import { useNavigate } from "react-router";
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";
import gorro404 from './../../assets/images/gorro-404.png'

function NotFound() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const t = texts[lang];

  return (
    <section className="flex items-center justify-center min-h-screen px-6">
      <div className="flex flex-col items-center text-center max-w-2xl">
        
        {/* 404 */}
        <h1 className="text-[120px] md:text-[180px] font-extrabold text-gray-200 leading-none select-none">
          404
        </h1>

        {/* Imagen */}
        <div className="-mt-12 md:-mt-20 mb-6">
          <img
            src={gorro404}
            alt="Gorro de cocina"
            className="w-52 md:w-72 drop-shadow-xl"
          />
        </div>

        {/* Texto */}
        <div className="p-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t.notFoundTitle || "¡Ups! Página no encontrada"}
          </h2>

          <p className="text-gray-500 text-lg mb-8">
            {t.notFoundMessage ||
              "Lo sentimos, la receta o página que buscas no existe."}
          </p>

          {/* Botón */}
          <button
            onClick={() => navigate("/")}
            className="
              px-8 py-3
              bg-orange-500
              hover:bg-orange-600
              text-white
              font-semibold
              rounded-full
              shadow-lg
              transition-all
              duration-300
            "
          >
            {t.backToHome || "Volver al inicio"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;