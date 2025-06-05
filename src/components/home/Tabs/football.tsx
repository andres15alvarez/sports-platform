'use client';
import React from 'react';
import { Table } from '../table';

import useFootballOdds, {
  FootballOdd,
} from '@/src/hooks/football/useFootballOdds';
import { OddValue } from '@/src/hooks/basketball/useOdds';

interface MatchData {
  match: string;
  date: string;
  probability: string;
  prediction: string;
  result: string;
  odds: string;
  greenOddsIndex?: number;
  leagueLogo: string;
  leagueName: string;
  [key: string]: string | number | undefined;
}

interface TableColumn {
  key: string;
  label: string;
}

const desktopCol: TableColumn[] = [
  { key: 'match', label: 'Match' },
  { key: 'date', label: 'Date' },
  { key: 'probability', label: 'Prob. %' },
  { key: 'prediction', label: 'Prediction' },
  { key: 'result', label: 'Result' },
  { key: 'odds', label: 'Odds' },
];

const mobileCol: TableColumn[] = [
  { key: 'match', label: 'Match' },
  { key: 'prediction', label: 'Pred' },
  { key: 'odds', label: 'Odds' },
];

const FootballTab: React.FC = () => {
  const { odds: footballOdds } = useFootballOdds({
    league: '71',
    season: '2025',
  });

  const footballLeagueData: MatchData[] =
    footballOdds?.map((item: FootballOdd) => {
      const fixture = item.fixture;
      const league = item.league || {};

      const homeTeam = item.teams?.home?.name ?? 'Team A';
      const awayTeam = item.teams?.away?.name ?? 'Team B';

      const date = new Date(fixture.date).toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

      const result = '-';

      const bookmaker =
        item.bookmakers?.find((b) => b.name === 'Bwin') || item.bookmakers?.[0];
      const matchWinnerBet = bookmaker?.bets?.find(
        (b) => b.name === 'Match Winner',
      );
      const matchWinnerValues = matchWinnerBet?.values ?? [];

      let prediction = '?';
      let probability = '?';
      let greenOddsIndex: number | undefined = undefined;

      if (matchWinnerValues.length) {
        const oddsWithIndex = matchWinnerValues.map(
          (v: OddValue, i: number) => ({ ...v, index: i }),
        );
        const best = oddsWithIndex.reduce(
          (
            min: { odd: string; index: number; value: string },
            curr: { odd: string; index: number; value: string },
          ) => (parseFloat(curr.odd) < parseFloat(min.odd) ? curr : min),
        );

        prediction =
          best.value === 'Home' ? '1' : best.value === 'Away' ? '2' : 'X';
        probability = (100 / parseFloat(best.odd)).toFixed(0) + '%';
        greenOddsIndex = best.index;
      }

      const oddsString = matchWinnerValues.map((v) => v.odd).join(' ');

      return {
        match: `${homeTeam} - ${awayTeam}`,
        date,
        prediction,
        probability,
        result,
        odds: oddsString,
        greenOddsIndex,
        leagueLogo: league.logo ?? '',
        leagueName: league.name ?? '',
      };
    }) ?? [];

  const seriesAMobile: MatchData[] = [
    {
      match: 'Inter - Milan',
      date: '04/27 20:45',
      probability: '42%  28%  30%',
      prediction: '1',
      result: '2-1',
      odds: '1.85',
      greenOddsIndex: 0,
      leagueLogo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Serie_A_logo_2022.svg/261px-Serie_A_logo_2022.svg.png',
      leagueName: 'Serie A',
    },
    {
      match: 'Juve - Roma',
      date: '04/27 15:00',
      probability: '44%  30%  26%',
      prediction: '1',
      result: '2-0',
      odds: '1.95',
      greenOddsIndex: 0,
      leagueLogo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Serie_A_logo_2022.svg/261px-Serie_A_logo_2022.svg.png',
      leagueName: 'Serie A',
    },
  ];

  return (
    <>
      <div className="bg-gray-50 rounded-lg p-2 mb-4 overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-2">
          <a className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium lg:inline-block hidden">
            1X2 Predictions
          </a>
          <a className="bg-green-600 text-white lg:hidden px-3 py-1 rounded-md text-xs font-medium inline-block">
            1X2
          </a>
          <a className="bg-white hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 inline-block">
            Under/Over 2.5
          </a>
          <a className="bg-white hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 hidden lg:inline-block">
            Both Teams to Score
          </a>
          <a className="bg-white hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 lg:hidden inline-block">
            BTTS
          </a>
          <a className="bg-white hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 inline-block">
            Double Chance
          </a>
          <a className="bg-white hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 hidden lg:inline-block">
            Handicap
          </a>
        </div>
      </div>

      <div className="mb-6 hidden lg:block">
        <Table
          title={'Campeonato Brasileño de Serie A'}
          bookmakerOdds={footballLeagueData}
          columns={desktopCol}
        />
      </div>

      <div className="mb-6 lg:hidden">
        <Table
          title={'Serie A'}
          bookmakerOdds={seriesAMobile}
          columns={mobileCol}
        />
      </div>

      <div className="text-center mt-4">
        <a
          href="/football-prediction"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
        >
          View all football predictions
        </a>
      </div>
    </>
  );
};

export default FootballTab;
