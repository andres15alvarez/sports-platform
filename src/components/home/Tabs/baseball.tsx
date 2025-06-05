'use client';
import React from 'react';
import { Table } from '../table';
import useBaseballOdds, {
  Odd,
  OddValue,
} from '@/src/hooks/baseball/useBaseballOdds';

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
}

const desktopCol = [
  { key: 'match', label: 'Match' },
  { key: 'date', label: 'Date' },
  { key: 'probability', label: 'Prob. %' },
  { key: 'prediction', label: 'Prediction' },
  { key: 'result', label: 'Result' },
  { key: 'odds', label: 'Odds' },
];

const mobileCol = [
  { key: 'match', label: 'Match' },
  { key: 'prediction', label: 'Pred' },
  { key: 'odds', label: 'Odds' },
];

const BaseballTab: React.FC = () => {
  const { odds } = useBaseballOdds({
    league: '1',
    season: '2025',
  });

  const parsedData: MatchData[] =
    odds
      ?.filter((item: Odd) => item.game.status?.short !== 'FT')
      .map((item: Odd) => {
        const homeName = item.game.teams?.home?.name;
        const awayName = item.game.teams?.away?.name;

        const homeScore = item.game.scores?.home?.total ?? '-';
        const awayScore = item.game.scores?.away?.total ?? '-';

        const status = item.game.status?.short;
        const result = status === 'FT' ? `${homeScore} - ${awayScore}` : '-';

        const date = new Date(item.game.date).toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });

        const firstBookmaker = item.bookmakers?.[0];
        const oddsValues = firstBookmaker?.bets?.[0]?.values ?? [];
        const oddsString = oddsValues.map((v) => v.odd).join(' ');

        let prediction = '?';
        let probability = '?';
        let greenOddsIndex: number | undefined = undefined;

        if (oddsValues.length) {
          const oddsWithIndex = oddsValues.map((v: OddValue, i: number) => ({
            ...v,
            index: i,
          }));
          const best = oddsWithIndex.reduce((min, curr) =>
            parseFloat(curr.odd) < parseFloat(min.odd) ? curr : min,
          );

          prediction =
            best.value === 'Home' ? '1' : best.value === 'Away' ? '2' : 'X';
          probability = (100 / parseFloat(best.odd)).toFixed(0) + '%';
          greenOddsIndex = best.index;
        }

        return {
          match: `${homeName} - ${awayName}`,
          date,
          prediction,
          probability,
          result,
          odds: oddsString,
          greenOddsIndex,
          leagueLogo: item.game.league?.logo,
          leagueName: item.game.league?.name,
        };
      }) ?? [];

  const adaptedData = parsedData.map((item) => ({
    match: item.match,
    leagueLogo: item.leagueLogo,
    leagueName: item.leagueName,
    odds: item.odds,
    greenOddsIndex: item.greenOddsIndex,
    probability: item.probability,
    prediction: item.prediction,
    date: item.date,
    result: item.result,
  }));

  return (
    <>
      <div className="bg-gray-50 rounded-lg p-2 mb-4 overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-2">
          <a className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-medium lg:inline-block">
            Match Winner
          </a>
          <a className="bg-white hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200">
            Point Spread
          </a>
          <a className="bg-white hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 lg:inline-block">
            Over/Under
          </a>
          <a className="bg-white hidden lg:inline-block hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200">
            Team Totals
          </a>
        </div>
      </div>

      <div className="mb-6 hidden lg:block">
        <Table title={'MLB'} bookmakerOdds={adaptedData} columns={desktopCol} />
      </div>

      <div className="mb-6 lg:hidden">
        <Table title={'MLB'} bookmakerOdds={adaptedData} columns={mobileCol} />
      </div>

      <div className="text-center mt-4">
        <a
          href="/baseball-predictions"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
        >
          View all baseball predictions
        </a>
      </div>
    </>
  );
};

export default BaseballTab;
