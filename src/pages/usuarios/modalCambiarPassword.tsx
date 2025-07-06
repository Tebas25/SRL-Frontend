import { useState } from 'react';
import { Input } from '../../components/input.component';
import { Button } from '../../components/button.component';
import type { Usuario } from '../../hooks/usuarios/usuario.d';
import { useCambiarPassword } from '../../hooks/usuarios/useUsuario';
import { Notifications } from '../../components/notification.component';

interface Props {
  usuario: Usuario;
  onClose: () => void;
}

const CambiarPasswordModal = ({ usuario, onClose }: Props) => {
  const [nuevaPassword, setNuevaPassword] = useState('');
  const { mutate } = useCambiarPassword();

  const handleSubmit = () => {
    mutate({
      id: usuario.id,
      data: { password: nuevaPassword }
    }, {
      onSuccess: () => {
        Notifications.getSuccess('Contraseña actualizada correctamente')
        onClose()
      },
      onError: () => {
        Notifications.getError('A ocurrido un error')
      }
    });

  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="password"
        placeholder="Nueva contraseña"
        value={nuevaPassword}
        onChange={e => setNuevaPassword(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Guardar</Button>
      </div>
    </div>
  );
};

export default CambiarPasswordModal;
