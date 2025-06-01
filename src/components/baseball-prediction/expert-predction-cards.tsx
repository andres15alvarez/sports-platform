'use client';

import React from 'react';
import MatchCardGrid from '../match-card';

interface MatchCard {
  league: string;
  title: string;
  description: string;
  date: string;
  href: string;
}

const gameCards: MatchCard[] = [
  {
    league: 'MLB',
    title: 'Dodgers vs Padres: NL West Rivalry Analysis',
    description:
      'Key insights and betting predictions for the crucial Dodgers-Padres matchup.',
    date: 'May 8, 2025',
    href: '/mlb/dodgers-padres-analysis',
  },
  {
    league: 'MLB',
    title: 'Astros vs Rangers: Texas Showdown Preview',
    description:
      'AL West implications as Houston faces Texas in a pivotal series opener.',
    date: 'May 9, 2025',
    href: '/mlb/astros-rangers-preview',
  },
  {
    league: 'MLB',
    title: 'Braves vs Mets: NL East Clash Analysis',
    description:
      'Statistical breakdown and betting tips for the crucial NL East matchup.',
    date: 'May 9, 2025',
    href: '/mlb/braves-mets-analysis',
  },
];

const Cards: React.FC = () => {
  return <MatchCardGrid matchCards={gameCards} />;
};

export default Cards;
