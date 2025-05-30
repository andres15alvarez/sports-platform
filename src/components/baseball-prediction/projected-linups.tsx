'use client';

import React from 'react';

interface Player {
  name: string;
  stats: string;
}

interface Injury {
  name: string;
  status: string;
  statusColor: string;
}

const yankeesLineup: Player[] = [
  { name: 'Anthony Volpe', stats: 'SS • .267 AVG, 5 HR, 18 RBI' },
  { name: 'Juan Soto', stats: 'RF • .305 AVG, 12 HR, 29 RBI' },
  { name: 'Aaron Judge', stats: 'CF • .328 AVG, 15 HR, 36 RBI' },
  { name: 'Giancarlo Stanton', stats: 'DH • .258 AVG, 9 HR, 24 RBI' },
  { name: 'Anthony Rizzo', stats: '1B • .272 AVG, 6 HR, 23 RBI' },
  { name: 'Gleyber Torres', stats: '2B • .256 AVG, 7 HR, 19 RBI' },
  { name: 'Alex Verdugo', stats: 'LF • .288 AVG, 4 HR, 18 RBI' },
  { name: 'DJ LeMahieu', stats: '3B • .262 AVG, 3 HR, 15 RBI' },
  { name: 'Jose Trevino', stats: 'C • .243 AVG, 2 HR, 10 RBI' },
];

const redSoxLineup: Player[] = [
  { name: 'Jarren Duran', stats: 'CF • .285 AVG, 6 HR, 19 RBI' },
  { name: "Tyler O'Neill", stats: 'LF • .273 AVG, 9 HR, 24 RBI' },
  { name: 'Rafael Devers', stats: '3B • .312 AVG, 10 HR, 32 RBI' },
  { name: 'Masataka Yoshida', stats: 'DH • .296 AVG, 7 HR, 22 RBI' },
  { name: 'Triston Casas', stats: '1B • .281 AVG, 8 HR, 26 RBI' },
  { name: 'Wilyer Abreu', stats: 'RF • .256 AVG, 5 HR, 18 RBI' },
  { name: 'Ceddanne Rafaela', stats: 'SS • .248 AVG, 3 HR, 16 RBI' },
  { name: 'Connor Wong', stats: 'C • .237 AVG, 4 HR, 14 RBI' },
  { name: 'Vaughn Grissom', stats: '2B • .262 AVG, 2 HR, 12 RBI' },
];

const yankeesInjuries: Injury[] = [
  {
    name: 'Nestor Cortes',
    status: 'IL (Forearm)',
    statusColor: 'text-red-600',
  },
  { name: 'Luis Gil', status: 'Available', statusColor: 'text-green-600' },
  {
    name: 'Clarke Schmidt',
    status: 'Day-to-Day (Back)',
    statusColor: 'text-yellow-600',
  },
];

const redSoxInjuries: Injury[] = [
  {
    name: 'Kenley Jansen',
    status: 'Day-to-Day (Back)',
    statusColor: 'text-yellow-600',
  },
  {
    name: 'Bryan Bello',
    status: 'IL (Lat Strain)',
    statusColor: 'text-red-600',
  },
];

const ProjectedLineups: React.FC = () => {
  const renderLineup = (players: Player[]) =>
    players.map((player, i) => (
      <div key={i} className="flex items-center bg-white px-3 py-2 rounded-md">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold mr-3">
          {i + 1}
        </div>
        <div className="flex-1">
          <div className="font-medium">{player.name}</div>
          <div className="text-xs text-gray-500">{player.stats}</div>
        </div>
      </div>
    ));

  const renderInjuries = (injuries: Injury[]) =>
    injuries.map((injury, i) => (
      <li key={i} className="flex justify-between">
        <span>{injury.name}</span>
        <span className={injury.statusColor}>{injury.status}</span>
      </li>
    ));

  return (
    <section id="starting-lineups" className="mb-8">
      <h2 className="text-xl font-bold text-green-800 border-b border-gray-200 pb-2 mb-4">
        Projected Starting Lineups
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Yankees */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3">
            New York Yankees Projected Lineup
          </h3>
          <div className="space-y-3">{renderLineup(yankeesLineup)}</div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <h4 className="font-semibold mb-2">Starting Pitcher</h4>
            <div className="flex items-center bg-blue-50 px-3 py-2 rounded-md">
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center font-bold mr-3">
                P
              </div>
              <div className="flex-1">
                <div className="font-medium">Gerrit Cole</div>
                <div className="text-xs text-gray-500">
                  5-1, 2.68 ERA, 1.03 WHIP, 67 K
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <h4 className="font-semibold mb-2">Injury Updates</h4>
            <ul className="space-y-1 text-sm">
              {renderInjuries(yankeesInjuries)}
            </ul>
          </div>
        </div>

        {/* Red Sox */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3">
            Boston Red Sox Projected Lineup
          </h3>
          <div className="space-y-3">{renderLineup(redSoxLineup)}</div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <h4 className="font-semibold mb-2">Starting Pitcher</h4>
            <div className="flex items-center bg-blue-50 px-3 py-2 rounded-md">
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center font-bold mr-3">
                P
              </div>
              <div className="flex-1">
                <div className="font-medium">Kutter Crawford</div>
                <div className="text-xs text-gray-500">
                  4-2, 3.24 ERA, 1.18 WHIP, 53 K
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <h4 className="font-semibold mb-2">Injury Updates</h4>
            <ul className="space-y-1 text-sm">
              {renderInjuries(redSoxInjuries)}
            </ul>
          </div>
        </div>
      </div>

      {/* Pitching Matchup */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-lg mb-3">Pitching Matchup Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Gerrit Cole (NYY)</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>5-1 record with a 2.68 ERA in 7 starts this season</li>
              <li>67 strikeouts in 47 innings pitched (12.8 K/9)</li>
              <li>Holding opponents to a .203 batting average</li>
              <li>1.87 ERA in his last 5 starts against Boston</li>
              <li>Fastball velocity averaging 96.3 mph this season</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Kutter Crawford (BOS)</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>4-2 record with a 3.24 ERA in 8 starts this season</li>
              <li>53 strikeouts in 50 innings pitched (9.5 K/9)</li>
              <li>Opponents hitting .241 against him</li>
              <li>
                Struggled against Yankees in his last start (4.2 IP, 5 ER)
              </li>
              <li>
                Relies heavily on his cutter (38% usage) and four-seamer (32%)
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200">
          <h4 className="font-semibold mb-2">Key Matchups to Watch</h4>
          <div className="space-y-2 text-sm">
            <div className="flex">
              <div className="w-1/2 pr-2 font-medium">Judge vs. Crawford</div>
              <div className="w-1/2 pl-2">
                Judge is 6-for-15 (.400) with 2 HR lifetime against Crawford
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2 pr-2 font-medium">Devers vs. Cole</div>
              <div className="w-1/2 pl-2">
                Devers has found success against Cole with a .333 average and 3
                HR
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2 pr-2 font-medium">Rizzo vs. Crawford</div>
              <div className="w-1/2 pl-2">
                Rizzo has struggled with just a .158 average against Crawford
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectedLineups;
