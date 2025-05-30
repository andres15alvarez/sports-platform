'use client';

import TeamFormCard from '../team-form';
import TeamStatsCard from '../team-stats';
import YankeesRedSoxLineChart from '../charts/baseball-prediction/season-performance';
import YankeesHomeResultsChart from '../charts/baseball-prediction/yankees-home-form';
import RedSoxAwayResultsChart from '../charts/baseball-prediction/redsox-away-form';
import React from 'react';

const TeamFormAnalysis: React.FC = () => {
  return (
    <section id="team-form" className="mb-8">
      <h2 className="text-xl font-bold text-green-800 border-b border-gray-200 pb-2 mb-4">
        Team Form Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TeamFormCard
          teamName="New York Yankees"
          form={['W', 'W', 'W', 'L', 'W']}
          summary="The Yankees are in excellent form, winning 4 of their last 5 games, scoring 32 runs while allowing just 14 during this period."
          recentMatches={[
            {
              match: 'Yankees 6-2 Blue Jays',
              date: 'May 8, 2025',
              result: 'W',
            },
            {
              match: 'Yankees 8-3 Blue Jays',
              date: 'May 7, 2025',
              result: 'W',
            },
            { match: 'Yankees 5-2 Orioles', date: 'May 5, 2025', result: 'W' },
            { match: 'Orioles 6-4 Yankees', date: 'May 4, 2025', result: 'L' },
            { match: 'Yankees 9-1 Orioles', date: 'May 3, 2025', result: 'W' },
          ]}
          goalsScored={32}
          goalsConceded={14}
          cleanSheets={11}
        />

        <TeamFormCard
          teamName="Boston Red Sox"
          form={['W', 'W', 'L', 'L', 'W']}
          summary="The Red Sox have been somewhat inconsistent with 3 wins and 2 losses in their last 5 games, scoring 25 runs and conceding 22."
          recentMatches={[
            { match: 'Red Sox 6-4 Rays', date: 'May 9, 2025', result: 'W' },
            { match: 'Red Sox 5-2 Rays', date: 'May 8, 2025', result: 'W' },
            { match: 'Twins 7-3 Red Sox', date: 'May 5, 2025', result: 'L' },
            { match: 'Twins 6-5 Red Sox', date: 'May 4, 2025', result: 'L' },
            { match: 'Red Sox 6-3 Twins', date: 'May 3, 2025', result: 'W' },
          ]}
          goalsScored={25}
          goalsConceded={22}
          cleanSheets={7}
        />
      </div>

      {/* Chart container */}
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-3">
          Season Performance Comparison
        </h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="h-[250px] w-full">
            <YankeesRedSoxLineChart />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamStatsCard
          title="Yankees Home Form"
          chartId="yankeesHomeChart"
          chart={<YankeesHomeResultsChart />}
          stats={{
            Played: 18,
            Won: 14,
            Lost: 4,
            'Win Rate': '77.8%',
            'Runs For': 91,
            'Runs Against': 53,
            'Home Runs': 28,
            'Run Differential': '+38',
          }}
        />

        <TeamStatsCard
          title="Red Sox Away Form"
          chartId="redSoxAwayChart"
          chart={<RedSoxAwayResultsChart />}
          stats={{
            Played: 20,
            Won: 12,
            Lost: 8,
            'Win Rate': '60.0%',
            'Runs For': 87,
            'Runs Against': 75,
            'Home Runs': 21,
            'Run Differential': '+12',
          }}
        />
      </div>
    </section>
  );
};

export default TeamFormAnalysis;
