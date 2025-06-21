'use client';

import React, { Suspense } from 'react';
import { StandingsContainer } from '@/src/components/football/football-standings/standings-container';
import { LoadingSpinner } from '@/src/components/football/football-standings/loading-spinner';
import { useParams } from 'next/navigation';

const StandingsPage: React.FC = () => {
  const params = useParams<{ leagueId: string }>();
  const leagueId = params?.leagueId || 71;
  const currentYear = new Date().getFullYear();
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <StandingsContainer leagueId={Number(leagueId)} season={currentYear} />
    </Suspense>
  );
};

export default StandingsPage;
