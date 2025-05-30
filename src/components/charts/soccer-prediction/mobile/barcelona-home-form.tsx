'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const BarcelonaHomeResultsChart: React.FC = () => {
  const data: ChartData<'doughnut'> = {
    labels: ['Wins', 'Draws', 'Losses'],
    datasets: [
      {
        data: [14, 1, 1],
        backgroundColor: ['#008000', '#FFA500', '#FF0000'],
        hoverBackgroundColor: ['#006400', '#FF8C00', '#CC0000'],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Barcelona Home Results',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default BarcelonaHomeResultsChart;
