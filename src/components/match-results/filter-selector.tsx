import React from 'react';
import { ResultFilter } from '../../types/types';

interface FilterSelectorProps {
  selectedFilter: ResultFilter;
  onFilterChange: (filter: ResultFilter) => void;
  filters: ResultFilter[];
}

const FilterSelector: React.FC<FilterSelectorProps> = ({
  selectedFilter,
  onFilterChange,
  filters,
}) => {
  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
      <div className="max-w-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter Results
        </label>
        <select
          value={selectedFilter}
          onChange={(e) => onFilterChange(e.target.value as ResultFilter)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600"
        >
          {filters.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSelector;
