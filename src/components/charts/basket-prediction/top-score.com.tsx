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
  ChartOptions,
} from 'chart.js';
import { ChartData } from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
);

const PlayoffPerformanceChart: React.FC = () => {
  const data: ChartData<'bar'> = {
    labels: [
      'LeBron James',
      'Anthony Davis',
      'Austin Reaves',
      'Jayson Tatum',
      'Jaylen Brown',
      'Kristaps Porziņģis',
    ],
    datasets: [
      {
        label: 'Playoff Points',
        data: [26.8, 24.5, 18.7, 29.3, 26.1, 17.2],
        backgroundColor: '#008000',
      },
      {
        label: 'Playoff Rebounds',
        data: [8.2, 13.2, 3.5, 9.5, 5.8, 7.5],
        backgroundColor: '#0066CC',
      },
      {
        label: 'Playoff Assists',
        data: [9.1, 2.8, 5.2, 6.2, 3.4, 1.6],
        backgroundColor: '#FF6600',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Key Players Performance',
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

export default PlayoffPerformanceChart;
