import React from 'react';
import Image from 'next/image';
import { Team } from '@/src/types/footballStandings';

interface TeamCellProps {
  team: Team;
}

export const TeamCell: React.FC<TeamCellProps> = ({ team }) => (
  <div className="flex items-center gap-x-2">
    <Image
      src={team.logo}
      alt={team.name}
      width={24}
      height={24}
      className="object-contain"
      unoptimized
    />
    <span className="text-sm font-semibold text-gray-800">{team.name}</span>
  </div>
);
