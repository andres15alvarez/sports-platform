'use client';

import React from 'react';
import LeagueCalendar from './league-calendar';
import LoadingSpinner from '@/src/components/match-results/loading-spinner';
import {
  League,
  CalendarFixture,
  UseCalendarHook,
  SportCalendarConfig,
} from '@/src/types/sportCalendar';

interface LeagueWithFixtures extends League {
  logo: string;
  flag: string;
  fixtures: CalendarFixture[];
  loading: boolean;
  error: string | null;
  expanded: boolean;
}

interface SportsCalendarPageProps {
  config: SportCalendarConfig;
  useCalendarHook: () => UseCalendarHook;
}

const SportsCalendarPage: React.FC<SportsCalendarPageProps> = ({
  config,
  useCalendarHook,
}) => {
  const { leagues, fixtures, loading } = useCalendarHook();

  if (loading) {
    return <LoadingSpinner message={config.loadingMessage} />;
  }

  const now = Date.now();
  const leaguesData: LeagueWithFixtures[] = leagues.map((league: League) => {
    const leagueUpcomingFixtures = fixtures
      .filter(
        (f: CalendarFixture) =>
          f.league.id === league.id && new Date(f.fixture.date).getTime() > now,
      )
      .sort(
        (a, b) =>
          new Date(a.fixture.date).getTime() -
          new Date(b.fixture.date).getTime(),
      );
    const firstFixture = leagueUpcomingFixtures[0];
    return {
      ...league,
      logo: firstFixture?.league.logo || '',
      flag: firstFixture?.league.flag || '',
      fixtures: leagueUpcomingFixtures,
      loading: false,
      error: null,
      expanded: false,
    };
  });

  const previewLeagues = leaguesData
    .filter((l) => l.fixtures.length > 0)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
          {config.title}
        </h1>
        <div className="space-y-6">
          {previewLeagues.map((league) => (
            <LeagueCalendar
              key={league.id}
              league={league}
              sportType={config.sportType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsCalendarPage;
