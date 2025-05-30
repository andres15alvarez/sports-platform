'use client';

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

export default function YankeesHomeResultsChart() {
  const data: ChartData<'doughnut'> = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [14, 4],
        backgroundColor: ['#0A2351', '#DDDDDD'],
        hoverBackgroundColor: ['#061A38', '#CCCCCC'],
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
        text: 'Yankees Home Results',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}
