import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import { BotonAccion } from "../../Components/Button/BotonAction";
import { AuthProvider } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
const Login = () => {
  const { lang } = useLanguage();
  const t = texts[lang];
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    console.log('clic');
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, password });
      console.log('inicia sesion')
      navigate("/");
    } catch (err) {
      console.log('Acá tenemos el error', err);
      setError(err.message || t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-100 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 uppercase tracking-wider">
          {t.loginTitle}
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm text-center font-semibold">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">
              {t.emailLabel}
            </label>
            <input
              type="email"
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-colors"
              placeholder={t.placeHolder.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">
              {t.passwordLabel}
            </label>
            <input
              type="password"
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-colors"
              placeholder={t.placeHolder.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <BotonAccion
            texto={t.loginButton}
            tipo="submit"
            className="px-4 py-2
            bg-blue-600 text-white
            rounded-lg
            cursor-pointer
            transition-all duration-200
            hover:bg-blue-700 hover:scale-105
            active:scale-95"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;