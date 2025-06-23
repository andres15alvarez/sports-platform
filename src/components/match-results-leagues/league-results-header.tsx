import React from 'react';
import Image from 'next/image';
import { LeagueInfo } from '@/src/types/leagueResults';

interface LeagueResultsHeaderProps {
  leagueInfo: LeagueInfo;
}

const LeagueResultsHeader: React.FC<LeagueResultsHeaderProps> = ({ leagueInfo }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="mb-4 bg-green-50 rounded-xl px-6 py-6 h-32 flex items-center">
        <div className="flex items-center gap-x-4">
          <div className="w-16 h-16 flex items-center justify-center">
            <Image
              src={leagueInfo.logo}
              alt={leagueInfo.name}
              width={64}
              height={64}
              className="object-contain max-w-full max-h-full"
              unoptimized
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-black">
              {leagueInfo.name}
            </h1>
            <p className="text-base text-gray-600 mt-1">
              Season {leagueInfo.season}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueResultsHeader; 