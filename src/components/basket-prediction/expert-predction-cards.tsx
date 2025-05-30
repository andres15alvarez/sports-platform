'use client';

import React from 'react';
import MatchCardGrid from '../match-card';

type MatchCard = {
  league: string;
  title: string;
  description: string;
  date: string;
  href: string;
};

const gameCards: MatchCard[] = [
  {
    league: 'NBA Playoffs',
    title:
      'Denver Nuggets vs Minnesota Timberwolves: Western Conference Analysis',
    description:
      'Defending champions face surging Timberwolves in crucial Game 5 showdown.',
    date: 'Apr 30, 2025',
    href: '/nba/denver-nuggets-vs-minnesota-timberwolves-analysis',
  },
  {
    league: 'NBA Playoffs',
    title: 'New York Knicks vs Philadelphia 76ers: Eastern Conference Clash',
    description:
      'Madison Square Garden hosts critical Game 6 with Knicks looking to advance.',
    date: 'May 2, 2025',
    href: '/nba/new-york-knicks-vs-philadelphia-76ers-analysis',
  },
  {
    league: 'NBA News',
    title: 'NBA MVP Race: Final Standings and Voting Breakdown',
    description: 'Complete analysis of the closest MVP race in NBA history.',
    date: 'Apr 29, 2025',
    href: '/nba/nba-mvp-race-analysis',
  },
];

const Cards: React.FC = () => {
  return <MatchCardGrid matchCards={gameCards} />;
};

export default Cards;
