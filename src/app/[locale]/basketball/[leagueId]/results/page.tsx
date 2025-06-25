'use client';

import React from 'react';
import LeagueResultsPage from '@/src/components/match-results-leagues/league-results-page';
import { useParams } from 'next/navigation';

const BasketballLeagueResultsPage: React.FC = () => {
  const params = useParams<{ locale: string; leagueId: string }>();
  const locale = params?.locale || 'en';
  const leagueId = params?.leagueId || '';
  return (
    <LeagueResultsPage
      sportType="basketball"
      locale={locale}
      leagueId={leagueId}
    />
  );
};

export default BasketballLeagueResultsPage;
