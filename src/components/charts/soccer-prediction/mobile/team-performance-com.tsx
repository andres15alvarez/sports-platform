'use client';

import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadarController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
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

const RadarComparisonChart: React.FC = () => {
  const data: ChartData<'radar', number[], string> = {
    labels: [
      'Attack',
      'Defense',
      'Possession',
      'Set Pieces',
      'Home Form',
      'Recent Form',
    ],
    datasets: [
      {
        label: 'Barcelona',
        data: [85, 80, 90, 75, 95, 85],
        backgroundColor: 'rgba(15, 77, 146, 0.2)',
        borderColor: '#0F4D92',
        pointBackgroundColor: '#0F4D92',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#0F4D92',
      },
      {
        label: 'Real Madrid',
        data: [85, 75, 70, 80, 75, 75],
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: '#FFFFFF',
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#FFFFFF',
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

export default RadarComparisonChart;
