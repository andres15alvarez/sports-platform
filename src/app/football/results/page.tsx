'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Tipos
interface BookmakerOdds {
  name: string;
  home: string;
  draw: string;
  away: string;
}

interface FixtureData {
  fixture: {
    id: number;
    date: string;
    venue: {
      name: string;
      city: string;
    };
    status: {
      elapsed: number;
      long: string;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
  };
  teams: {
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
  };
  goals: {
    home: number;
    away: number;
  };
  score: {
    fulltime: {
      home: number;
      away: number;
    };
  };
}

interface Statistics {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  statistics: Array<{
    type: string;
    value: string;
  }>;
}

interface OddsData {
  bookmakers: Array<{
    id: number;
    name: string;
    bets: Array<{
      id: number;
      name: string;
      values: Array<{
        value: string;
        odd: string;
      }>;
    }>;
  }>;
}

interface H2HData {
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner?: boolean;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner?: boolean;
    };
  };
  goals: {
    home: number;
    away: number;
  };
  fixture: {
    date: string;
  };
  league?: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
  };
}

interface StandingData {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
}

interface TeamStatsData {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  form: string;
  fixtures: {
    played: {
      home: number;
      away: number;
      total: number;
    };
    wins: {
      home: number;
      away: number;
      total: number;
    };
    draws: {
      home: number;
      away: number;
      total: number;
    };
    loses: {
      home: number;
      away: number;
      total: number;
    };
  };
  goals: {
    for: {
      total: {
        home: number;
        away: number;
        total: number;
      };
      average: {
        home: string;
        away: string;
        total: string;
      };
    };
    against: {
      total: {
        home: number;
        away: number;
        total: number;
      };
      average: {
        home: string;
        away: string;
        total: string;
      };
    };
  };
}

const Page: React.FC = () => {
  const [fixtureData, setFixtureData] = useState<FixtureData | null>(null);
  const [statistics, setStatistics] = useState<Statistics[]>([]);
  const [odds, setOdds] = useState<OddsData | null>(null);
  const [h2hData, setH2hData] = useState<H2HData[]>([]);
  const [h2hFullData, setH2hFullData] = useState<H2HData[]>([]);
  const [standings, setStandings] = useState<StandingData[]>([]);
  const [homeTeamStats, setHomeTeamStats] = useState<TeamStatsData | null>(
    null,
  );
  const [awayTeamStats, setAwayTeamStats] = useState<TeamStatsData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setFixtureId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('match-analysis');

  useEffect(() => {
    fetchRecentCompletedMatch();
  }, []);

  const fetchRecentCompletedMatch = async () => {
    try {
      // Buscar el partido más reciente completado
      const recentResponse = await fetch(
        `https://v3.football.api-sports.io/fixtures?league=71&season=2025&status=FT&last=10`,
        {
          headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEYY || '',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      );

      if (!recentResponse.ok) throw new Error('Failed to fetch recent matches');

      const recentData = await recentResponse.json();

      if (recentData.response && recentData.response.length > 0) {
        // Usar el primer partido completado
        const matchId = recentData.response[0].fixture.id;
        setFixtureId(matchId);
        fetchMatchData(matchId);
      } else {
        throw new Error('No completed matches found');
      }
    } catch (err) {
      console.error('Error fetching recent match:', err);
      setError('Failed to load recent match data');
      setLoading(false);
    }
  };

  const fetchMatchData = async (matchId: number) => {
    setLoading(true);
    setError(null);

    try {
      // Obtener datos del partido
      const fixtureResponse = await fetch(
        `https://v3.football.api-sports.io/fixtures?id=${matchId}`,
        {
          headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEYY || '',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      );

      if (!fixtureResponse.ok) throw new Error('Failed to fetch fixture data');

      const fixtureResult = await fixtureResponse.json();

      if (fixtureResult.response && fixtureResult.response[0]) {
        setFixtureData(fixtureResult.response[0]);

        // Obtener el season y league id para standings
        const leagueId = fixtureResult.response[0].league.id;
        const season = fixtureResult.response[0].league.season;

        // Obtener standings de la liga
        const standingsResponse = await fetch(
          `https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`,
          {
            headers: {
              'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEYY || '',
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          },
        );

        if (standingsResponse.ok) {
          const standingsResult = await standingsResponse.json();
          if (
            standingsResult.response &&
            standingsResult.response[0]?.league?.standings[0]
          ) {
            setStandings(standingsResult.response[0].league.standings[0]);
          }
        }

        // Obtener estadísticas de equipos
        const homeTeamId = fixtureResult.response[0].teams.home.id;
        const awayTeamId = fixtureResult.response[0].teams.away.id;

        // Stats del equipo local
        const homeStatsResponse = await fetch(
          `https://v3.football.api-sports.io/teams/statistics?league=${leagueId}&season=${season}&team=${homeTeamId}`,
          {
            headers: {
              'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEYY || '',
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          },
        );

        if (homeStatsResponse.ok) {
          const homeStatsResult = await homeStatsResponse.json();
          if (homeStatsResult.response) {
            setHomeTeamStats(homeStatsResult.response);
          }
        }

        // Stats del equipo visitante
        const awayStatsResponse = await fetch(
          `https://v3.football.api-sports.io/teams/statistics?league=${leagueId}&season=${season}&team=${awayTeamId}`,
          {
            headers: {
              'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEYY || '',
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          },
        );

        if (awayStatsResponse.ok) {
          const awayStatsResult = await awayStatsResponse.json();
          if (awayStatsResult.response) {
            setAwayTeamStats(awayStatsResult.response);
          }
        }
      }

      // Obtener estadísticas del partido
      const statsResponse = await fetch(
        `https://v3.football.api-sports.io/fixtures/statistics?fixture=${matchId}`,
        {
          headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEYY || '',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      );

      if (statsResponse.ok) {
        const statsResult = await statsResponse.json();
        setStatistics(statsResult.response || []);
      }

      // Obtener odds del partido
      const oddsResponse = await fetch(
        `https://v3.football.api-sports.io/odds?fixture=${matchId}`,
        {
          headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEYY || '',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      );

      if (oddsResponse.ok) {
        const oddsResult = await oddsResponse.json();
        if (oddsResult.response && oddsResult.response[0]) {
          setOdds(oddsResult.response[0]);
        }
      }

      // Obtener H2H
      if (fixtureResult.response && fixtureResult.response[0]) {
        const fixture = fixtureResult.response[0];

        // Obtener últimos 5 partidos para la tabla
        const h2hResponse = await fetch(
          `https://v3.football.api-sports.io/fixtures/headtohead?h2h=${fixture.teams.home.id}-${fixture.teams.away.id}&last=5`,
          {
            headers: {
              'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEYY || '',
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          },
        );

        if (h2hResponse.ok) {
          const h2hResult = await h2hResponse.json();
          setH2hData(h2hResult.response || []);
        }

        // Obtener más partidos históricos para el Historical Matchup Summary
        const h2hFullResponse = await fetch(
          `https://v3.football.api-sports.io/fixtures/headtohead?h2h=${fixture.teams.home.id}-${fixture.teams.away.id}&last=20`,
          {
            headers: {
              'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEYY || '',
              'x-rapidapi-host': 'v3.football.api-sports.io',
            },
          },
        );

        if (h2hFullResponse.ok) {
          const h2hFullResult = await h2hFullResponse.json();
          setH2hFullData(h2hFullResult.response || []);
        }
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatValue = (
    stats: Statistics[],
    teamId: number,
    statType: string,
  ) => {
    const teamStats = stats.find((s) => s.team.id === teamId);
    if (!teamStats) return '0';

    const stat = teamStats.statistics.find((s) => s.type === statType);
    return stat ? stat.value : '0';
  };

  const getTeamPosition = (
    teamId: number,
  ): { position: number; points: number } => {
    const standing = standings.find((s) => s.team.id === teamId);
    return {
      position: standing?.rank || 0,
      points: standing?.points || 0,
    };
  };

  const getTeamForm = (teamId: number): string => {
    if (homeTeamStats && homeTeamStats.team.id === teamId) {
      return homeTeamStats.form || 'N/A';
    }
    if (awayTeamStats && awayTeamStats.team.id === teamId) {
      return awayTeamStats.form || 'N/A';
    }
    const standing = standings.find((s) => s.team.id === teamId);
    return standing?.form || 'N/A';
  };

  const calculateFormFromH2H = (teamId: number): string => {
    const form = getTeamForm(teamId);
    if (form && form !== 'N/A') {
      return form.split('').slice(-5).join(' ');
    }

    if (h2hData.length === 0) {
      return 'N/A';
    }

    const recentMatches = h2hData.slice(0, 5);
    return recentMatches
      .map((match) => {
        const isHome = match.teams.home.id === teamId;
        const teamGoals = isHome ? match.goals.home : match.goals.away;
        const opponentGoals = isHome ? match.goals.away : match.goals.home;

        if (teamGoals > opponentGoals) return 'W';
        if (teamGoals < opponentGoals) return 'L';
        return 'D';
      })
      .join(' ');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading match analysis...</p>
        </div>
      </div>
    );
  }

  if (error || !fixtureData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading match data
        </div>
      </div>
    );
  }

  const homePosition = getTeamPosition(fixtureData.teams.home.id);
  const awayPosition = getTeamPosition(fixtureData.teams.away.id);
  //const homeStats = statistics.find(s => s.team.id === fixtureData.teams.home.id);
  //const awayStats = statistics.find(s => s.team.id === fixtureData.teams.away.id);

  // Procesar odds de la API
  const bookmakers: BookmakerOdds[] = [];
  if (odds && odds.bookmakers.length > 0) {
    odds.bookmakers.slice(0, 6).forEach((bookmaker) => {
      const matchWinner = bookmaker.bets.find((b) => b.name === 'Match Winner');
      if (matchWinner) {
        const homeOdd = matchWinner.values.find((v) => v.value === 'Home')?.odd;
        const drawOdd = matchWinner.values.find((v) => v.value === 'Draw')?.odd;
        const awayOdd = matchWinner.values.find((v) => v.value === 'Away')?.odd;

        if (homeOdd && drawOdd && awayOdd) {
          bookmakers.push({
            name: bookmaker.name,
            home: homeOdd,
            draw: drawOdd,
            away: awayOdd,
          });
        }
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-4">
          <span>Home</span> / <span>Football</span> /{' '}
          <span>{fixtureData.league.name}</span> /
          <span className="text-gray-900 font-medium">
            {' '}
            {fixtureData.teams.home.name} vs {fixtureData.teams.away.name}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {fixtureData.teams.home.name} vs {fixtureData.teams.away.name}:
          In-depth Match Analysis and Predictions
        </h1>

        {/* Match Header Card */}
        <div className="bg-gradient-to-r from-blue-900 to-red-900 rounded-lg p-6 text-white mb-6">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Image
                src={fixtureData.league.logo}
                alt={fixtureData.league.name}
                width={24}
                height={24}
                className="rounded"
                unoptimized
              />
              <span className="text-green-400 font-medium">
                {fixtureData.league.name}
              </span>
            </div>
            <p className="text-sm">
              Match ended - {formatDate(fixtureData.fixture.date)}
            </p>
          </div>

          <div className="flex items-center justify-center space-x-8 lg:space-x-16">
            {/* Home Team */}
            <div className="text-center">
              <div className="relative w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-2">
                <Image
                  src={fixtureData.teams.home.logo}
                  alt={fixtureData.teams.home.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h3 className="font-bold text-lg">
                {fixtureData.teams.home.name}
              </h3>
              <p className="text-sm text-gray-300">
                Position: {homePosition.position || 'N/A'} (
                {homePosition.points || 0} pts)
              </p>
            </div>

            {/* Score */}
            <div className="text-center">
              <p className="text-sm text-gray-300 mb-2">
                {formatDate(fixtureData.fixture.date)}
              </p>
              <div className="text-4xl lg:text-5xl font-bold">
                {fixtureData.goals.home} - {fixtureData.goals.away}
              </div>
              <p className="text-sm text-yellow-400 mt-2">Full Time</p>
              <p className="text-xs text-gray-300 mt-1">
                Venue: {fixtureData.fixture.venue.name}
              </p>
            </div>

            {/* Away Team */}
            <div className="text-center">
              <div className="relative w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-2">
                <Image
                  src={fixtureData.teams.away.logo}
                  alt={fixtureData.teams.away.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h3 className="font-bold text-lg">
                {fixtureData.teams.away.name}
              </h3>
              <p className="text-sm text-gray-300">
                Position: {awayPosition.position || 'N/A'} (
                {awayPosition.points || 0} pts)
              </p>
            </div>
          </div>
        </div>

        {/* Bookmaker Comparison */}
        {bookmakers.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Bookmaker Comparison</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Bookmaker</th>
                    <th className="text-center py-2 px-4 text-blue-600">
                      {fixtureData.teams.home.name} Win (1)
                    </th>
                    <th className="text-center py-2 px-4">Draw (X)</th>
                    <th className="text-center py-2 px-4 text-red-600">
                      {fixtureData.teams.away.name} Win (2)
                    </th>
                    <th className="text-center py-2 px-4">Best Odds</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Bookmakers Rows */}
                  {bookmakers.map((bookmaker, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 flex items-center space-x-2">
                        <span>{bookmaker.name}</span>
                      </td>
                      <td className="text-center py-3 px-4 font-medium">
                        {bookmaker.home}
                      </td>
                      <td className="text-center py-3 px-4 font-medium">
                        {bookmaker.draw}
                      </td>
                      <td className="text-center py-3 px-4 font-medium">
                        {bookmaker.away}
                      </td>
                      <td className="text-center py-3 px-4">
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                          Bet Now
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Best Odds Row */}
                  <tr className="bg-gray-100 font-bold">
                    <td className="py-3 px-4">Best Odds</td>
                    <td className="text-center py-3 px-4 text-green-600">
                      {Math.max(
                        ...bookmakers.map((b) => parseFloat(b.home)),
                      ).toFixed(2)}
                    </td>
                    <td className="text-center py-3 px-4 text-green-600">
                      {Math.max(
                        ...bookmakers.map((b) => parseFloat(b.draw)),
                      ).toFixed(2)}
                    </td>
                    <td className="text-center py-3 px-4 text-green-600">
                      {Math.max(
                        ...bookmakers.map((b) => parseFloat(b.away)),
                      ).toFixed(2)}
                    </td>
                    <td className="text-center py-3 px-4">
                      <button className="text-green-600 hover:text-green-700 font-medium">
                        View All
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Home Team Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-bold mb-4">
              {fixtureData.teams.home.name} Recent Form (Last 5)
            </h3>
            <div className="flex space-x-2 mb-4">
              {calculateFormFromH2H(fixtureData.teams.home.id)
                .split(' ')
                .map((result, index) => (
                  <span
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm
                    ${result === 'W' ? 'bg-green-500' : result === 'L' ? 'bg-red-500' : result === 'D' ? 'bg-gray-400' : 'bg-gray-300'}`}
                  >
                    {result}
                  </span>
                ))}
            </div>
          </div>

          {/* Away Team Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-bold mb-4">
              {fixtureData.teams.away.name} Recent Form (Last 5)
            </h3>
            <div className="flex space-x-2 mb-4">
              {calculateFormFromH2H(fixtureData.teams.away.id)
                .split(' ')
                .map((result, index) => (
                  <span
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm
                    ${result === 'W' ? 'bg-green-500' : result === 'L' ? 'bg-red-500' : result === 'D' ? 'bg-gray-400' : 'bg-gray-300'}`}
                  >
                    {result}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Match Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-5">
          <h2 className="text-lg font-bold mb-4">Match Overview</h2>

          <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-6 border border-gray-200">
            <div className="grid grid-cols-5 gap-4 items-start">
              {/* Home Team Stats */}
              <div className="col-span-2">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-16 h-16">
                      <Image
                        src={fixtureData.teams.home.logo}
                        alt={fixtureData.teams.home.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-blue-700">
                        {fixtureData.teams.home.name}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Position:</span>
                      <span className="font-medium">
                        {homePosition.position || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Points:</span>
                      <span className="font-medium">
                        {homePosition.points || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Form (Last 5):</span>
                      <span className="font-medium">
                        {getTeamForm(fixtureData.teams.home.id).slice(-5) ||
                          'N/A'}
                      </span>
                    </div>
                    {homeTeamStats && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Goals Scored:</span>
                          <span className="font-medium">
                            {homeTeamStats.goals.for.total.total}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Goals Conceded:</span>
                          <span className="font-medium">
                            {homeTeamStats.goals.against.total.total}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Center - Match Info & Odds */}
              <div className="col-span-1 text-center px-2">
                <div className="mb-4">
                  <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full inline-block mb-2">
                    {fixtureData.league.name}
                  </div>
                  <div className="text-lg font-bold mb-3">
                    <div>
                      {fixtureData.teams.home.name
                        .substring(0, 3)
                        .toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-600 my-1">vs</div>
                    <div>
                      {fixtureData.teams.away.name
                        .substring(0, 3)
                        .toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Odds Display */}
                {bookmakers.length > 0 && (
                  <div className="flex justify-center space-x-1">
                    <div className="text-center">
                      <div className="bg-blue-600 text-white px-3 py-2 rounded font-bold text-sm">
                        {bookmakers[0].home}
                      </div>
                      <div className="text-[10px] text-gray-600 mt-1">
                        Home Win
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-gray-600 text-white px-3 py-2 rounded font-bold text-sm">
                        {bookmakers[0].draw}
                      </div>
                      <div className="text-[10px] text-gray-600 mt-1">Draw</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-red-600 text-white px-3 py-2 rounded font-bold text-sm">
                        {bookmakers[0].away}
                      </div>
                      <div className="text-[10px] text-gray-600 mt-1">
                        Away Win
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Away Team Stats */}
              <div className="col-span-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-end space-x-3">
                    <div className="text-right">
                      <h3 className="font-bold text-lg text-red-700">
                        {fixtureData.teams.away.name}
                      </h3>
                    </div>
                    <div className="relative w-16 h-16">
                      <Image
                        src={fixtureData.teams.away.logo}
                        alt={fixtureData.teams.away.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Position:</span>
                      <span className="font-medium">
                        {awayPosition.position || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Points:</span>
                      <span className="font-medium">
                        {awayPosition.points || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Form (Last 5):</span>
                      <span className="font-medium">
                        {getTeamForm(fixtureData.teams.away.id).slice(-5) ||
                          'N/A'}
                      </span>
                    </div>
                    {awayTeamStats && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Goals Scored:</span>
                          <span className="font-medium">
                            {awayTeamStats.goals.for.total.total}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Goals Conceded:</span>
                          <span className="font-medium">
                            {awayTeamStats.goals.against.total.total}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Match Statistics */}
            {statistics.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200 mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-4">
                  Match Statistics
                </h4>
                <div className="space-y-4">
                  {/* Possession */}
                  <div>
                    <div className="grid grid-cols-5 gap-2 items-center mb-1">
                      <div className="text-right font-semibold text-blue-600">
                        {getStatValue(
                          statistics,
                          fixtureData.teams.home.id,
                          'Ball Possession',
                        )}
                      </div>
                      <div className="col-span-3 text-center text-sm text-gray-600">
                        Ball Possession
                      </div>
                      <div className="text-left font-semibold text-red-600">
                        {getStatValue(
                          statistics,
                          fixtureData.teams.away.id,
                          'Ball Possession',
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 items-center">
                      <div></div>
                      <div className="col-span-3">
                        <div className="bg-gray-200 rounded-full h-2 relative overflow-hidden">
                          <div
                            className="absolute left-0 top-0 h-full bg-blue-500"
                            style={{
                              width: getStatValue(
                                statistics,
                                fixtureData.teams.home.id,
                                'Ball Possession',
                              ),
                            }}
                          />
                          <div
                            className="absolute right-0 top-0 h-full bg-red-500"
                            style={{
                              width: getStatValue(
                                statistics,
                                fixtureData.teams.away.id,
                                'Ball Possession',
                              ),
                            }}
                          />
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>

                  {/* Total Shots */}
                  <div>
                    <div className="grid grid-cols-5 gap-2 items-center mb-1">
                      <div className="text-right font-semibold text-blue-600">
                        {getStatValue(
                          statistics,
                          fixtureData.teams.home.id,
                          'Total Shots',
                        )}
                      </div>
                      <div className="col-span-3 text-center text-sm text-gray-600">
                        Total Shots
                      </div>
                      <div className="text-left font-semibold text-red-600">
                        {getStatValue(
                          statistics,
                          fixtureData.teams.away.id,
                          'Total Shots',
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 items-center">
                      <div></div>
                      <div className="col-span-3">
                        <div className="bg-gray-200 rounded-full h-2 relative overflow-hidden">
                          <div
                            className="absolute left-0 top-0 h-full bg-blue-500"
                            style={{
                              width: `${
                                (parseInt(
                                  getStatValue(
                                    statistics,
                                    fixtureData.teams.home.id,
                                    'Total Shots',
                                  ),
                                ) /
                                  (parseInt(
                                    getStatValue(
                                      statistics,
                                      fixtureData.teams.home.id,
                                      'Total Shots',
                                    ),
                                  ) +
                                    parseInt(
                                      getStatValue(
                                        statistics,
                                        fixtureData.teams.away.id,
                                        'Total Shots',
                                      ),
                                    ) || 1)) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>

                  {/* Shots on Goal */}
                  <div>
                    <div className="grid grid-cols-5 gap-2 items-center mb-1">
                      <div className="text-right font-semibold text-blue-600">
                        {getStatValue(
                          statistics,
                          fixtureData.teams.home.id,
                          'Shots on Goal',
                        )}
                      </div>
                      <div className="col-span-3 text-center text-sm text-gray-600">
                        Shots on Goal
                      </div>
                      <div className="text-left font-semibold text-red-600">
                        {getStatValue(
                          statistics,
                          fixtureData.teams.away.id,
                          'Shots on Goal',
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 items-center">
                      <div></div>
                      <div className="col-span-3">
                        <div className="bg-gray-200 rounded-full h-2 relative overflow-hidden">
                          <div
                            className="absolute left-0 top-0 h-full bg-blue-500"
                            style={{
                              width: `${
                                (parseInt(
                                  getStatValue(
                                    statistics,
                                    fixtureData.teams.home.id,
                                    'Shots on Goal',
                                  ),
                                ) /
                                  (parseInt(
                                    getStatValue(
                                      statistics,
                                      fixtureData.teams.home.id,
                                      'Shots on Goal',
                                    ),
                                  ) +
                                    parseInt(
                                      getStatValue(
                                        statistics,
                                        fixtureData.teams.away.id,
                                        'Shots on Goal',
                                      ),
                                    ) || 1)) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>

                  {/* Corner Kicks */}
                  <div>
                    <div className="grid grid-cols-5 gap-2 items-center mb-1">
                      <div className="text-right font-semibold text-blue-600">
                        {getStatValue(
                          statistics,
                          fixtureData.teams.home.id,
                          'Corner Kicks',
                        )}
                      </div>
                      <div className="col-span-3 text-center text-sm text-gray-600">
                        Corner Kicks
                      </div>
                      <div className="text-left font-semibold text-red-600">
                        {getStatValue(
                          statistics,
                          fixtureData.teams.away.id,
                          'Corner Kicks',
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 items-center">
                      <div></div>
                      <div className="col-span-3">
                        <div className="bg-gray-200 rounded-full h-2 relative overflow-hidden">
                          <div
                            className="absolute left-0 top-0 h-full bg-blue-500"
                            style={{
                              width: `${
                                (parseInt(
                                  getStatValue(
                                    statistics,
                                    fixtureData.teams.home.id,
                                    'Corner Kicks',
                                  ),
                                ) /
                                  (parseInt(
                                    getStatValue(
                                      statistics,
                                      fixtureData.teams.home.id,
                                      'Corner Kicks',
                                    ),
                                  ) +
                                    parseInt(
                                      getStatValue(
                                        statistics,
                                        fixtureData.teams.away.id,
                                        'Corner Kicks',
                                      ),
                                    ) || 1)) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm mt-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('match-analysis')}
                className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'match-analysis'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Match Analysis
              </button>
              <button
                onClick={() => setActiveTab('head-to-head')}
                className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'head-to-head'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Head-to-Head
              </button>
              <button
                onClick={() => setActiveTab('team-stats')}
                className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'team-stats'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Team Stats
              </button>
              <button
                onClick={() => setActiveTab('key-players')}
                className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'key-players'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Key Players
              </button>
              <button
                onClick={() => setActiveTab('predictions')}
                className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'predictions'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Predictions
              </button>
            </nav>
          </div>
        </div>

        {/* Head-to-Head Section */}
        {h2hFullData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">
              Head-to-Head: {fixtureData.teams.home.name} vs{' '}
              {fixtureData.teams.away.name}
            </h2>

            {/* Historical Matchup Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">
                Historical Matchup Summary
              </h3>

              {(() => {
                // Calculate wins, draws, losses from all h2h data
                let homeWins = 0;
                let awayWins = 0;
                let draws = 0;

                h2hFullData.forEach((match) => {
                  if (match.goals.home > match.goals.away) {
                    if (match.teams.home.id === fixtureData.teams.home.id) {
                      homeWins++;
                    } else {
                      awayWins++;
                    }
                  } else if (match.goals.away > match.goals.home) {
                    if (match.teams.away.id === fixtureData.teams.home.id) {
                      homeWins++;
                    } else {
                      awayWins++;
                    }
                  } else {
                    draws++;
                  }
                });

                const total = homeWins + awayWins + draws;
                const homePercentage = total > 0 ? (homeWins / total) * 100 : 0;
                const drawPercentage = total > 0 ? (draws / total) * 100 : 0;
                const awayPercentage = total > 0 ? (awayWins / total) * 100 : 0;

                return (
                  <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {homeWins}
                        </div>
                        <div className="text-sm text-gray-600">
                          {fixtureData.teams.home.name} Wins
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-gray-600">
                          {draws}
                        </div>
                        <div className="text-sm text-gray-600">Draws</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-purple-600">
                          {awayWins}
                        </div>
                        <div className="text-sm text-gray-600">
                          {fixtureData.teams.away.name} Wins
                        </div>
                      </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="flex justify-center items-center">
                      <div className="relative w-64 h-64">
                        <svg
                          viewBox="0 0 100 100"
                          className="w-full h-full transform -rotate-90"
                        >
                          {/* Home team slice */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="#60a5fa"
                            strokeWidth="20"
                            strokeDasharray={`${homePercentage * 2.51} ${251 - homePercentage * 2.51}`}
                            strokeDashoffset="0"
                          />
                          {/* Draws slice */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="#9ca3af"
                            strokeWidth="20"
                            strokeDasharray={`${drawPercentage * 2.51} ${251 - drawPercentage * 2.51}`}
                            strokeDashoffset={`-${homePercentage * 2.51}`}
                          />
                          {/* Away team slice */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="#a855f7"
                            strokeWidth="20"
                            strokeDasharray={`${awayPercentage * 2.51} ${251 - awayPercentage * 2.51}`}
                            strokeDashoffset={`-${(homePercentage + drawPercentage) * 2.51}`}
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-400 rounded"></div>
                        <span className="text-sm text-gray-600">
                          {fixtureData.teams.home.name} Wins
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                        <span className="text-sm text-gray-600">Draws</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <span className="text-sm text-gray-600">
                          {fixtureData.teams.away.name} Wins
                        </span>
                      </div>
                    </div>

                    <div className="text-center mt-4 text-sm text-gray-500">
                      Based on last {h2hFullData.length} matches
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Last 5 Meetings */}
        {h2hData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Last 5 Meetings</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      DATE
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      COMPETITION
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      HOME
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                      SCORE
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                      AWAY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {h2hData.slice(0, 5).map((match, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(match.fixture.date).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          },
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {match.league?.name || fixtureData.league.name}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`font-medium ${match.teams.home.winner ? 'text-blue-600' : ''}`}
                        >
                          {match.teams.home.name}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-center font-semibold">
                        {match.goals.home}-{match.goals.away}
                      </td>
                      <td className="py-3 px-4 text-sm text-right">
                        <span
                          className={`font-medium ${match.teams.away.winner ? 'text-blue-600' : ''}`}
                        >
                          {match.teams.away.name}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Goal Distribution Section */}
        {h2hFullData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold mb-6">Goal Distribution</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Goals Scored (Last 10 Meetings) */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-4">
                  Goals Scored (Last 10 Meetings)
                </h4>

                {(() => {
                  // Calculate total goals for each team in last 10 meetings
                  const last10Matches = h2hFullData.slice(0, 10);
                  let homeTeamGoals = 0;
                  let awayTeamGoals = 0;

                  last10Matches.forEach((match) => {
                    if (match.teams.home.id === fixtureData.teams.home.id) {
                      homeTeamGoals += match.goals.home;
                      awayTeamGoals += match.goals.away;
                    } else {
                      homeTeamGoals += match.goals.away;
                      awayTeamGoals += match.goals.home;
                    }
                  });

                  const maxGoals = Math.max(homeTeamGoals, awayTeamGoals);

                  return (
                    <div className="space-y-4">
                      {/* Legend */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span>Goals Scored</span>
                        </div>
                      </div>

                      {/* Home Team Bar */}
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          {fixtureData.teams.home.name}
                        </div>
                        <div className="relative">
                          <div className="bg-gray-200 h-8 rounded">
                            <div
                              className="bg-blue-500 h-full rounded flex items-center justify-end pr-2"
                              style={{
                                width: `${(homeTeamGoals / (maxGoals || 1)) * 80}%`,
                              }}
                            >
                              <span className="text-white text-sm font-medium">
                                {homeTeamGoals}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Away Team Bar */}
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          {fixtureData.teams.away.name}
                        </div>
                        <div className="relative">
                          <div className="bg-gray-200 h-8 rounded">
                            <div
                              className="bg-purple-500 h-full rounded flex items-center justify-end pr-2"
                              style={{
                                width: `${(awayTeamGoals / (maxGoals || 1)) * 80}%`,
                              }}
                            >
                              <span className="text-white text-sm font-medium">
                                {awayTeamGoals}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* X-axis */}
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>0</span>
                        <span>5</span>
                        <span>10</span>
                        <span>15</span>
                        <span>20</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Goal Timing (Last 10 Meetings) 
              Es una simulación, hay que ajustar la forma en que la api trae la data*/}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-4">
                  Goal Timing (Last 10 Meetings)
                </h4>

                {(() => {
                  // Simulated data based on typical goal distribution patterns
                  const simulatedData = {
                    '1-15': { home: 2, away: 1 },
                    '16-30': { home: 3, away: 2 },
                    '31-45': { home: 4, away: 3 },
                    '46-60': { home: 2, away: 5 },
                    '61-75': { home: 3, away: 4 },
                    '76-90': { home: 2, away: 3 },
                  };

                  const maxValue = 5; // Maximum value for scaling

                  return (
                    <div>
                      {/* Legend */}
                      <div className="flex items-center gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span>{fixtureData.teams.home.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-purple-500 rounded"></div>
                          <span>{fixtureData.teams.away.name}</span>
                        </div>
                      </div>

                      {/* Chart */}
                      <div className="relative h-48">
                        {/* Y-axis labels */}
                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
                          <span>5</span>
                          <span>4</span>
                          <span>3</span>
                          <span>2</span>
                          <span>1</span>
                          <span>0</span>
                        </div>

                        {/* Chart area */}
                        <div className="ml-6 h-full relative">
                          {/* Grid lines */}
                          <div className="absolute inset-0 flex flex-col justify-between">
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                              <div
                                key={i}
                                className="border-t border-gray-200"
                              ></div>
                            ))}
                          </div>

                          {/* Bars */}
                          <div className="relative h-full flex items-end justify-around pb-6">
                            {Object.entries(simulatedData).map(
                              ([period, goals]) => (
                                <div
                                  key={period}
                                  className="flex gap-1 items-end"
                                >
                                  <div
                                    className="w-8 bg-blue-500 rounded-t"
                                    style={{
                                      height: `${(goals.home / maxValue) * 100}%`,
                                    }}
                                  ></div>
                                  <div
                                    className="w-8 bg-purple-500 rounded-t"
                                    style={{
                                      height: `${(goals.away / maxValue) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                              ),
                            )}
                          </div>

                          {/* X-axis labels */}
                          <div className="absolute bottom-0 left-0 right-0 flex justify-around text-xs text-gray-500">
                            <span>1-15</span>
                            <span>16-30</span>
                            <span>31-45</span>
                            <span>46-60</span>
                            <span>61-75</span>
                            <span>76-90</span>
                          </div>

                          <div className="text-center text-xs text-gray-500 mt-8">
                            Minutes
                          </div>
                        </div>
                      </div>

                      <div className="text-center text-xs text-gray-400 mt-4">
                        * Goal timing data is simulated for demonstration
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
