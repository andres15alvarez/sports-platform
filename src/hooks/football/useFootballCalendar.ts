import { useState, useEffect } from 'react';
import {
  CalendarFixture,
  UseCalendarHook,
  League,
  ViewType,
} from '@/src/types/sportCalendar';

interface FootballFixtureResponse {
  fixture: {
    id: number;
    date: string;
    timezone: string;
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
    season: number | string;
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

const useFootballCalendar = (): UseCalendarHook => {
  const [fixtures, setFixtures] = useState<CalendarFixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState(71); // Série A (Brazil)
  const [viewType, setViewType] = useState<ViewType>('upcoming');

  const leagues: League[] = [
    { id: 71, name: 'Série A', country: 'Brazil' },
    { id: 240, name: 'Primera B', country: 'Colombia' },
    { id: 239, name: 'Primera A', country: 'Colombia' },
    { id: 268, name: 'Primera División - Apertura', country: 'Uruguay' },
    { id: 281, name: 'Primera División', country: 'Peru' },
  ];

  const fetchLeagueFixtures = async (leagueId: number) => {
    try {
      const season = 2025;
      const apiKey = process.env.NEXT_PUBLIC_API_KEYY;
      if (!apiKey) throw new Error('API key not configured');

      const today = new Date();
      const fromDate = new Date();
      fromDate.setDate(today.getDate() - 7);
      const toDate = new Date();
      toDate.setDate(today.getDate() + 30);

      const response = await fetch(
        `https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${season}&from=${fromDate.toISOString().split('T')[0]}&to=${toDate.toISOString().split('T')[0]}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error for league ${leagueId}:`, errorText);
        return [];
      }

      const data = await response.json();
      if (data.response && Array.isArray(data.response)) {
        return data.response.sort(
          (a: FootballFixtureResponse, b: FootballFixtureResponse) =>
            new Date(a.fixture.date).getTime() -
            new Date(b.fixture.date).getTime(),
        );
      }
      return [];
    } catch (err) {
      console.error(`Error fetching league ${leagueId}:`, err);
      return [];
    }
  };

  const fetchAllLeaguesFixtures = async () => {
    setLoading(true);
    setError(null);

    try {
      const promises = leagues.map((league) => fetchLeagueFixtures(league.id));
      const allFixturesArrays = await Promise.all(promises);

      const allFixtures = allFixturesArrays.flat();
      setFixtures(allFixtures);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setFixtures([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLeaguesFixtures();
  }, []);

  return {
    fixtures,
    loading,
    error,
    selectedLeague,
    setSelectedLeague,
    viewType,
    setViewType,
    leagues,
  };
};

export default useFootballCalendar;
