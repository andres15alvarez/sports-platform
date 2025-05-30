'use client';

import React from 'react';

const ProjectedLineups: React.FC = () => {
  return (
    <section id="starting-lineups" className="mb-8">
      <h2 className="text-xl font-bold text-green-800 border-b border-gray-200 pb-2 mb-4">
        Predicted Starting Lineups
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Lakers Lineup */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3">
            Los Angeles Lakers Predicted Lineup
          </h3>
          <div className="bg-yellow-800 rounded-lg p-4 relative h-80">
            {/* Court markings */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-50 transform -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 bottom-0 w-px bg-white opacity-50 transform -translate-x-1/2" />
            <div className="absolute bottom-0 left-1/2 w-24 h-24 border-2 border-white opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

            {/* PG */}
            <div className="absolute bottom-14 left-1/4 transform -translate-x-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold mb-1">
                5
              </div>
              <span className="text-white text-xs font-medium">
                D&apos;Angelo Russell
              </span>
              <span className="text-white text-xs opacity-75">PG</span>
            </div>

            {/* SG */}
            <div className="absolute bottom-14 right-1/4 transform translate-x-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold mb-1">
                15
              </div>
              <span className="text-white text-xs font-medium">
                Austin Reaves
              </span>
              <span className="text-white text-xs opacity-75">SG</span>
            </div>

            {/* SF */}
            <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold mb-1">
                23
              </div>
              <span className="text-white text-xs font-medium">
                LeBron James
              </span>
              <span className="text-white text-xs opacity-75">SF</span>
            </div>

            {/* PF */}
            <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold mb-1">
                10
              </div>
              <span className="text-white text-xs font-medium">
                Rui Hachimura
              </span>
              <span className="text-white text-xs opacity-75">PF</span>
            </div>

            {/* C */}
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold mb-1">
                3
              </div>
              <span className="text-white text-xs font-medium">
                Anthony Davis
              </span>
              <span className="text-white text-xs opacity-75">C</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200">
            <h4 className="font-semibold mb-2">
              Key Bench Players & Injury News
            </h4>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Gabe Vincent</span>
                <span className="text-green-600">Available</span>
              </li>
              <li className="flex justify-between">
                <span>Jarred Vanderbilt</span>
                <span className="text-yellow-600">
                  Game-time Decision (Foot)
                </span>
              </li>
              <li className="flex justify-between">
                <span>Taurean Prince</span>
                <span className="text-green-600">Available</span>
              </li>
              <li className="flex justify-between">
                <span>Christian Wood</span>
                <span className="text-red-600">Out (Knee)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Celtics Lineup */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3">
            Boston Celtics Predicted Lineup
          </h3>
          <div className="bg-green-800 rounded-lg p-4 relative h-80">
            {/* Court markings */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-50 transform -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 bottom-0 w-px bg-white opacity-50 transform -translate-x-1/2" />
            <div className="absolute bottom-0 left-1/2 w-24 h-24 border-2 border-white opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

            {/* PG */}
            <div className="absolute bottom-14 left-1/4 transform -translate-x-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mb-1">
                7
              </div>
              <span className="text-white text-xs font-medium">
                Jrue Holiday
              </span>
              <span className="text-white text-xs opacity-75">PG</span>
            </div>

            {/* SG */}
            <div className="absolute bottom-14 right-1/4 transform translate-x-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mb-1">
                7
              </div>
              <span className="text-white text-xs font-medium">
                Jaylen Brown
              </span>
              <span className="text-white text-xs opacity-75">SG</span>
            </div>

            {/* SF */}
            <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mb-1">
                0
              </div>
              <span className="text-white text-xs font-medium">
                Jayson Tatum
              </span>
              <span className="text-white text-xs opacity-75">SF</span>
            </div>

            {/* PF */}
            <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mb-1">
                12
              </div>
              <span className="text-white text-xs font-medium">Al Horford</span>
              <span className="text-white text-xs opacity-75">PF</span>
            </div>

            {/* C */}
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mb-1">
                6
              </div>
              <span className="text-white text-xs font-medium">
                Kristaps Porziņģis
              </span>
              <span className="text-white text-xs opacity-75">C</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200">
            <h4 className="font-semibold mb-2">
              Key Bench Players & Injury News
            </h4>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Derrick White</span>
                <span className="text-green-600">Available</span>
              </li>
              <li className="flex justify-between">
                <span>Payton Pritchard</span>
                <span className="text-green-600">Available</span>
              </li>
              <li className="flex justify-between">
                <span>Sam Hauser</span>
                <span className="text-green-600">Available</span>
              </li>
              <li className="flex justify-between">
                <span>Luke Kornet</span>
                <span className="text-yellow-600">
                  Game-time Decision (Ankle)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tactical Analysis */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-lg mb-3">Tactical Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Lakers&apos; Approach</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Will look to leverage size advantage with James and Davis</li>
              <li>
                Transition offense critical (17.5 fast break points per game)
              </li>
              <li>
                Zone defense likely to combat Celtics&apos; perimeter shooting
              </li>
              <li>
                Post play through Davis to exploit matchups with Porziņģis
              </li>
              <li>Will try to slow pace and keep score under 220 points</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Celtics&apos; Approach</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Will rely on Tatum and Brown&apos;s perimeter shooting</li>
              <li>Look to space the floor with Porziņģis and Horford</li>
              <li>Need to match Lakers&apos; physicality in the paint</li>
              <li>Fast breaks will be crucial to creating mismatches</li>
              <li>Switch-heavy defense to limit driving lanes</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-200">
          <h4 className="font-semibold mb-2">Key Tactical Battles</h4>
          <div className="space-y-2 text-sm">
            <div className="flex">
              <div className="w-1/2 pr-2">
                <span className="font-medium">LeBron vs Tatum</span>
              </div>
              <div className="w-1/2 pl-2">
                <span>The matchup of star forwards with differing styles</span>
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2 pr-2">
                <span className="font-medium">Davis vs Porziņģis</span>
              </div>
              <div className="w-1/2 pl-2">
                <span>
                  Battle between elite big men with contrasting skill sets
                </span>
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2 pr-2">
                <span className="font-medium">Perimeter Defense</span>
              </div>
              <div className="w-1/2 pl-2">
                <span>
                  Lakers must contain Celtics&apos; league-leading three-point
                  shooting
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectedLineups;
