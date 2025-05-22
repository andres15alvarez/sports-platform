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

const HorizontalBarChart: React.FC = () => {
  const data: ChartData<'bar'> = {
    labels: ['Barcelona', 'Real Madrid'],
    datasets: [
      {
        label: 'Goals Scored',
        data: [16, 18],
        backgroundColor: ['rgba(37, 99, 235, 0.7)', 'rgba(147, 51, 234, 0.7)'],
        borderColor: ['rgb(37, 99, 235)', 'rgb(147, 51, 234)'],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default HorizontalBarChart;
