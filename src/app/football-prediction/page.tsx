'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Tipo para el odd como viene de la API
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

// Tipo para la información de equipos
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

// Tipo combinado
interface OddWithTeams extends OddResponse {
  teams?: TeamsInfo;
}

const Page: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = useState(71); // Serie A Brazil
  const [selectedSeason, setSelectedSeason] = useState(2025);
  const [odds, setOdds] = useState<OddWithTeams[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBet, setSelectedBet] = useState('Match Winner');

  const leagues = [
    { id: 71, name: 'Série A', country: 'Brazil' },
    { id: 39, name: 'Premier League', country: 'England' },
    { id: 140, name: 'La Liga', country: 'Spain' },
    { id: 78, name: 'Bundesliga', country: 'Germany' },
    { id: 135, name: 'Serie A', country: 'Italy' },
    { id: 61, name: 'Ligue 1', country: 'France' },
  ];

  const betTypes = [
    'Match Winner',
    'Both Teams Score',
    'Goals Over/Under',
    'Double Chance',
  ];

  const bookmakerLogos: { [key: string]: string } = {
    Bet365: 'https://www.bet365.com/favicon.ico',
    'William Hill': 'https://www.williamhill.com/favicon.ico',
    Betfair: 'https://www.betfair.com/favicon.ico',
    '1xBet': 'https://1xbet.com/favicon.ico',
    Betway: 'https://www.betway.com/favicon.ico',
  };

  useEffect(() => {
    fetchOddsWithTeams();
  }, [selectedLeague, selectedSeason]);

  const fetchOddsWithTeams = async () => {
    setLoading(true);
    setError(null);

    try {
      // Obtener los odds
      const oddsResponse = await fetch(
        `https://v3.football.api-sports.io/odds?league=${selectedLeague}&season=${selectedSeason}`,
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

      const fixtureIds = [...new Set(oddsResults.map((odd) => odd.fixture.id))];

      // Obtener información de equipos para cada fixture (en lotes)
      const batchSize = 10;
      const teamsMap = new Map<number, TeamsInfo>();

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

      // Combinar odds con información de equipos
      const oddsWithTeams: OddWithTeams[] = oddsResults.map((odd) => ({
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
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getBookmakerLogo = (name: string) => {
    return (
      bookmakerLogos[name] ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=166534&color=fff&size=32`
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading odds and team information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Football Betting Odds
        </h1>

        {/* Controls */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select League
              </label>
              <select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600"
              >
                {leagues.map((league) => (
                  <option key={league.id} value={league.id}>
                    {league.name} - {league.country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Season
              </label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600"
              >
                <option value={2025}>2024/2025</option>
                <option value={2024}>2023/2024</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bet Type
              </label>
              <select
                value={selectedBet}
                onChange={(e) => setSelectedBet(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600"
              >
                {betTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Odds Display */}
        <div className="space-y-6">
          {odds.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
              No odds available for this league/season
            </div>
          ) : (
            odds.map((odd) => {
              const filteredBookmakers = odd.bookmakers.filter((b) =>
                b.bets.some((bet) => bet.name === selectedBet),
              );

              if (filteredBookmakers.length === 0) return null;

              return (
                <div
                  key={odd.fixture.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Match Header */}
                  <div className="bg-green-800 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {odd.teams ? (
                          <>
                            <div className="flex items-center space-x-2">
                              <div className="relative w-8 h-8 bg-white rounded-full p-1">
                                <Image
                                  src={odd.teams.home.logo}
                                  alt={odd.teams.home.name}
                                  fill
                                  className="object-contain"
                                  unoptimized
                                />
                              </div>
                              <span className="font-medium">
                                {odd.teams.home.name}
                              </span>
                            </div>
                            <span className="text-green-200">vs</span>
                            <div className="flex items-center space-x-2">
                              <div className="relative w-8 h-8 bg-white rounded-full p-1">
                                <Image
                                  src={odd.teams.away.logo}
                                  alt={odd.teams.away.name}
                                  fill
                                  className="object-contain"
                                  unoptimized
                                />
                              </div>
                              <span className="font-medium">
                                {odd.teams.away.name}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                            <span className="text-sm">
                              Fixture #{odd.fixture.id}
                            </span>
                            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-200">
                          {formatDate(odd.fixture.date)}
                        </div>
                        <div className="text-xs text-green-300">
                          {odd.league.name}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bookmakers */}
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 text-sm text-gray-600">
                              Bookmaker
                            </th>
                            {filteredBookmakers[0]?.bets
                              .find((bet) => bet.name === selectedBet)
                              ?.values.map((value, idx) => (
                                <th
                                  key={idx}
                                  className="text-center py-2 px-4 text-sm text-gray-600"
                                >
                                  {value.value}
                                </th>
                              ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBookmakers.map((bookmaker, idx) => {
                            const bet = bookmaker.bets.find(
                              (b) => b.name === selectedBet,
                            );
                            if (!bet) return null;

                            // Encontrar las mejores cuotas para cada columna
                            const bestOdds = bet.values.map((_, valueIndex) => {
                              const odds = filteredBookmakers
                                .map((b) => {
                                  const betData = b.bets.find(
                                    (bet) => bet.name === selectedBet,
                                  );
                                  return betData
                                    ? parseFloat(
                                        betData.values[valueIndex]?.odd || '0',
                                      )
                                    : 0;
                                })
                                .filter((odd) => odd > 0);
                              return Math.max(...odds);
                            });

                            return (
                              <tr
                                key={idx}
                                className="border-b hover:bg-green-50 transition-colors"
                              >
                                <td className="py-3">
                                  <div className="flex items-center space-x-2">
                                    <div className="relative w-6 h-6">
                                      <Image
                                        src={getBookmakerLogo(bookmaker.name)}
                                        alt={bookmaker.name}
                                        fill
                                        className="object-contain rounded"
                                        unoptimized
                                        onError={(e) => {
                                          const img =
                                            e.target as HTMLImageElement;
                                          img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(bookmaker.name)}&background=166534&color=fff&size=32`;
                                        }}
                                      />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                      {bookmaker.name}
                                    </span>
                                  </div>
                                </td>
                                {bet.values.map((value, vIdx) => {
                                  const currentOdd = parseFloat(value.odd);
                                  const isBestOdd =
                                    currentOdd === bestOdds[vIdx];

                                  return (
                                    <td
                                      key={vIdx}
                                      className="text-center py-3 px-4"
                                    >
                                      <button
                                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                                          isBestOdd
                                            ? 'bg-green-100 text-green-700 font-bold hover:bg-green-200'
                                            : 'bg-gray-100 hover:bg-green-600 hover:text-white'
                                        }`}
                                      >
                                        {value.odd}
                                      </button>
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Nota sobre los equipos */}
                    {!odd.teams && (
                      <p className="text-xs text-gray-500 mt-2 italic">
                        Team information not available for this fixture
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
