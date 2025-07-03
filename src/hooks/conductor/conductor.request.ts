// src/api/conductor.request.ts
import axios from 'axios';
import type { Conductor, ConductorUpdateDTO } from './conductor';

const API_URL = '/api/conductores';

export const getConductores = async (): Promise<Conductor[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const crearConductor = async (data: { usuarioId: number; licencia: string }): Promise<Conductor> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const registrarNuevoConductor = async (data: {
  nombre: string;
  email: string;
  password: string;
  licencia: string;
}): Promise<Conductor> => {
  const res = await axios.post(`${API_URL}/registro`, data);
  return res.data;
};

export const actualizarConductor = async (id: number, data: ConductorUpdateDTO) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};


