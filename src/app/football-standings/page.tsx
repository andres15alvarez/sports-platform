'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface Standing {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string | null;
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
  home: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  away: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  update: string;
}

interface LeagueData {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    standings: Standing[][];
  };
}

const StandingsPage: React.FC = () => {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [leagueInfo, setLeagueInfo] = useState<LeagueData['league'] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState(71); // Serie A Brazil por defecto
  const [selectedSeason, setSelectedSeason] = useState(2025);

  // Ligas
  const leagues = [
    { id: 39, name: 'Premier League', country: 'England' },
    { id: 140, name: 'La Liga', country: 'Spain' },
    { id: 78, name: 'Bundesliga', country: 'Germany' },
    { id: 135, name: 'Serie A', country: 'Italy' },
    { id: 61, name: 'Ligue 1', country: 'France' },
    { id: 71, name: 'Série A', country: 'Brazil' },
    { id: 128, name: 'Liga Profesional', country: 'Argentina' },
  ];

  useEffect(() => {
    fetchStandings();
  }, [selectedLeague, selectedSeason]);

  const fetchStandings = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://v3.football.api-sports.io/standings?league=${selectedLeague}&season=${selectedSeason}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_API_KEYY || '',
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }

      const data = await response.json();

      if (data.response && data.response.length > 0) {
        const leagueData: LeagueData = data.response[0];
        setLeagueInfo(leagueData.league);
        // La API puede devolver múltiples grupos, tomamos el primero o todos
        const allStandings = leagueData.league.standings.flat();
        setStandings(allStandings);
      } else {
        setError('No se encontraron datos para esta liga/temporada');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const getFormColor = (result: string) => {
    switch (result) {
      case 'W':
        return 'bg-green-500';
      case 'D':
        return 'bg-gray-500';
      case 'L':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusColor = (description: string | null) => {
    if (!description) return '';
    if (description.includes('Champions League'))
      return 'border-l-4 border-blue-600';
    if (description.includes('Europa League'))
      return 'border-l-4 border-orange-500';
    if (description.includes('Relegation')) return 'border-l-4 border-red-600';
    return 'border-l-4 border-gray-300';
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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Selectores */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                League
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Season
              </label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={2024}>2024/2025</option>
                <option value={2023}>2023/2024</option>
                <option value={2022}>2022/2023</option>
              </select>
            </div>
          </div>
        </div>

        {/* Información de la Liga */}
        {leagueInfo && (
          <div className="mb-6 bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4">
              <Image
                src={leagueInfo.logo}
                alt={leagueInfo.name}
                width={64}
                height={64}
                className="object-contain"
                unoptimized
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {leagueInfo.name}
                </h1>
                <p className="text-gray-600">Season {leagueInfo.season}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de Posiciones */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PJ
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    G
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    E
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    P
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GF
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GC
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DG
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pts
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Forma
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {standings.map((standing) => (
                  <tr
                    key={standing.team.id}
                    className={`hover:bg-gray-50 ${getStatusColor(standing.description)}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {standing.rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Image
                          src={standing.team.logo}
                          alt={standing.team.name}
                          width={32}
                          height={32}
                          className="object-contain mr-3"
                          unoptimized
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {standing.team.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      {standing.all.played}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      {standing.all.win}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      {standing.all.draw}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      {standing.all.lose}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      {standing.all.goals.for}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      {standing.all.goals.against}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      {standing.goalsDiff > 0 ? '+' : ''}
                      {standing.goalsDiff}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-gray-900">
                      {standing.points}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center space-x-1">
                        {standing.form
                          ?.split('')
                          .slice(-5)
                          .map((result, index) => (
                            <div
                              key={index}
                              className={`w-6 h-6 rounded-full ${getFormColor(result)} flex items-center justify-center text-white text-xs font-bold`}
                            >
                              {result}
                            </div>
                          ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Leyenda 
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Leyenda:</h3>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 mr-2"></div>
              <span>Champions League</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-500 mr-2"></div>
              <span>Europa League</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-600 mr-2"></div>
              <span>Descenso</span>
            </div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default StandingsPage;
