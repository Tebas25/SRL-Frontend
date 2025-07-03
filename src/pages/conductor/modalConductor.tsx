// src/components/formularioConductor.component.tsx
import { useState, useEffect } from 'react';
import { Button } from '../../components/button.component';
import { Input } from '../../components/input.component';
import { useActualizarConductor, useRegistrarConductor } from '../../hooks/conductor/useconductor';
import type { Conductor } from '../../hooks/conductor/conductor';

interface Props {
  modo: 'crear' | 'editar';
  onClose: () => void;
  conductor?: Conductor;
}

const FormularioConductor = ({ modo, onClose, conductor }: Props) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [licencia, setLicencia] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: registrar } = useRegistrarConductor();
  const { mutate: actualizar } = useActualizarConductor();

  useEffect(() => {
    if (modo === 'editar' && conductor) {
      setNombre(conductor.usuario.nombre);
      setEmail(conductor.usuario.email);
      setLicencia(conductor.licencia);
    } else {
      setNombre('');
      setEmail('');
      setLicencia('');
    }
  }, [modo, conductor]);
  

  if (modo === 'editar' && !conductor) {
    return <div className="p-4">Cargando datos del conductor...</div>;
  }

  const handleSubmit = () => {
    console.log('Modo:', modo);
    console.log('Conductor completo:', conductor);
    if (modo === 'crear') {
        registrar({
            nombre,
            email,
            password,
            licencia,
        }, { onSuccess: onClose });
    } else if (modo === 'editar' && conductor) {
        console.log('ID:', conductor?.id);
        console.log('Datos a enviar:', { nombre, email, licencia });
      actualizar({
        id: conductor.id,
        data: {
            nombre,
            email,
            licencia,
        },
      }, { onSuccess: onClose });
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
        <Input placeholder="Licencia" value={licencia} onChange={e => setLicencia(e.target.value)} />
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>{modo === 'crear' ? 'Guardar' : 'Actualizar'}</Button>
      </div>
    </div>
  );
};

export default FormularioConductor;
