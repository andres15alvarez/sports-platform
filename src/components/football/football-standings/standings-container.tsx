'use client';

import React from 'react';
import { useStandings } from '@/src/hooks/football/useFootballStandings';
import { LoadingSpinner } from './loading-spinner';
import { ErrorMessage } from './error-message';
import { LeagueHeader } from './league-header';
import { StandingsTable } from './standings-table';

interface StandingsContainerProps {
  leagueId: number;
  season: number;
}

export const StandingsContainer: React.FC<StandingsContainerProps> = ({
  leagueId,
  season,
}) => {
  const { standings, leagueInfo, loading, error } = useStandings({
    leagueId,
    season,
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {leagueInfo && <LeagueHeader leagueInfo={leagueInfo} />}
        <StandingsTable standings={standings} />
      </div>
    </div>
  );
};
