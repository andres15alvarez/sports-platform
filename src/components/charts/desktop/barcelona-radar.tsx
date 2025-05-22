'use client';

import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadarController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';
import React from 'react';

// Register the necessary chart elements
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

const BarcelonaRadarChart: React.FC = () => {
  const data: ChartData<'radar'> = {
    labels: [
      'Possession',
      'Passing',
      'Shooting',
      'Dribbling',
      'Defending',
      'Set Pieces',
    ],
    datasets: [
      {
        label: 'Barcelona',
        data: [95, 90, 85, 88, 75, 80],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        pointBackgroundColor: 'rgb(37, 99, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(37, 99, 235)',
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default BarcelonaRadarChart;
