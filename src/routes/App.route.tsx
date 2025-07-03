import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout.component';
import AdmConductor from '../pages/conductor/administrarConductor';
//import AdminRutas from '../pages/AdminRutas';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><h2 className="text-2xl">Bienvenido</h2></Layout>} />
      <Route path="/administrar-conductor" element={<Layout><AdmConductor /></Layout>} />
      {/* <Route path="/admin-rutas" element={<Layout><AdminRutas /></Layout>} /> */}
    </Routes>
  );
};

export default AppRouter;
