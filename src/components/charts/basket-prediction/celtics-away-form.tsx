'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CelticsAwayResultsChart: React.FC = () => {
  const data: ChartData<'doughnut'> = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [32, 12],
        backgroundColor: ['#007A33', '#BA9653'],
        hoverBackgroundColor: ['#006128', '#A8874B'],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Celtics Away Results' },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default CelticsAwayResultsChart;
