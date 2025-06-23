import React, { useState } from 'react';
import SportCalendar from './sport-calendar';
import useFootballCalendar from '@/src/hooks/football/useFootballCalendar';
import useBasketballCalendar from '@/src/hooks/basketball/useBasketballCalendar';
import useBaseballCalendar from '@/src/hooks/baseball/useBaseballCalendar';

type SportType = 'football' | 'basketball' | 'baseball';

const UnifiedSportCalendar: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<SportType>('football');

  const getHookForSport = (sport: SportType) => {
    switch (sport) {
      case 'football':
        return useFootballCalendar;
      case 'basketball':
        return useBasketballCalendar;
      case 'baseball':
        return useBaseballCalendar;
      default:
        return useFootballCalendar;
    }
  };

  const sportConfig = {
    football: { name: 'Football', color: 'bg-green-600' },
    basketball: { name: 'Basketball', color: 'bg-orange-600' },
    baseball: { name: 'Baseball', color: 'bg-blue-600' },
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Sport
          </label>
          <div className="flex space-x-2">
            {Object.entries(sportConfig).map(([sport, config]) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport as SportType)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedSport === sport
                    ? `${config.color} text-white`
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {config.name}
              </button>
            ))}
          </div>
        </div>

        <SportCalendar useCalendarHook={getHookForSport(selectedSport)} />
      </div>
    </div>
  );
};

export default UnifiedSportCalendar;
