'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

// Tipo para datos de liga
interface LeagueData {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  odds: OddWithTeams[];
  loading: boolean;
  error: string | null;
  expanded: boolean;
}

const Page: React.FC = () => {
  const [selectedBet, setSelectedBet] = useState('Match Winner');
  const [leaguesData, setLeaguesData] = useState<LeagueData[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  // Ligas actualmente activas (enero 2025)
  const activeLeagues = [
    { id: 71, name: 'Série A', country: 'Brazil' },
    { id: 240, name: 'Liga BetPlay', country: 'Colombia' },
    { id: 239, name: 'Primera División', country: 'Chile' },
    { id: 268, name: 'Primera División', country: 'Uruguay' },
    { id: 281, name: 'Liga 1', country: 'Peru' },
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
    initializeLeaguesData();
  }, []);

  const initializeLeaguesData = async () => {
    setInitialLoading(true);

    // Inicializar estructura de datos para cada liga
    const initialData: LeagueData[] = activeLeagues.map((league) => ({
      ...league,
      logo: '',
      flag: '',
      odds: [],
      loading: true,
      error: null,
      expanded: false,
    }));

    setLeaguesData(initialData);

    // Cargar datos de cada liga
    const promises = activeLeagues.map((league, index) =>
      fetchLeagueOdds(league.id, index),
    );

    await Promise.all(promises);
    setInitialLoading(false);
  };

  const fetchLeagueOdds = async (leagueId: number, index: number) => {
    try {
      // Obtener odds de la liga actual
      // Para ligas sudamericanas, usar temporada 2025
      const season = 2025;
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
        setLeaguesData((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            loading: false,
            error: 'No active games found',
          };
          return updated;
        });
        return;
      }

      const oddsResults: OddResponse[] = oddsData.response;

      // IMPORTANTE: Filtrar solo los partidos que pertenecen a la liga que estamos consultando
      const filteredOddsResults = oddsResults.filter(
        (odd) => odd.league.id === leagueId,
      );

      if (filteredOddsResults.length === 0) {
        setLeaguesData((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            loading: false,
            error: 'No active games found for this league',
          };
          return updated;
        });
        return;
      }

      // Ordenar por fecha y tomar solo los próximos 3 partidos
      const sortedOdds = filteredOddsResults
        .sort((a, b) => a.fixture.timestamp - b.fixture.timestamp)
        .slice(0, 3);

      // Obtener información de la liga del primer resultado
      const leagueInfo = sortedOdds[0]?.league || {};

      // Obtener información de equipos para los 3 partidos
      const fixtureIds = sortedOdds.map((odd) => odd.fixture.id);
      const teamsMap = new Map<number, TeamsInfo>();

      const teamsPromises = fixtureIds.map(async (fixtureId) => {
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

      const teamsResults = await Promise.all(teamsPromises);

      teamsResults.forEach((result) => {
        if (result) {
          teamsMap.set(result.fixtureId, result.teams);
        }
      });

      // Combinar odds con información de equipos
      const oddsWithTeams: OddWithTeams[] = sortedOdds.map((odd) => ({
        ...odd,
        teams: teamsMap.get(odd.fixture.id),
      }));

      setLeaguesData((prev) => {
        const updated = [...prev];
        updated[index] = {
          id: leagueId,
          name: leagueInfo.name || activeLeagues[index].name,
          country: leagueInfo.country || activeLeagues[index].country,
          logo: leagueInfo.logo || '',
          flag: leagueInfo.flag || '',
          odds: oddsWithTeams,
          loading: false,
          error: null,
          expanded: false,
        };
        return updated;
      });
    } catch (err) {
      console.error('Error:', err);
      setLeaguesData((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          loading: false,
          error: err instanceof Error ? err.message : 'Unknown error',
        };
        return updated;
      });
    }
  };

  {
    /*
  const toggleLeagueExpansion = (index: number) => {
    setLeaguesData(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        expanded: !updated[index].expanded,
      };
      return updated;
    });
  };*/
  }

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

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading active leagues...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
          Live Football Betting Odds
        </h1>

        {/* Bet Type Selector */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <div className="max-w-sm">
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

        {/* Leagues List - One below another */}
        <div className="space-y-6">
          {leaguesData.map((league) => (
            <div
              key={league.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* League Header */}
              <div className="bg-gradient-to-r from-green-700 to-green-900 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {league.logo && (
                      <div className="relative w-12 h-12 bg-white rounded-full p-1">
                        <Image
                          src={league.logo}
                          alt={league.name}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    )}
                    <div>
                      <h2 className="font-bold text-xl">{league.name}</h2>
                      <p className="text-sm text-green-200 flex items-center space-x-1">
                        {league.flag && (
                          <Image
                            src={league.flag}
                            alt={league.country}
                            width={20}
                            height={15}
                            className="inline-block"
                            unoptimized
                          />
                        )}
                        <span>{league.country}</span>
                      </p>
                    </div>
                  </div>
                  {league.odds.length > 0 && (
                    <Link href={`/football/${league.id}/odds`}>
                      <button className="bg-green-600 hover:bg-green-500 px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center space-x-1">
                        <span>View More</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </Link>
                  )}
                </div>
              </div>

              {/* League Content */}
              <div className="p-6">
                {league.loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  </div>
                ) : league.error ? (
                  <div className="text-center py-8 text-red-600">
                    {league.error}
                  </div>
                ) : league.odds.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No active matches found
                  </div>
                ) : (
                  <div>
                    {/* Matches Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {league.odds
                        .slice(0, league.expanded ? undefined : 3)
                        .map((odd) => {
                          const filteredBookmakers = odd.bookmakers.filter(
                            (b) =>
                              b.bets.some((bet) => bet.name === selectedBet),
                          );

                          if (filteredBookmakers.length === 0) return null;

                          return (
                            <div
                              key={odd.fixture.id}
                              className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
                            >
                              {/* Match Info */}
                              <div className="bg-white p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-xs text-gray-500">
                                    {formatDate(odd.fixture.date)}
                                  </span>
                                </div>
                                {odd.teams ? (
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-2">
                                        <div className="relative w-8 h-8">
                                          <Image
                                            src={odd.teams.home.logo}
                                            alt={odd.teams.home.name}
                                            fill
                                            className="object-contain"
                                            unoptimized
                                          />
                                        </div>
                                        <span className="text-sm font-medium">
                                          {odd.teams.home.name}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-2">
                                        <div className="relative w-8 h-8">
                                          <Image
                                            src={odd.teams.away.logo}
                                            alt={odd.teams.away.name}
                                            fill
                                            className="object-contain"
                                            unoptimized
                                          />
                                        </div>
                                        <span className="text-sm font-medium">
                                          {odd.teams.away.name}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-sm text-gray-500">
                                    Match #{odd.fixture.id}
                                  </div>
                                )}
                              </div>

                              {/* Odds Display */}
                              <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <div className="space-y-2">
                                  {filteredBookmakers
                                    .slice(0, 3)
                                    .map((bookmaker, idx) => {
                                      const bet = bookmaker.bets.find(
                                        (b) => b.name === selectedBet,
                                      );
                                      if (!bet) return null;

                                      return (
                                        <div
                                          key={idx}
                                          className="flex items-center justify-between text-xs"
                                        >
                                          <div className="flex items-center space-x-1">
                                            <div className="relative w-4 h-4">
                                              <Image
                                                src={getBookmakerLogo(
                                                  bookmaker.name,
                                                )}
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
                                            <span className="font-medium text-gray-700">
                                              {bookmaker.name}
                                            </span>
                                          </div>
                                          <div className="flex space-x-1">
                                            {bet.values.map((value, vIdx) => (
                                              <span
                                                key={vIdx}
                                                className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold"
                                              >
                                                {value.odd}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>

                    {/* View More Button */}
                    {league.odds.length > 3 && (
                      <div className="mt-6 text-center">
                        <a
                          href={`/football/${league.id}/odds`}
                          className="inline-block bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          {league.expanded
                            ? 'Show Less'
                            : `View More (${league.odds.length - 3} more matches)`}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
