'use client';

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ExpertPanelPieChart: React.FC = () => {
  const data: ChartData<'pie'> = {
    labels: ['Yankees Win', 'Red Sox Win', 'Over 8.5 Runs', 'Under 8.5 Runs'],
    datasets: [
      {
        data: [60, 15, 55, 20],
        backgroundColor: ['#0A2351', '#BD3039', '#4CAF50', '#FF9800'],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'OddsSite Expert Panel Predictions',
      },
    },
  };

  return Pie({ data, options });
};

export default ExpertPanelPieChart;
