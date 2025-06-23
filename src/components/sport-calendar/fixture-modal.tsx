import React from 'react';
import Image from 'next/image';
import { CalendarFixture } from '@/src/types/sportCalendar';

interface FixtureModalProps {
  fixture: CalendarFixture | null;
  isOpen: boolean;
  onClose: () => void;
}

const FixtureModal: React.FC<FixtureModalProps> = ({ fixture, isOpen, onClose }) => {
  if (!isOpen || !fixture) return null;

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
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">Match Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Image
                  src={fixture.league.logo}
                  alt={fixture.league.name}
                  width={32}
                  height={32}
                  className="object-contain"
                  unoptimized
                />
                <div>
                  <p className="font-medium">
                    {fixture.league.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {fixture.league.round}
                  </p>
                </div>
              </div>
              <span
                className={`text-lg font-medium ${getStatusColor(fixture.fixture.status.short)}`}
              >
                {getStatusText(
                  fixture.fixture.status.short,
                  fixture.fixture.status.elapsed,
                )}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 text-center">
                <Image
                  src={fixture.teams.home.logo}
                  alt={fixture.teams.home.name}
                  width={80}
                  height={80}
                  className="object-contain mx-auto mb-2"
                  unoptimized
                />
                <p className="font-medium">
                  {fixture.teams.home.name}
                </p>
              </div>

              <div className="px-6">
                {fixture.fixture.status.short === 'NS' ? (
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-700">
                      {formatTime(fixture.fixture.date)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatDate(fixture.fixture.date)}
                    </p>
                  </div>
                ) : (
                  <div className="text-4xl font-bold text-center">
                    <span
                      className={
                        fixture.teams.home.winner
                          ? 'text-green-600'
                          : 'text-gray-700'
                      }
                    >
                      {fixture.goals.home ?? '-'}
                    </span>
                    <span className="mx-3 text-gray-400">:</span>
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

              <div className="flex-1 text-center">
                <Image
                  src={fixture.teams.away.logo}
                  alt={fixture.teams.away.name}
                  width={80}
                  height={80}
                  className="object-contain mx-auto mb-2"
                  unoptimized
                />
                <p className="font-medium">
                  {fixture.teams.away.name}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {fixture.fixture.venue.name && (
              <div className="flex justify-between">
                <span className="text-gray-600">Stadium:</span>
                <span className="font-medium">
                  {fixture.fixture.venue.name},{' '}
                  {fixture.fixture.venue.city}
                </span>
              </div>
            )}

            {fixture.fixture.referee && (
              <div className="flex justify-between">
                <span className="text-gray-600">Referee:</span>
                <span className="font-medium">
                  {fixture.fixture.referee}
                </span>
              </div>
            )}

            {fixture.fixture.status.short !== 'NS' && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-3">Marker details</h3>
                <div className="space-y-2 text-sm">
                  {fixture.score.halftime.home !== null && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">First half:</span>
                      <span className="font-medium">
                        {fixture.score.halftime.home} -{' '}
                        {fixture.score.halftime.away}
                      </span>
                    </div>
                  )}
                  {fixture.score.fulltime.home !== null && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Full time:</span>
                      <span className="font-medium">
                        {fixture.score.fulltime.home} -{' '}
                        {fixture.score.fulltime.away}
                      </span>
                    </div>
                  )}
                  {fixture.score.extratime.home !== null && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overtime:</span>
                      <span className="font-medium">
                        {fixture.score.extratime.home} -{' '}
                        {fixture.score.extratime.away}
                      </span>
                    </div>
                  )}
                  {fixture.score.penalty.home !== null && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Penalties:</span>
                      <span className="font-medium">
                        {fixture.score.penalty.home} -{' '}
                        {fixture.score.penalty.away}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixtureModal; 