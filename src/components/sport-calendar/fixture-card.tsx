import React from 'react';
import Image from 'next/image';
import { CalendarFixture } from '@/src/types/sportCalendar';

interface FixtureCardProps {
  fixture: CalendarFixture;
  onClick: (fixture: CalendarFixture) => void;
}

const FixtureCard: React.FC<FixtureCardProps> = ({ fixture, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FT':
        return 'text-gray-600';
      case '1H':
      case '2H':
      case 'ET':
      case 'P':
      case 'LIVE':
        return 'text-red-600 animate-pulse';
      case 'NS':
        return 'text-blue-600';
      case 'PST':
      case 'CANC':
      case 'ABD':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = (status: string, elapsed: number | null) => {
    switch (status) {
      case 'NS':
        return 'Not Started';
      case '1H':
        return `${elapsed}'`;
      case 'HT':
        return 'Half Time';
      case '2H':
        return `${elapsed}'`;
      case 'ET':
        return 'Extra Time';
      case 'P':
        return 'Penalties';
      case 'FT':
        return 'Full Time';
      case 'AET':
        return 'After Extra Time';
      case 'PEN':
        return 'After Penalties';
      case 'PST':
        return 'Postponed';
      case 'CANC':
        return 'Cancelled';
      case 'ABD':
        return 'Abandoned';
      case 'LIVE':
        return `${elapsed}'`;
      default:
        return status;
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Invalid time';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 cursor-pointer"
      onClick={() => onClick(fixture)}
    >
      <div className="bg-white p-4">
        {/* Date and Time */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500">
            {formatDate(fixture.fixture.date)}
          </span>
          <span className="text-xs text-gray-500">
            {formatTime(fixture.fixture.date)}
          </span>
        </div>

        {/* Status */}
        <div className="mb-2 text-center">
          <span
            className={`text-xs font-medium ${getStatusColor(fixture.fixture.status.short)}`}
          >
            {getStatusText(
              fixture.fixture.status.short,
              fixture.fixture.status.elapsed,
            )}
          </span>
        </div>

        {/* Teams and Score/Time (horizontal layout) */}
        <div className="space-y-2">
          {/* Home */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <Image
                src={fixture.teams.home.logo}
                alt={fixture.teams.home.name}
                width={32}
                height={32}
                className="object-contain"
                unoptimized
              />
              <span className="text-sm font-medium">
                {fixture.teams.home.name}
              </span>
            </div>
            <span className="text-lg font-bold text-gray-700">
              {fixture.fixture.status.short === 'NS'
                ? ''
                : (fixture.goals.home ?? '-')}
            </span>
          </div>
          {/* Away */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <Image
                src={fixture.teams.away.logo}
                alt={fixture.teams.away.name}
                width={32}
                height={32}
                className="object-contain"
                unoptimized
              />
              <span className="text-sm font-medium">
                {fixture.teams.away.name}
              </span>
            </div>
            <span className="text-lg font-bold text-gray-700">
              {fixture.fixture.status.short === 'NS'
                ? ''
                : (fixture.goals.away ?? '-')}
            </span>
          </div>
        </div>
      </div>

      {/* Venue and extra info at the bottom in gray bg */}
      {(fixture.fixture.venue.name || fixture.league.round) && (
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
          <div className="flex flex-col items-center space-y-1">
            {fixture.league.round && <div>{fixture.league.round}</div>}
            {fixture.fixture.venue.name && (
              <div>{fixture.fixture.venue.name}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FixtureCard;
