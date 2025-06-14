'use client';

import React, { Suspense } from 'react';
import { StandingsContainer } from '@/src/components/football/football-standings/standings-container';
import { LoadingSpinner } from '@/src/components/football/football-standings/loading-spinner';

const DEFAULT_LEAGUE_ID = 71;
const DEFAULT_SEASON = 2025;

const StandingsPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <StandingsContainer
        leagueId={DEFAULT_LEAGUE_ID}
        season={DEFAULT_SEASON}
      />
    </Suspense>
  );
};

export default StandingsPage;
