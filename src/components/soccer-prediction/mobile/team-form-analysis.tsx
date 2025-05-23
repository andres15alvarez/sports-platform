import BarcelonaHomeResultsChart from '../../charts/mobile/barcelona-home-form';
import RealMadridAwayResultsChart from '../../charts/mobile/real-madrid';
import SeasonProgressionChart from '../../charts/mobile/season-performance';
import TeamFormCard from '../../team-form';
import TeamStatsCard from '../../team-stats';
import React from 'react';

const TeamFormAnalysis: React.FC = () => {
  return (
    <section id="team-form" className="mb-8">
      <h2 className="text-xl font-bold text-green-800 border-b border-gray-200 pb-2 mb-4">
        Team Form Analysis
      </h2>

      {/* Form Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TeamFormCard
          teamName="Barcelona FC"
          form={['W', 'W', 'W', 'D', 'W']}
          summary="Barcelona is in exceptional form, having won 4 of their last 5 matches, scoring 14 goals and conceding just 3 during this period."
          recentMatches={[
            {
              match: 'Barcelona 3-0 Valencia',
              date: 'Apr 28, 2025',
              result: 'W',
            },
            {
              match: 'Athletic Bilbao 1-3 Barcelona',
              date: 'Apr 21, 2025',
              result: 'W',
            },
            {
              match: 'Barcelona 4-1 Sevilla',
              date: 'Apr 14, 2025',
              result: 'W',
            },
            {
              match: 'Villarreal 2-2 Barcelona',
              date: 'Apr 7, 2025',
              result: 'D',
            },
            {
              match: 'Barcelona 2-0 Espanyol',
              date: 'Mar 31, 2025',
              result: 'W',
            },
          ]}
          goalsScored={14}
          goalsConceded={3}
          cleanSheets={2}
        />

        <TeamFormCard
          teamName="Real Madrid"
          form={['W', 'D', 'W', 'L', 'W']}
          summary="Real Madrid has been slightly less consistent with 3 wins, 1 draw, and 1 loss in their last 5 matches, scoring 11 goals and conceding 6."
          recentMatches={[
            {
              match: 'Real Madrid 2-0 Real Betis',
              date: 'Apr 27, 2025',
              result: 'W',
            },
            {
              match: 'Atletico Madrid 1-1 Real Madrid',
              date: 'Apr 20, 2025',
              result: 'D',
            },
            {
              match: 'Real Madrid 3-1 Celta Vigo',
              date: 'Apr 13, 2025',
              result: 'W',
            },
            {
              match: 'Real Sociedad 2-1 Real Madrid',
              date: 'Apr 6, 2025',
              result: 'L',
            },
            {
              match: 'Real Madrid 4-2 Osasuna',
              date: 'Mar 30, 2025',
              result: 'W',
            },
          ]}
          goalsScored={11}
          goalsConceded={6}
          cleanSheets={1}
        />
      </div>

      {/* Season Comparison Chart */}
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

      {/* Home & Away Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamStatsCard
          title="Barcelona Home Form"
          chartId="barcelonaHomeChart"
          chart={<BarcelonaHomeResultsChart />}
          stats={{
            Played: 16,
            Won: 14,
            Drawn: 1,
            Lost: 1,
            'Goals For': 43,
            'Goals Against': 12,
            'Clean Sheets': 8,
            'Win Rate': '87.5%',
          }}
        />

        <TeamStatsCard
          title="Real Madrid Away Form"
          chartId="madridAwayChart"
          chart={<RealMadridAwayResultsChart />}
          stats={{
            Played: 16,
            Won: 11,
            Drawn: 3,
            Lost: 2,
            'Goals For': 37,
            'Goals Against': 19,
            'Clean Sheets': 4,
            'Win Rate': '68.75%',
          }}
        />
      </div>
    </section>
  );
};

export default TeamFormAnalysis;
