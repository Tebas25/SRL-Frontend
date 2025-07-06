import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/App.route';
import { ToastContainer } from 'react-toastify';
import { ConfirmProvider } from './components/alert/alert';

const App = () => (
  <BrowserRouter>
    <ConfirmProvider> {/* ⬅️ Aquí envuelves */}
      <AppRouter />
      <ToastContainer />
    </ConfirmProvider>
  </BrowserRouter>
);

export default App;
