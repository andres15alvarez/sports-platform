import React from 'react';
import KeyPlayersSection from '../key-players';
import PlayoffPerformanceChart from '../charts/basket-prediction/top-score.com';

interface PlayerStat {
  label: string;
  value: string;
}

interface Player {
  name: string;
  flag: string;
  nationality: string;
  position: string;
  positionColor: string;
  stats: PlayerStat[];
  note: string;
}

const lakersPlayers: Player[] = [
  {
    name: 'LeBron James',
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    nationality: 'USA',
    position: 'Forward',
    positionColor: 'bg-yellow-100 text-yellow-800',
    stats: [
      { label: 'Playoff Points', value: '26.8' },
      { label: 'Rebounds', value: '8.2' },
      { label: 'Assists', value: '9.1' },
    ],
    note: 'Still performing at an elite level in year 22, with 3 triple-doubles in these playoffs',
  },
  {
    name: 'Anthony Davis',
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    nationality: 'USA',
    position: 'Center',
    positionColor: 'bg-purple-100 text-purple-800',
    stats: [
      { label: 'Playoff Points', value: '24.5' },
      { label: 'Rebounds', value: '13.2' },
      { label: 'Blocks', value: '3.2' },
    ],
    note: 'Defensive anchor who has registered 5+ blocks in 4 playoff games',
  },
  {
    name: 'Austin Reaves',
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    nationality: 'USA',
    position: 'Guard',
    positionColor: 'bg-blue-100 text-blue-800',
    stats: [
      { label: 'Playoff Points', value: '18.7' },
      { label: '3PT%', value: '42.1%' },
      { label: 'Assists', value: '5.2' },
    ],
    note: 'Breakout performer this postseason with three 25+ point games',
  },
];

const celticsPlayers: Player[] = [
  {
    name: 'Jayson Tatum',
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    nationality: 'USA',
    position: 'Forward',
    positionColor: 'bg-green-100 text-green-800',
    stats: [
      { label: 'Playoff Points', value: '29.3' },
      { label: 'Rebounds', value: '9.5' },
      { label: 'Assists', value: '6.2' },
    ],
    note: 'MVP-caliber performer with two 40+ point games this postseason',
  },
  {
    name: 'Jaylen Brown',
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    nationality: 'USA',
    position: 'Guard',
    positionColor: 'bg-blue-100 text-blue-800',
    stats: [
      { label: 'Playoff Points', value: '26.1' },
      { label: 'Rebounds', value: '5.8' },
      { label: 'FG%', value: '49.7%' },
    ],
    note: 'Explosive scorer who has scored 20+ points in 9 of 10 playoff games',
  },
  {
    name: 'Kristaps Porziņģis',
    flag: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg',
    nationality: 'Spain',
    position: 'Center',
    positionColor: 'bg-red-100 text-red-800',
    stats: [
      { label: 'Playoff Points', value: '17.2' },
      { label: 'Rebounds', value: '7.5' },
      { label: 'Blocks', value: '2.1' },
    ],
    note: 'Key offseason addition providing stretch and rim protection',
  },
];

const KeyPlayer: React.FC = () => {
  return (
    <KeyPlayersSection
      titleOne="Los Angeles Lakers Key Players"
      titleTwo="Boston Celtics Key Players"
      barcelonaPlayers={lakersPlayers}
      madridPlayers={celticsPlayers}
      topScoreChart={<PlayoffPerformanceChart />}
    />
  );
};

export default KeyPlayer;
