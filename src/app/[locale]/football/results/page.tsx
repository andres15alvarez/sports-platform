'use client';

import React from 'react';
import SportsResultsPage from '@/src/components/match-results/sports-results-page';
import useFootballResults from '@/src/hooks/football/useFootballResults';
import { SportConfig } from '@/src/types/sportsResults';

const footballConfig: SportConfig = {
  title: 'Football Match Results',
  loadingMessage: 'Loading football match results...',
  sportType: 'football',
};

const FootballPage: React.FC = () => {
  return (
    <SportsResultsPage
      config={footballConfig}
      useResultsHook={useFootballResults}
    />
  );
};

export default FootballPage;
