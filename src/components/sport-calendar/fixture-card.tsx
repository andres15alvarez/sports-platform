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

  return (
    <div
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(fixture)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Image
              src={fixture.league.logo}
              alt={fixture.league.name}
              width={24}
              height={24}
              className="object-contain"
              unoptimized
            />
            <span className="text-sm text-gray-600">
              {fixture.league.name} - {fixture.league.round}
            </span>
          </div>
          <span
            className={`text-sm font-medium ${getStatusColor(fixture.fixture.status.short)}`}
          >
            {getStatusText(
              fixture.fixture.status.short,
              fixture.fixture.status.elapsed,
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 flex items-center space-x-3">
            <Image
              src={fixture.teams.home.logo}
              alt={fixture.teams.home.name}
              width={40}
              height={40}
              className="object-contain"
              unoptimized
            />
            <span
              className={`font-medium ${fixture.teams.home.winner ? 'text-green-600' : ''}`}
            >
              {fixture.teams.home.name}
            </span>
          </div>

          <div className="px-6 text-center">
            {fixture.fixture.status.short === 'NS' ? (
              <span className="text-xl font-bold text-gray-700">
                {formatTime(fixture.fixture.date)}
              </span>
            ) : (
              <div className="text-2xl font-bold">
                <span
                  className={
                    fixture.teams.home.winner
                      ? 'text-green-600'
                      : 'text-gray-700'
                  }
                >
                  {fixture.goals.home ?? '-'}
                </span>
                <span className="mx-2 text-gray-400">:</span>
                <span
                  className={
                    fixture.teams.away.winner
                      ? 'text-green-600'
                      : 'text-gray-700'
                  }
                >
                  {fixture.goals.away ?? '-'}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 flex items-center justify-end space-x-3">
            <span
              className={`font-medium ${fixture.teams.away.winner ? 'text-green-600' : ''}`}
            >
              {fixture.teams.away.name}
            </span>
            <Image
              src={fixture.teams.away.logo}
              alt={fixture.teams.away.name}
              width={40}
              height={40}
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        {fixture.fixture.venue.name && (
          <div className="mt-3 text-center text-sm text-gray-500">
            {fixture.fixture.venue.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default FixtureCard;
