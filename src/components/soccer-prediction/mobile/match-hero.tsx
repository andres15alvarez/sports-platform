import React from 'react';
import Hero from '../../hero';
import Info from '../common/publication-info';

interface Team {
  name: string;
  logo: string;
  rank: string;
}

interface MatchInfo {
  name: string;
  rank: string;
  logo: string | undefined;
}

interface Odds {
  label: string;
  value: string;
}

interface MatchData {
  title: string;
  homeTeam: Team;
  awayTeam: Team;
  matchInfo: MatchInfo;
  odds: Odds[];
}

const matchData: MatchData = {
  title:
    'Barcelona FC vs Real Madrid Prediction: El Clásico Statistical Analysis and Betting Tips',
  homeTeam: {
    name: 'Barcelona FC',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    rank: '2nd in La Liga',
  },
  awayTeam: {
    name: 'Real Madrid',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    rank: '1st in La Liga',
  },
  matchInfo: {
    name: 'VS',
    rank: 'Matchday 34',
    logo: undefined,
  },
  odds: [
    { label: 'Home Win (1)', value: '2.25' },
    { label: 'Draw (X)', value: '3.40' },
    { label: 'Away Win (2)', value: '3.10' },
  ],
};

const MatchHero: React.FC = () => {
  return (
    <Hero match={matchData}>
      <Info
        date="May 4, 2025 - 20:45 CET"
        location="Camp Nou, Barcelona"
        author={{ name: 'Sports Analysis Team', href: '/authors/mike-johnson' }}
      />
    </Hero>
  );
};

export default MatchHero;
