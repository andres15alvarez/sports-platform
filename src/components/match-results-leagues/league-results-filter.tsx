import React from 'react';
import Link from 'next/link';

interface LeagueResultsFilterProps {
  sportType: string;
  selectedFilter: string;
  resultFilters: string[];
  onFilterChange: (filter: string) => void;
}

const LeagueResultsFilter: React.FC<LeagueResultsFilterProps> = ({
  sportType,
  selectedFilter,
  resultFilters,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
      <Link href={`/${sportType}/results`}>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to All Results</span>
        </button>
      </Link>

      <div className="w-full sm:w-auto">
        <select
          value={selectedFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600"
        >
          {resultFilters.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LeagueResultsFilter;
