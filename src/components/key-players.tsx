import React from 'react';
import Image from 'next/image';

interface Stat {
  label: string;
  value: string | number;
}

interface Player {
  flag: string;
  nationality: string;
  name: string;
  position: string;
  positionColor: string;
  stats: Stat[];
  note?: string;
}

interface KeyPlayersSectionProps {
  barcelonaPlayers: Player[];
  madridPlayers: Player[];
  chartId?: string;
  topScoreChart: React.ReactNode;
  titleOne?: string;
  titleTwo?: string;
  titleThree?: string;
}

const KeyPlayersSection: React.FC<KeyPlayersSectionProps> = ({
  barcelonaPlayers,
  madridPlayers,
  topScoreChart,
  titleOne = 'Barcelona FC Key Players',
  titleTwo = 'Real Madrid Key Players',
  titleThree = 'Top Scorers Comparison',
}) => {
  return (
    <section id="key-players" className="mb-8">
      <h2 className="text-xl font-bold text-green-800 border-b border-gray-200 pb-2 mb-4">
        Key Players Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3">{titleOne}</h3>
          <div className="space-y-4">
            {barcelonaPlayers.map((player, i) => (
              <PlayerCard key={i} player={player} />
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3">{titleTwo}</h3>
          <div className="space-y-4">
            {madridPlayers.map((player, i) => (
              <PlayerCard key={i} player={player} />
            ))}
          </div>
        </div>
      </div>

      {/* Top Scorers Chart */}
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-3">{titleThree}</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="h-[250px] w-full">{topScoreChart}</div>
        </div>
      </div>
    </section>
  );
};

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="flex items-center p-3 border-b border-gray-100">
        <Image
          src={player.flag}
          alt={player.nationality}
          className="w-6 h-4 mr-2"
        />
        <span className="font-semibold">{player.name}</span>
        <span
          className={`ml-auto text-xs px-2 py-1 rounded ${player.positionColor}`}
        >
          {player.position}
        </span>
      </div>
      <div className="p-3">
        {player.stats.map((stat, index) => (
          <div key={index} className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">{stat.label}</span>
            <span className="font-semibold">{stat.value}</span>
          </div>
        ))}
        {player.note && (
          <div className="mt-2">
            <span className="text-xs text-gray-800 italic">{player.note}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyPlayersSection;
