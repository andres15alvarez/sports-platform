import React from 'react';

export default function MatchOverview() {
  return (
    <>
      <div className="bg-gray-50 rounded-xl text-black p-6 mb-8 shadow-sm hidden lg:block">
        <h2 className="text-xl font-bold text-black mb-4">Match Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          {/* FC Barcelona Stats */}
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-800 mb-2">FC Barcelona</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Current Position:</span>{' '}
                <span className="font-medium">2nd</span>
              </li>
              <li className="flex justify-between">
                <span>Points:</span> <span className="font-medium">73</span>
              </li>
              <li className="flex justify-between">
                <span>Form (Last 5):</span>{' '}
                <span className="font-medium">W W D W L</span>
              </li>
              <li className="flex justify-between">
                <span>Goals Scored:</span>{' '}
                <span className="font-medium">62</span>
              </li>
              <li className="flex justify-between">
                <span>Goals Conceded:</span>{' '}
                <span className="font-medium">28</span>
              </li>
            </ul>
          </div>

          {/* Match Info */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-center mb-2">
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                La Liga - Matchday 35
              </span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="text-center">
                <span className="text-gray-700 text-lg font-medium">
                  Barcelona
                </span>
              </div>
              <div className="text-center text-2xl font-bold">
                <span>VS</span>
              </div>
              <div className="text-center">
                <span className="text-gray-700 text-lg font-medium">
                  Real Madrid
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-2">
              <div className="text-center text-2xl font-semibold text-blue-600">
                2.15
              </div>
              <div className="text-center text-xl font-semibold text-gray-600">
                3.50
              </div>
              <div className="text-center text-2xl font-semibold text-white bg-blue-600 rounded-md px-2">
                3.25
              </div>
            </div>

            <div className="flex justify-between text-xs text-center text-gray-600">
              <div>Home Win</div>
              <div>Draw</div>
              <div>Away Win</div>
            </div>
          </div>

          {/* Real Madrid Stats */}
          <div className="bg-white p-4 rounded-lg shadow-sm border-r-4 border-purple-500">
            <h3 className="font-semibold text-purple-800 mb-2">Real Madrid</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Current Position:</span>{' '}
                <span className="font-medium">1st</span>
              </li>
              <li className="flex justify-between">
                <span>Points:</span> <span className="font-medium">78</span>
              </li>
              <li className="flex justify-between">
                <span>Form (Last 5):</span>{' '}
                <span className="font-medium">W W W D W</span>
              </li>
              <li className="flex justify-between">
                <span>Goals Scored:</span>{' '}
                <span className="font-medium">68</span>
              </li>
              <li className="flex justify-between">
                <span>Goals Conceded:</span>{' '}
                <span className="font-medium">23</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
