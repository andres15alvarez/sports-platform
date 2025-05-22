import React from 'react';
import KeyPlayersChart from '../../charts/mobile/top-score-comparison';
import KeyPlayersSection from '../../key-players';

interface Stat {
  label: string;
  value: string | number;
}

interface Player {
  name: string;
  flag: string;
  nationality: string;
  position: string;
  positionColor: string;
  stats: Stat[];
  note?: string;
}

const barcelonaPlayers: Player[] = [
  {
    name: 'Robert Lewandowski',
    flag: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/330px-Flag_of_Poland.svg.png',
    nationality: 'Poland',
    position: 'Forward',
    positionColor: 'bg-green-100 text-green-800',
    stats: [
      { label: 'La Liga Goals', value: '24' },
      { label: 'Assists', value: '8' },
      { label: 'Minutes per Goal', value: '107' },
    ],
    note: 'Has scored in 3 of his last 4 appearances vs Real Madrid',
  },
  {
    name: 'Pedri',
    flag: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg',
    nationality: 'Spain',
    position: 'Midfielder',
    positionColor: 'bg-blue-100 text-blue-800',
    stats: [
      { label: 'La Liga Goals', value: '7' },
      { label: 'Assists', value: '9' },
      { label: 'Passing Accuracy', value: '92%' },
    ],
    note: 'Recently returned from injury with 2 assists in his last 3 games',
  },
  {
    name: 'Raphinha',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg',
    nationality: 'Brazil',
    position: 'Forward',
    positionColor: 'bg-green-100 text-green-800',
    stats: [
      { label: 'La Liga Goals', value: '11' },
      { label: 'Assists', value: '12' },
      { label: 'Key Passes per Game', value: '2.7' },
    ],
    note: 'In his best form of the season with 5 goal involvements in last 4 matches',
  },
];

const madridPlayers: Player[] = [
  {
    name: 'Vinicius Junior',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg',
    nationality: 'Brazil',
    position: 'Forward',
    positionColor: 'bg-green-100 text-green-800',
    stats: [
      { label: 'La Liga Goals', value: '15' },
      { label: 'Assists', value: '9' },
      { label: 'Successful Dribbles/Game', value: '4.2' },
    ],
    note: 'Scored twice in the reverse fixture against Barcelona',
  },
  {
    name: 'Jude Bellingham',
    flag: 'https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg',
    nationality: 'England',
    position: 'Midfielder',
    positionColor: 'bg-blue-100 text-blue-800',
    stats: [
      { label: 'La Liga Goals', value: '17' },
      { label: 'Assists', value: '5' },
      { label: 'Passing Accuracy', value: '88%' },
    ],
    note: 'Has contributed to a goal in 62% of his La Liga appearances',
  },
  {
    name: 'Antonio Rüdiger',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg',
    nationality: 'Germany',
    position: 'Defender',
    positionColor: 'bg-gray-100 text-gray-800',
    stats: [
      { label: 'Aerial Duels Won/Game', value: '3.4' },
      { label: 'Tackles/Game', value: '2.1' },
      { label: 'Clean Sheets', value: '11' },
    ],
    note: "Key to Madrid's defensive solidity with 92% tackle success rate",
  },
];

const KeyPlayer: React.FC = () => {
  return (
    <KeyPlayersSection
      barcelonaPlayers={barcelonaPlayers}
      madridPlayers={madridPlayers}
      topScoreChart={<KeyPlayersChart />}
    />
  );
};

export default KeyPlayer;
