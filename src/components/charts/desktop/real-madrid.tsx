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
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

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

const RealMadridRadarChart: React.FC = () => {
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
        label: 'Real Madrid',
        data: [80, 85, 92, 85, 88, 90],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        pointBackgroundColor: 'rgb(147, 51, 234)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(147, 51, 234)',
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    responsive: true,
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

export default RealMadridRadarChart;
