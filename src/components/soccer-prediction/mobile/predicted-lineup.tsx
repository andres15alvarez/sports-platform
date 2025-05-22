import React from 'react';

interface Player {
  number: number;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'ATT';
  x: string;
  y: string;
  color: string;
}

interface InjuryInfo {
  name: string;
  status: 'Available' | 'Doubt' | 'Out';
  note: string;
  color: string;
}

interface TeamLineupProps {
  teamName: string;
  formation: string;
  players: Player[];
  injuries: InjuryInfo[];
}

const PlayerCircle: React.FC<Player> = ({ number, name, x, y, color }) => (
  <div
    className={`absolute ${y} ${x} transform -translate-x-1/2 flex flex-col items-center`}
  >
    <div
      className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold mb-1`}
    >
      {number}
    </div>
    <span className="text-white text-xs font-medium">{name}</span>
  </div>
);

const TeamLineup: React.FC<TeamLineupProps> = ({
  teamName,
  formation,
  players,
  injuries,
}) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-bold text-lg mb-3">{`${teamName} Predicted Lineup (${formation})`}</h3>
    <div className="bg-green-800 rounded-lg p-4 relative h-80">
      {/* Pitch Markings */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-50 transform -translate-y-1/2" />
      <div className="absolute top-0 left-1/2 bottom-0 w-px bg-white opacity-50 transform -translate-x-1/2" />
      <div className="absolute top-0 left-1/2 w-16 h-16 border-2 border-white opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

      {players.map((player, idx) => (
        <PlayerCircle key={`${player.name}-${idx}`} {...player} />
      ))}
    </div>

    {/* Substitutes & Injury News */}
    <div className="mt-3 pt-3 border-t border-gray-200">
      <h4 className="font-semibold mb-2">Substitutes & Injury News</h4>
      <ul className="space-y-1 text-sm">
        {injuries.map((injury, idx) => (
          <li key={idx} className="flex justify-between">
            <span>{injury.name}</span>
            <span className={injury.color}>
              {injury.status} {injury.note && `(${injury.note})`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const PredictedLineups: React.FC = () => {
  const barcelonaPlayers: Player[] = [
    // GK
    {
      number: 1,
      name: 'ter Stegen',
      position: 'GK',
      x: 'left-1/2',
      y: 'bottom-2',
      color: 'bg-blue-500',
    },
    // DEF
    {
      number: 20,
      name: 'Dest',
      position: 'DEF',
      x: 'left-1/5',
      y: 'bottom-20',
      color: 'bg-gray-100 text-gray-800',
    },
    {
      number: 4,
      name: 'Araújo',
      position: 'DEF',
      x: 'left-1/3',
      y: 'bottom-20',
      color: 'bg-gray-100 text-gray-800',
    },
    {
      number: 24,
      name: 'Christensen',
      position: 'DEF',
      x: 'left-2/3',
      y: 'bottom-20',
      color: 'bg-gray-100 text-gray-800',
    },
    {
      number: 17,
      name: 'Baldé',
      position: 'DEF',
      x: 'left-4/5',
      y: 'bottom-20',
      color: 'bg-gray-100 text-gray-800',
    },
    // MID
    {
      number: 8,
      name: 'Pedri',
      position: 'MID',
      x: 'left-1/4',
      y: 'bottom-40',
      color: 'bg-blue-500',
    },
    {
      number: 5,
      name: 'Busquets',
      position: 'MID',
      x: 'left-1/2',
      y: 'bottom-40',
      color: 'bg-blue-500',
    },
    {
      number: 6,
      name: 'Gavi',
      position: 'MID',
      x: 'left-3/4',
      y: 'bottom-40',
      color: 'bg-blue-500',
    },
    // ATT
    {
      number: 10,
      name: 'Raphinha',
      position: 'ATT',
      x: 'left-1/4',
      y: 'bottom-60',
      color: 'bg-red-500',
    },
    {
      number: 9,
      name: 'Lewandowski',
      position: 'ATT',
      x: 'left-1/2',
      y: 'bottom-60',
      color: 'bg-red-500',
    },
    {
      number: 11,
      name: 'Yamal',
      position: 'ATT',
      x: 'left-3/4',
      y: 'bottom-60',
      color: 'bg-red-500',
    },
  ];

  const madridPlayers: Player[] = [
    {
      number: 1,
      name: 'Lunin',
      position: 'GK',
      x: 'left-1/2',
      y: 'bottom-2',
      color: 'bg-blue-500',
    },
    {
      number: 2,
      name: 'Carvajal',
      position: 'DEF',
      x: 'left-1/5',
      y: 'bottom-20',
      color: 'bg-gray-100 text-gray-800',
    },
    {
      number: 3,
      name: 'Militão',
      position: 'DEF',
      x: 'left-1/3',
      y: 'bottom-20',
      color: 'bg-gray-100 text-gray-800',
    },
    {
      number: 22,
      name: 'Rüdiger',
      position: 'DEF',
      x: 'left-2/3',
      y: 'bottom-20',
      color: 'bg-gray-100 text-gray-800',
    },
    {
      number: 23,
      name: 'Mendy',
      position: 'DEF',
      x: 'left-4/5',
      y: 'bottom-20',
      color: 'bg-gray-100 text-gray-800',
    },
    {
      number: 8,
      name: 'Kroos',
      position: 'MID',
      x: 'left-1/4',
      y: 'bottom-40',
      color: 'bg-blue-500',
    },
    {
      number: 14,
      name: 'Valverde',
      position: 'MID',
      x: 'left-1/2',
      y: 'bottom-40',
      color: 'bg-blue-500',
    },
    {
      number: 5,
      name: 'Bellingham',
      position: 'MID',
      x: 'left-3/4',
      y: 'bottom-40',
      color: 'bg-blue-500',
    },
    {
      number: 11,
      name: 'Rodrygo',
      position: 'ATT',
      x: 'left-1/4',
      y: 'bottom-60',
      color: 'bg-red-500',
    },
    {
      number: 9,
      name: 'Joselu',
      position: 'ATT',
      x: 'left-1/2',
      y: 'bottom-60',
      color: 'bg-red-500',
    },
    {
      number: 7,
      name: 'Vinicius Jr',
      position: 'ATT',
      x: 'left-3/4',
      y: 'bottom-60',
      color: 'bg-red-500',
    },
  ];

  const barcelonaInjuries: InjuryInfo[] = [
    {
      name: 'Frenkie de Jong',
      status: 'Doubt',
      note: 'Ankle',
      color: 'text-yellow-600',
    },
    {
      name: 'Ansu Fati',
      status: 'Available',
      note: '',
      color: 'text-green-600',
    },
    {
      name: 'Ferran Torres',
      status: 'Available',
      note: '',
      color: 'text-green-600',
    },
    {
      name: 'Andreas Christensen',
      status: 'Out',
      note: 'Hamstring',
      color: 'text-red-600',
    },
  ];

  const madridInjuries: InjuryInfo[] = [
    {
      name: 'Thibaut Courtois',
      status: 'Doubt',
      note: 'Knee',
      color: 'text-yellow-600',
    },
    { name: 'David Alaba', status: 'Out', note: 'ACL', color: 'text-red-600' },
    {
      name: 'Luka Modric',
      status: 'Available',
      note: '',
      color: 'text-green-600',
    },
    {
      name: 'Eduardo Camavinga',
      status: 'Available',
      note: '',
      color: 'text-green-600',
    },
  ];

  return (
    <section id="predicted-lineups" className="mb-8">
      <h2 className="text-xl font-bold text-green-800 border-b border-gray-200 pb-2 mb-4">
        Predicted Lineups
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TeamLineup
          teamName="Barcelona FC"
          formation="4-3-3"
          players={barcelonaPlayers}
          injuries={barcelonaInjuries}
        />
        <TeamLineup
          teamName="Real Madrid"
          formation="4-3-3"
          players={madridPlayers}
          injuries={madridInjuries}
        />
      </div>
    </section>
  );
};

export default PredictedLineups;
