import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout.component';
import AdmConductor from '../pages/conductor/administrarConductor';
import AdministrarUsuario from '../pages/usuarios/administrarUsuario';
import EstadisticasConductores from '../pages/conductor/estadisticasConductores';
//import AdminRutas from '../pages/AdminRutas';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><EstadisticasConductores /></Layout>} />
      <Route path="/administrar-conductor" element={<Layout><AdmConductor /></Layout>} />
      <Route path="/administrar-usuario" element={<Layout><AdministrarUsuario /></Layout>} />
      {/* <Route path="/admin-rutas" element={<Layout><AdminRutas /></Layout>} /> */}
    </Routes>
  );
};

export default AppRouter;
