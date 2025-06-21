'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
//import { useParams } from 'next/navigation';

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

const LeagueResultsPage: React.FC = () => {
  //const params = useParams();

  const leagueId = '71'; // params.id as string;

  const [fixtures, setFixtures] = useState<FixtureResponse[]>([]);
  const [leagueInfo, setLeagueInfo] = useState<
    FixtureResponse['league'] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('All Results');
  const [currentPage, setCurrentPage] = useState(1);
  const fixturesPerPage = 10;

  const resultFilters = ['All Results', 'Home Wins', 'Away Wins', 'Draws'];

  useEffect(() => {
    fetchLeagueResults();
  }, [leagueId]);

  const fetchLeagueResults = async () => {
    try {
      setLoading(true);
      const season = 2025;

      const response = await fetch(
        `https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${season}&status=FT`,
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
        setError('No completed matches found');
        setLoading(false);
        return;
      }

      const fixturesData: FixtureResponse[] = data.response;

      const sortedFixtures = fixturesData.sort(
        (a, b) => b.fixture.timestamp - a.fixture.timestamp,
      );

      if (sortedFixtures.length > 0) {
        setLeagueInfo(sortedFixtures[0].league);
      }

      setFixtures(sortedFixtures);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
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

  const filteredFixtures = filterFixtures(fixtures);
  const indexOfLastFixture = currentPage * fixturesPerPage;
  const indexOfFirstFixture = indexOfLastFixture - fixturesPerPage;
  const currentFixtures = filteredFixtures.slice(
    indexOfFirstFixture,
    indexOfLastFixture,
  );
  const totalPages = Math.ceil(filteredFixtures.length / fixturesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading match results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
            <Link href="/football/results">
              <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                Back to Results
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {leagueInfo && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="mb-4 bg-green-50 rounded-xl px-6 py-6">
            <div className="flex items-center gap-x-4">
              <Image
                src={leagueInfo.logo}
                alt={leagueInfo.name}
                width={64}
                height={64}
                className="object-contain"
                unoptimized
              />
              <div>
                <h1 className="text-2xl font-semibold text-black">
                  {leagueInfo.name}
                </h1>
                <p className="text-base text-gray-600 mt-1">
                  Season {leagueInfo.season}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <Link href="/football/results">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back to All Results</span>
            </button>
          </Link>

          <div className="w-full sm:w-auto">
            <select
              value={selectedFilter}
              onChange={(e) => {
                setSelectedFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600"
            >
              {resultFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {currentFixtures.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">
                No matches found with selected filter
              </p>
            </div>
          ) : (
            currentFixtures.map((fixture) => (
              <div
                key={fixture.fixture.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Image
                        src={fixture.league.logo}
                        alt={fixture.league.name}
                        width={20}
                        height={20}
                        className="object-contain"
                        unoptimized
                      />
                      <span>
                        {fixture.league.name} - {fixture.league.round}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded">
                      Full Time
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="relative w-12 h-12">
                        <Image
                          src={fixture.teams.home.logo}
                          alt={fixture.teams.home.name}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                      <span
                        className={`font-medium text-lg ${fixture.teams.home.winner ? 'text-gray-900' : 'text-gray-600'}`}
                      >
                        {fixture.teams.home.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mx-6">
                      <span
                        className={`text-3xl font-bold ${fixture.teams.home.winner ? 'text-gray-900' : 'text-gray-600'}`}
                      >
                        {fixture.goals.home}
                      </span>
                      <span className="text-2xl text-gray-400">:</span>
                      <span
                        className={`text-3xl font-bold ${fixture.teams.away.winner ? 'text-green-600' : 'text-gray-600'}`}
                      >
                        {fixture.goals.away}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 flex-1 justify-end">
                      <span
                        className={`font-medium text-lg text-right ${fixture.teams.away.winner ? 'text-green-600' : 'text-gray-600'}`}
                      >
                        {fixture.teams.away.name}
                      </span>
                      <div className="relative w-12 h-12">
                        <Image
                          src={fixture.teams.away.logo}
                          alt={fixture.teams.away.name}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <span>
                        {formatDate(fixture.fixture.date)} •{' '}
                        {formatTime(fixture.fixture.date)}
                      </span>
                      {fixture.fixture.venue.name && (
                        <span className="hidden sm:inline">
                          {fixture.fixture.venue.name},{' '}
                          {fixture.fixture.venue.city}
                        </span>
                      )}
                    </div>
                    <Link href={`/football/71/game-details`}>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2 text-sm font-medium">
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
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                }`}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === pageNumber
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <span key={pageNumber} className="px-2">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueResultsPage;
