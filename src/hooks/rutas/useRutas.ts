import { useQuery } from '@tanstack/react-query';
import {
  getRutasPorProvincia,
  getRutasPorConductor
} from './rutas.request';

import type {
  RutasPorProvincia,
  RutasPorConductor
} from './rutas.d';

export const useRutasPorProvincia = () => {
  return useQuery<RutasPorProvincia[]>({
    queryKey: ['rutas-provincia'],
    queryFn: getRutasPorProvincia
  });
};

export const useRutasPorConductor = () => {
  return useQuery<RutasPorConductor[]>({
    queryKey: ['rutas-conductor'],
    queryFn: getRutasPorConductor
  });
};
