'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { ChartOptions, ChartData } from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function YankeesRedSoxLineChart() {
  const data: ChartData<'line'> = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Yankees Wins',
        data: [12, 15, 0, 0, 0, 0],
        borderColor: '#0A2351',
        backgroundColor: 'rgba(10, 35, 81, 0.1)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Red Sox Wins',
        data: [10, 13, 0, 0, 0, 0],
        borderColor: '#BD3039',
        backgroundColor: 'rgba(189, 48, 57, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Season Wins Progression',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 30,
      },
    },
  };

  return <Line data={data} options={options} />;
}
