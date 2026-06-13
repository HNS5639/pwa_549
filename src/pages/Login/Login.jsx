import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import { BotonAccion } from "../../Components/Button/BotonAction";

const Login = () => {
  const { lang } = useLanguage();
  const t = texts[lang];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    // Falta algo de autentificacion, pendiente
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-100 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 uppercase tracking-wider">
          {t.loginTitle}
        </h2>
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
            className="mt-4 w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;