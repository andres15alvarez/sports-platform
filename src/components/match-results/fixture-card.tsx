import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CommonFixture } from '../../types/sportsResults';
import { formatDate, formatTime, getResultType } from '../../utils/utils';

interface FixtureCardProps {
  fixture: CommonFixture;
  sportType: string;
  leagueId: number;
}

const FixtureCard: React.FC<FixtureCardProps> = ({
  fixture,
  sportType,
  leagueId,
}) => {
  const resultType = getResultType(fixture);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
      <div className="bg-white p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500">
            {formatDate(fixture.date)}
          </span>
          <span className="text-xs text-gray-500">
            {formatTime(fixture.date)}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src={fixture.teams.home.logo}
                  alt={fixture.teams.home.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span
                className={`text-sm font-medium ${fixture.teams.home.winner ? 'text-green-700' : ''}`}
              >
                {fixture.teams.home.name}
              </span>
            </div>
            <span
              className={`text-lg font-bold ml-2 ${fixture.teams.home.winner ? 'text-green-700' : ''}`}
            >
              {fixture.score.home}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src={fixture.teams.away.logo}
                  alt={fixture.teams.away.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span
                className={`text-sm font-medium ${fixture.teams.away.winner ? 'text-green-700' : ''}`}
              >
                {fixture.teams.away.name}
              </span>
            </div>
            <span
              className={`text-lg font-bold ml-2 ${fixture.teams.away.winner ? 'text-green-700' : ''}`}
            >
              {fixture.score.away}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Result</span>
            <span
              className={`font-semibold ${
                resultType === 'Draw' ? 'text-gray-700' : 'text-green-700'
              }`}
            >
              {resultType}
            </span>
          </div>

          {fixture.score.halftime && fixture.score.halftime.home !== null && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Half-time</span>
              <span className="font-medium">
                {fixture.score.halftime.home} - {fixture.score.halftime.away}
              </span>
            </div>
          )}

          {fixture.venue?.name && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Venue</span>
              <span className="font-medium text-right">
                {fixture.venue.name}
              </span>
            </div>
          )}

          <div className="pt-2 mt-2 border-t border-gray-200">
            <Link href={`/${sportType}/${leagueId}/game-details`}>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md transition-colors flex items-center justify-center space-x-2 text-sm font-medium">
                <span>View Details</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixtureCard;
