import { useState, useEffect } from 'react';
import { ActiveLeague, LeagueData, ResultFilter } from '@/src/types/types';

interface BasketballGame {
  id: number;
  date: string;
  status: {
    short: string;
    long: string;
  };
  venue?: string;
  referee?: string;
  timezone?: string;
  league?: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: string;
    round: string;
  };
  teams?: {
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
  scores?: {
    home: {
      total: number;
      quarter_1?: number;
      quarter_2?: number;
      overtime?: number;
    };
    away: {
      total: number;
      quarter_1?: number;
      quarter_2?: number;
      overtime?: number;
    };
  };
}

const useBasketballResults = () => {
  const [leaguesData, setLeaguesData] = useState<LeagueData[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] =
    useState<ResultFilter>('All Results');

  const activeLeagues: ActiveLeague[] = [
    { id: 12, name: 'NBA', country: 'USA' },
    { id: 120, name: 'EuroLeague', country: 'Europe' },
    { id: 118, name: 'Liga ACB', country: 'Spain' },
    { id: 127, name: 'Lega Basket Serie A', country: 'Italy' },
    { id: 133, name: 'LNB Pro A', country: 'France' },
  ];

  const resultFilters: ResultFilter[] = [
    'All Results',
    'Home Wins',
    'Away Wins',
    'Draws',
  ];

  const fetchLeagueResults = async (leagueId: number, index: number) => {
    console.log(`Fetching basketball results for league ${leagueId}...`);
    try {
      const season = '2024-2025';
      const apiKey = process.env.NEXT_PUBLIC_API_KEYY;

      const response = await fetch(
        `https://v1.basketball.api-sports.io/games?league=${leagueId}&season=${season}`,
        {
          headers: {
            'x-rapidapi-key': apiKey || '',
            'x-rapidapi-host': 'v1.basketball.api-sports.io',
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error for league ${leagueId}:`, errorText);
        throw new Error(`Failed to fetch results: ${response.status}`);
      }

      const data = await response.json();

      if (!data.response || data.response.length === 0) {
        console.log(`No fixtures found for league ${leagueId}`);
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

      const completedGames = data.response
        .filter(
          (game: BasketballGame) =>
            game.status?.short === 'FT' ||
            game.status?.long === 'Finished' ||
            game.status?.long === 'Match Finished' ||
            game.status?.long === 'Game Finished',
        )
        .sort((a: BasketballGame, b: BasketballGame) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        })
        .slice(0, 3);

      // Transformar los datos de basketball para que coincidan con la estructura de football
      // MOMENTANEO
      const transformedFixtures = completedGames.map(
        (game: BasketballGame) => ({
          fixture: {
            id: game.id,
            referee: game.referee || null,
            timezone: game.timezone || 'UTC',
            date: game.date,
            timestamp: new Date(game.date).getTime() / 1000, // Convertir a timestamp de segundos
            periods: {
              first: null, // Basketball no tiene períodos como football
              second: null,
            },
            venue: {
              id: null, // Basketball API no proporciona ID del venue
              name: game.venue || null, // venue es un string directo en basketball
              city: null, // Basketball API no proporciona ciudad del venue
            },
            status: {
              long: 'Match Finished',
              short: 'FT',
              elapsed: null,
            },
          },
          league: {
            id: game.league?.id || leagueId,
            name: game.league?.name || activeLeagues[index].name,
            country: game.league?.country || activeLeagues[index].country,
            logo: game.league?.logo || '',
            flag: game.league?.flag || null,
            season: game.league?.season || season,
            round: game.league?.round || '',
          },
          teams: {
            home: {
              id: game.teams?.home?.id || 0,
              name: game.teams?.home?.name || 'Home Team',
              logo: game.teams?.home?.logo || '',
              winner:
                (game.scores?.home?.total || 0) >
                (game.scores?.away?.total || 0),
            },
            away: {
              id: game.teams?.away?.id || 0,
              name: game.teams?.away?.name || 'Away Team',
              logo: game.teams?.away?.logo || '',
              winner:
                (game.scores?.away?.total || 0) >
                (game.scores?.home?.total || 0),
            },
          },
          goals: {
            home: game.scores?.home?.total || 0,
            away: game.scores?.away?.total || 0,
          },
          score: {
            halftime: {
              home:
                (game.scores?.home?.quarter_1 || 0) +
                (game.scores?.home?.quarter_2 || 0),
              away:
                (game.scores?.away?.quarter_1 || 0) +
                (game.scores?.away?.quarter_2 || 0),
            },
            fulltime: {
              home: game.scores?.home?.total || null,
              away: game.scores?.away?.total || null,
            },
            extratime: {
              home: game.scores?.home?.overtime || null,
              away: game.scores?.away?.overtime || null,
            },
            penalty: {
              home: null, // Basketball no tiene penales
              away: null,
            },
          },
        }),
      );

      const leagueInfo = transformedFixtures[0]?.league || {};

      if (completedGames.length === 0) {
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

      setLeaguesData((prev) => {
        const updated = [...prev];
        updated[index] = {
          id: leagueId,
          name: leagueInfo.name || activeLeagues[index].name,
          country: leagueInfo.country || activeLeagues[index].country,
          logo: leagueInfo.logo || '',
          flag: leagueInfo.flag || '',
          fixtures: transformedFixtures,
          loading: false,
          error: null,
          expanded: false,
        };
        return updated;
      });
    } catch (err) {
      console.error(`Error fetching basketball league ${leagueId}:`, err);
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

  useEffect(() => {
    initializeLeaguesData();
  }, []);

  return {
    leaguesData,
    initialLoading,
    selectedFilter,
    setSelectedFilter,
    resultFilters,
    refetch: initializeLeaguesData,
  };
};

export default useBasketballResults;
