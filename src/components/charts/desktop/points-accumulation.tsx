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
  Filler,
} from 'chart.js';
import { ChartData, ChartOptions, TooltipItem } from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
);

const PointsProgressionChart: React.FC = () => {
  const data: ChartData<'line'> = {
    labels: ['MD 5', 'MD 10', 'MD 15', 'MD 20', 'MD 25', 'MD 30', 'MD 34'],
    datasets: [
      {
        label: 'Barcelona',
        data: [10, 19, 30, 44, 56, 65, 73],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.1,
      },
      {
        label: 'Real Madrid',
        data: [12, 22, 35, 47, 60, 72, 78],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            return `${context.dataset.label}: ${context.raw} points`;
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Points',
        },
        min: 0,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PointsProgressionChart;
