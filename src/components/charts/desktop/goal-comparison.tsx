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
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GoalComparisonChart: React.FC = () => {
  const data: ChartData<'bar'> = {
    labels: ['Goals Scored', 'Goals Conceded'],
    datasets: [
      {
        label: 'Barcelona',
        data: [62, 28],
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
        borderColor: 'rgb(37, 99, 235)',
        borderWidth: 1,
      },
      {
        label: 'Real Madrid',
        data: [68, 23],
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
    },
    scales: {
      y: {
        min: 0,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default GoalComparisonChart;
