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
    'Los Angeles Lakers vs Boston Celtics Prediction: Historic Rivalry Statistical Analysis and Betting Tips',
  dateTime: '2025-05-03T20:00:00-07:00',
  formattedDate: 'May 3, 2025 - 20:00 ET',
  location: 'Crypto.com Arena, Los Angeles',
  author: {
    name: 'Michael Johnson',
    href: '/authors/michael-johnson',
  },
  homeTeam: {
    name: 'Los Angeles Lakers',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg',
    rank: '5th in Western Conference',
  },
  awayTeam: {
    name: 'Boston Celtics',
    logo: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg',
    rank: '1st in Eastern Conference',
  },
  matchInfo: {
    name: 'VS',
    rank: 'NBA Playoffs',
    label: 'Conference Finals',
  },
  odds: [
    { label: 'Home Win', value: '1.90' },
    { label: 'Over/Under', value: '219.5' },
    { label: 'Away Win', value: '2.10' },
  ],
};

const GameHero: React.FC = () => {
  return (
    <Hero match={gameData}>
      <Info
        date="May 10, 2025 - 19:00 ET"
        location="Yankee Stadium, New York"
        author={{ name: 'Mike Johnson', href: '/authors/mike-johnson' }}
      />
    </Hero>
  );
};

export default GameHero;
