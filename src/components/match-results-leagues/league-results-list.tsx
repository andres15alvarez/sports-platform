import React from 'react';
import LeagueResultsCard from './league-results-card';
import { FixtureResponse } from '@/src/types/leagueResults';

interface LeagueResultsListProps {
  fixtures: FixtureResponse[];
  sportType: string;
  leagueId: string;
  locale: string;
}

const LeagueResultsList: React.FC<LeagueResultsListProps> = ({
  fixtures,
  leagueId,
  locale,
}) => {
  if (fixtures.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">No matches found with selected filter</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {fixtures.map((fixture) => (
        <LeagueResultsCard
          key={fixture.fixture.id}
          fixture={fixture}
          leagueId={leagueId}
          locale={locale}
        />
      ))}
    </div>
  );
};

export default LeagueResultsList;
