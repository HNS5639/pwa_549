import { useState, useEffect } from "react";
import { getUsuarios, updateUsuarioRol } from "./../../service/user.service";
import CookingLoader from './../../Components/Loader/CookingLoader'
import { texts } from "../../const/texts";
import { useLanguage } from "../../context/LanguageContext";

function AdminUser() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();
  const t = texts[lang];

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarUsuarios();
  }, []);

  const handleRolChange = async (idUsuario, nuevoRol) => {
    try {
      await updateUsuarioRol(idUsuario, nuevoRol);
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((user) =>
          user.idUsuario === idUsuario ? { ...user, rol: nuevoRol } : user
        )
      );
      alert("¡Rol actualizado con éxito!");
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
      alert("Hubo un error al actualizar el rol.");
    }
  };

  if (loading) {
    return <CookingLoader />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-[60vh]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">{t?.userUpDate}</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rol
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.idUsuario} className="hover:bg-gray-50">
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{user.idUsuario}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <select
                    value={user.rol}
                    onChange={(e) => handleRolChange(user.idUsuario, e.target.value)}
                    className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
                  >
                    <option value="usuario">Usuario</option>
                    <option value="administrador">Administrador</option>
                    <option value="superUsuario">Super Usuario</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUser;