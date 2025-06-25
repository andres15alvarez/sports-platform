import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FixtureResponse } from '@/src/types/leagueResults';

interface LeagueResultsCardProps {
  fixture: FixtureResponse;
  leagueId: string;
  locale: string;
}

const LeagueResultsCard: React.FC<LeagueResultsCardProps> = ({
  fixture,
  leagueId,
  locale,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Image
              src={fixture.league.logo}
              alt={fixture.league.name}
              width={20}
              height={20}
              className="object-contain"
              unoptimized
            />
            <span>
              {fixture.league.name} - {fixture.league.round}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded">
            Full Time
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative w-12 h-12">
              <Image
                src={fixture.teams.home.logo}
                alt={fixture.teams.home.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <span
              className={`font-medium text-lg ${fixture.teams.home.winner ? 'text-gray-900' : 'text-gray-600'}`}
            >
              {fixture.teams.home.name}
            </span>
          </div>

          <div className="flex items-center space-x-2 mx-6">
            <span
              className={`text-3xl font-bold ${fixture.teams.home.winner ? 'text-gray-900' : 'text-gray-600'}`}
            >
              {fixture.goals.home}
            </span>
            <span className="text-2xl text-gray-400">:</span>
            <span
              className={`text-3xl font-bold ${fixture.teams.away.winner ? 'text-green-600' : 'text-gray-600'}`}
            >
              {fixture.goals.away}
            </span>
          </div>

          <div className="flex items-center space-x-3 flex-1 justify-end">
            <span
              className={`font-medium text-lg text-right ${fixture.teams.away.winner ? 'text-green-600' : 'text-gray-600'}`}
            >
              {fixture.teams.away.name}
            </span>
            <div className="relative w-12 h-12">
              <Image
                src={fixture.teams.away.logo}
                alt={fixture.teams.away.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <span>
              {formatDate(fixture.fixture.date)} •{' '}
              {formatTime(fixture.fixture.date)}
            </span>
            {fixture.fixture.venue?.name && (
              <span className="hidden sm:inline">
                {fixture.fixture.venue.name}
                {fixture.fixture.venue.city &&
                  `, ${fixture.fixture.venue.city}`}
              </span>
            )}
          </div>
          <Link href={`/${locale}/football/${leagueId}/${fixture.fixture.id}`}>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2 text-sm font-medium">
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
  );
};

export default LeagueResultsCard;
