import React from 'react';
import BettingTipsSection from '../../betting-tips';
import ExpertPredictionsChart from '../../charts/mobile/expert-picks';

type BettingOption = {
  name: string;
  odds: string;
  bgColor: string;
};

type BettingMarket = {
  name: string;
  options: BettingOption[];
};

type ValueBet = {
  name: string;
  odds: string;
  description: string;
};

type BookmakerOdds = {
  bookmaker: string;
  barça: string;
  draw: string;
  realWin: string;
};

type BettingTrend = {
  name: string;
  trends: string[];
};

type OddsColumn = {
  key: keyof BookmakerOdds;
  label: string;
};

const bettingMarkets: BettingMarket[] = [
  {
    name: 'Match Result (1X2)',
    options: [
      { name: 'Barcelona Win', odds: '2.25', bgColor: 'green-50' },
      { name: 'Draw', odds: '3.40', bgColor: 'gray-50' },
      { name: 'Real Madrid Win', odds: '3.10', bgColor: 'gray-50' },
    ],
  },
  {
    name: 'Both Teams to Score',
    options: [
      { name: 'Yes', odds: '1.65', bgColor: 'green-50' },
      { name: 'No', odds: '2.15', bgColor: 'gray-50' },
    ],
  },
  {
    name: 'Over/Under 2.5 Goals',
    options: [
      { name: 'Over 2.5', odds: '1.80', bgColor: 'green-50' },
      { name: 'Under 2.5', odds: '2.00', bgColor: 'gray-50' },
    ],
  },
  {
    name: 'Double Chance',
    options: [
      { name: '1X', odds: '1.35', bgColor: 'green-50' },
      { name: '12', odds: '1.30', bgColor: 'gray-50' },
      { name: 'X2', odds: '1.65', bgColor: 'gray-50' },
    ],
  },
];

const valueBets: ValueBet[] = [
  {
    name: 'Barcelona Win & BTTS',
    odds: '3.75',
    description:
      "Barcelona's home form combined with Madrid's scoring record makes this attractive",
  },
  {
    name: 'Lewandowski to Score First',
    odds: '4.50',
    description:
      'Polish striker has opened the scoring in 8 matches this season',
  },
  {
    name: 'Over 10.5 Corners',
    odds: '2.10',
    description:
      'El Clásico matches average 11.2 corners in the last 10 meetings',
  },
  {
    name: 'Vinicius Junior to Score Anytime',
    odds: '2.75',
    description: 'Has scored in 3 of his last 4 matches against Barcelona',
  },
];

const bookmakerOdds: BookmakerOdds[] = [
  {
    bookmaker: 'Bet365',
    barça: '2.25',
    draw: '3.40',
    realWin: '3.10',
  },
  {
    bookmaker: 'Unibet',
    barça: '2.30',
    draw: '3.35',
    realWin: '3.00',
  },
  {
    bookmaker: 'Betway',
    barça: '2.20',
    draw: '3.50',
    realWin: '3.10',
  },
  {
    bookmaker: 'William Hill',
    barça: '2.25',
    draw: '3.40',
    realWin: '3.20',
  },
];

const bettingTrends: BettingTrend[] = [
  {
    name: 'Barcelona',
    trends: [
      'Barcelona have won 85% of their home matches this season (W14 D1 L1)',
      "Both teams have scored in 69% of Barcelona's home games",
      'Barcelona have scored in the first half in 12 of their last 15 home matches',
      'Lewandowski has scored the first goal in 8 matches this season',
      "Barcelona's matches average 3.2 goals per game at home",
    ],
  },
  {
    name: 'Real Madrid',
    trends: [
      'Real Madrid have won 69% of their away matches this season (W11 D3 L2)',
      'Real Madrid have conceded in 6 consecutive away games',
      "Both teams have scored in 75% of Real Madrid's away games",
      'Real Madrid have scored 2+ goals in 63% of their away matches',
      'Real Madrid have won 3 of the last 5 El Clásico matches',
    ],
  },
];

const columns: OddsColumn[] = [
  { key: 'barça', label: 'Barça Win' },
  { key: 'draw', label: 'Draw' },
  { key: 'realWin', label: 'Real Win' },
];

const BettingTipsOdds: React.FC = () => {
  return (
    <BettingTipsSection
      expertPickChart={<ExpertPredictionsChart />}
      bettingMarkets={bettingMarkets}
      valueBets={valueBets}
      bookmakerOdds={bookmakerOdds}
      bettingTrends={bettingTrends}
      columns={columns}
    />
  );
};

export default BettingTipsOdds;
