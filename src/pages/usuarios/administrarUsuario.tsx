import { useEffect, useState } from 'react';
import { Input } from '../../components/input.component';
import { Button } from '../../components/button.component';
import TableWrapper from '../../components/table.component';
import Modal from '../../components/modal.component';
import { useListarUsuarios, useEliminarUsuario } from '../../hooks/usuarios/useUsuario';
import type { Usuario } from '../../hooks/usuarios/usuario.d';
import { Trash2, KeyRound, FilePlus } from 'lucide-react';
import FormularioUsuario from './modalUsuario';
import CambiarPasswordModal from './modalCambiarPassword';
import Chip from '../../components/chip.component';
import { useAlertConfirm } from '../../components/alert/alert-confirm';
import { Notifications } from '../../components/notification.component';

const AdmUsuario = () => {
  const { data: usuarios = [] } = useListarUsuarios();
  const eliminarUsuario = useEliminarUsuario();

  const [search, setSearch] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const [filtered, setFiltered] = useState<Usuario[]>(usuarios);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modoModal, setModoModal] = useState<'crear' | 'password'>('crear');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const { handleAlertConfirm } = useAlertConfirm();

  const abrirModal = (modo: typeof modoModal, usuario?: Usuario) => {
    setModoModal(modo);
    setUsuarioSeleccionado(usuario ?? null);
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setUsuarioSeleccionado(null);
  };

  const handleBuscar = () => {
    const nombreFiltrado = usuarios.filter(u =>
      u.nombre.toLowerCase().includes(search.toLowerCase())
    );
    const tipoFiltrado = tipoFiltro
      ? nombreFiltrado.filter(u => u.tipoUsuario === tipoFiltro)
      : nombreFiltrado;

    setFiltered(tipoFiltrado);
  };

  const handleLimpiar = () => {
    setSearch('');
    setTipoFiltro('');
    setFiltered(usuarios);
  };

  useEffect(() => {
    setFiltered(usuarios);
  }, [usuarios]);

  const columns = [
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Tipo Usuario',
      accessor: 'tipoUsuario',
      render: (tipo: string) => {
        const color =
          tipo === 'admin'
            ? 'blue'
            : tipo === 'conductor'
            ? 'green-light'
            : 'yellow';
        return <Chip color={color}>{tipo}</Chip>;
      },
    },
    {
      header: 'Acción',
      render: (_: any, fila: Usuario) => (
        <>
          <button
            onClick={() => abrirModal('password', fila)}
            className="text-yellow-600 hover:text-yellow-800 hover:scale-105 transition-transform hover:scale-115 ml-2"
            title="Cambiar Contraseña"
          >
            <KeyRound size={22} />
          </button>
          <button
            onClick={(): void => {
              handleAlertConfirm({
                onAccept: async () => {
                  eliminarUsuario.mutate(fila.id, {
                    onSuccess: () => {
                      Notifications.getSuccess('Usuario eliminado correctamente');
                    },
                    onError: () => {
                      Notifications.getError('Ha ocurrido un error');
                    },
                  });
                },
              });
            }}
            className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform hover:scale-115 ml-3"
            title="Eliminar"
          >
            <Trash2 size={22} />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img src="/Quito_escudo.png" alt="Escudo de Quito" className="h-16 object-contain" />
          <img src="/Logo_EPQ_Color.png" alt="Logo Transporte" className="h-16 object-contain" />
        </div>
        <button
          onClick={() => abrirModal('crear')}
          className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
          title="Crear nuevo usuario"
        >
          <FilePlus size={32} />
        </button>
      </header>

      {/* Filtros */}
      <div className="flex items-center gap-2 mb-4 max-w-xl">
        <Input
          placeholder="Nombre"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-[180px]"
        />
        <select
          className="border rounded px-2 py-1 text-sm"
          value={tipoFiltro}
          onChange={e => setTipoFiltro(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="admin">Admin</option>
          <option value="conductor">Conductor</option>
          <option value="ciudadano">Ciudadano</option>
        </select>
        <Button onClick={handleBuscar}>Buscar</Button>
        <Button variant="secondary" onClick={handleLimpiar}>Limpiar</Button>
      </div>


      {/* Tabla */}
      <TableWrapper data={filtered} columns={columns} />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={cerrarModal}
        title={modoModal === 'crear' ? 'Nuevo Usuario' : 'Cambiar Contraseña'}
      >
        {modoModal === 'crear' && (
          <FormularioUsuario onClose={cerrarModal} modo="crear" />
        )}
        {modoModal === 'password' && usuarioSeleccionado && (
          <CambiarPasswordModal
            usuario={usuarioSeleccionado}
            onClose={cerrarModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdmUsuario;
