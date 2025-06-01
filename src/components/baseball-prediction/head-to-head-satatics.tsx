'use client';

import React from 'react';
import HeadToHeadSection from '../head-to-head';
import YankeesVsRedSoxStatsChart from '../charts/baseball-prediction/h2h-summary';
import YankeesVsRedSoxRadarChart from '../charts/baseball-prediction/team-performance-com';

type Match = {
  date: string;
  competition: string;
  result: 'Win' | 'Loss';
  score: string;
  team1: string;
  team2: string;
  loss: string;
  scorers1: string;
  scorers2: string;
};

type SummaryStats = {
  barcelona: number;
  draws: number;
  madrid: number;
  titleOne: string;
  titleTwo: string;
  titleThree: string;
};

const matches: Match[] = [
  {
    date: 'Apr 11, 2025',
    competition: 'Regular Season',
    result: 'Win',
    score: '5-2',
    team1: 'Yankees',
    team2: 'Red Sox',
    loss: 'Yankees',
    scorers1: 'Soto (1HR), Rizzo (1HR)',
    scorers2: 'Devers (1HR)',
  },
  {
    date: 'Apr 12, 2025',
    competition: 'Regular Season',
    result: 'Loss',
    score: '6-3',
    team1: 'Red Sox',
    team2: 'Yankees',
    loss: 'Yankees',
    scorers1: 'Casas (1HR), Yoshida (1HR)',
    scorers2: 'Judge (1HR)',
  },
  {
    date: 'Apr 11, 2025',
    competition: 'Regular Season',
    result: 'Win',
    score: '5-2',
    team1: 'Yankees',
    team2: 'Red Sox',
    loss: 'Yankees',
    scorers1: 'Soto (1HR), Rizzo (1HR)',
    scorers2: 'Devers (1HR)',
  },
  {
    date: 'Apr 10, 2025',
    competition: 'Regular Season',
    result: 'Loss',
    score: '8-5',
    team1: 'Red Sox',
    team2: 'Yankees',
    loss: 'Yankees',
    scorers1: 'Devers (2HR), Duran (1HR)',
    scorers2: 'Judge (1HR), Stanton (1HR)',
  },
  {
    date: 'Sep 28, 2024',
    competition: 'Regular Season',
    result: 'Win',
    score: '9-2',
    team1: 'Yankees',
    team2: 'Red Sox',
    loss: 'Yankees',
    scorers1: 'Judge (1HR), Stanton (2HR), Soto (1HR)',
    scorers2: 'Casas (1HR)',
  },
];

const summaryStats: SummaryStats = {
  barcelona: 6,
  draws: 0,
  madrid: 4,
  titleOne: 'Yankees ',
  titleTwo: 'Ties',
  titleThree: 'Red Sox',
};

const insights: string[] = [
  'Yankees have won 4 of the last 5 home games against Red Sox',
  'Average of 9.2 runs per game in recent matchups',
  'Yankees have hit 18 home runs in the last 10 games against Boston',
  'Red Sox batters have maintained a .256 average against Yankees pitching',
  "Yankees' Gerrit Cole has a 1.87 ERA in his last 5 starts against Boston",
];

const HeadToHeadSatatics: React.FC = () => {
  return (
    <HeadToHeadSection
      titleOne="Last 5 Yankees-Red Sox Games"
      titleTwo="H2H Summary (Last 10 Games)"
      matches={matches}
      summaryStats={summaryStats}
      insights={insights}
      h2hChart={<YankeesVsRedSoxStatsChart />}
      teamPerformanceChart={<YankeesVsRedSoxRadarChart />}
    />
  );
};

export default HeadToHeadSatatics;
