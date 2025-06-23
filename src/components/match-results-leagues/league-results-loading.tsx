import React from 'react';

const LeagueResultsLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading match results...</p>
      </div>
    </div>
  );
};

export default LeagueResultsLoading;
