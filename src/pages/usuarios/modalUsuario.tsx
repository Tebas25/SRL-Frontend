// src/pages/usuario/modalUsuario.tsx
import { useState, useEffect } from 'react';
import { Button } from '../../components/button.component';
import { Input } from '../../components/input.component';
import { useCrearUsuario } from '../../hooks/usuarios/useUsuario';
import type { Usuario } from '../../hooks/usuarios/usuario.d';
import { Notifications } from '../../components/notification.component'; // usa la clase que tú ya definiste

interface Props {
  modo: 'crear' | 'editar';
  onClose: () => void;
  usuario?: Usuario;
}

const FormularioUsuario = ({ modo, onClose, usuario }: Props) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState<'admin' | 'conductor' | 'ciudadano'>('ciudadano');
  const [password, setPassword] = useState('');

  const { mutate: crearUsuario } = useCrearUsuario();

  useEffect(() => {
    if (modo === 'editar' && usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
      setTipoUsuario(usuario.tipoUsuario as any);
    } else {
      setNombre('');
      setEmail('');
      setTipoUsuario('ciudadano');
      setPassword('');
    }
  }, [modo, usuario]);

  if (modo === 'editar' && !usuario) {
    return <div className="p-4">Cargando datos del usuario...</div>;
  }

  const handleSubmit = () => {
    if (modo === 'crear') {
      crearUsuario(
        { nombre, email, password, tipoUsuario },
        {
          onSuccess: () => {
            Notifications.getSuccess('Usuario creado con éxito');
            onClose()
          },
          onError: () => {
            Notifications.getError('El correo electrónico ya esta en uso');
            onClose();
          }
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      {modo === 'crear' && (
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      )}
      <select
        className="border rounded px-3 py-2 text-sm"
        value={tipoUsuario}
        onChange={e => setTipoUsuario(e.target.value as any)}
      >
        <option value="admin">Administrador</option>
        <option value="conductor">Conductor</option>
        <option value="ciudadano">Ciudadano</option>
      </select>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>{modo === 'crear' ? 'Guardar' : 'Actualizar'}</Button>
      </div>
    </div>
  );
};

export default FormularioUsuario;
