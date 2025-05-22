import React from 'react';
import MatchCardGrid from '../../match-card';

interface MatchCard {
  league: string;
  title: string;
  description: string;
  date: string;
  href: string;
}

const matchCards: MatchCard[] = [
  {
    league: 'La Liga',
    title: 'Atletico Madrid vs Sevilla: Preview and Prediction',
    description:
      'Analysis and betting tips for the Madrid vs Sevilla clash at Metropolitano Stadium.',
    date: 'Apr 27, 2025',
    href: '/football/la-liga/atletico-madrid-sevilla-prediction',
  },
  {
    league: 'Premier League',
    title: 'Manchester City vs Arsenal: Title Race Showdown',
    description:
      'Premier League title implications as Guardiola faces Arteta at the Etihad.',
    date: 'Apr 28, 2025',
    href: '/football/premier-league/manchester-city-arsenal-prediction',
  },
  {
    league: 'Serie A',
    title: "Juventus vs AC Milan: Derby d'Italia Preview",
    description:
      'Statistical analysis and betting tips for the crucial Serie A matchup.',
    date: 'Apr 28, 2025',
    href: '/football/serie-a/juventus-milan-prediction',
  },
];

const Cards: React.FC = () => {
  return <MatchCardGrid matchCards={matchCards} />;
};

export default Cards;
