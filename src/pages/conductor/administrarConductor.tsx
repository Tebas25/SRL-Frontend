import { useEffect, useState } from 'react';
import { Input } from '../../components/input.component';
import { Button } from '../../components/button.component';
import { Pencil, Trash2, FilePlus } from 'lucide-react';
import { useListarConductores } from '../../hooks/conductor/useconductor';
import TableWrapper from '../../components/table.component';
import type { Column } from '../../components/table.component';
import Modal from '../../components/modal.component';
import FormularioConductor from './modalConductor';
import type { Conductor } from '../../hooks/conductor/conductor';


const AdmConductor = () => {
  const { data: conductores = [] } = useListarConductores();
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(conductores);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modoModal, setModoModal] = useState<'crear' | 'editar'>('crear');
  const [conductorSeleccionado, setConductorSeleccionado] = useState<Conductor | undefined>(undefined);

  const abrirModalCrear = () => {
    setModoModal('crear');
    setConductorSeleccionado(undefined);
    setIsModalOpen(true);
  };

  const abrirModalEditar = (conductores: Conductor) => {
    setModoModal('editar');
    setConductorSeleccionado(conductores);
    setTimeout(() => {
    setIsModalOpen(true);
  }, 0);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
  };


  const handleBuscar = () => {
    setFiltered(
      conductores.filter(c =>
        c.usuario.nombre.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handleLimpiar = () => {
    setSearch('');
    setFiltered(conductores);
  };

  useEffect(() => {
  setFiltered(conductores);
}, [conductores]);

  const columns: Column<typeof conductores[0]>[] = [
    { header: 'Nombre', accessor: 'usuario.nombre' },
    { header: 'Email', accessor: 'usuario.email' },
    { header: 'Licencia', accessor: 'licencia' },
    {
      header: 'Acción',
      render: (fila) => (
        <>
          <button
            onClick={() => abrirModalEditar(fila as Conductor)}
            className="text-blue-600 hover:text-blue-800 transform transition-transform hover:scale-105"
            title="Editar"
          >
            <Pencil size={22} />
          </button>
          <button
            className="text-red-600 hover:text-red-800 transform transition-transform hover:scale-115 ml-2"
            title="Eliminar"
          >
            <Trash2 size={22} />
          </button>
      </>
    ),
  }
  ];
  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src="/Quito_escudo.png"
            alt="Escudo de Quito"
            className="h-16 object-contain"
          />
          <img
            src="/Logo_EPQ_Color.png"
            alt="Logo Transporte"
            className="h-16 object-contain"
          />
        </div>

        {/* Icono de Crear (sin botón) */}
        <button
          onClick={abrirModalCrear}
          className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
          title="Crear nuevo conductor"
        >
          <FilePlus size={32} />
        </button>
      </header>


      <div className="flex items-center gap-2 mb-4 max-w-xl">
        <Input
          placeholder="Nombre"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Button onClick={handleBuscar}>Buscar</Button>
        <Button variant="secondary" onClick={handleLimpiar}>Limpiar</Button>
      </div>

      <TableWrapper data={filtered} columns={columns} />

      <Modal isOpen={isModalOpen} onClose={cerrarModal} title={modoModal === 'crear' ? 'Nuevo Conductor' : 'Editar Conductor'}>
        <FormularioConductor
          modo={modoModal}
          conductor={conductorSeleccionado}
          onClose={cerrarModal}
        />
      </Modal>
    </div>
  );
};

export default AdmConductor;
