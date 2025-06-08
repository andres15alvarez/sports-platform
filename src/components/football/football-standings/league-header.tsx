import React from 'react';
import Image from 'next/image';
import { LeagueInfo } from '@/src/types/footballStandings';

interface LeagueHeaderProps {
  leagueInfo: LeagueInfo;
}

export const LeagueHeader: React.FC<LeagueHeaderProps> = ({ leagueInfo }) => (
  <div className="mb-4 bg-green-50 rounded-xl px-4 py-3 ">
    <div className="flex items-center gap-x-3">
      <Image
        src={leagueInfo.logo}
        alt={leagueInfo.name}
        width={48}
        height={48}
        className="object-contain"
        unoptimized
      />
      <div>
        <h1 className="text-xl font-semibold text-black">{leagueInfo.name}</h1>
        <p className="text-sm text-gray-600">Season {leagueInfo.season}</p>
      </div>
    </div>
  </div>
);
