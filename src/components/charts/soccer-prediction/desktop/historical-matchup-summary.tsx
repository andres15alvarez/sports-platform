'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ChartData, ChartOptions, TooltipItem } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
  const data: ChartData<'pie'> = {
    labels: ['Barcelona Wins', 'Draws', 'Real Madrid Wins'],
    datasets: [
      {
        data: [96, 52, 101],
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

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const dataset = context.dataset.data as number[];
            const total = dataset.reduce((a, b) => a + b, 0);
            const value = context.raw as number;
            const percentage = Math.round((value / total) * 100);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
