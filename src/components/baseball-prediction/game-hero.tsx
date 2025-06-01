'use client';

import React from 'react';
import Hero from '../hero';
import Info from '../soccer-prediction/common/publication-info';

interface Team {
  name: string;
  logo: string;
  rank: string;
}

interface Author {
  name: string;
  href: string;
}

interface MatchInfo {
  name: string;
  rank: string;
  label: string;
}

interface Odds {
  label: string;
  value: string;
}

interface GameData {
  title: string;
  dateTime: string;
  formattedDate: string;
  location: string;
  author: Author;
  homeTeam: Team;
  awayTeam: Team;
  matchInfo: MatchInfo;
  odds: Odds[];
}

const gameData: GameData = {
  title:
    'New York Yankees vs Boston Red Sox Prediction: Rivalry Series Statistical Analysis and Betting Tips',
  dateTime: '2025-05-10T19:00:00-04:00',
  formattedDate: 'May 10, 2025 - 19:00 ET',
  location: 'Yankee Stadium, New York',
  author: {
    name: 'Mike Johnson',
    href: '/authors/mike-johnson',
  },
  homeTeam: {
    name: 'New York Yankees',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/New_York_Yankees_Primary_Logo.svg/120px-New_York_Yankees_Primary_Logo.svg.png',
    rank: '1st in AL East',
  },
  awayTeam: {
    name: 'Boston Red Sox',
    logo: 'https://upload.wikimedia.org/wikipedia/en/6/6d/RedSoxPrimary_HangingSocks.svg',
    rank: '3rd in AL East',
  },
  matchInfo: {
    name: 'VS',
    rank: 'Yankees-Red Sox Rivalry',
    label: 'Yankees-Red Sox Rivalry',
  },
  odds: [
    { label: 'Yankees Win (1)', value: '1.80' },
    { label: 'Over/Under Runs', value: '8.5' },
    { label: 'Red Sox Win (2)', value: '2.10' },
  ],
};

const GameHero: React.FC = () => {
  return (
    <Hero match={gameData}>
      <Info
        date={gameData.formattedDate}
        location={gameData.location}
        author={gameData.author}
      />
    </Hero>
  );
};

export default GameHero;
