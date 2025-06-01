'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler,
} from 'chart.js';
import { ChartOptions, ChartData } from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler,
);

const SeasonProgressionChart: React.FC = () => {
  const data: ChartData<'line'> = {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Lakers Wins',
        data: [4, 11, 18, 24, 31, 39, 46, 50],
        borderColor: '#FDB927',
        backgroundColor: 'rgba(253, 185, 39, 0.1)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Celtics Wins',
        data: [5, 14, 22, 30, 38, 47, 54, 58],
        borderColor: '#007A33',
        backgroundColor: 'rgba(0, 122, 51, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Season Wins Progression',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 65,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default SeasonProgressionChart;
