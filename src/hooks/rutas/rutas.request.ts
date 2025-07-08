import axios from 'axios';
import type { RutasPorProvincia, RutasPorConductor } from './rutas';

const API_URL = '/api/rutas';

// Rutas por provincia
export const getRutasPorProvincia = async (): Promise<RutasPorProvincia[]> => {
  const res = await axios.get(`${API_URL}/reporte/rutas-por-provincia`);
  return res.data;
};

// Rutas por conductor
export const getRutasPorConductor = async (): Promise<RutasPorConductor[]> => {
  const res = await axios.get(`${API_URL}/reporte/rutas-por-conductor`);
  return res.data;
};
