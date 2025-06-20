'use client';
import React from 'react';
import { Table } from '../table';
import useOdds, { Odd, OddValue } from '@/src/hooks/basketball/useOdds';
import Link from 'next/link';

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

const nbaMobile: MatchData[] = [
  {
    match: 'Lakers - Celtics',
    date: '04/27 02:30',
    probability: '48%  52%',
    prediction: '2',
    result: '98-105',
    odds: '1.75',
    greenOddsIndex: 0,
    leagueLogo:
      'https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg',
    leagueName: 'NBA',
  },
];

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

const BasketballTab: React.FC = () => {
  const { odds } = useOdds({ league: '12', season: '2024-2025' });

  const parsedData: MatchData[] =
    odds
      ?.filter(
        (item: Odd) =>
          item?.game?.teams?.home?.name && item?.game?.teams?.away?.name,
      )
      .map((item: Odd) => {
        const homeName = item.game.teams.home.name;
        const awayName = item.game.teams.away.name;
        const date = new Date(item.game.date).toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });

        const status = item.game.status.short;
        const homeScore = item.game.scores?.home?.total ?? '-';
        const awayScore = item.game.scores?.away?.total ?? '-';
        const result = status === 'FT' ? `${homeScore} - ${awayScore}` : '-';

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
          leagueLogo: item.league.logo,
          leagueName: item.league.name,
        };
      }) ?? [];

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
        <Table title={'NBA'} bookmakerOdds={parsedData} columns={desktopCol} />
      </div>

      <div className="mb-6 lg:hidden">
        <Table title={'NBA'} bookmakerOdds={nbaMobile} columns={mobileCol} />
      </div>

      <div className="text-center mt-4">
        <Link
          href="/basketball-predictions"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
        >
          View all basketball predictions
        </Link>
      </div>
    </>
  );
};

export default BasketballTab;
