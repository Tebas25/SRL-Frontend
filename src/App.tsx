import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/App.route';
import { ToastContainer } from 'react-toastify';

const App = () => (
  <BrowserRouter>
    <AppRouter />
    <ToastContainer />
  </BrowserRouter>
);

export default App;
