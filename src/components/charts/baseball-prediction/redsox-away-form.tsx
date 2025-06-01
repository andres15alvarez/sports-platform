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

export default function RedSoxAwayResultsChart() {
  const data: ChartData<'doughnut'> = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [12, 8],
        backgroundColor: ['#BD3039', '#DDDDDD'],
        hoverBackgroundColor: ['#9A2830', '#CCCCCC'],
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
        text: 'Red Sox Away Results',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}
