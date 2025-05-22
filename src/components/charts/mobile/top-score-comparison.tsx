'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
);

const KeyPlayersChart: React.FC = () => {
  const data: ChartData<'bar', number[], string> = {
    labels: [
      'Lewandowski',
      'Raphinha',
      'Yamal',
      'Bellingham',
      'Vinicius Jr',
      'Joselu',
    ],
    datasets: [
      {
        label: 'Goals',
        data: [24, 11, 9, 17, 15, 8],
        backgroundColor: '#008000',
      },
      {
        label: 'Assists',
        data: [8, 12, 7, 5, 9, 3],
        backgroundColor: '#0066CC',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Key Players Goal Contributions',
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default KeyPlayersChart;
