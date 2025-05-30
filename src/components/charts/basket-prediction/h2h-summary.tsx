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
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const LakersCelticsStatsChart: React.FC = () => {
  const data: ChartData<'bar'> = {
    labels: ['Points Scored', 'Rebounds', 'Assists', 'FG%', '3PT%'],
    datasets: [
      {
        label: 'Lakers (avg. last 5)',
        data: [111.4, 44.2, 23.8, 46.5, 35.2],
        backgroundColor: '#552583',
      },
      {
        label: 'Celtics (avg. last 5)',
        data: [118.6, 46.6, 27.4, 48.3, 38.7],
        backgroundColor: '#007A33',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default LakersCelticsStatsChart;
