'use client';

import React from 'react';
import SportsResultsPage from '@/src/components/match-results/sports-results-page';
import useBasketballResults from '@/src/hooks/basketball/useBasketballResults';
import { SportConfig } from '@/src/types/sportsResults';

const basketballConfig: SportConfig = {
  title: 'Basketball Match Results',
  loadingMessage: 'Loading basketball match results...',
  sportType: 'basketball',
};

const BasketballPage: React.FC = () => {
  return (
    <SportsResultsPage
      config={basketballConfig}
      useResultsHook={useBasketballResults}
    />
  );
};

export default BasketballPage;
