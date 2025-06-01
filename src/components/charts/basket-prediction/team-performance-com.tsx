'use client';

import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadarController,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  RadarController,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const LakersCelticsRadarChart: React.FC = () => {
  const data: ChartData<'radar'> = {
    labels: [
      'Offense',
      'Defense',
      'Rebounding',
      '3PT Shooting',
      'Transition',
      'Bench Scoring',
    ],
    datasets: [
      {
        label: 'Lakers',
        data: [80, 85, 88, 75, 90, 70],
        backgroundColor: 'rgba(85, 37, 131, 0.2)',
        borderColor: '#552583',
        pointBackgroundColor: '#552583',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#552583',
      },
      {
        label: 'Celtics',
        data: [90, 92, 80, 95, 85, 88],
        backgroundColor: 'rgba(0, 122, 51, 0.2)',
        borderColor: '#007A33',
        pointBackgroundColor: '#007A33',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#007A33',
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    maintainAspectRatio: false,
    elements: {
      line: { borderWidth: 3 },
    },
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default LakersCelticsRadarChart;
