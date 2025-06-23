'use client';

import React from 'react';
import SportsResultsPage from '@/src/components/match-results/sports-results-page';
import useBaseballResults from '@/src/hooks/baseball/useBaseballResults';
import { SportConfig } from '@/src/types/sportsResults';

const baseballConfig: SportConfig = {
  title: 'Baseball Match Results',
  loadingMessage: 'Loading baseball match results...',
  sportType: 'baseball',
};

const BaseballPage: React.FC = () => {
  return (
    <SportsResultsPage
      config={baseballConfig}
      useResultsHook={useBaseballResults}
    />
  );
};

export default BaseballPage;
