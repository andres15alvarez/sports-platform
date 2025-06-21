import React from 'react';
import Link from 'next/link';

interface LeagueResultsErrorProps {
  error: string;
  sportType: string;
}

const LeagueResultsError: React.FC<LeagueResultsErrorProps> = ({ error, sportType }) => {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg">{error}</p>
          <Link href={`/${sportType}/results`}>
            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
              Back to Results
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeagueResultsError; 