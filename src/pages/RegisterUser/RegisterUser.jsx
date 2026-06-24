import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { texts } from "../../const/texts";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import FormUser from "../../Components/FormUser/FormUser";

const Register = () => {
  const { lang } = useLanguage();
  const t = texts[lang];
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({ email, password });
      navigate("/"); // O mandarlo al login para que entre
    } catch (err) {
      setError(err.message || t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-100 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 uppercase tracking-wider">
          {t.registerTitle || "Crear Cuenta"}
        </h2>
        
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center font-semibold">{error}</div>}

        <FormUser
          isNew={true} 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleRegister}
          loading={loading}
          t={t}
        />

        <div className="mt-6 text-center text-sm text-gray-600">
          {t?.siCuenta} <Link to="/login" className="text-blue-600 font-bold hover:underline">{t?.loginButton}</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;