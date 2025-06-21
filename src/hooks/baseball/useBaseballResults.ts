import { useState, useEffect } from 'react';
import { ActiveLeague, ResultFilter } from '@/src/types/types';
import { CommonLeagueData, UseResultsHook } from '@/src/types/sportsResults';
import {
  adaptBaseballFixture,
  adaptLeagueData,
} from '@/src/utils/sportsAdapters';

interface BaseballGame {
  id: number;
  date: string;
  status: {
    short: string;
    long: string;
  };
  venue?: string;
  league?: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
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
      inning_1?: number;
      inning_2?: number;
    };
    away: {
      total: number;
      inning_1?: number;
      inning_2?: number;
    };
  };
}

const useBaseballResults = (): UseResultsHook => {
  const [leaguesData, setLeaguesData] = useState<CommonLeagueData[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] =
    useState<ResultFilter>('All Results');

  const activeLeagues: ActiveLeague[] = [
    { id: 1, name: 'MLB', country: 'USA' },
    { id: 2, name: 'NPB', country: 'Japan' },
    { id: 3, name: 'KBO', country: 'South Korea' },
  ];

  const resultFilters: ResultFilter[] = [
    'All Results',
    'Home Wins',
    'Away Wins',
    'Draws',
  ];

  const fetchLeagueResults = async (leagueId: number, index: number) => {
    console.log(`Fetching baseball results for league ${leagueId}...`);
    try {
      const season = '2025';
      const apiKey = process.env.NEXT_PUBLIC_API_KEYY;

      const response = await fetch(
        `https://v1.baseball.api-sports.io/games?league=${leagueId}&season=${season}`,
        {
          headers: {
            'x-rapidapi-key': apiKey || '',
            'x-rapidapi-host': 'v1.baseball.api-sports.io',
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
          (game: BaseballGame) =>
            game.status?.short === 'FT' ||
            game.status?.long === 'Finished' ||
            game.status?.long === 'Match Finished' ||
            game.status?.long === 'Game Finished',
        )
        .sort((a: BaseballGame, b: BaseballGame) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        })
        .slice(0, 3);

      const commonFixtures = completedGames.map((game: BaseballGame) =>
        adaptBaseballFixture(
          game,
          leagueId,
          activeLeagues[index].name,
          activeLeagues[index].country,
        ),
      );

      const leagueInfo = completedGames[0]?.league || {};

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
        updated[index] = adaptLeagueData(
          {
            id: leagueId,
            name: leagueInfo.name || activeLeagues[index].name,
            country: leagueInfo.country || activeLeagues[index].country,
            logo: leagueInfo.logo || '',
            flag: leagueInfo.flag || '',
            loading: false,
            error: null,
            expanded: false,
          },
          commonFixtures,
        );
        return updated;
      });
    } catch (err) {
      console.error(`Error fetching baseball league ${leagueId}:`, err);
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

    const initialData: CommonLeagueData[] = activeLeagues.map((league) => ({
      id: league.id,
      name: league.name,
      country: league.country,
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
  };
};

export default useBaseballResults;
