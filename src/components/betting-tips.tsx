import React, { ReactNode } from 'react';

interface BettingMarketOption {
  name: string;
  odds: string;
  bgColor: string;
}

interface BettingMarket {
  name: string;
  options: BettingMarketOption[];
}

interface ValueBet {
  name: string;
  odds: string;
  description: string;
}

interface BookmakerOdd {
  bookmaker: string;
  [key: string]: string;
}

interface Column {
  key: string;
  label: string;
}

interface BettingTrend {
  name: string;
  trends: string[];
}

interface BettingTipsSectionProps {
  bettingMarkets: BettingMarket[];
  valueBets: ValueBet[];
  bookmakerOdds: BookmakerOdd[];
  bettingTrends: BettingTrend[];
  columns: Column[];
  expertPickChart: ReactNode;
}

const BettingTipsSection: React.FC<BettingTipsSectionProps> = ({
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
            {bettingMarkets.map((market, index) => (
              <BettingMarket key={index} market={market} />
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-3">
            Value Bets & Special Markets
          </h3>
          <div className="space-y-3">
            {valueBets.map((bet, index) => (
              <ValueBet key={index} bet={bet} />
            ))}
          </div>

          <Table bookmakerOdds={bookmakerOdds} columns={columns} />
        </div>
      </div>

      <BettingTrends bettingTrends={bettingTrends} />

      {/* Experts' Picks Chart */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <h4 className="font-semibold mb-2">Experts Picks</h4>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="h-[200px] lg:h-[400px] w-full">{expertPickChart}</div>
        </div>
      </div>
    </section>
  );
};

interface BettingMarketProps {
  market: BettingMarket;
}

const BettingMarket: React.FC<BettingMarketProps> = ({ market }) => {
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{market.name}</span>
      </div>
      <div
        className={`grid ${market.options.length > 2 ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}
      >
        {market.options.map((option, index) => (
          <div
            key={index}
            className={`bg-${option.bgColor} p-2 rounded text-center`}
          >
            <div className="text-sm font-medium mb-1">{option.name}</div>
            <div className="text-lg font-bold text-green-700">
              {option.odds}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ValueBetProps {
  bet: ValueBet;
}

const ValueBet: React.FC<ValueBetProps> = ({ bet }) => {
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <div className="flex justify-between items-center">
        <span className="font-medium text-green-700">{bet.name}</span>
        <span className="text-lg font-bold text-green-700">{bet.odds}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{bet.description}</p>
    </div>
  );
};

interface TableProps {
  bookmakerOdds: BookmakerOdd[];
  columns: Column[];
}

export const Table: React.FC<TableProps> = ({ bookmakerOdds, columns }) => {
  return (
    <div className="mt-4 pt-3 border-t border-gray-200">
      <h4 className="font-semibold mb-2">Bookmaker Odds Comparison</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-green-600 text-white text-left">
              <th className="py-2 px-3 text-sm">Bookmaker</th>
              {columns.map((col, index) => (
                <th key={index} className="py-2 px-3 text-sm text-center">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            {bookmakerOdds.map((odds, index) => (
              <tr key={index} className={index % 2 === 0 ? '' : 'bg-green-50'}>
                <td className="py-2 px-3 font-medium">{odds.bookmaker}</td>
                {columns.map((col, i) => (
                  <td key={i} className="py-2 px-3 text-center">
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
};

interface BettingTrendsProps {
  bettingTrends: BettingTrend[];
}

const BettingTrends: React.FC<BettingTrendsProps> = ({ bettingTrends }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-bold text-lg mb-3">Key Betting Trends</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bettingTrends.map((team, index) => (
          <div key={index}>
            <h4 className="font-semibold mb-2">{team.name} Betting Trends</h4>
            <ul className="list-disc pl-4 space-y-2 text-sm">
              {team.trends.map((trend, trendIndex) => (
                <li key={trendIndex}>{trend}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BettingTipsSection;
