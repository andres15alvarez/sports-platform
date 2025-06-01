'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ExpertPredictionsChart: React.FC = () => {
  const data: ChartData<'pie', number[], string> = {
    labels: ['Barcelona Win', 'Draw', 'Real Madrid Win'],
    datasets: [
      {
        data: [55, 20, 25],
        backgroundColor: ['#0F4D92', '#FFA500', '#FFFFFF'],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'OddsSite Expert Panel Predictions' },
    },
  };

  return <Pie data={data} options={options} />;
};

export default ExpertPredictionsChart;
