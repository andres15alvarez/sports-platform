'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ChartData, ChartOptions, TooltipItem } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MatchResultChart: React.FC = () => {
  const data: ChartData<'doughnut'> = {
    labels: ['Barcelona Win', 'Draw', 'Real Madrid Win'],
    datasets: [
      {
        data: [40, 30, 30],
        backgroundColor: [
          'rgba(37, 99, 235, 0.7)',
          'rgba(107, 114, 128, 0.7)',
          'rgba(147, 51, 234, 0.7)',
        ],
        hoverBackgroundColor: [
          'rgba(37, 99, 235, 0.9)',
          'rgba(107, 114, 128, 0.9)',
          'rgba(147, 51, 234, 0.9)',
        ],
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default MatchResultChart;
