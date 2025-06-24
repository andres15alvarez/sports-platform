import React from 'react';
import LeagueCalendarHeader from './league-calendar-header';
import FixtureCard from './fixture-card';
import { League, CalendarFixture } from '@/src/types/sportCalendar';

interface LeagueWithFixtures extends League {
  logo: string;
  flag: string;
  fixtures: CalendarFixture[];
  loading: boolean;
  error: string | null;
  expanded: boolean;
}

interface LeagueCalendarProps {
  league: LeagueWithFixtures;
  sportType: string;
}

const LeagueCalendar: React.FC<LeagueCalendarProps> = ({
  league,
  sportType,
}) => {
  const logo = league.logo || league.fixtures[0]?.league.logo || '';
  const flag = league.flag || league.fixtures[0]?.league.flag || '';
  const leagueHeaderProps = {
    ...league,
    logo,
    flag,
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      <LeagueCalendarHeader league={leagueHeaderProps} sportType={sportType} />
      <div className="p-6">
        {league.loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          </div>
        ) : league.error ? (
          <div className="text-center py-8 text-red-600">{league.error}</div>
        ) : league.fixtures.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No upcoming matches found
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {league.fixtures.slice(0, 3).map((fixture: CalendarFixture) => (
                <FixtureCard
                  key={fixture.fixture.id}
                  fixture={fixture}
                  onClick={() => {}}
                />
              ))}
            </div>
            {league.fixtures.length > 3 && (
              <div className="mt-6 text-center">
                <a
                  href={`/${sportType}/${league.id}/calendar`}
                  className="inline-block bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  View Full Calendar
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueCalendar;
