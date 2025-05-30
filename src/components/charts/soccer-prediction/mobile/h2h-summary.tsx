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
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MatchStatsComparisonChart: React.FC = () => {
  const data: ChartData<'bar', number[], string> = {
    labels: ['Goals Scored', 'Corners', 'Yellow Cards', 'Possession %'],
    datasets: [
      {
        label: 'Barcelona (avg. last 5)',
        data: [1.6, 5.8, 2.4, 58],
        backgroundColor: '#0F4D92',
      },
      {
        label: 'Real Madrid (avg. last 5)',
        data: [1.4, 5.2, 3.2, 42],
        backgroundColor: '#FFFFFF',
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
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MatchStatsComparisonChart;
