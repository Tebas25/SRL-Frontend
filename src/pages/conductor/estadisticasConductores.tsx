import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { useEstadisticasProvincia, useEstadisticasContrato } from '../../hooks/conductor/useconductor';
import { useRutasPorConductor } from '../../hooks/rutas/useRutas'; 


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController
);

const EstadisticasConductores = () => {
  const { data: provincias = [] } = useEstadisticasProvincia();
  const { data: contratos = [] } = useEstadisticasContrato();
  const { data: rutasConductor = [] } = useRutasPorConductor();

  const donutDataProvincia = {
    labels: provincias.map((p) => p.provincia),
    datasets: [
      {
        label: 'Conductores por provincia',
        data: provincias.map((p) => p.total),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56',
          '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF',
        ],
      },
    ],
  };

  const barDataContrato = {
    labels: contratos.map((c) => c.tipoContrato),
    datasets: [
      {
        label: 'Conductores por tipo de contrato',
        data: contratos.map((c) => c.total),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const lineDataRutas = {
    labels: rutasConductor.map((item) => item.conductor),
    datasets: [
      {
        label: 'Rutas asignadas por conductor',
        data: rutasConductor.map((item) => item.totalRutas),
        fill: false,
        borderColor: '#36A2EB',
        backgroundColor: '#36A2EB',
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="p-6">
      {/* Encabezado con logos */}
      <header className="flex items-center gap-4 mb-6">
        <img src="/Quito_escudo.png" alt="Escudo de Quito" className="h-16 object-contain" />
        <img src="/Logo_EPQ_Color.png" alt="Logo Transporte" className="h-16 object-contain" />
      </header>

      <h1 className="text-2xl font-bold text-center mb-8">Estadísticas de Conductores</h1>

      {/* Contenedor de gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center w-full">
        {/* Gráfico 1: Donut por provincia */}
        <div className="w-full max-w-xs h-[320px] flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2 text-center">Conductores por Provincia</h2>
          <Doughnut data={donutDataProvincia} options={{ maintainAspectRatio: false }} height={250} />
        </div>

        {/* Gráfico 2: Barras por contrato */}
        <div className="w-full max-w-xs h-[320px] flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2 text-center">Conductores por Tipo de Contrato</h2>
          <Bar data={barDataContrato} options={{ maintainAspectRatio: false }} height={250} />
        </div>

        {/* Gráfico 3: Polar Area por conductor */}
          <div className="w-full max-w-xs h-[320px] flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2 text-center">Rutas por Conductor</h2>
            <Line data={lineDataRutas} options={{ maintainAspectRatio: false }} height={250} />
          </div>
      </div>
    </div>
  );
};

export default EstadisticasConductores;
