// src/types/usuario.ts

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  passwordHash: string;
  tipoUsuario: string;
}

export interface UsuarioCreateDTO {
  nombre: string;
  email: string;
  password: string;
  tipoUsuario: string; // 'ciudadano' | 'conductor' | 'admin'
}

export interface UsuarioUpdatePasswordDTO {
  password: string;
}
