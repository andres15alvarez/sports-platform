'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface Fixture {
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
    home: Team & { winner: boolean | null };
    away: Team & { winner: boolean | null };
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

type ViewType = 'all' | 'finished' | 'upcoming' | 'live';

const FixturesPageContent: React.FC = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState(71); // Serie A Brazil
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return new Date().toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  });
  const [viewType, setViewType] = useState<ViewType>('all');
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Lista de ligas
  const leagues = [
    { id: 39, name: 'Premier League', country: 'England' },
    { id: 140, name: 'La Liga', country: 'Spain' },
    { id: 78, name: 'Bundesliga', country: 'Germany' },
    { id: 135, name: 'Serie A', country: 'Italy' },
    { id: 61, name: 'Ligue 1', country: 'France' },
    { id: 71, name: 'Série A', country: 'Brazil' },
    { id: 128, name: 'Liga Profesional', country: 'Argentina' },
    { id: 1, name: 'World Cup', country: 'World' },
    { id: 2, name: 'UEFA Champions League', country: 'World' },
  ];

  useEffect(() => {
    const fetchFixtures = async () => {
      setLoading(true);
      setError(null);

      try {
        const currentYear = new Date().getFullYear();
        const season = selectedLeague === 1 ? 2022 : currentYear;

        const apiKey = process.env.NEXT_PUBLIC_API_KEYY;
        if (!apiKey) {
          throw new Error('API key not configured');
        }

        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?league=${selectedLeague}&date=${selectedDate}&season=${season}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': apiKey,
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        const data = await response.json();
        if (data.response && Array.isArray(data.response)) {
          setFixtures(data.response);
        } else if (data.errors && Object.keys(data.errors).length > 0) {
          setError('API Error: ' + JSON.stringify(data.errors));
        } else {
          setError('No matches found for this date.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, [selectedLeague, selectedDate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FT':
        return 'text-gray-600';
      case '1H':
      case '2H':
      case 'ET':
      case 'P':
      case 'LIVE':
        return 'text-red-600 animate-pulse';
      case 'NS':
        return 'text-blue-600';
      case 'PST':
      case 'CANC':
      case 'ABD':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = (status: string, elapsed: number | null) => {
    switch (status) {
      case 'NS':
        return 'Not Started';
      case '1H':
        return `${elapsed}'`;
      case 'HT':
        return 'Half Time';
      case '2H':
        return `${elapsed}'`;
      case 'ET':
        return 'Extra Time';
      case 'P':
        return 'Penalties';
      case 'FT':
        return 'Full Time';
      case 'AET':
        return 'After Extra Time';
      case 'PEN':
        return 'After Penalties';
      case 'PST':
        return 'Postponed';
      case 'CANC':
        return 'Cancelled';
      case 'ABD':
        return 'Abandoned';
      case 'LIVE':
        return `${elapsed}'`;
      default:
        return status;
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Invalid time';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const changeDate = (days: number) => {
    try {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + days);
      setSelectedDate(date.toISOString().split('T')[0]);
    } catch (error) {
      console.error('Error changing date:', error);
    }
  };

  const filteredFixtures = fixtures.filter((fixture) => {
    const status = fixture.fixture.status.short;
    switch (viewType) {
      case 'finished':
        return ['FT', 'AET', 'PEN'].includes(status);
      case 'upcoming':
        return status === 'NS';
      case 'live':
        return ['1H', '2H', 'HT', 'ET', 'P', 'LIVE'].includes(status);
      default:
        return true;
    }
  });

  const openFixtureModal = (fixture: Fixture) => {
    setSelectedFixture(fixture);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-lg">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Selector de Liga */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select league
          </label>
          <select
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {leagues.map((league) => (
              <option key={league.id} value={league.id}>
                {league.name} - {league.country}
              </option>
            ))}
          </select>
        </div>

        {/* Toolbar */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Selector de fecha */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => changeDate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Previous day"
              >
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
              </button>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => changeDate(1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Next day"
              >
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Filtros de vista */}
            <div className="flex space-x-2">
              <button
                onClick={() => setViewType('all')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewType === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setViewType('live')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewType === 'live'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Live
              </button>
              <button
                onClick={() => setViewType('finished')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewType === 'finished'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Finished
              </button>
              <button
                onClick={() => setViewType('upcoming')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewType === 'upcoming'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Upcoming
              </button>
            </div>
          </div>
        </div>

        {/* Lista de partidos */}
        <div className="space-y-4">
          {filteredFixtures.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              There are no matches to show.
            </div>
          ) : (
            filteredFixtures.map((fixture) => (
              <div
                key={fixture.fixture.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openFixtureModal(fixture)}
              >
                <div className="p-6">
                  {/* Liga info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={fixture.league.logo}
                        alt={fixture.league.name}
                        width={24}
                        height={24}
                        className="object-contain"
                        unoptimized
                      />
                      <span className="text-sm text-gray-600">
                        {fixture.league.name} - {fixture.league.round}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-medium ${getStatusColor(fixture.fixture.status.short)}`}
                    >
                      {getStatusText(
                        fixture.fixture.status.short,
                        fixture.fixture.status.elapsed,
                      )}
                    </span>
                  </div>

                  {/* Equipos y resultado */}
                  <div className="flex items-center justify-between">
                    {/* Equipo local */}
                    <div className="flex-1 flex items-center space-x-3">
                      <Image
                        src={fixture.teams.home.logo}
                        alt={fixture.teams.home.name}
                        width={40}
                        height={40}
                        className="object-contain"
                        unoptimized
                      />
                      <span
                        className={`font-medium ${fixture.teams.home.winner ? 'text-green-600' : ''}`}
                      >
                        {fixture.teams.home.name}
                      </span>
                    </div>

                    {/* Resultado o hora */}
                    <div className="px-6 text-center">
                      {fixture.fixture.status.short === 'NS' ? (
                        <span className="text-xl font-bold text-gray-700">
                          {formatTime(fixture.fixture.date)}
                        </span>
                      ) : (
                        <div className="text-2xl font-bold">
                          <span
                            className={
                              fixture.teams.home.winner
                                ? 'text-green-600'
                                : 'text-gray-700'
                            }
                          >
                            {fixture.goals.home ?? '-'}
                          </span>
                          <span className="mx-2 text-gray-400">:</span>
                          <span
                            className={
                              fixture.teams.away.winner
                                ? 'text-green-600'
                                : 'text-gray-700'
                            }
                          >
                            {fixture.goals.away ?? '-'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Equipo visitante */}
                    <div className="flex-1 flex items-center justify-end space-x-3">
                      <span
                        className={`font-medium ${fixture.teams.away.winner ? 'text-green-600' : ''}`}
                      >
                        {fixture.teams.away.name}
                      </span>
                      <Image
                        src={fixture.teams.away.logo}
                        alt={fixture.teams.away.name}
                        width={40}
                        height={40}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Información del estadio */}
                  {fixture.fixture.venue.name && (
                    <div className="mt-3 text-center text-sm text-gray-500">
                      {fixture.fixture.venue.name}, {fixture.fixture.venue.city}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal de detalles del partido */}
        {showModal && selectedFixture && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold">Match Details</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Close modal"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Encabezado del partido */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={selectedFixture.league.logo}
                        alt={selectedFixture.league.name}
                        width={32}
                        height={32}
                        className="object-contain"
                        unoptimized
                      />
                      <div>
                        <p className="font-medium">
                          {selectedFixture.league.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedFixture.league.round}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-lg font-medium ${getStatusColor(selectedFixture.fixture.status.short)}`}
                    >
                      {getStatusText(
                        selectedFixture.fixture.status.short,
                        selectedFixture.fixture.status.elapsed,
                      )}
                    </span>
                  </div>

                  {/* Equipos y resultado */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1 text-center">
                      <Image
                        src={selectedFixture.teams.home.logo}
                        alt={selectedFixture.teams.home.name}
                        width={80}
                        height={80}
                        className="object-contain mx-auto mb-2"
                        unoptimized
                      />
                      <p className="font-medium">
                        {selectedFixture.teams.home.name}
                      </p>
                    </div>

                    <div className="px-6">
                      {selectedFixture.fixture.status.short === 'NS' ? (
                        <div className="text-center">
                          <p className="text-3xl font-bold text-gray-700">
                            {formatTime(selectedFixture.fixture.date)}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {formatDate(selectedFixture.fixture.date)}
                          </p>
                        </div>
                      ) : (
                        <div className="text-4xl font-bold text-center">
                          <span
                            className={
                              selectedFixture.teams.home.winner
                                ? 'text-green-600'
                                : 'text-gray-700'
                            }
                          >
                            {selectedFixture.goals.home ?? '-'}
                          </span>
                          <span className="mx-3 text-gray-400">:</span>
                          <span
                            className={
                              selectedFixture.teams.away.winner
                                ? 'text-green-600'
                                : 'text-gray-700'
                            }
                          >
                            {selectedFixture.goals.away ?? '-'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 text-center">
                      <Image
                        src={selectedFixture.teams.away.logo}
                        alt={selectedFixture.teams.away.name}
                        width={80}
                        height={80}
                        className="object-contain mx-auto mb-2"
                        unoptimized
                      />
                      <p className="font-medium">
                        {selectedFixture.teams.away.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="space-y-4">
                  {selectedFixture.fixture.venue.name && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stadium:</span>
                      <span className="font-medium">
                        {selectedFixture.fixture.venue.name},{' '}
                        {selectedFixture.fixture.venue.city}
                      </span>
                    </div>
                  )}

                  {selectedFixture.fixture.referee && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Referee:</span>
                      <span className="font-medium">
                        {selectedFixture.fixture.referee}
                      </span>
                    </div>
                  )}

                  {/* Marcador por tiempos */}
                  {selectedFixture.fixture.status.short !== 'NS' && (
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="font-medium mb-3">Marker details</h3>
                      <div className="space-y-2 text-sm">
                        {selectedFixture.score.halftime.home !== null && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">First half:</span>
                            <span className="font-medium">
                              {selectedFixture.score.halftime.home} -{' '}
                              {selectedFixture.score.halftime.away}
                            </span>
                          </div>
                        )}
                        {selectedFixture.score.fulltime.home !== null && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Full time:</span>
                            <span className="font-medium">
                              {selectedFixture.score.fulltime.home} -{' '}
                              {selectedFixture.score.fulltime.away}
                            </span>
                          </div>
                        )}
                        {selectedFixture.score.extratime.home !== null && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Overtime:</span>
                            <span className="font-medium">
                              {selectedFixture.score.extratime.home} -{' '}
                              {selectedFixture.score.extratime.away}
                            </span>
                          </div>
                        )}
                        {selectedFixture.score.penalty.home !== null && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Penalties:</span>
                            <span className="font-medium">
                              {selectedFixture.score.penalty.home} -{' '}
                              {selectedFixture.score.penalty.away}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FixturesPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <FixturesPageContent />
    </Suspense>
  );
};

export default FixturesPage;
