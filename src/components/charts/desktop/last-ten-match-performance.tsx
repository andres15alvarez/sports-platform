'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { ChartData, ChartOptions, TooltipItem } from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
);

const PointsLineChart: React.FC = () => {
  const data: ChartData<'line'> = {
    labels: [
      'MD 25',
      'MD 26',
      'MD 27',
      'MD 28',
      'MD 29',
      'MD 30',
      'MD 31',
      'MD 32',
      'MD 33',
      'MD 34',
    ],
    datasets: [
      {
        label: 'Barcelona',
        data: [3, 3, 1, 3, 0, 3, 3, 1, 3, 3],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.1,
      },
      {
        label: 'Real Madrid',
        data: [3, 3, 3, 3, 3, 1, 3, 3, 3, 1],
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
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            const value = context.raw as number;
            if (value === 3) return `${context.dataset.label}: Win (3 pts)`;
            if (value === 1) return `${context.dataset.label}: Draw (1 pt)`;
            return `${context.dataset.label}: Loss (0 pts)`;
          },
        },
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 3,
        ticks: {
          stepSize: 1,
          callback: (value: string | number) => {
            if (value === 3) return 'Win';
            if (value === 1) return 'Draw';
            if (value === 0) return 'Loss';
            return '';
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PointsLineChart;
