// src/hooks/usuario/useUsuario.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUsuarios,
  crearUsuario,
  eliminarUsuario,
  cambiarPassword,
  filtrarPorTipoUsuario,
} from './usuario.request';

import type {
  Usuario,
  UsuarioCreateDTO,
  UsuarioUpdatePasswordDTO,
} from './usuario';

// Hook para listar usuarios
export const useListarUsuarios = () => {
  return useQuery<Usuario[]>({
    queryKey: ['usuarios'],
    queryFn: getUsuarios,
  });
};

// Hook para crear un nuevo usuario
export const useCrearUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UsuarioCreateDTO) => crearUsuario(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};

// Hook para eliminar usuario por ID
export const useEliminarUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => eliminarUsuario(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};

// Hook para cambiar la contraseña de un usuario
export const useCambiarPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UsuarioUpdatePasswordDTO }) =>
      cambiarPassword(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};

export const useFiltrarPorTipoUsuario = () => {
  return useMutation({
    mutationFn: (tipo: string) => filtrarPorTipoUsuario(tipo),
  });
};
