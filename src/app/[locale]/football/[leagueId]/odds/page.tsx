'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

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
  const params = useParams<{ leagueId: string }>();
  const leagueId = params?.leagueId || 71;
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

  useEffect(() => {
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
        if (oddsResults.length > 0) {
          setLeagueInfo(oddsResults[0].league);
        }
        const sortedOdds = oddsResults.sort(
          (a, b) => a.fixture.timestamp - b.fixture.timestamp,
        );
        const fixtureIds = [
          ...new Set(sortedOdds.map((odd) => odd.fixture.id)),
        ];
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
            } catch {
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
        const oddsWithTeams: OddWithTeams[] = sortedOdds.map((odd) => ({
          ...odd,
          teams: teamsMap.get(odd.fixture.id),
        }));
        setOdds(oddsWithTeams);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchLeagueOdds();
  }, [leagueId, season]);

  const getBookmakerLogo = (name: string) => {
    const bookmakerLogos: { [key: string]: string } = {
      Bet365: 'https://www.bet365.com/favicon.ico',
      'William Hill': 'https://www.williamhill.com/favicon.ico',
      Betfair: 'https://www.betfair.com/favicon.ico',
      '1xBet': 'https://1xbet.com/favicon.ico',
      Betway: 'https://www.betway.com/favicon.ico',
    };
    return (
      bookmakerLogos[name] ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=166534&color=fff&size=32`
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
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
        {/* Tabs de tipo de apuesta */}
        <div className="flex flex-wrap gap-2 mb-6">
          {betTypes.map((type) => (
            <button
              key={type.value}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors
                ${selectedBetType === type.value ? 'bg-green-600 text-white' : 'bg-white text-green-900 border-green-200 hover:bg-green-50'}`}
              onClick={() => setSelectedBetType(type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>
        {/* Para cada partido, renderiza la tabla estilo bookmarkers */}
        <div className="space-y-10">
          {odds.map((odd) => {
            const filteredBookmakers = odd.bookmakers.filter((b) =>
              b.bets.some((bet) => bet.name === selectedBetType),
            );
            if (filteredBookmakers.length === 0) return null;
            // Obtener los nombres de columnas dinámicamente
            const bet = filteredBookmakers[0].bets.find(
              (b) => b.name === selectedBetType,
            );
            const columns = bet ? bet.values.map((v) => v.value) : [];
            // Calcular la mejor cuota por columna
            const minOddsPerColumn: number[] = [];
            if (filteredBookmakers.length > 0 && bet) {
              const betsArrays = filteredBookmakers.map((bookmaker) => {
                const betData = bookmaker.bets.find(
                  (b) => b.name === selectedBetType,
                );
                return betData
                  ? betData.values.map((v) => parseFloat(v.odd))
                  : [];
              });
              const numColumns = betsArrays[0]?.length || 0;
              for (let i = 0; i < numColumns; i++) {
                let min = Infinity;
                for (let j = 0; j < betsArrays.length; j++) {
                  if (
                    betsArrays[j][i] !== undefined &&
                    betsArrays[j][i] < min
                  ) {
                    min = betsArrays[j][i];
                  }
                }
                minOddsPerColumn[i] = min;
              }
            }
            return (
              <div
                key={odd.fixture.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden mb-8"
              >
                {/* Header del partido */}
                <div className="flex items-center justify-between bg-white px-4 py-8 border-b border-green-200">
                  <div className="flex items-center gap-3">
                    {odd.teams && (
                      <>
                        <div className="flex items-center gap-2">
                          <Image
                            src={odd.teams.home.logo}
                            alt={odd.teams.home.name}
                            width={32}
                            height={32}
                            className="object-contain"
                            unoptimized
                          />
                          <span className="font-semibold text-green-900">
                            {odd.teams.home.name}
                          </span>
                        </div>
                        <span className="text-green-700 font-bold">vs</span>
                        <div className="flex items-center gap-2">
                          <Image
                            src={odd.teams.away.logo}
                            alt={odd.teams.away.name}
                            width={32}
                            height={32}
                            className="object-contain"
                            unoptimized
                          />
                          <span className="font-semibold text-green-900">
                            {odd.teams.away.name}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-green-900 font-medium">
                      {formatDate(odd.fixture.date)}
                    </div>
                    <div className="text-xs text-green-700">
                      {odd.league.name}
                    </div>
                  </div>
                </div>
                {/* Tabla de odds estilo bookmarkers */}
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-gray-50">
                    <thead>
                      <tr className="text-sm text-black bg-green-50 border-b-2 border-green-600 text-left">
                        <th className="py-2 px-3 text-sm">Bookmaker</th>
                        {columns.map((col, idx) => (
                          <th
                            key={idx}
                            className="py-2 px-3 text-sm text-center"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {filteredBookmakers.map((bookmaker, idx) => {
                        const bet = bookmaker.bets.find(
                          (b) => b.name === selectedBetType,
                        );
                        if (!bet) return null;
                        return (
                          <tr
                            key={idx}
                            className="border-b border-gray-200 hover:bg-green-50"
                          >
                            <td className="py-2 px-3 text-sm">
                              <div className="flex items-center space-x-2">
                                <div className="relative w-6 h-6">
                                  <Image
                                    src={getBookmakerLogo(bookmaker.name)}
                                    alt={bookmaker.name}
                                    fill
                                    className="object-contain rounded"
                                    unoptimized
                                    onError={(e) => {
                                      const img = e.target as HTMLImageElement;
                                      img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(bookmaker.name)}&background=166534&color=fff&size=32`;
                                    }}
                                  />
                                </div>
                                <span className="font-medium text-gray-900">
                                  {bookmaker.name}
                                </span>
                              </div>
                            </td>
                            {bet.values.map((value, vIdx) => {
                              const oddValue = parseFloat(value.odd);
                              const isBest =
                                oddValue === minOddsPerColumn[vIdx];
                              return (
                                <td
                                  key={vIdx}
                                  className="py-2 px-3 text-sm text-center text-gray-600"
                                >
                                  <span
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                      isBest
                                        ? 'bg-green-100 text-green-700 font-bold hover:bg-green-200'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                    }`}
                                  >
                                    {value.odd}
                                  </span>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
