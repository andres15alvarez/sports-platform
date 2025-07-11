import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CommonLeagueData } from '../../types/sportsResults';

interface LeagueHeaderProps {
  league: CommonLeagueData;
  sportType: string;
}

const LeagueHeader: React.FC<LeagueHeaderProps> = ({ league, sportType }) => {
  const resultsUrl = `/${sportType}/${league.id}/results`;

  return (
    <div className="bg-gradient-to-r from-green-700 to-green-900 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {league.logo && (
            <div className="relative w-12 h-12 bg-white rounded-full p-1">
              <Image
                src={league.logo}
                alt={league.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          )}
          <div>
            <h2 className="font-bold text-xl">{league.name}</h2>
            <p className="text-sm text-green-200 flex items-center space-x-1">
              {league.flag && (
                <Image
                  src={league.flag}
                  alt={league.country}
                  width={20}
                  height={15}
                  className="inline-block"
                  unoptimized
                />
              )}
              <span>{league.country}</span>
            </p>
          </div>
        </div>
        {league.fixtures.length > 0 && (
          <Link href={resultsUrl}>
            <button className="bg-green-600 hover:bg-green-500 px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center space-x-1">
              <span>View More</span>
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
        )}
      </div>
    </div>
  );
};

export default LeagueHeader;
