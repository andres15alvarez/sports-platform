'use client';

import React from 'react';
import KeyPlayersSection from '../key-players';
import TopHittersComparison from '../charts/baseball-prediction/top-hitter-com';

type Stat = {
  label: string;
  value: string;
};

type Player = {
  name: string;
  flag: string;
  nationality: string;
  position: string;
  positionColor: string;
  stats: Stat[];
  note: string;
};

const yankeesPlayers: Player[] = [
  {
    name: 'Aaron Judge',
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    nationality: 'USA',
    position: 'Outfield',
    positionColor: 'bg-green-100 text-green-800',
    stats: [
      { label: 'Batting Average', value: '.328' },
      { label: 'Home Runs', value: '15' },
      { label: 'RBIs', value: '36' },
    ],
    note: 'League leader in home runs and OPS (1.147)',
  },
  {
    name: 'Gerrit Cole',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg',
    nationality: 'Mexico',
    position: 'Pitcher',
    positionColor: 'bg-blue-100 text-blue-800',
    stats: [
      { label: 'Record', value: '5-1' },
      { label: 'ERA', value: '2.68' },
      { label: 'Strikeouts', value: '67' },
    ],
    note: 'Expected to start Game 2 against Boston',
  },
  {
    name: 'Juan Soto',
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    nationality: 'USA',
    position: 'Outfield',
    positionColor: 'bg-green-100 text-green-800',
    stats: [
      { label: 'Batting Average', value: '.305' },
      { label: 'Home Runs', value: '12' },
      { label: 'OBP', value: '.434' },
    ],
    note: 'Hitting .346 with RISP this season',
  },
];

const redSoxPlayers: Player[] = [
  {
    name: 'Rafael Devers',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_the_Dominican_Republic.svg',
    nationality: 'Dominican Republic',
    position: 'Third Base',
    positionColor: 'bg-yellow-100 text-yellow-800',
    stats: [
      { label: 'Batting Average', value: '.312' },
      { label: 'Home Runs', value: '10' },
      { label: 'RBIs', value: '32' },
    ],
    note: 'Hitting .387 against Yankees pitching this season',
  },
  {
    name: 'Kutter Crawford',
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    nationality: 'USA',
    position: 'Pitcher',
    positionColor: 'bg-blue-100 text-blue-800',
    stats: [
      { label: 'Record', value: '4-2' },
      { label: 'ERA', value: '3.24' },
      { label: 'WHIP', value: '1.18' },
    ],
    note: 'Expected starter for Game 2 against the Yankees',
  },
  {
    name: 'Masataka Yoshida',
    flag: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg',
    nationality: 'Japan',
    position: 'Outfield',
    positionColor: 'bg-green-100 text-green-800',
    stats: [
      { label: 'Batting Average', value: '.296' },
      { label: 'Home Runs', value: '7' },
      { label: 'OPS', value: '.842' },
    ],
    note: 'Coming off a 4-hit performance against Tampa Bay',
  },
];

const KeyPlayer: React.FC = () => {
  return (
    <KeyPlayersSection
      titleOne="New York Yankees Key Players"
      titleTwo="Boston Red Sox Key Players"
      titleThree="Top Hitters Comparison"
      barcelonaPlayers={yankeesPlayers}
      madridPlayers={redSoxPlayers}
      topScoreChart={<TopHittersComparison />}
    />
  );
};

export default KeyPlayer;
