'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FixtureResponse {
  fixture: {
    id: number;
    referee: string | null;
    timezone: string;
    date: string;
    timestamp: number;
    periods: {
      first: number | null;
      second: number | null;
    };
    venue: {
      id: number | null;
      name: string | null;
      city: string | null;
    };
    status: {
      long: string;
      short: string;
      elapsed: number | null;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string | null;
    season: number;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: {
      home: number | null;
      away: number | null;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
    extratime: {
      home: number | null;
      away: number | null;
    };
    penalty: {
      home: number | null;
      away: number | null;
    };
  };
}

interface LeagueData {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  fixtures: FixtureResponse[];
  loading: boolean;
  error: string | null;
  expanded: boolean;
}

const Page: React.FC = () => {
  const [leaguesData, setLeaguesData] = useState<LeagueData[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All Results');

  const activeLeagues = [
    { id: 71, name: 'Série A', country: 'Brazil' },
    { id: 240, name: 'Liga BetPlay', country: 'Colombia' },
    { id: 239, name: 'Primera División', country: 'Chile' },
    { id: 268, name: 'Primera División', country: 'Uruguay' },
    { id: 281, name: 'Liga 1', country: 'Peru' },
  ];

  const resultFilters = ['All Results', 'Home Wins', 'Away Wins', 'Draws'];

  useEffect(() => {
    initializeLeaguesData();
  }, []);

  const initializeLeaguesData = async () => {
    setInitialLoading(true);

    const initialData: LeagueData[] = activeLeagues.map((league) => ({
      ...league,
      logo: '',
      flag: '',
      fixtures: [],
      loading: true,
      error: null,
      expanded: false,
    }));

    setLeaguesData(initialData);

    const promises = activeLeagues.map((league, index) =>
      fetchLeagueResults(league.id, index),
    );

    await Promise.all(promises);
    setInitialLoading(false);
  };

  const fetchLeagueResults = async (leagueId: number, index: number) => {
    try {
      const season = 2025;

      const response = await fetch(
        `https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${season}&status=FT&last=10`,
        {
          headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEYY || '',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      );

      if (!response.ok) throw new Error('Failed to fetch results');

      const data = await response.json();

      if (!data.response || data.response.length === 0) {
        setLeaguesData((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            loading: false,
            error: 'No completed matches found',
          };
          return updated;
        });
        return;
      }

      const fixtures: FixtureResponse[] = data.response;

      const sortedFixtures = fixtures
        .sort((a, b) => b.fixture.timestamp - a.fixture.timestamp)
        .slice(0, 3);

      const leagueInfo = sortedFixtures[0]?.league || {};

      setLeaguesData((prev) => {
        const updated = [...prev];
        updated[index] = {
          id: leagueId,
          name: leagueInfo.name || activeLeagues[index].name,
          country: leagueInfo.country || activeLeagues[index].country,
          logo: leagueInfo.logo || '',
          flag: leagueInfo.flag || '',
          fixtures: sortedFixtures,
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getResultType = (fixture: FixtureResponse) => {
    const homeGoals = fixture.goals.home || 0;
    const awayGoals = fixture.goals.away || 0;

    if (homeGoals > awayGoals) return 'Home Win';
    if (awayGoals > homeGoals) return 'Away Win';
    return 'Draw';
  };

  const filterFixtures = (fixtures: FixtureResponse[]) => {
    if (selectedFilter === 'All Results') return fixtures;

    return fixtures.filter((fixture) => {
      const resultType = getResultType(fixture);
      if (selectedFilter === 'Home Wins') return resultType === 'Home Win';
      if (selectedFilter === 'Away Wins') return resultType === 'Away Win';
      if (selectedFilter === 'Draws') return resultType === 'Draw';
      return true;
    });
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading match results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-8">
          Football Match Results
        </h1>

        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <div className="max-w-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter Results
            </label>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600"
            >
              {resultFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {leaguesData.map((league) => {
            const filteredFixtures = filterFixtures(league.fixtures);

            return (
              <div
                key={league.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
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
                    {league.fixtures.length > 0 && (
                      <Link href={`/football/results-league`}>
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

                <div className="p-6">
                  {league.loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                    </div>
                  ) : league.error ? (
                    <div className="text-center py-8 text-red-600">
                      {league.error}
                    </div>
                  ) : filteredFixtures.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No matches found with selected filter
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredFixtures.map((fixture) => {
                          const resultType = getResultType(fixture);

                          return (
                            <div
                              key={fixture.fixture.id}
                              className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
                            >
                              <div className="bg-white p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-xs text-gray-500">
                                    {formatDate(fixture.fixture.date)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {formatTime(fixture.fixture.date)}
                                  </span>
                                </div>

                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 flex-1">
                                      <div className="relative w-8 h-8 flex-shrink-0">
                                        <Image
                                          src={fixture.teams.home.logo}
                                          alt={fixture.teams.home.name}
                                          fill
                                          className="object-contain"
                                          unoptimized
                                        />
                                      </div>
                                      <span
                                        className={`text-sm font-medium ${fixture.teams.home.winner ? 'text-green-700' : ''}`}
                                      >
                                        {fixture.teams.home.name}
                                      </span>
                                    </div>
                                    <span
                                      className={`text-lg font-bold ml-2 ${fixture.teams.home.winner ? 'text-green-700' : ''}`}
                                    >
                                      {fixture.goals.home}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 flex-1">
                                      <div className="relative w-8 h-8 flex-shrink-0">
                                        <Image
                                          src={fixture.teams.away.logo}
                                          alt={fixture.teams.away.name}
                                          fill
                                          className="object-contain"
                                          unoptimized
                                        />
                                      </div>
                                      <span
                                        className={`text-sm font-medium ${fixture.teams.away.winner ? 'text-green-700' : ''}`}
                                      >
                                        {fixture.teams.away.name}
                                      </span>
                                    </div>
                                    <span
                                      className={`text-lg font-bold ml-2 ${fixture.teams.away.winner ? 'text-green-700' : ''}`}
                                    >
                                      {fixture.goals.away}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-600">
                                      Result
                                    </span>
                                    <span
                                      className={`font-semibold ${
                                        resultType === 'Draw'
                                          ? 'text-gray-700'
                                          : 'text-green-700'
                                      }`}
                                    >
                                      {resultType}
                                    </span>
                                  </div>

                                  {fixture.score.halftime.home !== null && (
                                    <div className="flex items-center justify-between text-xs">
                                      <span className="text-gray-600">
                                        Half-time
                                      </span>
                                      <span className="font-medium">
                                        {fixture.score.halftime.home} -{' '}
                                        {fixture.score.halftime.away}
                                      </span>
                                    </div>
                                  )}

                                  {fixture.fixture.venue.name && (
                                    <div className="flex items-center justify-between text-xs">
                                      <span className="text-gray-600">
                                        Venue
                                      </span>
                                      <span className="font-medium text-right">
                                        {fixture.fixture.venue.name}
                                      </span>
                                    </div>
                                  )}

                                  <div className="pt-2 mt-2 border-t border-gray-200">
                                    <Link href={`/football/71/game-details`}>
                                      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-md transition-colors flex items-center justify-center space-x-2 text-sm font-medium">
                                        <span>View Details</span>
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {league.fixtures.length > 3 && (
                        <div className="mt-6 text-center">
                          <a
                            href={`/football/${league.id}/results`}
                            className="inline-block bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            View All Results
                          </a>
                        </div>
                      )}
                    </div>
                  )}
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
