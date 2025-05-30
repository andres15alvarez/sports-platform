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
  Title,
  Filler,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  Filler,
);

const SeasonProgressionChart: React.FC = () => {
  const data: ChartData<'line', number[], string> = {
    labels: [
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
    ],
    datasets: [
      {
        label: 'Barcelona Points',
        data: [6, 13, 22, 28, 35, 44, 53, 63, 72, 75],
        borderColor: '#0F4D92',
        backgroundColor: 'rgba(15, 77, 146, 0.1)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Real Madrid Points',
        data: [7, 16, 24, 31, 39, 49, 58, 67, 74, 78],
        borderColor: '#FFFFFF',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Season Points Progression',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 90,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default SeasonProgressionChart;
