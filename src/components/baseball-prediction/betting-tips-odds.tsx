'use client';

import React from 'react';
import BettingTipsSection from '../betting-tips';
import ExpertPanelPieChart from '../charts/baseball-prediction/expert-picks';

interface BettingOption {
  name: string;
  odds: string;
  bgColor: string;
}

interface Market {
  name: string;
  options: BettingOption[];
}

interface ValueBet {
  name: string;
  odds: string;
  description: string;
}

interface BookmakerOdds {
  bookmaker: string;
  yankees: string;
  redSox: string;
  over8_5: string;
  [key: string]: string;
}

interface Column {
  key: string;
  label: string;
}

interface Trend {
  name: string;
  trends: string[];
}

const bettingMarkets: Market[] = [
  {
    name: 'Money Line',
    options: [
      { name: 'Yankees Win', odds: '1.80', bgColor: 'green-50' },
      { name: 'Red Sox Win', odds: '2.10', bgColor: 'gray-50' },
    ],
  },
  {
    name: 'Run Line',
    options: [
      { name: 'Yankees -1.5', odds: '2.45', bgColor: 'green-50' },
      { name: 'Red Sox +1.5', odds: '1.60', bgColor: 'gray-50' },
    ],
  },
  {
    name: 'Over/Under Total Runs',
    options: [
      { name: 'Over 8.5', odds: '1.95', bgColor: 'green-50' },
      { name: 'Under 8.5', odds: '1.90', bgColor: 'gray-50' },
    ],
  },
  {
    name: 'First 5 Innings',
    options: [
      { name: 'Yankees', odds: '1.75', bgColor: 'green-50' },
      { name: 'Tie', odds: '4.50', bgColor: 'gray-50' },
      { name: 'Red Sox', odds: '2.25', bgColor: 'gray-50' },
    ],
  },
];

const valueBets: ValueBet[] = [
  {
    name: 'Yankees Win & Over 8.5 Runs',
    odds: '3.40',
    description:
      'Yankees strong offense combined with high-scoring rivalry games makes this attractive',
  },
  {
    name: 'Aaron Judge to Hit a Home Run',
    odds: '3.20',
    description:
      'League leader in home runs with good history against Crawford',
  },
  {
    name: 'Total Home Runs Over 2.5',
    odds: '1.90',
    description:
      'Recent matchups averaging 2.8 home runs per game with warm conditions expected',
  },
  {
    name: 'Gerrit Cole Over 7.5 Strikeouts',
    odds: '1.85',
    description:
      'Cole averaging 9.6 strikeouts per start with Red Sox striking out at 8.7 per game',
  },
];

const bookmakerOdds: BookmakerOdds[] = [
  { bookmaker: 'DraftKings', yankees: '1.80', redSox: '2.10', over8_5: '1.95' },
  { bookmaker: 'FanDuel', yankees: '1.85', redSox: '2.05', over8_5: '1.92' },
  { bookmaker: 'BetMGM', yankees: '1.78', redSox: '2.15', over8_5: '1.90' },
  { bookmaker: 'Caesars', yankees: '1.82', redSox: '2.08', over8_5: '1.98' },
];

const columns: Column[] = [
  { key: 'yankees', label: 'Yankees' },
  { key: 'redSox', label: 'Red Sox' },
  { key: 'over8_5', label: 'Over 8.5' },
];

const bettingTrends: Trend[] = [
  {
    name: 'Yankees',
    trends: [
      'Yankees are 14-4 at home this season (77.8% win rate)',
      'New York is 8-2 in their last 10 home games against Boston',
      "The OVER is 6-3-1 in Yankees' last 10 home games",
      'Yankees are 12-5-1 ATS (against the spread) at home',
      "Yankees are 7-0 in Gerrit Cole's last 7 home starts",
    ],
  },
  {
    name: 'Red Sox',
    trends: [
      'Red Sox are 12-8 on the road this season (60.0% win rate)',
      'Boston is 4-6 in their last 10 games at Yankee Stadium',
      "The OVER is 7-3 in Red Sox's last 10 road games",
      'Red Sox are 11-9 ATS (against the spread) on the road',
      "Boston is 2-3 in Kutter Crawford's road starts this season",
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
      expertPickChart={<ExpertPanelPieChart />}
    />
  );
};

export default BettingTipsOdds;
