import { useState, useEffect, useCallback } from 'react';
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
  const [selectedLeague, setSelectedLeague] = useState(239); //COLOMBIA
  const [viewType, setViewType] = useState<ViewType>('upcoming');

  const leagues: League[] = [
    { id: 39, name: 'Premier League', country: 'England' },
    { id: 140, name: 'La Liga', country: 'Spain' },
    { id: 78, name: 'Bundesliga', country: 'Germany' },
    { id: 135, name: 'Serie A', country: 'Italy' },
    { id: 61, name: 'Ligue 1', country: 'France' },
    { id: 71, name: 'Série A', country: 'Brazil' },
    { id: 88, name: 'Eredivisie', country: 'Netherlands' },
    { id: 239, name: 'Primera A', country: 'Colombia' },
    { id: 240, name: 'Primera B', country: 'Colombia' },
    { id: 268, name: 'Primera Division', country: 'Uruguay' },
    { id: 281, name: 'Primera Division', country: 'Peru' },
    { id: 128, name: 'Liga Profesional', country: 'Argentina' },
    { id: 1, name: 'World Cup', country: 'World' },
    { id: 2, name: 'UEFA Champions League', country: 'World' },
    { id: 3, name: 'UEFA Europa League', country: 'World' },
  ];

  const fetchFixtures = useCallback(async (leagueId: number) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEYY;
      if (!apiKey) throw new Error('API key not configured');

      const today = new Date();
      const fromDate = new Date();
      fromDate.setDate(today.getDate() - 7);
      const toDate = new Date();
      toDate.setDate(today.getDate() + 30);

      const season = new Date().getFullYear();

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

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      if (data.response && Array.isArray(data.response)) {
        const fixtures: CalendarFixture[] = data.response.sort(
          (a: FootballFixtureResponse, b: FootballFixtureResponse) =>
            new Date(a.fixture.date).getTime() -
            new Date(b.fixture.date).getTime(),
        );
        setFixtures(fixtures);
      } else {
        setFixtures([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setFixtures([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFixtures(selectedLeague);
  }, [selectedLeague, fetchFixtures]);

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
