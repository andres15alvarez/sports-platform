'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Tipos
interface OddResponse {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
  };
  fixture: {
    id: number;
    timezone: string;
    date: string;
    timestamp: number;
  };
  update: string;
  bookmakers: {
    id: number;
    name: string;
    bets: {
      id: number;
      name: string;
      values: {
        value: string;
        odd: string;
      }[];
    }[];
  }[];
}

interface TeamsInfo {
  home: {
    id: number;
    name: string;
    logo: string;
  };
  away: {
    id: number;
    name: string;
    logo: string;
  };
}

interface OddWithTeams extends OddResponse {
  teams?: TeamsInfo;
}

interface TableColumn {
  key: string;
  label: string;
}

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

interface LeagueInfo {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

const Page: React.FC = () => {
  const [selectedBetType, setSelectedBetType] = useState('Match Winner');
  const [odds, setOdds] = useState<OddWithTeams[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leagueInfo, setLeagueInfo] = useState<LeagueInfo | null>(null);

  const leagueId = 71; // Brazil Serie A
  const season = 2025;

  const betTypes = [
    { value: 'Match Winner', label: '1X2 Predictions', shortLabel: '1X2' },
    {
      value: 'Goals Over/Under',
      label: 'Under/Over 2.5',
      shortLabel: 'U/O 2.5',
    },
    {
      value: 'Both Teams Score',
      label: 'Both Teams to Score',
      shortLabel: 'BTTS',
    },
    {
      value: 'Double Chance',
      label: 'Double Chance',
      shortLabel: 'Double Chance',
    },
    { value: 'Asian Handicap', label: 'Handicap', shortLabel: 'Handicap' },
  ];

  const desktopColumns: TableColumn[] = [
    { key: 'match', label: 'Match' },
    { key: 'date', label: 'Date' },
    { key: 'probability', label: 'Prob. %' },
    { key: 'prediction', label: 'Prediction' },
    { key: 'result', label: 'Result' },
    { key: 'odds', label: 'Odds' },
  ];

  const mobileColumns: TableColumn[] = [
    { key: 'match', label: 'Match' },
    { key: 'prediction', label: 'Pred' },
    { key: 'odds', label: 'Odds' },
  ];

  useEffect(() => {
    fetchLeagueOdds();
  }, []);

  const fetchLeagueOdds = async () => {
    setLoading(true);
    setError(null);

    try {
      const oddsResponse = await fetch(
        `https://v3.football.api-sports.io/odds?league=${leagueId}&season=${season}`,
        {
          headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEYY || '',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      );

      if (!oddsResponse.ok) throw new Error('Failed to fetch odds');

      const oddsData = await oddsResponse.json();

      if (!oddsData.response || oddsData.response.length === 0) {
        setOdds([]);
        setLoading(false);
        return;
      }

      const oddsResults: OddResponse[] = oddsData.response;

      const filteredOddsResults = oddsResults.filter(
        (odd) => odd.league.id === leagueId,
      );

      if (filteredOddsResults.length > 0) {
        setLeagueInfo(filteredOddsResults[0].league);
      }

      const sortedOdds = filteredOddsResults.sort(
        (a, b) => a.fixture.timestamp - b.fixture.timestamp,
      );

      const fixtureIds = [...new Set(sortedOdds.map((odd) => odd.fixture.id))];
      const teamsMap = new Map<number, TeamsInfo>();

      const batchSize = 10;
      for (let i = 0; i < fixtureIds.length; i += batchSize) {
        const batch = fixtureIds.slice(i, i + batchSize);

        const batchPromises = batch.map(async (fixtureId) => {
          try {
            const response = await fetch(
              `https://v3.football.api-sports.io/fixtures?id=${fixtureId}`,
              {
                headers: {
                  'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEYY || '',
                  'x-rapidapi-host': 'v3.football.api-sports.io',
                },
              },
            );

            if (!response.ok) return null;

            const data = await response.json();
            if (data.response && data.response[0]) {
              return {
                fixtureId,
                teams: data.response[0].teams,
              };
            }
            return null;
          } catch (err) {
            console.error(`Error fetching fixture ${fixtureId}:`, err);
            return null;
          }
        });

        const results = await Promise.all(batchPromises);

        results.forEach((result) => {
          if (result) {
            teamsMap.set(result.fixtureId, result.teams);
          }
        });

        if (i + batchSize < fixtureIds.length) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }

      // Combine odds with team information
      const oddsWithTeams: OddWithTeams[] = sortedOdds.map((odd) => ({
        ...odd,
        teams: teamsMap.get(odd.fixture.id),
      }));

      setOdds(oddsWithTeams);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const processOddsData = (): MatchData[] => {
    return odds.map((item) => {
      const fixture = item.fixture;
      const league = item.league || {};

      const homeTeam = item.teams?.home?.name ?? 'Team A';
      const awayTeam = item.teams?.away?.name ?? 'Team B';

      const date = formatDate(fixture.date);
      const result = '-';

      const bookmaker =
        item.bookmakers?.find((b) => b.name === 'Bet365') ||
        item.bookmakers?.find((b) => b.name === 'Bwin') ||
        item.bookmakers?.[0];

      const selectedBet = bookmaker?.bets?.find(
        (b) => b.name === selectedBetType,
      );
      const betValues = selectedBet?.values ?? [];

      let prediction = '?';
      let probability = '?';
      let greenOddsIndex: number | undefined = undefined;

      if (selectedBetType === 'Match Winner' && betValues.length) {
        const oddsWithIndex = betValues.map((v, i) => ({ ...v, index: i }));
        const best = oddsWithIndex.reduce((min, curr) =>
          parseFloat(curr.odd) < parseFloat(min.odd) ? curr : min,
        );

        prediction =
          best.value === 'Home' ? '1' : best.value === 'Away' ? '2' : 'X';
        probability = (100 / parseFloat(best.odd)).toFixed(0) + '%';
        greenOddsIndex = best.index;
      } else if (selectedBetType === 'Both Teams Score' && betValues.length) {
        const yesOdd = betValues.find((v) => v.value === 'Yes');
        const noOdd = betValues.find((v) => v.value === 'No');

        if (yesOdd && noOdd) {
          const yesProb = 100 / parseFloat(yesOdd.odd);
          const noProb = 100 / parseFloat(noOdd.odd);

          prediction = yesProb > noProb ? 'Yes' : 'No';
          probability = Math.max(yesProb, noProb).toFixed(0) + '%';
          greenOddsIndex = yesProb > noProb ? 0 : 1;
        }
      } else if (selectedBetType === 'Goals Over/Under' && betValues.length) {
        const over = betValues.find((v) => v.value.includes('Over'));
        const under = betValues.find((v) => v.value.includes('Under'));

        if (over && under) {
          const overProb = 100 / parseFloat(over.odd);
          const underProb = 100 / parseFloat(under.odd);

          prediction = overProb > underProb ? 'Over 2.5' : 'Under 2.5';
          probability = Math.max(overProb, underProb).toFixed(0) + '%';
          greenOddsIndex = overProb > underProb ? 0 : 1;
        }
      }

      const oddsString = betValues.map((v) => v.odd).join(' ');

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
    });
  };

  const Table: React.FC<{ columns: TableColumn[]; data: MatchData[] }> = ({
    columns,
    data,
  }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-sm text-black bg-green-50 border-b-2 border-green-600 text-left">
              {columns.map((col, index) => (
                <th key={index} className="py-2 px-3 text-sm">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-green-50"
              >
                {columns.map((col, i) => (
                  <td key={i} className="py-2 px-3 text-center">
                    {col.key === 'match' ? (
                      <div className="flex items-center">
                        <Image
                          src={row.leagueLogo}
                          alt={row.leagueName}
                          width={20}
                          height={20}
                          className="w-5 h-5 mr-2"
                          unoptimized
                        />
                        <span className="hover:text-green-600 text-[11px] whitespace-nowrap lg:whitespace-normal">
                          {row.match}
                        </span>
                        <span className="lg:inline-block text-xs hidden bg-gray-300 text-gray-700 px-1 rounded ml-2">
                          {row.leagueName}
                        </span>
                      </div>
                    ) : col.key === 'odds' ? (
                      <div className="flex justify-center gap-2">
                        {row.odds
                          .split(' ')
                          .filter(Boolean)
                          .map((val: string, idx: number) => {
                            const textColor =
                              idx === row.greenOddsIndex
                                ? 'text-green-600 font-semibold'
                                : '';
                            return (
                              <span
                                key={idx}
                                className={`${textColor} font-medium`}
                              >
                                {val}
                              </span>
                            );
                          })}
                      </div>
                    ) : col.key === 'prediction' ? (
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold
                          ${['1', 'Yes', 'Over 2.5'].includes(row.prediction) ? 'bg-green-100 text-green-800' : ''} 
                          ${row.prediction === 'X' ? 'bg-yellow-100 text-yellow-800' : ''} 
                          ${['2', 'No', 'Under 2.5'].includes(row.prediction) ? 'bg-red-100 text-red-800' : ''}`}
                      >
                        {row.prediction}
                      </span>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading league details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  const tableData = processOddsData();

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* League Header */}
        {leagueInfo && (
          <div className="mb-4 bg-green-50 rounded-xl px-4 py-3 ">
            <div className="flex items-center gap-x-3">
              <Image
                src={leagueInfo.logo}
                alt={leagueInfo.name}
                width={48}
                height={48}
                className="object-contain"
                unoptimized
              />
              <div>
                <h1 className="text-xl font-semibold text-black">
                  {leagueInfo.name}
                </h1>
                <p className="text-sm text-gray-600">
                  Season {leagueInfo.season}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bet Type Selector */}
        <div className="bg-gray-50 rounded-lg p-2 mb-4 overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-2">
            {betTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedBetType(type.value)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors
                  ${
                    selectedBetType === type.value
                      ? 'bg-green-600 text-white'
                      : 'bg-white hover:bg-green-50 text-gray-700 border border-gray-200'
                  }`}
              >
                <span className="hidden lg:inline">{type.label}</span>
                <span className="lg:hidden">{type.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Matches Table */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-base lg:text-lg font-semibold mb-4">
            {leagueInfo?.name || 'Campeonato Brasileiro Série A'} -{' '}
            {selectedBetType}
          </h3>

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <Table columns={desktopColumns} data={tableData} />
          </div>

          {/* Mobile Table */}
          <div className="lg:hidden">
            <Table columns={mobileColumns} data={tableData} />
          </div>

          {odds.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No matches available for this league
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
