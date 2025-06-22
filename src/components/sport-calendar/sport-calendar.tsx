import React, { useState } from 'react';
import { CalendarFixture, UseCalendarHook, ViewType } from '@/src/types/sportCalendar';
import LeagueSelector from './league-selector';
import FixturesList from './fixtures-list';
import FixtureModal from './fixture-modal';
import LoadingSpinner from './loading-spinner';
import ErrorMessage from './error-message';

interface SportCalendarProps {
  useCalendarHook: () => UseCalendarHook;
}

const SportCalendar: React.FC<SportCalendarProps> = ({ useCalendarHook }) => {
  const {
    fixtures,
    loading,
    error,
    selectedLeague,
    setSelectedLeague,
    viewType,
    setViewType,
    leagues,
  } = useCalendarHook();

  const [selectedFixture, setSelectedFixture] = useState<CalendarFixture | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleFixtureClick = (fixture: CalendarFixture) => {
    setSelectedFixture(fixture);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFixture(null);
  };
  
  const buttonStyles: Record<ViewType, string> = {
    upcoming: 'bg-blue-600 text-white',
    live: 'bg-red-600 text-white',
    finished: 'bg-gray-600 text-white',
    all: 'bg-indigo-600 text-white',
  };

  const viewFilters: { label: string; type: ViewType }[] = [
    { label: 'Upcoming', type: 'upcoming' },
    { label: 'Live', type: 'live' },
    { label: 'Finished', type: 'finished' },
    { label: 'All', type: 'all' },
  ];

  if (loading && fixtures.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <LeagueSelector
            leagues={leagues}
            selectedLeague={selectedLeague}
            onLeagueChange={setSelectedLeague}
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <input
            type="date"
            value={selectedDate || ''}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />

          <div className="flex space-x-2">
            {viewFilters.map((filter) => (
              <button
                key={filter.type}
                onClick={() => setViewType(filter.type)}
                className={`w-24 px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                  viewType === filter.type
                    ? buttonStyles[filter.type]
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto my-4"></div>
        )}

        <FixturesList
          fixtures={fixtures}
          viewType={viewType}
          onFixtureClick={handleFixtureClick}
          selectedDate={selectedDate}
        />

        <FixtureModal
          fixture={selectedFixture}
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default SportCalendar; 