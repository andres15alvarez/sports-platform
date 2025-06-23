import React from 'react';
import { League } from '@/src/types/sportCalendar';

interface LeagueSelectorProps {
  leagues: League[];
  selectedLeague: number;
  onLeagueChange: (leagueId: number) => void;
}

const LeagueSelector: React.FC<LeagueSelectorProps> = ({
  leagues,
  selectedLeague,
  onLeagueChange,
}) => {
  return (
    <div className="mb-6 bg-white rounded-lg shadow p-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select league
      </label>
      <select
        value={selectedLeague}
        onChange={(e) => onLeagueChange(Number(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {leagues.map((league) => (
          <option key={league.id} value={league.id}>
            {league.name} - {league.country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LeagueSelector;
