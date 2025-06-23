'use client';

import React from 'react';
import FilterSelector from '@/src/components/match-results/filter-selector';
import LeagueResults from '@/src/components/match-results/league-results';
import LoadingSpinner from '@/src/components/match-results/loading-spinner';
import { SportConfig, UseResultsHook } from '@/src/types/sportsResults';

interface SportsResultsPageProps {
  config: SportConfig;
  useResultsHook: () => UseResultsHook;
}

const SportsResultsPage: React.FC<SportsResultsPageProps> = ({
  config,
  useResultsHook,
}) => {
  const {
    leaguesData,
    initialLoading,
    selectedFilter,
    setSelectedFilter,
    resultFilters,
  } = useResultsHook();

  if (initialLoading) {
    return <LoadingSpinner message={config.loadingMessage} />;
  }

  console.log(`Current ${config.sportType} leagues data:`, leaguesData);

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
          {config.title}
        </h1>

        <FilterSelector
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          filters={resultFilters}
        />

        <div className="space-y-6">
          {leaguesData.map((league) => (
            <LeagueResults
              key={league.id}
              league={league}
              selectedFilter={selectedFilter}
              sportType={config.sportType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SportsResultsPage;
