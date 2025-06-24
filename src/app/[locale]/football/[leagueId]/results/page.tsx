'use client';

import React from 'react';
import LeagueResultsPage from '@/src/components/match-results-leagues/league-results-page';
import { useParams } from 'next/navigation';

const FootballLeagueResultsPage: React.FC = () => {
  const params = useParams<{ locale: string; leagueId: string }>();
  const locale = params?.locale || 'en';
  const leagueId = params?.leagueId || '';
  return (
    <LeagueResultsPage
      sportType="football"
      locale={locale}
      leagueId={leagueId}
    />
  );
};

export default FootballLeagueResultsPage;
