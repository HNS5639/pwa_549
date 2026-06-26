import axiosInstance from "./axiosInstance";

export const getUsuarios = async () => {
  const response = await axiosInstance.get("/usuarios");
  return response.data;
};

export const updateUsuarioRol = async (idUsuario, nuevoRol) => {
  const response = await axiosInstance.put(`/usuarios/${idUsuario}/rol`, { nuevoRol });
  return response.data;
};