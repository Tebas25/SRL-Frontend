import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Home, User, Users, Map } from 'lucide-react'; // <-- Agregado Users

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-gradient-to-b from-[#0033A0] via-[#4B2C6A] to-[#C8102E] min-h-screen text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col`}>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-800">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} />
        </button>
        {isOpen && <h1 className="text-xl font-bold">SLR</h1>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-2">

          {/* Página Principal */}
          <li>
            <Link
              to="/"
              className={`flex items-center ${isOpen ? 'p-3 space-x-3' : 'justify-center py-4'} hover:bg-white/10 transition-all`}
            >
              <Home size={isOpen ? 24 : 36} className={isOpen ? '' : 'mx-auto'} />
              {isOpen && <span>Página Principal</span>}
            </Link>
          </li>

          {/* Administrar Conductor */}
          <li>
            <Link
              to="/administrar-conductor"
              className={`flex items-center ${isOpen ? 'p-3 space-x-3' : 'justify-center py-4'} hover:bg-white/10 transition-all`}
            >
              <User size={isOpen ? 24 : 36} className={isOpen ? '' : 'mx-auto'} />
              {isOpen && <span>Administrar Conductor</span>}
            </Link>
          </li>

          {/* Administrar Usuario */}
          <li>
            <Link
              to="/administrar-usuario"
              className={`flex items-center ${isOpen ? 'p-3 space-x-3' : 'justify-center py-4'} hover:bg-white/10 transition-all`}
            >
              <Users size={isOpen ? 24 : 36} className={isOpen ? '' : 'mx-auto'} /> {/* Icono diferente */}
              {isOpen && <span>Administrar Usuario</span>}
            </Link>
          </li>

          {/* Administrar Rutas */}
          <li>
            <Link
              to="/rutas"
              className={`flex items-center ${isOpen ? 'p-3 space-x-3' : 'justify-center py-4'} hover:bg-white/10 transition-all`}
            >
              <Map size={isOpen ? 24 : 36} className={isOpen ? '' : 'mx-auto'} />
              {isOpen && <span>Administrar Rutas</span>}
            </Link>
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
