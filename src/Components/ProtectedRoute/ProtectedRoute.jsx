import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Routes } from "../../const/routes";
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";

export function ProtectedRoute({ children, allowedRoles }) {
  const { lang } = useLanguage();
  const t = texts[lang];
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{t?.notAccess}.</h2>
        <p className="mb-6 text-gray-600">{t?.messAccess}.</p>
        <Link
          to={Routes.login}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          {t?.loginTitle}
        </Link>
      </div>
    );
  }

  if(allowedRoles && !allowedRoles.includes(user?.rol)){
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h2 className="text-2xl font-bold mb-4 text-red-600">{t?.notAccess}.</h2>
        <p className="mb-6 text-gray-600">{t?.messRol}.</p>
        <Link
          to={Routes.home}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          {t?.backToHome}
        </Link>
      </div>
    );
  }
  return children;
}