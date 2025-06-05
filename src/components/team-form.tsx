'use client';

import React from 'react';

type MatchResult = 'W' | 'D' | 'L';

type RecentMatch = {
  match: string;
  date: string;
  result: MatchResult;
};

type TeamFormCardProps = {
  teamName: string;
  form: MatchResult[];
  summary: string;
  recentMatches: RecentMatch[];
  goalsScored: number;
  goalsConceded: number;
  cleanSheets: number;
};

const TeamFormCard: React.FC<TeamFormCardProps> = ({
  teamName,
  form,
  summary,
  recentMatches,
  goalsScored,
  goalsConceded,
  cleanSheets,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-bold text-lg mb-3">{teamName}: Current Form</h3>

      <div className="flex mb-3">
        {form.map((res, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full ${
              res === 'W'
                ? 'bg-green-500'
                : res === 'D'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            } flex items-center justify-center text-white font-bold mr-2`}
          >
            {res}
          </div>
        ))}
      </div>

      <p className="text-sm mb-3">{summary}</p>

      <ul className="text-sm space-y-2">
        {recentMatches.map((game, i) => (
          <li key={i} className="flex justify-between items-center">
            <div className="flex-1">
              <span className="font-bold">{game.match}</span>
              <span className="text-xs text-gray-500 ml-2">{game.date}</span>
            </div>
            <span
              className={`font-semibold ${
                game.result === 'W'
                  ? 'text-green-600'
                  : game.result === 'D'
                    ? 'text-yellow-600'
                    : 'text-red-600'
              }`}
            >
              {game.result}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700">Goals Scored:</span>
          <span className="font-semibold">{goalsScored}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700">Goals Conceded:</span>
          <span className="font-semibold">{goalsConceded}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-700">Clean Sheets:</span>
          <span className="font-semibold">{cleanSheets}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamFormCard;
