// types/conductor.d.ts

export interface Conductor {
  id: number;
  usuario: Usuario;
  licencia: string;
  provincia: string;
  tipoContrato: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  passwordHash: string;
  tipoUsuario: string;
}

export interface ConductorRegistroDTO {
  nombre: string;
  email: string;
  password: string;
  licencia: string;
  provincia: string;
  tipoContrato: string;
}

export interface ConductorCreateDTO {
  usuarioId: number;
  licencia: string;
}

export interface ConductorUpdateDTO {
  nombre?: string;
  email?: string;
  password?: string;
  licencia?: string;
  provincia?: string;
  tipoContrato?: string;
}
