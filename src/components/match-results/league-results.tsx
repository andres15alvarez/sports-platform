import React from 'react';
import { LeagueData } from '../../types/types';
import { filterFixtures } from '../../utils/utils';
import LeagueHeader from './league-header';
import FixtureCard from './fixture-card';

interface LeagueResultsProps {
  league: LeagueData;
  selectedFilter: string;
  sportType: string;
}

const LeagueResults: React.FC<LeagueResultsProps> = ({
  league,
  selectedFilter,
  sportType,
}) => {
  const filteredFixtures = filterFixtures(
    league.fixtures,
    selectedFilter as 'All Results' | 'Home Wins' | 'Away Wins' | 'Draws',
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      <LeagueHeader league={league} sportType={sportType} />

      <div className="p-6">
        {league.loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          </div>
        ) : league.error ? (
          <div className="text-center py-8 text-red-600">{league.error}</div>
        ) : filteredFixtures.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No matches found with selected filter
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFixtures.map((fixture, index) => {
                if (!fixture || !fixture.fixture || !fixture.fixture.id) {
                  console.error('Invalid fixture structure:', fixture);
                  return null;
                }

                return (
                  <FixtureCard
                    key={fixture.fixture.id || index}
                    fixture={fixture}
                    sportType={sportType}
                    leagueId={league.id}
                  />
                );
              })}
            </div>

            {league.fixtures.length > 3 && (
              <div className="mt-6 text-center">
                <a
                  href={`/${sportType}/${league.id}/results`}
                  className="inline-block bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  View All Results
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueResults;
