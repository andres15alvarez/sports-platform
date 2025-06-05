'use client';

import React, { ReactNode } from 'react';

interface Match {
  date: string;
  competition: string;
  result: 'Win' | 'Loss' | 'Draw' | string;
  score: string;
  team1: string;
  team2: string;
  scorers1: string;
  scorers2: string;
  loss?: string;
}

interface SummaryStats {
  barcelona: number;
  draws: number;
  madrid: number;
  titleOne: string;
  titleTwo: string;
  titleThree: string;
}

interface HeadToHeadSectionProps {
  matches: Match[];
  summaryStats: SummaryStats;
  insights: string[];
  h2hChart: ReactNode;
  teamPerformanceChart: ReactNode;
  titleOne?: string;
  titleTwo?: string;
}

const MatchCard: React.FC<Match> = ({
  date,
  competition,
  result,
  score,
  team1,
  team2,
  scorers1,
  scorers2,
  loss = '',
}) => {
  const resultColor =
    result === 'Win'
      ? 'bg-green-100 text-green-800'
      : result === 'Loss'
        ? 'bg-red-100 text-red-800'
        : 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {date} - {competition}
        </span>
        <span className={`text-xs ${resultColor} px-2 py-1 rounded`}>
          {loss} {result}
        </span>
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className="font-medium">{team1}</span>
        <span className="font-bold">{score}</span>
        <span className="font-medium">{team2}</span>
      </div>
      <div className="flex justify-between text-xs mt-2 text-gray-600">
        <span>{scorers1}</span>
        <span>{scorers2}</span>
      </div>
    </div>
  );
};

const HeadToHeadSection: React.FC<HeadToHeadSectionProps> = ({
  matches,
  summaryStats,
  insights,
  h2hChart,
  teamPerformanceChart,
  titleOne = 'Last 5 El Clásico Matches',
  titleTwo = 'H2H Summary (Last 10 Matches)',
}) => {
  return (
    <section id="head-to-head" className="mb-8">
      <h2 className="text-xl font-bold text-green-800 border-b border-gray-200 pb-2 mb-4">
        Head-to-Head Statistics
      </h2>

      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Recent H2H Matches */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3">{titleOne}</h3>
          <div className="space-y-3">
            {matches.map((match, index) => (
              <MatchCard key={index} {...match} />
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3">{titleTwo}</h3>
          <div className="flex space-x-2 mb-4">
            <div className="flex-1 bg-green-100 text-green-800 rounded-lg py-3 text-center">
              <div className="text-2xl font-bold">{summaryStats.barcelona}</div>
              <div className="text-xs">{summaryStats.titleOne} Wins</div>
            </div>
            <div className="flex-1 bg-gray-100 text-gray-800 rounded-lg py-3 text-center">
              <div className="text-2xl font-bold">{summaryStats.draws}</div>
              <div className="text-xs">{summaryStats.titleTwo}</div>
            </div>
            <div className="flex-1 bg-red-100 text-red-800 rounded-lg py-3 text-center">
              <div className="text-2xl font-bold">{summaryStats.madrid}</div>
              <div className="text-xs">{summaryStats.titleThree} Wins</div>
            </div>
          </div>

          <div className="h-[200px]">{h2hChart}</div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-md mb-2">Key H2H Insights</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              {insights.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-3">Team Performance Comparison</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="h-[250px]">{teamPerformanceChart}</div>
        </div>
      </div>
    </section>
  );
};

export default HeadToHeadSection;
