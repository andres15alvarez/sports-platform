'use client';

import React from 'react';
import LeagueResultsHeader from './league-results-header';
import LeagueResultsFilter from './league-results-filter';
import LeagueResultsList from './league-results-list';
import LeagueResultsPagination from './league-results-pagination';
import LeagueResultsLoading from './league-results-loading';
import LeagueResultsError from './league-results-error';
import { useLeagueResults } from '@/src/hooks/useLeagueResults';

type SportType = 'football' | 'basketball' | 'baseball';

interface LeagueResultsPageProps {
  sportType: SportType;
}

const LeagueResultsPage: React.FC<LeagueResultsPageProps> = ({
  sportType,
}) => {
  const {
    loading,
    error,
    leagueInfo,
    leagueId,
    selectedFilter,
    setSelectedFilter,
    resultFilters,
    currentFixtures,
    totalPages,
    currentPage,
    paginate,
  } = useLeagueResults(sportType);

  if (loading) {
    return <LeagueResultsLoading />;
  }

  if (error) {
    return <LeagueResultsError error={error} sportType={sportType} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {leagueInfo && <LeagueResultsHeader leagueInfo={leagueInfo} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <LeagueResultsFilter
          sportType={sportType}
          selectedFilter={selectedFilter}
          resultFilters={resultFilters}
          onFilterChange={(filter) => {
            setSelectedFilter(filter);
            paginate(1);
          }}
        />

        <LeagueResultsList
          fixtures={currentFixtures}
          sportType={sportType}
          leagueId={leagueId}
        />

        {totalPages > 1 && (
          <LeagueResultsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default LeagueResultsPage; 