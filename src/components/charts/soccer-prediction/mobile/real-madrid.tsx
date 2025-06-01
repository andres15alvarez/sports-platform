'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
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

const RealMadridAwayResultsChart: React.FC = () => {
  const data: ChartData<'doughnut', number[], string> = {
    labels: ['Wins', 'Draws', 'Losses'],
    datasets: [
      {
        data: [11, 3, 2],
        backgroundColor: ['#008000', '#FFA500', '#FF0000'],
        hoverBackgroundColor: ['#006400', '#FF8C00', '#CC0000'],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: {
        display: true,
        text: 'Real Madrid Away Results',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default RealMadridAwayResultsChart;
