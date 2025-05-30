'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const LakersHomeResultsChart: React.FC = () => {
  const data: ChartData<'doughnut'> = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [36, 9],
        backgroundColor: ['#552583', '#FDB927'],
        hoverBackgroundColor: ['#4A216E', '#E9A912'],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Lakers Home Results' },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default LakersHomeResultsChart;
