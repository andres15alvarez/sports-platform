'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

// Register necessary chart types
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip,
);

const TopHittersComparison: React.FC = () => {
  const data: ChartData<'bar' | 'line'> = {
    labels: ['Judge', 'Soto', 'Stanton', 'Devers', 'Yoshida', 'Casas'],
    datasets: [
      {
        label: 'Home Runs',
        data: [15, 12, 9, 10, 7, 8],
        backgroundColor: '#4CAF50',
        yAxisID: 'y',
        type: 'bar',
      },
      {
        label: 'RBIs',
        data: [36, 29, 24, 32, 22, 26],
        backgroundColor: '#2196F3',
        yAxisID: 'y',
        type: 'bar',
      },
      {
        label: 'Batting Avg',
        data: [0.328, 0.305, 0.258, 0.312, 0.296, 0.281],
        borderColor: '#FFC107',
        backgroundColor: '#FFC107',
        type: 'line',
        yAxisID: 'y1',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options: ChartOptions<'bar' | 'line'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Key Players Offensive Comparison',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'HR & RBI',
        },
      },
      y1: {
        beginAtZero: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        max: 0.4,
        title: {
          display: true,
          text: 'Batting Avg',
        },
      },
    },
  };

  return <Chart type="bar" data={data} options={options} />;
};

export default TopHittersComparison;
