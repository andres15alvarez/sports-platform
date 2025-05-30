'use client';

import React from 'react';
import TeamFormCard from '../team-form';
import TeamStatsCard from '../team-stats';
import SeasonProgressionChart from '../charts/basket-prediction/season-performance-comparison';
import LakersHomeResultsChart from '../charts/basket-prediction/laker-home-form';
import CelticsAwayResultsChart from '../charts/basket-prediction/celtics-away-form';

const TeamFormAnalysis: React.FC = () => {
  return (
    <section id="team-form" className="mb-8">
      <h2 className="text-xl font-bold text-green-800 border-b border-gray-200 pb-2 mb-4">
        Team Form Analysis
      </h2>

      {/* Form Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TeamFormCard
          teamName="Los Angeles Lakers"
          form={['W', 'W', 'L', 'W', 'W']}
          summary="The Lakers have won 4 of their last 5 playoff games, showing impressive resilience after dropping Game 3 against Denver."
          recentMatches={[
            {
              match: 'Lakers 114-103 Nuggets',
              date: 'Apr 29, 2025',
              result: 'W',
            },
            {
              match: 'Lakers 112-104 Nuggets',
              date: 'Apr 27, 2025',
              result: 'W',
            },
            {
              match: 'Nuggets 118-112 Lakers',
              date: 'Apr 24, 2025',
              result: 'L',
            },
            {
              match: 'Nuggets 107-110 Lakers',
              date: 'Apr 22, 2025',
              result: 'W',
            },
            {
              match: 'Lakers 108-98 Timberwolves',
              date: 'Apr 19, 2025',
              result: 'W',
            },
          ]}
          goalsScored={111.2}
          goalsConceded={106.0}
          cleanSheets={47.8}
        />

        <TeamFormCard
          teamName="Boston Celtics"
          form={['W', 'W', 'W', 'L', 'W']}
          summary="The Celtics have been dominant with 4 wins in their last 5 games, with their only loss coming in a close Game 3 against the 76ers."
          recentMatches={[
            {
              match: 'Celtics 121-105 76ers',
              date: 'Apr 28, 2025',
              result: 'W',
            },
            {
              match: '76ers 101-119 Celtics',
              date: 'Apr 26, 2025',
              result: 'W',
            },
            {
              match: 'Celtics 115-101 76ers',
              date: 'Apr 23, 2025',
              result: 'W',
            },
            {
              match: '76ers 112-110 Celtics',
              date: 'Apr 21, 2025',
              result: 'L',
            },
            {
              match: 'Celtics 108-97 Cavaliers',
              date: 'Apr 18, 2025',
              result: 'W',
            },
          ]}
          goalsScored={114.6}
          goalsConceded={103.2}
          cleanSheets={49.2}
        />
      </div>

      {/* Season Chart */}
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-3">
          Season Performance Comparison
        </h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="h-[250px] w-full">
            <SeasonProgressionChart />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamStatsCard
          title="Lakers Home Form"
          chartId="lakersHomeChart"
          chart={<LakersHomeResultsChart />}
          stats={{
            Played: 45,
            Won: 36,
            Lost: 9,
            'Win Rate': '80.0%',
            'Points For': 114.2,
            'Points Against': 107.5,
            'Avg Point Diff': '+6.7',
            'Home Rating': 114.8,
          }}
        />

        <TeamStatsCard
          title="Celtics Away Form"
          chartId="celticsAwayChart"
          chart={<CelticsAwayResultsChart />}
          stats={{
            Played: 44,
            Won: 32,
            Lost: 12,
            'Win Rate': '72.7%',
            'Points For': 110.7,
            'Points Against': 105.2,
            'Avg Point Diff': '+5.5',
            'Away Rating': 112.4,
          }}
        />
      </div>
    </section>
  );
};

export default TeamFormAnalysis;
