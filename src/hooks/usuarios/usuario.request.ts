// src/services/usuario.request.ts
import axios from 'axios';
import type {
  Usuario,
  UsuarioCreateDTO,
  UsuarioUpdatePasswordDTO,
} from './usuario';

// 1. Listar todos los usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
  const res = await axios.get('/api/usuarios');
  return res.data;
};

// 2. Crear nuevo usuario
export const crearUsuario = async (data: UsuarioCreateDTO): Promise<Usuario> => {
  const res = await axios.post('/api/usuarios', data);
  return res.data;
};

// 3. Eliminar usuario por ID
export const eliminarUsuario = async (id: number): Promise<void> => {
  await axios.delete(`/api/usuarios/${id}`);
};

// 4. Cambiar contraseña
export const cambiarPassword = async (
  id: number,
  data: UsuarioUpdatePasswordDTO
): Promise<Usuario> => {
  const res = await axios.put(`/api/usuarios/${id}`, data);
  return res.data;
};

export const filtrarPorTipoUsuario = async (
  tipo: string
): Promise<Usuario[]> => {
  const res = await axios.post('/api/usuarios/filtrar-por-tipo', {
    tipoUsuario: tipo,
  });
  return res.data;
};
