'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const OddsPredictionPieChart: React.FC = () => {
  const data: ChartData<'pie', number[], string> = {
    labels: ['Lakers Win', 'Celtics Win'],
    datasets: [
      {
        data: [40, 60],
        backgroundColor: ['#552583', '#007A33'],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: {
        display: true,
        text: 'Odds Expert Panel Predictions',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default OddsPredictionPieChart;
