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
} from 'chart.js';
import { ChartData, ChartOptions, TooltipItem } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart: React.FC = () => {
  const data: ChartData<'bar'> = {
    labels: ['1-15', '16-30', '31-45', '46-60', '61-75', '76-90'],
    datasets: [
      {
        label: 'Barcelona',
        data: [2, 3, 4, 2, 3, 2],
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
        borderColor: 'rgb(37, 99, 235)',
        borderWidth: 1,
      },
      {
        label: 'Real Madrid',
        data: [1, 2, 3, 5, 4, 3],
        backgroundColor: 'rgba(147, 51, 234, 0.7)',
        borderColor: 'rgb(147, 51, 234)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'bar'>) => {
            return `${context.dataset.label}: ${context.raw} goals`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Minutes',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Goals',
        },
        min: 0,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
