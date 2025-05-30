import React, { ReactNode } from 'react';

interface MarketOption {
  name: string;
  odds: string;
  bgColor: string;
}

interface BettingMarket {
  name: string;
  options: MarketOption[];
}

interface ValueBet {
  name: string;
  odds: string;
  description: string;
}

interface BookmakerOdds {
  bookmaker: string;
  [key: string]: string;
}

interface Column {
  key: string;
  label: string;
}

interface TeamTrend {
  name: string;
  trends: string[];
}

interface Props {
  bettingMarkets: BettingMarket[];
  valueBets: ValueBet[];
  bookmakerOdds: BookmakerOdds[];
  bettingTrends: TeamTrend[];
  columns: Column[];
  expertPickChart: ReactNode;
}

const BettingTipsSection: React.FC<Props> = ({
  bettingMarkets,
  valueBets,
  bookmakerOdds,
  bettingTrends,
  columns,
  expertPickChart,
}) => {
  return (
    <section id="betting-tips" className="mb-8">
      <h2 className="text-xl font-bold text-green-800 border-b border-gray-200 pb-2 mb-4">
        Betting Tips & Odds Analysis
      </h2>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3">Popular Betting Markets</h3>
          <div className="space-y-3">
            {bettingMarkets.map((market, i) => (
              <BettingMarket key={i} market={market} />
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3">
            Value Bets & Special Markets
          </h3>
          <div className="space-y-3">
            {valueBets.map((bet, i) => (
              <ValueBet key={i} bet={bet} />
            ))}
          </div>

          <OddsTable bookmakerOdds={bookmakerOdds} columns={columns} />
        </div>
      </div>

      <BettingTrends bettingTrends={bettingTrends} />

      <div className="mt-4 pt-3 border-t border-gray-200">
        <h4 className="font-semibold mb-2">Experts Picks</h4>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="h-[200px] lg:h-[400px] w-full">{expertPickChart}</div>
        </div>
      </div>
    </section>
  );
};

const BettingMarket: React.FC<{ market: BettingMarket }> = ({ market }) => (
  <div className="bg-white p-3 rounded shadow-sm">
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium">{market.name}</span>
    </div>
    <div
      className={`grid ${market.options.length > 2 ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}
    >
      {market.options.map((option, i) => (
        <div key={i} className={`bg-${option.bgColor} p-2 rounded text-center`}>
          <div className="text-sm font-medium mb-1">{option.name}</div>
          <div className="text-lg font-bold text-green-700">{option.odds}</div>
        </div>
      ))}
    </div>
  </div>
);

const ValueBet: React.FC<{ bet: ValueBet }> = ({ bet }) => (
  <div className="bg-white p-3 rounded shadow-sm">
    <div className="flex justify-between items-center">
      <span className="font-medium text-green-700">{bet.name}</span>
      <span className="text-lg font-bold text-green-700">{bet.odds}</span>
    </div>
    <p className="text-sm text-gray-600 mt-1">{bet.description}</p>
  </div>
);

const OddsTable: React.FC<{
  bookmakerOdds: BookmakerOdds[];
  columns: Column[];
}> = ({ bookmakerOdds, columns }) => (
  <div className="mt-4 pt-3 border-t border-gray-200">
    <h4 className="font-semibold mb-2">Bookmaker Odds Comparison</h4>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-green-600 text-white text-left">
            <th className="py-2 px-3 text-sm">Bookmaker</th>
            {columns.map((col, i) => (
              <th key={i} className="py-2 px-3 text-sm text-center">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {bookmakerOdds.map((odds, i) => (
            <tr key={i} className={i % 2 === 0 ? '' : 'bg-green-50'}>
              <td className="py-2 px-3 font-medium">{odds.bookmaker}</td>
              {columns.map((col, j) => (
                <td key={j} className="py-2 px-3 text-center">
                  {odds[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const BettingTrends: React.FC<{ bettingTrends: TeamTrend[] }> = ({
  bettingTrends,
}) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-bold text-lg mb-3">Key Betting Trends</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bettingTrends.map((team, i) => (
        <div key={i}>
          <h4 className="font-semibold mb-2">{team.name} Betting Trends</h4>
          <ul className="list-disc pl-4 space-y-2 text-sm">
            {team.trends.map((trend, j) => (
              <li key={j}>{trend}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default BettingTipsSection;
