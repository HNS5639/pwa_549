import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import { BotonAccion } from "../../Components/Button/BotonAction";
import { Routes } from "../../const/routes";

// por el momento no hay manera de llegar a esto navegando. 
const Logout = () => {
  const { lang } = useLanguage();
  const t = texts[lang];
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Sesión cerrada");
    // Esto esta incompleto, no tiene nada de logica. 
    navigate(Routes.home);
  };

  const handleCancel = () => {
    navigate(Routes.home);
  };
  //Creo que me manda a home, al tocar si. 

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-100 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 uppercase tracking-wider">
          {t.logoutQuestion}
        </h2>
        <div className="flex gap-4">
          <BotonAccion 
            texto={t.confirmYes} 
            onClick={handleLogout} 
            className="flex-1"
          />
          <BotonAccion 
            texto={t.confirmNo} 
            onClick={handleCancel} 
            className="flex-1 !bg-gray-400 !border-gray-400 hover:!bg-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Logout;