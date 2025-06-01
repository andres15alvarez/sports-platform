'use client';

import React from 'react';
import BettingTipsSection from '../betting-tips';
import OddsPredictionPieChart from '../charts/basket-prediction/expert-picks';

type MarketOption = {
  name: string;
  odds: string;
  bgColor: string;
};

type BettingMarket = {
  name: string;
  options: MarketOption[];
};

type ValueBet = {
  name: string;
  odds: string;
  description: string;
};

type Bookmaker = {
  bookmaker: string;
  lakers: string;
  celtics: string;
  o_u_line: string;
};

type Column = {
  key: keyof Bookmaker;
  label: string;
};

type TeamTrend = {
  name: string;
  trends: string[];
};

const bettingMarkets: BettingMarket[] = [
  {
    name: 'Money Line',
    options: [
      { name: 'Lakers Win', odds: '1.90', bgColor: 'green-50' },
      { name: 'Celtics Win', odds: '2.10', bgColor: 'gray-50' },
    ],
  },
  {
    name: 'Point Spread',
    options: [
      { name: 'Lakers -1.5', odds: '1.95', bgColor: 'green-50' },
      { name: 'Celtics +1.5', odds: '1.95', bgColor: 'gray-50' },
    ],
  },
  {
    name: 'Total Points',
    options: [
      { name: 'Over 219.5', odds: '1.90', bgColor: 'green-50' },
      { name: 'Under 219.5', odds: '1.90', bgColor: 'gray-50' },
    ],
  },
  {
    name: '1st Quarter Winner',
    options: [
      { name: 'Lakers', odds: '1.87', bgColor: 'green-50' },
      { name: 'Tie', odds: '15.00', bgColor: 'gray-50' },
      { name: 'Celtics', odds: '2.05', bgColor: 'gray-50' },
    ],
  },
];

const valueBets: ValueBet[] = [
  {
    name: 'Celtics Win & Over 219.5',
    odds: '3.40',
    description:
      'Celtics have won 7 of last 10 vs Lakers with 8 games going over 220 points',
  },
  {
    name: 'Jayson Tatum 30+ Points',
    odds: '2.20',
    description: 'Has scored 30+ in 3 of his last 4 games against the Lakers',
  },
  {
    name: 'LeBron Triple-Double',
    odds: '4.50',
    description:
      'Already has 3 triple-doubles in these playoffs against top competition',
  },
  {
    name: 'Race to 20 Points - Celtics',
    odds: '1.95',
    description:
      'Boston has been the faster-starting team, winning the first quarter in 7 of 10 playoff games',
  },
];

const bookmakerOdds: Bookmaker[] = [
  {
    bookmaker: 'BetMGM',
    lakers: '1.90',
    celtics: '2.10',
    o_u_line: '219.5',
  },
  {
    bookmaker: 'DraftKings',
    lakers: '1.91',
    celtics: '2.12',
    o_u_line: '219.5',
  },
  {
    bookmaker: 'FanDuel',
    lakers: '1.92',
    celtics: '2.08',
    o_u_line: '220.0',
  },
  {
    bookmaker: 'Caesars',
    lakers: '1.89',
    celtics: '2.10',
    o_u_line: '219.0',
  },
];

const columns: Column[] = [
  { key: 'lakers', label: 'Lakers' },
  { key: 'celtics', label: 'Celtics' },
  { key: 'o_u_line', label: 'O/U Line' },
];

const bettingTrends: TeamTrend[] = [
  {
    name: 'Lakers',
    trends: [
      'Lakers are 36-9 SU (straight up) at home this season',
      '22-23 ATS (against the spread) at home',
      'The OVER is 28-17 in Lakers home games',
      'Lakers are 7-5 ATS in the playoffs',
      '4-1 ATS in their last 5 home playoff games',
    ],
  },
  {
    name: 'Celtics',
    trends: [
      'Celtics are 32-12 SU on the road this season',
      '30-14 ATS on the road',
      'The OVER is 25-19 in Celtics road games',
      'Celtics are 7-3 ATS in these playoffs',
      'Won 7 of last 10 meetings with Lakers (7-3 ATS)',
    ],
  },
];

const BettingTipsOdds: React.FC = () => {
  return (
    <BettingTipsSection
      bettingMarkets={bettingMarkets}
      valueBets={valueBets}
      bookmakerOdds={bookmakerOdds}
      bettingTrends={bettingTrends}
      columns={columns}
      expertPickChart={<OddsPredictionPieChart />}
    />
  );
};

export default BettingTipsOdds;
