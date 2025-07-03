import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getConductores,
  crearConductor,
  registrarNuevoConductor,
  actualizarConductor
} from './conductor.request';

import type {
  Conductor,
  ConductorCreateDTO,
  ConductorRegistroDTO,
  ConductorUpdateDTO
} from './conductor.d';

export const useListarConductores = () => {
  return useQuery<Conductor[]>({
    queryKey: ['conductores'],
    queryFn: getConductores
  });
};


export const useCrearConductor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ConductorCreateDTO) => crearConductor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conductores'] });
    }
  });
};

export const useRegistrarConductor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ConductorRegistroDTO) => registrarNuevoConductor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conductores'] });
    }
  });
};

export const useActualizarConductor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ConductorUpdateDTO }) =>
      actualizarConductor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conductores'] });
    },
    onError: (error) => {
      console.error('Error al actualizar conductor:', error);
    },
  });
};

