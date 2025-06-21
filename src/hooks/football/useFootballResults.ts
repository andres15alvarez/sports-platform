import { useState, useEffect } from 'react';
import { ActiveLeague, ResultFilter, FixtureResponse } from '@/src/types/types';
import { CommonLeagueData, UseResultsHook } from '@/src/types/sportsResults';
import {
  adaptFootballFixture,
  adaptLeagueData,
} from '@/src/utils/sportsAdapters';

const useFootballResults = (): UseResultsHook => {
  const [leaguesData, setLeaguesData] = useState<CommonLeagueData[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] =
    useState<ResultFilter>('All Results');

  const activeLeagues: ActiveLeague[] = [
    { id: 71, name: 'Série A', country: 'Brazil' },
    { id: 240, name: 'Liga BetPlay', country: 'Colombia' },
    { id: 239, name: 'Primera División', country: 'Chile' },
    { id: 268, name: 'Primera División', country: 'Uruguay' },
    { id: 281, name: 'Liga 1', country: 'Peru' },
  ];

  const resultFilters: ResultFilter[] = [
    'All Results',
    'Home Wins',
    'Away Wins',
    'Draws',
  ];

  const fetchLeagueResults = async (leagueId: number, index: number) => {
    try {
      const season = 2025;
      const apiKey = process.env.NEXT_PUBLIC_API_KEYY;

      const response = await fetch(
        `https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${season}&status=FT&last=10`,
        {
          headers: {
            'x-rapidapi-key': apiKey || '',
            'x-rapidapi-host': 'v3.football.api-sports.io',
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

      const fixtures = data.response;

      const sortedFixtures = fixtures
        .sort(
          (a: FixtureResponse, b: FixtureResponse) =>
            b.fixture.timestamp - a.fixture.timestamp,
        )
        .slice(0, 3);

      const commonFixtures = sortedFixtures.map(adaptFootballFixture);

      const leagueInfo = sortedFixtures[0]?.league || {};

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
      console.error(`Error fetching league ${leagueId}:`, err);
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

export default useFootballResults;
