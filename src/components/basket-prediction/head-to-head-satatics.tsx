import React from 'react';
import HeadToHeadSection from '../head-to-head';
import LakersCelticsStatsChart from '../charts/basket-prediction/h2h-summary';
import LakersCelticsRadarChart from '../charts/basket-prediction/team-performance-com';

interface Match {
  date: string;
  competition: string;
  result: string;
  score: string;
  team1: string;
  team2: string;
  loss: string;
  scorers1: string;
  scorers2: string;
}

interface SummaryStats {
  barcelona: number;
  draws: number;
  madrid: number;
  titleOne: string;
  titleTwo: string;
  titleThree: string;
}

const matches: Match[] = [
  {
    date: 'Feb 1, 2025',
    competition: 'Regular Season',
    result: 'Loss',
    score: '115-102',
    team1: 'Celtics',
    team2: 'Lakers',
    loss: 'Lakers',
    scorers1: 'Tatum (32 pts)',
    scorers2: 'James (25 pts)',
  },
  {
    date: 'Nov 18, 2024',
    competition: 'Regular Season',
    result: 'Win',
    score: '112-108',
    team1: 'Lakers',
    team2: 'Celtics',
    loss: 'Lakers',
    scorers1: 'Davis (28 pts)',
    scorers2: 'Brown (26 pts)',
  },
  {
    date: 'Mar 25, 2024',
    competition: 'Regular Season',
    result: 'Loss',
    score: '122-118',
    team1: 'Celtics',
    team2: 'Lakers',
    loss: 'Lakers',
    scorers1: 'Tatum (30 pts)',
    scorers2: 'James (30 pts)',
  },
  {
    date: 'Dec 13, 2023',
    competition: 'Regular Season',
    result: 'Loss',
    score: '118-110',
    team1: 'Lakers',
    team2: 'Celtics',
    loss: 'Lakers',
    scorers1: 'Davis (27 pts)',
    scorers2: 'Brown (25 pts)',
  },
  {
    date: 'Jan 28, 2023',
    competition: 'Regular Season',
    result: 'Win',
    score: '125-121',
    team1: 'Lakers',
    team2: 'Celtics',
    loss: 'Lakers',
    scorers1: 'James (33 pts)',
    scorers2: 'Tatum (29 pts)',
  },
];

const summaryStats: SummaryStats = {
  barcelona: 3,
  draws: 0,
  madrid: 7,
  titleOne: 'Lakers',
  titleTwo: 'Overtime',
  titleThree: 'Celtics',
};

const insights: string[] = [
  'Celtics have won 7 of the last 10 meetings between these teams',
  'Average combined score of 223.2 points in their last 10 meetings',
  'Games often feature high scoring with 8 of 10 going Over 220 points',
  'Home court advantage has been significant (home team won 60%)',
  'Celtics have held Lakers under 110 points in 6 of last 10 matchups',
];

const HeadToHeadSatatics: React.FC = () => {
  return (
    <HeadToHeadSection
      titleOne="Last 5 Lakers vs Celtics Matches"
      matches={matches}
      summaryStats={summaryStats}
      insights={insights}
      h2hChart={<LakersCelticsStatsChart />}
      teamPerformanceChart={<LakersCelticsRadarChart />}
    />
  );
};

export default HeadToHeadSatatics;
