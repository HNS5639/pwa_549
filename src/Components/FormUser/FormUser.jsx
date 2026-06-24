import { BotonAccion } from "./../Button/BotonAction";
import { Link } from "react-router-dom";

const FormUser = ({ 
  isNew, 
  email, 
  setEmail, 
  password, 
  setPassword, 
  onSubmit, 
  loading, 
  t 
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      
      {/* input de email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-600">
          {t.emailLabel || "Email"}
        </label>
        <input
          type="email"
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-colors"
          placeholder={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* input pass */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-600">
          {t?.passwordLabel}
        </label>
        <input
          type="password"
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 transition-colors"
          placeholder={t?.passwordLabel}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {/* recupero de contraseña 
        {!isNew && (
          <div className="text-right mt-1">
            <Link to="/passReset" className="text-xs text-blue-600 hover:underline">
              {t?.noPass}
            </Link>
          </div>
        )}
          */}
      </div>
      

      <BotonAccion
        texto={isNew ? (t?.registerButton) : (t.loginTitle)}
        tipo="submit"
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-700 hover:scale-105 active:scale-95 disabled:opacity-50"
      />
    </form>
  );
};

export default FormUser;