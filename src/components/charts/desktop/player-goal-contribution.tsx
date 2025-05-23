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

const GoalsContributionComparison: React.FC = () => {
  const data: ChartData<'bar'> = {
    labels: [
      'Lewandowski',
      'Pedri',
      'Raphinha',
      'Vinícius',
      'Bellingham',
      'Rodrygo',
    ],
    datasets: [
      {
        label: 'Goals',
        data: [27, 8, 10, 22, 18, 12],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
      {
        label: 'Assists',
        data: [6, 12, 8, 14, 10, 9],
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
        borderColor: 'rgb(245, 158, 11)',
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
          title: (context: TooltipItem<'bar'>[]) => {
            const index = context[0].dataIndex;
            const labels = [
              'Lewandowski (BAR)',
              'Pedri (BAR)',
              'Raphinha (BAR)',
              'Vinícius (RMA)',
              'Bellingham (RMA)',
              'Rodrygo (RMA)',
            ];
            return labels[index];
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        min: 0,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default GoalsContributionComparison;
