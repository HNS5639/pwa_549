import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Routes } from "../../const/routes";

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Acceso restringido</h2>
        <p className="mb-6 text-gray-600">Para hacer eso, por favor inicia sesión.</p>
        <Link
          to={Routes.login}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          Ir a Iniciar Sesión
        </Link>
      </div>
    );
  }
  return children;
}