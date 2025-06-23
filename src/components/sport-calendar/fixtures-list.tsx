import React, { useState } from 'react';
import { CalendarFixture, ViewType } from '@/src/types/sportCalendar';
import FixtureCard from './fixture-card';
import LeagueResultsPagination from '@/src/components/match-results-leagues/league-results-pagination';

interface FixturesListProps {
  fixtures: CalendarFixture[];
  viewType: ViewType;
  onFixtureClick: (fixture: CalendarFixture) => void;
  selectedDate: string | null;
}

const FixturesList: React.FC<FixturesListProps> = ({
  fixtures,
  viewType,
  onFixtureClick,
  selectedDate,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const fixturesPerPage = 15;

  const filteredFixtures = fixtures.filter((fixture) => {
    const status = fixture.fixture.status.short;

    if (selectedDate) {
      const fixtureDate = fixture.fixture.date.substring(0, 10);
      if (fixtureDate !== selectedDate) {
        return false;
      }
    }

    if (viewType === 'all') return true;

    const viewMap = {
      finished: ['FT', 'AET', 'PEN'],
      upcoming: ['NS'],
      live: ['1H', '2H', 'HT', 'ET', 'P', 'LIVE'],
    };

    return viewMap[viewType]?.includes(status) ?? false;
  });

  const indexOfLastFixture = currentPage * fixturesPerPage;
  const indexOfFirstFixture = indexOfLastFixture - fixturesPerPage;
  const currentFixtures = filteredFixtures.slice(
    indexOfFirstFixture,
    indexOfLastFixture,
  );
  const totalPages = Math.ceil(filteredFixtures.length / fixturesPerPage);

  const groupedFixtures = currentFixtures.reduce(
    (acc, fixture) => {
      const localDate = new Date(fixture.fixture.date).toLocaleDateString(
        'en-CA',
      );
      if (!acc[localDate]) {
        acc[localDate] = [];
      }
      acc[localDate].push(fixture);
      return acc;
    },
    {} as Record<string, CalendarFixture[]>,
  );

  const sortedDates = Object.keys(groupedFixtures).sort();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (filteredFixtures.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        There are no matches to show for the selected filter.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <div key={date}>
          <h2 className="text-xl font-bold text-green-600 mb-4 border-b pb-2">
            {new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC',
            })}
          </h2>
          <div className="space-y-4">
            {groupedFixtures[date].map((fixture) => (
              <FixtureCard
                key={fixture.fixture.id}
                fixture={fixture}
                onClick={onFixtureClick}
              />
            ))}
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <LeagueResultsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default FixturesList;
