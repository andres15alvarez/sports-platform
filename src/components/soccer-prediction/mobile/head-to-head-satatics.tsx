import React from 'react';

import MatchStatsComparisonChart from '../../charts/soccer-prediction/mobile/h2h-summary';
import RadarComparisonChart from '../../charts/soccer-prediction/mobile/team-performance-com';
import HeadToHeadSection from '../../head-to-head';

interface Match {
  date: string;
  competition: string;
  result: 'Win' | 'Loss' | 'Draw' | string;
  score: string;
  team1: string;
  team2: string;
  loss?: string;
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
    date: 'Oct 28, 2024',
    competition: 'La Liga',
    result: 'Loss',
    score: '3-1',
    team1: 'Real Madrid',
    team2: 'Barcelona',
    loss: 'Barcelona',
    scorers1: 'Vinicius Jr (2), Bellingham',
    scorers2: 'Lewandowski',
  },
  {
    date: 'Apr 21, 2024',
    competition: 'La Liga',
    result: 'Win',
    score: '2-1',
    team1: 'Barcelona',
    team2: 'Real Madrid',
    loss: 'Barcelona',
    scorers1: 'Lewandowski, Raphinha',
    scorers2: 'Rodrygo',
  },
  {
    date: 'Jan 14, 2024',
    competition: 'Super Cup',
    result: 'Loss',
    score: '2-0',
    team1: 'Real Madrid',
    team2: 'Barcelona',
    loss: 'Barcelona',
    scorers1: 'Benzema, Valverde',
    scorers2: '-',
  },
  {
    date: 'Oct 16, 2023',
    competition: 'La Liga',
    result: 'Win',
    score: '2-1',
    team1: 'Barcelona',
    team2: 'Real Madrid',
    loss: 'Barcelona',
    scorers1: 'Gündoğan, Araújo',
    scorers2: 'Bellingham',
  },
  {
    date: 'Mar 19, 2023',
    competition: 'La Liga',
    result: 'Win',
    score: '2-1',
    team1: 'Barcelona',
    team2: 'Real Madrid',
    loss: 'Barcelona',
    scorers1: 'Roberto, Kessié',
    scorers2: 'Benzema',
  },
];

const summaryStats: SummaryStats = {
  barcelona: 5,
  draws: 1,
  madrid: 4,
  titleOne: 'Barcelona',
  titleTwo: 'Draws',
  titleThree: 'Madrid',
};

const insights: string[] = [
  'Barcelona dominates at Camp Nou with 3 wins in the last 5 home Clásicos',
  'Both teams have scored in 7 of the last 10 meetings (70%)',
  'Average of 2.8 goals per game in recent Clásicos',
  "Barcelona's home advantage has been significant (W3 D1 L1 in last 5)",
  'Real Madrid has won 3 of the last 4 away Clásicos in all competitions',
];

const HeadToHeadSatatics: React.FC = () => {
  return (
    <HeadToHeadSection
      matches={matches}
      summaryStats={summaryStats}
      insights={insights}
      h2hChart={<MatchStatsComparisonChart />}
      teamPerformanceChart={<RadarComparisonChart />}
    />
  );
};

export default HeadToHeadSatatics;
