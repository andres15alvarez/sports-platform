'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const SEASON = '2024-2025';

const betTypes = ['Home/Away', '3Way Result', 'Over/Under'];

interface Team {
  id: number;
  name: string;
  logo: string;
  winner?: boolean | null;
}

interface Game {
  id: number;
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
  };
  status: {
    long: string;
    short: string;
  };
  date: string;
  teams: {
    home: Team;
    away: Team;
  };
  venue: string;
  scores: {
    home: {
      total: number;
      quarter: number[];
    };
    away: {
      total: number;
      quarter: number[];
    };
  };
}

interface OddValue {
  odd: string;
  value: string;
}

interface BookmakerBet {
  name: string;
  values: OddValue[];
}

interface Bookmaker {
  name: string;
  bets: BookmakerBet[];
}

interface Odd {
  id: number;
  game: Game;
  bookmakers: Bookmaker[];
}

interface LeagueData {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag?: string;
  odds: Odd[];
  loading: boolean;
  error: string | null;
  expanded: boolean;
}

const bookmakerLogos: { [key: string]: string } = {
  Bet365: 'https://www.bet365.com/favicon.ico',
  'William Hill': 'https://www.williamhill.com/favicon.ico',
  Betfair: 'https://www.betfair.com/favicon.ico',
  '1xBet': 'https://1xbet.com/favicon.ico',
  Betway: 'https://www.betway.com/favicon.ico',
};

const activeLeagues = [
  { id: 117, name: 'Liga ACB', country: 'Spain' },
  { id: 12, name: 'NBA', country: 'USA' },
  { id: 120, name: 'EuroLeague', country: 'Europe' },
  { id: 31, name: 'CBA', country: 'China' },
  { id: 116, name: 'NCAA', country: 'USA' },
];

const Page: React.FC = () => {
  const [selectedBet, setSelectedBet] = useState('Home/Away');
  const [leaguesData, setLeaguesData] = useState<LeagueData[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [expandedMatches, setExpandedMatches] = useState<{
    [gameId: number]: boolean;
  }>({});

  useEffect(() => {
    initializeLeaguesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeLeaguesData = async () => {
    setInitialLoading(true);
    // Para cada id de liga, inicializa el objeto con loading
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
    const promises = activeLeagues.map((league, idx) =>
      fetchLeagueOdds(league.id, idx),
    );
    await Promise.all(promises);
    setInitialLoading(false);
  };

  const fetchLeagueOdds = async (leagueId: number, index: number) => {
    try {
      const season = SEASON;
      const oddsResponse = await fetch(
        `https://v1.basketball.api-sports.io/odds?league=${leagueId}&season=${season}`,
        {
          headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEYY || '',
            'x-rapidapi-host': 'v1.basketball.api-sports.io',
          },
        },
      );
      if (!oddsResponse.ok) throw new Error('Failed to fetch odds');
      const oddsData = await oddsResponse.json();
      console.log('ODDS API RESPONSE (leagueId:', leagueId, '):', oddsData);
      if (oddsData.response && oddsData.response.length > 0) {
        console.log(
          'EJEMPLO DE PARTIDO (leagueId:',
          leagueId,
          '):',
          oddsData.response[0],
        );
      }
      if (!oddsData.response || oddsData.response.length === 0) {
        setLeaguesData((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            loading: false,
            error: 'No active matches found',
          };
          return updated;
        });
        return;
      }
      const oddsResults: Odd[] = oddsData.response;
      // Ordenar por fecha
      const sortedOdds = oddsResults.sort((a, b) => {
        const dateA = new Date(a.game.date).getTime();
        const dateB = new Date(b.game.date).getTime();
        return dateA - dateB;
      });
      console.log('PROCESSED ODDS (leagueId:', leagueId, '):', sortedOdds);
      // Obtener información de la liga del primer resultado
      const leagueInfo = sortedOdds[0]?.game?.league || {};
      setLeaguesData((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          name: leagueInfo.name || '',
          country: leagueInfo.country || '',
          logo: leagueInfo.logo || '',
          flag: leagueInfo.flag || '',
          odds: sortedOdds,
          loading: false,
          error: null,
        };
        return updated;
      });
    } catch (err: unknown) {
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

  const toggleMatchExpansion = (gameId: number) => {
    setExpandedMatches((prev) => ({
      ...prev,
      [gameId]: !prev[gameId],
    }));
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
          Live Basketball Betting Odds
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
                    <Link href={`/basketball/${league.id}/odds`}>
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
                          // Acceso correcto a los datos:
                          const home = odd.game.teams.home;
                          const away = odd.game.teams.away;
                          const bookmakers = odd.bookmakers;
                          const matchDate = odd.game.date;
                          // Filtrar bookmakers por tipo de apuesta
                          const filteredBookmakers = bookmakers.filter((b) =>
                            b.bets.some((bet) => bet.name === selectedBet),
                          );
                          if (filteredBookmakers.length === 0) return null;
                          const isExpanded =
                            expandedMatches[odd.game.id] || false;
                          const bookmakersToShow = isExpanded
                            ? filteredBookmakers
                            : filteredBookmakers.slice(0, 3);
                          // Calcular mejores odds por columna
                          const minOddsPerColumn: number[] = [];
                          if (filteredBookmakers.length > 0) {
                            const betsArrays = filteredBookmakers.map(
                              (bookmaker) => {
                                const bet = bookmaker.bets.find(
                                  (b) => b.name === selectedBet,
                                );
                                return bet
                                  ? bet.values.map((v) => parseFloat(v.odd))
                                  : [];
                              },
                            );
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
                              key={odd.game.id}
                              className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
                            >
                              {/* Match Info */}
                              <div className="bg-white p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-xs text-gray-500">
                                    {formatDate(matchDate)}
                                  </span>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <div className="relative w-8 h-8">
                                        <Image
                                          src={home.logo}
                                          alt={home.name}
                                          fill
                                          className="object-contain"
                                          unoptimized
                                        />
                                      </div>
                                      <span className="text-sm font-medium">
                                        {home.name}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <div className="relative w-8 h-8">
                                        <Image
                                          src={away.logo}
                                          alt={away.name}
                                          fill
                                          className="object-contain"
                                          unoptimized
                                        />
                                      </div>
                                      <span className="text-sm font-medium">
                                        {away.name}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Odds Display */}
                              <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <div className="space-y-2">
                                  {bookmakersToShow.map((bookmaker, idx) => {
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
                                          {bet.values.map((value, vIdx) => {
                                            const oddValue = parseFloat(
                                              value.odd,
                                            );
                                            const isBest =
                                              oddValue ===
                                              minOddsPerColumn[vIdx];
                                            return (
                                              <span
                                                key={vIdx}
                                                className={
                                                  isBest
                                                    ? 'bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold'
                                                    : 'bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs font-semibold'
                                                }
                                              >
                                                {value.odd}
                                              </span>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  })}
                                  {/* Mostrar el botón desplegable */}
                                  <div className="flex justify-end">
                                    <button
                                      className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-green-100 transition-colors focus:outline-none mt-2"
                                      onClick={() =>
                                        toggleMatchExpansion(odd.game.id)
                                      }
                                      aria-label={
                                        isExpanded
                                          ? 'Show less bookmakers'
                                          : `Show more bookmakers`
                                      }
                                      type="button"
                                    >
                                      <ChevronDown
                                        className={`w-5 h-5 text-green-700 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    {/* View More Button */}
                    {league.odds.length > 3 && (
                      <div className="mt-6 text-center">
                        <Link
                          href={`/basketball/${league.id}/odds`}
                          className="inline-block bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          {league.expanded
                            ? 'Show Less'
                            : `View More (${league.odds.length - 3} more matches)`}
                        </Link>
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
