'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartOptions, ChartData } from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

const YankeesVsRedSoxStatsChart: React.FC = () => {
  const data: ChartData<'bar'> = {
    labels: ['Runs Scored', 'Home Runs', 'Batting Avg', 'ERA'],
    datasets: [
      {
        label: 'Yankees (avg. last 5)',
        data: [5.8, 1.8, 0.268, 3.45],
        backgroundColor: '#0A2351',
      },
      {
        label: 'Red Sox (avg. last 5)',
        data: [4.2, 1.2, 0.256, 4.32],
        backgroundColor: '#BD3039',
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

export default YankeesVsRedSoxStatsChart;
