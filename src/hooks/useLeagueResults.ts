'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FixtureResponse } from '@/src/types/leagueResults';
import { getSportApiConfig } from '@/src/config/sportsApiConfig';
import { BasketballGame, BaseballGame } from '@/src/lib/types/api';

type SportType = 'football' | 'basketball' | 'baseball';

type RawApiGame = BasketballGame | BaseballGame | FixtureResponse;

interface GameStatus {
  short?: string;
  long?: string;
}

export const useLeagueResults = (sportType: SportType) => {
  const params = useParams();
  const leagueIdParam = params?.leagueId as string;
  const leagueId = parseInt(leagueIdParam, 10);

  const [fixtures, setFixtures] = useState<FixtureResponse[]>([]);
  const [leagueInfo, setLeagueInfo] = useState<
    FixtureResponse['league'] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('All Results');
  const [currentPage, setCurrentPage] = useState(1);
  const fixturesPerPage = 10;

  useEffect(() => {
    const fetchLeagueResults = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!leagueId || isNaN(leagueId)) {
          throw new Error(`Invalid league ID: ${leagueIdParam}`);
        }

        const config = getSportApiConfig(sportType);
        const { apiEndpoint, season, apiKey, apiHost } = config;

        let apiUrl = `${apiEndpoint}?league=${leagueId}&season=${season}`;
        if (sportType === 'football') {
          apiUrl += '&status=FT';
        }

        const response = await fetch(apiUrl, {
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `HTTP ${response.status}: Failed to fetch results`,
          );
        }

        const data = await response.json();

        if (!data.response || data.response.length === 0) {
          setError('No completed matches found');
          setLoading(false);
          return;
        }

        let completedFixtures = data.response;

        if (sportType === 'basketball' || sportType === 'baseball') {
          completedFixtures = data.response.filter((game: RawApiGame) => {
            const status = (game as BasketballGame | BaseballGame)
              .status as GameStatus;
            return (
              ['FT', 'AET', 'POST'].includes(status?.short || '') ||
              status?.long === 'Finished'
            );
          });
        }

        if (completedFixtures.length === 0) {
          setError('No completed matches found');
          setLoading(false);
          return;
        }

        const sortedFixtures = completedFixtures.sort(
          (a: RawApiGame, b: RawApiGame) => {
            const dateA =
              (a as BasketballGame | BaseballGame).date ||
              (a as FixtureResponse).fixture?.date;
            const dateB =
              (b as BasketballGame | BaseballGame).date ||
              (b as FixtureResponse).fixture?.date;
            return new Date(dateB).getTime() - new Date(dateA).getTime();
          },
        );

        const adaptedFixtures: FixtureResponse[] = sortedFixtures.map(
          (item: RawApiGame) => {
            if (sportType === 'football') {
              return item as FixtureResponse;
            }

            const game = item as BasketballGame | BaseballGame;

            let halftimeHome: number | null = null;
            let halftimeAway: number | null = null;
            let extratimeHome: number | null = null;
            let extratimeAway: number | null = null;

            if (sportType === 'basketball') {
              const basketballGame = game as BasketballGame;
              halftimeHome = basketballGame.scores.home.quarter_1 ?? null;
              halftimeAway = basketballGame.scores.away.quarter_1 ?? null;
              extratimeHome = basketballGame.scores.home.overtime ?? null;
              extratimeAway = basketballGame.scores.away.overtime ?? null;
            } else if (sportType === 'baseball') {
              const baseballGame = game as BaseballGame;
              const homeInnings = Object.values(
                baseballGame.scores.home.innings,
              );
              const awayInnings = Object.values(
                baseballGame.scores.away.innings,
              );
              halftimeHome = homeInnings[0] ?? null;
              halftimeAway = awayInnings[0] ?? null;
              extratimeHome = null;
              extratimeAway = null;
            }

            return {
              fixture: {
                id: game.id,
                referee: null,
                timezone: game.timezone || 'UTC',
                date: game.date,
                timestamp: new Date(game.date).getTime(),
                periods: {
                  first: null,
                  second: null,
                },
                venue: {
                  id: null,
                  name: null,
                  city: null,
                },
                status: game.status,
              },
              league: game.league,
              teams: game.teams,
              goals: {
                home: game.scores?.home?.total ?? 0,
                away: game.scores?.away?.total ?? 0,
              },
              score: {
                halftime: {
                  home: halftimeHome,
                  away: halftimeAway,
                },
                fulltime: {
                  home: game.scores?.home?.total ?? 0,
                  away: game.scores?.away?.total ?? 0,
                },
                extratime: {
                  home: extratimeHome,
                  away: extratimeAway,
                },
                penalty: { home: null, away: null },
              },
            };
          },
        );

        setFixtures(adaptedFixtures);
        if (adaptedFixtures.length > 0) {
          setLeagueInfo(adaptedFixtures[0].league);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (leagueIdParam) {
      fetchLeagueResults();
    }
  }, [leagueIdParam, sportType]);

  const getResultType = (fixture: FixtureResponse) => {
    const homeGoals = fixture.goals.home || 0;
    const awayGoals = fixture.goals.away || 0;

    if (homeGoals > awayGoals) return 'Home Win';
    if (awayGoals > homeGoals) return 'Away Win';
    return 'Draw';
  };

  const filteredFixtures =
    selectedFilter === 'All Results'
      ? fixtures
      : fixtures.filter((fixture) => getResultType(fixture) === selectedFilter);

  const indexOfLastFixture = currentPage * fixturesPerPage;
  const indexOfFirstFixture = indexOfLastFixture - fixturesPerPage;
  const currentFixtures = filteredFixtures.slice(
    indexOfFirstFixture,
    indexOfLastFixture,
  );
  const totalPages = Math.ceil(filteredFixtures.length / fixturesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return {
    loading,
    error,
    leagueInfo,
    sportType,
    leagueId: leagueIdParam,
    selectedFilter,
    setSelectedFilter,
    resultFilters: ['All Results', 'Home Wins', 'Away Wins', 'Draws'],
    currentFixtures,
    totalPages,
    currentPage,
    paginate,
  };
};
