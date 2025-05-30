'use client';

import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const YankeesVsRedSoxRadarChart: React.FC = () => {
  const data: ChartData<'radar'> = {
    labels: [
      'Hitting',
      'Pitching',
      'Defense',
      'Home Runs',
      'Bullpen',
      'Recent Form',
    ],
    datasets: [
      {
        label: 'Yankees',
        data: [85, 90, 80, 95, 85, 85],
        backgroundColor: 'rgba(10, 35, 81, 0.2)',
        borderColor: '#0A2351',
        pointBackgroundColor: '#0A2351',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#0A2351',
      },
      {
        label: 'Red Sox',
        data: [80, 75, 82, 78, 72, 75],
        backgroundColor: 'rgba(189, 48, 57, 0.2)',
        borderColor: '#BD3039',
        pointBackgroundColor: '#BD3039',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#BD3039',
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    maintainAspectRatio: false,
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

export default YankeesVsRedSoxRadarChart;
